// Kopia av erikjnordberg/getseeneverywhere paket/botlogg/agents.mjs, 2026-11-28. Ändra där och kopiera hit, aldrig tvärtom.
/**
 * Botloggen för statiska sajter på Cloudflare Pages (spec 005). Vilka
 * AI-tjänster som hämtar sidorna, och hur många besök som kommer via en länk
 * i en AI-tjänst.
 *
 * Originalet ligger här, i erikjnordberg/getseeneverywhere. Sajterna har en
 * oförändrad kopia med källa och datum på första raden. Ändra här och kopiera
 * ut, aldrig tvärtom.
 *
 * Agentlistan, kategorierna och AI-källorna är en översättning av Räntefacits
 * lib/agents.ts (2026-11-28). Id:t är det som sparas, så id:n och ordning ska
 * vara exakt desamma, annars går sajterna inte att jämföra. agents.test.mjs
 * prövar det mot en fixtur.
 *
 * Bara etiketter och antal: ingen user-agent-sträng, ingen IP och ingen
 * referer-URL sparas. Inga beroenden, så att filen går att köra både i en
 * Pages Function och i node --test.
 */

// --- Botmönstret ------------------------------------------------------------

// Trubbig medvetet, samma som Räntefacit: sökrobotar, förhandsvisningar i
// chattar, driftövervakning och skript, inte varje tänkbar automat.
export const BOT_UA =
  /bot|crawl|spider|slurp|search|preview|monitor|uptime|pingdom|headless|lighthouse|curl|wget|python-requests|axios|node-fetch|facebookexternalhit|embedly/i;

export function isPrefetchRequest(headers) {
  if (headers.get("purpose") === "prefetch") return true;
  if (headers.get("sec-purpose")?.includes("prefetch")) return true;
  if (headers.get("x-purpose") === "prefetch") return true;
  if (headers.get("x-moz") === "prefetch") return true;
  return false;
}

export function isBotUserAgent(headers) {
  const ua = headers.get("user-agent");
  if (!ua) return true;
  return BOT_UA.test(ua);
}

// --- Agenterna --------------------------------------------------------------

export const AGENT_KATEGORIER = ["anvandare", "ai-sok", "traning", "sokmotor", "annan-bot"];

/**
 * Kända agenter i den ordning de prövas. Byt aldrig namn på ett befintligt
 * id, då bryts serien. Kategorierna betyder samma sak som i Räntefacit:
 * anvandare hämtar sidan för att en människa frågat något, ai-sok bygger ett
 * AI-sökindex, traning samlar text till modeller, sokmotor är vanliga
 * sökmotorer som jämförelse.
 */
export const AGENTER = [
  { id: "ChatGPT-User", monster: /ChatGPT-User/i, kategori: "anvandare" },
  { id: "Claude-User", monster: /Claude-User/i, kategori: "anvandare" },
  { id: "Claude-Agent", monster: /Claude-Agent/i, kategori: "anvandare" },
  { id: "Perplexity-User", monster: /Perplexity-User/i, kategori: "anvandare" },
  { id: "MistralAI-User", monster: /MistralAI-User/i, kategori: "anvandare" },
  { id: "Meta-ExternalFetcher", monster: /Meta-ExternalFetcher/i, kategori: "anvandare" },
  { id: "Google-NotebookLM", monster: /Google-NotebookLM/i, kategori: "anvandare" },

  { id: "OAI-SearchBot", monster: /OAI-SearchBot/i, kategori: "ai-sok" },
  { id: "Claude-SearchBot", monster: /Claude-SearchBot/i, kategori: "ai-sok" },
  { id: "PerplexityBot", monster: /PerplexityBot/i, kategori: "ai-sok" },
  { id: "DuckAssistBot", monster: /DuckAssistBot/i, kategori: "ai-sok" },
  { id: "Meta-WebIndexer", monster: /Meta-WebIndexer/i, kategori: "ai-sok" },

  { id: "GPTBot", monster: /GPTBot/i, kategori: "traning" },
  { id: "ClaudeBot", monster: /ClaudeBot/i, kategori: "traning" },
  { id: "CCBot", monster: /CCBot/i, kategori: "traning" },
  { id: "Bytespider", monster: /Bytespider/i, kategori: "traning" },
  { id: "Meta-ExternalAgent", monster: /Meta-ExternalAgent/i, kategori: "traning" },
  { id: "Amazonbot", monster: /Amazonbot/i, kategori: "traning" },

  { id: "Googlebot", monster: /Googlebot/i, kategori: "sokmotor" },
  { id: "Bingbot", monster: /bingbot/i, kategori: "sokmotor" },
  { id: "Applebot", monster: /Applebot/i, kategori: "sokmotor" },
];

/** Etiketten för allt som ser ut som en bot men inte står i listan. */
export const ANNAN_AGENT = "annan";

/**
 * Översätter en user-agent till en etikett ur listan, eller annan-bot om den
 * bara matchar det breda mönstret (eller saknas). null betyder en vanlig
 * webbläsare.
 */
export function classifyAgent(ua) {
  if (!ua) return { agent: ANNAN_AGENT, kategori: "annan-bot" };
  for (const a of AGENTER) {
    if (a.monster.test(ua)) return { agent: a.id, kategori: a.kategori };
  }
  if (BOT_UA.test(ua)) return { agent: ANNAN_AGENT, kategori: "annan-bot" };
  return null;
}

// --- Klick från AI-tjänster -------------------------------------------------

export const AI_KALLOR = ["chatgpt", "perplexity", "claude", "gemini", "copilot", "annan-ai", "mcp"];

const AI_HOSTS = [
  [/(^|\.)(chatgpt\.com|chat\.openai\.com)$/i, "chatgpt"],
  [/(^|\.)perplexity\.ai$/i, "perplexity"],
  [/(^|\.)claude\.ai$/i, "claude"],
  [/(^|\.)(gemini|bard)\.google\.com$/i, "gemini"],
  [/(^|\.)copilot\.microsoft\.com$/i, "copilot"],
  [
    /(^|\.)(chat\.mistral\.ai|meta\.ai|grok\.com|chat\.deepseek\.com|you\.com|poe\.com|phind\.com)$/i,
    "annan-ai",
  ],
];

const AI_UTM = [
  [/chatgpt|openai/i, "chatgpt"],
  [/perplexity/i, "perplexity"],
  [/claude/i, "claude"],
  [/gemini/i, "gemini"],
  [/copilot/i, "copilot"],
];

/**
 * Vilken AI-tjänst ett besök kom från, eller null. Samma ordning som
 * Räntefacit: utm_medium=mcp, sedan referern, sist utm_source.
 */
export function classifyAiReferral(referer, utmSource, utmMedium = null) {
  if (utmMedium?.toLowerCase() === "mcp") return "mcp";
  if (referer) {
    try {
      const host = new URL(referer).hostname;
      for (const [monster, kalla] of AI_HOSTS) {
        if (monster.test(host)) return kalla;
      }
    } catch {
      // En referer som inte är en URL säger ingenting — pröva utm i stället.
    }
  }
  if (utmSource) {
    for (const [monster, kalla] of AI_UTM) {
      if (monster.test(utmSource)) return kalla;
    }
  }
  return null;
}

/**
 * En riktig sidladdning i en webbläsare: inte förhämtning och inte en bot.
 * Sec-Fetch-Dest saknas i äldre webbläsare; då får Accept-huvudet avgöra.
 */
export function isDocumentRequest(headers) {
  if (isPrefetchRequest(headers)) return false;
  if (isBotUserAgent(headers)) return false;
  const dest = headers.get("sec-fetch-dest");
  if (dest) return dest === "document";
  return (headers.get("accept") ?? "").includes("text/html");
}

// --- Sökvägarna -------------------------------------------------------------

export const ANNAN_SOKVAG = "[annan]";

/** Filerna på fast adress som räknas utöver sidorna i sitemapen. */
export const FASTA_SOKVAGAR = ["/robots.txt", "/sitemap.xml", "/feed.xml", "/llms.txt"];

/**
 * Sökvägen som den sparas: utan frågesträng, och bara om den står i
 * sitemapen eller bland de fasta filerna. Allt annat blir [annan], så att
 * skannrarnas påhittade adresser inte kan växa tabellen. En sida utan
 * avslutande snedstreck räknas som samma sida med.
 */
export function normalizePath(pathname, kanda) {
  if (kanda.has(pathname)) return pathname;
  if (!pathname.endsWith("/") && kanda.has(pathname + "/")) return pathname + "/";
  if (pathname.endsWith("/index.html")) {
    const utan = pathname.slice(0, -"index.html".length);
    if (kanda.has(utan)) return utan;
  }
  return ANNAN_SOKVAG;
}

// --- Räkningen ----------------------------------------------------------------

const SQL_AGENT = `INSERT INTO agent_visit_count (sajt, dag, agent, kategori, sokvag, n)
VALUES (?1, date('now'), ?2, ?3, ?4, 1)
ON CONFLICT (sajt, dag, agent, sokvag) DO UPDATE SET n = n + 1`;

const SQL_KLICK = `INSERT INTO ai_referral_count (sajt, dag, kalla, sokvag, n)
VALUES (?1, date('now'), ?2, ?3, 1)
ON CONFLICT (sajt, dag, kalla, sokvag) DO UPDATE SET n = n + 1`;

/**
 * Vad en förfrågan ska räknas som, eller null. Ren funktion, så att den går
 * att testa utan databas.
 */
export function vadRaknas(request, kanda) {
  const url = new URL(request.url);
  const sokvag = normalizePath(url.pathname, kanda);
  const agent = classifyAgent(request.headers.get("user-agent"));
  if (agent) return { tabell: "agent", ...agent, sokvag };
  if (!isDocumentRequest(request.headers)) return null;
  const kalla = classifyAiReferral(
    request.headers.get("referer"),
    url.searchParams.get("utm_source"),
    url.searchParams.get("utm_medium")
  );
  return kalla ? { tabell: "klick", kalla, sokvag } : null;
}

/**
 * Skriver en räkning till D1. Kastar aldrig: ett trasigt mått får aldrig
 * påverka sidan.
 */
export async function skriv(db, sajt, rakning) {
  try {
    const stmt =
      rakning.tabell === "agent"
        ? db.prepare(SQL_AGENT).bind(sajt, rakning.agent, rakning.kategori, rakning.sokvag)
        : db.prepare(SQL_KLICK).bind(sajt, rakning.kalla, rakning.sokvag);
    await stmt.run();
  } catch (err) {
    console.error("botlogg:", err?.message ?? err);
  }
}

/**
 * Hela middlewaret, så att sajternas functions/_middleware.js bara behöver
 * skicka in listan över kända sidor. Svaret hämtas först och lämnas alltid
 * oförändrat; skrivningen läggs på waitUntil.
 */
export function skapaMiddleware(kanda) {
  return async function onRequest(context) {
    const svar = await context.next();
    try {
      const db = context.env?.BOTLOGG;
      const sajt = context.env?.SAJT;
      if (db && sajt) {
        const rakning = vadRaknas(context.request, kanda);
        if (rakning) context.waitUntil(skriv(db, sajt, rakning));
      }
    } catch (err) {
      console.error("botlogg:", err?.message ?? err);
    }
    return svar;
  };
}
