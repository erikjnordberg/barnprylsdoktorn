# Faktagranskning: produkter.js

Granskad 2026-08-08 mot tillverkarnas egna sidor och svenska handlare (BeSafe, TinySeats Europe, Jollyroom, Babyproffsen, Bilia, Folksams testredovisning).

**Ingen ändring är gjord.** Säkerhetssiffror flaggas här för ditt godkännande enligt projektreglerna.

---

## 1. BeSafe Beyond — fel nedre längdgräns

**FÖRE:**

```js
specifikation: "40–125 cm · max 22 kg · Isofix · Plustestad",
motivering:
  "Vrids mot dörren vid i- och urlyft och tar barnet redan från 40 cm — bekvämast om ryggen eller en trång parkering är problemet.",
```

**Problem:** BeSafe anger 61–125 cm och från cirka 6 månader. 40 cm är gränsen för babyskyddet *Go Beyond*, en annan produkt i samma modularsystem. Som det står nu kan en förälder tro att stolen fungerar från nyfödd.

Det här är den allvarligaste posten i filen. En felaktig nedre gräns på en YMYL-sajt är precis det som förstör förtroendet, och den står dessutom två gånger — i specifikationen och i motiveringen.

**FÖRSLAG:**

```js
specifikation: "61–125 cm · max 22 kg · Isofix med bas · Plustestad",
motivering:
  "Vrids mot dörren vid i- och urlyft och går att luta med en hand — bekvämast om ryggen eller en trång parkering är problemet.",
```

**Övrigt om samma produkt:** stolen kräver Beyond-basen, som säljs separat. Priset 8 998 kr behöver kontrolleras mot om det avser stol med eller utan bas — skillnaden är stor nog att en läsare som klickar vidare känner sig lurad. Godkännandet är UN R129, 61–105 cm som i-Size och 105–125 cm som Specific Vehicle, vilket betyder att fordonslistan gäller för de större barnen.

---

## 2. TinySeats Two — nyckel och längdintervall

**FÖRE:**

```js
"tinyseats-2": {
  namn: "TinySeats Two",
  specifikation: "61–125 cm · max 23 kg · Isofix · inte Plustestad",
```

**Problem A:** nyckeln är `tinyseats-2`, namnet är "TinySeats Two". Tillverkarens namn är TinySeats Two. Nyckeln bör byta till `tinyseats-two` och shortcode-anropen i guiderna följa med. Kontrollera samtidigt att tabellen och löptexten inte säger "TinySeats 2" någonstans.

**Problem B:** TinySeats anger från cirka 9 månader, bakåtvänt till 23 kg / 125 cm, och därefter användning som bältesstol med bilens trepunktsbälte till 135 cm. Nedre gränsen 61 cm ser för låg ut, och att stolen fortsätter som bältesstol saknas helt — det är själva argumentet för produkten.

**FÖRSLAG:**

```js
specifikation: "Bakåtvänt till 125 cm / 23 kg · sedan bältesstol till 135 cm · Isofix · inte Plustestad",
```

**Viktigt att kolla i löptexten:** tillverkaren är uttrycklig med att den inbyggda selen inte får användas när stolen sitter framåtvänd — då ska bilens bälte användas. Står det inte i guiden bör det stå där, inte i produktblocket.

---

## 3. Britax Römer Max-Safe Pro — verifiera två uppgifter

**FÖRE:**

```js
pris: "4 495 kr",
specifikation: "61–125 cm · max 36 kg · bältesmonterad · Plustestad",
```

Längd, vikt och monteringssätt stämmer mot Folksams testredovisning, där stolen beskrivs som godkänd till 125 cm / 36 kg och bältesmonterad med stödben och självåtspännande underförankringsband.

**Två saker jag inte kunde bekräfta:**

- **Plustestad.** Jag hittade ingen källa som bekräftar det för just Max-Safe Pro. Kolla mot Plustestets egen lista innan påståendet står kvar — det är sajtens starkaste säkerhetsargument och det får inte vara fel.
- **Priset.** En genomgång av Folksams test 2025 angav omkring 3 500 kr. Ditt pris är 4 495 kr. Ett av dem är inaktuellt.

---

## 4. Strukturellt: ett fält saknas

Filen är redo för affiliate — `url` och `handlare` finns tomma och kommentaren överst beskriver rätt arbetsflöde. Det som saknas är spårning av när priset senast stämde:

```js
prisKontrollerat: "2026-08-08",
```

Priser i affiliate-innehåll går inaktuella på veckor. Med ett datum i datan kan köpblocket skriva ut "Pris kontrollerat 8 aug 2026", vilket både är ärligare mot läsaren och gör det lätt för dig att se vad som behöver ses över. Det kräver en rad i `kopblock`-shortcoden.

---

## Sammanfattning

| Post | Åtgärd | Brådska |
|---|---|---|
| BeSafe Beyond, 40 cm → 61 cm | Rätta, två ställen | Hög — felaktig säkerhetsgräns |
| BeSafe Beyond, bas säljs separat | Kontrollera pris | Hög — inför affiliate |
| TinySeats Two, nyckel `tinyseats-2` | Byt till `tinyseats-two`, uppdatera anrop | Medel |
| TinySeats Two, längdintervall | Skriv om specifikationen | Medel |
| Max-Safe Pro, Plustestad | Verifiera mot Plustestets lista | Hög — säkerhetspåstående |
| Max-Safe Pro, pris | Verifiera | Medel |
| `prisKontrollerat` | Lägg till fält + rad i shortcode | Låg |

Inget av det här hindrar en affiliate-ansökan. Men det bör vara rättat innan du lägger in länkar, för då börjar felen kosta trovärdighet på riktigt.
