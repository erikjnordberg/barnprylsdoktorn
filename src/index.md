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
    <img src="https://placehold.co/400x300" alt="Babyskydd för nyfödda">
    <h3>Babyskydd</h3>
    <p>Den första stolen, för de allra minsta. Bärbar och fästs oftast i en bas i bilen.</p>
  </article>
  <article class="produktkort">
    <img src="https://placehold.co/400x300" alt="Bakåtvänd bilbarnstol">
    <h3>Bakåtvänd stol</h3>
    <p>Nästa steg när babyskyddet blir för litet. Den säkraste positionen så länge som möjligt.</p>
  </article>
  <article class="produktkort">
    <img src="https://placehold.co/400x300" alt="Framåtvänd bilbarnstol och bältesstol">
    <h3>Framåtvänt och bältesstol</h3>
    <p>För de större barnen, fram tills bilbältet sitter rätt utan hjälp.</p>
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
