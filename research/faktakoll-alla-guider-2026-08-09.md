# Faktakoll — samtliga guider, 2026-08-09

Granskade: 13 guider. Verifierbara påståenden genomgångna: 94. Fynd: 11.
Blockerar publicering: 2. Bör åtgärdas: 6. Kosmetiskt: 3.

## Status 2026-08-09 — allt åtgärdat

Granskningen gjordes mot **publicerad HTML**, och live låg efter repot. Fem fynd visade sig
redan vara rättade i källan men inte synliga på sajten:

| Fynd | Status |
|---|---|
| F1 krockkuddesiffran | Redan rättad i källan — låg kvar live |
| F2 lutning för nyfödd | Redan rättad i källan — låg kvar live |
| F3 "följ inte lagen" | Rättad nu, `i-size-vs-vikt` |
| F4 Folksams betygsregel | Rättad nu, `basta-bilbarnstolen` |
| F5 obelagd 25 kg-gräns | Rättad nu, `isofix-eller-balte` |
| F6 LAG-påstående utan Transportstyrelsen | Rättad nu, `begagnad-bilbarnstol` — attribuerad till NTF respektive Folksam |
| F7 olänkade källor | Redan rättad i källan — låg kvar live |
| F8 "ungefär hälften" | Rättad nu, `vanliga-monteringsfel` |
| F9 saknad byline | Redan rättad — alla guider har `date` i frontmatter |
| F10 og:image utan version-filter | Redan rättad — `base.njk` kör filtret |
| F11 saknad rad i Plustest-tabellen | Rättad nu, `basta-bilbarnstolen` — Klippan Opti 129, Deplus (VTI-0027) tillagd |

**Den viktigaste iakttagelsen är inte något av fynden ovan.** Live låg efter `main` trots att
arbetsträdet var rent och inget var opushat. Kontrollera att Cloudflare-bygget faktiskt gick
igenom efter commit `f8ec89b` och `2a26928` — annars är det deploysteget som brister, inte
texten.

**Om FÖRE-citaten.** Granskningen är gjord mot publicerad HTML på barnprylsdoktorn.se, inte mot repot — jag har inte filåtkomst. Citaten är ordagranna från renderad sida och fungerar som sökträngar, men radnummer saknas och källfilen kan ha annan markup (t.ex. fetstil). Kontrollera träffen innan du ersätter.

**Ingen ändring är gjord.** Inga siffror rörda.

---

## Blockerar publicering

### F1 — Felciterad Folksam-siffra, andelen framför aktiv krockkudde [BLOCKERAR]

**Guide:** `vanliga-monteringsfel` — avsnittet "Två saker till, medan du ändå står där"

**FÖRE (ordagrant):**
> I Folksams kontroll satt 16 procent av barnen i framsätet framför en aktiv krockkudde, och ett av dem bakåtvänt.

**Problem:** 16 procent är andelen **av de 31 barn som satt i framsätet** — inte av alla observerade barn. I absoluta tal: fem barn av över 180 kontroller. Som meningen är skriven läser man att 16 procent av alla barn i studien satt framför en aktiv krockkudde, vilket är ungefär fem gånger för högt. Det är sajtens mest överdrivna siffra och den sitter i en guide vars hela premiss är att andra sajter slarvar med siffror.

**Källa:** [Folksam — Föräldrar i Sverige slarvar vid montering av bilbarnstolar](https://news.cision.com/se/folksam/r/foraldrar-i-sverige-slarvar-vid-montering-av-bilbarnstolar,c3636696), 2022-09-27 — hämtad 2026-08-09. Ordagrant: *"Av totalt 31 barn (under 140 cm) som satt i passagerarsätet fram, satt fem barn (16 procent) framför en aktiv krockkudde, varav ett barn (tre procent) i bakåtvänd bilbarnstol (vilket innebär en potentiell livsfara)."*

**EFTER (förslag):**
> Av de 31 barn under 140 cm som satt i framsätet i Folksams kontroll satt fem — 16 procent — framför en aktiv krockkudde, och ett av dem bakåtvänt. Det sista är direkt livsfarligt.

---

### F2 — Fel lutningssiffra för nyfödd, motsäger två andra guider [BLOCKERAR]

**Guide:** `vanliga-monteringsfel` — avsnittet "Två saker till, medan du ändå står där"

**FÖRE (ordagrant):**
> **Lutningen.** En nyfödd som sitter för upprätt kan få hakan mot bröstet och andningen begränsad. NTF anger 20–35 graders lutning som riktvärde, och de flesta stolar har en vattenpassmarkering eller en linje som ska ligga vågrätt.

**Problem:** 20–35 grader är NTF:s riktvärde för en **bakåtvänd bilbarnstol**. En nyfödd åker i **babyskydd**, där NTF anger 40–45 grader. Meningen kopplar alltså rätt siffra till fel stoltyp — och just i den situation där lutningen är en luftvägsfråga. Sajtens egna guider säger emot: `babyskydd-for-nyfodda` skriver *"ungefär 40–45 grader mot 20–35"* och `montera-bilbarnstol-steg-for-steg` skriver *"ett babyskydd får luta cirka 40–45 grader, en bakåtvänd bilbarnstol 20–35"*. Två guider mot en — den här är outlier.

**Källa:** [NTF — Babyskydd](https://ntf.se/konsumentupplysning/barn-i-bil/babyskydd/) (40–45 grader) och [NTF — Bakåtvänd bilbarnstol](https://ntf.se/konsumentupplysning/barn-i-bil/bakatvand-bilbarnstol/) (20–35 grader) — som redan är källförda i `babyskydd-for-nyfodda`.

**EFTER (förslag):**
> **Lutningen.** En nyfödd som sitter för upprätt kan få hakan mot bröstet och andningen begränsad. NTF anger 40–45 grader för babyskydd och 20–35 grader för en bakåtvänd bilbarnstol, och de flesta stolar har en vattenpassmarkering eller en linje som ska ligga vågrätt.

---

## Bör åtgärdas

### F3 — "Följ inte lagen" [BÖR ÅTGÄRDAS]

**Guide:** `i-size-vs-vikt` — punktlistan under "Kort svar"

**FÖRE (ordagrant):**
> **Men följ inte lagen — följ rekommendationen.** Trafikverket och NTF säger bakåtvänt till **minst fyra år**, gärna längre. Det är den siffra som spelar roll.

**Problem:** Sakligt är poängen rätt — lagens minimum och det säkra är olika saker — men formuleringen ställer lag och rekommendation som alternativ. Lagen är ett golv som gäller samtidigt; rekommendationen ligger ovanpå. Det här är den enda meningen på sajten som bokstavligt säger åt läsaren att inte följa lagen, och den står i en guide som säljer sig på att hålla isär de två. Ingen faktaändring behövs, bara formuleringen.

**Källa:** ingen ny källa behövs; guidens eget avsnitt "Varför rekommendationen är en helt annan siffra" säger redan rätt sak.

**EFTER (förslag):**
> **Lagen är golvet — rekommendationen är målet.** Trafikverket och NTF säger bakåtvänt till **minst fyra år**, gärna längre. Det är den siffra som spelar roll.

---

### F4 — Två olika versioner av Folksams betygsregel [BÖR ÅTGÄRDAS]

**Guider:** `bakatvand-bilbarnstol-vilken-ska-jag-kopa` och `basta-bilbarnstolen`

**FÖRE (ordagrant, bakatvand-bilbarnstol-vilken-ska-jag-kopa):**
> **en stol som tillåter framåtvänt åkande under 105 cm kan inte få Bra val.**

**FÖRE (ordagrant, basta-bilbarnstolen):**
> En stol som tillåter framåtvänt under 105 cm kan inte få deras högsta betyg.

**Problem:** "Bra val" och "högsta betyg" är inte samma sak i Folksams skala — Bra val är utmärkelsen som ges från betyg 3, högsta betyg är 4. Som det står nu säger guiderna två olika saker om samma regel. En av dem är fel, och läsaren som läser båda tappar förtroende.

**Källa:** [Folksam — Test av bilbarnstolar](https://www.folksam.se/tester-och-goda-rad/vara-tester/bilbarnstolar) — hämtad 2026-08-09. Betyg 4 = *"mer än 33 % bättre än genomsnittet"*, betyg 3 = *"Bra val, upp till 33 % bättre än genomsnittet"*.

**EFTER (förslag):** använd Bra val-formuleringen på båda ställena, och skriv i `basta-bilbarnstolen`:
> En stol som tillåter framåtvänt under 105 cm kan inte få deras utmärkelse Bra val.

---

### F5 — Obelagd viktgräns för bältesmonterade stolar [BÖR ÅTGÄRDAS]

**Guide:** `isofix-eller-balte` — avsnittet "Viktbegränsningen som ingen nämner"

**FÖRE (ordagrant):**
> Bältesmonterade stolar har ingen sådan begränsning. Där ligger gränsen oftast på 25 kg, och i R129-regelverket finns modeller upp till 36 kg.

**Problem:** 33-kilosgränsen för Isofix är belagd mot NTF och står i guidens källor. Siffran "oftast 25 kg" för bältesmonterade stolar går jag inte att härleda till någon av de tre angivna källorna — klassad OKLAR. 36 kg är belagt (Britax Römer Max-Safe Pro). Antingen belägg 25 kg eller stryk siffran; resten av meningen håller utan den.

**Källa:** 33 kg är belagt via [NTF — Köpråd och godkännanden](https://ntf.se/konsumentupplysning/barn-i-bil/koprad-och-godkannanden/). För 25 kg hittade jag inget.

**EFTER (förslag):**
> Bältesmonterade stolar har ingen sådan begränsning. Det är därför de stolar som räcker längst upp i vikt — ända till 36 kg — är bältesmonterade.

---

### F6 — LAG-påstående belagt mot NTF i stället för Transportstyrelsen [BÖR ÅTGÄRDAS]

**Guide:** `begagnad-bilbarnstol` — avsnittet "Vad som faktiskt är lagligt"

**FÖRE (ordagrant):**
> **En begagnad R44-stol är alltså fullt laglig att köpa av en privatperson och använda.**

**Problem:** Slutsatsen är sannolikt riktig — EU-regeln från 1 september 2024 gäller att släppa ut nya stolar på marknaden, inte privat andrahandshandel — men guidens källor är NTF och Folksam. Ett påstående om vad som är lagligt ska beläggas mot Transportstyrelsen eller lagtext, annars ska det attribueras i stället för att sägas rakt ut. Samma sak gäller meningen *"Vid en mindre krock i låg fart, till exempel på en parkeringsplats, behöver stolen däremot inte bytas ut om den är oskadad"*, som saknar angiven källa.

**Källa:** kräver ny uppslagning hos [Transportstyrelsen](https://www.transportstyrelsen.se/sv/vagtrafik/trafikregler-och-vagmarken/trafikregler/i-fordonet/baltesregler/). Belägg det, eller skriv om enligt nedan.

**EFTER (förslag, om belägg inte hittas):**
> **NTF:s besked är att en begagnad R44-stol är laglig att köpa av en privatperson och använda** — försäljningsstoppet gäller nya stolar i handeln.

---

### F7 — Olänkade källförteckningar [BÖR ÅTGÄRDAS]

**Guider:** `vanliga-monteringsfel` och `bilbarnstol-flyg-och-hyrbil`

**FÖRE (ordagrant, vanliga-monteringsfel):**
> - Folksam, *Föräldrar i Sverige slarvar vid montering av bilbarnstolar* — observationsstudie 2022, 180 kontroller vid 13 förskolor i Storstockholm

**Problem:** Källorna står som brödtext utan länkar, till skillnad från övriga elva guider där varje källa är klickbar. Läsaren kan inte kontrollera påståendena, och båda guiderna innehåller sajtens tyngsta statistik. Att `vanliga-monteringsfel` dessutom är den guide som har F1 och F2 gör det värre — felen hade varit lättare att upptäcka med länkar.

**EFTER (förslag, vanliga-monteringsfel):**
> - [Folksam — Föräldrar i Sverige slarvar vid montering av bilbarnstolar](https://news.cision.com/se/folksam/r/foraldrar-i-sverige-slarvar-vid-montering-av-bilbarnstolar,c3636696) — observationsstudie 2022, över 180 kontroller vid 13 förskolor i Storstockholm

Notera även "180 kontroller" → källan skriver **över** 180. `montera-bilbarnstol-steg-for-steg` har redan rätt formulering.

---

## Kosmetiskt

### F8 — "Ungefär hälften" mot källans "som mest 51 procent"

**Guide:** `vanliga-monteringsfel`

**FÖRE (ordagrant):**
> **Näst vanligaste: bältet utanpå vinterjackan.** Ungefär hälften av föräldrarna gör det, och Folksams krockprov visar att belastningen på barnet ökar.

**Problem:** Folksam skriver *"detta förekommer som mest i 51 procent av fallen"* — "som mest" är ett tak, inte ett genomsnitt. "Ungefär hälften" presenterar taket som normalvärde. Marginellt, men det är samma sorts avrundning uppåt som F1.

**Källa:** samma pressmeddelande som F1.

**EFTER (förslag):**
> **Näst vanligaste: bältet utanpå vinterjackan.** I upp till hälften av fallen, enligt Folksams kontroll — och deras krockprov visar att belastningen på barnet ökar.

---

### F9 — Saknad byline på fem guider

**Guider:** `i-size-vs-vikt`, `vanliga-monteringsfel`, `isofix-eller-balte`, `begagnad-bilbarnstol`, `bilbarnstol-flyg-och-hyrbil`

De har bara *"Senast uppdaterad <datum>"* där övriga guider har *"Av Erik Nordberg · Publicerad <datum> · Uppdaterad <datum>"*. Sidfoten på samma fem säger *"skriven av en förälder som googlade för mycket"* i stället för *"skriven av Erik Nordberg, en förälder som googlade för mycket"*, och de saknar Kontakt-länken i sidfoten.

Namngiven författare och publiceringsdatum är signaler Google väger in för YMYL-innehåll, och det här är barnsäkerhet. Värt att rätta av det skälet ensamt.

---

### F10 — Delningsbild utan version-filter

**Guider:** samma fem som i F9.

**FÖRE (ordagrant, ur renderad head):**
> `<meta property="og:image" content="https://barnprylsdoktorn.se/bilder/delningsbild.png">`

**Problem:** Övriga guider har `delningsbild.png?v=67738bac`. De fem saknar `version`-filtret, vilket bryter mot cachningsprincipen — byter du delningsbild kommer Facebook och LinkedIn att visa den gamla. Samma fem sidor som saknar byline, så det är troligen en gemensam äldre layout eller ett saknat filteranrop.

---

### F11 — Plustest-listan saknar en rad [BÖR ÅTGÄRDAS]

*Uppgraderad från "ej verifierbar" sedan VTI:s lista lästs i webbläsaren 2026-08-09.*

**Guide:** `basta-bilbarnstolen` — tabellen "Alla Plustestade stolar godkända till 125 cm"

**Verifierat:** samtliga fjorton rader stämmer. Alla VTI-nummer (VTI-0037 till VTI-0056) matchar rätt modell, och alla fjorton är godkända till 125 cm. Ingen rad är fel.

**Problem:** listan är däremot **inte komplett**, trots rubriken "Alla Plustestade stolar godkända till 125 cm". Den saknar:

| Stol | Plustest nr |
| --- | --- |
| Klippan Opti 129, Deplus | VTI-0027 |

VTI listar den som godkänd till 125 cm. Den ligger tidigare i numreringen än de övriga fjorton, vilket är en trolig förklaring till att den missats — resten är ett sammanhängande block från VTI-0037 och uppåt.

**FÖRE (ordagrant, sista raden i tabellen):**
> | Silver Cross Perform i-Size                   | VTI-0055    |

**EFTER (förslag):** lägg till raden i bokstavsordning, alltså mellan Britax och Joie:
> | Klippan Opti 129, Deplus                      | VTI-0027    |

**Källa:** [VTI — Plus Tested models](https://www.vti.se/en/services/laboratory-and-testing/crash-safety-testing/child-restraint-systems/the-plus-test/plus-tested-models) — läst i webbläsare 2026-08-09.

**Två anmärkningar till:**

- **Listan har redan rört sig.** Sedan er hämtning 7 augusti har VTI-0057 Klippan ReGo tillkommit. Den är godkänd till 105 cm och hör alltså inte hemma i er 125-tabell, men den bekräftar att listan uppdateras i den takt guiden påstår. Kvartalsvis avstämning är rimligt.
- **Stavning.** VTI skriver "Britax MaxSafe Pro" och "Maxicosi Mobifix Pro"; ni skriver "Britax Max-Safe Pro" och "Maxi-Cosi Mobifix Pro". Era stavningar följer tillverkarnas egna och Folksams test — behåll dem. Ingen åtgärd, noterat så att nästa granskning inte tar upp det igen.

---

## Verifierat och korrekt — ingen åtgärd

Genomgånget mot primärkälla och håller:

- **135 cm-regeln** och båda undantagen (tre år och uppåt vid tillfälliga korta transporter; under tre år i taxi), med villkoren om bilbälte och framsätesförbud. Korrekt återgivet i `bilbarnstol-i-taxi`, `baltesstol-eller-balteskudde`, `i-size-vs-vikt` och `bilbarnstol-plats-i-bilen`.
- **Förarens ansvar för passagerare under 15 år.** Korrekt.
- **"Korta sträckor" saknar definierad gräns.** Korrekt — och bra att guiden säger det rakt ut i stället för att gissa en siffra.
- **Bakåtvänt mot aktiv krockkudde är förbjudet i lag**, medan framåtvänt under 140 cm är starkt avrått men inte uttryckligen förbjudet. Distinktionen i `bilbarnstol-fram-och-airbag` är den skarpaste på hela sajten och stämmer.
- **140 cm-rekommendationen** och att den kommer från den nationella rekommendationen, inte från lag. Korrekt, och korrekt kontrasterad mot 135 cm i `baltesstol-eller-balteskudde`.
- **R129 kräver bakåtvänt till minst 15 månader och 76 cm.** Korrekt.
- **Försäljningsstoppet 1 september 2024** för R44, med fortsatt tillåten användning. Korrekt i tre guider.
- **125 cm-regeln för nya bälteskuddar utan ryggstöd sedan 2017**, och att äldre typgodkända modeller får fortsätta säljas. Korrekt, inklusive den svåra nyansen.
- **Folksams observationsstudie 2022:** 41 procent bältesmonterade rätt, 95 procent Isofix, över 180 kontroller, 13 förskolor i Storstockholm, vanligaste felet slaka underförankringsband (51 procent). Alla korrekta utom F1 och F8.
- **Plustestet:** 56 km/h, cirka 10 cm kortare inbromsningssträcka, mäter nackbelastning, frivilligt, ingen framåtvänd stol har klarat det, inga babyskydd på listan. Korrekt.
- **Folksams test 2025:** fem stolar testade, tre fick Bra val — Britax Römer Max-Safe Pro (betyg 4, 36 kg), BeSafe Beyond (22 kg), TinySeats Two (23 kg, ej plustestad). Alla produktnamn, betyg och viktgränser stämmer mot Folksam.
- **33-kilosgränsen** för bakåtvänd Isofix-montering. Korrekt.
- **Tioårsregeln** för livslängd, räknad från första användning. Korrekt.
- **Nio procent under 135 cm utan lämplig bilbarnstol, 33 procent av 3–4-åringar bakåtvänt.** Korrekt återgivet där det förekommer.

En sak jag noterade utan att räkna som fel: `bilbarnstol-i-taxi` skriver *"ett barn under tre år får inte färdas i en vanlig bil utan skyddsanordning, punkt"*. Det stämmer i praktiken, men det finns undantag för fordon som helt saknar bilbälten. Bara relevant om ni någon gång skriver om veteranbilar.

---

## Källförteckning

Samtliga hämtade 2026-08-09 om inget annat anges.

- [Transportstyrelsen — Bältesregler](https://www.transportstyrelsen.se/sv/vagtrafik/trafikregler-och-vagmarken/trafikregler/i-fordonet/baltesregler/)
- [Transportstyrelsen — Så skyddar du barnen: regler och tips](https://www.transportstyrelsen.se/sv/vagtrafik/trafikregler-och-vagmarken/trafikregler/i-fordonet/Sa-skyddar-du-barnen---regler-och-tips/)
- [NTF — Konsumentupplysning: Barn i bil](https://ntf.se/konsumentupplysning/barn-i-bil/)
- [NTF — Bakåtvänd bilbarnstol](https://ntf.se/konsumentupplysning/barn-i-bil/bakatvand-bilbarnstol/)
- [NTF — Babyskydd](https://ntf.se/konsumentupplysning/barn-i-bil/babyskydd/)
- [NTF — Köpråd och godkännanden](https://ntf.se/konsumentupplysning/barn-i-bil/koprad-och-godkannanden/)
- [NTF — Bilbarnstolsskola](https://ntf.se/konsumentupplysning/barn-i-bil/bilbarnstolsskola/)
- [Trafikverket — Barn som färdas i bil](https://www.trafikverket.se/resa-och-trafik/trafiksakerhet/sakerhet-pa-vag/sakerhet-i-bil/barn-i-bil/)
- [Folksam — Föräldrar i Sverige slarvar vid montering av bilbarnstolar (2022-09-27)](https://news.cision.com/se/folksam/r/foraldrar-i-sverige-slarvar-vid-montering-av-bilbarnstolar,c3636696)
- [Folksam — Test av bilbarnstolar](https://www.folksam.se/tester-och-goda-rad/vara-tester/bilbarnstolar)
- [VTI — Plus Tested models](https://www.vti.se/en/services/laboratory-and-testing/crash-safety-testing/child-restraint-systems/the-plus-test/plus-tested-models) *(läst i webbläsare — sidan är klientrenderad och går inte att hämta programmatiskt)*
