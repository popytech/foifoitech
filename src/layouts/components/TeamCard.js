import Image from "next/image";

// Initiales : première lettre du prénom + première lettre du nom.
// Ex. « Nicolas KOUNDOUNO » → « NK ».
function initials(name = "") {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function TeamCard({ name, role, bio, img }) {
  return (
    <div className="group relative flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl">
      {/* Portrait — avatar à initiales tant que la photo n'est pas fournie */}
      <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-slate-50 bg-slate-100 shadow-inner transition-all duration-300 group-hover:border-primary/20">
        {img ? (
          <Image
            src={img}
            alt={`Portrait de ${name}`}
            width={128}
            height={128}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-primary/10 text-3xl font-bold tracking-wide text-primary"
            aria-hidden="true"
          >
            {initials(name)}
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-primary">
        {name}
      </h3>
      <span className="mt-1 inline-block rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
        {role}
      </span>
      {bio && (
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{bio}</p>
      )}
    </div>
  );
}
