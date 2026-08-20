/* Samtycke till mätning.
   Kärnregeln: ingen förfrågan går till Google innan besökaren tryckt Godkänn.
   Därför injiceras gtag-skriptet först efter ett ja — Consent Mode ensamt
   räcker inte, eftersom även ett "denied"-anrop är ett anrop till Google.
   Valet sparas i localStorage, inte i en kaka, så att ett nej inte i sig
   kräver samtycke. */
(function () {
  "use strict";

  var skript = document.currentScript;
  var MATNINGS_ID = skript && skript.getAttribute("data-ga");
  var NYCKEL = "bpd-samtycke";
  var GILTIGT_DYGN = 365;

  if (!MATNINGS_ID) return;

  function las() {
    try {
      var rad = window.localStorage.getItem(NYCKEL);
      if (!rad) return null;
      var varde = JSON.parse(rad);
      if (!varde || typeof varde.tid !== "number") return null;
      if ((Date.now() - varde.tid) / 86400000 > GILTIGT_DYGN) return null;
      return varde.analys === true ? "ja" : "nej";
    } catch (fel) {
      return null;
    }
  }

  function spara(svar) {
    try {
      window.localStorage.setItem(
        NYCKEL,
        JSON.stringify({ analys: svar === "ja", tid: Date.now() })
      );
    } catch (fel) {
      /* Privat läge eller blockerad lagring — valet gäller då bara sidvisningen. */
    }
  }

  function laddaAnalytics() {
    if (window.__bpdGaLaddad) return;
    window.__bpdGaLaddad = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    /* Consent Mode v2. Vi annonserar inte via Google, så ad_*-flaggorna
       står kvar på denied även efter ett ja. */
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "granted",
      security_storage: "granted"
    });
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", MATNINGS_ID);

    var s = document.createElement("script");
    s.async = true;
    s.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(MATNINGS_ID);
    document.head.appendChild(s);
  }

  var banner = null;

  /* Escape lyssnas av på dokumentet, inte på bannern: fokus ligger normalt kvar
     i sidan när bannern dyker upp, och då bubblar tangenttrycket aldrig dit. */
  function vidTangent(handelse) {
    if (handelse.key === "Escape") svara("nej");
  }

  function stang() {
    if (!banner) return;
    document.removeEventListener("keydown", vidTangent);
    banner.parentNode.removeChild(banner);
    banner = null;
  }

  function svara(svar) {
    spara(svar);
    stang();
    if (svar === "ja") laddaAnalytics();
  }

  function visa(flyttaFokus) {
    if (banner) return;

    banner = document.createElement("div");
    banner.className = "samtycke";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "samtycke-rubrik");
    banner.setAttribute("aria-describedby", "samtycke-text");
    banner.setAttribute("tabindex", "-1");
    banner.innerHTML =
      '<div class="samtycke-inner">' +
      '<div class="samtycke-text-block">' +
      '<h2 id="samtycke-rubrik">Får vi mäta besöket?</h2>' +
      '<p id="samtycke-text">Med Google Analytics ser vi vilka guider som faktiskt läses. ' +
      "Det kräver kakor och att din IP-adress skickas till Google. Säger du nej mäts " +
      "ingenting och sajten fungerar precis likadant. " +
      '<a href="/integritetspolicy/">Så hanterar vi uppgifter</a></p>' +
      "</div>" +
      '<div class="samtycke-knappar">' +
      '<button type="button" class="samtycke-knapp samtycke-ja">Godkänn</button>' +
      '<button type="button" class="samtycke-knapp samtycke-nej">Neka</button>' +
      "</div>" +
      "</div>";

    banner.querySelector(".samtycke-ja").addEventListener("click", function () {
      svara("ja");
    });
    banner.querySelector(".samtycke-nej").addEventListener("click", function () {
      svara("nej");
    });
    /* Först i body: tangentbordsbesökare når bannern innan sidhuvudet,
       utan att fokus rycks från den som redan börjat läsa. */
    document.body.insertBefore(banner, document.body.firstChild);
    /* Escape räknas som nej. Att neka ska aldrig vara svårare än att godkänna. */
    document.addEventListener("keydown", vidTangent);
    if (flyttaFokus) banner.focus();
  }

  function start() {
    var val = las();
    if (val === "ja") laddaAnalytics();
    else if (val === null) visa(false);

    var knappar = document.querySelectorAll("[data-samtycke-oppna]");
    for (var i = 0; i < knappar.length; i++) {
      knappar[i].addEventListener("click", function () {
        visa(true);
      });
    }
  }

  window.barnprylsdoktorn = window.barnprylsdoktorn || {};
  window.barnprylsdoktorn.samtycke = { oppna: function () { visa(true); }, status: las };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
