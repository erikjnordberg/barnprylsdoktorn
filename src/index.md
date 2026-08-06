---
layout: base.njk
title: Rätt bilbarnstol, utan researchen
ingress: Du har inte tid att läsa tjugo tester och en EU-förordning. Det har jag gjort åt dig.
beskrivning: Guider och jämförelser som hjälper dig välja rätt bilbarnstol — förklarat på svenska, utan branschjargong.
---

När vi skulle köpa vår första bilbarnstol stod jag i butiken och nickade medan säljaren sa "i-Size" och "R129" som om det var självklara ord. Det var det inte. Jag åkte hem, googlade i tre kvällar, och insåg att informationen fanns — den var bara utspridd, motsägelsefull och skriven för folk som redan förstod.

Den här sajten är vad jag önskar hade funnits då.

## Var ska du börja?

<section class="produktkort-grid">
  <article class="produktkort">
    <img src="/bilder/babyskydd.svg" alt="Bakåtvänt babyskydd i genomskärning, med bärhandtag och internbälte" loading="lazy" width="400" height="300">
    <h3>Babyskydd</h3>
    <p>Från nyfödd till ungefär sex–nio månader. Bärbart, och fästs oftast i en bas i bilen.</p>
    <p><a href="/guider/babyskydd-for-nyfodda/">Så väljer du babyskydd</a></p>
  </article>
  <article class="produktkort">
    <img src="/bilder/bakatvand.svg" alt="Bakåtvänd bilbarnstol med hög rygg och stödben mot golvet" loading="lazy" width="400" height="300">
    <h3>Bakåtvänd stol</h3>
    <p>Nästa steg, och den viktigaste investeringen. Ska räcka till minst fyra år — gärna sex–sju.</p>
    <p><a href="/guider/bakatvand-bilbarnstol-vilken-ska-jag-kopa/">Vilken ska jag köpa?</a></p>
  </article>
  <article class="produktkort">
    <img src="/bilder/framatvand.svg" alt="Framåtvänd bältesstol där bilbältet går diagonalt över barnets bröst" loading="lazy" width="400" height="300">
    <h3>Framåtvänt och bältesstol</h3>
    <p>För de större barnen, fram tills bilbältet sitter rätt utan hjälp — oftast kring 135 cm.</p>
    <p><a href="/guider/i-size-vs-vikt/">Vad reglerna säger</a></p>
  </article>
</section>

## Senaste guiderna

<ul class="artikellista">
{%- for artikel in collections.artiklar | reverse %}
  <li>
    <h2><a href="{{ artikel.url }}">{{ artikel.data.title }}</a></h2>
    <p>{{ artikel.data.ingress }}</p>
  </li>
{%- endfor %}
</ul>
