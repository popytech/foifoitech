// Icônes métier en SVG inline : pas de fichier à charger, couleur héritée du
// texte (donc alignée sur la palette), et rendu net à toute résolution.
const PATHS = {
  // — Pôles de services —
  btp: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-5h6v5" />
      <path d="M9 12h.01M15 12h.01" />
    </>
  ),
  informatique: (
    <>
      <rect x="2" y="4" width="20" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
      <path d="M6 8.5l2 1.5-2 1.5" />
      <path d="M11 11.5h4" />
    </>
  ),
  logistique: (
    <>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18.5" r="1.8" />
      <circle cx="17" cy="18.5" r="1.8" />
    </>
  ),
  formation: (
    <>
      <path d="M12 3l10 5-10 5L2 8z" />
      <path d="M6 10.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5" />
      <path d="M22 8v6" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z" />
      <circle cx="12" cy="13" r="3.3" />
    </>
  ),
  droplet: (
    <path d="M12 3s6.5 6.8 6.5 11.2A6.5 6.5 0 015.5 14.2C5.5 9.8 12 3 12 3z" />
  ),
  megaphone: (
    <>
      <path d="M3 10v4h3l10 5V5L6 10H3z" />
      <path d="M18.5 8.5a4.5 4.5 0 010 7" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.2-4.5-9.4-9.1C1.4 8 2.6 4.8 5.6 4a4.6 4.6 0 015.4 2 4.6 4.6 0 015.4-2c3 .8 4.2 4 3 6.9C19.2 15.5 12 20 12 20z" />
  ),

  // — Atouts / réassurance —
  shield: (
    <>
      <path d="M12 3l8 3v5c0 5-3.4 9-8 10-4.6-1-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 4.5a3 3 0 010 7" />
      <path d="M18 14.2c2.4.7 4 2.9 4 5.8" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-6 2 2-6z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),

  // — Divers —
  phone: (
    <path d="M5 3h3l2 5-2.5 1.5a13 13 0 006 6L15 13l5 2v3a2 2 0 01-2.2 2A17 17 0 013 5.2 2 2 0 015 3z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  arrow: <path d="M4 12h15m0 0l-6-6m6 6l-6 6" />,
};

export default function Icon({ name, className = "h-6 w-6", title }) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
    >
      {title && <title>{title}</title>}
      {path}
    </svg>
  );
}
