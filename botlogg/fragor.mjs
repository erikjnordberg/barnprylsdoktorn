// Kopia av erikjnordberg/getseeneverywhere paket/botlogg/fragor.mjs, 2026-11-28. Ändra där och kopiera hit, aldrig tvärtom.
/**
 * Botloggens frågor för dashboardarna (spec 005). Originalet ligger i
 * erikjnordberg/getseeneverywhere; sajterna har en oförändrad kopia, så att
 * två dashboardar aldrig räknar olika.
 *
 * Läser via D1:s REST-API med en token som bara har läsrätt till D1. Bara
 * aggregat lämnar databasen, och bara för den egna sajten. Ingen källa får
 * fälla körningen: saknas nyckeln, eller går anropet fel, blir svaret
 * { tillganglig: false, orsak } och panelen ritas som "inte kopplat än".
 */

export const KATEGORI_ORDNING = ["anvandare", "ai-sok", "traning", "sokmotor", "annan-bot"];

export const KATEGORI_ETIKETTER = {
  anvandare: "Åt en användare",
  "ai-sok": "AI-sökindex",
  traning: "Träning",
  sokmotor: "Sökmotor",
  "annan-bot": "Annan bot",
};

export const KALLA_ETIKETTER = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  copilot: "Copilot",
  "annan-ai": "Annan AI-tjänst",
  mcp: "Svar från MCP-servern",
};

/** Frågorna. ?1 är alltid sajten. Dagarna räknas bakåt från i dag (UTC). */
export const FRAGOR = {
  perAgent: `SELECT kategori, agent, SUM(n) AS n FROM agent_visit_count
    WHERE sajt = ?1 AND dag >= date('now', '-29 days')
    GROUP BY kategori, agent ORDER BY n DESC, agent`,
  perVecka: `SELECT strftime('%Y-%W', dag) AS vecka, MIN(dag) AS fran, kategori, SUM(n) AS n
    FROM agent_visit_count
    WHERE sajt = ?1 AND dag >= date('now', '-55 days')
    GROUP BY vecka, kategori ORDER BY vecka`,
  toppsidor: `SELECT sokvag, SUM(n) AS n FROM agent_visit_count
    WHERE sajt = ?1 AND dag >= date('now', '-29 days') AND kategori != 'annan-bot'
    GROUP BY sokvag ORDER BY n DESC, sokvag LIMIT 10`,
  klick: `SELECT kalla, SUM(n) AS n FROM ai_referral_count
    WHERE sajt = ?1 AND dag >= date('now', '-29 days')
    GROUP BY kalla ORDER BY n DESC, kalla`,
};

/** En D1-fråga över REST. Kastar vid fel; hamtaAgenter fångar. */
export function d1Klient({ konto, databas, token, fetchFn = fetch }) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${konto}/d1/database/${databas}/query`;
  return async function fraga(sql, params) {
    const svar = await fetchFn(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ sql, params }),
    });
    const kropp = await svar.json().catch(() => ({}));
    if (!svar.ok || kropp.success === false) {
      const fel = kropp.errors?.[0]?.message ?? `HTTP ${svar.status}`;
      throw new Error(`D1: ${fel}`);
    }
    return kropp.result?.[0]?.results ?? [];
  };
}

/** Kategorierna i fast ordning, med agenterna under. */
export function grupperaPerKategori(rader) {
  return KATEGORI_ORDNING.map((kategori) => {
    const agenter = rader
      .filter((r) => r.kategori === kategori)
      .map((r) => ({ agent: r.agent, n: Number(r.n) }));
    return {
      kategori,
      etikett: KATEGORI_ETIKETTER[kategori],
      n: agenter.reduce((s, a) => s + a.n, 0),
      agenter,
    };
  });
}

/** En rad per vecka, med antal per kategori. */
export function grupperaPerVecka(rader) {
  const veckor = new Map();
  for (const r of rader) {
    const v = veckor.get(r.vecka) ?? { vecka: r.vecka, fran: r.fran, per: {} };
    if (r.fran < v.fran) v.fran = r.fran;
    v.per[r.kategori] = Number(r.n);
    veckor.set(r.vecka, v);
  }
  return [...veckor.values()];
}

/**
 * Hela panelens data. miljo är process.env: CF_D1_TOKEN, CF_ACCOUNT_ID och
 * BOTLOGG_DB_ID. sajt är värdet i Pages-variabeln SAJT.
 */
export async function hamtaAgenter(miljo, sajt, fetchFn = fetch) {
  const token = miljo.CF_D1_TOKEN;
  const konto = miljo.CF_ACCOUNT_ID;
  const databas = miljo.BOTLOGG_DB_ID;
  if (!token || !konto || !databas) {
    return { tillganglig: false, orsak: "CF_D1_TOKEN, CF_ACCOUNT_ID eller BOTLOGG_DB_ID saknas" };
  }
  try {
    const fraga = d1Klient({ konto, databas, token, fetchFn });
    const [perAgent, perVecka, toppsidor, klick] = await Promise.all([
      fraga(FRAGOR.perAgent, [sajt]),
      fraga(FRAGOR.perVecka, [sajt]),
      fraga(FRAGOR.toppsidor, [sajt]),
      fraga(FRAGOR.klick, [sajt]),
    ]);
    return {
      tillganglig: true,
      sajt,
      kategorier: grupperaPerKategori(perAgent),
      veckor: grupperaPerVecka(perVecka),
      toppsidor: toppsidor.map((r) => ({ sokvag: r.sokvag, n: Number(r.n) })),
      klick: klick.map((r) => ({
        kalla: r.kalla,
        etikett: KALLA_ETIKETTER[r.kalla] ?? r.kalla,
        n: Number(r.n),
      })),
    };
  } catch (e) {
    return { tillganglig: false, orsak: e.message };
  }
}
