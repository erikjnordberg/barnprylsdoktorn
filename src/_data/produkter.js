// Produktdata för köpblocken i guiderna. Artiklarna refererar bara till en nyckel
// via {% kopblock "nyckel" %}.
//
// "url" är handlarens riktiga produktsida — spårningen läggs på av eleventy.config.js,
// klistra alltså aldrig in en färdig Adtraction-länk här. Saknas "url" renderas blocket
// utan knapp och utan annonsmärkning.
//
// Inget pris här med flit: handlarnas priser rör sig varje vecka, och en siffra i
// köpblocket skulle bli fel utan att någon märkte det. Ungefärliga priser står i
// tabellerna i löptexten, med Folksam som källa och tydligt förbehåll.
module.exports = {
  "britax-max-safe-pro": {
    namn: "Britax Römer Max-Safe Pro",
    specifikation: "61–125 cm · max 36 kg · bältesmonterad · Plustestad",
    motivering:
      "Högst betyg, lägst pris och högst viktgräns av de tre — bäst om du vill slippa fundera mer.",
    url: "https://www.babysam.se/britax-roemer-max-safe-pro-bilbarnstol-space-black-onesize",
    handlare: "Babysam",
  },
  "besafe-beyond": {
    namn: "BeSafe Beyond",
    specifikation:
      "61–125 cm · max 22 kg · Isofix, basen säljs separat · Plustestad",
    motivering:
      "Vrids mot dörren vid i- och urlyft och går att luta med en hand — bekvämast om ryggen eller en trång parkering är problemet. Isofix-basen säljs separat och tillkommer.",
    // Ingen länk med flit. Babysam säljer bara efterföljaren BeSafe Beyond², och det
    // är inte den stol Folksam testade 2025. Att länka dit vore att tillskriva en
    // annan produkt ett testresultat den inte har.
    url: "",
    handlare: "",
  },
  "tinyseats-two": {
    namn: "TinySeats Two",
    specifikation:
      "Bakåtvänt till 125 cm / 23 kg · sedan bältesstol till 135 cm · Isofix · inte Plustestad",
    motivering:
      "Hopfällbar och lätt att resa med, men inte Plustestad — läs varningen om felmontering innan du väljer den.",
    url: "https://www.babysam.se/tinyseats-two-bilbarnstol-baelteskudde-onesize",
    handlare: "Babysam",
  },
};
