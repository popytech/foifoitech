import Reveal from "@layouts/components/Reveal";
import TeamCard from "@layouts/components/TeamCard";

const Equipe = ({ data }) => {
  const { frontmatter } = data;
  const { title, description, team } = frontmatter;

  return (
    <>
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-12 lg:py-16">
        <div className="animate-pulse-glow pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container text-center">
          <span className="animate-fade-in ft-badge mb-3" style={{ animationDelay: "0ms" }}>
            Notre Équipe Pluridisciplinaire
          </span>
          <h1
            className="animate-fade-in text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            style={{ animationDelay: "90ms" }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="animate-fade-in mt-4 max-w-2xl mx-auto text-base text-slate-600 sm:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              {description}
            </p>
          )}
        </div>
      </section>

      {/* Team Cards Section */}
      <section className="section py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team?.map((member, i) => (
              <Reveal as="div" key={i} delay={(i % 3) * 100} className="h-full">
                <TeamCard
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  img={member.img}
                />
              </Reveal>
            ))}
          </div>

          {/* Bandeau de contact */}
          <Reveal
            direction="scale"
            className="mt-16 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-blue-50/50 p-8 text-center shadow-lg sm:p-10"
          >
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">Un projet sur mesure avec notre équipe ?</h3>
            <p className="mt-2 text-sm text-slate-600 sm:text-base max-w-xl mx-auto">
              Nos ingénieurs, techniciens et spécialistes BTP & informatique sont disponibles pour étudier votre projet à Conakry et Coyah.
            </p>
            <div className="mt-6">
              <a href="/contact" className="btn btn-primary px-8 py-3 text-base shadow-lg shadow-primary/20">
                Discuter avec l'équipe
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Equipe;
