import DotPattern from "@layouts/components/DotPattern";
import ShimmerButton from "@layouts/components/ShimmerButton";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = ({ banner }) => {
  return (
    <section className="section relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Texture de points de fond */}
      <DotPattern
        width={20}
        height={20}
        cr={1.4}
        className="-z-20 text-primary/90 opacity-70 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
      />

      {/* Ambient background glows */}
      <div className="animate-pulse-glow pointer-events-none absolute -top-24 left-1/2 -z-10 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/15 via-[#00D2C8]/10 to-amber-500/10 blur-3xl" />

      <div className="container relative z-10">
        <div className="row text-center">
          <div className="mx-auto lg:col-10">
            {/* Top pill badge */}
            <div
              className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md transition-all hover:bg-primary/10 sm:text-sm"
              style={{ animationDelay: "0ms" }}
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Entreprise guinéenne agréée • RCCM GN.TCC.2025.B.11045
            </div>

            <h1
              className="animate-fade-in font-primary text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl lg:leading-tight"
              style={{ animationDelay: "90ms" }}
            >
              {banner.title}
            </h1>

            <div
              className="animate-fade-in mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg lg:text-xl"
              style={{ animationDelay: "180ms" }}
            >
              {markdownify(banner.content)}
            </div>

            {banner.button.enable && (
              <div
                className="animate-fade-in mt-8 flex flex-wrap items-center justify-center gap-4"
                style={{ animationDelay: "270ms" }}
              >
                <ShimmerButton
                  as={Link}
                  href={banner.button.link}
                  rel={banner.button.rel}
                  background="linear-gradient(135deg, #0A4B8C 0%, #155FA0 100%)"
                  shimmerColor="#00D2C8"
                  className="group px-8 py-3.5 text-base font-bold shadow-[0_8px_20px_-6px_rgba(10,75,140,0.35)]"
                >
                  <span>{banner.button.label}</span>
                  <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </ShimmerButton>
                <Link
                  className="btn btn-outline-primary px-7 py-3.5 text-base"
                  href="/services"
                >
                  Découvrir nos domaines
                </Link>
              </div>
            )}

            {/* Banner hero image card with shadow */}
            <div
              className="animate-fade-in relative mx-auto mt-12 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl transition-transform duration-500 hover:scale-[1.01] lg:mt-16"
              style={{ animationDelay: "360ms" }}
            >
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
