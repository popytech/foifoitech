// Envoi des demandes du site via Web3Forms (https://web3forms.com).
//
// L'appel part directement du navigateur : aucun serveur n'est nécessaire, la
// page Contact reste donc une page 100 % statique, hébergeable partout.
//
// Une clé d'accès Web3Forms est liée à UNE seule adresse email. Pour que chaque
// demande arrive dans plusieurs boîtes (directeur@ et contact@), on déclare une
// clé par boîte dans `src/config/config.json` (web3forms.recipients) et on
// envoie la demande une fois par clé. Les clés d'accès Web3Forms sont publiques
// par conception : elles peuvent figurer dans le code du site.

export const DEFAULT_ENDPOINT = "https://api.web3forms.com/submit";
const REQUEST_TIMEOUT_MS = 15000;

// Corps de la requête pour une boîte donnée.
function buildPayload(accessKey, { name, email, phone, subject, message }) {
  return {
    access_key: accessKey,
    from_name: "Site FÖFÖÏ TECH",
    // Sujet de l'email reçu (visible dans la boîte de réception)
    subject: `[Site FÖFÖÏ TECH] ${subject} — ${name}`,
    // `email` sert automatiquement d'adresse de réponse (reply-to)
    name,
    email,
    phone: phone || "Non renseigné",
    sujet_demande: subject,
    message,
    origine: "Formulaire du site fofoitech.com",
  };
}

async function sendOne({ endpoint, recipient, fields, fetchImpl }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(buildPayload(recipient.access_key.trim(), fields)),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    // Web3Forms répond { success: true, ... } en cas de succès ;
    // en cas d'échec, le message se trouve dans `message` ou `body.message`.
    if (!res.ok || data.success !== true) {
      throw new Error(data?.body?.message || data?.message || `HTTP ${res.status}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Envoie la demande à chaque boîte configurée.
 * @returns {{configured: boolean, delivered: number, failed: {label: string, error: string}[]}}
 *   - configured : au moins une clé d'accès est renseignée
 *   - delivered  : nombre de boîtes qui ont bien reçu la demande
 *   - failed     : boîtes pour lesquelles l'envoi a échoué (à journaliser)
 */
export async function sendToWeb3Forms({
  fields,
  recipients = [],
  endpoint = DEFAULT_ENDPOINT,
  fetchImpl = fetch,
}) {
  const active = recipients.filter((r) => r?.access_key?.trim());
  if (!active.length) return { configured: false, delivered: 0, failed: [] };

  const results = await Promise.allSettled(
    active.map((recipient) => sendOne({ endpoint, recipient, fields, fetchImpl })),
  );

  const failed = [];
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      failed.push({
        label: active[i].label || `clé n°${i + 1}`,
        error: r.reason?.message || String(r.reason),
      });
    }
  });

  return { configured: true, delivered: active.length - failed.length, failed };
}
