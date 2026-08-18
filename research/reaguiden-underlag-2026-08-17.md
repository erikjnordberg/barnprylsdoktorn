# Underlag: guide om att köpa bilbarnstol på rea

Datum: 2026-08-17. Underlag för en ny guide, inte färdig text. Erik godkänner vinkel och
disposition innan något skrivs, enligt `CLAUDE.md`.

**Black Friday 2026 är fredag 27 november — 15 veckor bort.** Indexeringen tar fyra till
åtta veckor på den här domänen, så sidan behöver ligga ute senast mitten av september för
att hinna mogna före toppen. Efter det är fönstret stängt till nästa år.

---

## Fyra beslut — avgjorda av Erik 2026-08-17

1. **Slug: `bilbarnstol-pa-rea`.** Evergreen, inte `bilbarnstol-black-friday`. Rankar året
   runt på "bilbarnstol rea", täcker mellandagsrean och vårrean, och slipper skrivas om
   varje år. Black Friday får ett eget H2 inuti och nämns i `title`.
2. **Handlare: Babysam, som på resten av sajten.** Jämförelsen löses med en vanlig länk
   till Prisjakt eller PriceRunner — ingen affiliatelänk, eftersom vi ändå inte får betalt
   av dem. Babyland och Stor&Liten används inte här.
3. **Ett köpblock, för Max-Safe Pro**, direkt efter Kort svar. Samma mönster som övriga
   guider.
4. **Inga kronbelopp.** Varken i löptext eller tabell, av samma skäl som köpblocket inte
   visar pris.

---

## Vinkeln

**"Så vet du om en bilbarnstolsrea är ett bra köp."** Inte "här är de bästa dealsen".

Sajtens röst är "det här önskar jag att någon hade förklarat för mig", och det finns en
riktig lucka att fylla: rean är det tillfälle på året då flest föräldrar köper bilbarnstol
utan att ha läst på, för att priset skapar tidspress. Guiden ska ge fyra kontroller som
går att göra på två minuter i en butik eller en kassa.

Den ska också säga rakt ut att **rean inte ändrar vilken stol som är rätt.** Det är hela
poängen, och det är den enda meningen ingen konkurrent skriver.

## Konkurrensbilden

De fyra sidor som rankar på "bilbarnstol black friday" är theblackfriday.se,
blackfridaytips.se, reaidag.se och black-friday-sverige.se. Jag läste igenom
theblackfriday.se den 2026-08-17. Den är representativ:

- Nio minuters lästid, noll fakta. Inga siffror, inga källor, inga myndighetsreferenser.
- Säkerhetsavsnittet är en mening om att stolen ska vara "godkänd enligt de senaste
  säkerhetsstandarderna, exempelvis i-Size" — inget om R129, R44, längdgränser eller
  Plustest.
- Innehållet är butikskort med affiliatelänkar till Axkid, Amazon, Bugaboo och Boozt.
- Sidan är daterad 2025 och innehåller fortfarande stycken som säger "Black Friday Week
  2024". Ingen underhåller den.
- Bugaboo-kortet säger själv: "Kanske inte en bilbarnstol i sig."

De rankar på att matcha sökordet, inte på att svara på frågan. Det betyder att en sida med
riktiga källor och en tydlig hållning har en verklig chans — men också att sökintentionen
delvis är "visa mig erbjudanden", och den tänker vi inte betjäna. Räkna med att guiden tar
en position bland de mer researchande läsarna, inte förstaplatsen på det bredaste ordet.

---

## Frontmatter

```yaml
---
title: Bilbarnstol på rea — så vet du om det är ett bra köp
ingress: Rean ändrar priset, inte vilken stol som är rätt. Fyra kontroller som tar två minuter, och en fälla som bara dyker upp när det är rea.
beskrivning: Köpa bilbarnstol på rea eller Black Friday — så kontrollerar du att sänkningen är riktig, att modellen är den testade, och vad som gäller om du behöver lämna tillbaka.
date: 2026-09-XX
lasharnast: ["basta-bilbarnstolen", "begagnad-bilbarnstol"]
annonslankar: ["Babysam"]
---
```

`lasharnast` är valt så att läsaren som är prismedveten leds vidare till de två sidor som
svarar på nästa fråga: vilken stol, och går det att spara mer på begagnat.

---

## Disposition

### Kort svar (punktlista)

Utkast, i sajtens ton:

- **Rean ändrar priset, inte vilken stol som är rätt.** Bestäm modell först, pris sedan.
- **Kontrollera att sänkningen är riktig.** Handlaren måste ange det lägsta priset de
  senaste 30 dagarna. Står det bara "ord.pris" eller ett procenttal, är det inte samma sak.
- **Kontrollera att det är den testade modellen.** En efterföljare med tvåa i namnet ärver
  inte föregångarens testresultat.
- **Kontrollera returrätten innan du betalar.** Du har 14 dagars ångerrätt på nätet. I
  butik har du ingen alls om handlaren inte frivilligt ger öppet köp.
- **Låt inte rean flytta dig till fel kategori.** Den billigaste stolen på rean är nästan
  alltid en bälteskudde utan rygg — och den är avsedd för barn över 125 cm.

Följt av `{% kopblock "britax-max-safe-pro" %}` och `Vill du veta varför, fortsätt läsa.`

### 1. Sänkningen — vad handlaren faktiskt måste visa

Kärnfaktan, och den enda konkreta konsumenträtten i hela nischen. Konsumentverket,
ordagrant:

> "Om marknadsföringen ger intryck av att priset har sänkts ska även det tidigare priset
> för produkten anges. Det tidigare priset ska vara det lägsta pris som använts för
> produkten under de senaste 30 dagarna före prissänkningen."

Plus, från Konsumentverkets konsumentsida om rea: rean får bara pågå under **begränsad
tid**, och priset måste vara **väsentligt lägre** än det ordinarie.

Vad det betyder i praktiken, och det är den meningen läsaren ska ta med sig: en sänkning
räknas mot det lägsta priset de senaste 30 dagarna, **inte** mot listpriset. En stol som
legat på 6 295 kr i tre veckor och sedan "sänks" från 7 995 kr följer inte regeln.

Regeln finns just för att motverka att priset höjs strax före rean. Konsumentverket har
själva rapporterat om fortsatta problem med reor trots lagstiftningen — värt en mening,
eftersom det gör läsaren rimligt skeptisk utan att texten behöver påstå något om en
enskild handlare.

### 2. Är det den testade modellen?

Den här är sajtens egen, och den är starkare än något konkurrenterna har.

Bilbarnstolar får ofta en efterföljare med en tvåa i namnet. **Testresultatet följer inte
med.** Det är exakt situationen med BeSafe Beyond: Folksam testade Beyond 2025, och det
som säljs i dag är Beyond². Vi länkar därför inte Beyond alls, vilket redan står i
`produkter.js`.

När den gamla generationen reas ut är det alltså tvärtom en möjlighet — en utgående modell
med ett testresultat är ofta ett bättre köp än efterföljaren till fullpris. Men det kräver
att man läser modellnamnet exakt.

Konkret råd: jämför namnet i annonsen mot Folksams testlista och mot VTI:s Plustestlista,
tecken för tecken. `basta-bilbarnstolen` har redan hela Plustest-tabellen — länka dit.

### 3. Returrätten

- **På nätet:** 14 dagars ångerrätt enligt distansavtalslagen, räknat från dagen efter du
  fick varan.
- **I butik:** ingen ångerrätt alls. Öppet köp och bytesrätt bestämmer handlaren själv.

Varför det spelar roll just för bilbarnstolar: sajtens genomgående råd är **provmontera i
din bil innan du bestämmer dig**. En stol som inte går att montera rätt i just din bil är
fel stol, oavsett pris. Under rean är det rådet svårare att följa — och en rea i fysisk
butik utan öppet köp betyder att provmonteringen måste ske innan du betalar, inte efter.

### 4. Fällan som bara finns när det är rea

Den billigaste produkten i kategorin är bälteskudden utan ryggstöd, och den blir därför
den som syns mest i en rea. Två saker gäller:

- Sajtens hållning är **bältesstol med rygg, inte bara kudde**, för barn under 125 cm.
- Sedan 2017 får nya modeller av kuddar utan rygg bara godkännas från 125 cm — men
  modeller som typgodkändes före regeländringen får fortsätta säljas. Det är precis de
  äldre modellerna som ligger kvar i lager och dyker upp på rea.

Det här är guidens skarpaste avsnitt. En rea flyttar folk nedåt i pris, och nedåt i pris i
den här kategorin betyder ofta nedåt i skydd.

### 5. Black Friday och Black Week

Kort avsnitt, mest för sökordet och för att svara på frågan "när?".

- Black Friday 2026 infaller **fredag 27 november**.
- Kampanjerna sträcker sig i praktiken över en hel vecka, ofta hela november.
- Bilbarnstolar reas hos flera av de handlare vi känner till.

Håll avsnittet fritt från löften om rabattnivåer. Vi vet inte vad som kommer att sänkas,
och en siffra här blir fel varje år.

### 6. Vad som inte blir bättre av en rea

Avslutning i sajtens ton. Tre punkter:

- **Tioårsregeln.** Livslängden räknas från att stolen börjar användas, inte från
  tillverkningsdatum — så en ny stol ur ett gammalt lager är inget problem i sig. Det är
  skicket som avgör.
- **Ett år till bakåtvänt är billigare än vilken rea som helst.** Sajten säger redan att
  varje extra år bakåtvänt är den billigaste säkerhetsuppgraderingen som finns. Den
  meningen hör hemma här igen.
- **Prisskillnaden mellan två bra stolar är mindre än skillnaden mot en osäker stol.**

### Källor

- Konsumentverket — Prissänkningar, regler för företag
- Konsumentverket — Rea och nedsatt pris
- Konsumentverket / Hallå konsument — Ångerrätt vid distansköp
- Folksam — Test av bilbarnstolar 2025
- VTI — Plustestade bilbarnstolar
- NTF — Bältesstol och bälteskudde

---

## Korslänkning in i befintliga guider

Fyra placeringar. Alla är ställen där texten redan tar upp pris, så länken uppstår ur
läsarens fråga och inte ur en ny mening. Ordagranna FÖRE-citat:

### 1. `basta-bilbarnstolen.md` — sista punkten i "Tre saker som gäller oavsett skede"

**FÖRE**

```
**Prisskillnaden mellan de här stolarna är mindre än skillnaden mot en osäker stol.** Låt inte hundralapparna avgöra.
```

**EFTER**

```
**Prisskillnaden mellan de här stolarna är mindre än skillnaden mot en osäker stol.** Låt inte hundralapparna avgöra. Ska du ändå köpa på rea finns [fyra kontroller som avgör om sänkningen är värd något](/guider/bilbarnstol-pa-rea/).
```

### 2. `bakatvand-bilbarnstol-vilken-ska-jag-kopa.md` — "Ett förbehåll om priserna"

**FÖRE**

```
Priserna kommer från Folksams test och är ungefärliga. Bilbarnstolar prisvarierar kraftigt mellan återförsäljare och över året — kontrollera aktuellt pris innan du köper, och låt inte prisskillnaden ensam avgöra.
```

**EFTER**

```
Priserna kommer från Folksams test och är ungefärliga. Bilbarnstolar prisvarierar kraftigt mellan återförsäljare och över året — kontrollera aktuellt pris innan du köper, och låt inte prisskillnaden ensam avgöra. Dyker någon av dem upp [på rea](/guider/bilbarnstol-pa-rea/) är det värt att kontrollera att det är samma modellnamn som Folksam testade.
```

Den formuleringen är vald med flit: den kopplar rean till Beyond-mot-Beyond²-problemet i
just den guide där de tre modellnamnen står.

### 3. `baltesstol-eller-balteskudde.md` — avsnittet om skillnaden

**FÖRE**

```
**Välj bältesstol.** Kudden sparar några hundralappar och lite bagageutrymme, och det är inte värt det för ett barn under 125 cm.
```

**EFTER**

```
**Välj bältesstol.** Kudden sparar några hundralappar och lite bagageutrymme, och det är inte värt det för ett barn under 125 cm. Det gäller även när kudden är [kraftigt nedsatt](/guider/bilbarnstol-pa-rea/) — en rea flyttar priset, inte 125-centimetersgränsen.
```

### 4. `begagnad-bilbarnstol.md` — "När du ska köpa nytt i stället"

**FÖRE**

```
Så: känner du inte säljaren och kan inte lita på vad hen säger om historien, är NTF:s råd att köpa nytt i stället.
```

**EFTER**

```
Så: känner du inte säljaren och kan inte lita på vad hen säger om historien, är NTF:s råd att köpa nytt i stället. Är priset skälet till att du tittar begagnat är [en rea på en ny stol](/guider/bilbarnstol-pa-rea/) ofta en bättre väg — där slipper du krockhistoriken helt.
```

Den här är den viktigaste av de fyra. Den fångar läsaren som är prisdriven och leder honom
mot det säkrare alternativet, vilket är både bättre råd och bättre affär.

Guiden ska dessutom in i `lasharnast` på minst en befintlig guide, enligt `CLAUDE.md`.
Förslag: `begagnad-bilbarnstol`, som i dag pekar på `bakatvand` och `vanliga-monteringsfel`
— byt ut den andra mot reaguiden.

---

## Faktakoll

### Belagt, kan skrivas som det står

| Påstående | Källa | Kontrollerat |
|---|---|---|
| Sänkt pris ska anges mot lägsta priset de senaste 30 dagarna | Konsumentverket, ordagrant citat ovan | 2026-08-17 |
| Rea får bara pågå begränsad tid och priset ska vara väsentligt lägre | Konsumentverket | 2026-08-17 |
| 14 dagars ångerrätt vid distansköp | Distansavtalslagen (2005:59), Konsumentverket | 2026-08-17 |
| Ingen ångerrätt i fysisk butik; öppet köp är frivilligt | Konsumentverket | 2026-08-17 |
| Black Friday 2026 = 27 november | Sista fredagen i november | 2026-08-17 |
| Nya kuddar utan rygg godkänns bara från 125 cm sedan 2017, äldre modeller får säljas vidare | Redan belagt i `baltesstol-eller-balteskudde` | 2026-08-09 |
| Tioårsregeln räknas från första användning, skicket avgör | Redan belagt i `begagnad-bilbarnstol` | 2026-08-09 |
| Bara R129 får säljas nytt sedan 1 september 2024 | Redan belagt i `begagnad-bilbarnstol` | 2026-08-09 |
| Ingen framåtvänd stol klarar Plustestet | Redan belagt i `basta-bilbarnstolen` | 2026-08-09 |

### Obelagt — måste kollas eller skrivas om

- **Gäller ångerrätten även reavaror?** Jag hittade ingen uttrycklig myndighetsformulering
  om det. Skriv inte "ångerrätten gäller även på rea" förrän det är belagt mot Hallå
  konsument. Formulera i stället neutralt: "kontrollera vad som gäller för just det köpet."
- **Rabattnivåer.** Skriv inga procentsatser. Vi vet inte vad som kommer att sänkas 2026,
  och siffran skulle bli fel utan att någon märkte det — samma resonemang som varför
  köpblocket inte visar pris.
- **Vilka handlare som kommer att rea bilbarnstolar.** Namnge ingen i förväg. Det som
  hände förra året är inte ett löfte om i år.
- **Beyond² kontra Beyond.** Vi vet att det är två produktnamn och att Folksam testade det
  ena. Vi har **inte** belagt att stolarna skiljer sig tekniskt. Guiden får därför säga att
  testresultatet gäller den testade modellen — inte att efterföljaren är sämre.

---

## Vad guiden inte ska göra

- **Ingen dealslista.** Den kräver underhåll varje vecka i november, blir inaktuell direkt
  och gör sajten till en av de fyra vi just konstaterade inte svarar på frågan.
- **Ingen nedräkning eller brådskeretorik.** Tidspress är exakt det som får folk att köpa
  fel stol. Att bygga en sida på det vore att sälja problemet vi säger oss lösa.
- **Ingen rabattkod.** Adtractions villkor tillåter bara koder som annonsören
  kommunicerar via nätverket eller har liggande live i butiken, och vi har inga.
- **Inga påståenden om enskilda handlares prissättning.** Beskriv regeln, låt läsaren
  tillämpa den.

---

## Tidplan

| Steg | När |
|---|---|
| Erik godkänner vinkel och de fyra besluten | vecka 34 |
| Utkast till Erik | vecka 35 |
| Faktakoll med `faktakoll-bilbarnstolar`-skillen | före publicering |
| Publicering och korslänkning i samma commit | senast 15 september |
| Indexerad | mitten av oktober–november |
| Toppen | 20–30 november |

Efter publicering: lägg till guiden i innehållstabellen i `CLAUDE.md` och stryk punkten här.
