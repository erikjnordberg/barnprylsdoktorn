// Ger varje bygge en versionsstämpel för CSS-filen, baserad på filens innehåll.
// Poängen: Cloudflare cachar /css/style.css hårt. Ändrar vi stilen men behåller
// adressen fortsätter besökare få den gamla filen. Med ?v=<hash> byter adressen
// namn så fort innehållet ändras — och bara då.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function hashaFil(relativSokvag) {
  try {
    const innehall = fs.readFileSync(path.join(__dirname, "..", relativSokvag));
    return crypto.createHash("sha1").update(innehall).digest("hex").slice(0, 8);
  } catch {
    // Saknas filen vill vi inte krascha bygget — då blir det bara ingen version.
    return "0";
  }
}

module.exports = {
  cssVersion: hashaFil("css/style.css"),
};
