import Icon from "@layouts/components/Icon";
import Reveal from "@layouts/components/Reveal";
import Image from "next/image";
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

      {/* Aperçu des trois pôles — repères cliquables */}
      <section className="container -mt-2 pb-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {poles.map((pole, i) => (
            <Reveal as="div" key={pole.title} delay={i * 90} direction="scale">
              <a
                href={`#pole-${i + 1}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon name={pole.icon} className="h-6 w-6" />
                </span>
                <span className="text-sm leading-snug font-bold text-slate-900">
                  {pole.title}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Une carte détaillée par pôle */}
      {poles.map((pole, i) => (
        <section
          key={pole.title}
          id={`pole-${i + 1}`}
          className={`section scroll-mt-24 py-14 lg:py-20 ${
            i % 2 ? "bg-slate-50/80" : "bg-white"
          }`}
        >
          <div className="container">
            <div className="items-center gap-10 md:grid md:grid-cols-2 lg:gap-16">
              {/* Visuel */}
              <Reveal
                as="div"
                direction={i % 2 === 0 ? "left" : "right"}
                className={`group overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl ${
                  i % 2 === 0 ? "" : "md:order-2"
                }`}
              >
                <Image
                  src={pole.image}
                  alt={pole.image_alt || pole.title}
                  width={650}
                  height={460}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-[280px] w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[380px]"
                />
              </Reveal>

              {/* Détail des prestations */}
              <Reveal
                as="div"
                direction={i % 2 === 0 ? "right" : "left"}
                delay={120}
                className={`mt-8 md:mt-0 ${i % 2 === 0 ? "" : "md:order-1"}`}
              >
                <div className="mb-4 inline-flex items-center gap-2.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  <Icon name={pole.icon} className="h-4 w-4" />
                  Pôle n°{i + 1}
                </div>

                <h2 className="text-2xl leading-tight font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {pole.title}
                </h2>
                {pole.subtitle && (
                  <p className="mt-2 text-base font-semibold text-primary">
                    {pole.subtitle}
                  </p>
                )}
                <p className="mt-4 leading-relaxed text-slate-600">
                  {pole.content}
                </p>

                <h3 className="mt-7 mb-3 text-sm font-bold tracking-wider text-slate-900 uppercase">
                  Nos prestations
                </h3>
                <ul className="space-y-3">
                  {pole.prestations?.map((p) => (
                    <li key={p.name} className="flex items-start gap-3">
                      <Icon
                        name="shield"
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      />
                      <span className="text-sm sm:text-base">
                        <strong className="font-semibold text-slate-900">
                          {p.name}
                        </strong>
                        <span className="text-slate-600"> — {p.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                {pole.cta && (
                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:gap-3 hover:shadow-xl sm:text-base"
                  >
                    <span>{pole.cta}</span>
                    <Icon name="arrow" className="h-5 w-5" />
                  </Link>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      ))}

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
