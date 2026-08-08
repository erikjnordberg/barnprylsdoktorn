# Faktakoll mot Folksams test av bilbarnstolar, 2025

Datum: 2026-08-08
Källa: Folksam, *Folksam testar bilbarnstolar – Bra val 2025*
https://www.folksam.se/tester-och-goda-rad/vara-tester/bilbarnstolar

Syfte: kontrollera att produktnamn, priser, mått, betyg och Plustest-status i
`produkter.js`, tabellerna och löptexten stämmer mot källan, inför att
affiliatelänkar läggs in.

---

## Slutsats

**Sajtens produktdata stämmer med Folksam. Inga fel hittades.**

Alla tre produkterna matchar Folksams uppgifter exakt på namn, pris, längd- och
viktgräns, monteringssätt, Plustest och betyg. Även de påståenden som bygger på
testet — antal testade stolar, antal rekommenderade, "testets enda fyra" — är
korrekta.

Den enda avvikelsen som fanns var införd av mig tidigare samma dag och är nu
återställd. Se *Rättat* nedan.

---

## Folksams uppgifter, ordagrant

### Britax Römer Max-Safe Pro

```
Pris cirka: 4 495 kr
Godkänd längd/vikt: 61-125 cm, max 36 kg
Typgodkännande: UN R129
PlusTest: Ja, 125 cm
Montering: Bältesmontering
Testår: 2025
Kommentar: + Mycket rymlig, hög rygg, godkänd upp till 36 kg, låg vikt 9 kg
Betyg: 4
```

### BeSafe Beyond

```
Pris cirka: 8 998 kr
Godkänd längd/vikt: 40-125 cm, max 22 kg
Typgodkännande: UN R129
PlusTest: Ja, 125 cm
Montering: Isofix
Testår: 2025
Kommentar: + Vridbarhet underlättar placering av barnet
Betyg: 3
```

### TinySeats 2

```
Pris cirka: 5 995 kr
Godkänd längd/vikt: 61-125 cm, max 23 kg
Typgodkännande: UN R129
PlusTest: Nej
Montering: Isofix bakåtvänd
Testår: 2025
Kommentar: + Hopfällbar resestol, mycket rymlig, hög rygg, godkänd upp till 23 kg
           - Risk för felanvändning om den monteras framåtvänd
Betyg: 3
```

---

## Avstämning mot sajten

| Uppgift | Folksam | Sajten | Status |
|---|---|---|---|
| Britax, pris | 4 495 kr | 4 495 kr | Stämmer |
| Britax, längd/vikt | 61–125 cm, max 36 kg | 61–125 cm, max 36 kg | Stämmer |
| Britax, montering | Bältesmontering | Bälte | Stämmer |
| Britax, Plustest | Ja, 125 cm | Ja | Stämmer |
| Britax, betyg | 4 | 4 | Stämmer |
| BeSafe, pris | 8 998 kr | 8 998 kr | Stämmer |
| BeSafe, längd/vikt | 40–125 cm, max 22 kg | 40–125 cm, max 22 kg | Stämmer |
| BeSafe, montering | Isofix | Isofix | Stämmer |
| BeSafe, betyg | 3 | 3 | Stämmer |
| TinySeats, pris | 5 995 kr | 5 995 kr | Stämmer |
| TinySeats, längd/vikt | 61–125 cm, max 23 kg | 61–125 cm, max 23 kg | Stämmer |
| TinySeats, Plustest | Nej | Nej | Stämmer |
| TinySeats, betyg | 3 | 3 | Stämmer |

### Påståenden i löptexten

**"Folksam testade fem nya bakåtvända bilbarnstolar 2025. Tre fick betyget Bra val."**
Stämmer. Testår 2025 i Folksams lista: Britax Römer Max-Safe Pro (4),
BeSafe Beyond (3), TinySeats 2 (3), Axkid Spinkid 2 (2), Thule Elm (2).
Fem stolar, tre med Bra val. Folksams egen text: *"Vi har testat 5 nya
bilbarnstolar... Tre bilbarnstolar, BeSafe Beyond, Britax Römer Max-Safe Pro och
TinySeats Two utsågs till Bra val."*

**"Det här är testets enda fyra"** (om Britax)
Stämmer, för 2025 års test. Observera att Folksams samlade lista innehåller fler
stolar med betyg 4 från tidigare testår — Axkid Minikid 3/4, Axkid One 2/3 och
BeSafe Stretch, samtliga testår 2023. Formuleringen är korrekt men kan
missförstås av en läsare som tittar på hela listan. Överväg *"testets enda fyra
bland 2025 års stolar"* om det ska vara helt vattentätt.

**"lägst pris"** (om Britax)
Stämmer, både bland 2025 års tre och bland samtliga Bra val-stolar i listan.
Näst billigast bland Bra val är Klippan Opti 129 Freestyle på 4 590 kr.

**"En stol som tillåter framåtvänt åkande under 105 cm kan inte få Bra val."**
Stämmer. Folksam: *"Om bilbarnstolen är vändbar med framåtvänt godkännande under
105 cm eller har allvarliga säkerhetsbrister ges inte märkningen Bra val."*

---

## Rättat

Tidigare under dagen ändrade jag Britax-priset från `4 495 kr` till `3 495 kr` på
fyra ställen, på premissen att 4 495 var felaktigt. Det var det inte — 4 495 kr
är Folksams egen prisuppgift, och det är den siffran hela tabellen bygger på.
3 495 kr var Jollyrooms dagspris.

Ändringen är återställd på samtliga fyra ställen:

- `src/_data/produkter.js`
- `src/artiklar/bakatvand-bilbarnstol-vilken-ska-jag-kopa.md` (tabell + produktavsnitt)
- `src/artiklar/basta-bilbarnstolen.md` (tabell)

Motivering till att behålla Folksams siffra: tabellen presenteras som Folksams
testresultat och varje annan uppgift i den kommer från Folksam. Ett dagsaktuellt
butikspris i en rad och testpriser i övriga blir inkonsekvent, och butikspriser
måste underhållas. Vill du i stället visa dagspris bör hela tabellen byta princip
och kolumnrubriken ändras från *Pris ca* till något som säger var priset kommer
ifrån.

---

## Kvar att ta ställning till

**1. BeSafe Beyond och Beyond² — inför affiliatelänkarna**

Folksam testade *BeSafe Beyond*. Jollyroom säljer i dag *BeSafe Beyond²
inklusive Beyond Bas* för 7 990 kr. Det är sannolikt en efterföljare, inte samma
stol. Ingen text på sajten är fel i dag, men när affiliatelänken ska pekas någonstans
måste den peka på rätt modell — annars länkar en text om en testad stol till en
otestad. Kontrollera vad handlaren faktiskt har i lager när programmet är godkänt.

**2. Fingerregeln — motstridiga uppgifter mellan två guider**

`vanliga-monteringsfel.md`:

> Kläm på selen vid nyckelbenet — knappt ett finger ska få plats.

NTF, *Konsumentupplysning: Bakåtvänd bilbarnstol*:

> En bra tumregel är att endast två fingrar ska få plats mellan bältet och
> barnets bröstkorg.

De två mäter på olika ställen — nyckelben respektive bröstkorg — men läsaren
uppfattar dem som samma test. Den nya monteringsguiden använder därför nyptestet
utan antal fingrar, så att sajten inte säger emot sig själv. Det här är en
säkerhetssiffra och ändras inte utan ditt godkännande.

Förslag: harmonisera mot NTF:s formulering, eftersom det är den källa som anges.
