# Faktakoll — vinterklader-bilbarnstol, 2026-08-10

Granskad fil: `src/artiklar/vinterklader-bilbarnstol.md` (opublicerad, 1061 ord)

**16 verifierbara påståenden granskade. Inget blockerar publicering.** Samtliga siffror från
Folksams krockprov är belagda ordagrant mot primärkällan. Fem fynd rör formuleringar som
sträcker sig längre än källan gör — de bör åtgärdas, men ingen siffra är fel.

Ingen LAG-klassad utsaga förekommer i texten. Guiden gör inga anspråk på vad lagen kräver,
vilket är rätt: det finns inget lagkrav om klädsel i bilbarnstol. Risken för den vanligaste
feltypen — REK skriven som LAG — är därmed inte aktuell här.

---

## Verifierat och korrekt

| Påstående | Klass | Status |
|---|---|---|
| NTF avråder från tjocka kläder oavsett riktning | REK | Belagt, attribuerat |
| 14 % ökad nackkraft | TEST | Belagt ordagrant |
| 62 % förhöjd acceleration i bröstkorgen | TEST | Belagt ordagrant |
| 26 % större acceleration i huvudet | TEST | Belagt ordagrant |
| 50 km/h, docka motsvarande sexåring | TEST | Belagt ordagrant |
| Krocksläde på VTI i Linköping | TEST | Belagt ordagrant |
| Extra bältesutdrag 8 cm (bröstbälte) | TEST | Belagt ordagrant |
| Extra bältesutdrag 10 cm (midjebälte) | TEST | Belagt ordagrant |
| Underglidning, midjebältet upp mot magen | TEST | Belagt ordagrant |
| Krockdockor saknar bukmätning | TEST | Belagt ordagrant |
| Slackmängden vald utifrån verkliga studier | TEST | Belagt ordagrant |
| 126 mm marginal i referensprovet | TEST | Belagt ordagrant |
| Barn efterdrar sällan bältet | TEST | Belagt, Ydenius-citat |

Testår 2016 anges i texten och stämmer mot pressmeddelandets datum, 23 februari 2016.

---

## Bör åtgärdas

### F1 — Tolkning som källan inte gör

**Fil:** `src/artiklar/vinterklader-bilbarnstol.md`, rad 47

**FÖRE (ordagrant):**
> Med löst bröstbälte kom huvudet ungefär tre centimeter närmare — tre centimeter närmare framsätet, alltså.

**Problem:** Folksam mäter mot en *begränsningslinje* i provuppställningen, alltså den
gräns för framkast som används i godkännandeprov. Det är inte samma sak som avståndet till
framsätet i en verklig bil. Siffran är rätt, tolkningen är påhittad av mig.

**Källa:** [Folksam — Krocktest med vinterkläder](https://www.folksam.se/forsakringar/barnforsakring/krocktest-med-vinterklader) — hämtad 2026-08-10: "I referenstestet var det 126 mm mellan dockans huvud och begränsningslinjen. I testet med löst bröstbälte (4071) kom dockans huvud ca 3 cm närmare begränsningslinjen."

**EFTER (förslag):**
> Med löst bröstbälte kom huvudet ungefär tre centimeter närmare den gränsen.

---

### F2 — NTF tillskrivs ett råd de inte formulerar

**Fil:** `src/artiklar/vinterklader-bilbarnstol.md`, rad 63

**FÖRE (ordagrant):**
> 1. **Av med overallen helt.** Spänn fast, lägg overallen eller en filt över det spända bältet. Detta är NTF:s eget förslag och det som fungerar bäst.

**Problem:** NTF säger "lägg en filt över barnet" och "knäpp upp overall/jacka". De skriver
inte "ta av overallen helt". Rådet är rimligt och följer av deras resonemang, men det är
inte deras formulering och ska inte presenteras som deras.

**Källa:** [NTF — Övriga frågor om barn i bil](https://ntf.se/fragor-och-svar/barn-i-bil/ovriga-fragor/) — hämtad 2026-08-10: "Är det kallt i bilen kan ni lägga en filt över barnet, eller knäppa upp overall/jacka och se till att bältet sitter riktigt över axlar och midja."

**EFTER (förslag):**
> 1. **Av med overallen helt.** Spänn fast, lägg overallen eller en filt över det spända bältet. NTF:s eget råd är att lägga en filt över barnet när det är kallt i bilen — det här är samma sak, en handgrepp längre.

---

### F3 — Obelagt påstående om tillbehör och typgodkännande

**Fil:** `src/artiklar/vinterklader-bilbarnstol.md`, rad 71

**FÖRE (ordagrant):**
> Men det är stolens manual som avgör vilka tillbehör som är godkända till just den stolen — ett inlägg som följde med stolen är testat med den, ett du köpt löst är det inte.

**Problem:** Andra ledet är sannolikt korrekt — tillbehör som ingår vid typgodkännandet
provas med stolen — men jag har inte belagt det mot Transportstyrelsen, NTF eller
regelverkstexten. Det står som ett faktapåstående om godkännanden utan källa.

**Källa:** Saknas. NTF:s FAQ om babyskydd och om godkännanden berör inte åkpåsar eller
lösa inlägg.

**EFTER (förslag), om det inte beläggs:**
> Men det är stolens manual som avgör vilka tillbehör som får användas till just den stolen. Står tillbehöret inte i manualen är det inte provat tillsammans med stolen, och då vet varken du eller tillverkaren hur det beter sig i en krock.

**Alternativ:** stryk meningen och behåll bara principen i stycket före och efter. Den
bär avsnittet på egen hand.

---

### F4 — Resonemang om overall och sittställning saknar källa

**Fil:** `src/artiklar/vinterklader-bilbarnstol.md`, rad 57

**FÖRE (ordagrant):**
> För de allra minsta finns dessutom ett skäl till: en overall bygger på ryggen och kan ändra hur barnet sitter i skalet. Sitter babyskyddet redan på gränsen till för upprätt är det inte den variabeln du vill lägga till.

**Problem:** Rimligt, och konsekvent med lutningsintervallen som redan är belagda i
`babyskydd-for-nyfodda` (40–45° respektive 20–35°). Men själva kopplingen — att en overall
mätbart ändrar vinkeln — har jag inte belagt. Det är slutledning, inte källa.

**Källa:** Saknas för kopplingen. Lutningsintervallen i sig är belagda mot NTF sedan
tidigare, se `research/faktakoll-2026-08-09.md`.

**EFTER (förslag):**
> För de allra minsta är det dessutom värt att tänka på att en overall bygger på ryggen. Hur mycket det påverkar vinkeln i skalet har jag inte sett mätt någonstans — men lutningen är kritisk för en nyfödd, och det är ingen bra plats att gissa på.

---

## Kosmetiskt

### F5 — "ca" har fallit bort

**Fil:** `src/artiklar/vinterklader-bilbarnstol.md`, rad 17 och rad 39

**FÖRE (ordagrant), rad 17:**
> Dockan hann fortsätta i krockhastighet ytterligare 15–20 millisekunder innan bältet tog emot

**FÖRE (ordagrant), rad 39:**
> I Folksams prov fortsatte dockan i krockhastighet ytterligare 15–20 millisekunder innan bältet började bromsa.

**Problem:** Folksam skriver "ca 15-20 ms". Intervallet är alltså redan ungefärligt hos
källan, och vi presenterar det som exakt.

**Källa:** [Folksam — Krocktest med vinterkläder](https://www.folksam.se/forsakringar/barnforsakring/krocktest-med-vinterklader) — hämtad 2026-08-10: "Dockan fortsätter i krockhastigheten något längre tid (ca 15-20 ms) innan kroppen börjar bromsas av bältet."

**EFTER (förslag):** lägg till "ungefär" på båda ställena.

---

### F6 — Karakterisering av Folksams prioritering

**Fil:** `src/artiklar/vinterklader-bilbarnstol.md`, rad 68

**FÖRE (ordagrant):**
> Ett barn i bältesstol som spänner fast sig själv är den grupp Folksam oroar sig mest för

**Problem:** Folksam rangordnar inte sina farhågor. Ydenius säger att barn över fyra år i
större utsträckning tar på sig bältet själva och att det är därför föräldrar bör fortsätta
kontrollera — inte att gruppen oroar dem mest.

**EFTER (förslag):**
> Ett barn i bältesstol som spänner fast sig själv är den situation Folksam särskilt lyfter

---

## Avgränsning som texten hanterar rätt

Guiden är tydlig med att Folksams siffror gäller ett framåtvänt barn i bältesstol med
bilens bälte, och att de inte automatiskt gäller ett babyskydd med internsele. Det är
korrekt och viktigt — Folksam avfärdar uttryckligen det amerikanska KidsAndCars-testet som
irrelevant för svenska förhållanden just för att det gällde internbälte. Att i stället luta
babyskyddsdelen mot NTF:s råd, som uttryckligen täcker båda riktningarna, är rätt lösning.

## Källförteckning

- [Folksam — Krocktest med vinterkläder](https://www.folksam.se/forsakringar/barnforsakring/krocktest-med-vinterklader) — hämtad 2026-08-10
- [Folksam — Tjocka kläder kan försämra barnens säkerhet i bilen](https://news.cision.com/se/folksamgruppen/r/tjocka-klader-kan-forsamra-barnens-sakerhet-i-bilen,c9920739) — pressmeddelande 2016-02-23, hämtad 2026-08-10
- [NTF — Övriga frågor om barn i bil](https://ntf.se/fragor-och-svar/barn-i-bil/ovriga-fragor/) — hämtad 2026-08-10
- [NTF — Vanliga frågor om babyskydd](https://ntf.se/fragor-och-svar/barn-i-bil/babyskydd/) — hämtad 2026-08-10, innehåller inget om åkpåsar eller lösa inlägg
