/**
 * Hämtar dagsdata för dashboarden och skriver data/dashboard.json.
 * Körs av .github/workflows/dashboard.yml — inte av sajtbygget.
 *
 * data/ ligger utanför Eleventys input (src/) med flit: filerna ska aldrig
 * publiceras på sajten.
 *
 * Kräver miljövariabler:
 *   GOOGLE_SA_KEY     hela JSON-nyckeln för tjänstekontot
 *   GA4_PROPERTY_ID   numeriskt egendoms-id (inte mät-id G-...)
 *   CF_API_TOKEN      samma secret som hamta-statistik.js använder
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { JWT } from "google-auth-library";
import { load as yamlLoad } from "js-yaml";

const SITE = "https://barnprylsdoktorn.se";
const GSC_SITE = "sc-domain:barnprylsdoktorn.se";
const CF_ACCOUNT = "ef8466a755154bee4f5f7028ac3a96ff";
const CF_SITE_TAG = "caa682bff1ab423b85c5380cd23f2bdb";
const UT = "data/dashboard.json";
const FEL = [];

// Egna och kända icke-redaktionella hänvisare. Adtractions granskning av kanalen
// syns som secure.adtraction.com och är inte en länk någon satt till oss.
const EGNA_HANVISARE = /(^|\.)barnprylsdoktorn\.se$|adtraction\.com$|adt231\.net$|babyworld\.se$|babyland\.se$|storochliten\.se$/i;

const dag = (d) => d.toISOString().slice(0, 10);
const bakat = (n) => dag(new Date(Date.now() - n * 86400000));

function klient() {
  const raw = process.env.GOOGLE_SA_KEY;
  if (!raw) throw new Error("GOOGLE_SA_KEY saknas");
  const key = JSON.parse(raw);
  return new JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: [
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/analytics.readonly",
    ],
  });
}

async function anropa(auth, url, body) {
  const { token } = await auth.getAccessToken();
  const svar = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!svar.ok) throw new Error(`${svar.status} ${url.split("/").pop()}: ${(await svar.text()).slice(0, 300)}`);
  return svar.json();
}

/* ---------- Search Console ---------- */

const gscUrl = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`;

async function gscFraga(auth, start, slut, dimensions, radgrans = 25) {
  const r = await anropa(auth, gscUrl, {
    startDate: start,
    endDate: slut,
    dimensions,
    rowLimit: radgrans,
    dataState: "all",
  });
  return r.rows || [];
}

function summera(rader) {
  const s = rader.reduce(
    (a, r) => ({ klick: a.klick + r.clicks, visningar: a.visningar + r.impressions, viktad: a.viktad + r.position * r.impressions }),
    { klick: 0, visningar: 0, viktad: 0 }
  );
  return {
    klick: s.klick,
    visningar: s.visningar,
    ctr: s.visningar ? s.klick / s.visningar : 0,
    position: s.visningar ? s.viktad / s.visningar : null,
  };
}

async function hamtaGsc(auth) {
  const slut = bakat(1);
  const start = bakat(28);
  const fStart = bakat(56);
  const fSlut = bakat(29);

  const [perDag, forra, fragor, sidor, lander] = await Promise.all([
    gscFraga(auth, start, slut, ["date"], 60),
    gscFraga(auth, fStart, fSlut, ["date"], 60),
    gscFraga(auth, start, slut, ["query"], 30),
    gscFraga(auth, start, slut, ["page"], 30),
    gscFraga(auth, start, slut, ["country"], 5),
  ]);

  const rad = (r, nyckel) => ({
    [nyckel]: r.keys[0],
    klick: r.clicks,
    visningar: r.impressions,
    ctr: r.ctr,
    position: r.position,
  });

  return {
    tillganglig: true,
    period: { start, slut },
    totalt: summera(perDag),
    foregaende: summera(forra),
    perDag: perDag.map((r) => ({ datum: r.keys[0], klick: r.clicks, visningar: r.impressions, position: r.position })),
    toppfragor: fragor.map((r) => rad(r, "fraga")),
    toppsidor: sidor.map((r) => rad(r, "url")),
    lander: lander.map((r) => rad(r, "land")),
  };
}

/* ---------- Indexering ---------- */

async function hamtaIndexering(auth, urler) {
  const sidor = [];
  for (const url of urler) {
    try {
      const r = await anropa(auth, "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        inspectionUrl: url,
        siteUrl: GSC_SITE,
        languageCode: "sv",
      });
      const i = r.inspectionResult?.indexStatusResult || {};
      sidor.push({
        url,
        verdict: i.verdict || "OKÄND",
        lage: i.coverageState || null,
        robots: i.robotsTxtState || null,
        sistaCrawl: i.lastCrawlTime || null,
        upptackt: i.pageFetchState || null,
      });
    } catch (e) {
      FEL.push(`Indexering ${url}: ${e.message}`);
      sidor.push({ url, verdict: "FEL", lage: null, robots: null, sistaCrawl: null, upptackt: null });
    }
    await new Promise((r) => setTimeout(r, 350)); // 600/min är taket
  }
  return {
    tillganglig: true,
    kontrollerade: sidor.length,
    indexerade: sidor.filter((s) => s.verdict === "PASS").length,
    sidor,
  };
}

/* ---------- GA4 ---------- */

async function hamtaGa4(auth) {
  const pid = process.env.GA4_PROPERTY_ID;
  if (!pid) return { tillganglig: false, orsak: "GA4_PROPERTY_ID saknas" };
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${pid}:runReport`;

  const rapport = async (body) => anropa(auth, url, body);

  const [dagar, sidor, kanaler, klick] = await Promise.all([
    rapport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    rapport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "averageSessionDuration" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 20,
    }),
    rapport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 8,
    }),
    rapport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      dimensions: [{ name: "linkUrl" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: { filter: { fieldName: "eventName", stringFilter: { value: "click" } } },
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 15,
    }).catch((e) => { FEL.push(`GA4 utgående klick: ${e.message}`); return { rows: [] }; }),
  ]);

  const rader = (r, namn, matt) =>
    (r.rows || []).map((x) => {
      const o = { [namn]: x.dimensionValues[0].value };
      matt.forEach((m, i) => (o[m] = Number(x.metricValues[i].value)));
      return o;
    });

  const perDag = rader(dagar, "datum", ["sessioner", "anvandare", "sidvisningar"]);
  return {
    tillganglig: true,
    totalt: perDag.reduce(
      (a, d) => ({ sessioner: a.sessioner + d.sessioner, anvandare: a.anvandare + d.anvandare, sidvisningar: a.sidvisningar + d.sidvisningar }),
      { sessioner: 0, anvandare: 0, sidvisningar: 0 }
    ),
    perDag,
    toppsidor: rader(sidor, "sokvag", ["sidvisningar", "snittid"]),
    kanaler: rader(kanaler, "kanal", ["sessioner"]),
    utgaendeKlick: rader(klick, "mal", ["antal"]),
  };
}

/* ---------- Cloudflare Web Analytics ---------- */
/* GA4 räknar bara den som tryckt Godkänn. Cloudflare räknar alla — och är det
   enda stället där hänvisande domäner går att läsa, alltså om länkoutreachen
   ger utdelning. Samma token och samma siteTag som hamta-statistik.js. */

async function cfFraga(token, dimension, medBotfilter, since, until) {
  const botFilter = medBotfilter ? ", bot: 0" : "";
  const query = `
    query Rum($since: Time!, $until: Time!, $siteTag: String!) {
      viewer {
        accounts(filter: { accountTag: "${CF_ACCOUNT}" }) {
          rumPageloadEventsAdaptiveGroups(
            filter: { datetime_geq: $since, datetime_leq: $until, siteTag: $siteTag${botFilter} }
            limit: 200
            orderBy: [count_DESC]
          ) {
            count
            sum { visits }
            dimensions { ${dimension} }
          }
        }
      }
    }`;

  const svar = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { since: since.toISOString(), until: until.toISOString(), siteTag: CF_SITE_TAG },
    }),
  });
  if (!svar.ok) throw new Error(`Cloudflare svarade ${svar.status}: ${(await svar.text()).slice(0, 300)}`);
  const kropp = await svar.json();
  if (kropp.errors?.length) {
    // bot-fältet står inte i det publika schemat — faller tillbaka på ofiltrerat
    // hellre än att dö, precis som hamta-statistik.js gör.
    if (medBotfilter) return cfFraga(token, dimension, false, since, until).then((r) => ({ ...r, botfiltrerat: false }));
    throw new Error(`Cloudflare GraphQL: ${JSON.stringify(kropp.errors).slice(0, 300)}`);
  }
  return {
    botfiltrerat: medBotfilter,
    grupper: kropp.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [],
  };
}

const cfSumma = (grupper) =>
  grupper.reduce(
    (a, g) => ({ besok: a.besok + (g.sum?.visits ?? 0), sidvisningar: a.sidvisningar + (g.count ?? 0) }),
    { besok: 0, sidvisningar: 0 }
  );

async function hamtaCloudflare() {
  const token = process.env.CF_API_TOKEN;
  if (!token) return { tillganglig: false, orsak: "CF_API_TOKEN saknas" };

  const until = new Date();
  const since28 = new Date(until.getTime() - 28 * 86400000);
  const since7 = new Date(until.getTime() - 7 * 86400000);

  const [sidor28, sidor7, ofiltrerat28, hanvisare28] = await Promise.all([
    cfFraga(token, "requestPath", true, since28, until),
    cfFraga(token, "requestPath", true, since7, until),
    cfFraga(token, "requestPath", false, since28, until),
    cfFraga(token, "refererHost", true, since28, until),
  ]);

  const t28 = cfSumma(sidor28.grupper);
  const t7 = cfSumma(sidor7.grupper);
  const tOfilt = cfSumma(ofiltrerat28.grupper);

  const guideVag = /^\/guider\/[a-z0-9-]+\/$/;
  const guider28 = cfSumma(sidor28.grupper.filter((g) => guideVag.test(g.dimensions?.requestPath ?? "")));

  const hanvisare = hanvisare28.grupper
    .map((g) => ({ vard: g.dimensions?.refererHost ?? "", besok: g.sum?.visits ?? 0, sidvisningar: g.count ?? 0 }))
    .filter((h) => h.vard && h.vard !== "(none)");
  const externa = hanvisare.filter((h) => !EGNA_HANVISARE.test(h.vard));

  return {
    tillganglig: true,
    botfiltrerat: sidor28.botfiltrerat,
    period: { start: dag(since28), slut: dag(until) },
    besok28: t28.besok,
    sidvisningar28: t28.sidvisningar,
    besok7: t7.besok,
    besokOfiltrerat28: tOfilt.besok,
    botandel: tOfilt.besok ? Math.max(0, 1 - t28.besok / tOfilt.besok) : null,
    guideBesok28: guider28.besok,
    guideSidvisningar28: guider28.sidvisningar,
    toppsidor: sidor28.grupper
      .map((g) => ({ sokvag: g.dimensions?.requestPath ?? "", besok: g.sum?.visits ?? 0, sidvisningar: g.count ?? 0 }))
      .sort((a, b) => b.besok - a.besok || b.sidvisningar - a.sidvisningar)
      .slice(0, 12),
    hanvisare: externa.sort((a, b) => b.besok - a.besok).slice(0, 12),
    hanvisandeDomaner: externa.length,
    egnaHanvisare: hanvisare.filter((h) => EGNA_HANVISARE.test(h.vard)).length,
  };
}

/* ---------- Sajten ---------- */

async function hamtaSajt() {
  const svar = await fetch(`${SITE}/sitemap.xml`, { headers: { "Cache-Control": "no-cache" } });
  const xml = await svar.text();
  const urler = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  // Tillfällig felsökning 2026-08-27: sitemapUrler kom tillbaka 0 två körningar i
  // rad från GitHub Actions, trots att sitemapen är frisk vid manuell curl. Logga
  // vad svaret faktiskt innehöll så nästa körning visar orsaken i stället för att
  // bara gissa. Ta bort igen när orsaken är hittad och åtgärdad.
  if (urler.length === 0) {
    FEL.push(
      `Sitemap gav 0 URLer. Status ${svar.status}, content-type ${svar.headers.get("content-type")}, cf-cache-status ${svar.headers.get("cf-cache-status")}, längd ${xml.length}. Första 300 tecken: ${JSON.stringify(xml.slice(0, 300))}`
    );
  }

  const kontroll = [];
  for (const url of urler) {
    const t0 = Date.now();
    try {
      const r = await fetch(url, { redirect: "manual" });
      kontroll.push({ url, status: r.status, ms: Date.now() - t0 });
    } catch (e) {
      kontroll.push({ url, status: 0, ms: Date.now() - t0, fel: e.message });
    }
  }

  return {
    sitemapUrler: urler.length,
    kontroll,
    trasiga: kontroll.filter((k) => k.status !== 200),
    snittsvar: Math.round(kontroll.reduce((a, k) => a + k.ms, 0) / (kontroll.length || 1)),
  };
}

/* ---------- Affiliatelänkarnas hälsa ---------- */
/* Produktsidor dör tyst: en stol utgår ur sortimentet och köpblocket pekar på
   en 404 utan att någon märker det. Vi kan inte läsa lagerstatus — den kräver
   att sidan tolkas — men en död adress syns direkt. */

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

function samlaAffiliatelankar() {
  const mal = [];

  const prod = readFileSync("src/_data/produkter.js", "utf8");
  for (const block of prod.split(/\n  "/).slice(1)) {
    const nyckel = block.match(/^([a-z0-9-]+)"/)?.[1];
    const namn = block.match(/namn:\s*"([^"]*)"/)?.[1];
    const url = block.match(/url:\s*"([^"]*)"/)?.[1];
    const handlare = block.match(/handlare:\s*"([^"]*)"/)?.[1];
    if (!nyckel) continue;
    mal.push({ url: url || "", namn: namn || nyckel, handlare: handlare || "", kalla: "produkter.js", nyckel });
  }

  const kat = "src/artiklar";
  for (const fil of readdirSync(kat).filter((f) => f.endsWith(".md"))) {
    const text = readFileSync(`${kat}/${fil}`, "utf8");
    for (const m of text.matchAll(/\{%\s*annonslank\s+"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\s*%\}/g)) {
      mal.push({ url: m[1], namn: m[3], handlare: m[2], kalla: fil.replace(/\.md$/, ""), nyckel: null });
    }
  }
  return mal;
}

async function hamtaLankhalsa() {
  const mal = samlaAffiliatelankar();
  const kontrollerade = [];

  for (const m of mal) {
    if (!m.url) {
      kontrollerade.push({ ...m, status: null, lage: "ingen länk" });
      continue;
    }
    try {
      const r = await fetch(m.url, { headers: { "User-Agent": UA, "Accept-Language": "sv-SE,sv;q=0.9" } });
      const lage =
        r.status === 200 ? "svarar" : r.status === 403 || r.status === 429 ? "kontroll blockerad" : "svarar inte";
      kontrollerade.push({ ...m, status: r.status, lage, slutUrl: r.url !== m.url ? r.url : null });
    } catch (e) {
      kontrollerade.push({ ...m, status: 0, lage: "svarar inte", fel: e.message });
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  return {
    tillganglig: true,
    lankar: kontrollerade,
    utanLank: kontrollerade.filter((k) => !k.url).length,
    doda: kontrollerade.filter((k) => k.lage === "svarar inte").length,
    blockerade: kontrollerade.filter((k) => k.lage === "kontroll blockerad").length,
  };
}

/* ---------- Innehåll i repot ---------- */

function lasProgram() {
  // Namnen har mellanslag och &-tecken ("Stor&Liten", "Baby V") och står ibland
  // i citattecken, ibland inte. Ett värde räknas som ifyllt först när det är en
  // riktig spårlänk — eleventy.config.js gör samma bedömning.
  const program = {};
  try {
    const konf = readFileSync("eleventy.config.js", "utf8");
    const block = konf.match(/const ADTRACTION_PROGRAM\s*=\s*\{([\s\S]*?)\n\};/);
    if (!block) throw new Error("hittade inte ADTRACTION_PROGRAM");
    for (const rad of block[1].split("\n")) {
      const p = rad.match(/^\s*(?:"([^"]+)"|([^\s":]+))\s*:\s*"([^"]*)"/);
      if (p) program[p[1] ?? p[2]] = (p[3] || "").startsWith("https://");
    }
  } catch (e) {
    FEL.push(`Affiliatestatus: ${e.message}`);
  }
  return program;
}

function hamtaInnehall() {
  const kat = "src/artiklar";
  const filer = readdirSync(kat).filter((f) => f.endsWith(".md"));

  const rat = {};
  for (const f of filer) rat[f] = readFileSync(`${kat}/${f}`, "utf8");

  // Löptextlänkar räknas även från sidorna utanför /guider/ — startsidan,
  // väljaren och Plustest-listan är de starkaste interna länkkällorna.
  const ovrigt = [];
  for (const f of readdirSync("src")) {
    if (/\.(md|njk)$/.test(f)) ovrigt.push({ namn: f, text: readFileSync(`src/${f}`, "utf8") });
  }

  const guider = filer.map((f) => {
    const text = rat[f];
    const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    let fm = {};
    try { fm = m ? yamlLoad(m[1]) || {} : {}; } catch (e) { FEL.push(`Frontmatter ${f}: ${e.message}`); }
    const kropp = m ? m[2] : text;
    const slug = f.replace(/\.md$/, "");

    // Källförteckningen står som markdownlänkar under "## Källor", inte i
    // frontmatter — det är skillnaden mot forstahunden.
    const kallblock = kropp.split(/\n##\s+Källor\s*\n/)[1] || "";
    const kallor = [...kallblock.matchAll(/^\s*-\s*\[[^\]]+\]\(([^)]+)\)/gm)].map((k) => k[1]);

    const harAffiliate = /\{%\s*(annonslank|kopblock)/.test(kropp);
    const inlankar = [
      ...filer.filter((a) => a !== f && rat[a].includes(`/guider/${slug}/`)).map((a) => a.replace(/\.md$/, "")),
      ...ovrigt.filter((o) => o.text.includes(`/guider/${slug}/`)).map((o) => o.namn),
    ];
    const lasharnastIn = filer.filter((a) => {
      if (a === f) return false;
      const fmA = rat[a].match(/^---\n([\s\S]*?)\n---/);
      return fmA ? new RegExp(`lasharnast:.*"${slug}"`).test(fmA[1]) : false;
    }).length;

    return {
      fil: f,
      slug,
      titel: fm.title || f,
      publicerad: fm.date ? String(fm.date).slice(0, 10) : null,
      uppdaterad: fm.uppdaterad ? String(fm.uppdaterad).slice(0, 10) : null,
      ord: kropp.split(/\s+/).filter(Boolean).length,
      kallor: kallor.length,
      kallDomaner: [...new Set(kallor.map((u) => (u.match(/^https?:\/\/([^/]+)/) || [])[1]).filter(Boolean))],
      annonslankar: fm.annonslankar || null,
      harAffiliate,
      omarkt: harAffiliate && !fm.annonslankar,
      lasharnast: Array.isArray(fm.lasharnast) ? fm.lasharnast : [],
      saknarLasharnast: !Array.isArray(fm.lasharnast) || fm.lasharnast.length === 0,
      inlankar: inlankar.length,
      lasharnastIn,
      foraldralos: inlankar.length === 0 && lasharnastIn === 0,
    };
  });

  const program = lasProgram();

  return {
    guider: guider.sort((a, b) => (b.publicerad || "").localeCompare(a.publicerad || "")),
    antal: guider.length,
    totaltOrd: guider.reduce((a, g) => a + g.ord, 0),
    affiliateprogram: program,
    aktivaProgram: Object.values(program).filter(Boolean).length,
    omarkta: guider.filter((g) => g.omarkt).map((g) => g.slug),
    foraldralosa: guider.filter((g) => g.foraldralos).map((g) => g.slug),
    utanLasharnast: guider.filter((g) => g.saknarLasharnast).map((g) => g.slug),
    svagastLankade: [...guider].sort((a, b) => a.inlankar - b.inlankar).slice(0, 5).map((g) => ({ slug: g.slug, inlankar: g.inlankar })),
  };
}

/* ---------- Kör ---------- */

mkdirSync("data", { recursive: true });
const tidigare = existsSync(UT) ? JSON.parse(readFileSync(UT, "utf8")) : {};
const ut = { hamtad: new Date().toISOString(), fel: FEL };

try {
  ut.sajt = await hamtaSajt();
} catch (e) { FEL.push(`Sajtkontroll: ${e.message}`); ut.sajt = tidigare.sajt || null; }

try {
  ut.innehall = hamtaInnehall();
} catch (e) { FEL.push(`Innehåll: ${e.message}`); ut.innehall = tidigare.innehall || null; }

try {
  ut.lankhalsa = await hamtaLankhalsa();
} catch (e) { FEL.push(`Länkhälsa: ${e.message}`); ut.lankhalsa = tidigare.lankhalsa || { tillganglig: false, orsak: e.message }; }

try {
  ut.cloudflare = await hamtaCloudflare();
} catch (e) { FEL.push(`Cloudflare: ${e.message}`); ut.cloudflare = { tillganglig: false, orsak: e.message }; }

try {
  const auth = klient();
  try { ut.gsc = await hamtaGsc(auth); }
  catch (e) { FEL.push(`Search Console: ${e.message}`); ut.gsc = { tillganglig: false, orsak: e.message }; }

  const urler = (ut.sajt?.kontroll || []).map((k) => k.url);
  try { ut.indexering = await hamtaIndexering(auth, urler); }
  catch (e) { FEL.push(`Indexering: ${e.message}`); ut.indexering = { tillganglig: false, orsak: e.message }; }

  try { ut.ga4 = await hamtaGa4(auth); }
  catch (e) { FEL.push(`GA4: ${e.message}`); ut.ga4 = { tillganglig: false, orsak: e.message }; }
} catch (e) {
  FEL.push(`Google-inloggning: ${e.message}`);
  ut.gsc = { tillganglig: false, orsak: e.message };
  ut.indexering = { tillganglig: false, orsak: e.message };
  ut.ga4 = { tillganglig: false, orsak: e.message };
}

// Historik: en rad per dygn, så trenderna finns kvar även när GSC:s och
// Cloudflares fönster rullar vidare.
const historik = Array.isArray(tidigare.historik) ? tidigare.historik : [];
const idag = dag(new Date());
const punkt = {
  datum: idag,
  hanvisandeDomaner: ut.cloudflare?.hanvisandeDomaner ?? null,
  besok28: ut.cloudflare?.besok28 ?? null,
  guideBesok28: ut.cloudflare?.guideBesok28 ?? null,
  klick28: ut.gsc?.totalt?.klick ?? null,
  visningar28: ut.gsc?.totalt?.visningar ?? null,
  position: ut.gsc?.totalt?.position ?? null,
  indexerade: ut.indexering?.indexerade ?? null,
  kontrollerade: ut.indexering?.kontrollerade ?? null,
  sessioner28: ut.ga4?.totalt?.sessioner ?? null,
  guider: ut.innehall?.antal ?? null,
};
ut.historik = [...historik.filter((h) => h.datum !== idag), punkt].slice(-400);

writeFileSync(UT, JSON.stringify(ut, null, 2) + "\n");
console.log(`Skrev ${UT}. Fel: ${FEL.length}`);
FEL.forEach((f) => console.log("  ! " + f));
