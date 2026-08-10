# Indexeringsgenomgång 2026-08-10

Andra genomgången. Slutsatsen skiljer sig från den första: **problemet är inte tekniskt,
och det är till största delen inte ett problem.**

## Det viktigaste först

**Sajten är fyra dagar gammal.** Första commit är 2026-08-06. Att tolv sidor ligger på
"Genomsökt – inte indexerad" efter fyra dygn är inte ett fel — det är hur Google beter sig
mot varje ny domän. Google kryper tidigt, men väntar med att indexera tills den sett att
domänen är stabil och att innehållet är värt utrymmet.

**GSC-siffran vi utgått från är föråldrad.** Rapporten "Indexering av sidor" står som
`Senast uppdaterad: 2026-08-07` — alltså dagen efter lanseringen. Uppdelningen 12 icke
indexerade / 4 indexerade beskriver en sajt som var ett dygn gammal.

**Verkligheten idag är bättre.** `site:barnprylsdoktorn.se` i Google 2026-08-10 ger sex
indexerade sidor:

| Sida | Status |
|---|---|
| `/` | Indexerad |
| `/guider/` | Indexerad |
| `/om/` | Indexerad |
| `/vilken-bilbarnstol/` | Indexerad |
| `/sa-tjanar-sajten-pengar/` | Indexerad |
| `/guider/babyskydd-for-nyfodda/` | Indexerad |

Notera att `babyskydd-for-nyfodda` står som icke indexerad i `CLAUDE.md` — den siffran kom
från GSC:s 7 augusti-snapshot och stämmer inte längre. Fyra har blivit sex på tre dygn.
Kurvan pekar åt rätt håll.

Fördelningen av orsaker i GSC (7 augusti): tio sidor "Genomsökt – inte indexerad", två
"Upptäckt – inte indexerad". Den andra kategorin betyder att Google känner till adressen
men ännu inte hunnit hämta den — ren kö, inget omdöme.

## Vad jag kontrollerade och avfärdade

**Tekniken är ren.** Inget av det här är trasigt:

- `robots.txt` tillåter allt och pekar på sitemap
- `sitemap.xml` listar 18 adresser, alla korrekta och absoluta
- `canonical` finns på varje sida och pekar rätt
- Ingen `noindex` någonstans
- Unika `title` och `beskrivning` på samtliga tretton guider
- JSON-LD renderas per artikel
- Sidorna svarar 200 och innehållet finns i HTML — ingen klientrendering som göms för
  crawlern (undantaget Plustest-tabellen i `basta-bilbarnstolen`, som är känd sedan innan)

**Ingen kannibalisering.** Jag mätte överlapp mellan alla guider som delade fyraordsfraser
(Jaccard). Högsta värdet är 6,07 % mellan `bakatvand-bilbarnstol-vilken-ska-jag-kopa` och
`basta-bilbarnstolen`, näst högsta 5,53 % mellan `montera-bilbarnstol-steg-for-steg` och
`vanliga-monteringsfel`. Allt annat ligger under 3,6 %. Nyckeltermerna koncentreras
dessutom till den guide som äger frågan: `R129` förekommer 15 gånger i `i-size-vs-vikt` och
högst fyra gånger någon annanstans, `krockkudde` 29 gånger i `bilbarnstol-fram-och-airbag`.
Avgränsningarna mellan guiderna håller.

**Intern länkning är inte svälten.** Inkommande löptextlänkar per guide:

| Guide | Inkommande | Ordantal |
|---|---|---|
| `bakatvand-bilbarnstol-vilken-ska-jag-kopa` | 10 | 1193 |
| `isofix-eller-balte` | 9 | 792 |
| `vanliga-monteringsfel` | 9 | 1248 |
| `baltesstol-eller-balteskudde` | 7 | 1229 |
| `begagnad-bilbarnstol` | 6 | 1305 |
| `bilbarnstol-fram-och-airbag` | 6 | 1560 |
| `i-size-vs-vikt` | 6 | 550 |
| `babyskydd-for-nyfodda` | 5 | 878 |
| `bilbarnstol-plats-i-bilen` | 4 | 1112 |
| `basta-bilbarnstolen` | 3 | 1502 |
| `montera-bilbarnstol-steg-for-steg` | 3 | 1152 |
| `bilbarnstol-flyg-och-hyrbil` | 2 | 1022 |
| `bilbarnstol-i-taxi` | 2 | 864 |

Ingen guide är föräldralös. Ordantalen ligger mellan 550 och 1560 — inget är så tunt att
det förklarar utebliven indexering.

## Vad som faktiskt går att göra

Rangordnat efter hur mycket det påverkar.

### 1. Externa länkar — den enda verkliga hävstången

Sajten har i praktiken inga inkommande länkar från andra domäner. Det är den enskilt
starkaste signalen Google har för att avgöra om en ny domän är värd indexutrymme, och den
enda på listan som faktiskt förändrar utfallet snarare än att putsa på marginalen.

Det som fungerar för den här nischen är att svara på riktiga frågor där de redan ställs:
Familjeliv, föräldragrupper på Facebook, r/sweden och r/svenskaforaldrar. Villkoret är att
svaret ska stå på egna ben — skriv ut siffran och slutsatsen i inlägget, och länka guiden
som fördjupning. Ett svar som bara är en länk blir borttaget och gör mer skada än nytta.

Två andra vägar värda ett försök: NTF och Folksam får regelbundet frågor de inte hinner
svara på, och en välgjord svensk guide som faktiskt citerar deras material korrekt är inte
ointressant för dem. Och Axkid — som du nu sökt affiliate hos — listar ibland partners.

### 2. Sluta begära omindexering manuellt

Det påverkar inte beslutet, bara kön. Sidorna är redan genomsökta; Google har sett dem och
valt att vänta. Att skicka in dem igen ändrar ingenting och riskerar att äta upp kvoten när
du faktiskt behöver den — vid en riktig innehållsändring.

### 3. Stärk de fyra svagast länkade guiderna

`bilbarnstol-i-taxi` (2), `bilbarnstol-flyg-och-hyrbil` (2), `basta-bilbarnstolen` (3) och
`montera-bilbarnstol-steg-for-steg` (3) har minst intern länkkraft. Att `basta-bilbarnstolen`
ligger där är det märkligaste — det är köpguiden och borde vara den mest länkade sidan på
sajten. Naturliga ställen att länka in den finns i `i-size-vs-vikt`, `isofix-eller-balte`
och `vanliga-monteringsfel`.

### 4. Bygg ut `i-size-vs-vikt`

550 ord är sajtens tunnaste guide och ämnet är ett av de mest sökta. Den tål 300–400 ord
till utan att bli seg — särskilt kring vad godkännandenumret på etiketten faktiskt betyder,
vilket ändå ska in enligt den kvarvarande faktakollpunkten i begagnatguiden.

### 5. Vänta

Det obekväma svaret. Fyra dygn är ingenting. Rimlig förväntan för en ny svensk
innehållsdomän är att huvuddelen av sidorna är indexerade inom fyra till åtta veckor, om
inget är tekniskt fel — och inget är tekniskt fel här.

## Vad som bör ändras i CLAUDE.md

Punkt 4 i "Nästa steg" påstår att indexeringen är den verkliga flaskhalsen och att bara
4 av 16 sidor är indexerade. Båda delarna är föråldrade. Formuleringen bör bytas mot att
indexeringen ramper upp normalt för en ny domän, att sex sidor är indexerade 2026-08-10,
och att externa länkar är det som avgör takten härifrån.
