# Barnprylsdoktorn

Svensk innehållssajt om bilbarnstolar. Målet är passiv inkomst via affiliate-innehåll.
Nischen kan breddas till barnprylar generellt längre fram — utgå från bilbarnstolar tills annat sägs.

Sajten är live på https://barnprylsdoktorn.se och fungerar. Utgå från att allt nedan redan är byggt.

## Svara alltid på svenska.

## Den här filen är sanningen om sajten

Projektet har två uppsättningar instruktioner. Den här filen läses av Claude Code i
terminalen. Erik har dessutom projektinstruktioner i Cowork.

Uppdelningen:

- **`CLAUDE.md` (den här filen) äger allt som förändras** — teknik, filstruktur, kommandon,
  designtokens, komponenter, innehållslistan, deploy-uppgifter och nästa steg. Ändras något
  av det ska den här filen uppdateras **i samma commit**.
- **Cowork-instruktionerna äger arbetssättet** — roll, beslutsordning, röst, principer,
  git-flöde. De ska inte innehålla filträd, färgkoder, artikellistor eller statusrapporter.
  Hamnar sådant där ska det flyttas hit.
- Behöver du veta något konkret: läs den här filen och repot. Gissa aldrig.
- Säger filerna emot varandra gäller den här för teknik och innehåll. Är motsägelsen
  principiell — säg till Erik i stället för att välja åt honom.

Rollen, rösten och faktakollen står i båda filerna med flit, eftersom Claude Code bara ser
den här. Den dubbleringen är avsiktlig — håll den synkad.

## Om Erik och din roll

Erik är PM på BookBeat och har jobbat nära utvecklare i fyra år — bekväm med terminologi,
verktyg och hur mjukvara byggs, men har inte tid att lära sig varje steg från grunden.
Prioriteringen är att få innehåll ut, inte att förstå koden.

Du bygger, Erik granskar och beslutar. Skriv koden — han ska inte behöva skriva den själv.
Fråga om designval, innehåll och prioriteringar, inte om syntax.
När det finns flera vägar: rekommendera en och motivera kort, i stället för att lista
alternativ och låta honom välja.

**Förklaringar:** koncept, inte kodrader. Några meningar om vad något är och varför vi
använder det — inte en genomgång rad för rad. Frågar han djupare, gå djupare.

**Felsökning:** fixa felet och säg i en mening vad som var fel. Ingen pedagogisk genomgång
om han inte ber om det.

## Teknik

- Eleventy (11ty) v3, artiklar i Markdown
- Repo: `erikjnordberg/barnprylsdoktorn`, branch `main`, lokalt i `~/Desktop/bilbarnstolar`
- Cloudflare Pages deployar automatiskt vid push till `main`
- Projektnamn i Cloudflare: `barnprylsdoktorn`, konto-ID `ef8466a755154bee4f5f7028ac3a96ff`
- Domänen köpt hos Loopia, DNS och DNSSEC hos Cloudflare
- Google Search Console verifierad via TXT-post i DNS, sitemap inskickad.
  Nya artiklar indexeringsbegärs manuellt i GSC.
- Cloudflare Web Analytics påslagen med automatisk injicering — inga cookies, ingen samtyckesbanner
- JSON-LD för sajt och artiklar ligger i `base.njk`

## Kommandon

```bash
npx @11ty/eleventy --serve     # lokal dev-server, http://localhost:8080
npx @11ty/eleventy             # bygg till _site/
npm run statistik              # hämta besöksstatistik manuellt, kräver CF_API_TOKEN
```

Kör alltid ett bygge innan du säger att något är klart. Ett bygge som går igenom är
minimikravet, inte beviset — kontrollera i dev-servern att sidan ser rätt ut.

## Filstruktur

```
src/
  _includes/base.njk       layout för samtliga sidor, inkl. JSON-LD
  _data/site.js            namn, url, beskrivning
  _data/produkter.js       produktdata till köpblocken
  _data/popularitet.json   besöksstatistik per guide-slug, se nedan — kan saknas
  css/style.css            hela sajtens styling
  fonter/                  self-hostade woff2-filer
  bilder/                  tre SVG-illustrationer + delningsbild
  artiklar/                guiderna i Markdown
  artiklar/artiklar.json   permalink /guider/<slug>/
  index.md, om.md, guider.njk, sa-tjanar-sajten-pengar.md, 404.md
  feed.njk, sitemap.njk, robots.njk
scripts/hamta-statistik.js hämtar besöksstatistik från Cloudflare, se nedan
.github/workflows/statistik.yml   schemalägger scriptet varje måndag
research/                  underlag och granskningar — ingår inte i bygget
copy-granskning.md         senaste copygranskningen, i roten
eleventy.config.js         filter: version, datum, typo, htmlDateString, isoDate, rssDate,
                           sorteraEfterBesok
                           shortcode: kopblock
                           markdown-it-anchor ger h2 och h3 id via rubrikTillId,
                           som translittererar å/ä/ö. Bara id, ingen länkikon.
```

`arkiv/` och `kodhandledare-bilbarnstolar.md` är gammalt kursmaterial. De är gitignorerade
och ligger utanför projektet — rör dem inte.

## Design

Redaktionell stil. Playfair Display i rubriker, Source Sans 3 i brödtext, båda self-hostade
i `src/fonter/`.

**Anropa aldrig Google Fonts** — det skickar besökarnas IP till Google.

```
--accent: #B5581F        terrakotta
--accent-mork: #8a4317   hover, fokusring, knappar
--varm-ljus: #F7F0E6     länkar i mörka block
--text: #181614
--text-dampad: #6b6459   satt för att klara 4.5:1 mot papper-tint
--papper: #FFFFFF
--papper-tint: #F7F5F2
--kant: rgba(24, 22, 20, 0.12)
--radie: 2px
--max-text: 42rem
--max-bred: 70rem
```

Brödtext 17 px med line-height 1.75 — rör den inte.

Den gamla sage-paletten (`#3E6B5F`, `#4A7C6F`) är borta — återinför den inte.
Illustrationerna är omfärgade till svart stol och terrakotta barn.

Sajten ska fungera bäst på mobil. Utgå från mobilvyn först.

### Komponenter

- **Köpblock.** `{% kopblock "nyckel" %}` hämtar produkten ur `src/_data/produkter.js`.
  Saknas `url` renderas blocket utan knapp och utan annonsmärkning — det är läget nu.
  Blocket ska ligga både vid beslutet (direkt efter punktlistan i Kort svar) och vid
  motiveringen i produktavsnittet.
- **`.las-harnast`** — mörkt block sist i guiderna med två relaterade artiklar.
- **`.produktkort`** — korten på startsidan, hela kortet klickbart.
- **Tabeller** scrollar horisontellt under 44 rem med en skuggkant som affordans.

### Tillgänglighet

Minst 4.5:1 i kontrast, uträknat och inte uppskattat. Dämpa aldrig text med `opacity` —
använd färgen, så går kontrasten att räkna på. Klickytor minst 44 px.

## Cachning — viktigt

Alla statiska filer versioneras med `version`-filtret i `eleventy.config.js`, som hänger en
innehållshash på adressen:

```njk
{{ '/bilder/x.svg' | version }}
```

Utan det serverar Cloudflare gamla filer i timmar efter en ändring. **Nya bilder och stilar
ska alltid gå genom filtret.**

## Innehåll

Tretton publicerade guider:

| Slug | Ämne |
|---|---|
| `babyskydd-for-nyfodda` | Första stolen, Plustestet, lutning |
| `bakatvand-bilbarnstol-vilken-ska-jag-kopa` | Folksams test 2025, tre stolar |
| `i-size-vs-vikt` | R129, R44, i-Size, vad lagen kräver |
| `isofix-eller-balte` | Monteringssätt, 33-kilosgränsen |
| `baltesstol-eller-balteskudde` | Steget efter bakåtvänt, 125 cm-regeln |
| `bilbarnstol-fram-och-airbag` | Framsätet, krockkudde, extra benutrymme |
| `begagnad-bilbarnstol` | Andrahandsköp, tioårsregeln, krockhistorik |
| `vanliga-monteringsfel` | Sex fel, minutkontrollen |
| `bilbarnstol-i-taxi` | Undantagen i lagen, aldrig framsätet |
| `bilbarnstol-flyg-och-hyrbil` | Egen stol ombord, CARES, hyrbilsstolens historia |
| `basta-bilbarnstolen` | Hela kedjan på en sida, babyskydd till bältesstol |
| `montera-bilbarnstol-steg-for-steg` | Monteringen i ordning, bälte och Isofix |
| `bilbarnstol-plats-i-bilen` | Fordonslista, mittplatsen, två eller tre stolar bak |

Utöver guiderna finns `/sa-tjanar-sajten-pengar/`, länkad i sidfoten tillsammans med en
kort affiliatemärkning.

Guiderna på `/guider/` och i "Mer att läsa" på startsidan sorteras fallande efter besök,
via filtret `sorteraEfterBesok`. Siffrorna kommer från `src/_data/popularitet.json`, som
uppdateras automatiskt varje måndag 05:00 UTC av `.github/workflows/statistik.yml` — jobbet
kör `scripts/hamta-statistik.js` mot Cloudflare Web Analytics och committar filen bara om
den ändrats. `CF_API_TOKEN` ligger som secret i GitHub-repot, inte lokalt — den behövs inte
för att bygga sajten, bara för att hämta statistik manuellt med `npm run statistik`.

Guiderna är korslänkade i löptexten **och** har ett `Läs härnäst`-block sist. Löptextlänken
är den viktiga — nya artiklar ska länkas in i de befintliga på de ställen där frågan
uppstår för läsaren. `Läs härnäst` är ett komplement, inte en ersättning.

**Varje guide sätter sina två `Läs härnäst`-länkar själv**, via `lasharnast` i frontmatter:

```yaml
lasharnast: ["slug-ett", "slug-tva"]
```

Fallbacken i `base.njk` plockar köpguiden plus den nyaste artikeln. Den räckte med tio
guider men gör att alla guider utan `lasharnast` pekar på samma två artiklar så fort en ny
publiceras. **Ny guide ska alltid ha `lasharnast` satt**, och ska dessutom läggas in i
`lasharnast` på minst en befintlig guide — annars blir den föräldralös i navigeringen.

Ändras sakinnehållet i en publicerad guide sätts `uppdaterad: ÅÅÅÅ-MM-DD` i frontmatter.
`base.njk` visar det bara när det skiljer sig från `date`.

En avgränsning som är lätt att bryta mot: **`bilbarnstol-plats-i-bilen` äger platsfrågan.**
`montera-bilbarnstol-steg-for-steg` handlar om handgreppen och sammanfattar bara platsvalet
i tre punkter innan den länkar vidare. Låt inte montera-guiden växa tillbaka in i
mittplatsen, fordonslistor eller flera stolar bak.

### Röst

"Det här önskar jag att någon hade förklarat för mig när jag skulle köpa" — personlig och
konkret, inte generisk produktdatabas.

Artiklarna börjar oftast med ett **Kort svar** i punktform, följt av
`Vill du veta varför, fortsätt läsa`. Källförteckning sist. Varje guide har byline och
`Senast uppdaterad`-datum.

**Kort text vinner.** Sajten ska gå att ta sig an snabbt. Skriv hellre kortare än längre,
och stryk hellre än förklara mer.

Erik godkänner text och tonläge innan publicering.

### Faktakoll är obligatorisk

Säkerhetspåståenden om i-Size, R129, åldersgränser och längdgränser måste stämma och
beläggas mot NTF, Folksam, Trafikverket eller Transportstyrelsen.

Håll isär vad **lagen** kräver (135 cm) och vad som **rekommenderas** (bakåtvänt till
4–5 år, bältesstol till 10–12 år). Gissa aldrig en siffra — slå upp den.

Vid granskningar av copy eller UX: flagga säkerhetssiffror, ändra dem aldrig utan att Erik
godkänt. Större genomgångar läggs som markdownfil i `research/` med ordagranna FÖRE-citat
och färdig CSS, så att ändringarna blir exakt sök-och-ersätt i stället för fri omskrivning.

**Produktnamn och priser** ska stämma överens mellan `produkter.js`, tabellen och löptexten.
Ändras ett namn på ett ställe ska alla tre uppdateras.

## Git och deploy

Push till `main` deployar direkt till live. Därför:

- Committa gärna själv när en ändring är klar och bygget går igenom
- **Fråga alltid innan `git push origin main`**
- Skriv commit-meddelanden på svenska, kort och beskrivande

Körs du i en sandlåda utan GitHub-inloggning fastnar `git` på låsfiler och pushen går inte
igenom. Förbered ändringen och låt Erik köra:

```bash
cd ~/Desktop/bilbarnstolar
rm -f .git/HEAD.lock .git/index.lock
git add -A && git commit -m "..." && git push origin main
```

Efter deploy: kontrollera i webbläsaren att det faktiskt ser rätt ut, inte bara att bygget
gick igenom. Lägg på en query-parameter (`?v=2`) för att gå runt cachen vid kontroll —
både din egen och Cloudflares.

## Nästa steg i projektet

1. **Affiliate** via Adtraction eller Awin. Köpblock, transparenssida och märkning finns
   redan — det som saknas är `url` och `handlare` i `produkter.js`. Tretton guider live är
   ett rimligt underlag att ansöka med.
2. **Fler artiklar.** De uppenbara luckorna från starten är skrivna, inklusive montering
   steg för steg och plats i bilen. Fråga Erik innan du börjar på nästa — urvalet är inte
   självklart längre.
3. **Löpande UX- och mobilgenomgång** med `ux-granskning`-skillen.

Den här listan är färskvara. Blir ett steg klart, stryk det i samma commit — och lägg till
guiden i innehållstabellen ovan när en ny publiceras.
