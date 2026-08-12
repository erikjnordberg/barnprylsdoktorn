const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const produkter = require("./src/_data/produkter.js");
const anchor = require("markdown-it-anchor");

// Rubriktext -> id att länka till: "Var i bilen ska stolen sitta?" blir
// "var-i-bilen-ska-stolen-sitta". Egen funktion i stället för standardvarianten,
// som procentkodar å, ä och ö till oläsliga adresser.
const rubrikTillId = (text) =>
  text
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Adtraction-spårning. Affiliatelänkarna i produkter.js och i löptexten pekar på
// handlarens riktiga produktsida — spårningen läggs på här, på ett ställe, i stället
// för att klistras in i varje länk. Byter vi nätverk eller kanal ändras bara det här.
//
// Värdet per handlare är **hela spårlänken som Adtraction ger dig**, utan `url`-parameter
// på slutet — den lägger vi på här. Klistra in den rakt av; varje program kan ha sin egen
// spårdomän (Babysam spårar via to.babyworld.se, inte track.adtraction.com), så det går
// inte att bygga länken av bara ett ID.
//
// I länken är `a` annonsörens brand ad ID, `as` vår kanal (Barnprylsdoktorn = 2100860918),
// och t=2 + tk=1 säger att måladressen ligger i url-parametern. Nytt godkänt program:
// lägg till en rad här, inget annat.
const ADTRACTION_PROGRAM = {
  Babysam: "https://to.babyworld.se/t/t?a=1945556823&as=2100860918&t=2&tk=1",
  Babyland: "https://pin.babyland.se/t/t?a=1066444612&as=2100860918&t=2&tk=1",
  "Stor&Liten": "https://at.storochliten.se/t/t?a=1060728464&as=2100860918&t=2&tk=1",
};

// Handlarnamn skrivs ut i HTML av köpblocket och annonslänken. Ett namn med & i
// ("Stor&Liten") ger ogiltig HTML om det skrivs rakt av — escapa det på vägen ut.
const htmlText = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Bygger den spårade adressen. Saknas handlaren returneras null, och då renderas
// köpblocket utan knapp och annonslänken som vanlig text — hellre en osynlig länk än
// en länk som skickar trafik vi inte får betalt för.
const varnade = new Set();
const harProgram = (handlare) =>
  typeof ADTRACTION_PROGRAM[handlare] === "string" &&
  ADTRACTION_PROGRAM[handlare].startsWith("https://");
const sparadUrl = (handlare, malUrl) => {
  if (!harProgram(handlare)) {
    if (!varnade.has(handlare)) {
      varnade.add(handlare);
      console.warn(
        `[annonslank] Ingen Adtraction-spårlänk för ${handlare} — länkarna renderas omärkta och ospårade. Lägg till en rad i ADTRACTION_PROGRAM i eleventy.config.js.`
      );
    }
    return null;
  }
  return `${ADTRACTION_PROGRAM[handlare]}&url=${encodeURIComponent(malUrl)}`;
};

// Besöksstatistik från scripts/hamta-statistik.js, uppdateras varje måndag av
// GitHub Actions. Filen kan saknas (första körningen, eller lokalt) — då sorteras
// guiderna i sin nuvarande ordning, bygget ska aldrig krascha på det.
let popularitet = {};
try {
  popularitet = require("./src/_data/popularitet.json");
} catch {
  popularitet = {};
}

module.exports = function (eleventyConfig) {
  // Ger varje h2 och h3 ett id, så att avsnitt går att länka till direkt.
  // Bara id — ingen synlig länkikon och ingen ändring av rubrikernas utseende.
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.use(anchor, { level: [2, 3], slugify: rubrikTillId })
  );

  // Kopiera CSS och bilder rakt igenom till den färdiga sajten
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/bilder");
  eleventyConfig.addPassthroughCopy("src/fonter");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/_headers");

  // Hänger ett versionsnummer på en fils adress: /bilder/x.svg -> /bilder/x.svg?v=a1b2c3d4
  // Cloudflare cachar statiska filer hårt. Byter vi innehållet men behåller adressen
  // fortsätter besökare få den gamla versionen. Hashen ändras bara när filen gör det.
  eleventyConfig.addFilter("version", (webbadress) => {
    try {
      const fil = path.join(__dirname, "src", webbadress);
      const hash = crypto
        .createHash("sha1")
        .update(fs.readFileSync(fil))
        .digest("hex")
        .slice(0, 8);
      return `${webbadress}?v=${hash}`;
    } catch {
      // Saknas filen ska bygget inte krascha — adressen får gå ut oförändrad.
      return webbadress;
    }
  });

  // Gör datum läsbara i mallarna: 2026-08-06 -> 6 augusti 2026
  eleventyConfig.addFilter("datum", (value) =>
    new Date(value).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  // Binder tankstrecket till ordet före, så att rader aldrig börjar med "—"
  eleventyConfig.addFilter("typo", (value) =>
    typeof value === "string"
      ? value.replace(/ \u2014 /g, "\u00A0\u2014 ")
      : value
  );

  // Köpblock i artiklarna: {% kopblock "produktnyckel" %}
  // Saknar produkten en url renderas blocket utan knapp och utan annonsmärkning.
  // Blocket visar med flit inget pris — handlarnas priser rör sig varje vecka och en
  // siffra här skulle bli fel utan att någon märkte det. Ungefärliga priser står i
  // tabellerna i löptexten, med källa och förbehåll.
  eleventyConfig.addShortcode("kopblock", (nyckel) => {
    const produkt = produkter[nyckel];
    if (!produkt) {
      throw new Error(`kopblock: hittar ingen produkt med nyckeln "${nyckel}" i produkter.js`);
    }

    const lank = produkt.url ? sparadUrl(produkt.handlare, produkt.url) : null;
    const knappOchMarkning = lank
      ? `
    <p class="kopblock-markning">Annonslänk. Sajten får provision om du köper via den — priset för dig är detsamma. <a href="/sa-tjanar-sajten-pengar/">Så tjänar sajten pengar</a></p>
    <a class="kopblock-knapp" href="${lank}" rel="sponsored nofollow noopener" target="_blank">Se aktuellt pris hos ${htmlText(produkt.handlare)}</a>`
      : "";

    return `<div class="kopblock">
    <h3 class="kopblock-namn">${produkt.namn}</h3>
    <p class="kopblock-spec">${produkt.specifikation}</p>
    <p class="kopblock-motivering">${produkt.motivering}</p>${knappOchMarkning}
  </div>`;
  });

  // Annonsnotisen högst upp i en guide får bara synas om guidens länkar faktiskt
  // renderas. Saknas program-ID blir länkarna vanlig text, och då vore notisen en
  // varning om reklam som inte finns. Filtret används i base.njk.
  eleventyConfig.addFilter("aktivaHandlare", (varden) =>
    [].concat(varden || []).filter((h) => h === true || harProgram(h))
  );

  // Radar upp namn på svenska: ["A"] -> "A", ["A","B"] -> "A och B",
  // ["A","B","C"] -> "A, B och C". Används i annonsnotisen högst upp i guiderna.
  eleventyConfig.addFilter("listaSvenska", (varden) => {
    const lista = [].concat(varden || []).filter(Boolean);
    if (lista.length <= 1) return lista[0] || "";
    return `${lista.slice(0, -1).join(", ")} och ${lista[lista.length - 1]}`;
  });

  // Affiliatelänk i löptext: {% annonslank "https://handlarens-sida", "Handlare", "länktext" %}
  // Skicka handlarens riktiga adress — spårningen läggs på av sparadUrl ovan.
  // Märkningen ligger inuti <a> med flit — skärmläsare som listar sidans länkar
  // läser då upp att länken är reklam, precis som en seende läsare ser det.
  // Notisen högst upp i guiden är den primära märkningen; den här är förstärkningen.
  // Saknas program-ID renderas bara länktexten, så att en ospårad länk aldrig går live.
  eleventyConfig.addShortcode("annonslank", (url, handlare, text) => {
    if (!url || !handlare || !text) {
      throw new Error(
        `annonslank: kräver url, handlare och länktext — fick "${url}", "${handlare}", "${text}"`
      );
    }
    const lank = sparadUrl(handlare, url);
    if (!lank) return text;
    return `<a class="annonslank" href="${lank}" rel="sponsored nofollow noopener" target="_blank">${text}<span class="annonslank-markning"> (annonslänk till ${htmlText(handlare)})</span></a>`;
  });

  // Datumformat för sitemap och RSS-flöde
  eleventyConfig.addFilter("htmlDateString", (value) =>
    new Date(value).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("isoDate", (value) => new Date(value).toISOString());

  eleventyConfig.addFilter("rssDate", (post) =>
    new Date(post ? post.date : Date.now()).toISOString()
  );

  // Sorterar en lista guider fallande efter besök från popularitet.json.
  // Stabil sortering (Array.prototype.sort är stabil i Node) — saknas siffra
  // eller hela filen räknas det som 0, och ordningen förblir oförändrad.
  eleventyConfig.addFilter("sorteraEfterBesok", (guider) =>
    [...guider].sort((a, b) => {
      const aBesok = popularitet[a.fileSlug] ?? 0;
      const bBesok = popularitet[b.fileSlug] ?? 0;
      return bBesok - aBesok;
    })
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
  };
};
