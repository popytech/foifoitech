import Icon from "@layouts/components/Icon";
import Reveal from "@layouts/components/Reveal";
import Link from "next/link";

const HomeFeatures = ({ feature }) => {
  const { closing } = feature;

  return (
    <section className="section bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="ft-badge mb-3">Nos engagements & atouts</span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {feature.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {feature.features.map((item, i) => (
            <Reveal
              as="div"
              className="feature-card group flex flex-col items-center text-center"
              key={`feature-${i}`}
              delay={i * 90}
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                <Icon name={item.icon} className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">
                  {item.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {item.content}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Texte de clôture (facultatif) : feature.closing dans _index.md */}
        {closing && (
          <Reveal
            direction="scale"
            className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg sm:p-10 lg:mt-16"
          >
            {closing.title && (
              <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {closing.title}
              </h3>
            )}
            {closing.paragraphs?.map((text) => (
              <p
                key={text.slice(0, 40)}
                className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base"
              >
                {text}
              </p>
            ))}
            {closing.button && (
              <Link
                href={closing.button.link}
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:gap-3 hover:shadow-xl"
              >
                <span>{closing.button.label}</span>
                <Icon name="arrow" className="h-5 w-5" />
              </Link>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default HomeFeatures;
