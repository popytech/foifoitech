import Icon from "@layouts/components/Icon";
import Reveal from "@layouts/components/Reveal";
import Image from "next/image";
import Link from "next/link";

// Composant serveur : aucun JavaScript envoyé au navigateur.
const Services = ({ services }) => {
  return services.map((service, index) => {
    const isOdd = index % 2 > 0;

    return (
      <section
        key={`service-${index}`}
        className={`section relative py-16 lg:py-24 ${
          isOdd ? "bg-slate-50/80" : "bg-white"
        }`}
      >
        <div className="container">
          <div className="items-center gap-12 md:grid md:grid-cols-2 lg:gap-16">
            {/* Visuel */}
            <Reveal
              as="div"
              direction={isOdd ? "right" : "left"}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl transition-all duration-300 hover:shadow-2xl ${
                !isOdd && "md:order-2"
              }`}
            >
              <Image
                src={service.images[0]}
                alt={service.image_alt || service.title}
                width={650}
                height={480}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-[320px] w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[400px]"
              />
            </Reveal>

            {/* Contenu */}
            <Reveal
              as="div"
              direction={isOdd ? "left" : "right"}
              delay={120}
              className={`mt-8 md:mt-0 ${!isOdd && "md:order-1"}`}
            >
              <div className="mb-4 inline-flex items-center gap-2.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                {service.icon && <Icon name={service.icon} className="h-4 w-4" />}
                Domaine n°{index + 1}
              </div>

              <h2 className="text-2xl leading-tight font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {service.title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                {service.content}
              </p>

              {service.highlights?.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700 sm:text-base"
                    >
                      <Icon
                        name="shield"
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {service.button.enable && (
                <div className="mt-7">
                  <Link
                    href={service.button.link}
                    className="inline-flex items-center gap-2 text-base font-bold text-primary transition-all hover:gap-3"
                  >
                    <span>{service.button.label}</span>
                    <Icon name="arrow" className="h-5 w-5" />
                  </Link>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    );
  });
};

export default Services;
