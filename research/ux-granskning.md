# UX-granskning: barnprylsdoktorn.se

**Granskat:** `src/css/style.css` (454 rader) i sin helhet, samt live-versionerna av startsidan
och `/guider/bakatvand-bilbarnstol-vilken-ska-jag-kopa/`. Kontrastvärden är beräknade, inte
uppskattade. Kolumnbredder och radlängd är uppmätta i webbläsaren. Köpblockets knapp och
annonsmärkning kunde inte granskas renderade eftersom `url` fortfarande är tom i
`produkter.js` — de fynden bygger på CSS:en och slår till i samma sekund du klistrar in
första affiliatelänken.

## Sammanfattning

Grunden är ovanligt välbyggd. Semantiken är korrekt, brödtexten ligger på 17 px med
line-height 1.75, alla bilder har alt-texter, `lang="sv"` finns, rubrikordningen är hel och
fokusmarkeringen är inte bortkommenterad. Det är fler saker rätt än på de flesta sajter jag
granskar.

Det dyraste problemet är tabellen i köpguiden. På en 360 px skärm ser läsaren kolumnerna
**Stol** och **Pris ca** — och inget mer. Betyg och Plustest, alltså de två kolumner som
bär hela rekommendationen, ligger utanför skärmen bakom en sidledsscroll som inget markerar.
Läsaren möts av en pristabell där den billigaste stolen råkar stå överst och den dyraste i
mitten, utan den information som förklarar varför. Det är den enda sida på sajten som ska
konvertera, och den visar fel halva av sitt eget argument.

Därutöver faller den dämpade textfärgen under kontrastkravet i tre sammanhang, varav ett är
annonsmärkningen i sidfoten.

## Fixa först

1. **Gör tabellen läsbar på mobil** — annars ser inte läsaren betyget, som är hela poängen med guiden.
2. **Höj kontrasten på `--text-dampad`** — påverkar tabellhuvuden, köpblockets specifikationsrad och köpblockets annonsmärkning samtidigt.
3. **Ta bort `opacity` på sidfotens finstilta text** — det är där affiliatemärkningen står, och den ligger på 3.56:1.

---

## Fynd

### 1. Tabellen döljer betyget på mobil

**Allvarlighet:** Kritisk
**Var:** `src/css/style.css` rad 218–248, tabellsektionen

Tabellen är 767 px bred. Uppmätta kolumnbredder:

| Kolumn | Bredd |
|---|---|
| Stol | 226 px |
| Pris ca | 85 px |
| Längd/vikt | 181 px |
| Montering | 108 px |
| Plustest | 95 px |
| Betyg | 72 px |

På en 360 px skärm är innehållsytan 312 px efter sidmarginalerna. Läsaren ser alltså **Stol
och Pris ca**, sedan tar skärmen slut. `main table { display: block; overflow-x: auto }`
gör att resten går att nå — men ingenting talar om att det finns mer, och `white-space:
nowrap` på både `td` och `th` gör att tabellen aldrig kan krympa.

Konsekvensen: en förälder som scrollar förbi ser tre stolar och tre priser. Hon får
intrycket att guiden rangordnar efter pris, och missar att den billigaste också är den enda
med betyg 4. Argumentet som gör guiden trovärdig når aldrig fram.

**Fix.** Låt tabellen bli en kortlista på mobil i stället för en scrollyta. Det kräver
`data-etikett` på varje `td` i markdownen, vilket är omständligt — så gör i stället det
enklare som löser 80 procent: släpp `nowrap`, låt kolumnerna brytas, och markera att det
går att scrolla.

```css
@media (max-width: 44rem) {
  main table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    /* Skugga i högerkanten som försvinner när man scrollat klart —
       den enda affordansen som fungerar utan att ta plats. */
    background:
      linear-gradient(to right, var(--papper) 30%, rgba(255,255,255,0)) left center,
      linear-gradient(to left, var(--papper) 30%, rgba(255,255,255,0)) right center,
      radial-gradient(farthest-side at 0 50%, rgba(24,22,20,0.15), rgba(0,0,0,0)) left center,
      radial-gradient(farthest-side at 100% 50%, rgba(24,22,20,0.15), rgba(0,0,0,0)) right center;
    background-repeat: no-repeat;
    background-size: 3rem 100%, 3rem 100%, 1rem 100%, 1rem 100%;
    background-attachment: local, local, scroll, scroll;
  }

  /* Låt cellerna brytas så att tabellen krymper i stället för att svälla */
  main table td,
  main table th { white-space: normal; }
  main table td:first-child { min-width: 8rem; }

  /* Minska den fasta bredden på den bredaste kolumnen */
  main table { font-size: 0.85rem; }
  main table th,
  main table td { padding: 0.6rem 0.6rem; }
}
```

Överväg dessutom att flytta **Betyg** till andra kolumnen i markdownen, direkt efter
stolens namn. Det är den kolumn läsaren är där för, och den kostar 72 px.

---

### 2. Annonsmärkningen i sidfoten ligger på 3.56:1

**Allvarlighet:** Hög
**Var:** `src/css/style.css` rad 444, `.finstilt`

```css
.finstilt { font-size: 0.8rem; opacity: 0.85; }
```

`--text-dampad` (#78726a) på vitt ger 4.76:1, vilket klarar kravet. Men `opacity: 0.85`
blandar färgen mot bakgrunden till effektiva #8c8780, och då faller kontrasten till
**3.56:1** — under kravet på 4.5:1 för brödtext. Texten är dessutom 0.8rem, alltså cirka
13 px.

Det här är texten som säger "Vissa länkar är affiliatelänkar". Att göra just den svårast
att läsa på hela sajten är ett dåligt utbyte: den ska vara diskret, inte otydlig.
Marknadsföringslagen kräver att reklam går att känna igen som reklam, och en märkning som
inte når kontrastkravet är svår att försvara som tydlig.

**Fix:**

```css
.finstilt {
  font-size: 0.82rem;
  /* Ingen opacity — dämpa med färgen i stället, så kontrasten går att räkna på */
  color: var(--text-dampad);
}
```

---

### 3. `--text-dampad` klarar inte kravet mot `--papper-tint`

**Allvarlighet:** Hög
**Var:** `src/css/style.css` rad 232–241 (`th`), rad 388–392 (`.kopblock-spec`), rad 401–406 (`.kopblock-markning`)

`--text-dampad` (#78726a) mot `--papper-tint` (#F7F5F2) ger **4.37:1**. Kravet för brödtext
är 4.5:1. Marginellt underkänt, men det drabbar tre ställen samtidigt — och två av dem
sitter i köpblocket.

Värst är `th`: 0.68rem motsvarar cirka 11 px, versalt och med 0.08em teckenavstånd. Liten
text i låg kontrast är den kombination som är svårast att läsa i solljus, vilket är precis
den situation en förälder på en butiksparkering befinner sig i.

`.kopblock-markning` är annonsmärkningen. Samma resonemang som fynd 2 gäller där.

**Fix.** Mörka den dämpade tonen ett snäpp. #6b6459 ger 5.37:1 mot tinten och 5.85:1 mot
vitt, och skillnaden syns knappt i normal läsning:

```css
:root {
  --text-dampad: #6b6459;
}

th {
  font-size: 0.72rem;   /* från 0.68rem — cirka 11.5 px i stället för 10.9 */
}
```

Ändringen är global och förbättrar även datumraden och artikellistans ingresser.

---

### 4. Köpblocket ligger för långt från beslutet

**Allvarlighet:** Hög
**Var:** `src/artiklar/bakatvand-bilbarnstol-vilken-ska-jag-kopa.md`

Guiden är 1 225 ord. Rekommendationen levereras redan i **Kort svar** högst upp: "Vill du
inte tänka mer: ta Britax Römer Max-Safe Pro." Köpblocket för den stolen sitter i
produktavsnittet en bra bit längre ned.

En läsare som accepterar rekommendationen direkt — vilket är hela idén med formatet Kort
svar — har inget att klicka på när hon är som mest övertygad. Hon måste scrolla förbi
motiveringar hon redan bestämt sig för att inte behöva läsa.

**Fix:** lägg ett köpblock direkt efter punktlistan i Kort svar, för den primära
rekommendationen. Behåll blocken i produktavsnitten. Att samma produkt förekommer två
gånger är inte ett problem — det är standard i den här typen av guide, och de tjänar olika
läsare.

Detta är en ändring i artikeln, inte i CSS:en.

---

### 5. Ingen scrollindikator gör att tabellen ser avslutad ut

**Allvarlighet:** Medel
**Var:** samma som fynd 1

Utan skugga eller annan markering ser tabellen komplett ut. Läsaren vet inte att det finns
mer. Detta löses av CSS-fixen i fynd 1 och nämns separat bara för att det är den
underliggande orsaken till varför fynd 1 blir kritiskt i stället för irriterande.

---

### 6. Radlängden är 80 tecken på desktop

**Allvarlighet:** Medel
**Var:** `src/css/style.css` rad 68, `--max-text: 42rem`

Uppmätt: 624 px radbredd vid 17 px, vilket ger cirka **80 tecken per rad**. Rekommenderat
intervall för löpande text är 60–75. Det är inte dramatiskt, men i långa guider på 1 200
ord ökar risken att ögat tappar raden vid radbyte.

Mobilen berörs inte — där styr skärmbredden.

**Fix:**

```css
:root {
  --max-text: 38rem;   /* cirka 70 tecken vid 17 px */
}
```

Notera att `--max-text` även styr sidfoten och `main`. Kontrollera att startsidans
produktkortsgrid fortfarande andas efter ändringen — den ligger på `--max-bred` och ska
inte påverkas, men det är värt en blick.

---

### 7. Tabellens desktop-utfall kan spilla utanför

**Allvarlighet:** Låg
**Var:** `src/css/style.css` rad 231–233

```css
@media (min-width: 52rem) {
  main table { width: calc(100% + 9rem); margin-left: -4.5rem; }
}
```

Tabellen bryter ut ur textspalten på breda skärmar, vilket är ett fint redaktionellt grepp.
Men om du sänker `--max-text` enligt fynd 6 blir utfallet relativt sett större. Vid 52 rem
skärmbredd exakt är `--max-text` plus 9 rem nära skärmkanten.

**Fix:** höj brytpunkten så att utfallet bara sker när det finns marginal:

```css
@media (min-width: 58rem) {
  main table { width: calc(100% + 9rem); margin-left: -4.5rem; }
}
```

---

### 8. Köpknappen är full bredd bara under 34 rem

**Allvarlighet:** Låg
**Var:** `src/css/style.css` rad 408–428

```css
@media (min-width: 34rem) {
  .kopblock-knapp { display: inline-flex; }
}
```

34 rem är 544 px. Mellan 544 och cirka 700 px — stora telefoner i liggande läge, mindre
surfplattor — blir knappen plötsligt smal och vänsterställd i ett block som är brett. Den
tappar då sin tyngd som primär åtgärd.

**Fix:** flytta brytpunkten uppåt så att knappen förblir full bredd på allt som är en
telefon:

```css
@media (min-width: 44rem) {
  .kopblock-knapp { display: inline-flex; }
}
```

Smak snarare än fakta, men full bredd på pekskärm är sällan fel.

---

## Det som redan fungerar

- **Semantik och tillgänglighetsgrund.** `lang="sv"`, en `<h1>`, ingen lucka i rubrikordningen, samtliga fyra landmärken på plats, alt-texter på alla bilder, inga länkar som heter "läs mer". Det är ovanligt.
- **Fokusmarkering finns.** `a:focus-visible` har både `outline` och `outline-offset`. Produktkorten släcker sin egen markering men fångar upp den med `:focus-within` på föräldern — genomtänkt, inte slarv.
- **Brödtexten.** 17 px med line-height 1.75 är i överkant på ett bra sätt för långa texter. Rör den inte.
- **Knappens kontrast.** Vitt på `--accent` ger 4.79:1 och klarar kravet. Accentfärgen som länkfärg på vitt ligger på samma värde.
- **Datum på guiderna.** "Senast uppdaterad" syns direkt under ingressen. På säkerhetsråd är det en förtroendesignal som de flesta sajter glömmer.
