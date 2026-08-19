# UX-granskning: barnprylsdoktorn.se — 2026-08-19

Lägg den här filen i `research/` när bryggan är uppe igen.

**Granskat:** `src/_includes/base.njk`, hela `src/css/style.css` (749 rader), `src/index.md`,
`src/guider.njk`, `src/om.md`, `src/vilken-bilbarnstol.njk`, samt renderad HTML i `_site/`
för startsidan, `basta-bilbarnstolen`, väljaren och plustestlistan. Kontrastvärden är
uträknade mot CSS:ens faktiska variabler, inte uppskattade.

**Vad jag inte kunde se:** Chrome-verktygets fönsterändring slog inte igenom på renderad
viewport, så jag har inte sett sajten i en riktig 390 px-vy. Mobilbedömningen nedan bygger
på CSS:en och på var brytpunkterna faktiskt går. Fynd 3 är räknat, inte sett.

**Inga säkerhetssiffror är granskade eller föreslagna för ändring.** Rapporten rör enbart
form, navigation och tillgänglighet.

## Sammanfattning

Sajten är ovanligt välbyggd för sin ålder. Tillgänglighet är uppenbart påtänkt — 44 px
klickytor, fokusmarkeringar, inga `opacity`-dämpningar, kontrastvärden uträknade och
kommenterade i koden. Det är hantverk över genomsnittet, och det märks.

Det dyraste problemet är inte estetiskt utan strukturellt: **sajtens två starkaste sidor,
väljaren och plustestlistan, finns varken i menyn eller i sidfoten.** De är de enda
tillgångar som är unika i nischen, de är det outreach-arbetet pitchar, och de går bara att
nå om den guide läsaren råkade landa på länkar dit i löptexten. Tio av sexton guider gör
det inte.

Därutöver finns en kontrastmiss som är extra irriterande eftersom fixen redan står i
koden — men bara på ett av tre ställen där den behövs.

## Fixa först

1. **Lägg väljaren i menyn och båda tillgångarna i sidfoten.** Tio guider är i dag
   återvändsgränder mot sajtens bästa sidor.
2. **Höj länkfärgen på papper-tint till `--accent-mork`.** 4.41:1 är under kravet, och det
   drabbar länken i varje köpblock och i väljarens svar.
3. **Flytta tabellernas scroll-brytpunkt från 44 till 52 rem.** Mellan de två värdena kan
   en bred tabell spränga sidbredden i stället för att scrolla.

---

## Fynd

### 1. Länkar på papper-tint klarar inte kontrastkravet

**Allvarlighet:** Hög
**Var:** `src/css/style.css` — `main a` i kombination med `.kopblock` och `.valjare-svar`

`--accent` (#B5581F) mot `--papper-tint` (#F7F5F2) ger **4.41:1**. Kravet för brödtext är
4.5:1. Det gäller två platser som båda är av de viktigaste på sajten:

- **Köpblocket.** Varje köpblock med affiliatelänk innehåller `<a href="/sa-tjanar-sajten-pengar/">`
  i `.kopblock-markning`, satt i 0.875rem. Sex förekomster i tre guider.
- **Väljarens svar.** `.valjare-lankar a` ligger på `.valjare-svar`, som har papper-tint som
  bakgrund. Vikten 650 räcker inte för att kvalificera som stor text — det kräver minst
  18.66 px fet.

Konsekvensen är att den läsare som har svårt med kontrast tappar just de länkar som leder
vidare, på just de element sajten tjänar pengar på.

Det som gör fyndet lite pinsamt är att fixen redan finns. Raden ovanför `.annonsnotis a`
säger ordagrant: `/* --accent klarar bara 4.41:1 mot papper-tint — mörka varianten ger 6.66:1 */`.
Slutsatsen drogs, men bara för ett av tre element med samma bakgrund.

**Fix** — lägg direkt efter den befintliga `.annonsnotis a`-regeln:

```css
/* Samma problem som .annonsnotis: allt som ligger på --papper-tint behöver
   --accent-mork för att nå 4.5:1. --accent ger 4.41:1, --accent-mork ger 6.66:1. */
.kopblock a:not(.kopblock-knapp),
.valjare-svar a {
  color: var(--accent-mork);
  text-decoration-color: rgba(138, 67, 23, 0.4);
}

.kopblock a:not(.kopblock-knapp):hover,
.valjare-svar a:hover {
  text-decoration-color: var(--accent-mork);
}
```

### 2. Väljaren och plustestlistan finns varken i menyn eller i sidfoten

**Allvarlighet:** Hög
**Var:** `src/_includes/base.njk` — `.navbar` och `.sidfot`

Menyn är Hem, Guider, Om. Sidfoten är Guider, Om sajten, Kontakt, Så tjänar sajten pengar,
RSS. `/vilken-bilbarnstol/` och `/plustestade-bilbarnstolar/` saknas i båda.

Sex av sexton guider länkar till väljaren i löptexten och sju till plustestlistan. Resten
gör det inte. En läsare som kommer från Google till en av de tio övriga har alltså ingen
väg alls till sajtens två unika tillgångar — de sidor som hela länkstrategin bygger på och
som är det enda den här sajten har som konkurrenterna saknar.

Det är också ett konverteringsproblem i den enkla meningen: väljaren är det som får någon
att stanna, och den är osynlig.

**Fix, `.navbar`** — FÖRE:

```njk
    <nav class="navbar">
      <a href="/" {% if page.url == "/" %}class="aktiv"{% endif %}>Hem</a>
      <a href="/guider/" {% if "/guider/" in page.url %}class="aktiv"{% endif %}>Guider</a>
      <a href="/om/" {% if page.url == "/om/" %}class="aktiv"{% endif %}>Om</a>
    </nav>
```

EFTER:

```njk
    <nav class="navbar">
      <a href="/" {% if page.url == "/" %}class="aktiv"{% endif %}>Hem</a>
      <a href="/guider/" {% if "/guider/" in page.url %}class="aktiv"{% endif %}>Guider</a>
      <a href="/vilken-bilbarnstol/" {% if page.url == "/vilken-bilbarnstol/" %}class="aktiv"{% endif %}>Väljaren</a>
      <a href="/om/" {% if page.url == "/om/" %}class="aktiv"{% endif %}>Om</a>
    </nav>
```

**Fix, sidfotens länkrad** — FÖRE:

```njk
    <p><a href="/guider/">Guider</a> &middot; <a href="/om/">Om sajten</a> &middot; <a href="mailto:info@barnprylsdoktorn.se">Kontakt</a> &middot; <a href="/sa-tjanar-sajten-pengar/">Så tjänar sajten pengar</a> &middot; <a href="/feed.xml">RSS</a></p>
```

EFTER:

```njk
    <p><a href="/guider/">Guider</a> &middot; <a href="/vilken-bilbarnstol/">Vilken bilbarnstol?</a> &middot; <a href="/plustestade-bilbarnstolar/">Plustestade stolar</a> &middot; <a href="/om/">Om sajten</a> &middot; <a href="mailto:info@barnprylsdoktorn.se">Kontakt</a> &middot; <a href="/sa-tjanar-sajten-pengar/">Så tjänar sajten pengar</a> &middot; <a href="/feed.xml">RSS</a></p>
```

Fyra menyposter i versaler ryms inte på 390 px utan att bli trånga. Lägg därför till i det
befintliga mobilblocket längst ned i CSS:en, `@media (max-width: 34rem)`:

```css
  .navbar { gap: 1.1rem; }
```

Plustestlistan hålls medvetet utanför menyn — den är en referenssida, inte ett steg i
läsarens resa. Sidfoten räcker för den.

### 3. Breda tabeller kan spränga sidbredden mellan 44 och 52 rem

**Allvarlighet:** Medel
**Var:** `src/css/style.css` — `@media (max-width: 44rem)` mot `@media (min-width: 52rem)`

Under 44 rem blir tabellen `display: block` med `overflow-x: auto` och en snygg skuggkant.
Över 52 rem breddas den med negativ marginal. **Mellan 44 och 52 rem gäller ingendera** —
där är tabellen en vanlig tabell med `td { white-space: nowrap }` och
`td:first-child { min-width: 11rem }`.

`main` är låst till 42 rem. En jämförelsetabell med fem kolumner som inte får radbrytas blir
bredare än så, och eftersom ingen overflow-hantering är aktiv i det spannet är det sidan
som scrollar i sidled, inte tabellen. Det drabbar liggande telefon och mindre surfplattor.

**Fix** — ändra brytpunkten så att de två spannen möts:

```css
/* FÖRE */
@media (max-width: 44rem) {

/* EFTER */
@media (max-width: 51.99rem) {
```

### 4. Startsidan listar tretton guider utan inbördes prioritering

**Allvarlighet:** Medel
**Var:** `src/index.md`, avsnittet "Mer att läsa"

Efter tre välvalda kort under "Var ska du börja?" följer en lista med samtliga övriga
guider — tretton stycken i dag, fler i morgon. Sorteringen sker på besöksstatistik, och den
statistiken är i praktiken tom, så ordningen är godtycklig.

Konsekvensen är att startsidan slutar som en katalog. Läsaren som just fått en tydlig väg
in möts av tretton jämnstarka alternativ och väljer inget. Det är också en dubblering av
`/guider/`, som gör exakt samma sak.

**Fix** — kapa listan och låt "Alla guider" bära resten:

```njk
{%- set visade = 0 %}
<ul class="artikellista">
{%- for artikel in collections.artiklar | reverse | sorteraEfterBesok %}
{%- if artikel.url not in utvalda and visade < 5 %}
{%- set visade = visade + 1 %}
  <li>
    <h3><a href="{{ artikel.url }}">{{ artikel.data.title | typo }}</a></h3>
    <p>{{ artikel.data.ingress | typo }}</p>
  </li>
{%- endif %}
{%- endfor %}
</ul>
```

Det här är en prioriteringsfråga snarare än ett fel — säg till om du hellre vill ha kvar
allt på startsidan.

### 5. Tabellrubriker är 11.5 px versaler

**Allvarlighet:** Medel
**Var:** `src/css/style.css`, `th`

`font-size: 0.72rem` blir 11.5 px, i versaler med `letter-spacing: 0.08em`. Kontrasten är
5.37:1 och alltså godkänd — det här är ett läsbarhetsfynd, inte ett kontrastfynd.

Jämförelsetabellerna är det läsaren faktiskt stannar vid när hon ska välja stol, och
kolumnrubriken är det som talar om vad siffran betyder. På telefon är 11.5 px versaler nära
gränsen för vad man orkar.

**Fix:**

```css
/* FÖRE — i th-regeln */
  font-size: 0.72rem;

/* EFTER */
  font-size: 0.8rem;
```

### 6. Bylinen är sidans minsta text

**Allvarlighet:** Medel
**Var:** `src/css/style.css`, `.datum`

"Av Erik Nordberg · Publicerad 7 augusti 2026 · Uppdaterad 17 augusti 2026" är satt i
`0.82rem`, alltså 13.1 px mot brödtextens 17 px, i dämpad grå.

Storleken är fakta. Att den är fel är en bedömning, men den är lätt att försvara: sajtens
hela argument är att en namngiven person har läst källorna och daterat rådet. Att sätta det
argumentet i sidans minsta typsnitt är att viska det man borde säga.

**Fix:**

```css
.datum {
  font-family: var(--sans);
  font-size: 0.9rem;
  color: var(--text-dampad);
  margin: -0.5rem 0 2rem;
}

.datum strong { color: var(--text); font-weight: 650; }
```

Och i `base.njk`, byt `Av Erik Nordberg` mot `Av <strong>Erik Nordberg</strong>`.

### 7. Kicker-länken heter "Guide" på samtliga sexton guider

**Allvarlighet:** Låg
**Var:** `src/_includes/base.njk`, `.kicker`

Varje guides första länk är ordet "Guide" och pekar på `/guider/`. Den som navigerar via
skärmläsarens länklista får sexton identiska länkar utan innebörd.

**Fix** — FÖRE:

```njk
<a class="kicker" href="/guider/">Guide</a>
```

EFTER:

```njk
<a class="kicker" href="/guider/" aria-label="Alla guider">Guide</a>
```

### 8. Ingen hoppa-till-innehåll-länk

**Allvarlighet:** Låg
**Var:** `src/_includes/base.njk`

Tangentbordsanvändare tabbar genom logga och meny på varje sidladdning. Med fyra
menyposter är det uthärdligt, men det är fem tabbtryck per sida på en sajt där läsaren är
tänkt att röra sig mellan många guider.

**Fix** — direkt efter `<body>`:

```njk
  <a class="hoppa" href="#innehall">Hoppa till innehållet</a>
```

Sätt `id="innehall"` på `<main>`, och lägg till i CSS:

```css
.hoppa {
  position: absolute;
  left: -9999px;
}

.hoppa:focus {
  position: static;
  display: block;
  padding: 0.75rem var(--luft);
  background: var(--text);
  color: var(--varm-ljus);
}
```

### 9. Om-sidan saknar ett ansikte

**Allvarlighet:** Låg — och det här är smak, inte fakta

Texten på `/om/` gör redan det svåra: den är ärlig om att du inte är trafiksäkerhetsingenjör,
och den förklarar affärsmodellen utan krumbukter. Det som saknas är ett fotografi.

På produktråd som rör barns säkerhet är avsändarens ansikte en av de starkaste
förtroendesignalerna som finns, och den kostar ingenting utom att du måste tycka att det är
okej. Lägg det inte om du inte vill — men vet att det är den enskilt billigaste
förtroendehöjningen kvar på sajten.

---

## Det som redan fungerar

- **Klickytorna.** 44 px minsta höjd är genomfört på meny, köpknapp, väljarens alternativ,
  produktkorten och båda knapparna i väljarens svar. Ovanligt konsekvent.
- **Fokushanteringen.** `:focus-visible` med `outline-offset` genomgående, och produktkortens
  `outline: none` kompenseras korrekt med `:focus-within` på kortet. Inget fokus försvinner.
- **Annonsmärkningen.** Notis före innehållet med namngiven handlare, plus märkning inuti
  varje länk så att skärmläsare hör den i länklistan. Både regelrätt och ärligt.
- **Inga `opacity`-dämpningar någonstans.** All dämpning sker med färg, vilket är precis
  därför kontrastvärdena i den här rapporten gick att räkna fram på tio minuter.
- **Väljarens tangentbordsstöd.** Radioknapparna är gömda med `clip-path`, inte
  `display: none`, så de fungerar för skärmläsare och piltangenter.
