# Kartläggning: tillbehörslänkar i löptexten

Underlag för steg 1 — få in affiliatelänkar i befintliga guider utan att skriva nya artiklar.
Ingen länk läggs in förrän ett program är godkänt. Den här filen beskriver **var** de ska
ligga och **med vilken formulering**, så att insättningen blir sök-och-ersätt.

Åtta placeringar. De fem första kräver ingen ny text — bara en länk på befintliga ord.
De tre sista kräver ny copy och behöver Eriks godkännande innan de skrivs in.

---

## Principen som styr urvalet

Länken läggs där läsaren **redan har fått frågan väckt av texten**. Ingen länk får vara
anledningen till att en mening finns. Varje placering nedan uppfyller ett av två villkor:

1. Texten nämner redan en produktkategori och läsaren undrar "vilken då?"
2. Texten ger ett råd som kräver en pryl för att kunna följas

Det som gör den här sajten trovärdig i tillbehörsfrågan är att den **också säger vilka
tillbehör man inte ska köpa**. Se avsnittet "Länka aldrig" sist. Det avsnittet är inte en
brasklapp — det är själva anledningen till att tillbehörslänkarna här är värda något.

---

## Olöst innan något läggs in: märkning av länkar i löptext

Köpblocket har annonsmärkning inbyggd enligt `research/spec-kopblock.md`. **En affiliatelänk
i löptexten har det inte**, och marknadsföringslagen skiljer inte på dem.

Det behöver beslutas innan första länken går in. Tre alternativ:

- **A. Rad högst upp i artikeln.** "Den här guiden innehåller annonslänkar." Enkelt,
  syns före läsningen, men märkningen hamnar långt från länken.
- **B. Markör intill länken.** Ett litet `(annonslänk)` efter länktexten. Närmast kravet
  på att märkningen ska synas innan klicket, men bryter läsflytet.
- **C. Både och.** Rad högst upp i artiklar som innehåller länkar, plus markör vid länken.

**Rekommendation: C.** Det är det enda som säkert uppfyller "reklam ska gå att känna igen
som reklam" när länken ligger mitt i en mening. Kostnaden är kosmetisk.

Alla länkar ska dessutom ha `rel="sponsored nofollow noopener"` och `target="_blank"`,
precis som köpblockets knapp.

---

## Placeringarna

### 1. `bilbarnstol-i-taxi.md` — kompakt bälteskudde

Den starkaste placeringen på hela sajten. Texten hyllar redan produktkategorin utan att
säga vilken produkt, och läsaren som kommit hit har ett konkret problem att lösa.

**FÖRE**

```
**För det större barnet: en bälteskudde i väskan.** Har barnet kommit till [bältesstol eller bälteskudde](/guider/baltesstol-eller-balteskudde/) finns kompakta modeller som väger under ett kilo och får plats i en ryggsäck. För taxiresor, semesterveckan och skjuts hem från kalas är det den enskilt mest användbara pryl du kan äga i den här kategorin.
```

**EFTER**

```
**För det större barnet: en bälteskudde i väskan.** Har barnet kommit till [bältesstol eller bälteskudde](/guider/baltesstol-eller-balteskudde/) finns [kompakta modeller](LÄNK) som väger under ett kilo och får plats i en ryggsäck. För taxiresor, semesterveckan och skjuts hem från kalas är det den enskilt mest användbara pryl du kan äga i den här kategorin. Kom bara ihåg 125-centimetersregeln — en kudde utan ryggstöd är avsedd för de största barnen, och den gäller även när den ligger i en ryggsäck.
```

Den sista meningen är ny och gör två saker: den upprepar säkerhetsregeln precis där någon
är på väg att köpa, och den gör länken till ett råd i stället för en rekommendation.

---

### 2. `bilbarnstol-flyg-och-hyrbil.md` — CARES-sele

Namngiven produkt som redan rekommenderas i texten. Kräver bara en länk på namnet.

**FÖRE**

```
CARES är en fyrpunktssele som spänns runt flygstolens ryggstöd och används tillsammans med flygplanets eget bälte.
```

**EFTER**

```
[CARES](LÄNK) är en fyrpunktssele som spänns runt flygstolens ryggstöd och används tillsammans med flygplanets eget bälte.
```

**Obs:** CARES säljs i Sverige av få återförsäljare. Kontrollera att den finns hos den
handlare länken pekar mot innan länken läggs in — en död länk på en namngiven produkt är
sämre än ingen länk.

---

### 3. `bilbarnstol-flyg-och-hyrbil.md` — vadderad transportväska

Texten anger redan en prisnivå, vilket är så nära ett köpråd man kommer utan länk.

**FÖRE**

```
En vadderad transportväska kostar några hundralappar och löser problemet hyfsat.
```

**EFTER**

```
En [vadderad transportväska](LÄNK) kostar några hundralappar och löser problemet hyfsat.
```

---

### 4. `vanliga-monteringsfel.md` — filt över bältet (Fel 6)

**FÖRE**

```
Ungefär hälften av föräldrarna gör det här. Det är också det enklaste av alla sex felen att åtgärda: av med jackan, spänn fast, lägg jackan över som filt.
```

**EFTER**

```
Ungefär hälften av föräldrarna gör det här. Det är också det enklaste av alla sex felen att åtgärda: av med jackan, spänn fast, lägg jackan över som filt. Vill du ha något smidigare än en hopvikt overall finns [åkpåsar som läggs utanpå selen](LÄNK) i stället för under barnet. Skillnaden är hela poängen: allt som hamnar mellan bandet och kroppen skapar slack, allt som ligger ovanpå gör det inte.
```

Den sista meningen är den som gör länken försvarbar. Den lär läsaren skilja på två saker
som ser likadana ut i butiken.

---

### 5. `babyskydd-for-nyfodda.md` — samma filt, avsnittet "En sak till"

Samma produkt, andra guide, andra läsare. Ingen ny copy behövs.

**FÖRE**

```
Det känns fel att åka iväg utan overall en januarimorgon — men filten över bältet är rätt svar, inte overallen under det.
```

**EFTER**

```
Det känns fel att åka iväg utan overall en januarimorgon — men [filten över bältet](LÄNK) är rätt svar, inte overallen under det.
```

---

### 6. `bilbarnstol-fram-och-airbag.md` — bilbarnstolsspegel · NY COPY · FAKTAKOLL

Texten tar redan upp problemet som spegeln löser. Placeringen är rätt, men påståendena
nedan är inte belagda och får inte publiceras som de står.

**FÖRE**

```
Mittplatsen kräver att både bilen och stolen är godkända för montering där, och den gör barnet svårare att hålla ögonkontakt med och övervaka under körningen. Är det viktigast för dig väger den avvägningen tyngre än vinsterna med framsätet.
```

**EFTER (utkast)**

```
Mittplatsen kräver att både bilen och stolen är godkända för montering där, och den gör barnet svårare att hålla ögonkontakt med och övervaka under körningen. Är det viktigast för dig väger den avvägningen tyngre än vinsterna med framsätet.

En [spegel på nackstödet](LÄNK) löser halva problemet och skapar ett litet nytt: den ska sitta fast ordentligt, eftersom ett löst föremål i kupén blir en projektil vid en krock, och den ska användas i ögonvrån, inte studeras.
```

**FAKTAKOLL innan publicering:** att lösa föremål i kupén utgör en risk vid krock är
rimligt och allmänt hävdat, men jag har inte belagt det mot NTF, Folksam eller
Transportstyrelsen, och jag har inte hittat något svenskt myndighetsuttalande om
bilbarnstolsspeglar specifikt. Antingen beläggs meningen eller så skrivs den om till något
som inte påstår något om krocksäkerhet. **Publicera inte utkastet som det står.**

---

### 7. `montera-bilbarnstol-steg-for-steg.md` — sparkskydd / stolsskydd · NY COPY · FAKTAKOLL

Ny lucka i texten snarare än en befintlig mening. Hör hemma i "Innan du börjar", eftersom
skyddet ska ligga på plats innan stolen bärs in.

**FÖRE** — sista stycket i avsnittet "Innan du börjar"

```
**Ta fram båda manualerna.** Stolens, för bältesvägen. Bilens, för var Isofix-fästena, top tether-kroken och eventuella fästöglor sitter — och för om golvfacken under baksätet tål ett stödben. Står det inget om det: utgå från att de inte gör det.
```

**EFTER (utkast)**

```
**Ta fram båda manualerna.** Stolens, för bältesvägen. Bilens, för var Isofix-fästena, top tether-kroken och eventuella fästöglor sitter — och för om golvfacken under baksätet tål ett stödben. Står det inget om det: utgå från att de inte gör det.

**Bestäm dig om sätesskyddet nu, inte sedan.** Ska du skydda klädseln under stolen måste [skyddet](LÄNK) ligga på plats innan stolen monteras — annars får du göra om hela monteringen. Och kolla vad stolens manual säger: alla tillverkare tillåter inte ett lager mellan stol och säte, eftersom det kan påverka hur stolen ligger an. Står det inget, använd tillverkarens eget skydd om det finns.
```

**FAKTAKOLL innan publicering:** påståendet att ett mellanlager kan påverka monteringen
kommer från tillverkarnas egna manualer, inte från en svensk myndighetskälla. Det behöver
antingen beläggas mot NTF eller formuleras så att det tydligt är manualens ord och inte
sajtens. Det är också det mest tveksamma av alla åtta förslagen kommersiellt — sätesskydd
är billiga och provisionen blir närmast noll. **Överväg att stryka placering 7 helt** och
behålla resonemanget som ren säkerhetsinformation utan länk. Det skulle vara helt i linje
med sajtens röst.

---

### 8. `begagnad-bilbarnstol.md` — reservklädsel · lågt värde

Med i listan för fullständighetens skull, inte för att den rekommenderas.

**FÖRE**

```
7. **Ta av klädseln och kontrollera frigoliten och plaststommen.** Leta efter sprickor eller inbuktningar i frigoliten under tyget, och sprickor eller mekaniska skador på plaststommen.
```

Möjlig länk på en ny mening om att tillverkarna säljer reservklädsel. Men läsaren är här
för att avgöra om en stol är säker, inte för att shoppa, och en länk mitt i en
säkerhetschecklista sänker förtroendet mer än den tjänar. **Rekommendation: hoppa över.**

---

## Länka aldrig

Fyra kategorier där sajten ska vara uttalat negativ. Det här är inte försiktighet — det är
det som gör de åtta placeringarna ovan trovärdiga.

- **Bältesförlängare.** `bilbarnstol-plats-i-bilen.md` säger redan rakt ut att de som säljs
  är avsedda för gods och inte är godkända för bilbarnstolar. Länka aldrig, oavsett
  provision.
- **Eftermarknadsinsatser för nyfödda.** Insatser som inte följt med stolen är inte
  testade med den. Lutningsavsnittet i `babyskydd-for-nyfodda.md` gränsar till frågan och
  kan förtydligas — men utan länk.
- **Sel- och nackkuddar från tredje part.** Allt som hamnar mellan selen och barnet ändrar
  hur kraften fördelas. Samma logik som vinterjackan i `vanliga-monteringsfel.md`.
- **Begagnade stolar via marknadsplatser.** `begagnad-bilbarnstol.md` säger att man inte
  ska köpa av någon vars historia man inte kan kontrollera. En affiliatelänk dit skulle
  motsäga guidens egen slutsats.

---

## Handlare per produkt

Fylls i när programmen är godkända. Ingen länk läggs in innan dess.

| Produkt | Placering | Trolig handlare |
|---|---|---|
| Kompakt bälteskudde | 1 | Jollyroom, Babyland |
| CARES-sele | 2 | Kontrollera lagerstatus först |
| Transportväska för bilbarnstol | 3 | Jollyroom, Amazon |
| Åkpåse som läggs utanpå selen | 4, 5 | Jollyroom, Babyshop |
| Spegel för nackstöd | 6 | Amazon, Jollyroom |
| Sätesskydd | 7 | Stryks troligen |

Axkid är den mest ämnesnära annonsören men säljer stolar, inte tillbehören ovan. Den
länken hör hemma i köpblocken, inte här.

---

## Innan något läggs in

1. Besluta om märkningen i löptext — alternativ A, B eller C ovan
2. Godkänn den nya copyn i placering 1, 4, 6 och 7
3. Faktakolla placering 6 och 7, eller stryk dem
4. Vänta in ett godkänt program och fyll i handlartabellen
5. Lägg in placering 1–5 först, mät i två veckor, utvärdera innan resten

Placering 1–5 räcker för att svara på frågan steg 1 ställdes för: klickar läsarna?
