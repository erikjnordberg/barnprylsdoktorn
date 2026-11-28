// Botloggen (spec 005 i erikjnordberg/getseeneverywhere): räknar agentbesök
// och klick från AI-tjänster per dag och sida i D1-databasen botlogg.
// Bindningen BOTLOGG och variabeln SAJT sätts i Pages-projektet. Saknas de
// räknas ingenting och sidan serveras som vanligt.
//
// _sokvagar.json skrivs av eleventy.config.js efter varje bygge, ur
// sitemapen och nedladdningarna, så att en ny guide räknas med sin
// egen sökväg av sig själv.
// _routes.json i src/ håller funktionen borta från CSS, JS, typsnitt och bilder.
import { FASTA_SOKVAGAR, skapaMiddleware } from "../botlogg/agents.mjs";
import sidor from "./_sokvagar.json";

export const onRequest = skapaMiddleware(new Set([...sidor, ...FASTA_SOKVAGAR]));
