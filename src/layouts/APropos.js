import BorderBeam from "@layouts/components/BorderBeam";
import DirectorCard from "@layouts/components/DirectorCard";
import DotPattern from "@layouts/components/DotPattern";
import Icon from "@layouts/components/Icon";
import MagicCard from "@layouts/components/MagicCard";
import Reveal from "@layouts/components/Reveal";
import ShimmerButton from "@layouts/components/ShimmerButton";
import Link from "next/link";

const APropos = ({ data }) => {
  const { frontmatter } = data;
  const {
    title,
    intro = {},
    directeur,
    vision,
    mission,
    domaines = [],
    legal = [],
    closing,
  } = frontmatter;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 lg:py-20">
        <DotPattern
          width={20}
          height={20}
          cr={1.3}
          className="-z-20 text-primary/80 opacity-60 [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
        />
        <div className="animate-pulse-glow pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative z-10 text-center">
          {intro.eyebrow && (
            <span
              className="animate-fade-in ft-badge mb-3"
              style={{ animationDelay: "0ms" }}
            >
              {intro.eyebrow}
            </span>
          )}
          <h1
            className="animate-fade-in text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            style={{ animationDelay: "90ms" }}
          >
            {title}
          </h1>
          {intro.lead && (
            <p
              className="animate-fade-in mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              {intro.lead}
            </p>
          )}
        </div>
      </section>

      {/* Paragraphes d'introduction */}
      {intro.paragraphs?.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container">
            <Reveal className="mx-auto max-w-3xl space-y-4 text-center">
              {intro.paragraphs.map((text) => (
                <p
                  key={text.slice(0, 40)}
                  className="text-base leading-relaxed text-slate-600 sm:text-lg"
                >
                  {text}
                </p>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      {(vision || mission) && (
        <section className="section py-12 lg:py-16">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2">
              {vision && (
                <Reveal as="div" direction="left" className="h-full">
                  <MagicCard className="h-full rounded-2xl shadow-lg">
                    <div className="p-8 sm:p-9">
                      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon name="compass" className="h-7 w-7" />
                      </span>
                      <h2 className="text-xl font-bold text-slate-900">
                        {vision.title}
                      </h2>
                      <p className="mt-3 leading-relaxed text-slate-600">
                        {vision.content}
                      </p>
                    </div>
                  </MagicCard>
                </Reveal>
              )}
              {mission && (
                <Reveal as="div" direction="right" delay={100} className="h-full">
                  <MagicCard className="h-full rounded-2xl shadow-lg">
                    <div className="p-8 sm:p-9">
                      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon name="target" className="h-7 w-7" />
                      </span>
                      <h2 className="text-xl font-bold text-slate-900">
                        {mission.title}
                      </h2>
                      <p className="mt-3 leading-relaxed text-slate-600">
                        {mission.content}
                      </p>
                    </div>
                  </MagicCard>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Nos domaines */}
      {domaines.length > 0 && (
        <section className="section bg-slate-50/60 py-14 lg:py-20">
          <div className="container">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="ft-badge mb-3">Nos domaines</span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Trois expertises, un seul interlocuteur
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {domaines.map((d, i) => (
                <Reveal as="div" key={d.title} delay={i * 90} direction="scale">
                  <Link
                    href={d.link}
                    className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      <Icon name={d.icon} className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {d.title}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Informations légales */}
      {legal.length > 0 && (
        <section className="section py-14 lg:py-20">
          <div className="container">
            <Reveal
              direction="scale"
              className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg sm:p-10"
            >
              <BorderBeam size={120} duration={7} borderWidth={1.5} />
              <h2 className="text-xl font-bold text-slate-900">
                Informations légales
              </h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                {legal.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-800">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      )}

      {/* Mot du Directeur Général — en clôture de page */}
      {directeur && (
        <section className="section py-14 lg:py-20">
          <div className="container">
            <Reveal direction="scale" className="mx-auto max-w-4xl">
              <DirectorCard
                name={directeur.name}
                role={directeur.role}
                quote={directeur.quote}
                photo={directeur.photo}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* Bloc de clôture */}
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
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                {closing.button && (
                  <ShimmerButton
                    as={Link}
                    href={closing.button.link}
                    background="linear-gradient(135deg, #0A4B8C 0%, #155FA0 100%)"
                    shimmerColor="#00D2C8"
                    className="px-8 py-3 text-base font-bold shadow-[0_8px_20px_-6px_rgba(10,75,140,0.35)]"
                  >
                    {closing.button.label}
                  </ShimmerButton>
                )}
                {closing.button_secondary && (
                  <Link
                    href={closing.button_secondary.link}
                    className="btn btn-outline-primary px-7 py-3 text-base"
                  >
                    {closing.button_secondary.label}
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
};

export default APropos;
