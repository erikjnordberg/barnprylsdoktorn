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
- Repo: `erikjnordberg/barnprylsdoktorn`, branch `main`, lokalt i `~/kod/bilbarnstolar`
  **Flyttat hit från `~/Desktop/bilbarnstolar` 2026-08-19 — flytta aldrig tillbaka.**
  Skrivbordet ligger i iCloud Drive, och med Optimera Mac-lagring påslaget evakuerade
  macOS repots filer till molnet. Kvar blev platshållare: `.git` "försvann", filer gav
  `Resource deadlock avoided` vid läsning, och verktyg utan Full Disk Access kom inte åt
  dem. Ett git-repo hör inte hemma i en iCloud-synkad mapp.
- Cloudflare Pages deployar automatiskt vid push till `main`
- Projektnamn i Cloudflare: `barnprylsdoktorn`, konto-ID `ef8466a755154bee4f5f7028ac3a96ff`
- Domänen köpt hos Loopia, DNS och DNSSEC hos Cloudflare
- Google Search Console verifierad via TXT-post i DNS, sitemap inskickad.
  Nya artiklar indexeringsbegärs manuellt i GSC.
- Cloudflare Web Analytics påslagen med automatisk injicering — inga cookies, kräver inget samtycke
- **Google Analytics 4**, egendom `Barnprylsdoktorn`, mät-ID `G-111TXDWKJ3`, dataflöde
  `Barnprylsdoktorn webb` (15470865251). Konto `a87758593`, tidszon Sverige, valuta SEK.
  Förbättrad mätning är på, alltså mäts utgående klick — det är så affiliateklicken följs.
  Taggen laddas **först efter samtycke**, se Samtyckesbanner under Komponenter.
- JSON-LD för sajt och artiklar ligger i `base.njk`

## Kommandon

```bash
npx @11ty/eleventy --serve     # lokal dev-server, http://localhost:8080
npx @11ty/eleventy             # bygg till _site/
npm run statistik              # hämta besöksstatistik manuellt, kräver CF_API_TOKEN
                               # skriver popularitet.json och trafikblocket i CLAUDE.md
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
  bilder/                  tre SVG-illustrationer (babyskydd, bakatvand, framatvand),
                           fyra informationsgrafiker (langdtrappan, lutning, selhojd,
                           bilbarnstol-placering) + delningsbild
                           OBS: en SVG som laddas via <img> kan inte hämta externa
                           resurser. Self-hostade typsnitt gäller alltså inte i dem —
                           använd font-family "Source Sans 3, system-ui, sans-serif"
                           och räkna med systemfallbacken. Internt aria-label ignoreras
                           också; alt-texten i <img> är den som läses upp.
  js/valjare.js            logiken bakom bilbarnstolsväljaren
  js/samtycke.js           samtyckesbannern och laddningen av Google Analytics
  nedladdningar/kolla-bilbarnstolen-pa-en-minut.pdf   tryckbar checklista, fem steg,
                           samma innehåll som Minutkontrollen i `vanliga-monteringsfel`.
                           Länkad därifrån och från "Sedan då?" i
                           `montera-bilbarnstol-steg-for-steg`.
  artiklar/                guiderna i Markdown
  artiklar/artiklar.json   permalink /guider/<slug>/
  vilken-bilbarnstol.njk   väljaren, permalink /vilken-bilbarnstol/
                           OBS: .njk-filer parsar inte Markdown — skriv HTML här,
                           annars renderas "## Rubrik" och länkar som råtext
  plustestade-bilbarnstolar.md   hela VTI-listan, permalink /plustestade-bilbarnstolar/
                           Referenssida, inte guide — ligger utanför /guider/ med flit.
                           Listan ägs av den här sidan; guiderna sammanfattar och länkar hit.
                           Stäm av mot VTI kvartalsvis, VTI:s sida är klientrenderad och
                           går bara att läsa i webbläsare.
  index.md, om.md, guider.njk, sa-tjanar-sajten-pengar.md, integritetspolicy.md, 404.md
  feed.njk, sitemap.njk, robots.njk
scripts/hamta-statistik.js hämtar besöksstatistik från Cloudflare, se nedan — skriver
                           både popularitet.json och trafikblocket i den här filen
.github/workflows/statistik.yml   schemalägger scriptet varje måndag
research/                  underlag och granskningar — ingår inte i bygget
copy-granskning.md         senaste copygranskningen, i roten
eleventy.config.js         filter: version, datum, typo, htmlDateString, isoDate, rssDate,
                           sorteraEfterBesok, listaSvenska, aktivaHandlare
                           shortcode: kopblock, annonslank
                           ADTRACTION_PROGRAM: program-ID per handlare, se Komponenter
                           passthrough: css, bilder, fonter, js, nedladdningar, _headers
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
  Saknas `url` — eller saknas handlarens Adtraction-program-ID — renderas blocket utan
  knapp och utan annonsmärkning. Blocket ska ligga både vid beslutet (direkt efter
  punktlistan i Kort svar) och vid motiveringen i produktavsnittet.
  **Köpblocket visar inget pris.** Handlarnas priser rör sig varje vecka och en siffra
  där skulle bli fel utan att någon märkte det; knappen säger "Se aktuellt pris hos X".
  Ungefärliga priser hör hemma i tabellerna i löptexten, med källa och förbehåll.
- **Adtraction-spårning.** `produkter.js` och `{% annonslank %}` innehåller **handlarens
  riktiga adress** — aldrig en färdig spårningslänk. Spårningen byggs i
  `eleventy.config.js` av `sparadUrl()`, som slår upp handlaren i `ADTRACTION_PROGRAM`
  och hänger på `&url=<måladress>`. Värdet i `ADTRACTION_PROGRAM` är **hela spårlänken
  Adtraction ger, utan `url`-parameter** — varje program kan ha egen spårdomän (Babysam
  går via `to.babyworld.se`, inte `track.adtraction.com`), så den går inte att bygga av
  ett ID. Nytt program godkänt: lägg till en rad, inget annat. Handlarnamnet skrivs ut i
  HTML och escapas av `htmlText()` — namn med `&` i, som Stor&Liten, hade annars gett
  ogiltig markup. Saknas handlaren renderas
  länkarna som vanlig text, knappen uteblir och annonsnotisen döljs — hellre osynlig länk
  än trafik vi inte får betalt för. Bygget varnar i konsollen.
- **Annonsmärkning.** Två delar, båda krävs av Adtractions regler och Jollyrooms
  programvillkor:
  - **`.annonsnotis`** — notisen högst upp i guiden, före innehållet. Renderas av
    `base.njk` när `annonslankar` finns i frontmatter. Sätt den till en lista med
    handlarnamn — `annonslankar: ["Jollyroom", "Babyland"]` — så blir texten
    "innehåller reklam genom annonslänkar för Jollyroom och Babyland", vilket är
    exakt den formulering Jollyroom kräver. Sätt `true` bara om guiden har
    generella länkar utan namngiven handlare. Utelämnas nyckeln syns ingen notis.
    Filtret `listaSvenska` radar upp namnen ("A, B och C"), och `aktivaHandlare`
    sållar först bort handlare vars program-ID inte är ifyllt.
  - **`{% annonslank "url", "Handlare", "länktext" %}`** — affiliatelänk i löptext.
    Sätter `rel="sponsored nofollow noopener"` och lägger "(annonslänk till X)"
    inuti `<a>`, så att skärmläsare som listar sidans länkar också hör märkningen.
    Notisen högst upp är den primära märkningen; den här är förstärkningen.
  **En guide med affiliatelänkar ska alltid ha `annonslankar` satt** — annars är
  löptextlänkarna märkta men sidan saknar märkning högst upp.
- **Samtyckesbanner.** `src/js/samtycke.js`, laddad i `base.njk` med `defer` och
  `data-ga="{{ site.matningsId }}"`. Skriptet ritar bannern, och **inget anrop går till
  Google innan besökaren tryckt Godkänn** — gtag-skriptet injiceras först efter ett ja.
  Consent Mode v2 sätts ändå, med `analytics_storage` som enda flagga som går till
  `granted`; annonsflaggorna står kvar på `denied` eftersom vi inte annonserar via Google.
  Valet sparas i `localStorage` under `bpd-samtycke` och gäller i ett år — medvetet inte
  som kaka, så att ett nej inte i sig kräver samtycke. Bannern läggs **först i `body`**
  så att tangentbordsbesökare når den direkt, utan att fokus rycks från den som läser.
  Escape räknas som nej, och lyssnaren sitter på `document` — på bannern nås den aldrig,
  eftersom fokus ligger kvar i sidan. Godkänn och Neka har samma storlek och samma vikt
  i layouten; att neka ska inte vara svårare än att godkänna. Kontraster mot vitt:
  `--accent-mork` 7.3:1, `--text` 18.5:1, kanten runt Neka 5.8:1.
  Allt med `data-samtycke-oppna` öppnar bannern igen — knappen i integritetspolicyn
  använder det, och `window.barnprylsdoktorn.samtycke.oppna()` gör samma sak.
- **`.las-harnast`** — mörkt block sist i guiderna med två relaterade artiklar.
- **`.produktkort`** — korten på startsidan, hela kortet klickbart.
- **Tabeller** scrollar horisontellt under 44 rem med en skuggkant som affordans.
- **Bilbarnstolsväljaren** på `/vilken-bilbarnstol/`. Tre frågor — ålder, längd,
  ISOFIX — ger en stolskategori, aldrig en modell. All logik och alla texter ligger
  i `src/js/valjare.js`; markup och källförteckning i `src/vilken-bilbarnstol.njk`.
  Ingenting sparas och ingenting skickas — svaret kodas i adressen med
  `history.replaceState`, så att en länk kan klistras in i ett forum och ge samma
  svar. Siffrorna i svaren är belagda mot Transportstyrelsen och NTF: ändra dem
  aldrig utan att slå upp källan först.
  **Svaret har en delningsknapp** (`.valjare-dela`) som kopierar adressen med
  Clipboard API, med `execCommand` som reserv och en ärlig fallback-etikett om
  båda misslyckas. Inga tredjepartsanrop. Raden ovanför (`.valjare-delahint`)
  förklarar att adressen bär svaret — utan den förstår ingen att den går att dela,
  och det är hela poängen med väljaren som länkbar tillgång.
  Sidan har också en **statisk åldersöversikt** i en tabell. Den är sajtens
  landningspunkt för sökningar som "bilbarnstol 2 år" och den enda delen av
  väljaren en crawler kan läsa — resten renderas i webbläsaren. **Håll tabellen
  synkad med `bestamKategori()` i `valjare.js`.**
- **`.valjare-ingang`** — mörkt block som länkar in till väljaren, används på
  startsidan. I guiderna länkas väljaren från löptexten i stället.
- **`.infografik`** — wrapper runt en informationsgrafik i löptexten, max 460 px och
  centrerad. Bilden läggs som `<img>` med `version`-filtret, riktig `alt`-text och
  `width`/`height` för att slippa layouthopp. Används på fyra ställen:
  `langdtrappan` på startsidan och överst i `basta-bilbarnstolen`, `lutning` i
  `babyskydd-for-nyfodda`, `selhojd` i `vanliga-monteringsfel` under Fel 5, och
  `bilbarnstol-placering` i `bilbarnstol-plats-i-bilen`.
  Siffrorna i grafikerna är belagda mot NTF — ändra dem aldrig utan att slå upp källan,
  och håll dem synkade med löptexten i den guide de sitter i.

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

Sjutton publicerade guider:

| Slug | Ämne |
|---|---|
| `babyskydd-for-nyfodda` | Första stolen, Plustestet, lutning |
| `bakatvand-bilbarnstol-vilken-ska-jag-kopa` | Folksams test 2025, tre stolar |
| `i-size-vs-vikt` | R129, R44, i-Size, om gamla R44-stolar får användas, vad lagen kräver |
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
| `vinterklader-bilbarnstol` | Vinteroverall och åkpåse, Folksams krockprov 2016 |
| `nar-ar-barnet-klart-med-bilbarnstol` | 135 cm mot 10–12 år, kontroll av bältets passform |
| `bilbarnstol-pa-rea` | 30-dagarsregeln, testad modell mot efterföljare, returrätt, Black Friday |
| `efterfoljare-samma-stol` | Tvåan i modellnamnet: vad plustestet omfattar, vad Folksams betyg inte gör |

Utöver guiderna finns `/sa-tjanar-sajten-pengar/` och `/integritetspolicy/`, båda länkade i
sidfoten tillsammans med en kort affiliatemärkning. Integritetspolicyn beskriver mätningen,
Cloudflare, annonslänkarna och innehåller knappen som öppnar samtyckesbannern igen —
**ändras mätningen ska den sidan uppdateras i samma commit.**

**`/nedladdningar/kolla-bilbarnstolen-pa-en-minut.pdf`** är en tryckbar checklista, fem
steg, samma innehåll som Minutkontrollen i `vanliga-monteringsfel`. Publicerad 2026-08-19,
länkad från den guiden och från "Sedan då?" i `montera-bilbarnstol-steg-for-steg`. Ingen
egen sida — bara filen, nådd via de två guiderna.

**`/plustestade-bilbarnstolar/` är sajtens referenssida**, inte en guide. Den innehåller
hela VTI:s lista — 54 godkännanden, både aktuella och historiska — sorterad på tillverkare.
Syftet är att vara den sida någon klistrar in i en tråd när frågan "är den här stolen
plustestad?" dyker upp, eftersom VTI:s egen lista är på engelska och klientrenderad.
**Listan ägs av den sidan.** Guiderna får sammanfatta men aldrig återge hela tabellen igen
— det var därför tabellen bröts ut ur `basta-bilbarnstolen` 2026-08-17. Sex guider länkar
in i löptexten: `basta-bilbarnstolen`, `bakatvand-bilbarnstol-vilken-ska-jag-kopa`,
`begagnad-bilbarnstol`, `babyskydd-for-nyfodda`, `i-size-vs-vikt`, `baltesstol-eller-balteskudde`
och `bilbarnstol-pa-rea`.

Guiderna på `/guider/` och i "Mer att läsa" på startsidan sorteras fallande efter besök,
via filtret `sorteraEfterBesok`. Siffrorna kommer från `src/_data/popularitet.json`, som
uppdateras automatiskt varje måndag 05:00 UTC av `.github/workflows/statistik.yml` — jobbet
kör `scripts/hamta-statistik.js` mot Cloudflare Web Analytics och committar bara det som
ändrats. **Filen räknar besök, inte sidvisningar** — samma mått som trafikblocket och som
Web Analytics gränssnitt, så att siffrorna går att stämma av mot varandra. Cloudflare
räknar ett besök först när sidan öppnas från en annan domän: en läsare som klickar sig
från startsidan till en guide ger en sidvisning men inget besök. Får jobbet rader från
Cloudflare men inget besök på någon `/guider/`-sökväg **nollställs `popularitet.json` till
`{}`** — sorteringen faller då tillbaka på nyast först i stället för på en gammal siffra.
Kommer noll rader alls är det däremot ett tecken på att frågan gick fel, och den gamla
filen lämnas orörd. Guidernas sidvisningar loggas separat i körningen, som diagnostik. Samma körning skriver trafiksiffrorna i den här filen, i blocket mellan
`<!-- TRAFIK:START -->` och `<!-- TRAFIK:END -->` under "Nästa steg". **Blocket ägs av
jobbet — skriv aldrig i det för hand, och flytta inte markörerna utan att uppdatera
scriptet.** Tolkningen av siffrorna står utanför markörerna och rörs inte av jobbet.
`CF_API_TOKEN` ligger som secret i GitHub-repot, inte lokalt — den behövs inte
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

**`efterfoljare-samma-stol` äger frågan om vad tvåan i modellnamnet betyder.** Guiden kom
till 2026-08-19 ur en avstämning mot VTI: plustestlistan räknar upp efterföljare på samma
rad som originalet (`BeSafe Stretch, Stretch 2` under VTI-0040), medan Folksams betyg sitter
på exakt den modell som testades. `bilbarnstol-pa-rea` sammanfattar det i tre meningar och
länkar vidare — låt inte rea-guiden växa tillbaka in i ämnet.
**Öppen punkt, kontrollerad mot källorna 2026-08-21:** VTI-0041 säger ordagrant
`Axkid Minikid 3, Minikid 4`. Varken **Pro** eller **Max** står utskrivet. Folksams rad
heter ordagrant `Axkid Minikid 3/Minikid 4/Minikid 4 Max`, pris 4 995–6 499 kr, PlusTest
"Ja, 125 cm", testår 2023 — alltså är **Max belagd, Pro inte**. Babysam marknadsför ändå
Minikid 4 Pro som "PLUS Test-godkänd" och säljer den för 3 795 kr, under Folksams
prisintervall för de testade varianterna. Skriv aldrig ut betyg eller plustest för Pro. Guiden säger därför att man ska fråga efter numret — påstå aldrig något
starkare utan att först ha frågat Axkid eller VTI.

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

Belagda siffror att utgå från, verifierade 2026-08-09 mot NTF och Transportstyrelsen:
lutning **40–45°** babyskydd och **20–35°** bakåtvänd stol, selen **rakt ut från eller
strax ovanför** axlarna, **max två fingrar** mellan bälte och kropp, **33 kg** totalvikt
vid Isofix (gäller inte bältesstolar och bälteskuddar), **140 cm** framför aktiv
krockkudde, **125 cm** för bälteskudde utan rygg, **cirka tio års** livslängd.
Hela genomgången med ordagranna citat ligger i `research/faktakoll-2026-08-09.md`.

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
cd ~/kod/bilbarnstolar
rm -f .git/HEAD.lock .git/index.lock
git add -A && git commit -m "..." && git push origin main
```

Efter deploy: kontrollera i webbläsaren att det faktiskt ser rätt ut, inte bara att bygget
gick igenom. Lägg på en query-parameter (`?v=2`) för att gå runt cachen vid kontroll —
både din egen och Cloudflares.

## Kanaler — vad vi gör och inte gör

Erik skriver **inte** på sociala medier och **inte** i forum. Inga inlägg i Facebookgrupper,
på Instagram, TikTok, Reddit, Familjeliv eller liknande — varken i eget namn eller som
"lägg länken där frågan ställs". Föreslå det inte, och lägg aldrig en plan som förutsätter
det. Att *andra* klistrar in våra länkar i trådar är fortfarande målet — det är därför
väljaren och Plustest-listan är byggda som de är. Skillnaden är att vi inte gör det själva.

Kanalerna vi använder:

- **Mejl.** Kontakt med sajter, organisationer, handlare och redaktioner för länkar,
  samarbeten och affiliateprogram. Det här är kanalen vi satsar på för räckvidd.
- **Sajten själv.** Innehåll, verktyg och intern länkning.
- **Sök.** Search Console, indexering, sökordsluckor.

Betald annonsering är inte utesluten men inte aktuell — och Google Ads begränsas dessutom av
programvillkoren: ingen SEM på varumärkesnamn i något program, och Google Shopping är
förbjudet hos Babyland och Stor&Liten.

## Nästa steg i projektet

1. **Affiliate — fyra godkända program.** Kanalen Barnprylsdoktorn hos Adtraction
   (ID 2100860918) är godkänd sedan 2026-08-10, och nio ansökningar skickades samma dag.
   Godkända: **Babysam (8 %)** sedan 2026-08-10, **Babyland (4 %)** och **Stor&Liten (4 %)**
   sedan 2026-08-12, **Baby V (7 %)** sedan 2026-08-13. **Jollyroom nekade 2026-08-13**
   med motiveringen att kanalens innehåll inte matchar annonsörens produkter eller
   marknadsföringsmål — de omprövar på förfrågan till `support@adtraction.com`.
   Alla fyra spårlänkarna ligger i `ADTRACTION_PROGRAM` i `eleventy.config.js`. Baby V
   spårar via `go.adt231.net`, ännu en egen spårdomän — bygg aldrig länken av ett ID.
   **Alla live-länkar går mot Babysam, och gör det igen sedan 2026-08-27** — se punkt 2
   för historiken kring Britax Römer Max-Safe Pro, som var flyttad till Baby V mellan
   2026-08-17 och 2026-08-27. Jämförelsen
   2026-08-12 ligger i `research/handlarjamforelse-2026-08-12.md`: Babysam är billigare
   eller likvärdig på varje överlappande produkt och betalar dubbla provisionen. Babyland
   och Stor&Liten ligger inne som reserv om Babysam tar slut i lager, och Babyland täcker
   dessutom cykelsits inför en eventuell breddning. Nästa gång ett program godkänns —
   följ checklistan sist i den filen innan någon länk flyttas.
   Fortfarande Waiting: Axkid (5 %), Bonti (5 %), Köpbarnvagn (5 %) och Emmaljunga (10 %). Hos Awin står Babyshop SE,
   Lekmer SE och Kids Concept SE som Pending; Babyshop och Lekmer har historiskt 100 %
   approval rate, gemensam programkontakt för de två första är `affiliate@babyshop.se`.
   Kvar att söka när det finns anledning: Safekid, Kid's Concept.
   Emmaljunga har bara ett babyskydd (BeSafe iZi Go Modular X1) plus vagnadaptrar, alltså
   tunnast sortiment för nischen.
   **Ingen SEM på varumärkesnamn** i något av programmen, och Google Shopping är förbjudet
   hos Babyland och Stor&Liten — påverkar inget idag, men låser en eventuell
   Google Ads-satsning.
2. **Tillbehörslänkar i löptexten.** Åtta placeringar kartlagda i
   `research/tillbehorslankar-2026-08-09.md`. Genomfört mot Babysam 2026-08-10:
   köpblocken i `bakatvand-bilbarnstol-vilken-ska-jag-kopa` och `basta-bilbarnstolen`
   (Max-Safe Pro, TinySeats Two), samt placering 1 (bälteskudde, `bilbarnstol-i-taxi`),
   3 (transportväska, `bilbarnstol-flyg-och-hyrbil`) och 6 (bilspegel,
   `bilbarnstol-fram-och-airbag` — omskriven så att den inte påstår något om
   krocksäkerhet, eftersom ingen svensk myndighetskälla om bilbarnstolsspeglar hittats).
   Kvar och medvetet ogjort — samtliga kontrollerade mot Babyland och Stor&Liten
   2026-08-12 utan träff:
   - **Britax Römer Max-Safe Pro tillbaka hos Babysam sedan 2026-08-27.** Var flyttad
     till Baby V 2026-08-17 eftersom Babysam hade stolen slutsåld online i alla färger.
     **Kontrollerad 2026-08-27: Babysam köpbar online igen**, Space Black 3 995 kr
     (ord. 4 995 kr), "28 stycken på väg in i lager", leverans 12–15 vardagar (plus
     Klicka & Hämta i två butiker). Baby V hade samtidigt Dusty Rose i lager för samma
     pris med 1–2 dagars leverans, men provisionsskillnaden (8 % mot 7 %) väger tyngre
     än leveranstiden i den här prisklassen, så länken flyttades tillbaka. `produkter.js`,
     `basta-bilbarnstolen` och `bakatvand-bilbarnstol-vilken-ska-jag-kopa` pekar nu alla
     på Babysam igen, och `annonslankar` i båda guiderna är ändrat i takt med det.
     **Öppen punkt:** tabellen och löptexten i båda guiderna anger fortfarande 4 495 kr
     för Max-Safe Pro (Folksams pris vid testtillfället), mot det verifierade
     handlarpriset 3 995 kr — inte ändrat utan avstämning med Erik. Stäm av Babysams
     inleverans igen omkring 2026-09-10 för att bekräfta att den faktiskt kom in.
   - **BeSafe Beyond får ingen länk.** Ingen av de tre handlarna säljer originalet, bara
     efterföljaren Beyond², som inte är den stol Folksam testade 2025. Att länka dit vore
     att tillskriva en annan produkt ett testresultat den inte har. Öppnas om ett program
     med den faktiska Beyond godkänns, eller om Beyond² visar sig vara samma stol.
   - **Placering 4 och 5 (åkpåse utanpå selen) är blockerade.** Babysams bilstolsåkpåsar
     är alla av typen barnet ligger *i*, alltså med ett lager mellan sele och kropp —
     precis det guiderna varnar för. Babylands och Stor&Litens åkpåsar är
     barnvagnsmodeller. Ingen länk förrän en produkt av rätt typ hittats och verifierats
     mot tillverkarens beskrivning.
   - Placering 2 (CARES) — säljs inte av någon av de tre. Placering 7 och 8 stryks enligt
     underlaget.
   Mät klickfrekvensen på de fem som ligger inne innan resten läggs in.
3. **Faktakoll — inga kända öppna punkter.** De två kvarvarande punkterna i
   `research/faktakoll-2026-08-09.md` är åtgärdade 2026-08-10: begagnatguiden anger nu att
   godkännandenumret ska börja på 03 eller 04 och att stolar med enbart T-märkning inte får
   användas efter 9 maj 2008, båda belagda mot Transportstyrelsen som numera står i guidens
   källförteckning. Plustestets 56 km/h är belagt direkt mot VTI.
   En bredare genomgång av samtliga tretton guider ligger i
   `research/faktakoll-alla-guider-2026-08-09.md` — elva fynd, alla åtgärdade och live.
   Plustest-tabellen i `basta-bilbarnstolen` bör stämmas av mot VTI kvartalsvis — listan
   uppdateras löpande, och sidan är klientrenderad så den går bara att läsa i webbläsare.
4. **Indexeringen rampar upp normalt** — den är inte flaskhalsen. Den första genomgången
   2026-08-10 ligger i `research/indexering-2026-08-10.md`; tekniken är kontrollerad och
   ren (robots, sitemap, canonical, JSON-LD, unika titlar, ingen noindex), ingen
   kannibalisering (högsta överlapp mellan två guider 6 %) och ingen föräldralös guide.

   **Läget i GSC 2026-08-17, data per 2026-08-14: sju indexerade, fjorton inte.** Upp från
   sex den 10 augusti. Tre orsaker till de fjorton:
   - **Sida med omdirigering (1)** — `http://barnprylsdoktorn.se/`, alltså HTTP-versionen
     som går till HTTPS. Korrekt beteende. **Åtgärda inte, och klicka inte på "Verifiera
     att åtgärder vidtagits".**
   - **Genomsökt – inte indexerad (9)** — hämtade, ännu inte indexerade.
   - **Upptäckt – inte indexerad (4)** — kända, ännu inte hämtade.

   Båda de sista är normala för en domän som är knappt två veckor gammal. **Men om
   "Genomsökt – inte indexerad" ligger kvar efter oktober är det inte längre en kö utan en
   bedömning av sajtens tyngd** — och då är externa länkar svaret, inte fler artiklar.

   Sitemap: status Lyckades, 20 sidor, senast läst 2026-08-14. Skicka inte in den igen.
   Resultatrapporten har två klick totalt och för lite underlag för att visa sökfrågor.

   **Det som avgör takten härifrån är externa länkar** — sajten har i praktiken inga.
   Begär inte omindexering av redan genomsökta sidor; det påverkar bara kön. **Nya URL:er
   är undantaget** — `bilbarnstol-pa-rea` indexeringsbegärdes 2026-08-17 samma dag den
   publicerades.
   Svagast internt länkade är `bilbarnstol-i-taxi`, `bilbarnstol-flyg-och-hyrbil`,
   `basta-bilbarnstolen` och `montera-bilbarnstol-steg-for-steg`. Kanalen hos Adtraction
   anger 30 unika besökare i månaden — uppdatera den siffran när den stiger, det är enda
   fältet som går att redigera i efterhand.

   **Trafiken, hämtad från Cloudflare Web Analytics av måndagsjobbet:**

   <!-- TRAFIK:START -->
   *Hämtad automatiskt 2026-08-24 av `scripts/hamta-statistik.js` från Cloudflare
   Web Analytics, botar bortfiltrerade.
   Skriv inte i blocket för hand — det skrivs över varje måndag.*

   | | 7 dagar | 30 dagar |
   |---|---|---|
   | Besök | 58 | 230 |
   | Sidvisningar | 72 | 270 |
   | **Samtliga `/guider/`-sidor, besök** | **12** | **20** |

   Mest besökta sökvägar, 30 dagar (2026-07-25–2026-08-24):

   | Sökväg | Besök 7 d | Besök 30 d |
   |---|---|---|
   | `/` | 33 | 190 |
   | `/plustestade-bilbarnstolar/` | 11 | 10 |
   | `/vilken-bilbarnstol/` | 0 | 10 |
   | `/guider/bilbarnstol-plats-i-bilen/` | 2 | 10 |
   | `/guider/bilbarnstol-i-taxi/` | 2 | 10 |
   | `/guider/basta-bilbarnstolen/` | 2 | 0 |
   | `/om/` | 1 | 0 |
   | `/guider/montera-bilbarnstol-steg-for-steg/` | 0 | 0 |
   | `/guider/babyskydd-for-nyfodda/` | 0 | 0 |
   | `/guider/bilbarnstol-flyg-och-hyrbil/` | 1 | 0 |
   <!-- TRAFIK:END -->

   Referrers och länder ingår inte i blocket — de läses i Cloudflare Web Analytics.
   Manuell avläsning 2026-08-18, Exclude bots = Yes: 49 besök på 7 dagar och 150 på 21,
   varav 140 på `/`, 10 på `/vilken-bilbarnstol/` och noll på guiderna. Referrers 21 dagar:
   130 direkt, 10 `secure.adtraction.com`, 10 `bing.com`, noll Google. Länder 7 dagar:
   33 USA, 9 Sverige, resten enstaka.

   **Läs siffrorna rätt — bedömningen från 2026-08-18 står kvar: sajten har inga läsare.**
   Nästan all trafik är direkta anrop mot `/` från USA med en sidvisning per besök — det är
   skannrar och botar som Cloudflares botfilter inte fångar, inte människor. De tio besöken på
   väljaren sammanfaller med de tio från `secure.adtraction.com` och är rimligen Adtractions
   egen granskning av kanalen. **Guiderna har noll besök på tjugoen dagar.** Allt
   innehållsarbete som gjorts sedan lanseringen har alltså ännu inte nått en enda läsare, och
   det beror inte på innehållet utan på att sajten är osynlig i Google.

   Konsekvenser: `sorteraEfterBesok` sorterar på brus och kommer göra det ett bra tag till.
   `popularitet.json` innehöll fram till 2026-08-21 en siffra (montera-guiden, 10) som
   inte gick att hitta igen i Web Analytics, och som pinnade den guiden överst på
   startsidan och `/guider/`. **Jobbet var aldrig trasigt.** Körningarna 2026-08-10 och
   2026-08-17 gick båda igenom — den andra hade inget att committa eftersom den räknade
   fram exakt samma siffra, och därför står den senaste statistikcommiten 2026-08-10.
   Felet var måttet: filen fylldes med **sidvisningar** medan gränssnittet visar **besök**,
   och Cloudflare räknar ett besök först när sidan öppnas från en annan domän. Tio
   sidvisningar och noll besök på samma guide är alltså ingen motsägelse — det är tio
   klick vidare från startsidan. Åtgärdat 2026-08-21: skriptet skriver besök i stället för
   sidvisningar, loggar sidvisningarna separat och nollställer filen när rader kommer men
   inget guide-besök finns. `popularitet.json` är `{}` och sorteringen faller tillbaka på
   nyast först. Måndagsjobbet skriver dessutom trafikblocket nedan först från och med
   körningen 2026-08-24 — funktionen fanns inte vid förra körningen. Core Web Vitals
   visar mycket rött på INP; med det här underlaget är siffran dock brus och ska inte
   åtgärdas ännu.

   **Länkoutreach startad 2026-08-18.** Prospektlistan ligger i
   `research/lankprospekt-2026-08-18.md`: cirka trettiofem namngivna prospekt i fem tiers —
   uthyrare av bilbarnstolar, NTF:s länsförbund, taxibolag med barnstolssida, husbils- och
   campingsajter, samt försäkring och bilkunskap — plus tre mejlmallar och en
   uppföljningsmall. Pitchen är `/plustestade-bilbarnstolar/`, sekundärt väljaren, aldrig
   "läs min artikel". Takt: tio mejl i veckan, en uppföljning per prospekt. Nya länkar syns
   först under referrers i Cloudflare Web Analytics.
5. **Fler artiklar — skriv efter kalendern, inte efter listan.** Och skriv färre: så länge
   sajten saknar externa länkar är artikel nummer sjutton inte det som flyttar nålen.
   `i-size-vs-vikt` utökades 2026-08-18 från 618 till cirka 1 140 ord med avsnitt om att
   R44-stolar fortfarande får användas efter säljstoppet 1 september 2024, hur etiketten
   läses, vad R129 lade till och att godkännandet är ett golv och inte ett kvalitetsbetyg.
   Faktakollen ligger i `research/faktakoll-i-size-vs-vikt-2026-08-18.md`. Indexeringen tar fyra till
   åtta veckor på den här domänen, så en säsongsguide måste ligga ute två till tre månader
   före toppen.
   `bilbarnstol-pa-rea` är publicerad 2026-08-17 med sikte på Black Friday **27 november
   2026**. Underlaget ligger i `research/reaguiden-underlag-2026-08-17.md` och faktakollen
   i `research/faktakoll-bilbarnstol-pa-rea-2026-08-17.md`. **Guiden är medvetet evergreen**
   — den ska ranka på "bilbarnstol rea" året runt och får inte skrivas om till en
   Black Friday-landningssida. Enda årliga underhållet är datumet i avsnittet
   "När är det rea på bilbarnstolar?".
   Kvar av sökordsluckorna i `research/sokordsluckor-2026-08.md`: *bilbarnstolsregler i
   andra länder*, som ska skrivas i mars–april inför resesäsongen och kräver löpande
   underhåll med datum och källa per land.
   Fråga Erik innan du börjar på nästa. Diskuterad breddning: cykelbarnstol, cykelkärra
   och barncykelhjälm först, barnvagn därefter — men de är vårsäsong, så de hör hemma i
   januari–februari, inte nu.
6. **Google Analytics.** **Åtgärdat 2026-08-23, av Erik själv i gränssnittet:**
   datalagring höjd från två till fjorton månader, och Search Console länkad till
   egendomen. **GA:s gränssnitt går inte att styra med webbläsarautomation** — appen
   fastnar på "Läser in ..." i en automatiserad flik, bekräftat både 2026-08-21 och
   2026-08-23 (deep link till egendoms-ID p550859009 studsade dessutom till en annan
   egendom, p551118288, i den automatiserade fliken). Datorstyrning på Eriks Mac är
   ingen väg runt det: webbläsare kan bara beviljas i läsläge, alltså utan klick.
   Cloudflares dashboard fastnar likadant. De här två sakerna kräver alltså alltid att
   Erik klickar själv — försök inte igen med automation.
   Mät-ID och egendomsuppgifter står under Teknik. Bannern och dess regler står under
   Komponenter. Data börjar samlas in först efter deploy, och GA rapporterar bara de
   besökare som tryckt Godkänn — Cloudflare Web Analytics är fortsatt det som räknar alla.
7. **Löpande UX- och mobilgenomgång** med `ux-granskning`-skillen.

Den här listan är färskvara. Blir ett steg klart, stryk det i samma commit — och lägg till
guiden i innehållstabellen ovan när en ny publiceras.
