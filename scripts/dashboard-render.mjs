/**
 * Bygger data/dashboard.html ur data/dashboard.json.
 * Sidan är självbärande: all CSS och JS ligger inline och inga externa anrop
 * görs — inte heller till Google Fonts. Sajtens regel om typsnitt gäller även
 * verktyget; här körs systemstacken i stället.
 *
 * Publiceras som privat Artifact på claude.ai — den ligger aldrig på sajten.
 */

import { readFileSync, writeFileSync } from "node:fs";

const d = JSON.parse(readFileSync("data/dashboard.json", "utf8"));

/* ---------- format ---------- */

const nf = new Intl.NumberFormat("sv-SE");
const tal = (n) => (n == null ? "–" : nf.format(Math.round(n)));
const dec = (n, s = 1) => (n == null ? "–" : n.toFixed(s).replace(".", ","));
const proc = (n) => (n == null ? "–" : (n * 100).toFixed(1).replace(".", ",") + " %");
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const datum = (iso) =>
  iso ? new Date(iso).toLocaleDateString("sv-SE", { day: "numeric", month: "long" }) : "–";
const datumtid = (iso) =>
  iso ? new Date(iso).toLocaleString("sv-SE", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Stockholm" }) : "–";
const kortSlug = (url) => String(url).replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "") || "/";
const vard = (url) => String(url).replace(/^https?:\/\//, "").split("/")[0];

/* ---------- diagram ---------- */

/** Ytdiagram med svagt rutnät, markerad slutpunkt och krysshårstooltip. */
function ytdiagram(punkter, { farg = "var(--graf)", inverterad = false, enhet = "", etikett = "" } = {}) {
  if (!punkter || punkter.length < 2) return tomrutaSvg();
  const B = 640, H = 180, mv = 8, mh = 2, mn = 22;
  const varden = punkter.map((p) => p.v);
  let lo = Math.min(...varden), hi = Math.max(...varden);
  if (lo === hi) { lo = lo - 1; hi = hi + 1; }
  const dyn = (hi - lo) * 0.12;
  lo -= dyn; hi += dyn;
  const x = (i) => mv + (i * (B - mv - mh)) / (punkter.length - 1);
  const y = (v) => {
    const t = (v - lo) / (hi - lo);
    return mv + (1 - (inverterad ? 1 - t : t)) * (H - mv - mn);
  };

  const linje = punkter.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join("");
  const yta = `${linje}L${x(punkter.length - 1).toFixed(1)},${H - mn}L${x(0).toFixed(1)},${H - mn}Z`;
  const id = "g" + Math.random().toString(36).slice(2, 8);

  const rutnat = [0, 0.5, 1]
    .map((t) => {
      const yy = mv + t * (H - mv - mn);
      return `<line x1="${mv}" y1="${yy.toFixed(1)}" x2="${B - mh}" y2="${yy.toFixed(1)}" class="rutnat"/>`;
    })
    .join("");

  const forsta = punkter[0].d, sista = punkter[punkter.length - 1].d;
  const sist = punkter[punkter.length - 1];

  return `<div class="diagram" data-serie='${esc(JSON.stringify(punkter))}' data-enhet="${esc(enhet)}" data-etikett="${esc(etikett)}">
  <svg viewBox="0 0 ${B} ${H}" role="img" aria-label="${esc(etikett)} per dag">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${farg}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${farg}" stop-opacity="0"/>
    </linearGradient></defs>
    ${rutnat}
    <path d="${yta}" fill="url(#${id})"/>
    <path d="${linje}" fill="none" stroke="${farg}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <circle cx="${x(punkter.length - 1).toFixed(1)}" cy="${y(sist.v).toFixed(1)}" r="4" fill="${farg}" stroke="var(--yta)" stroke-width="2"/>
    <line class="krysshar" x1="0" y1="${mv}" x2="0" y2="${H - mn}" stroke="${farg}" stroke-width="1" opacity="0"/>
    <circle class="kryssprick" r="4" fill="${farg}" stroke="var(--yta)" stroke-width="2" opacity="0"/>
  </svg>
  <div class="diagram__axel"><span>${esc(datum(forsta))}</span><span>${esc(datum(sista))}</span></div>
  <div class="tooltip" hidden></div>
</div>`;
}

const tomrutaSvg = () =>
  `<p class="tomt">För få dagar med data för att rita en kurva ännu.</p>`;

/** Liggande staplar: en rad per post, längd = andel av max. */
function stapellista(rader, { varde, etikett, bi, max, farg = "var(--graf)" }) {
  if (!rader.length) return `<p class="tomt">Ingen data ännu.</p>`;
  const topp = max ?? Math.max(...rader.map(varde));
  return `<ul class="staplar">${rader
    .map((r) => {
      const v = varde(r);
      const andel = topp ? Math.max(1.5, (v / topp) * 100) : 0;
      return `<li>
      <div class="staplar__topp"><span class="staplar__namn">${etikett(r)}</span><span class="staplar__tal">${tal(v)}</span></div>
      <div class="staplar__spar"><span class="staplar__fyll" style="width:${andel.toFixed(1)}%;background:${farg}"></span></div>
      ${bi ? `<div class="staplar__bi">${bi(r)}</div>` : ""}
    </li>`;
    })
    .join("")}</ul>`;
}

/* ---------- delar ---------- */

function delta(nu, fore, { inverterad = false, suffix = "" } = {}) {
  if (nu == null || fore == null || fore === 0) return "";
  const diff = nu - fore;
  if (Math.abs(diff) < 0.0001) return `<span class="delta delta--lika">oförändrat</span>`;
  const bra = inverterad ? diff < 0 : diff > 0;
  const pil = diff > 0 ? "↑" : "↓";
  const andel = Math.abs((diff / fore) * 100);
  const storlek = andel >= 300 ? `${dec(nu / fore, 1)}×` : `${dec(andel, 0)} %`;
  return `<span class="delta ${bra ? "delta--upp" : "delta--ner"}">${pil} ${storlek}</span>${suffix ? ` <span class="delta__mot">${suffix}</span>` : ""}`;
}

function nyckeltal({ etikett, varde, under = "", tillstand = "" }) {
  return `<div class="kpi ${tillstand}">
    <p class="kpi__etikett">${etikett}</p>
    <p class="kpi__varde">${varde}</p>
    <p class="kpi__under">${under}</p>
  </div>`;
}

function panel(rubrik, innehall, { bredd = "", intro = "" } = {}) {
  return `<section class="panel ${bredd}">
    <h2>${rubrik}</h2>
    ${intro ? `<p class="panel__intro">${intro}</p>` : ""}
    ${innehall}
  </section>`;
}

/* ---------- innehållet ---------- */

const gsc = d.gsc?.tillganglig ? d.gsc : null;
const idx = d.indexering?.tillganglig ? d.indexering : null;
const ga = d.ga4?.tillganglig ? d.ga4 : null;
const cf = d.cloudflare?.tillganglig ? d.cloudflare : null;
const lh = d.lankhalsa?.tillganglig ? d.lankhalsa : null;
const hist = d.historik || [];
const igar = hist.length > 1 ? hist[hist.length - 2] : null;

// Efter den här dagen är "Genomsökt – inte indexerad" inte längre en kö utan en
// bedömning av sajtens tyngd. Gränsen står i CLAUDE.md och är satt av Erik.
const EFTER_KOTID = new Date() >= new Date("2026-10-01T00:00:00Z");

/* Överst — hänvisande domäner först, eftersom externa länkar är flaskhalsen.
   Indexeringen rampar upp normalt och är därför fjärde, inte första. */
const kpier = [
  nyckeltal({
    etikett: "Hänvisande domäner, 28 d",
    varde: cf ? tal(cf.hanvisandeDomaner) : "–",
    under: !cf
      ? "väntar på Cloudflare"
      : cf.hanvisandeDomaner === 0
        ? "ingen sajt länkar hit ännu"
        : (igar?.hanvisandeDomaner != null
            ? delta(cf.hanvisandeDomaner, igar.hanvisandeDomaner, { suffix: "sedan igår" }) || "oförändrat sedan igår"
            : "första mätningen"),
    tillstand: cf && cf.hanvisandeDomaner === 0 ? "kpi--varning" : "",
  }),
  nyckeltal({
    etikett: "Visningar, 28 dagar",
    varde: gsc ? tal(gsc.totalt.visningar) : "–",
    under: gsc ? delta(gsc.totalt.visningar, gsc.foregaende.visningar, { suffix: "mot förra 28 d" }) || "första perioden" : "väntar på Search Console",
  }),
  nyckeltal({
    etikett: "Klick, 28 dagar",
    varde: gsc ? tal(gsc.totalt.klick) : "–",
    under: gsc ? (gsc.totalt.klick ? `${proc(gsc.totalt.ctr)} av visningarna` : "inga klick ännu") : "väntar på Search Console",
  }),
  nyckeltal({
    etikett: "Indexerade sidor",
    varde: idx ? `${tal(idx.indexerade)}<span class="kpi__av"> / ${tal(idx.kontrollerade)}</span>` : "–",
    under: idx
      ? (igar?.indexerade != null
          ? delta(idx.indexerade, igar.indexerade, { suffix: "sedan igår" }) || "oförändrat sedan igår"
          : "första mätningen")
      : "väntar på Search Console",
    tillstand: idx && idx.indexerade < idx.kontrollerade && EFTER_KOTID ? "kpi--varning" : "",
  }),
].join("");

/* Externa länkar */
const hanvisarPanel = !cf
  ? `<p class="tomt">Hänvisande domäner läses ur Cloudflare Web Analytics. Panelen fylls när <code>CF_API_TOKEN</code> finns i jobbet.</p>`
  : cf.hanvisandeDomaner === 0
  ? `<p class="tomt">Ingen extern domän har skickat en enda besökare på 28 dagar.${cf.egnaHanvisare ? ` Egna och kända icke-redaktionella hänvisare (Adtractions granskning, handlarnas spårdomäner) är bortsållade — ${tal(cf.egnaHanvisare)} sådan${cf.egnaHanvisare === 1 ? "" : "a"} finns i underlaget.` : ""} Outreachen är enda kanalen som kan ändra det: tio mejl i veckan, en uppföljning per prospekt.</p>`
  : `${stapellista(cf.hanvisare, {
      varde: (r) => r.besok,
      etikett: (r) => esc(r.vard),
      bi: (r) => `${tal(r.sidvisningar)} sidvisningar`,
      farg: "var(--graf)",
    })}
    <p class="notis">Egna domäner, Adtraction och handlarnas spårdomäner är bortsållade — det som står kvar är riktiga hänvisningar.</p>`;

/* Synlighet */
const synlighetPanel = !gsc
  ? `<p class="tomt">Kurvorna ritas när Search Console-hämtningen är igång.</p>`
  : gsc.totalt.visningar === 0
  ? `<p class="tomt">Search Console är kopplat, men sajten har ännu inte visats i ett enda sökresultat under perioden.</p>`
  : `<div class="minidiagram">
      <figure>
        <figcaption>Visningar per dag</figcaption>
        ${ytdiagram(gsc.perDag.map((r) => ({ d: r.datum, v: r.visningar })), { farg: "var(--graf)", etikett: "Visningar", enhet: "visningar" })}
      </figure>
      <figure>
        <figcaption>Klick per dag</figcaption>
        ${ytdiagram(gsc.perDag.map((r) => ({ d: r.datum, v: r.klick })), { farg: "var(--bra)", etikett: "Klick", enhet: "klick" })}
      </figure>
      <figure>
        <figcaption>Snittposition <span class="figcaption__not">lägre är bättre</span></figcaption>
        ${ytdiagram(gsc.perDag.map((r) => ({ d: r.datum, v: Number(r.position.toFixed(1)) })), { farg: "var(--ink-dov)", inverterad: true, etikett: "Position", enhet: "" })}
      </figure>
    </div>`;

/* Frågor och sidor */
const fragorPanel = gsc && gsc.toppfragor.length
  ? stapellista(gsc.toppfragor.slice(0, 12), {
      varde: (r) => r.visningar,
      etikett: (r) => esc(r.fraga),
      bi: (r) => `${tal(r.klick)} klick · position ${dec(r.position)} · ${proc(r.ctr)}`,
      farg: "var(--graf)",
    })
  : `<p class="tomt">${gsc ? "Search Console har ännu inte tillräckligt underlag för att visa sökfrågor." : "Väntar på Search Console."}</p>`;

const sidorPanel = gsc && gsc.toppsidor.length
  ? stapellista(gsc.toppsidor.slice(0, 12), {
      varde: (r) => r.visningar,
      etikett: (r) => esc(kortSlug(r.url)),
      bi: (r) => `${tal(r.klick)} klick · position ${dec(r.position)}`,
      farg: "var(--bra)",
    })
  : `<p class="tomt">${gsc ? "Ingen sida har visats i ett sökresultat ännu." : "Väntar på Search Console."}</p>`;

/* Indexering */
function indexTillstand(s) {
  const lage = s.lage || "";
  if (s.verdict === "PASS") return { klass: "bra", ord: "Indexerad", vikt: 5 };
  if (s.verdict === "FEL") return { klass: "fel", ord: "Kunde inte kontrolleras", vikt: 0 };
  if (/okänd/i.test(lage)) return { klass: "vilande", ord: "Okänd för Google", vikt: 1 };
  if (/omdirigering|redirect/i.test(lage)) return { klass: "vilande", ord: "Omdirigering", vikt: 4 };
  if (/upptäckt/i.test(lage)) return { klass: "varning", ord: "Upptäckt, inte genomsökt", vikt: 2 };
  if (/genomsökt/i.test(lage)) return { klass: "varning", ord: "Genomsökt, inte indexerad", vikt: 3 };
  if (s.verdict === "FAIL") return { klass: "fel", ord: "Inte indexerad", vikt: 1 };
  return { klass: "vilande", ord: lage || "Okänd status", vikt: 4 };
}

const indexPanel = idx
  ? (() => {
      const andel = idx.kontrollerade ? (idx.indexerade / idx.kontrollerade) * 100 : 0;
      const sorterade = [...idx.sidor].sort((a, b) => indexTillstand(a).vikt - indexTillstand(b).vikt);
      const atgard = sorterade.filter((s) => s.verdict !== "PASS");
      const klara = sorterade.filter((s) => s.verdict === "PASS");
      const genomsokta = idx.sidor.filter((s) => /genomsökt/i.test(s.lage || "")).length;

      const rad = (s) => {
        const t = indexTillstand(s);
        return `<tr>
          <td class="tabell__sokvag">${esc(kortSlug(s.url))}</td>
          <td><span class="chip chip--${t.klass}">${t.ord}</span>${s.verdict !== "PASS" && s.lage ? `<span class="tabell__bi">Googles ord: ${esc(s.lage)}</span>` : ""}</td>
          <td class="tabell__tal">${s.sistaCrawl ? esc(datum(s.sistaCrawl)) : "aldrig"}</td>
        </tr>`;
      };
      const tabell = (rader) => `<div class="rullbar"><table class="tabell">
        <thead><tr><th>Adress</th><th>Status</th><th>Senast hämtad</th></tr></thead>
        <tbody>${rader.map(rad).join("")}</tbody></table></div>`;

      return `<div class="matare">
        <div class="matare__spar"><span class="matare__fyll" style="width:${andel.toFixed(1)}%"></span></div>
        <p class="matare__text">${tal(idx.indexerade)} av ${tal(idx.kontrollerade)} adresser ligger i Googles index.</p>
      </div>
      ${genomsokta
        ? `<p class="${EFTER_KOTID ? "varningsrad" : "notis"}">${tal(genomsokta)} adress${genomsokta === 1 ? " är" : "er är"} genomsökta men inte indexerade. ${EFTER_KOTID
            ? "<strong>Det är oktober eller senare — det är inte längre en kö utan en bedömning av sajtens tyngd. Externa länkar är svaret, inte fler artiklar.</strong>"
            : "Normalt för en ung domän. Ligger det kvar efter oktober är det en bedömning av sajtens tyngd, inte en kö."}</p>`
        : ""}
      ${atgard.length
        ? `<h3>Behöver åtgärd — ${tal(atgard.length)} adress${atgard.length === 1 ? "" : "er"}</h3>${tabell(atgard)}
           <p class="notis">HTTP-versionen av startsidan ska stå som omdirigering. Det är korrekt beteende — åtgärda den inte.</p>`
        : `<p class="tomt">Varje adress i sitemapen ligger i indexet.</p>`}
      ${klara.length
        ? `<details class="fallbar"><summary>Visa de ${tal(klara.length)} som är indexerade</summary>${tabell(klara)}</details>`
        : ""}`;
    })()
  : `<p class="tomt">Indexeringsstatus hämtas per adress från Search Console. Panelen fylls så fort tjänstekontot har läsrätt — behörigheten måste vara Fullständig, URL-granskning är avstängd för begränsade användare.</p>`;

/* Trafik — två mätningar av samma sajt, med olika täckning */
const samtyckesgrad = cf && ga && cf.besok28 ? ga.totalt.sessioner / cf.besok28 : null;

const trafikPanel = !cf && !ga
  ? `<p class="tomt">Varken Cloudflare eller GA4 svarar. Panelen fylls när jobbet har tokens.</p>`
  : `<div class="kpirad kpirad--fyra">
      ${nyckeltal({
        etikett: "Besök, 28 d",
        varde: cf ? tal(cf.besok28) : "–",
        under: cf ? (cf.botfiltrerat ? "Cloudflare, botar bortfiltrerade" : "Cloudflare, utan botfilter") : "väntar på Cloudflare",
      })}
      ${nyckeltal({
        etikett: "Sessioner, 28 d",
        varde: ga ? tal(ga.totalt.sessioner) : "–",
        under: ga ? "GA4, bara efter samtycke" : "väntar på GA4",
      })}
      ${nyckeltal({
        etikett: "Samtyckesgrad",
        varde: samtyckesgrad != null ? proc(samtyckesgrad) : "–",
        under: samtyckesgrad != null ? "GA4-sessioner delat med Cloudflares besök" : "kräver båda mätningarna",
      })}
      ${nyckeltal({
        etikett: "Botandel",
        varde: cf && cf.botandel != null ? proc(cf.botandel) : "–",
        under: cf && cf.botandel != null ? "bortsållat av Cloudflares botfilter" : "kräver botfiltrerad fråga",
      })}
    </div>
    <div class="kpirad kpirad--tre">
      ${nyckeltal({
        etikett: "Besök på guiderna, 28 d",
        varde: cf ? tal(cf.guideBesok28) : "–",
        under: cf ? `${tal(cf.guideSidvisningar28)} sidvisningar` : "väntar på Cloudflare",
        tillstand: cf && cf.guideBesok28 === 0 ? "kpi--varning" : "",
      })}
      ${nyckeltal({ etikett: "Användare i GA4", varde: ga ? tal(ga.totalt.anvandare) : "–", under: ga ? "unika, efter samtycke" : "väntar på GA4" })}
      ${nyckeltal({ etikett: "Sidvisningar i GA4", varde: ga ? tal(ga.totalt.sidvisningar) : "–", under: ga ? "totalt, efter samtycke" : "väntar på GA4" })}
    </div>
    ${ga && ga.perDag.length > 1
      ? ytdiagram(ga.perDag.map((r) => ({ d: `${r.datum.slice(0, 4)}-${r.datum.slice(4, 6)}-${r.datum.slice(6)}`, v: r.sessioner })), { farg: "var(--graf)", etikett: "Sessioner", enhet: "sessioner" })
      : ""}
    <div class="tvakol">
      <div><h3>Mest besökta sökvägar — Cloudflare</h3>${cf
        ? stapellista(cf.toppsidor, { varde: (r) => r.besok, etikett: (r) => esc(r.sokvag), bi: (r) => `${tal(r.sidvisningar)} sidvisningar`, farg: "var(--graf)" })
        : `<p class="tomt">Väntar på Cloudflare.</p>`}</div>
      <div><h3>Varifrån de kommer — GA4</h3>${ga
        ? stapellista(ga.kanaler, { varde: (r) => r.sessioner, etikett: (r) => esc(r.kanal), farg: "var(--bra)" })
        : `<p class="tomt">Väntar på GA4.</p>`}</div>
    </div>`;

/* Intäktsspåret */
const program = d.innehall?.affiliateprogram || {};
const programChips = Object.entries(program)
  .map(([namn, aktiv]) => `<span class="chip chip--${aktiv ? "bra" : "vilande"}">${esc(namn)}${aktiv ? "" : " · ej ifyllt"}</span>`)
  .join("");
const utgaende = ga?.utgaendeKlick?.filter((k) => !/barnprylsdoktorn\.se/.test(k.mal)) || [];
const omarkta = d.innehall?.omarkta || [];

const lankRad = (l) => {
  const klass = l.lage === "svarar" ? "bra" : l.lage === "svarar inte" ? "fel" : l.lage === "ingen länk" ? "vilande" : "varning";
  return `<tr>
    <td>${esc(l.namn)}<span class="tabell__bi">${esc(l.kalla)}</span></td>
    <td>${l.handlare ? `<span class="chip chip--${program[l.handlare] ? "bra" : "fel"}">${esc(l.handlare)}</span>` : `<span class="chip chip--vilande">ingen handlare</span>`}</td>
    <td><span class="chip chip--${klass}">${esc(l.lage)}</span>${l.status ? `<span class="tabell__bi">HTTP ${l.status}</span>` : ""}</td>
    <td class="tabell__sokvag">${l.url ? esc(vard(l.url)) : "–"}</td>
  </tr>`;
};

const intaktPanel = `<div class="kpirad kpirad--tre">
    ${nyckeltal({
      etikett: "Affiliatelänkar som svarar",
      varde: lh ? `${tal(lh.lankar.filter((l) => l.lage === "svarar").length)}<span class="kpi__av"> / ${tal(lh.lankar.filter((l) => l.url).length)}</span>` : "–",
      under: !lh ? "kontrollen kunde inte köras" : lh.doda ? `${tal(lh.doda)} svarar inte` : lh.blockerade ? `${tal(lh.blockerade)} blockerade kontrollen` : "alla svarar",
      tillstand: lh && lh.doda ? "kpi--fel" : "",
    })}
    ${nyckeltal({
      etikett: "Utgående klick, 28 d",
      varde: ga ? tal(utgaende.reduce((a, k) => a + k.antal, 0)) : "–",
      under: ga ? "klick vidare från sajten, efter samtycke" : "väntar på GA4",
    })}
    ${nyckeltal({
      etikett: "Guider utan annonsnotis",
      varde: tal(omarkta.length),
      under: omarkta.length ? `saknar <code>annonslankar</code>: ${omarkta.map((s) => esc(s)).join(", ")}` : "alla guider med affiliatelänkar är märkta",
      tillstand: omarkta.length ? "kpi--fel" : "",
    })}
  </div>
  <p class="programrad">${programChips}</p>
  ${lh
    ? `<h3>Länkarnas hälsa</h3><div class="rullbar"><table class="tabell">
        <thead><tr><th>Mål</th><th>Handlare</th><th>Status</th><th>Domän</th></tr></thead>
        <tbody>${lh.lankar.map(lankRad).join("")}</tbody></table></div>
       <p class="notis">Kontrollen ser om adressen svarar, inte om varan finns i lager. En handlare som svarar 403 blockerar automatiska anrop — det är inte ett fel på länken.</p>`
    : ""}
  ${utgaende.length ? `<h3>Vart klicken går</h3>${stapellista(utgaende.slice(0, 8), { varde: (r) => r.antal, etikett: (r) => esc(r.mal.replace(/^https?:\/\//, "").slice(0, 60)), farg: "var(--graf)" })}` : ""}`;

/* Sajten */
const sajt = d.sajt;
const sajtPanel = sajt
  ? `<div class="kpirad kpirad--tre">
      ${nyckeltal({ etikett: "Adresser i sitemap", varde: tal(sajt.sitemapUrler), under: "det Google får se" })}
      ${nyckeltal({
        etikett: "Svarar inte med 200",
        varde: tal(sajt.trasiga.length),
        under: sajt.trasiga.length ? sajt.trasiga.map((t) => `${esc(kortSlug(t.url))} (${t.status})`).join(", ") : "alla sidor svarar",
        tillstand: sajt.trasiga.length ? "kpi--fel" : "",
      })}
      ${nyckeltal({ etikett: "Snittsvarstid", varde: `${tal(sajt.snittsvar)}<span class="kpi__av"> ms</span>`, under: "mätt från GitHubs servrar" })}
    </div>`
  : `<p class="tomt">Sajtkontrollen gick inte att köra.</p>`;

/* Innehåll och korslänkning */
const guider = d.innehall?.guider || [];
const svagast = d.innehall?.svagastLankade || [];
const innehallPanel = `<div class="kpirad kpirad--fyra">
    ${nyckeltal({ etikett: "Publicerade guider", varde: tal(d.innehall?.antal ?? 0), under: "i src/artiklar" })}
    ${nyckeltal({ etikett: "Ord totalt", varde: tal(d.innehall?.totaltOrd ?? 0), under: `snitt ${tal((d.innehall?.totaltOrd ?? 0) / (d.innehall?.antal || 1))} per guide` })}
    ${nyckeltal({ etikett: "Källor totalt", varde: tal(guider.reduce((a, g) => a + g.kallor, 0)), under: "länkar under Källor" })}
    ${nyckeltal({
      etikett: "Föräldralösa guider",
      varde: tal((d.innehall?.foraldralosa || []).length),
      under: (d.innehall?.foraldralosa || []).length ? esc((d.innehall.foraldralosa).join(", ")) : "varje guide länkas in någonstans",
      tillstand: (d.innehall?.foraldralosa || []).length ? "kpi--fel" : "",
    })}
  </div>
  ${svagast.length ? `<h3>Svagast internt länkade</h3>${stapellista(svagast, {
    varde: (r) => r.inlankar,
    etikett: (r) => esc(r.slug),
    bi: (r) => `${tal(r.inlankar)} sid${r.inlankar === 1 ? "a" : "or"} länkar dit i löptexten`,
    farg: "var(--graf)",
  })}` : ""}
  <details class="fallbar"><summary>Visa alla ${tal(d.innehall?.antal ?? 0)} guider</summary>
  <div class="rullbar"><table class="tabell">
    <thead><tr><th>Guide</th><th>Senast rörd</th><th class="tabell__tal">Ord</th><th class="tabell__tal">Källor</th><th class="tabell__tal">Inlänkar</th><th>Annonsläge</th></tr></thead>
    <tbody>${guider
      .map(
        (g) => `<tr>
        <td>${esc(g.titel)}<span class="tabell__bi">${esc(g.slug)}</span></td>
        <td class="tabell__tal">${esc(g.uppdaterad || g.publicerad || "–")}</td>
        <td class="tabell__tal">${tal(g.ord)}</td>
        <td class="tabell__tal">${tal(g.kallor)}</td>
        <td class="tabell__tal">${tal(g.inlankar)}</td>
        <td>${g.annonslankar ? `<span class="chip chip--bra">${Array.isArray(g.annonslankar) ? esc(g.annonslankar.join(", ")) : "på"}</span>` : g.harAffiliate ? `<span class="chip chip--fel">omärkt</span>` : `<span class="chip chip--vilande">av</span>`}</td>
      </tr>`
      )
      .join("")}</tbody>
  </table></div></details>`;

/* Nästa åtgärd — härledd ur data, inte tyckande. Ordningen speglar var sajten
   faktiskt står: externa länkar först, indexeringen längre ner. */
const atgarder = [];

if (cf && cf.hanvisandeDomaner === 0)
  atgarder.push(`<strong>Ingen extern domän länkar hit.</strong> Det är takten allt annat hänger på — sajten kan inte ranka sig ur det med fler artiklar. Nästa tio mejl ur <code>research/lankprospekt-2026-08-18.md</code>, med Plustest-listan som pitch.`);

if (lh && lh.doda)
  atgarder.push(`<strong>${tal(lh.doda)} affiliatelänk${lh.doda === 1 ? "" : "ar"} svarar inte.</strong> ${lh.lankar.filter((l) => l.lage === "svarar inte").map((l) => `<code>${esc(l.namn)}</code> (${esc(l.kalla)})`).join(", ")}. En död produktsida är en läsare som tappas i sista steget.`);

if (omarkta.length)
  atgarder.push(`<strong>${tal(omarkta.length)} guide${omarkta.length === 1 ? "" : "r"} har affiliatelänkar men saknar annonsnotis:</strong> ${omarkta.map((s) => `<code>${esc(s)}</code>`).join(", ")}. Sätt <code>annonslankar</code> i frontmatter — Adtractions villkor kräver märkningen högst upp.`);

if (sajt && sajt.trasiga && sajt.trasiga.length)
  atgarder.push(`<strong>${tal(sajt.trasiga.length)} adress${sajt.trasiga.length === 1 ? "" : "er"} svarar inte med 200.</strong> ${sajt.trasiga.map((t) => esc(kortSlug(t.url)) + " (" + t.status + ")").join(", ")}`);

if ((d.innehall?.foraldralosa || []).length)
  atgarder.push(`<strong>${tal(d.innehall.foraldralosa.length)} guide${d.innehall.foraldralosa.length === 1 ? "" : "r"} är föräldralös${d.innehall.foraldralosa.length === 1 ? "" : "a"}:</strong> ${d.innehall.foraldralosa.map((s) => `<code>${esc(s)}</code>`).join(", ")}. Ingen annan sida länkar dit i löptexten och ingen pekar dit med <code>lasharnast</code>.`);

if (idx && idx.indexerade < idx.kontrollerade && EFTER_KOTID)
  atgarder.push(`<strong>${tal(idx.kontrollerade - idx.indexerade)} av ${tal(idx.kontrollerade)} adresser står utanför indexet, och det är oktober eller senare.</strong> Kön är slut — det här är en bedömning av sajtens tyngd. Externa länkar, inte fler artiklar.`);

if (cf && cf.guideBesok28 === 0 && cf.besok28 > 0)
  atgarder.push(`Sajten har besök men <strong>noll av dem på guiderna</strong>. Trafiken mot <code>/</code> är i praktiken skannrar, inte läsare.`);

if (gsc && gsc.totalt.visningar > 0 && gsc.totalt.klick === 0)
  atgarder.push(`Sajten har <strong>visningar men inga klick</strong>. Positionerna är för låga för att ge trafik ännu.`);

const saknas = [];
if (!gsc) saknas.push("Search Console");
if (!ga) saknas.push("GA4");
if (!cf) saknas.push("Cloudflare");
if (saknas.length)
  atgarder.push(`<strong>${esc(saknas.join(", "))}</strong> är inte kopplat till hämtningen än.`);

const atgardPanel = atgarder.length
  ? `<section class="atgard">
      <h2>Det här står i vägen</h2>
      <ol>${atgarder.map((a) => `<li>${a}</li>`).join("")}</ol>
    </section>`
  : `<section class="atgard atgard--tom"><h2>Inget står i vägen</h2><p>Länkarna svarar, guiderna är märkta och korslänkade, adresserna är indexerade och sajten svarar.</p></section>`;

const banner = saknas.length
  ? `<div class="banner">
      <p><strong>${esc(saknas.join(" och "))} är inte kopplat än.</strong> Panelerna nedan visar det som går att läsa utan de källorna — innehåll, korslänkning, sitemap och affiliatelänkarnas hälsa. Så fort behörigheterna finns fylls resten i av sig själv, utan att sidan behöver byggas om.</p>
    </div>`
  : "";

const felrad = (d.fel || []).length
  ? `<details class="fel"><summary>${d.fel.length} sak${d.fel.length === 1 ? "" : "er"} gick inte att hämta</summary><ul>${d.fel.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></details>`
  : "";

/* ---------- sidan ---------- */

const html = `<title>Barnprylsdoktorn dagsrapport</title>
<style>
/* Sajtens palett. Inga webbtypsnitt: sajten anropar aldrig Google Fonts, och
   samma regel gäller verktyget — systemstacken får duga.
   Kontraster uträknade, inte uppskattade. Lägst i ljust läge är --ink-dov mot
   --yta-2: 4,92:1. I mörkt läge är lägsta 6,43:1. */
:root{
  --bg:#F7F5F2; --yta:#FFFFFF; --yta-2:#EFEBE5; --linje:#E4DFD8; --linje-stark:#CFC7BC;
  --ink:#181614; --ink-dov:#6b6459; --ink-invert:#FFFFFF;
  --accent:#8a4317; --graf:#B5581F; --bra:#2C6B3F; --varning:#8a4317; --fel:#9B2226;
  --serif:Georgia,"Iowan Old Style","Times New Roman",serif;
  --sans:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --matt:72rem; --radie:2px; --radie-liten:2px;
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --bg:#16140F; --yta:#1E1B16; --yta-2:#262119; --linje:#332E27; --linje-stark:#46403A;
    --ink:#F4F0E9; --ink-dov:#ADA396; --ink-invert:#16140F;
    --accent:#E39068; --graf:#E39068; --bra:#86C08F; --varning:#E39068; --fel:#F09A96;
  }
}
:root[data-theme="dark"]{
  --bg:#16140F; --yta:#1E1B16; --yta-2:#262119; --linje:#332E27; --linje-stark:#46403A;
  --ink:#F4F0E9; --ink-dov:#ADA396; --ink-invert:#16140F;
  --accent:#E39068; --graf:#E39068; --bra:#86C08F; --varning:#E39068; --fel:#F09A96;
}

*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);
  font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
.ram{max-width:var(--matt);margin:0 auto;padding:1.5rem 1rem 5rem}
@media(min-width:768px){.ram{padding:3rem 2rem 6rem}}

.huvud{border-bottom:1px solid var(--linje-stark);padding-bottom:1.5rem;margin-bottom:2rem}
.kicker{font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);
  font-weight:600;margin:0 0 .5rem}
.huvud h1{font-family:var(--serif);font-weight:600;letter-spacing:-.015em;
  font-size:clamp(2rem, 1.4rem + 2.6vw, 3rem);line-height:1.1;margin:0;text-wrap:balance}
.huvud__meta{color:var(--ink-dov);font-size:.875rem;margin:.75rem 0 0}
.huvud__meta strong{color:var(--ink);font-weight:600}

.banner{background:var(--yta);border:1px solid var(--linje-stark);border-left:3px solid var(--varning);
  border-radius:var(--radie);padding:1rem 1.125rem;margin:0 0 2rem}
.banner p{margin:0;font-size:.9375rem}

.kpirad{display:grid;gap:.75rem;grid-template-columns:repeat(2,minmax(0,1fr));margin:0 0 2.5rem}
@media(min-width:768px){.kpirad{grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem}}
.kpirad--tre{margin-bottom:1.5rem}
.kpirad--fyra{margin-bottom:1.5rem}
@media(min-width:768px){.kpirad--tre{grid-template-columns:repeat(3,minmax(0,1fr))}}
.kpi{background:var(--yta);border:1px solid var(--linje);border-radius:var(--radie);
  padding:1rem;display:flex;flex-direction:column;gap:.25rem}
.kpi--varning{border-left:3px solid var(--varning)}
.kpi--fel{border-left:3px solid var(--fel)}
.kpi__etikett{margin:0;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;
  color:var(--ink-dov);font-weight:600}
.kpi__varde{margin:0;font-family:var(--serif);font-size:clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem);
  font-weight:600;line-height:1.05;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.kpi__av{font-size:.5em;color:var(--ink-dov);font-weight:400;letter-spacing:0}
.kpi__under{margin:0;font-size:.8125rem;color:var(--ink-dov);line-height:1.4}
.kpi__under code{font-size:.9em}
.delta__mot{color:var(--ink-dov);font-weight:400}

.delta{font-weight:600}
.delta--upp{color:var(--bra)}
.delta--ner{color:var(--fel)}
.delta--lika{color:var(--ink-dov);font-weight:400}

.panel{margin:0 0 3rem}
.panel h2{font-family:var(--serif);font-weight:600;font-size:1.5rem;letter-spacing:-.01em;
  margin:0 0 .25rem;padding-bottom:.5rem;border-bottom:1px solid var(--linje)}
.panel h3{font-family:var(--sans);font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;
  color:var(--ink-dov);font-weight:600;margin:1.5rem 0 .625rem}
.panel__intro{color:var(--ink-dov);font-size:.9375rem;margin:.625rem 0 1.25rem;max-width:52ch}
.tomt{color:var(--ink-dov);font-size:.9375rem;background:var(--yta);border:1px dashed var(--linje-stark);
  border-radius:var(--radie);padding:1rem 1.125rem;margin:1rem 0 0}
.notis{color:var(--ink-dov);font-size:.8125rem;margin:.75rem 0 0}
.varningsrad{font-size:.875rem;margin:1rem 0 0;padding:.75rem .875rem;background:var(--yta);
  border-left:3px solid var(--varning);border-radius:var(--radie)}

.tvakol{display:grid;gap:1.5rem}
@media(min-width:768px){.tvakol{grid-template-columns:repeat(2,minmax(0,1fr));gap:2rem}}

.matare{margin:1.25rem 0 1.5rem}
.matare__spar{height:10px;background:var(--yta-2);border-radius:999px;overflow:hidden}
.matare__fyll{display:block;height:100%;background:var(--bra);border-radius:999px}
.matare__text{margin:.5rem 0 0;font-size:.875rem;color:var(--ink-dov)}

.chip{display:inline-block;font-size:.75rem;font-weight:600;padding:.1875rem .5rem;
  border-radius:var(--radie-liten);border:1px solid currentColor;white-space:nowrap}
.chip--bra{color:var(--bra)}
.chip--varning{color:var(--varning)}
.chip--fel{color:var(--fel)}
.chip--vilande{color:var(--ink-dov)}
.programrad{display:flex;flex-wrap:wrap;gap:.5rem;margin:0}

.staplar{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.875rem}
.staplar__topp{display:flex;justify-content:space-between;align-items:baseline;gap:1rem}
.staplar__namn{font-size:.9375rem;min-width:0;overflow-wrap:anywhere}
.staplar__tal{font-variant-numeric:tabular-nums;font-weight:600;font-size:.9375rem;flex:none}
.staplar__spar{height:6px;background:var(--yta-2);border-radius:999px;margin-top:.375rem;overflow:hidden}
.staplar__fyll{display:block;height:100%;border-radius:999px}
.staplar__bi{font-size:.75rem;color:var(--ink-dov);margin-top:.3125rem;font-variant-numeric:tabular-nums}

.minidiagram{display:grid;gap:1.75rem;margin-top:1.25rem}
@media(min-width:900px){.minidiagram{grid-template-columns:repeat(3,minmax(0,1fr))}}
.minidiagram figure{margin:0}
.minidiagram figcaption{font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;
  color:var(--ink-dov);font-weight:600;margin-bottom:.5rem}
.figcaption__not{text-transform:none;letter-spacing:0;font-weight:400}
.diagram{position:relative;background:var(--yta);border:1px solid var(--linje);
  border-radius:var(--radie);padding:.75rem .75rem .5rem}
.diagram svg{display:block;width:100%;height:auto}
.rutnat{stroke:var(--linje);stroke-width:1;vector-effect:non-scaling-stroke}
.diagram__axel{display:flex;justify-content:space-between;font-size:.6875rem;
  color:var(--ink-dov);margin-top:.25rem}
.tooltip{position:absolute;pointer-events:none;background:var(--ink);color:var(--ink-invert);
  font-size:.75rem;line-height:1.35;padding:.375rem .5rem;border-radius:var(--radie-liten);
  white-space:nowrap;transform:translate(-50%,-115%);z-index:2;font-variant-numeric:tabular-nums}

.rullbar{overflow-x:auto;margin-top:1.25rem;border:1px solid var(--linje);border-radius:var(--radie)}
.tabell{width:100%;border-collapse:collapse;font-size:.875rem;min-width:34rem}
.tabell th{text-align:left;font-size:.6875rem;letter-spacing:.08em;text-transform:uppercase;
  color:var(--ink-dov);font-weight:600;padding:.75rem .875rem;background:var(--yta);
  border-bottom:1px solid var(--linje-stark);white-space:nowrap}
.tabell td{padding:.75rem .875rem;border-bottom:1px solid var(--linje);vertical-align:top}
.tabell tr:last-child td{border-bottom:0}
.tabell tbody tr:nth-child(even){background:var(--yta)}
.tabell__tal{font-variant-numeric:tabular-nums;white-space:nowrap}
.tabell__sokvag{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.8125rem;overflow-wrap:anywhere}
.tabell__bi{display:block;font-size:.6875rem;color:var(--ink-dov);margin-top:.25rem}

.atgard{background:var(--yta);border:1px solid var(--linje-stark);border-radius:var(--radie);
  padding:1.25rem 1.25rem 1.375rem;margin:0 0 3rem}
.atgard h2{font-family:var(--serif);font-weight:600;font-size:1.25rem;margin:0 0 .75rem;
  padding:0;border:0;letter-spacing:-.01em}
.atgard ol{margin:0;padding-left:1.25rem;display:flex;flex-direction:column;gap:.625rem}
.atgard li{font-size:.9375rem;line-height:1.55}
.atgard li::marker{color:var(--accent);font-weight:600}
.atgard--tom{border-left:3px solid var(--bra)}
.atgard--tom p{margin:0;font-size:.9375rem;color:var(--ink-dov)}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.875em;
  background:var(--yta-2);padding:.0625rem .25rem;border-radius:var(--radie-liten)}

.fallbar{margin-top:1rem}
.fallbar>summary{cursor:pointer;font-size:.8125rem;font-weight:600;letter-spacing:.04em;
  color:var(--ink-dov);padding:.5rem 0;min-height:44px;display:flex;align-items:center}
.fallbar>summary:hover{color:var(--accent)}

.fot{border-top:1px solid var(--linje-stark);padding-top:1.5rem;margin-top:3rem;
  color:var(--ink-dov);font-size:.8125rem}
.fot p{margin:0 0 .5rem}
.fel{margin-top:1rem}
.fel summary{cursor:pointer;color:var(--fel);font-weight:600;min-height:44px;display:flex;align-items:center}
.fel ul{margin:.5rem 0 0;padding-left:1.25rem}
.fel li{overflow-wrap:anywhere}

a{color:var(--accent)}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:var(--radie-liten)}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>

<div class="ram">
  <header class="huvud">
    <p class="kicker">Barnprylsdoktorn</p>
    <h1>Dagsrapport</h1>
    <p class="huvud__meta">Hämtad <strong>${esc(datumtid(d.hamtad))}</strong>${gsc ? ` · Search Console-fönster ${esc(datum(gsc.period.start))}–${esc(datum(gsc.period.slut))}` : ""}</p>
  </header>

  ${banner}

  <div class="kpirad">${kpier}</div>

  ${atgardPanel}

  ${panel("Externa länkar", hanvisarPanel, {
    intro: "Sajten har sjutton guider och tekniken är ren. Det som avgör takten härifrån är att någon annan länkar hit — därför står den här siffran överst.",
  })}

  ${panel("Synlighet över tid", synlighetPanel, {
    intro: "Visningar rör sig först, klicken följer efter. Positionen är ett viktat snitt över alla sökningar.",
  })}

  ${panel("Sökningar sajten syns på", fragorPanel, {
    intro: "Frågor med många visningar men dålig position är kandidater för nästa guide — och för att skärpa en befintlig.",
  })}

  ${panel("Sidor som syns", sidorPanel)}

  ${panel("Trafik — alla mot dem som sagt ja", trafikPanel, {
    intro: "Cloudflare räknar varje besök, GA4 bara den som tryckt Godkänn. Skillnaden mellan talen är samtyckesgraden, och botandelen säger hur mycket av besöken som aldrig var människor.",
  })}

  ${panel("Intäktsspåret", intaktPanel, {
    intro: "Fyra program är godkända och spårlänkarna ligger inne. Det som går sönder härifrån är enskilda produktsidor och märkningen.",
  })}

  ${panel("Indexering", indexPanel, {
    intro: "Rampar upp normalt och är inte flaskhalsen — men den ska följas, och efter oktober betyder ett dröjande läge något annat än nu.",
  })}

  ${panel("Sajtens hälsa", sajtPanel)}

  ${panel("Innehåll och korslänkning", innehallPanel, {
    intro: "Löptextlänken är den viktiga. En guide som ingen länkar till i löptexten är svår att hitta både för läsare och för Google.",
  })}

  <footer class="fot">
    <p>Data hämtas varje natt av ett GitHub Actions-jobb i <code>erikjnordberg/barnprylsdoktorn</code> och sidan publiceras om varje morgon. Siffrorna kommer från Search Console, GA4, Cloudflare Web Analytics och sajten själv — inget är uppskattat.</p>
    <p>Search Console släpper data med två till tre dygns fördröjning, så de sista dagarna i kurvorna fylls på i efterhand.</p>
    ${felrad}
  </footer>
</div>

<script>
document.querySelectorAll(".diagram").forEach(function(ruta){
  var serie, svg = ruta.querySelector("svg");
  try { serie = JSON.parse(ruta.dataset.serie); } catch (e) { return; }
  if (!svg || !serie || serie.length < 2) return;
  var tip = ruta.querySelector(".tooltip"),
      har = svg.querySelector(".krysshar"),
      prick = svg.querySelector(".kryssprick"),
      enhet = ruta.dataset.enhet;

  var linje = svg.querySelectorAll("path")[1];
  function langd(){ return linje.getTotalLength(); }

  function visa(e){
    var r = svg.getBoundingClientRect();
    var andel = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    var i = Math.round(andel * (serie.length - 1));
    var p = serie[i];
    var box = ruta.getBoundingClientRect();
    var vb = svg.viewBox.baseVal;
    var punkt = linje.getPointAtLength(langd() * (i / (serie.length - 1)));
    har.setAttribute("x1", punkt.x); har.setAttribute("x2", punkt.x);
    har.setAttribute("opacity", "0.45");
    prick.setAttribute("cx", punkt.x); prick.setAttribute("cy", punkt.y);
    prick.setAttribute("opacity", "1");
    var dat = new Date(p.d);
    tip.hidden = false;
    tip.textContent = dat.toLocaleDateString("sv-SE",{day:"numeric",month:"short"}) + ": " +
      p.v.toLocaleString("sv-SE") + (enhet ? " " + enhet : "");
    tip.style.left = (punkt.x / vb.width * 100) + "%";
    var svgRuta = svg.getBoundingClientRect();
    tip.style.top = (svgRuta.top - box.top + punkt.y / vb.height * svgRuta.height) + "px";
  }
  function dolj(){ har.setAttribute("opacity","0"); prick.setAttribute("opacity","0"); tip.hidden = true; }

  svg.addEventListener("pointermove", visa);
  svg.addEventListener("pointerleave", dolj);
  svg.addEventListener("pointerdown", visa);
});
</script>
`;

writeFileSync("data/dashboard.html", html);
console.log("Skrev data/dashboard.html (" + Math.round(html.length / 1024) + " kB)");
