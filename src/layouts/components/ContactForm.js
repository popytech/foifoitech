"use client";
import { useState } from "react";

const FIELD_CLASS =
  "form-input w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";
const LABEL_CLASS =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600";

const SUBJECTS = [
  "Génie Civil & Immobilier",
  "Technologies & Informatique",
  "Logistique & Services",
  "Formation Professionnelle",
  "Sécurité & Vidéosurveillance",
  "Assainissement",
  "Sensibilisation",
  "Assistance Sociale",
  "Autre demande",
];

export default function ContactForm({ action = "/api/contact", defaultSubject }) {
  const initialSubject = SUBJECTS.includes(defaultSubject)
    ? defaultSubject
    : "";
  const [state, setState] = useState({
    loading: false,
    success: null,
    error: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ loading: true, success: null, error: null });

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(action, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        form.reset();
        setState({ loading: false, success: true, error: null });
      } else {
        setState({
          loading: false,
          success: false,
          error: data.error || "L'envoi a échoué. Merci de réessayer.",
        });
      }
    } catch {
      setState({
        loading: false,
        success: false,
        error:
          "Connexion impossible. Vérifiez votre réseau ou joignez-nous au (+224) 625 57 34 34.",
      });
    }
  }

  return (
    <form
      className="contact-form rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl sm:p-8"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Envoyez-nous votre demande
      </h2>

      {/* pot de miel anti-robots : masqué aux visiteurs et aux lecteurs d'écran */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mb-4">
        <label className={LABEL_CLASS} htmlFor="name">
          Nom complet *
        </label>
        <input
          id="name"
          className={FIELD_CLASS}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={120}
          placeholder="Votre nom complet"
          required
        />
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL_CLASS} htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            className={FIELD_CLASS}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            placeholder="adresse@exemple.com"
            required
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="phone">
            Téléphone *
          </label>
          <input
            id="phone"
            className={FIELD_CLASS}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            placeholder="(+224) 6XX XX XX XX"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className={LABEL_CLASS} htmlFor="subject">
          Sujet de votre demande
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue={initialSubject}
          className={FIELD_CLASS.replace("form-input", "form-select")}
        >
          <option value="" disabled>
            Sélectionnez un sujet
          </option>
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className={LABEL_CLASS} htmlFor="message">
          Message *
        </label>
        <textarea
          id="message"
          className={FIELD_CLASS.replace("form-input", "form-textarea")}
          name="message"
          rows={5}
          maxLength={5000}
          placeholder="Décrivez votre besoin ou projet..."
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full py-3.5 text-base font-bold shadow-lg shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={state.loading}
      >
        {state.loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Envoi en cours...
          </span>
        ) : (
          "Envoyer ma demande"
        )}
      </button>

      <div aria-live="polite">
        {state.success && (
          <div className="animate-fade-in mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
            <svg
              className="h-5 w-5 shrink-0 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Merci pour votre message. Notre équipe vous répondra dans les plus
            brefs délais.
          </div>
        )}

        {state.error && (
          <div className="animate-fade-in mt-4 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800">
            <svg
              className="h-5 w-5 shrink-0 text-rose-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {state.error}
          </div>
        )}
      </div>
    </form>
  );
}
