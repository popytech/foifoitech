import { sendContactEmail } from "@lib/email";

const LIMITS = { name: 120, email: 160, phone: 40, subject: 120, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Limitation de débit simple, en mémoire : 5 envois / 10 min / IP.
// Suffisant pour un site vitrine ; à remplacer par un store partagé (Upstash,
// Redis) si le site passe un jour sur plusieurs instances serveur.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // purge opportuniste pour éviter que la Map ne grossisse indéfiniment
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

const json = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return json(
        {
          ok: false,
          error:
            "Trop de demandes envoyées depuis cet appareil. Merci de réessayer dans quelques minutes.",
        },
        429
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return json({ ok: false, error: "Requête invalide." }, 400);
    }

    // Pot de miel : champ invisible rempli uniquement par les robots.
    // On répond « ok » pour ne pas leur signaler la détection.
    if (body.website) {
      return json({ ok: true }, 200);
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const subject = String(body.subject || "Demande générale").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return json(
        {
          ok: false,
          error: "Merci de renseigner votre nom, votre email et votre message.",
        },
        400
      );
    }

    if (!EMAIL_RE.test(email)) {
      return json(
        { ok: false, error: "L'adresse email saisie n'est pas valide." },
        400
      );
    }

    const fields = { name, email, phone, subject, message };
    const tooLong = Object.entries(LIMITS).find(
      ([key, max]) => fields[key].length > max
    );
    if (tooLong) {
      return json(
        { ok: false, error: `Le champ « ${tooLong[0]} » est trop long.` },
        400
      );
    }

    await sendContactEmail(fields);

    return json({ ok: true }, 200);
  } catch (err) {
    // On journalise le détail côté serveur, sans l'exposer au visiteur.
    console.error("[contact] échec de l'envoi :", err);
    return json(
      {
        ok: false,
        error:
          "L'envoi a échoué. Vous pouvez nous joindre directement au (+224) 625 57 34 34 ou sur WhatsApp.",
      },
      502
    );
  }
}
