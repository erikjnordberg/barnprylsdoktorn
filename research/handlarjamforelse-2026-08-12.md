# Handlarjämförelse: Babyland och Stor&Liten mot Babysam

Datum: 2026-08-12. Underlag för beslutet att **inte** flytta några länkar när de två nya
Adtraction-programmen godkändes. Skriven för att slippa göra om jämförelsen nästa gång ett
program släpper igenom.

## Läget

Tre godkända program i kanalen Barnprylsdoktorn (ID 2100860918):

| Handlare | Provision | Produkter i feed | Spårdomän | Spårningstid |
|---|---|---|---|---|
| Babysam | 8 % | ca 21 000 | `to.babyworld.se` | — |
| Babyland | 4 % | 4 642 | `pin.babyland.se` | 30 dagar |
| Stor&Liten | 4 % | 3 914 | `at.storochliten.se` | 45 dagar |

Alla tre spårlänkarna ligger nu i `ADTRACTION_PROGRAM` i `eleventy.config.js`. Babyland och
Stor&Liten används inte av någon länk i dag — de ligger inne för att vara redo.

Babylands EPC är 0,45 kr, Stor&Litens 0,00 kr, Babysams 1,30 kr. Konverteringsgrad 2,5 %
respektive 2,0 % mot Babysams okända. Genomsnittlig order 617 kr hos Babyland, 414 kr hos
Stor&Liten.

## Prisjämförelse på överlappande produkter

Priser hämtade ur Adtractions produktfeeds 2026-08-12. De rör sig, men storleksordningen
är poängen.

| Produkt | Babysam | Babyland | Stor&Liten |
|---|---|---|---|
| Axkid ONE 3 | 5 895–6 395 kr | 8 499 kr | 8 499 kr |
| Axkid ONE+ 3 | 6 695–6 746 kr | 8 499–8 999 kr | 8 999 kr |
| Axkid Up transportväska | 395 kr | 995 kr | — |
| Axkid Mate 2 bälteskudde | 549 kr | 560 kr | 559 kr |
| BeSafe Beyond² | 4 995–6 395 kr | 5 999–6 299 kr | — |

Babysam är billigare eller likvärdig på samtliga, och betalar dubbelt så hög provision.
**Det finns i dag ingen produkt där en länk till Babyland eller Stor&Liten skulle vara
bättre för vare sig läsaren eller sajten.**

## De öppna luckorna — fortfarande öppna

Kontrollerat mot båda feedarna, ingen träff:

- **BeSafe Beyond (originalet).** Babyland säljer bara Beyond², precis som Babysam. Att
  länka Beyond² från en text om Folksams test av Beyond vore fortfarande att tillskriva en
  annan produkt ett testresultat den inte har. `besafe-beyond` i `produkter.js` förblir
  utan url.
- **CARES-sele.** Noll träffar i alla tre feedarna. Placering 2 i
  `tillbehorslankar-2026-08-09.md` går fortfarande inte att fylla.
- **Åkpåse som läggs utanpå selen.** Babylands och Stor&Litens åkpåsar är
  barnvagnsmodeller (Thule Elements, Bozz Ergo, Elodie, Mini Dreams). Babysams
  bilstolsmodeller — Nordbaby Mity, Easygrow Lyng — är av typen barnet ligger *i*, alltså
  ett lager mellan sele och kropp. Precis det guiderna varnar för. Placering 4 och 5
  förblir blockerade.

## Vad de nya programmen faktiskt tillför

1. **Reserv om Babysam tar slut i lager.** Axkid, BeSafe och Maxi-Cosi finns hos alla tre.
   Byter vi handlare på en enskild länk är det två rader arbete, inte ett nytt program.
2. **Babyland täcker breddningen mot cykel.** Hamax cykelsits finns i deras feed. Blir
   cykelbarnstol nästa nisch enligt steg 5 i `CLAUDE.md` är handlaren redan godkänd.
3. **Stor&Liten är leksaker** — BRIO, LEGO, Fisher Price, Barbie. Ingen bäring på
   bilbarnstolar. De har enstaka stolar i feeden (Axkid ONE 3, Fillikid bälteskudde) men
   dyrare än Babysam. Programmet är inlagt för fullständighetens skull.

## Programvillkor

Båda har samma sju regler som Babysam, och den formulering annonsnotisen redan följer:
"Inlägget innehåller reklam genom annonslänkar för x". Ingen ändring behövs i `base.njk`.

Att notera:

- **Ingen SEM på varumärkesnamn** i något av programmen, och Google Shopping är förbjudet
  hos båda. Samma låsning som Babysam.
- **Varumärkesstrategi styr urvalet** hos båda — samma klausul som gör Jollyroom osäker.
- Babyland betalar bara på ordrar från privatpersoner, inte företag.

## Kodändring i samma veva

Handlarnamn skrivs ut i HTML av `kopblock` och `annonslank`. "Stor&Liten" innehåller ett
`&` som hade gett ogiltig HTML om det skrivits rakt av. Namnet escapas nu på vägen ut via
`htmlText()` i `eleventy.config.js`. Notisen högst upp gick redan säker — Nunjucks escapar
`{{ aktiva | listaSvenska }}` automatiskt.

## Nästa gång ett program godkänns

Kolla i den här ordningen, det tar tio minuter:

1. Finns produkten alls i feeden? Sök i Adtractions produktvy, filtrerad på kanalen.
2. Är priset lägre än hos nuvarande handlare?
3. Är provisionen högre?
4. Fyller den någon av de tre öppna luckorna ovan?

Är svaret nej på alla fyra: lägg in spårlänken i `ADTRACTION_PROGRAM` och låt länkarna
vara. Ett program som ligger inne kostar ingenting.
