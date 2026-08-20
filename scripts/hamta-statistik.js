#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ACCOUNT_TAG = "ef8466a755154bee4f5f7028ac3a96ff";

// Web Analytics-sajtens ID (siteTag), inte konto-ID. REST-endpointen
// /rum/site_info/list gav "Authentication error" med det tillgängliga tokenet
// (saknar den behörigheten) — hämtat 2026-08-07 i stället genom att gruppera
// rumPageloadEventsAdaptiveGroups på siteTag mot kontots egen data.
const SITE_TAG = "caa682bff1ab423b85c5380cd23f2bdb";

const OUTPUT_PATH = path.join(__dirname, "..", "src", "_data", "popularitet.json");
const MD_PATH = path.join(__dirname, "..", "CLAUDE.md");
const MARKOR_START = "<!-- TRAFIK:START -->";
const MARKOR_SLUT = "<!-- TRAFIK:END -->";

const DAGAR_BAKAT = 30;
const KORT_PERIOD = 7;
const ANTAL_TOPPSIDOR = 10;

const GUIDE_SOKVAG = /^\/guider\/([a-z0-9-]+)\/$/;

function byggFraga(medBotfilter) {
  const botFilter = medBotfilter ? ", bot: 0" : "";
  return `
    query Sidvisningar($since: Time!, $until: Time!, $siteTag: String!) {
      viewer {
        accounts(filter: { accountTag: "${ACCOUNT_TAG}" }) {
          rumPageloadEventsAdaptiveGroups(
            filter: { datetime_geq: $since, datetime_leq: $until, siteTag: $siteTag${botFilter} }
            limit: 200
            orderBy: [count_DESC]
          ) {
            count
            sum { visits }
            dimensions { requestPath }
          }
        }
      }
    }
  `;
}

async function fraga(token, query, since, until) {
  const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        since: since.toISOString(),
        until: until.toISOString(),
        siteTag: SITE_TAG,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Cloudflare svarade ${response.status} ${response.statusText}\n${text}`);
  }

  return response.json();
}

// Botfiltret motsvarar "Exclude bots = Yes" i Web Analytics. Fältet är inte
// dokumenterat i det publika schemat, så vi provar med filtret och faller
// tillbaka på ofiltrerad data om Cloudflare klagar — hellre grövre siffror än
// ett jobb som dör.
async function hamtaPeriod(token, dagar) {
  const until = new Date();
  const since = new Date(until.getTime() - dagar * 24 * 60 * 60 * 1000);

  let botfiltrerat = true;
  let kropp = await fraga(token, byggFraga(true), since, until);

  if (kropp.errors && kropp.errors.length > 0) {
    console.warn(
      `Botfiltrerad fråga (${dagar} dagar) avvisades av Cloudflare, försöker utan filter. Fel: ${JSON.stringify(kropp.errors)}`
    );
    botfiltrerat = false;
    kropp = await fraga(token, byggFraga(false), since, until);
  }

  if (kropp.errors && kropp.errors.length > 0) {
    throw new Error(`Cloudflare GraphQL returnerade fel:\n${JSON.stringify(kropp.errors, null, 2)}`);
  }

  const grupper = kropp.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];

  const sidor = new Map();
  let besokTotalt = 0;
  let sidvisningarTotalt = 0;

  for (const grupp of grupper) {
    const sokvag = grupp.dimensions?.requestPath ?? "";
    const sidvisningar = grupp.count ?? 0;
    const besok = grupp.sum?.visits ?? 0;
    const forra = sidor.get(sokvag) ?? { besok: 0, sidvisningar: 0 };
    sidor.set(sokvag, {
      besok: forra.besok + besok,
      sidvisningar: forra.sidvisningar + sidvisningar,
    });
    besokTotalt += besok;
    sidvisningarTotalt += sidvisningar;
  }

  return { sidor, besokTotalt, sidvisningarTotalt, botfiltrerat, since, until, rader: grupper.length };
}

function datum(d) {
  return d.toISOString().slice(0, 10);
}

function guideTotaler(sidor) {
  let besok = 0;
  let sidvisningar = 0;
  for (const [sokvag, varde] of sidor) {
    if (!GUIDE_SOKVAG.test(sokvag)) continue;
    besok += varde.besok;
    sidvisningar += varde.sidvisningar;
  }
  return { besok, sidvisningar };
}

function byggBlock(kort, lang) {
  const alla = new Set([...kort.sidor.keys(), ...lang.sidor.keys()]);
  const toppsidor = [...alla]
    .map((sokvag) => ({
      sokvag,
      kortBesok: kort.sidor.get(sokvag)?.besok ?? 0,
      langBesok: lang.sidor.get(sokvag)?.besok ?? 0,
      langSidvisningar: lang.sidor.get(sokvag)?.sidvisningar ?? 0,
    }))
    .sort((a, b) => b.langBesok - a.langBesok || b.langSidvisningar - a.langSidvisningar)
    .slice(0, ANTAL_TOPPSIDOR);

  const guiderKort = guideTotaler(kort.sidor);
  const guiderLang = guideTotaler(lang.sidor);

  const botText = kort.botfiltrerat && lang.botfiltrerat
    ? "botar bortfiltrerade"
    : "**utan botfilter — siffrorna innehåller skannrar och botar**";

  const rader = [];
  rader.push(
    `*Hämtad automatiskt ${datum(lang.until)} av \`scripts/hamta-statistik.js\` från Cloudflare`
  );
  rader.push(`Web Analytics, ${botText}.`);
  rader.push("Skriv inte i blocket för hand — det skrivs över varje måndag.*");
  rader.push("");
  rader.push(`| | ${KORT_PERIOD} dagar | ${DAGAR_BAKAT} dagar |`);
  rader.push("|---|---|---|");
  rader.push(`| Besök | ${kort.besokTotalt} | ${lang.besokTotalt} |`);
  rader.push(`| Sidvisningar | ${kort.sidvisningarTotalt} | ${lang.sidvisningarTotalt} |`);
  rader.push(`| **Samtliga \`/guider/\`-sidor, besök** | **${guiderKort.besok}** | **${guiderLang.besok}** |`);
  rader.push("");

  if (toppsidor.length === 0) {
    rader.push(`Inga sidvisningar alls under perioden ${datum(lang.since)}–${datum(lang.until)}.`);
    return rader;
  }

  rader.push(`Mest besökta sökvägar, ${DAGAR_BAKAT} dagar (${datum(lang.since)}–${datum(lang.until)}):`);
  rader.push("");
  rader.push(`| Sökväg | Besök ${KORT_PERIOD} d | Besök ${DAGAR_BAKAT} d |`);
  rader.push("|---|---|---|");
  for (const sida of toppsidor) {
    rader.push(`| \`${sida.sokvag}\` | ${sida.kortBesok} | ${sida.langBesok} |`);
  }
  return rader;
}

function skrivBlock(mdText, rader) {
  // Markörerna nämns också i löptexten i CLAUDE.md, så vi matchar bara rader där
  // markören står ensam — annars skulle scriptet skriva mitt i dokumentationen.
  const radMatch = (markor) => {
    const mönster = markor.replace(/[.*+?^${}()|[\]\\]/g, (tecken) => "\\" + tecken);
    return new RegExp("^([ \\t]*)" + mönster + "[ \\t]*$", "m").exec(mdText);
  };

  const start = radMatch(MARKOR_START);
  const slut = radMatch(MARKOR_SLUT);
  if (!start || !slut || slut.index < start.index) {
    throw new Error(
      `Hittade inte ${MARKOR_START} / ${MARKOR_SLUT} som egna rader i ${MD_PATH}. Filen lämnas orörd.`
    );
  }

  const indrag = start[1];
  const indraget = rader.map((rad) => (rad === "" ? "" : indrag + rad)).join("\n");
  const fore = mdText.slice(0, start.index + start[0].length);
  const efter = mdText.slice(slut.index);
  return `${fore}\n${indraget}\n${efter}`;
}

function skrivPopularitet(lang) {
  const besok = {};
  for (const [sokvag, varde] of lang.sidor) {
    const match = sokvag.match(GUIDE_SOKVAG);
    if (!match) continue;
    besok[match[1]] = (besok[match[1]] ?? 0) + varde.sidvisningar;
  }

  const slugar = Object.keys(besok);
  if (slugar.length === 0) {
    console.log(
      `Inga guide-sökvägar matchade i svaret (${lang.rader} rader totalt från Cloudflare). Behåller befintlig popularitet.json orörd.`
    );
    return;
  }

  const sorterat = Object.fromEntries(Object.entries(besok).sort(([a], [b]) => a.localeCompare(b)));
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sorterat, null, 2) + "\n");

  const topp3 = Object.entries(besok)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([slug, antal]) => `${slug} (${antal})`)
    .join(", ");
  console.log(`${slugar.length} guider med besök. Topp 3: ${topp3}`);
}

async function main() {
  const token = process.env.CF_API_TOKEN;
  if (!token) {
    console.error("CF_API_TOKEN saknas i miljön. Sätt den innan du kör skriptet.");
    process.exit(1);
  }

  const lang = await hamtaPeriod(token, DAGAR_BAKAT);
  const kort = await hamtaPeriod(token, KORT_PERIOD);

  console.log(`Period: ${datum(lang.since)} till ${datum(lang.until)}`);
  skrivPopularitet(lang);

  const mdText = fs.readFileSync(MD_PATH, "utf8");
  const nyText = skrivBlock(mdText, byggBlock(kort, lang));
  if (nyText === mdText) {
    console.log("Trafikblocket i CLAUDE.md var redan aktuellt.");
  } else {
    fs.writeFileSync(MD_PATH, nyText);
    console.log("Trafikblocket i CLAUDE.md uppdaterat.");
  }
}

module.exports = { byggBlock, skrivBlock, hamtaPeriod, MARKOR_START, MARKOR_SLUT };

if (require.main === module) {
  main().catch((error) => {
    console.error("Oväntat fel:", error.message ?? error);
    process.exit(1);
  });
}
