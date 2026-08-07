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
const DAGAR_BAKAT = 30;

const QUERY = `
  query Sidvisningar($since: Time!, $until: Time!, $siteTag: String!) {
    viewer {
      accounts(filter: { accountTag: "${ACCOUNT_TAG}" }) {
        rumPageloadEventsAdaptiveGroups(
          filter: { datetime_geq: $since, datetime_leq: $until, siteTag: $siteTag }
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

const GUIDE_SOKVAG = /^\/guider\/([a-z0-9-]+)\/$/;

async function main() {
  const token = process.env.CF_API_TOKEN;
  if (!token) {
    console.error("CF_API_TOKEN saknas i miljön. Sätt den innan du kör skriptet.");
    process.exit(1);
  }

  const until = new Date();
  const since = new Date(until.getTime() - DAGAR_BAKAT * 24 * 60 * 60 * 1000);

  const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        since: since.toISOString(),
        until: until.toISOString(),
        siteTag: SITE_TAG,
      },
    }),
  });

  if (!response.ok) {
    console.error(`Cloudflare svarade ${response.status} ${response.statusText}`);
    console.error(await response.text());
    process.exit(1);
  }

  const kropp = await response.json();

  if (kropp.errors && kropp.errors.length > 0) {
    console.error("Cloudflare GraphQL returnerade fel:");
    console.error(JSON.stringify(kropp.errors, null, 2));
    process.exit(1);
  }

  const grupper = kropp.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];

  const besok = {};
  for (const grupp of grupper) {
    const sokvag = grupp.dimensions?.requestPath ?? "";
    const match = sokvag.match(GUIDE_SOKVAG);
    if (!match) continue;
    const slug = match[1];
    besok[slug] = (besok[slug] ?? 0) + grupp.count;
  }

  const slugar = Object.keys(besok);
  const periodText = `${since.toISOString().slice(0, 10)} till ${until.toISOString().slice(0, 10)}`;

  if (slugar.length === 0) {
    console.log(
      `Inga guide-sökvägar matchade i svaret (period ${periodText}, ${grupper.length} rader totalt från Cloudflare). Behåller befintlig popularitet.json orörd.`
    );
    return;
  }

  const sorterat = Object.fromEntries(
    Object.entries(besok).sort(([a], [b]) => a.localeCompare(b))
  );

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sorterat, null, 2) + "\n");

  const topp3 = Object.entries(besok)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([slug, antal]) => `${slug} (${antal})`)
    .join(", ");

  console.log(`Period: ${periodText}`);
  console.log(`${slugar.length} guider med besök. Topp 3: ${topp3}`);
}

main().catch((error) => {
  console.error("Oväntat fel:", error);
  process.exit(1);
});
