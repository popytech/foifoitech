import config from "@config/config.json";
import menu from "@config/menu.json";
import CredibilityBadge from "@layouts/components/CredibilityBadge";
import DotPattern from "@layouts/components/DotPattern";
import Icon from "@layouts/components/Icon";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;
  const { footer } = menu;

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0A4B8C] to-[#052B4F] text-white">
      <DotPattern
        width={20}
        height={20}
        className="text-white/[0.06] [mask-image:radial-gradient(650px_circle_at_top,white,transparent)]"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-80 w-80 rounded-full bg-[#00D2C8]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Identité */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block font-primary text-2xl font-extrabold tracking-tight text-white"
            >
              FÖFÖÏ TECH
            </Link>
            <p className="mt-2 text-sm font-semibold text-[#4DE8DF]">
              Un service, mille possibilités
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              Entreprise guinéenne spécialisée en BTP, informatique et
              services techniques, au service de toute la Guinée.
            </p>
          </div>

          {/* Colonnes de liens */}
          {footer.map((col) => (
            <div className="lg:col-span-2" key={col.name}>
              <h2 className="text-xs font-bold tracking-widest text-white/60 uppercase">
                {col.name}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {col?.menu.map((item) => (
                  <li key={item.text}>
                    <Link
                      href={item.url}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold tracking-widest text-white/60 uppercase">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Icon
                  name="location"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#4DE8DF]"
                />
                <span>Somaya-Fory, Commune de Coyah, Conakry — Guinée</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" className="h-5 w-5 shrink-0 text-[#4DE8DF]" />
                <a
                  href="tel:+224625573434"
                  className="transition-colors hover:text-white"
                >
                  (+224) 625 57 34 34
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="h-5 w-5 shrink-0 text-[#4DE8DF]" />
                <a
                  href="mailto:contact@fofoitech.com"
                  className="transition-colors hover:text-white"
                >
                  contact@fofoitech.com
                </a>
              </li>
            </ul>

            <a
              href="https://wa.me/224625573434"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0A4B8C] transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.156 4.22 4.299-1.128z" />
              </svg>
              Discuter sur WhatsApp
            </a>
          </div>
        </div>

        {/* bas de page */}
        <div className="mt-14 flex flex-col items-center gap-5 border-t border-white/10 pt-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="text-xs text-slate-400">{copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <CredibilityBadge dark />
            <Link
              href="/mentions-legales"
              className="text-xs font-semibold text-slate-300 underline underline-offset-4 transition-colors hover:text-white"
            >
              Mentions légales
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Développé par{" "}
          <a
            href="https://www.popytech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-400 transition-colors hover:text-white"
          >
            Popy Tech
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
