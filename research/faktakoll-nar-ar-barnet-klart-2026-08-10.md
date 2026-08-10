# Faktakoll — nar-ar-barnet-klart-med-bilbarnstol, 2026-08-10

Granskad fil: `src/artiklar/nar-ar-barnet-klart-med-bilbarnstol.md` (opublicerad, 1190 ord)

**14 verifierbara påståenden granskade. Ett blockerar publicering.**

Blockeraren är en utsaga om vad lagen innehåller, och den är fel. De tre övriga fynden är
obelagda resonemang som bör mjukas upp eller beläggas.

---

## Blockerar publicering

### F1 — Felaktigt påstående om lagens innehåll  [BLOCKERAR]

**Fil:** `src/artiklar/nar-ar-barnet-klart-med-bilbarnstol.md`, rad 25

**FÖRE (ordagrant):**
> Det står i trafikförordningen och det är hela lagkravet — det finns ingen åldersgräns i lagen, bara en längdgräns.

**Problem:** Andra ledet stämmer inte. Kravet på att *använda* skyddsanordning är mycket
riktigt knutet till längd, men trafikförordningen innehåller **också** en åldersgräns:
undantagsreglerna för fordon som saknar skyddsanordning skiljer på barn under respektive
över tre år, och taxiundantaget är formulerat efter ålder. Att skriva att lagen saknar
åldersgräns är alltså direkt felaktigt, och det är extra olyckligt i en guide vars hela
poäng är att hålla isär lag och rekommendation.

**Källa:** [Transportstyrelsen — Så skyddar du barnen](https://www.transportstyrelsen.se/sv/vagtrafik/trafikregler-och-vagmarken/trafikregler/i-fordonet/Sa-skyddar-du-barnen---regler-och-tips/) — hämtad 2026-08-10: "Barn som är tre år eller äldre och kortare än 135 centimeter får inte åka i ett fordon där det inte finns möjlighet att använda en särskild skyddsanordning för barn. Vid tillfälliga transporter under korta sträckor är det dock tillåtet. […] Barn som är yngre än tre år får inte åka i fordon där det inte finns möjlighet att använda en särskild skyddsanordning för barn."

**EFTER (förslag):**
> Det står i trafikförordningen, och kravet är knutet till längd — inte till ålder. Ålder förekommer på andra ställen i regelverket, bland annat i undantagen för fordon som saknar skyddsanordning, men själva gränsen för när skyddet får tas bort är ett mått i centimeter.

---

## Bör åtgärdas

### F2 — Obelagd uppgift om när barn når 135 cm

**Fil:** `src/artiklar/nar-ar-barnet-klart-med-bilbarnstol.md`, rad 31

**FÖRE (ordagrant):**
> För de flesta barn ligger 135 cm någonstans kring nio–tio år.

**Problem:** Rimligt mot svenska tillväxtkurvor, men jag har inte belagt det mot någon
källa. Siffran styr dessutom läsarens förväntan på hur långt gapet mellan lag och
rekommendation är, så den är inte oskyldig.

**Källa:** Saknas. Varken Transportstyrelsen eller NTF anger någon ålder för 135 cm.

**EFTER (förslag):**
> De flesta barn passerar 135 cm någon gång under lågstadiets sista år eller mellanstadiets första — men spridningen är stor, och det är därför lagen mäter i centimeter och inte i år.

---

### F3 — Anatomisk förklaring utan källa

**Fil:** `src/artiklar/nar-ar-barnet-klart-med-bilbarnstol.md`, rad 39

**FÖRE (ordagrant):**
> Hos ett barn är de kanterna ännu inte utvecklade — det finns helt enkelt ingen form för bältet att fastna i.

**Problem:** Förklaringen är gängse i facklitteraturen och står redan i
`baltesstol-eller-balteskudde` i snarlik form, men den är inte belagd mot någon av våra
fyra godkända källor. NTF säger bara att kroppen "inte är tillräckligt utvecklad för att
hålla bilbältet på plats".

**Källa:** [NTF — Vanliga frågor om bältesstolar och bälteskuddar](https://ntf.se/fragor-och-svar/barn-i-bil/baltesstolar-kuddar/) — hämtad 2026-08-10: "Innan dess är barnets kropp inte tillräckligt utvecklad för att hålla bilbältet på plats utan bältesstol eller bälteskudde."

**EFTER (förslag):**
> Hos ett barn är höftbenets kanter ännu inte färdigformade. NTF uttrycker det som att kroppen inte är tillräckligt utvecklad för att hålla bilbältet på plats — i praktiken finns det ingen form för bältet att fastna i.

**Notera:** samma formulering finns i `baltesstol-eller-balteskudde` rad 76 ("barnets
höftkammar får sin kantiga, vuxna form först i puberteten"). Beläggs den ena bör den andra
justeras samtidigt, annars säger sajten samma obelagda sak på två ställen.

---

### F4 — Fyrapunktskontrollen är vår egen konstruktion

**Fil:** `src/artiklar/nar-ar-barnet-klart-med-bilbarnstol.md`, rad 45–52

**Problem:** Inget fel — texten säger uttryckligen att det inte finns någon officiell
svensk test och att punkterna är kriterierna översatta till något läsaren kan titta efter.
Det är rätt hanterat, och det är den mest användbara delen av guiden. Men det är sajtens
enda kontrollista utan myndighetsstöd, och det bör du känna till innan den publiceras.

Punkt 1–3 följer direkt av NTF:s och Transportstyrelsens beskrivning av hur bältet ska
ligga. Punkt 4 ("barnet kan sitta så hela resan") är helt vår egen.

**Åtgärd:** ingen nödvändig. Behåll brasklappen ordagrant — den är det som gör avsnittet
publicerbart.

---

## Kosmetiskt

### F5 — Ansvarsfrågan kan beläggas hårdare

**Fil:** `src/artiklar/nar-ar-barnet-klart-med-bilbarnstol.md`, rad 70

**FÖRE (ordagrant):**
> Det gäller alltså även när det är någon annans barn i din bil, och även när barnet är i den ålder då det spänner fast sig självt.

**Problem:** Slutsatsen är rimlig men står som vår tolkning. Den går att belägga bättre:
Folksam skriver rakt ut att föraren enligt lag ansvarar för att barn upp till 15 år
använder bälte, vilket är precis den poäng stycket vill göra.

**Källa:** [Folksam — Tjocka kläder kan försämra barnens säkerhet i bilen](https://news.cision.com/se/folksamgruppen/r/tjocka-klader-kan-forsamra-barnens-sakerhet-i-bilen,c9920739) — hämtad 2026-08-10: "Enligt lag har föraren ansvar för att barn upp till 15 år använder bälte."

**EFTER (förslag):**
> Ansvaret följer föraren, inte föräldraskapet: Folksam formulerar det som att föraren enligt lag ansvarar för att barn upp till 15 år använder bälte. Det gäller alltså även någon annans barn i din bil, och även när barnet är i den ålder då det spänner fast sig självt.

---

## Verifierat och korrekt

| Påstående | Klass | Status |
|---|---|---|
| Barn under 135 cm ska använda särskild skyddsanordning | LAG | Belagt, Transportstyrelsen och NTF |
| Över 135 cm får barnet sitta direkt på sätet | LAG | Belagt ordagrant, NTF |
| Läkare och forskare rekommenderar bältesstol till 10–12 år | REK | Belagt ordagrant, attribuerat |
| NTF ger samma rekommendation | REK | Belagt ordagrant |
| 140 cm framför inkopplad krockkudde | REK | Belagt ordagrant, Transportstyrelsen |
| Krockdockor saknar mätning i buken | TEST | Belagt ordagrant, Folksam |
| Bältet dras lika på barn som vuxna, höftdelen mot låren | REK | Belagt ordagrant, NTF |
| Barn får aldrig sitta i knät under färd | REK | Belagt ordagrant, NTF |
| Den vuxne ansvarar för att barnen använder skydd | LAG | Belagt, Transportstyrelsen |

Ingen REK är formulerad som LAG, och guidens bärande poäng — att de två gränserna svarar på
olika frågor — är korrekt återgiven.

---

## Sidofynd: de två öppna punkterna i begagnatguiden kan stängas

Transportstyrelsens sida som hämtades för den här granskningen innehåller ordagrant båda de
påståenden som står som obelagda i `research/faktakoll-2026-08-09.md`:

> Försäkra dig om att babyskyddet, bilbarnstolen eller bälteskudden är Europagodkänd och
> E-märkt enligt EG-direktiv eller ECE-reglemente 44-03 eller senare version.
> **Godkännandenumret ska börja med siffrorna 03 eller 04.**

> **Enbart T-märkta bilbarnstolar får inte användas efter den 9 maj 2008.** (Vissa
> bakåtvända bilbarnstolar har dubbelmärkning, det vill säga både E och T.)

Källa: [Transportstyrelsen — Så skyddar du barnen](https://www.transportstyrelsen.se/sv/vagtrafik/trafikregler-och-vagmarken/trafikregler/i-fordonet/Sa-skyddar-du-barnen---regler-och-tips/), sidan senast uppdaterad 2025-04-17, hämtad 2026-08-10.

Punkt 3 i nästa steg i `CLAUDE.md` kan alltså stängas utan ytterligare efterforskning — det
som återstår är att lägga in beläggen i begagnatguidens källförteckning.

## Källförteckning

- [Transportstyrelsen — Så skyddar du barnen: regler och tips](https://www.transportstyrelsen.se/sv/vagtrafik/trafikregler-och-vagmarken/trafikregler/i-fordonet/Sa-skyddar-du-barnen---regler-och-tips/) — sidan senast uppdaterad 2025-04-17, hämtad 2026-08-10
- [NTF — Vanliga frågor om bältesstolar och bälteskuddar](https://ntf.se/fragor-och-svar/barn-i-bil/baltesstolar-kuddar/) — hämtad 2026-08-10
- [NTF — Övriga frågor om barn i bil](https://ntf.se/fragor-och-svar/barn-i-bil/ovriga-fragor/) — hämtad 2026-08-10
- [Folksam — Tjocka kläder kan försämra barnens säkerhet i bilen](https://news.cision.com/se/folksamgruppen/r/tjocka-klader-kan-forsamra-barnens-sakerhet-i-bilen,c9920739) — hämtad 2026-08-10
