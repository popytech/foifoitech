// Carte de localisation du siège : Somaya-Fory, Commune de Coyah, Conakry.
// L'embed `output=embed` ne nécessite aucune clé API Google Maps.
const QUERY = "Somaya, Coyah, Guinée";
const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  QUERY
)}&z=14&hl=fr&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  QUERY
)}`;

export default function GoogleMap({ className = "", height = 320 }) {
  return (
    <div className={className}>
      <iframe
        title="Localisation de FÖFÖÏ TECH — Somaya-Fory, Coyah, Conakry"
        src={EMBED_SRC}
        width="100%"
        height={height}
        style={{ border: 0, display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="border-t border-slate-100 bg-white p-4">
        <p className="text-sm font-semibold text-slate-900">Nous trouver</p>
        <p className="mt-1 text-sm text-slate-600">
          Somaya-Fory, Commune de Coyah, Conakry — République de Guinée
        </p>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Obtenir l'itinéraire
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
