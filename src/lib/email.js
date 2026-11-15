// Envoi des demandes du formulaire de contact par SMTP, depuis la boîte mail de
// l'entreprise (aucun service tiers, aucun compte supplémentaire).
//
// Variables d'environnement (à définir chez l'hébergeur, JAMAIS dans le code) :
//   SMTP_USER  — adresse de la boîte qui envoie, ex. contact@fofoitech.com   (obligatoire)
//   SMTP_PASS  — mot de passe de cette boîte                                  (obligatoire)
// Facultatives (valeurs par défaut adaptées à la messagerie LWS de fofoitech.com) :
//   SMTP_HOST            — défaut « mail.fofoitech.com »
//   SMTP_PORT            — défaut 465 (TLS)
//   SMTP_SECURE          — « true » / « false » ; défaut : true si le port est 465
//   SMTP_TLS_SERVERNAME  — nom présent dans le certificat du serveur. LWS présente
//                          un certificat *.lwspanel.com : on le valide contre ce nom
//                          plutôt que de désactiver la vérification TLS.
//   CONTACT_FROM_EMAIL   — expéditeur affiché ; défaut « FÖFÖÏ TECH <SMTP_USER> »
//   CONTACT_TO_EMAILS    — destinataires séparés par une virgule ;
//                          défaut : directeur@ et contact@ fofoitech.com
import nodemailer from "nodemailer";

const DEFAULT_HOST = "mail.fofoitech.com";
const DEFAULT_TLS_SERVERNAME = "mail.lwspanel.com";
const DEFAULT_RECIPIENTS = ["directeur@fofoitech.com", "contact@fofoitech.com"];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Les champs qui finissent dans un en-tête d'email ne doivent jamais contenir
// de saut de ligne (injection d'en-têtes).
const oneLine = (value) => String(value).replace(/[\r\n]+/g, " ").trim();

const recipients = () => {
  const fromEnv = (process.env.CONTACT_TO_EMAILS || "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  return fromEnv.length ? fromEnv : DEFAULT_RECIPIENTS;
};

function smtpConfig() {
  const host = process.env.SMTP_HOST || DEFAULT_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;
  const servername =
    process.env.SMTP_TLS_SERVERNAME ||
    (host === DEFAULT_HOST ? DEFAULT_TLS_SERVERNAME : undefined);

  return {
    host,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: servername ? { servername } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  };
}

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

// Le transporteur (connexion SMTP) est réutilisé entre deux demandes tant que
// l'instance serveur reste active.
let transporter;
const getTransporter = () => (transporter ??= nodemailer.createTransport(smtpConfig()));

export async function sendContactEmail(fields) {
  const { SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    // En développement, on n'échoue pas silencieusement : la demande est
    // affichée dans la console pour pouvoir tester le parcours complet.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[contact] SMTP_USER / SMTP_PASS absentes — email non envoyé. Contenu de la demande :\n" +
          buildText(fields),
      );
      return { delivered: false, reason: "missing-smtp-credentials" };
    }
    throw new Error("SMTP_USER / SMTP_PASS manquantes dans l'environnement.");
  }

  const to = recipients();
  const from = process.env.CONTACT_FROM_EMAIL || `"FÖFÖÏ TECH" <${SMTP_USER}>`;

  const info = await getTransporter().sendMail({
    from,
    to,
    // Répondre depuis la boîte mail écrit directement au visiteur
    replyTo: { name: oneLine(fields.name), address: fields.email },
    subject: `[Site] ${oneLine(fields.subject)} — ${oneLine(fields.name)}`,
    html: buildHtml(fields),
    text: buildText(fields),
  });

  if (!info.accepted?.length) {
    throw new Error(`Aucun destinataire accepté par le serveur SMTP : ${info.response}`);
  }
  if (info.rejected?.length) {
    // Au moins une boîte a reçu la demande ; on trace celle qui a été refusée.
    console.error("[contact] destinataire(s) refusé(s) par le serveur :", info.rejected);
  }

  return { delivered: true, accepted: info.accepted };
}
