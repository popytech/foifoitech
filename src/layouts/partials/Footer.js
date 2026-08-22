import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import CredibilityBadge from "@layouts/components/CredibilityBadge";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;
  const { footer } = menu;
  const { title, logo, logo_width, logo_height } = config.site;

  return (
    <footer className="section bg-light pb-0">
      <div className="container">
        <div className="row">
          {/* colonne 1 — identité */}
          <div className="mb-12 sm:col-6 lg:col-4">
            <Link href="/" aria-label={title}>
              <Image
                src={logo}
                width={Number(logo_width) * 2}
                height={Number(logo_height) * 2}
                style={{ width: `${logo_width}px`, height: "auto" }}
                alt="FÖFÖÏ TECH"
              />
            </Link>
            <p className="mt-4 italic">Un service, mille possibilités</p>
            <p className="mt-2 text-sm">
              Entreprise guinéenne spécialisée en BTP, informatique et services
              techniques, basée à Coyah (Conakry).
            </p>
            <Social source={social} className="social-icons mt-6 mb-8" />
          </div>

          {/* colonne 2 — liens rapides */}
          {footer.map((col) => (
            <div className="mb-12 sm:col-6 lg:col-4" key={col.name}>
              <h2 className="h5">{col.name}</h2>
              <ul className="mt-6">
                {col?.menu.map((item) => (
                  <li className="mb-1" key={item.text}>
                    <Link href={item.url}>{item.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* colonne 3 — contact */}
          <div className="mb-12 sm:col-6 lg:col-4">
            <h2 className="h5">Contact</h2>
            <ul className="mt-6 space-y-2 text-sm not-italic">
              <li>Somaya-Fory, Commune de Coyah, Conakry — Guinée</li>
              <li>
                <a href="tel:+224625573434" className="hover:underline">
                  (+224) 625 57 34 34
                </a>
              </li>
              <li>
                <a
                  href="mailto:nicochristoine91@gmail.com"
                  className="hover:underline"
                >
                  nicochristoine91@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:fofoitech22@gmail.com"
                  className="hover:underline"
                >
                  fofoitech22@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* badges légaux (RCCM / NIF) — exigence client, visibles sur toutes les pages */}
        <div className="footer-legal pt-4 text-center text-sm">
          <CredibilityBadge />
          <div className="mt-2">
            <Link href="/mentions-legales" className="underline">
              Mentions légales
            </Link>
          </div>
        </div>

        {/* copyright */}
        <div className="border-t border-border py-6">
          <p className="text-center text-sm">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
