import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import BorderBeam from "@layouts/components/BorderBeam";
import ContactForm from "@layouts/components/ContactForm";
import GoogleMap from "@layouts/components/GoogleMap";
import Reveal from "@layouts/components/Reveal";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      {/* Top Banner Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-12 lg:py-16">
        <div className="animate-pulse-glow pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container text-center">
          <span className="animate-fade-in ft-badge mb-3" style={{ animationDelay: "0ms" }}>
            Contact & Rendez-vous
          </span>
          <h1
            className="animate-fade-in text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            style={{ animationDelay: "90ms" }}
          >
            {title}
          </h1>
          <p
            className="animate-fade-in mt-3 text-base text-slate-600 sm:text-lg max-w-xl mx-auto"
            style={{ animationDelay: "180ms" }}
          >
            Besoin d'un devis BTP, d'un dépannage informatique ou d'un service logistique ? Contactez notre équipe à Coyah.
          </p>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="section py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <Reveal
              as="div"
              direction="left"
              className="relative overflow-hidden rounded-2xl lg:col-span-7"
            >
              <ContactForm action={contact_form_action} />
              <BorderBeam size={140} duration={6} borderWidth={2} />
            </Reveal>

            <Reveal as="div" direction="right" delay={120} className="lg:col-span-5 space-y-6">
              {/* Info Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900">
                  {info.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {info.description}
                </p>

                <div className="my-6 border-t border-slate-100" />

                <ul className="space-y-4">
                  {info.contacts.map((contact, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <svg className="h-4 w-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="contact-list pt-1">
                        {markdownify(contact, "p", "text-slate-700")}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Localisation */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl">
                <GoogleMap />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
