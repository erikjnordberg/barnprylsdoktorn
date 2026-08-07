# Specifikation: köpblock, annonsmärkning och policysida

Mål: göra sajten redo att ta emot affiliateintäkter innan programmen är godkända.
Inga riktiga affiliatelänkar finns ännu — bygg så att de kan läggas till på **ett** ställe
per produkt när de kommer.

Beslut är redan fattade nedan. Fråga inte om alternativ, bygg enligt spec.

---

## 1. Produktdata i `src/_data/produkter.js`

All produktinformation samlas här. Artiklarna refererar bara till en nyckel.

Struktur per produkt:

- `namn` — fullständigt produktnamn
- `pris` — ungefärligt pris i kronor, som sträng, t.ex. `"4 495 kr"`
- `specifikation` — kort rad, t.ex. `"61–125 cm · max 36 kg · bältesmonterad · Plustestad"`
- `motivering` — en mening om vem stolen passar. Max ca 140 tecken.
- `url` — affiliatelänk. **Lämna tom sträng tills vidare.**
- `handlare` — återförsäljarens namn, t.ex. `"Jollyroom"`. Tom tills vidare.

Lägg in de tre stolarna som redan finns i
`bakatvand-bilbarnstol-vilken-ska-jag-kopa.md`, med nycklarna:

- `britax-max-safe-pro`
- `besafe-beyond`
- `tinyseats-2`

Hämta namn, pris och specifikation direkt ur artikeln så att inget avviker. Motiveringen
kan du komprimera från artikelns respektive avsnitt.

## 2. Shortcode `kopblock`

Registreras i `eleventy.config.js` med `addShortcode` eller `addPairedShortcode` — välj
det som fungerar med Nunjucks i Markdown.

Anrop i en artikel:

```njk
{% kopblock "britax-max-safe-pro" %}
```

Rendering:

- Produktnamn som rubrik
- Specifikationsraden, dämpad
- Motiveringen
- Priset
- **Om `url` är tom:** rendera blocket utan knapp, och utan annonsmärkning. Inget trasigt
  eller tomt får synas för besökaren.
- **Om `url` är satt:** rendera en knapp med texten `Se priset hos {{ handlare }}`, samt
  annonsmärkningen enligt punkt 3.

Knappens länk ska ha:

```html
rel="sponsored nofollow noopener" target="_blank"
```

`sponsored` är det Google vill se på betalda länkar. Utan den riskerar sajten att bedömas
som länksäljande.

Om nyckeln inte finns i `produkter.js`: låt bygget kasta ett tydligt fel med nyckelns namn.
Tyst tomt block är värre än ett brutet bygge.

## 3. Annonsmärkning

Marknadsföringslagen kräver att reklam går att känna igen som reklam. En affiliatelänk
utan märkning uppfyller inte det.

Varje köpblock med aktiv länk ska ha, direkt intill knappen:

> Annonslänk. Sajten får provision om du köper via den — priset för dig är detsamma.
> [Så tjänar sajten pengar](/sa-tjanar-sajten-pengar/)

Texten ska vara läsbar, inte gömd i finstilt grått. Använd `--text-dampad` men behåll
normal brödtextstorlek eller en snäpp mindre — inte mindre än 0.875rem.

Märkningen ska ligga **före** eller **intill** knappen, inte längst ned på sidan. Läsaren
ska se den innan hen klickar.

## 4. Policysida `src/sa-tjanar-sajten-pengar.md`

Permalink `/sa-tjanar-sajten-pengar/`. Länkas från sidfoten på samtliga sidor och från
varje köpblock.

Innehåll, i sajtens röst — personligt och rakt, inte juridisk boilerplate:

- Att sajten använder affiliatelänkar och vad det innebär
- Att priset är detsamma för läsaren
- Att rekommendationerna bygger på Folksams tester och myndighetskällor, inte på vilken
  provision som betalas
- Att ingen annonsör har betalat för att nämnas eller för placering
- Att stolar utan affiliateprogram rekommenderas på samma villkor som de med

Sista punkten är viktig och ska vara sann. Bryt aldrig mot den senare.

## 5. Styling i `src/css/style.css`

- Använd befintliga variabler. Inga nya färger.
- Blocket får `--papper-tint` som bakgrund och en tunn ram, för att skilja sig från
  brödtexten utan att skrika.
- Knappen: `--accent` som bakgrund, `--papper` som text. Tydligt klickbar yta, minst
  44 px hög för tumme på mobil.
- Mobilvyn först. Blocket ska vara fullbredd på mobil och hålla sig inom `--max-text` på
  desktop.
- Ingen produktbild. Tillverkarnas pressbilder är upphovsrättsskyddade och vi har inte
  rättigheterna.

## 6. Placering i befintlig artikel

I `bakatvand-bilbarnstol-vilken-ska-jag-kopa.md`, lägg ett köpblock i slutet av varje
produktavsnitt — efter texten om stolen, innan nästa rubrik. Alltså tre block totalt.

Lägg **inte** en samlad blocklista i botten. Läsaren ska kunna agera i det ögonblick hen
blir övertygad.

Rör inte de övriga guiderna än.

## 7. Innan du säger att det är klart

- Kör `npx @11ty/eleventy` och kontrollera att bygget går igenom
- Starta dev-servern och kontrollera i mobilvy att de tre blocken renderas utan knapp och
  utan annonsmärkning, eftersom `url` är tom
- Sätt tillfälligt en `url` på en produkt, ladda om, och kontrollera att knapp, `rel` och
  annonsmärkning dyker upp korrekt — nollställ den sedan
- Kontrollera att policysidan syns i sidfoten
- Committa, men pusha inte
