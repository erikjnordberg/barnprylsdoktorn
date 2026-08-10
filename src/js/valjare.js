/* Bilbarnstolsväljaren.
 *
 * Tre frågor in, en kategori ut. Ingen produkt, ingen modell — bara vilken
 * sorts stol som gäller just nu, plus länk till guiden som förklarar varför.
 * Allt körs i webbläsaren, ingenting sparas och ingenting skickas någonstans.
 *
 * Siffrorna i svaren är belagda mot Transportstyrelsen och NTF. Ändra dem inte
 * utan att kontrollera källan först — det här är YMYL-innehåll.
 */
(function () {
  "use strict";

  var form = document.getElementById("valjare");
  var svarRuta = document.getElementById("valjare-svar");
  var status = document.getElementById("valjare-status");
  if (!form || !svarRuta || !status) return;

  /* ---------- Innehållet i svaren ---------- */

  var SVAR = {
    babyskydd: {
      rubrik: "Babyskydd",
      sammanfattning:
        "Bakåtvänt babyskydd med internbälte och bärhandtag. Den första stolen, och den enda som är byggd för att bära barnet in och ut ur bilen.",
      punkter: [
        "Nya stolar säljs sedan 1 september 2024 bara enligt UN R129, som godkänner efter barnets längd i stället för vikt.",
        "Välj gärna en plustestad stol. Plustestet mäter nackkrafterna i en frontalkrock och hittills har bara bakåtvända stolar klarat det.",
        "Babyskyddet är urvuxet när barnets huvud når överkanten — inte när benen ser trångt placerade ut."
      ],
      lankar: [
        { url: "/guider/babyskydd-for-nyfodda/", text: "Så väljer du babyskydd" },
        { url: "/guider/bilbarnstol-fram-och-airbag/", text: "Babyskydd i framsätet och krockkudden" }
      ]
    },

    bakatvand: {
      rubrik: "Bakåtvänd bilbarnstol",
      sammanfattning:
        "Steget efter babyskyddet, och det köp som betyder mest. Välj en stol som klarar bakåtvänt hela vägen till 25 kg eller 125 cm, så räcker den i flera år.",
      punkter: [
        "NTF rekommenderar bakåtvänt så länge det är möjligt, minst till 4–5 års ålder. Trånga ben är inte ett skäl att vända.",
        "Stolen är urvuxen när barnets ögon är i höjd med stolens övre kant, eller när stolens längd- eller viktgräns passerats.",
        "Små barn i framåtvända stolar löper fem gånger högre risk att dödas eller skadas svårt än barn i bakåtvända, enligt Transportstyrelsen."
      ],
      lankar: [
        { url: "/guider/bakatvand-bilbarnstol-vilken-ska-jag-kopa/", text: "Vilken bakåtvänd stol ska jag köpa?" },
        { url: "/guider/montera-bilbarnstol-steg-for-steg/", text: "Montera stolen steg för steg" }
      ]
    },

    urvuxentest: {
      rubrik: "Sitt kvar bakåtvänt — om stolen inte är urvuxen",
      sammanfattning:
        "I den här längden går det åt båda hållen, och svaret sitter i stolen snarare än i barnet. Gör urvuxen-testet innan du byter.",
      punkter: [
        "Titta på ögonhöjden. Är ögonen fortfarande under stolens övre kant och längd- eller viktgränsen inte passerad, sitt kvar bakåtvänt.",
        "Är stolen urvuxen: gå till bältesstol med ryggstöd, inte till en lös bälteskudde.",
        "Ingen framåtvänd stol klarar Plustestet. Varje extra månad bakåtvänt är den billigaste säkerhetsuppgradering du kan göra."
      ],
      lankar: [
        { url: "/guider/baltesstol-eller-balteskudde/", text: "Bältesstol eller bälteskudde — när är det dags?" },
        { url: "/guider/bakatvand-bilbarnstol-vilken-ska-jag-kopa/", text: "Bakåtvända stolar som räcker längre" }
      ]
    },

    baltesstol: {
      rubrik: "Bältesstol med ryggstöd",
      sammanfattning:
        "Barnet sitter i bilens eget trepunktsbälte, och stolens uppgift är att styra bältet rätt över kroppen. Ryggstödet är det som gör jobbet.",
      punkter: [
        "Ryggstödet håller diagonalbältet kvar på axeln när bilen gör en undanmanöver. En lös kudde gör inte det.",
        "Lagen släpper barnet först vid 135 cm. Läkare och forskare rekommenderar bältesstol eller bälteskudde ända till 10–12 år.",
        "Bältet ska ligga mitt på axeln och lågt över höftbenen — aldrig över halsen eller magen."
      ],
      lankar: [
        { url: "/guider/baltesstol-eller-balteskudde/", text: "Bältesstol eller bälteskudde" },
        { url: "/guider/vanliga-monteringsfel/", text: "Sex vanliga fel — och minutkontrollen" }
      ]
    },

    balteskudde: {
      rubrik: "Bältesstol i första hand — bälteskudde är tillåtet",
      sammanfattning:
        "Barnet är långt nog för en lös bälteskudde, men bältesstolen med rygg är fortfarande det bättre valet så länge den passar.",
      punkter: [
        "Nya bälteskuddar får bara användas av barn som är längre än 125 cm. Kontrollera etiketten.",
        "Under 135 cm krävs en särskild skyddsanordning enligt lag — kudden räcker, men bältesstolen skyddar bättre i en undanmanöver.",
        "En bältesmonterad kudde måste knäppas fast med bilbältet även när den står tom, annars blir den ett löst föremål i en krock."
      ],
      lankar: [
        { url: "/guider/baltesstol-eller-balteskudde/", text: "Skillnaden mellan bältesstol och bälteskudde" },
        { url: "/guider/vanliga-monteringsfel/", text: "Sex vanliga fel — och minutkontrollen" }
      ]
    },

    klar: {
      rubrik: "Lagen kräver inget mer — rekommendationen gör det",
      sammanfattning:
        "Över 135 cm får barnet åka på enbart bilbälte. Men gränsen i lagen är inte samma sak som gränsen där bältet faktiskt sitter rätt.",
      punkter: [
        "Läkare och forskare rekommenderar bältesstol eller bälteskudde tills barnet är 10–12 år, oavsett vad lagen tillåter.",
        "Testet är enkelt: sitter barnet med rak rygg mot ryggstödet, med knäna böjda över sittkanten och bältet mitt på axeln? Då är bältet moget för barnet.",
        "Framsätet med inkopplad krockkudde är säkert först vid 140 cm enligt Transportstyrelsen."
      ],
      lankar: [
        { url: "/guider/baltesstol-eller-balteskudde/", text: "När barnet växer ur bältesstolen" },
        { url: "/guider/bilbarnstol-fram-och-airbag/", text: "Framsätet, krockkudden och 140 cm-gränsen" }
      ]
    }
  };

  /* ISOFIX-tillägget beror på både svaret och bilen. Viktgränsen på 33 kg gäller
     bara stolar där barnet hålls av stolens internbälte — i en bältesstol är det
     bilens eget bälte som håller barnet, och då spelar den ingen roll. */
  var INTERNBALTE = { babyskydd: true, bakatvand: true, urvuxentest: true };

  function isofixText(kategori, isofix) {
    var harInternbalte = INTERNBALTE[kategori] === true;

    if (isofix === "ja") {
      return harInternbalte
        ? "Bilen har ISOFIX: barnet och stolen får tillsammans väga högst 33 kg vid bakåtvänt åkande och vid framåtvänt med internbälte. Har bilen en märkt i-Size-plats är den extra kontrollerad för utrymme och stödben."
        : "Bilen har ISOFIX: det håller stolen på plats mellan gångerna, men viktgränsen på 33 kg gäller inte här. I en bältesstol eller bälteskudde är det bilens eget bälte som håller barnet.";
    }

    if (isofix === "nej") {
      return harInternbalte
        ? "Bilen saknar ISOFIX: en bältesmonterad stol är inte sämre. Flera av de bakåtvända stolar som klarat Plustestet monteras med bilbälte. Kontrollera bara stolens fordonslista så att den är godkänd för din bil och den plats du tänkt använda."
        : "Bilen saknar ISOFIX: det gör ingen skillnad för säkerheten här. Kom bara ihåg att knäppa fast stolen med bältet även när den står tom.";
    }

    return "Osäker på om bilen har ISOFIX? Fästena sitter i springan mellan sits och ryggstöd i baksätet, ofta märkta med en liten etikett eller täckta av en plastflik. Står det inget i instruktionsboken finns de troligen inte.";
  }

  /* ---------- Logiken ---------- */

  /* Ålder går före längd för de yngsta. Ett litet barn ska aldrig hamna på
     bälteskudde, hur långt det än är. Först från fyra år är det längden som
     avgör, eftersom R129 godkänner stolar efter centimeter. */
  function bestamKategori(alder, langd) {
    if (alder === "nyfodd") return "babyskydd";
    if (alder === "under1") {
      return langd === "under85" || langd === "vetinte" ? "babyskydd" : "bakatvand";
    }
    if (alder === "1-4") return "bakatvand";

    if (langd === "over135") return "klar";
    if (langd === "125-135") return "balteskudde";
    if (langd === "under85" || langd === "85-105") return "bakatvand";

    // 105–125 cm eller okänd längd — gränslandet där stolen, inte barnet, avgör
    return alder === "7plus" ? "baltesstol" : "urvuxentest";
  }

  /* ---------- Rendering ---------- */

  function element(tagg, klass, text) {
    var el = document.createElement(tagg);
    if (klass) el.className = klass;
    if (text) el.textContent = text;
    return el;
  }

  function rita(kategori, isofix) {
    var svar = SVAR[kategori];
    svarRuta.textContent = "";

    svarRuta.appendChild(element("p", "valjare-etikett", "Det här behöver ni"));
    svarRuta.appendChild(element("h2", "valjare-rubrik", svar.rubrik));
    svarRuta.appendChild(element("p", "valjare-sammanfattning", svar.sammanfattning));

    var lista = element("ul", "valjare-punkter");
    svar.punkter.forEach(function (punkt) {
      lista.appendChild(element("li", null, punkt));
    });
    svarRuta.appendChild(lista);

    svarRuta.appendChild(element("p", "valjare-isofix", isofixText(kategori, isofix)));

    var lankar = svar.lankar.slice();
    if (isofix) {
      lankar.push({ url: "/guider/isofix-eller-balte/", text: "ISOFIX eller bälte — vad ska jag välja?" });
    }

    var lankLista = element("ul", "valjare-lankar");
    lankar.forEach(function (lank) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = lank.url;
      a.textContent = lank.text;
      li.appendChild(a);
      lankLista.appendChild(li);
    });
    svarRuta.appendChild(lankLista);

    /* Adressen bär svaret, men ingen förstår det om vi inte säger det.
       Det här är hela poängen med att väljaren ska gå att länka till. */
    svarRuta.appendChild(
      element(
        "p",
        "valjare-delahint",
        "Länken till den här sidan innehåller ert svar. Klistrar du in den i en tråd eller ett meddelande får nästa förälder samma svar direkt, utan att klicka sig igenom frågorna."
      )
    );

    var knappar = element("div", "valjare-knappar");

    var dela = element("button", "valjare-dela", "Kopiera länk till svaret");
    dela.type = "button";
    dela.addEventListener("click", function () {
      kopieraAdress(function (lyckades) {
        dela.textContent = lyckades
          ? "Länken är kopierad"
          : "Kopiera adressen i adressfältet";
        window.setTimeout(function () {
          dela.textContent = "Kopiera länk till svaret";
        }, 4000);
      });
    });
    knappar.appendChild(dela);

    var omstart = element("button", "valjare-omstart", "Börja om");
    omstart.type = "button";
    omstart.addEventListener("click", function () {
      form.reset();
      svarRuta.hidden = true;
      svarRuta.textContent = "";
      status.hidden = false;
      history.replaceState(null, "", location.pathname);
      var forsta = form.querySelector("input");
      if (forsta) forsta.focus();
      if (typeof form.scrollIntoView === "function") {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    knappar.appendChild(omstart);
    svarRuta.appendChild(knappar);

    svarRuta.hidden = false;
    status.hidden = true;
  }

  /* Kopiering utan tredjepartsanrop och utan att något lämnar webbläsaren.
     Clipboard API först, den gamla execCommand-vägen som reserv för äldre
     webbläsare, och misslyckas båda säger knappen till i stället för att
     låtsas att det gick. */
  function kopieraAdress(nar) {
    var adress = location.href;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(adress).then(
        function () { nar(true); },
        function () { nar(reservkopiering(adress)); }
      );
      return;
    }

    nar(reservkopiering(adress));
  }

  function reservkopiering(text) {
    var ruta = document.createElement("textarea");
    ruta.value = text;
    ruta.setAttribute("readonly", "");
    ruta.setAttribute("aria-hidden", "true");
    ruta.style.position = "fixed";
    ruta.style.top = "-1000px";
    document.body.appendChild(ruta);

    var lyckades = false;
    try {
      ruta.select();
      lyckades = document.execCommand("copy");
    } catch (e) {
      lyckades = false;
    }

    document.body.removeChild(ruta);
    return lyckades;
  }

  /* ---------- Läsa och skriva svaren ---------- */

  function valt(namn) {
    var kryssad = form.querySelector('input[name="' + namn + '"]:checked');
    return kryssad ? kryssad.value : null;
  }

  function uppdatera(skrivAdress) {
    var alder = valt("alder");
    var langd = valt("langd");
    var isofix = valt("isofix");

    if (!alder || !langd || !isofix) {
      svarRuta.hidden = true;
      status.hidden = false;
      return;
    }

    rita(bestamKategori(alder, langd), isofix);

    // Adressen blir delbar: klistrar man in den i ett forum får nästa förälder
    // samma svar utan att klicka sig igenom frågorna.
    if (skrivAdress) {
      history.replaceState(
        null,
        "",
        location.pathname + "?a=" + alder + "&l=" + langd + "&i=" + isofix
      );
    }
  }

  function lasAdress() {
    var params = new URLSearchParams(location.search);
    var karta = { alder: params.get("a"), langd: params.get("l"), isofix: params.get("i") };
    var nagotSattes = false;

    Object.keys(karta).forEach(function (namn) {
      if (!karta[namn]) return;
      var input = form.querySelector(
        'input[name="' + namn + '"][value="' + CSS.escape(karta[namn]) + '"]'
      );
      if (input) {
        input.checked = true;
        nagotSattes = true;
      }
    });

    if (nagotSattes) uppdatera(false);
  }

  form.addEventListener("change", function () {
    uppdatera(true);
  });

  // Formuläret har ingen skicka-knapp, men enter i ett radioset kan trigga submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  if (window.CSS && typeof CSS.escape === "function" && window.URLSearchParams) {
    lasAdress();
  }
})();
