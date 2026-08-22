import Icon from "@layouts/components/Icon";
import MagicCard from "@layouts/components/MagicCard";
import Reveal from "@layouts/components/Reveal";
import Link from "next/link";

// Section « Une entreprise, trois domaines d'expertise » :
// présentation courte + renvoi vers les trois pôles.
const Presentation = ({ presentation }) => {
  if (!presentation) return null;
  const { title, paragraphs = [], poles = [], link } = presentation;

  return (
    <section className="section py-16 lg:py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="ft-badge mb-3">Qui sommes-nous</span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          {paragraphs.map((text) => (
            <p
              key={text.slice(0, 40)}
              className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {text}
            </p>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {poles.map((pole, i) => (
            <Reveal as="div" key={pole.title} delay={i * 100} direction="scale">
              <MagicCard className="h-full rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                <Link
                  href={pole.link}
                  className="group relative flex h-full flex-col p-7"
                >
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                    <Icon name={pole.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-primary">
                    {pole.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
                    {pole.content}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-all group-hover:gap-2.5">
                    En savoir plus
                    <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </Link>
              </MagicCard>
            </Reveal>
          ))}
        </div>

        {link && (
          <div className="mt-10 text-center">
            <Link
              href={link.url}
              className="inline-flex items-center gap-2 text-base font-bold text-primary transition-all hover:gap-3"
            >
              {link.label}
              <Icon name="arrow" className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Presentation;
