# Copy-genomgång 2026-08-08 — hänger allt ihop?

Omfattning: samtliga 13 guider, `produkter.js`, `index.md`, `guider.njk`, `om.md`, `sa-tjanar-sajten-pengar.md` och `base.njk`. Fokus på konsistens efter contentändringarna, inte på tonläge.

**Status: allt nedan är genomfört och godkänt av Erik 2026-08-08.** Filen står kvar som underlag för vad som ändrades och varför. A1–A3 och B1–B2 rör säkerhetssiffror och gjordes först efter uttryckligt godkännande.

Metod: alla siffror som förekommer på fler än ett ställe är jämförda mot varandra och mot primärkälla (NTF:s FAQ om montering och placering, Folksams pressmeddelande om observationsstudien 2022). Interna länkar och `Läs härnäst` är kontrollerade mot byggd HTML i `_site/`.

**Sammanfattning:** inga trasiga länkar, inga felaktiga produktpriser. Tre faktafel har kommit in, `Läs härnäst` har kollapsat till samma två länkar på tio av tretton guider, och `produkter.js` har glidit ifrån guiden på en punkt.

Prioritetsordning: A → D är värt att göra nu. E och F kan vänta.

---

## A. Faktafel — tre stycken, alla i nya eller ändrade texter

### A1. Fel lutningsintervall (`vanliga-monteringsfel.md`, rad 73)

Den enda direkta motsägelsen mot en säkerhetssiffra på sajten. Tre andra guider säger 40–45 grader för babyskydd och 30–35 för bakåtvänd stol. Den här säger 20–35 och blandar ihop två olika tal hos NTF.

NTF ordagrant: *"Babyskyddet kan luta cirka 40-45 grader i stolsryggen... En bakåtvänd bilbarnstol får inte luta mer än 30-35 grader, men ofta räcker cirka 20-25 graders lutning."*

Så 20–25 är vad som *räcker* för en bakåtvänd stol. 30–35 är taket. Ingen av dem är 20–35, och stycket handlar dessutom om nyfödda, där 40–45 gäller.

**FÖRE:**

```
**Lutningen.** En nyfödd som sitter för upprätt kan få hakan mot bröstet och andningen begränsad. NTF anger 20–35 graders lutning som riktvärde, och de flesta stolar har en vattenpassmarkering eller en linje som ska ligga vågrätt. Mer om det i [guiden om babyskydd](/guider/babyskydd-for-nyfodda/).
```

**EFTER:**

```
**Lutningen.** En nyfödd som sitter för upprätt kan få hakan mot bröstet och andningen begränsad. NTF anger cirka 40–45 grader för ett babyskydd och högst 30–35 för en bakåtvänd bilbarnstol, och de flesta stolar har en vattenpassmarkering eller en linje som ska ligga vågrätt. Mer om det i [guiden om babyskydd](/guider/babyskydd-for-nyfodda/).
```

### A2. Fel bas för 16-procentsiffran (`vanliga-monteringsfel.md`, rad 75)

Folksam ordagrant: *"Av totalt 31 barn (under 140 cm) som satt i passagerarsätet fram, satt fem barn (16 procent) framför en aktiv krockkudde, varav ett barn (tre procent) i bakåtvänd bilbarnstol."*

16 procent avser alltså de 31 barn som satt fram — inte alla observerade barn. Som det står nu låter det som att var sjätte barn i studien satt framför en aktiv krockkudde.

**FÖRE:**

```
**Krockkudden.** I Folksams kontroll satt 16 procent av barnen i framsätet framför en aktiv krockkudde, och ett av dem bakåtvänt. Det sista är direkt livsfarligt. [Vad som gäller i framsätet](/guider/bilbarnstol-fram-och-airbag/) är en egen guide.
```

**EFTER:**

```
**Krockkudden.** Av de 31 barn under 140 cm som satt i framsätet i Folksams kontroll satt fem — 16 procent — framför en aktiv krockkudde, och ett av dem bakåtvänt. Det sista är direkt livsfarligt. [Vad som gäller i framsätet](/guider/bilbarnstol-fram-och-airbag/) är en egen guide.
```

### A3. Inverterad och felattribuerad siffra (`montera-bilbarnstol-steg-for-steg.md`, rad 52)

41 procent monterade rätt betyder att knappt sex av tio gjorde fel, inte fyra av tio. Siffran gäller dessutom hela monteringen, inte bältesvägen specifikt — Folksam redovisar ingen separat siffra för bältesdragning. Meningen är också trasig grammatiskt.

**FÖRE:**

```
2. **Trä bilbältet genom rätt öppningar.** Tillverkarna färgkodar dem, ofta blått för bakåtvänt och rött för framåtvänt. Följ bältet med fingret hela vägen och se till att det inte är vridet. Enligt Folksam är det här fyra av tio gör fel.
```

**EFTER:**

```
2. **Trä bilbältet genom rätt öppningar.** Tillverkarna färgkodar dem, ofta blått för bakåtvänt och rött för framåtvänt. Följ bältet med fingret hela vägen och se till att det inte är vridet. Det är ett av stegen som gör att bara 41 procent av de bältesmonterade stolarna satt helt rätt i Folksams kontroll.
```

**Kontrollerat och korrekt** i samma sammanhang, ingen ändring behövs: 41 % / 95 %, 51 % slaka underförankringsband ("drygt hälften"), 51 % vinterkläder ("ungefär hälften"), 180 kontroller vid 13 förskolor, huvudskador vanligast (25 %).

---

## B. Två formuleringar som drar åt olika håll

### B1. 140 cm framställs som krav i en guide, som rekommendation i tre

`bilbarnstol-fram-och-airbag.md` bygger hela sin poäng på att hålla isär lag och rekommendation, och gör det bra. `baltesstol-eller-balteskudde.md` rad 87 säger "ska vara minst 140 cm", vilket läser som lagkrav. NTF formulerar det som *"Enligt gällande rekommendationer ska krockkudden vara urkopplad om barnet är under 140 cm."*

**FÖRE:**

```
Barnet ska vara minst **140 cm** för att sitta framför en aktiv krockkudde, om inte biltillverkaren säger något annat för just din bil. Notera att det är en högre siffra än de 135 cm lagen kräver för skyddsanordning — de två gränserna har olika ursprung och råkar bara ligga nära varandra.
```

**EFTER:**

```
Rekommendationen är att barnet ska vara minst **140 cm** för att sitta framför en aktiv krockkudde, om inte biltillverkaren säger något annat för just din bil. Notera att det är en högre siffra än de 135 cm lagen kräver för skyddsanordning — och att 140 cm är en rekommendation medan 135 cm är lag. De två gränserna har olika ursprung och råkar bara ligga nära varandra.
```

### B2. 33-kilosgränsen beskrivs smalare i en guide än i en annan

`bilbarnstol-plats-i-bilen.md` rad 50 har den fullständiga formuleringen ("bakåtvänt åkande eller framåtvänt med internbälte"), vilket ordagrant följer NTF. `isofix-eller-balte.md` rad 54 säger bara "vid bakåtvänd montering". Inte fel, men smalare — och `isofix-eller-balte` är den guide läsaren kommer till för just den frågan.

**FÖRE:**

```
Vid bakåtvänd montering med Isofix finns en total viktgräns på **33 kg — stol plus barn tillsammans**. Väger stolen 15 kg får barnet alltså väga 18 kg. Det är därför de flesta bakåtvända Isofix-stolar är godkända upp till just 18 kg.
```

**EFTER:**

```
Vid Isofix-montering finns en total viktgräns på **33 kg — stol plus barn tillsammans**. Den gäller bakåtvänt åkande och framåtvänt med internbälte. Väger stolen 15 kg får barnet alltså väga 18 kg. Det är därför de flesta bakåtvända Isofix-stolar är godkända upp till just 18 kg.
```

---

## C. `produkter.js` har glidit ifrån guiden

Priser och namn stämmer överallt — 4 495 / 6 299 / 5 995 kr är identiska i `produkter.js`, i båda tabellerna och i löptexten. En sak har glidit isär.

**TinySeats Two.** Efter `research/produkter-granskning.md` säger `produkter.js`:

```js
specifikation: "Bakåtvänt till 125 cm / 23 kg · sedan bältesstol till 135 cm · Isofix · inte Plustestad",
```

Men båda tabellerna säger fortfarande `61–125 cm, max 23 kg`, och ingen löptext nämner att stolen fortsätter som bältesstol till 135 cm. En läsare ser köpblocket och tabellen bredvid varandra och ser två olika produkter.

Två saker att göra:

1. Lyft in fortsättningsläget i löptexten i `bakatvand-bilbarnstol-vilken-ska-jag-kopa.md`, i stycket om TinySeats. Det är produktens starkaste argument och det står bara i produktblocket.
2. Den granskningen noterade också att tillverkaren är uttrycklig med att **internselen inte får användas framåtvänt** — då gäller bilens bälte. Det bör stå i guiden, inte i produktblocket. Det saknas fortfarande.

**Förslag, läggs efter rad 74 i `bakatvand-bilbarnstol-vilken-ska-jag-kopa.md`:**

```
Den fortsätter dessutom som bältesstol till 135 cm när barnet vuxit ur det bakåtvända läget. En sak att veta då: den inbyggda selen får inte användas framåtvänt — där är det bilens bälte som gäller.
```

Kvarstår från förra granskningen, ej verifierat av mig: **BeSafe Beyonds pris**. Där noterades 8 998 kr som en möjlig siffra och frågan om priset avser stol med eller utan bas. Nu står 6 299 kr med fotnot om att basen tillkommer. Konsekvent på sajten, men värd en kontroll mot handlare innan affiliatelänkarna går på.

Format: `tinyseats-two` använder ett annat mönster i `specifikation` än de två andra (`61–125 cm · max X kg · …`). Kosmetiskt, men de renderas intill varandra.

---

## D. `Läs härnäst` har kollapsat — tio av tretton guider visar samma två länkar

Det här är den tydligaste konsekvensen av att du lagt till artiklar, och den syns inte i koden utan bara i byggd HTML.

Fallbacken i `base.njk` (rad 114–124) plockar köpguiden plus **den nyaste artikeln**. När `montera-bilbarnstol-steg-for-steg` blev nyast tog den platsen på varenda guide som saknar `lasharnast`. Verifierat i `_site/`:

| Guide | Läs härnäst just nu |
|---|---|
| babyskydd-for-nyfodda | bakåtvänd köpguide, montera |
| baltesstol-eller-balteskudde | bakåtvänd köpguide, montera |
| basta-bilbarnstolen | bakåtvänd köpguide, montera |
| begagnad-bilbarnstol | bakåtvänd köpguide, montera |
| bilbarnstol-flyg-och-hyrbil | bakåtvänd köpguide, montera |
| bilbarnstol-fram-och-airbag | bakåtvänd köpguide, montera |
| bilbarnstol-i-taxi | bakåtvänd köpguide, montera |
| i-size-vs-vikt | bakåtvänd köpguide, montera |
| isofix-eller-balte | bakåtvänd köpguide, montera |
| vanliga-monteringsfel | bakåtvänd köpguide, montera |

Bara `bilbarnstol-plats-i-bilen` (har `lasharnast`), `bakatvand-…` och `montera-…` (exkluderar sig själva) skiljer sig.

Fallbacken var rimlig med tio guider. Med tretton är den skadlig: någon som just läst om taxi får ett förslag om steg-för-steg-montering, och `basta-bilbarnstolen` — sidan som ska konvertera — får aldrig en inlänk härifrån.

**Åtgärd: sätt `lasharnast` på samtliga guider.** Lägg till raden i frontmatter, direkt efter `date`:

```
babyskydd-for-nyfodda.md
lasharnast: ["bakatvand-bilbarnstol-vilken-ska-jag-kopa", "basta-bilbarnstolen"]

bakatvand-bilbarnstol-vilken-ska-jag-kopa.md
lasharnast: ["montera-bilbarnstol-steg-for-steg", "bilbarnstol-plats-i-bilen"]

baltesstol-eller-balteskudde.md
lasharnast: ["bilbarnstol-fram-och-airbag", "vanliga-monteringsfel"]

basta-bilbarnstolen.md
lasharnast: ["bakatvand-bilbarnstol-vilken-ska-jag-kopa", "babyskydd-for-nyfodda"]

begagnad-bilbarnstol.md
lasharnast: ["bakatvand-bilbarnstol-vilken-ska-jag-kopa", "vanliga-monteringsfel"]

bilbarnstol-flyg-och-hyrbil.md
lasharnast: ["bilbarnstol-i-taxi", "begagnad-bilbarnstol"]

bilbarnstol-fram-och-airbag.md
lasharnast: ["bilbarnstol-plats-i-bilen", "montera-bilbarnstol-steg-for-steg"]

bilbarnstol-i-taxi.md
lasharnast: ["bilbarnstol-flyg-och-hyrbil", "baltesstol-eller-balteskudde"]

i-size-vs-vikt.md
lasharnast: ["bakatvand-bilbarnstol-vilken-ska-jag-kopa", "isofix-eller-balte"]

isofix-eller-balte.md
lasharnast: ["montera-bilbarnstol-steg-for-steg", "bilbarnstol-plats-i-bilen"]

montera-bilbarnstol-steg-for-steg.md
lasharnast: ["vanliga-monteringsfel", "bilbarnstol-plats-i-bilen"]

vanliga-monteringsfel.md
lasharnast: ["montera-bilbarnstol-steg-for-steg", "bilbarnstol-fram-och-airbag"]
```

`bilbarnstol-plats-i-bilen.md` har redan sin och lämnas orörd.

Fallbacken kan stå kvar som skyddsnät för nya artiklar, men bör då inte längre plocka "nyaste" — den kommer att göra om exakt det här nästa gång du publicerar. Säg till om du vill ha ett förslag på en stabilare fallback.

---

## E. Två guider konkurrerar om samma fråga

`montera-bilbarnstol-steg-for-steg.md` har ett avsnitt **"Var i bilen ska stolen sitta?"** (rad 31–45) som täcker mittplatsen, trepunktsbälte, framsätet och flera stolar bak. `bilbarnstol-plats-i-bilen.md` är en hel guide om precis det.

Symptomet: `isofix-eller-balte.md` och `bilbarnstol-fram-och-airbag.md` djuplänkar båda till `/guider/montera-bilbarnstol-steg-for-steg/#var-i-bilen-ska-stolen-sitta` när de vill skicka läsaren till platsfrågan — alltså till fel guide. `isofix-eller-balte.md` länkar dessutom till *båda* inom fem rader (rad 40 till plats-i-bilen, rad 44 till ankaret). De två guiderna länkar inte till varandra alls.

**Min rekommendation:** korta ned avsnittet i `montera` till ett kort stycke som pekar vidare, och låt `bilbarnstol-plats-i-bilen` äga frågan. Montera-guiden ska handla om handgreppen; platsvalet är ett eget beslut som fattas innan. Det ger också `bilbarnstol-plats-i-bilen` det den saknar mest — inlänkar.

Det är en innehållsändring och inte en ren rättelse, så jag har inte skrivit ut den. Säg till om du vill ha den som färdig sök-och-ersätt, så gör jag om avsnittet och pekar om de två ankarlänkarna.

---

## F. Form och struktur — inget som brådskar

**Källförteckningar i två format.** Åtta guider har klickbara källänkar. Fem har källorna som ren text utan länkar: `bilbarnstol-i-taxi`, `montera-bilbarnstol-steg-for-steg`, `bilbarnstol-plats-i-bilen`, `bilbarnstol-flyg-och-hyrbil`, `vanliga-monteringsfel`. På en YMYL-sajt där "källan angiven så att du kan kontrollera den själv" är ett löfte i `om.md` är det värt att jämna ut. Alla fem har källor som finns online.

**`isofix` i gemener.** `bilbarnstol-plats-i-bilen.md` skriver `isofix` genomgående (5 förekomster). Alla andra tolv guider skriver `Isofix`. Ren sök-och-ersätt.

**Kort svar-placeringen varierar.** Tio guider öppnar med `## Kort svar`. Tre lägger en scen först: `bilbarnstol-i-taxi` (3 rader), `vanliga-monteringsfel` (3 rader), `bilbarnstol-flyg-och-hyrbil` (3 rader). `babyskydd-for-nyfodda` har Kort svar först men lägger scenen efteråt. Det fungerar i alla fyra fallen, men om Kort svar ska vara ett löfte om att man får svaret direkt är det värt att bestämma sig.

**`---` efter Kort svar** finns i sex guider, saknas i sju. Kosmetiskt, men syns.

**`uppdaterad`** finns bara i `babyskydd-for-nyfodda.md`. `base.njk` hanterar det korrekt — inget fel, men de tolv andra visar bara publiceringsdatum, och flera av dem har ändrats sedan dess. Värt att sätta på de guider du faktiskt reviderat i den här omgången.

**Babyskyddets varaktighet.** "sex till nio månader" i tre guider, "knappt ett år" i `begagnad-bilbarnstol.md` rad 22. Inte fel, men olika. Låg prioritet.

---

## Länkluckor värda att fylla

Alla 13 slugs finns, inga länkar pekar fel, båda ankarlänkarna fungerar (`markdown-it-anchor` är konfigurerad i `eleventy.config.js` med egen slugify).

Inkommande löptextlänkar per guide:

```
12  bakatvand-bilbarnstol-vilken-ska-jag-kopa
 9  isofix-eller-balte
 9  vanliga-monteringsfel
 8  i-size-vs-vikt
 7  babyskydd-for-nyfodda
 7  baltesstol-eller-balteskudde
 6  begagnad-bilbarnstol
 6  bilbarnstol-fram-och-airbag
 5  montera-bilbarnstol-steg-for-steg
 3  basta-bilbarnstolen      ← varav en från startsidan
 3  bilbarnstol-plats-i-bilen
 2  bilbarnstol-i-taxi
 2  bilbarnstol-flyg-och-hyrbil
```

`basta-bilbarnstolen` är sajtens samlingssida och har två inlänkar från guider. Den nämns i `babyskydd-for-nyfodda` och `bakatvand-…` men saknas i `i-size-vs-vikt`, `baltesstol-eller-balteskudde` och `begagnad-bilbarnstol` — alla tre har naturliga ställen där läsaren undrar "vilken ska jag köpa då".

Konkret förslag, `i-size-vs-vikt.md` rad 44, sist i stycket:

**FÖRE:**

```
De flesta bakåtvända stolar på svenska marknaden tar barn upp till omkring 105 cm, vilket ungefär motsvarar fyra år — men [det finns stolar som tar barnet betydligt längre](/guider/bakatvand-bilbarnstol-vilken-ska-jag-kopa/). Därefter är nästa steg en framåtvänd [bältesstol eller bälteskudde](/guider/baltesstol-eller-balteskudde/) — fram tills barnet når 135 cm, vilket för de flesta inträffar någonstans kring 9–10 år.
```

**EFTER:**

```
De flesta bakåtvända stolar på svenska marknaden tar barn upp till omkring 105 cm, vilket ungefär motsvarar fyra år — men [det finns stolar som tar barnet betydligt längre](/guider/bakatvand-bilbarnstol-vilken-ska-jag-kopa/). Därefter är nästa steg en framåtvänd [bältesstol eller bälteskudde](/guider/baltesstol-eller-balteskudde/) — fram tills barnet når 135 cm, vilket för de flesta inträffar någonstans kring 9–10 år. Vill du ha hela kedjan och vilka stolar som gäller i varje skede finns den i [Bästa bilbarnstolen 2026](/guider/basta-bilbarnstolen/).
```

---

## Vad jag inte har rört

- Inga siffror ändrade. A1–A3 och B1–B2 är förslag som väntar på ditt godkännande.
- Tonläge och meningsbyggnad utanför de citerade raderna. Rösten är samstämmig mellan guiderna — även de tre nya låter som resten av sajten.
- `copy-granskning.md` i roten och tidigare filer i `research/`.
- Priser mot handlare. Det som är kontrollerat här är att sajten säger samma sak om sig själv, inte att 4 495 kr stämmer i butik i dag.

## Byggstatus

`npx @11ty/eleventy` skriver 21 filer utan mallfel. Passthrough-kopieringen av `_headers` ger `EPERM` i min sandlåda — det är en rättighetsgrej i mounten, inte ett projektfel, och går igenom när du kör lokalt.
