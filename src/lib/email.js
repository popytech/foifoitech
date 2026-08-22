// Envoi des demandes du formulaire de contact via l'API REST Resend.
// Appel direct en `fetch` : aucune dépendance npm supplémentaire à maintenir.
// Variables d'environnement (voir .env.example) :
//   RESEND_API_KEY     — clé API Resend (obligatoire en production)
//   CONTACT_FROM_EMAIL — expéditeur, sur un domaine vérifié dans Resend
//   CONTACT_TO_EMAILS  — destinataires séparés par une virgule

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const DEFAULT_RECIPIENTS = ["nicochristoine91@gmail.com", "fofoitech22@gmail.com"];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const recipients = () =>
  (process.env.CONTACT_TO_EMAILS || "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

function buildHtml({ name, email, phone, subject, message }) {
  const row = (label, value) =>
    `<tr>
      <td style="padding:8px 12px;background:#f1f5f9;font-weight:600;white-space:nowrap;">${label}</td>
      <td style="padding:8px 12px;">${escapeHtml(value)}</td>
    </tr>`;

  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:640px;">
    <h2 style="color:#0A4B8C;margin:0 0 4px;">Nouvelle demande depuis le site</h2>
    <p style="margin:0 0 16px;color:#64748b;font-size:14px;">FÖFÖÏ TECH — formulaire de contact</p>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;border:1px solid #e2e8f0;font-size:14px;">
      ${row("Nom", name)}
      ${row("Email", email)}
      ${row("Téléphone", phone || "Non renseigné")}
      ${row("Sujet", subject)}
    </table>
    <h3 style="margin:20px 0 8px;">Message</h3>
    <p style="white-space:pre-wrap;line-height:1.6;margin:0;">${escapeHtml(message)}</p>
    <hr style="margin:24px 0;border:none;border-top:1px solid #e2e8f0;" />
    <p style="color:#64748b;font-size:12px;margin:0;">
      Répondez directement à cet email pour joindre l'expéditeur.
    </p>
  </div>`;
}

function buildText({ name, email, phone, subject, message }) {
  return [
    "Nouvelle demande depuis le site FÖFÖÏ TECH",
    "",
    `Nom       : ${name}`,
    `Email     : ${email}`,
    `Téléphone : ${phone || "Non renseigné"}`,
    `Sujet     : ${subject}`,
    "",
    "Message :",
    message,
  ].join("\n");
}

export async function sendContactEmail(fields) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = recipients().length ? recipients() : DEFAULT_RECIPIENTS;
  const from =
    process.env.CONTACT_FROM_EMAIL || "FÖFÖÏ TECH <onboarding@resend.dev>";

  if (!apiKey) {
    // En développement, on n'échoue pas silencieusement : la demande est
    // affichée dans la console pour pouvoir tester le parcours complet.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[contact] RESEND_API_KEY absente — email non envoyé. Contenu de la demande :\n" +
          buildText(fields)
      );
      return { delivered: false, reason: "missing-api-key" };
    }
    throw new Error("RESEND_API_KEY manquante dans l'environnement.");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: fields.email,
      subject: `[Site] ${fields.subject} — ${fields.name}`,
      html: buildHtml(fields),
      text: buildText(fields),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend a répondu ${response.status} : ${detail}`);
  }

  return { delivered: true };
}
