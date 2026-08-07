const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const produkter = require("./src/_data/produkter.js");

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
  // Kopiera CSS och bilder rakt igenom till den färdiga sajten
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/bilder");
  eleventyConfig.addPassthroughCopy("src/fonter");
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
  // Saknar produkten en url renderas blocket utan knapp och utan annonsmärkning —
  // affiliatelänkarna läggs till senare, ett ställe per produkt, i produkter.js.
  eleventyConfig.addShortcode("kopblock", (nyckel) => {
    const produkt = produkter[nyckel];
    if (!produkt) {
      throw new Error(`kopblock: hittar ingen produkt med nyckeln "${nyckel}" i produkter.js`);
    }

    const knappOchMarkning = produkt.url
      ? `
    <p class="kopblock-markning">Annonslänk. Sajten får provision om du köper via den — priset för dig är detsamma. <a href="/sa-tjanar-sajten-pengar/">Så tjänar sajten pengar</a></p>
    <a class="kopblock-knapp" href="${produkt.url}" rel="sponsored nofollow noopener" target="_blank">Se priset hos ${produkt.handlare}</a>`
      : "";

    return `<div class="kopblock">
    <h3 class="kopblock-namn">${produkt.namn}</h3>
    <p class="kopblock-spec">${produkt.specifikation}</p>
    <p class="kopblock-motivering">${produkt.motivering}</p>
    <p class="kopblock-pris">${produkt.pris}</p>${knappOchMarkning}
  </div>`;
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
