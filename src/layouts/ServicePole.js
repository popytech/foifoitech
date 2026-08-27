import BorderBeam from "@layouts/components/BorderBeam";
import Icon from "@layouts/components/Icon";
import Reveal from "@layouts/components/Reveal";
import ShimmerButton from "@layouts/components/ShimmerButton";
import Image from "next/image";
import Link from "next/link";

const ServicePole = ({ pole, poles = [] }) => {
  const others = poles.filter((p) => p.slug !== pole.slug);
  const contactHref = `/contact?sujet=${encodeURIComponent(pole.title)}`;

  return (
    <>
      {/* Fil d'Ariane + en-tête */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-12 lg:py-16">
        <div className="animate-pulse-glow pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container text-center">
          <nav
            className="animate-fade-in mb-5 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500"
            style={{ animationDelay: "0ms" }}
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Accueil
            </Link>
            <Icon name="arrow" className="h-3 w-3" />
            <Link href="/services" className="transition-colors hover:text-primary">
              Nos services
            </Link>
            <Icon name="arrow" className="h-3 w-3" />
            <span className="text-slate-800">{pole.title}</span>
          </nav>

          <span
            className="animate-fade-in mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
            style={{ animationDelay: "60ms" }}
          >
            <Icon name={pole.icon} className="h-7 w-7" />
          </span>

          <h1
            className="animate-fade-in mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            style={{ animationDelay: "120ms" }}
          >
            {pole.title}
          </h1>
          {pole.subtitle && (
            <p
              className="animate-fade-in mx-auto mt-3 max-w-2xl text-base font-semibold text-primary sm:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              {pole.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Contenu détaillé */}
      <section className="section py-12 lg:py-16">
        <div className="container">
          <div className="items-center gap-12 md:grid md:grid-cols-2 lg:gap-16">
            <Reveal
              as="div"
              direction="left"
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl"
            >
              {pole.image ? (
                <Image
                  src={pole.image}
                  alt={pole.image_alt || pole.title}
                  width={650}
                  height={480}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-[320px] w-full rounded-xl object-cover sm:h-[420px]"
                  priority
                />
              ) : (
                <div className="flex h-[320px] w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 sm:h-[420px]">
                  <Icon name={pole.icon} className="h-24 w-24 text-primary/30" />
                </div>
              )}
            </Reveal>

            <Reveal as="div" direction="right" delay={120} className="mt-8 md:mt-0">
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                {pole.content}
              </p>

              <h2 className="mt-8 mb-3 text-sm font-bold tracking-wider text-slate-900 uppercase">
                Nos prestations
              </h2>
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
                <ShimmerButton
                  as={Link}
                  href={contactHref}
                  background="linear-gradient(135deg, #0A4B8C 0%, #155FA0 100%)"
                  shimmerColor="#00D2C8"
                  className="mt-8 px-7 py-3.5 text-base font-bold shadow-[0_8px_20px_-6px_rgba(10,75,140,0.35)]"
                >
                  <span>{pole.cta}</span>
                  <Icon name="arrow" className="ml-2 h-5 w-5" />
                </ShimmerButton>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Autres domaines */}
      {others.length > 0 && (
        <section className="section bg-slate-50/60 py-14 lg:py-20">
          <div className="container">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="ft-badge mb-3">Explorer</span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Nos autres domaines
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((p, i) => (
                <Reveal as="div" key={p.slug} delay={i * 70} direction="scale">
                  <Link
                    href={`/services/${p.slug}`}
                    className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      <Icon name={p.icon} className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {p.title}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA de clôture */}
      <section className="section py-14 lg:py-20">
        <div className="container">
          <Reveal
            direction="scale"
            className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-blue-50/50 p-8 text-center shadow-lg sm:p-12"
          >
            <BorderBeam size={100} duration={9} borderWidth={1.5} />
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Un besoin qui ne rentre dans aucune case ?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Contactez notre équipe : nous étudions chaque demande, même en
              dehors des prestations listées ci-dessus.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:gap-3 hover:shadow-xl"
            >
              <span>Nous contacter</span>
              <Icon name="arrow" className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ServicePole;
