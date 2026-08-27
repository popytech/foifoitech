import config from "@config/config.json";
import FormationAcademy from "@layouts/FormationAcademy";
import ServicePole from "@layouts/ServicePole";
import { getRegularPage } from "@lib/contentParser";
import { plainify } from "@lib/utils/textConverter";
import { notFound } from "next/navigation";

// La page Formation a un traitement enrichi dédié (catalogue de
// formations, étapes, FAQ) ; les autres pôles utilisent le gabarit générique.
const RICH_LAYOUTS = {
  "formation-professionnelle": FormationAcademy,
};

const getPoles = async () => {
  const { frontmatter } = await getRegularPage("services");
  return frontmatter.poles || [];
};

const ServicePolePage = async ({ params }) => {
  const { slug } = await params;
  const poles = await getPoles();
  const pole = poles.find((p) => p.slug === slug);

  if (!pole) return notFound();

  const Layout = RICH_LAYOUTS[slug] || ServicePole;

  return <Layout pole={pole} poles={poles} />;
};

export default ServicePolePage;

// per-page SEO metadata
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const poles = await getPoles();
  const pole = poles.find((p) => p.slug === slug);

  if (!pole) return {};

  const title = `${pole.title} — FÖFÖÏ TECH`;
  const description = plainify(pole.content || "").slice(0, 160);
  const image = pole.image || config.metadata.meta_image;

  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title,
      description,
      url: `/services/${slug}`,
      images: [image],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  };
};

// Tout slug hors des pôles connus renvoie un vrai 404 HTTP.
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const poles = await getPoles();
  return poles.map((p) => ({ slug: p.slug }));
};
