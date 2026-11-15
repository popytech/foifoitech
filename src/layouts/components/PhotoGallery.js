import Reveal from "@layouts/components/Reveal";
import Image from "next/image";

// Galerie en rangées justifiées : chaque rangée remplit toute la largeur,
// les photos gardent leur format d'origine (portrait, carré ou paysage) et
// ne sont pas recadrées, sans « trous » comme dans une grille classique.
//
// Chaque photo se déclare ainsi dans le frontmatter :
//   - src: "/images/gallery/xxx.jpg"
//     alt: "Description de la photo"
//     w: 1020   # largeur et hauteur réelles du fichier (pour le format)
//     h: 765
const PhotoGallery = ({
  eyebrow,
  title,
  description,
  images = [],
  muted = false,
}) => {
  if (!images.length) return null;

  return (
    <section
      className={`section py-14 lg:py-20 ${muted ? "bg-slate-50/60" : ""}`}
    >
      <div className="container">
        {(eyebrow || title || description) && (
          <Reveal className="mx-auto max-w-2xl text-center">
            {eyebrow && <span className="ft-badge mb-3">{eyebrow}</span>}
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-base text-slate-600 sm:text-lg">
                {description}
              </p>
            )}
          </Reveal>
        )}

        {/* --rh = hauteur cible d'une rangée ; chaque photo reçoit une largeur
            proportionnelle à son format, puis les rangées s'étirent pour
            remplir la ligne. Le pseudo-élément final évite d'étirer la
            dernière rangée si elle est incomplète. */}
        <div className="mt-10 flex flex-wrap gap-3 [--rh:140px] after:grow-[10000] after:content-[''] sm:gap-4 md:[--rh:190px] lg:[--rh:230px]">
          {images.map((img, i) => {
            const ratio = (img.w || 4) / (img.h || 3);
            return (
              <div
                key={img.src}
                className="relative"
                style={{
                  flexGrow: ratio * 100,
                  flexBasis: `calc(var(--rh) * ${ratio})`,
                }}
              >
                <Reveal
                  as="div"
                  delay={(i % 4) * 70}
                  direction="scale"
                  className="h-full"
                >
                  <figure className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-md transition-shadow duration-300 hover:shadow-xl">
                    {/* Entretoise : fixe le format de la photo */}
                    <span
                      className="block"
                      style={{ paddingBottom: `${100 / ratio}%` }}
                      aria-hidden="true"
                    />
                    <Image
                      src={img.src}
                      alt={img.alt || ""}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </figure>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
