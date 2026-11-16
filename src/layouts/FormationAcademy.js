import BorderBeam from "@layouts/components/BorderBeam";
import CourseGrid from "@layouts/components/CourseGrid";
import DotPattern from "@layouts/components/DotPattern";
import FaqAccordion from "@layouts/components/FaqAccordion";
import Icon from "@layouts/components/Icon";
import Reveal from "@layouts/components/Reveal";
import ShimmerButton from "@layouts/components/ShimmerButton";
import Image from "next/image";
import Link from "next/link";

// Catégorie + icône par formation — présentation uniquement, la donnée
// métier (nom, détail) reste portée par pole.prestations dans services.md.
const COURSE_META = {
  "Bureautique & audiovisuel": { category: "Bureautique & Productivité", icon: "informatique" },
  "Sécurité électronique & audiovisuel": { category: "Sécurité & Électronique", icon: "camera" },
  "Ingénierie BTP": { category: "BTP & Ingénierie", icon: "btp" },
  "Comptabilité & Sage 100": { category: "Comptabilité & Gestion", icon: "calculator" },
  Digital: { category: "Digital", icon: "globe" },
};

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Prise de contact",
    content: "Vous nous exposez vos besoins et vos objectifs de formation, pour vous-même, votre équipe ou votre entreprise.",
  },
  {
    n: "02",
    title: "Évaluation des besoins",
    content: "Nous identifions le niveau des participants (débutant, intermédiaire) et le format le mieux adapté.",
  },
  {
    n: "03",
    title: "Formation",
    content: "Nos formateurs animent des sessions pratiques, centrées sur les compétences directement applicables.",
  },
  {
    n: "04",
    title: "Suivi",
    content: "Nous restons disponibles après la formation pour répondre à vos questions et vous accompagner.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Les formations s'adressent-elles aux entreprises ?",
    answer:
      "Oui. FÖFÖÏ TECH forme aussi bien des particuliers que des équipes en entreprise, partout en Guinée.",
  },
  {
    question: "Les débutants peuvent-ils participer ?",
    answer:
      "Oui, plusieurs de nos formations sont proposées en niveaux débutant et intermédiaire — dites-nous votre niveau, nous adaptons le contenu.",
  },
  {
    question: "Comment obtenir un devis ?",
    answer:
      "Contactez-nous en précisant la formation qui vous intéresse : nous revenons vers vous rapidement avec une proposition adaptée à votre besoin.",
  },
];

const FormationAcademy = ({ pole, poles = [] }) => {
  const courses = (pole.prestations || []).map((p) => ({
    ...p,
    category: COURSE_META[p.name]?.category || "Formation",
    icon: COURSE_META[p.name]?.icon || "formation",
  }));
  const contactHref = `/contact?sujet=${encodeURIComponent(pole.title)}`;
  const others = poles.filter((p) => p.slug !== pole.slug);

  return (
    <>
      {/* Hero sombre */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1B33] to-[#051020] py-20 text-white lg:py-28">
        <DotPattern
          width={22}
          height={22}
          className="text-white/[0.06] [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
        />
        <div
          className="animate-pulse-glow pointer-events-none absolute top-1/2 right-[-10%] -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-[#00D2C8]/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative z-10 text-center">
          <nav
            className="animate-fade-in mb-5 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400"
            style={{ animationDelay: "0ms" }}
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <Icon name="arrow" className="h-3 w-3" />
            <Link href="/services" className="transition-colors hover:text-white">
              Nos services
            </Link>
            <Icon name="arrow" className="h-3 w-3" />
            <span className="text-white">{pole.title}</span>
          </nav>

          <span
            className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#4DE8DF] uppercase backdrop-blur-md"
            style={{ animationDelay: "60ms" }}
          >
            Compétences pratiques & autonomie
          </span>

          <h1
            className="animate-fade-in mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight"
            style={{ animationDelay: "120ms" }}
          >
            Formation professionnelle par{" "}
            <span className="text-[#4DE8DF]">FÖFÖÏ TECH</span>
          </h1>

          <p
            className="animate-fade-in mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            {pole.content}
          </p>

          <div
            className="animate-fade-in mt-9 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "270ms" }}
          >
            <ShimmerButton
              as={Link}
              href={contactHref}
              background="linear-gradient(135deg, #0A4B8C 0%, #155FA0 100%)"
              shimmerColor="#00D2C8"
              className="px-7 py-3.5 text-base font-bold shadow-[0_8px_20px_-6px_rgba(10,75,140,0.45)]"
            >
              <span>{pole.cta || "Discuter de mon projet"}</span>
              <Icon name="arrow" className="ml-2 h-5 w-5" />
            </ShimmerButton>
            <a
              href="#formations"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-7 py-3.5 text-base font-bold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Voir les formations
              <Icon name="arrow" className="h-5 w-5 rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section py-14 lg:py-20">
        <div className="container">
          <div className="items-center gap-12 md:grid md:grid-cols-2 lg:gap-16">
            <Reveal as="div" direction="left">
              <span className="ft-badge mb-3">Notre approche</span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Apprendre par la pratique
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Nos formations privilégient les cas concrets et les mises en
                situation, pour que chaque participant reparte avec des
                compétences directement applicables — au bureau, sur chantier
                ou dans sa recherche d'emploi.
              </p>

              <ul className="mt-7 space-y-4">
                {[
                  {
                    title: "Pratique",
                    content: "Des exercices et cas concrets, pas seulement de la théorie.",
                  },
                  {
                    title: "Adapté à votre niveau",
                    content: "Contenus proposés en niveaux débutant et intermédiaire.",
                  },
                  {
                    title: "Pour tous",
                    content: "Particuliers, équipes en entreprise et institutions.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-900">
                        {item.title}
                      </span>
                      <span className="text-sm text-slate-600">{item.content}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              as="div"
              direction="right"
              delay={120}
              className="relative mt-10 flex h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-primary/10 to-primary/5 md:mt-0 lg:h-[420px]"
            >
              {pole.image ? (
                <Image
                  src={pole.image}
                  alt={pole.image_alt || pole.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <Icon name={pole.icon} className="h-28 w-28 text-primary/30" />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grille des formations */}
      <section id="formations" className="section scroll-mt-20 bg-slate-50/60 py-14 lg:py-20">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="ft-badge mb-3">FÖFÖÏ TECH Formation</span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Nos formations professionnelles
            </h2>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Choisissez une formation adaptée à vos objectifs et à votre
              niveau.
            </p>
          </Reveal>

          <div className="mt-10">
            <CourseGrid courses={courses} />
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="section py-14 lg:py-20">
        <div className="container">
          <div className="items-center gap-12 md:grid md:grid-cols-2 lg:gap-16">
            <Reveal
              as="div"
              direction="left"
              className="relative flex h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-primary/10 to-primary/5 lg:h-[380px]"
            >
              <Icon name="team" className="h-24 w-24 text-primary/30" />
            </Reveal>

            <Reveal as="div" direction="right" delay={120} className="mt-10 md:mt-0">
              <span className="ft-badge mb-3">Notre méthode</span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Un processus clair, du besoin au résultat
              </h2>

              <div className="mt-7 space-y-6">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {step.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-slate-50/60 py-14 lg:py-20">
        <div className="container">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="ft-badge mb-3">Questions fréquentes</span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Bien préparer votre projet de formation
            </h2>
          </Reveal>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* CTA de clôture */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1B33] to-[#051020] py-16 text-white lg:py-20">
        <DotPattern
          width={22}
          height={22}
          className="text-white/[0.05] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        />
        <div className="container relative z-10">
          <Reveal
            direction="scale"
            className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md sm:p-12"
          >
            <BorderBeam size={100} duration={9} borderWidth={1.5} colorFrom="#00D2C8" colorTo="#0A4B8C" />
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Besoin d'un accompagnement en formation professionnelle ?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
              Présentez-nous votre besoin. Notre équipe vous répond avec une
              première orientation et les prochaines étapes.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#0A4B8C] shadow-lg transition-all duration-300 hover:scale-105 sm:text-base"
              >
                <span>Demander un devis</span>
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5 sm:text-base"
              >
                Voir tous les services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Autres domaines */}
      {others.length > 0 && (
        <section className="section py-14 lg:py-20">
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
    </>
  );
};

export default FormationAcademy;
