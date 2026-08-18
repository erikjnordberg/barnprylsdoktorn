# Faktakoll: bilbarnstol-pa-rea (utkast)

Granskad fil: `research/reaguiden-utkast-2026-08-17.md`
Datum: 2026-08-17

Nitton verifierbara påståenden granskade. **Två blockerar publicering**, tre bör åtgärdas,
ett är kosmetiskt. Övriga tretton är belagda mot primärkälla och kan stå som de är.

Det allvarligaste fyndet är mitt eget: prisjämförelsen i avsnittet "Ett förbehåll om
priserna" blandar ihop två olika stolsmodeller och överdriver därmed spridningen.

---

## Blockerar publicering

### F1 — Prisspridningen blandar två modeller  [BLOCKERAR]

**Fil:** `research/reaguiden-utkast-2026-08-17.md`, avsnittet "Ett förbehåll om priserna"

**FÖRE (ordagrant):**
> Hur mycket priserna rör sig är lätt att underskatta. När jag kontrollerade utbudet hos tre svenska handlare den 12 augusti 2026 kostade **samma bakåtvända stol mellan 5 895 kr och 8 999 kr samma dag** — en skillnad på drygt 3 000 kr, utan att någon kallade det rea.

**Problem:** Siffrorna kommer från prisjämförelsen i
`research/handlarjamforelse-2026-08-12.md`, men spannet blandar **Axkid ONE 3** och
**Axkid ONE+ 3**, som är två olika modeller. 5 895 kr är en ONE 3, 8 999 kr är en ONE+ 3.
Påståendet "samma bakåtvända stol" är därför inte sant, och "drygt 3 000 kr" är fel oavsett
vilken av modellerna man räknar på.

Faktiska siffror ur samma underlag, kontrollerade 2026-08-12:

| Modell | Lägst | Högst | Skillnad |
|---|---|---|---|
| Axkid ONE 3, Driftwood Beige (samma färg) | 6 395 kr | 8 499 kr | 2 104 kr |
| Axkid ONE 3, alla färger | 5 895 kr | 8 499 kr | 2 604 kr |
| Axkid ONE+ 3, alla färger | 6 695 kr | 8 999 kr | 2 304 kr |

**Källa:** `research/handlarjamforelse-2026-08-12.md`, hämtad ur Adtractions produktfeeds
2026-08-12. Egen mätning, inte publicerad tredjepartskälla — bör anges som sådan i texten.

**EFTER (förslag):**
> Hur mycket priserna rör sig är lätt att underskatta. När jag kontrollerade samma modell i samma färg hos tre svenska handlare den 12 augusti 2026 kostade den **6 395 kr hos den billigaste och 8 499 kr hos de två andra** — 2 104 kr isär, en helt vanlig onsdag, utan att någon kallade det rea.

Formuleringen "samma modell i samma färg" är vald med flit: den gör påståendet
kontrollerbart och tar bort invändningen att jämförelsen gäller olika varianter.

### F2 — Slutsatsen bygger på F1  [BLOCKERAR]

**Fil:** samma avsnitt, stycket efter

**FÖRE (ordagrant):**
> Det är själva poängen med den här sidan. Skillnaden mellan handlare en helt vanlig onsdag kan vara större än rabatten på Black Friday.

**Problem:** Påståendet är rimligt men vilar på F1:s felaktiga siffra, och andra ledet
("större än rabatten på Black Friday") jämför med en rabattnivå vi medvetet inte anger
någonstans. Vi vet inte vad rabatterna blir 2026.

**EFTER (förslag):**
> Det är själva poängen med den här sidan. Skillnaden mellan två handlare en helt vanlig onsdag kan vara i samma storleksordning som en rabatt — kontrollera aktuellt pris hos flera innan du köper, och låt inte prisskillnaden ensam avgöra vilken stol det blir.

---

## Bör åtgärdas

### F3 — Räknefel i exemplet om 30-dagarsregeln

**Fil:** avsnitt 1, "Är sänkningen ens en sänkning?"

**FÖRE (ordagrant):**
> Sänks den under rean till 5 995 kr är den verkliga rabatten 300 kr, inte 2 000 kr. Det är fortfarande en sänkning — men den är en sjättedel så stor som skylten antyder.

**Problem:** 300 kr av 2 000 kr är ungefär en sjundedel, inte en sjättedel. Kvoten är 6,67.

**EFTER (förslag):** stryk bråkdelen, låt siffrorna tala:
> Sänks den under rean till 5 995 kr är den verkliga rabatten 300 kr, inte 2 000 kr.

### F4 — Påstående om Konsumentverkets rapport saknar källa

**Fil:** avsnitt 1, sista stycket före Prisjakt-länken

**FÖRE (ordagrant):**
> Konsumentverket har efter att lagen skärptes rapporterat om fortsatta problem med hur reor marknadsförs

**Problem:** Rapporten existerar — Konsumentverket har publicerat "Ny rapport: Fortsatta
problem med reor trots ny lagstiftning" — men jag har inte öppnat den och kan därför inte
ange publiceringsdatum eller vad den faktiskt mäter. Enligt sajtens egen regel ska ett
påstående om vad en myndighet säger beläggas ordagrant.

**Åtgärd:** antingen hämta rapporten, ange årtal och lägga URL:en i källförteckningen —
eller stryka meningen. Den bär inget tungt i texten och kan strykas utan förlust.

### F5 — 125 cm-formuleringen avviker från den publicerade guiden

**Fil:** avsnitt 4, "Fällan som bara finns när det är rea"

**FÖRE (ordagrant):**
> Sedan 2017 får nya modeller av kuddar utan rygg bara godkännas för barn över 125 cm.

**Problem:** Inte fel, men komprimerat. `baltesstol-eller-balteskudde.md` skriver samma sak
mer exakt: godkännandet gäller 22–36 kg, och det är den obligatoriska **etiketten** som
anger över 125 cm. Två guider som säger samma sak olika bjuder in till drift.

**EFTER (förslag):**
> Sedan 2017 får nya modeller av kuddar utan rygg bara godkännas för de största barnen, med en obligatorisk etikett som säger att kudden bara får användas av barn längre än 125 cm.

**Anmärkning om beläggning:** själva sakuppgiften är belagd sedan tidigare i
`research/faktakoll-alla-guider-2026-08-09.md` och står i två publicerade guider. Jag har
**inte** verifierat den mot primärkälla i dag — NTF:s sida om bältesstol och bälteskudde
(hämtad 2026-08-17) tar inte upp regeländringen 2017. Den ligger i stället i den nationella
rekommendationen från 2017 (pdf), som redan står i begagnatguidens källförteckning.

---

## Kosmetiskt

### F6 — Lagen nämns i löptexten men saknas i källförteckningen

**FÖRE (ordagrant):**
> Regeln finns i prisinformationslagen och står hos Konsumentverket.

**Åtgärd:** lägg till Konsumentverkets sida om prisinformationslagen i källförteckningen,
så att läsaren kan gå från påstående till lagrum i ett steg.

---

## Belagt — kan stå som det står

| Påstående i utkastet | Klass | Källa | Hämtad |
|---|---|---|---|
| Sänkt pris ska anges mot lägsta priset de senaste 30 dagarna | LAG | Konsumentverket, Prissänkningar | 2026-08-17 |
| Rea får bara pågå begränsad tid, priset väsentligt lägre än ordinarie | LAG | Konsumentverket, Rea och nedsatt pris | 2026-08-17 |
| Fjorton dagars ångerrätt vid distansköp | LAG | Konsumentverket, Ångerrätt | 2026-08-17 |
| Dagarna räknas från dagen efter du tog emot varan | LAG | Konsumentverket, Ångerrätt | 2026-08-17 |
| Ingen ångerrätt vid köp i butik | LAG | Konsumentverket, Ångerrätt | 2026-08-17 |
| Öppet köp och bytesrätt bestämmer företagen själva | LAG | Konsumentverket, Ångerrätt | 2026-08-17 |
| Bältesstol med rygg framför kudde under 125 cm | REK | NTF, Bältesstol och bälteskudde | 2026-08-17 |
| Bältet glider av axeln vid undanmanöver på barn 105–125 cm som sitter på kudde | REK | NTF, Bältesstol och bälteskudde | 2026-08-17 |
| Folksam testade BeSafe Beyond 2025 och gav Bra val | TEST | Folksam, test 2025 | tidigare, står i två publicerade guider |
| Priserna 4 495 / 6 299 / 5 995 kr | TEST | Folksam, test 2025 | tidigare, identiska med publicerade tabeller |
| Cirka tio års livslängd, räknad från första användning, skicket avgör | REK | NTF och Folksam via `begagnad-bilbarnstol` | 2026-08-09 |
| En stol godkänd till 125 cm räcker för många barn till sex–sju år | REK | står ordagrant i två publicerade guider | 2026-08-09 |
| Black Friday 2026 infaller fredag 27 november | — | sista fredagen i november, kontrollräknat | 2026-08-17 |

**Ingen REK är formulerad som LAG i utkastet.** Den vanligaste feltypen finns alltså inte
här. Texten håller isär vad Konsumentverket kräver av handlaren och vad NTF rekommenderar
om stolsval, och den påstår ingenting om att lagen skulle säga något om rea och säkerhet.

**Inga påståenden om enskilda handlares prissättning** utöver F1, som i föreslagen
formulering inte namnger någon.

---

## Källförteckning

- [Konsumentverket — Prissänkningar, regler för företag](https://www.konsumentverket.se/marknadsratt-foretag/prissankningar-regler-for-foretag/) — hämtad 2026-08-17
- [Konsumentverket — Rea och nedsatt pris](https://www.konsumentverket.se/konsumentratt/rea-och-nedsatt-pris/) — hämtad 2026-08-17
- [Konsumentverket — Ångerrätt](https://www.konsumentverket.se/konsumentratt-process/angerratt/) — hämtad 2026-08-17, sidan granskad av Konsumentverket 2025-11-03
- [Konsumentverket — Prisinformationslagen](https://www.hallakonsument.se/lagar/prisinformationslagen/) — att lägga till i guidens källista
- [NTF — Bältesstol och bälteskudde](https://ntf.se/konsumentupplysning/barn-i-bil/baltesstol-och-balteskudde/) — hämtad 2026-08-17
- [Svenska rekommendationer för barn i bil, 2017 (pdf)](https://ntf.se/media/fnrlsogt/rek-barn-i-bil-2017.pdf) — källa till 125 cm-regeln
- [Folksam — Test av bilbarnstolar 2025](https://www.folksam.se/tester-och-goda-rad/vara-tester/bilbarnstolar)
- [VTI — Plustestade bilbarnstolar](https://www.vti.se/en/services/laboratory-and-testing/crash-safety-testing/child-restraint-systems/the-plus-test/plus-tested-models)

Inga ändringar gjorda i utkastet. Väntar på beslut.
