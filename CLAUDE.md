# Barnprylsdoktorn

Svensk innehållssajt om bilbarnstolar. Målet är passiv inkomst via affiliate-innehåll.
Nischen kan breddas till barnprylar generellt längre fram — utgå från bilbarnstolar tills annat sägs.

Sajten är live på https://barnprylsdoktorn.se och fungerar. Utgå från att allt nedan redan är byggt.

## Svara alltid på svenska.

## Om Erik och din roll

Erik är PM på BookBeat och har jobbat nära utvecklare i fyra år — bekväm med terminologi,
verktyg och hur mjukvara byggs, men har inte tid att lära sig varje steg från grunden.
Prioriteringen är att få innehåll ut, inte att förstå koden.

Du bygger, Erik granskar och beslutar. Skriv koden — han ska inte behöva skriva den själv.
Fråga om designval, innehåll och prioriteringar, inte om syntax.
När det finns flera vägar: rekommendera en och motivera kort, i stället för att lista
alternativ och låta honom välja.

**Förklaringar:** koncept, inte kodrader. Några meningar om vad något är och varför vi
använder det — inte en genomgång rad för rad. Frågar han djupare, gå djupare.

**Felsökning:** fixa felet och säg i en mening vad som var fel. Ingen pedagogisk genomgång
om han inte ber om det.

## Teknik

- Eleventy (11ty) v3, artiklar i Markdown
- Repo: `erikjnordberg/barnprylsdoktorn`, branch `main`
- Cloudflare Pages deployar automatiskt vid push till `main`
- Projektnamn i Cloudflare: `barnprylsdoktorn`, konto-ID `ef8466a755154bee4f5f7028ac3a96ff`
- Domänen köpt hos Loopia, DNS och DNSSEC hos Cloudflare
- Google Search Console verifierad via TXT-post i DNS, sitemap inskickad
- Cloudflare Web Analytics påslagen med automatisk injicering — inga cookies, ingen samtyckesbanner

## Kommandon

```bash
npx @11ty/eleventy --serve     # lokal dev-server, http://localhost:8080
npx @11ty/eleventy             # bygg till _site/
```

Kör alltid ett bygge innan du säger att något är klart. Ett bygge som går igenom är
minimikravet, inte beviset — kontrollera i dev-servern att sidan ser rätt ut.

## Filstruktur

```
src/
  _includes/base.njk     layout för samtliga sidor
  _data/site.js          namn, url, beskrivning
  css/style.css          hela sajtens styling
  fonter/                self-hostade woff2-filer
  bilder/                tre SVG-illustrationer + delningsbild
  artiklar/              guiderna i Markdown
  artiklar/artiklar.json permalink /guider/<slug>/
  index.md, om.md, guider.njk, 404.md
  feed.njk, sitemap.njk, robots.njk
eleventy.config.js       filter: datum, typo, version, htmlDateString m.fl.
```

`kodhandledare-bilbarnstolar.md` i repot är inaktuell som kursplan. Följ den inte.

## Design

Redaktionell stil. Playfair Display i rubriker, Source Sans 3 i brödtext, båda self-hostade
i `src/fonter/`.

**Anropa aldrig Google Fonts** — det skickar besökarnas IP till Google.

```
--accent: #B5581F   terrakotta
--text: #181614
--text-dampad: #78726a
--papper: #FFFFFF
--papper-tint: #F7F5F2
--max-text: 42rem
--max-bred: 70rem
```

Den gamla sage-paletten (`#3E6B5F`, `#4A7C6F`) är borta — återinför den inte.
Illustrationerna är omfärgade till svart stol och terrakotta barn.

Sajten ska fungera bäst på mobil. Utgå från mobilvyn först.

## Cachning — viktigt

Alla statiska filer versioneras med `version`-filtret i `eleventy.config.js`, som hänger en
innehållshash på adressen:

```njk
{{ '/bilder/x.svg' | version }}
```

Utan det serverar Cloudflare gamla filer i timmar efter en ändring. **Nya bilder och stilar
ska alltid gå genom filtret.**

## Innehåll

Fem publicerade guider:

| Slug | Ämne |
|---|---|
| `babyskydd-for-nyfodda` | Första stolen, Plustestet, lutning |
| `bakatvand-bilbarnstol-vilken-ska-jag-kopa` | Folksams test 2025, tre stolar |
| `i-size-vs-vikt` | R129, R44, i-Size, vad lagen kräver |
| `isofix-eller-balte` | Monteringssätt, 33-kilosgränsen |
| `baltesstol-eller-balteskudde` | Steget efter bakåtvänt, 125 cm-regeln |

Guiderna är korslänkade i löptexten. Nya artiklar ska länkas in i de befintliga på de
ställen där frågan uppstår för läsaren — inte som en läs-mer-lista i botten.

### Röst

"Det här önskar jag att någon hade förklarat för mig när jag skulle köpa" — personlig och
konkret, inte generisk produktdatabas.

Artiklarna börjar oftast med ett **Kort svar** i punktform, följt av
`Vill du veta varför, fortsätt läsa`. Källförteckning sist.

Erik godkänner text och tonläge innan publicering.

### Faktakoll är obligatorisk

Säkerhetspåståenden om i-Size, R129, åldersgränser och längdgränser måste stämma och
beläggas mot NTF, Folksam, Trafikverket eller Transportstyrelsen.

Håll isär vad **lagen** kräver (135 cm) och vad som **rekommenderas** (bakåtvänt till
4–5 år, bältesstol till 10–12 år). Gissa aldrig en siffra — slå upp den.

## Git och deploy

Push till `main` deployar direkt till live. Därför:

- Committa gärna själv när en ändring är klar och bygget går igenom
- **Fråga alltid innan `git push origin main`**
- Skriv commit-meddelanden på svenska, kort och beskrivande

Efter deploy: kontrollera i webbläsaren att det faktiskt ser rätt ut, inte bara att bygget
gick igenom. Lägg på en query-parameter (`?v=2`) för att gå runt cachen vid kontroll.

## Nästa steg i projektet

1. **Fler artiklar** — det är fortfarande det som avgör om projektet ger inkomst.
   Uppenbara luckor: montering steg för steg, vanliga monteringsfel, bilbarnstol fram och
   airbag, andrahandsköp, taxi och flyg och hyrbil.
2. **Mobilgenomgång** med `ux-granskning`-skillen.
3. **Affiliate** via Adtraction eller Awin — men först när det finns trafik. De flesta
   program vill se besökare innan de godkänner.
