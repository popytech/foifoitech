import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = ({ banner }) => {
  return (
    <section className="section relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/15 via-[#00D2C8]/10 to-amber-500/10 blur-3xl" />

      <div className="container relative z-10">
        <div className="row text-center">
          <div className="mx-auto lg:col-10">
            {/* Top pill badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md transition-all hover:bg-primary/10 sm:text-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Entreprise guinéenne agréée • RCCM GN.TCC.2025.B.11045
            </div>

            <h1 className="font-primary text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl lg:leading-tight">
              {banner.title}
            </h1>

            <div className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg lg:text-xl">
              {markdownify(banner.content)}
            </div>

            {banner.button.enable && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  className="btn btn-primary group px-8 py-3.5 text-base"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  <span>{banner.button.label}</span>
                  <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link
                  className="btn btn-outline-primary px-7 py-3.5 text-base"
                  href="/services"
                >
                  Découvrir nos domaines
                </Link>
              </div>
            )}

            {/* Banner hero image card with shadow */}
            <div className="relative mx-auto mt-12 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl transition-transform duration-500 hover:scale-[1.01] lg:mt-16">
              <Image
                className="mx-auto rounded-xl object-cover"
                src={banner.image}
                width={850}
                height={450}
                alt="FÖFÖÏ TECH banner image"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
