// Botloggen (spec 005). Körs efter bygget: npm test bygger först.
// Logiken i botlogg/agents.mjs testas i originalet, paket/botlogg/ i
// erikjnordberg/getseeneverywhere. Här prövas det som är sajtens eget:
// bygget, listan över sidor och att funktionen hålls borta från statiska filer.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { FASTA_SOKVAGAR, normalizePath, skapaMiddleware } from "../botlogg/agents.mjs";

const sidor = JSON.parse(readFileSync("functions/_sokvagar.json", "utf8"));
const kanda = new Set([...sidor, ...FASTA_SOKVAGAR]);

test("bygget skriver sidlistan ur sitemapen, med startsidan och guiderna", () => {
  const sitemap = readFileSync("_site/sitemap.xml", "utf8");
  const antal = [...sitemap.matchAll(/<loc>/g)].length;
  assert.equal(sidor.filter((s) => !s.startsWith("/nedladdningar/")).length, antal);
  assert.ok(sidor.includes("/"));
  assert.ok(sidor.some((s) => s.startsWith("/guider/") && s !== "/guider/"));
});

test("_routes.json kopieras ut och undantar CSS, JS, typsnitt och bilder", () => {
  const routes = JSON.parse(readFileSync("_site/_routes.json", "utf8"));
  assert.deepEqual(routes.include, ["/*"]);
  for (const s of ["/css/*", "/js/*", "/fonter/*", "/bilder/*", "/favicon.ico", "/site.webmanifest"]) {
    assert.ok(routes.exclude.includes(s), s);
  }
});

test("varken functions/, botlogg/ eller paket/ hamnar i _site", () => {
  for (const s of ["functions", "botlogg", "paket", "test"]) {
    assert.equal(existsSync(`_site/${s}`), false, s);
  }
});

test("en guide räknas med sin sökväg, en skanner som [annan]", () => {
  const guide = sidor.find((s) => s.startsWith("/guider/") && s !== "/guider/");
  assert.equal(normalizePath(guide, kanda), guide);
  assert.equal(normalizePath("/robots.txt", kanda), "/robots.txt");
  assert.equal(normalizePath("/wp-login.php", kanda), "[annan]");
});

test("funktionen svarar som vanligt även när D1 kastar", async () => {
  const svar = new Response("ok");
  const vantar = [];
  const ut = await skapaMiddleware(kanda)({
    request: new Request("https://barnprylsdoktorn.se/", { headers: { "user-agent": "GPTBot/1.3" } }),
    env: { SAJT: "barnprylsdoktorn.se", BOTLOGG: { prepare: () => { throw new Error("nere"); } } },
    next: async () => svar,
    waitUntil: (p) => vantar.push(p),
  });
  assert.equal(ut, svar);
  await Promise.all(vantar);
});

test("checklistan i /nedladdningar/ räknas med sin egen sökväg", () => {
  const pdf = "/nedladdningar/kolla-bilbarnstolen-pa-en-minut.pdf";
  assert.ok(sidor.includes(pdf));
  assert.equal(normalizePath(pdf, kanda), pdf);
});
