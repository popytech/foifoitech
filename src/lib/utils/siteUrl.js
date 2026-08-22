// URL publique du site, utilisée pour les métadonnées SEO (og:url, canonical, sitemap).
// Définir NEXT_PUBLIC_SITE_URL en production (ex: https://fofoitech.com).
// Vercel/Netlify fournissent automatiquement leur propre URL en préproduction.
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  process.env.URL || // Netlify
  "http://localhost:3000";

export const siteUrl = fromEnv.replace(/\/$/, "");

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
