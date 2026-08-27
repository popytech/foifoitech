import Icon from "@layouts/components/Icon";
import MagicCard from "@layouts/components/MagicCard";
import Reveal from "@layouts/components/Reveal";
import Link from "next/link";

const ServicesPage = ({ data }) => {
  const { title, intro, poles = [], closing } = data.frontmatter;

  return (
    <>
      {/* En-tête de page */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-12 lg:py-16">
        <div className="animate-pulse-glow pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container text-center">
          <span className="animate-fade-in ft-badge mb-3" style={{ animationDelay: "0ms" }}>
            Nos domaines d'intervention
          </span>
          <h1
            className="animate-fade-in text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            style={{ animationDelay: "90ms" }}
          >
            {title}
          </h1>
          {intro && (
            <p
              className="animate-fade-in mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              {intro}
            </p>
          )}
        </div>
      </section>

      {/* Grille des pôles — chacun a sa propre page dédiée */}
      <section className="section py-8 lg:py-12">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {poles.map((pole, i) => (
              <Reveal as="div" key={pole.slug} delay={i * 80} direction="scale">
                <MagicCard className="h-full rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                  <Link
                    href={`/services/${pole.slug}`}
                    className="group relative flex h-full flex-col p-7"
                  >
                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                      <Icon name={pole.icon} className="h-7 w-7" />
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-primary">
                      {pole.title}
                    </h2>
                    {pole.subtitle && (
                      <p className="mt-1.5 text-sm font-semibold text-primary/80">
                        {pole.subtitle}
                      </p>
                    )}
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
                      {pole.content}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-all group-hover:gap-2.5">
                      Découvrir ce domaine
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </Link>
                </MagicCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bloc de fin */}
      {closing && (
        <section className="section py-14 lg:py-20">
          <div className="container">
            <Reveal
              direction="scale"
              className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-blue-50/50 p-8 text-center shadow-lg sm:p-12"
            >
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                {closing.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
                {closing.content}
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:gap-3 hover:shadow-xl"
              >
                <span>{closing.button}</span>
                <Icon name="arrow" className="h-5 w-5" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
};

export default ServicesPage;
