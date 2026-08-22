import Icon from "@layouts/components/Icon";
import Link from "next/link";

const PHONE_DISPLAY = "(+224) 625 57 34 34";
const PHONE_HREF = "tel:+224625573434";
const WHATSAPP_HREF = "https://wa.me/224625573434";

function Cta({ cta }) {
  return (
    <section className="section py-16 lg:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#073463] to-primary p-8 shadow-2xl sm:p-12 lg:p-16">
          {/* Halos d'ambiance */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#00D2C8]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {cta?.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
              {cta?.content}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {cta?.button?.enable && (
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-primary shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-100 hover:shadow-xl"
                  href={cta.button.link}
                >
                  <span>{cta.button.label}</span>
                  <Icon name="arrow" className="h-5 w-5" />
                </Link>
              )}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-base font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.156 4.22 4.299-1.128z" />
                </svg>
                Discuter sur WhatsApp
              </a>
            </div>

            <p className="mt-7 text-sm text-slate-300">
              Ou appelez-nous directement au{" "}
              <a
                href={PHONE_HREF}
                className="font-bold text-white underline underline-offset-4 hover:text-slate-200"
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
