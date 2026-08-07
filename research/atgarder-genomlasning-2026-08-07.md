# Åtgärder efter genomläsning 2026-08-07

Tre ändringar. Gör dem i ordning, bygg och kontrollera i dev-servern efter varje. Pusha inte — jag kör push själv.

---

## 1. Ny H1 på startsidan

Fil: `src/index.md`

Byt rubriken. Endast H1 — `title`, `og:title` och meta-description ska vara oförändrade, de är inarbetade i Google Search Console.

FÖRE (leta efter denna sträng, den kan ligga i front matter som `rubrik:`/`h1:` eller som `# `-rubrik i brödtexten — ändra bara den som renderas som `<h1>` på `/`):

```
Rätt bilbarnstol, utan researchen
```

EFTER:

```
Köp inte fel bilbarnstol
```

Om samma sträng även används som `title` eller `og:title`: låt de instanserna vara. Renderas H1 från en variabel som delas med `title` — säg till i stället för att gissa, då behöver vi separera fälten först.

Kontrollera efteråt: `curl -s localhost:8080 | grep -i "<h1"` ger den nya rubriken, och `<title>` ger fortfarande "Rätt bilbarnstol, utan researchen | Barnprylsdoktorn".

---

## 2. Förenkla "bas i bilen" på startsidan

Fil: `src/index.md`, kortet **Babyskydd** under "Var ska du börja?"

FÖRE (ordagrant):

```
Från nyfödd till ungefär sex–nio månader. Bärbart, och fästs oftast i en bas i bilen.
```

EFTER:

```
Från nyfödd till ungefär sex–nio månader. Du bär den i handtaget och klickar fast den i bilen, oftast i en platta som får sitta kvar mellan gångerna.
```

Motivering: "bas" är fackspråk och startsidan är det sämsta stället att introducera det. Ordet förklaras redan i guiden `babyskydd-for-nyfodda` — där hör det hemma, inte i första kontakten. Ändra ingenting i guiden.

Kontrollera att kortet inte blir för högt i mobilvyn (375 px). Blir det tre rader mot de andra kortens två är det okej — kolla bara att korten fortfarande radar upp sig snyggt.

---

## 3. Sortera guiderna efter besök

Guiderna ska ligga i fallande ordning efter antal besök, både på startsidan och på `/guider/`. Datan hämtas från Cloudflare Web Analytics.

Hela kedjan ska gå av sig själv: ett schemalagt GitHub Actions-jobb hämtar statistiken varje måndag, committar den uppdaterade JSON-filen till `main` om siffrorna ändrats, och pushen triggar Cloudflare Pages precis som vanligt. Jag ska inte behöva köra något lokalt. Skriptet ska ändå gå att köra för hand vid behov.

### 3a. Skript som hämtar statistiken

Skapa `scripts/hamta-statistik.js` (Node, inga nya beroenden — använd inbyggda `fetch`).

Det ska:

1. Läsa `CF_API_TOKEN` från miljön. Saknas den: skriv ut ett tydligt fel och avsluta med kod 1.
2. POSTa till `https://api.cloudflare.com/client/v4/graphql` med header `Authorization: Bearer <token>`.
3. Fråga efter sidvisningar per sökväg de senaste 30 dagarna, ungefär så här — **verifiera fältnamnen mot faktiskt svar innan du bygger vidare, GraphQL-schemat är det jag är minst säker på i hela den här filen**:

```graphql
query Sidvisningar($since: Time!, $until: Time!, $siteTag: String!) {
  viewer {
    accounts(filter: { accountTag: "ef8466a755154bee4f5f7028ac3a96ff" }) {
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
```

4. Filtrera fram sökvägar som matchar `/guider/<slug>/`, plocka ut slug, summera `count` per slug.
5. Skriva `src/_data/popularitet.json` — ett platt objekt `{ "<slug>": <antal>, ... }`, sorterat på nyckel så att diffar blir läsbara. Filen checkas in i git.
6. Skriva en kort sammanfattning till stdout: vilken period, hur många slugs, och de tre översta.

Får skriptet svar men noll rader: skriv ut det och skriv **inte** över den befintliga JSON-filen. Bättre gammal data än tom.

`siteTag` är Web Analytics-sajtens ID, inte konto-ID. Hämta det med `GET https://api.cloudflare.com/client/v4/accounts/ef8466a755154bee4f5f7028ac3a96ff/rum/site_info/list` med samma token och lägg in värdet som konstant i skriptet med en kommentar om var det kommer ifrån.

Lägg till i `package.json`:

```json
"scripts": { "statistik": "node scripts/hamta-statistik.js" }
```

Finns ingen `package.json` i repot — skapa en minimal med bara `name`, `private: true` och `scripts`.

### 3b. GitHub Actions-jobbet

Skapa `.github/workflows/statistik.yml`.

- Triggas på `schedule` med cron `0 5 * * 1` (måndagar, 05:00 UTC) och på `workflow_dispatch` så att jobbet går att köra manuellt från GitHub-gränssnittet.
- `permissions: contents: write`.
- Steg: `actions/checkout@v4` → `actions/setup-node@v4` med Node 20 → kör `node scripts/hamta-statistik.js` med `CF_API_TOKEN: ${{ secrets.CF_API_TOKEN }}` → committa `src/_data/popularitet.json` **bara om filen ändrats**, med `git diff --quiet || (git commit ... && git push)`.
- Commit-författare: `github-actions[bot] <github-actions[bot]@users.noreply.github.com>`.
- Commit-meddelande: `Uppdatera besöksstatistik`.

Misslyckas API-anropet ska jobbet faila synligt (röd bock i GitHub) i stället för att tyst committa oförändrad eller tom data. Ingen fallback som döljer felet.

Pushen till `main` triggar Cloudflare Pages automatiskt — inget extra deploy-steg behövs.

### 3c. Sorteringen i mallarna

Skapa ett filter i `eleventy.config.js`, `sorteraEfterBesok`, som tar en lista med guider och sorterar fallande efter `popularitet[slug]`.

Krav:

- Slug hämtas ur guidens permalink/filnamn, inte ur titeln.
- Saknad slug i JSON räknas som 0.
- Sorteringen ska vara **stabil** — guider med samma värde behåller sin nuvarande inbördes ordning. `Array.prototype.sort` i Node är stabil, så det räcker att jämföra på besökstalet och returnera 0 vid lika.
- Saknas `src/_data/popularitet.json` helt, eller är den tom, ska bygget gå igenom och ordningen bli exakt som idag. Bygget får aldrig krascha på att statistiken saknas.

Applicera filtret på:

- `src/guider.njk` — hela listan.
- `src/index.md` — **endast** listan under "Mer att läsa".

De tre korten under "Var ska du börja?" (Babyskydd → Bakåtvänd stol → Framåtvänt och bältesstol) ska ligga kvar i den ordningen. De är en pedagogisk trappa i barnets ålder, inte en topplista, och blir obegripliga om de kastas om.

### 3d. Att verifiera

- `npx @11ty/eleventy` går igenom med JSON-filen på plats.
- `npx @11ty/eleventy` går igenom även efter `mv src/_data/popularitet.json /tmp/` — och ger då dagens ordning.
- I dev-servern: ordningen på `/guider/` matchar innehållet i JSON-filen, fallande.
- Startsidans tre kort står orörda.
- Workflow-filen validerar: `npx --yes yaml-lint .github/workflows/statistik.yml` eller motsvarande. Jobbet självt kan bara testas i GitHub efter push — jag kör `workflow_dispatch` manuellt en gång och rapporterar tillbaka.

---

## 4. Uppdatera CLAUDE.md

Samma commit. Lägg in `scripts/hamta-statistik.js`, `src/_data/popularitet.json` och `.github/workflows/statistik.yml` i filstrukturen, `npm run statistik` under kommandon, `sorteraEfterBesok` i filterlistan, samt ett stycke om att besöksstatistiken uppdateras automatiskt varje måndag via GitHub Actions och att `CF_API_TOKEN` ligger som GitHub-secret (den behövs inte för att bygga).

---

## Commit

Förbered ändringarna, kör inte push. Föreslaget meddelande:

```
Ny H1 på startsidan, enklare babyskyddstext, sortera guider efter besök
```
