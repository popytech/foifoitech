import Image from "next/image";

import MagicCard from "@layouts/components/MagicCard";

// Initiales : première lettre du prénom + première lettre du nom.
function initials(name = "") {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

const DirectorCard = ({ name, role, quote, photo }) => {
  if (!name && !quote) return null;

  return (
    <MagicCard className="rounded-3xl shadow-xl">
      <div className="grid gap-0 md:grid-cols-[minmax(0,280px)_1fr]">
        {/* Portrait */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100 md:aspect-auto md:h-full">
          {photo ? (
            <Image
              src={photo}
              alt={`Portrait de ${name}`}
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className="object-cover object-top"
            />
          ) : (
            <div
              className="flex h-full min-h-[220px] w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-5xl font-bold tracking-wide text-primary"
              aria-hidden="true"
            >
              {initials(name)}
            </div>
          )}
        </div>

        {/* Citation */}
        <div className="relative flex flex-col justify-center p-7 sm:p-9">
          <svg
            className="mb-3 h-9 w-9 text-primary/20"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.4 20.6c-2.3 0-4.1-.8-5.5-2.3C2.6 16.7 2 14.9 2 12.7c0-2.4.7-4.6 2.1-6.5C5.5 4.2 7.5 2.7 10 1.6l1.4 2.4c-1.9.9-3.3 2-4.3 3.3-.9 1.2-1.4 2.4-1.5 3.5.7-.3 1.5-.5 2.3-.5 1.7 0 3.1.6 4.2 1.7 1.1 1.1 1.6 2.5 1.6 4.1 0 1.7-.6 3.1-1.7 4.2-1.1 1-2.4 1.4-3.6 1.3zm14.6 0c-2.3 0-4.1-.8-5.5-2.3-1.3-1.6-1.9-3.4-1.9-5.6 0-2.4.7-4.6 2.1-6.5 1.4-2 3.4-3.5 5.9-4.6l1.4 2.4c-1.9.9-3.3 2-4.3 3.3-.9 1.2-1.4 2.4-1.5 3.5.7-.3 1.5-.5 2.3-.5 1.7 0 3.1.6 4.2 1.7 1.1 1.1 1.6 2.5 1.6 4.1 0 1.7-.6 3.1-1.7 4.2-1.1 1-2.4 1.4-3.6 1.3z" />
          </svg>
          <p className="text-base leading-relaxed text-slate-700 italic sm:text-lg">
            {quote}
          </p>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <p className="text-base font-bold text-slate-900">{name}</p>
            <p className="mt-0.5 text-sm font-semibold text-primary">{role}</p>
          </div>
        </div>
      </div>
    </MagicCard>
  );
};

export default DirectorCard;
