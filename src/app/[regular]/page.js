import config from "@config/config.json";
import NotFound from "@layouts/404";
import APropos from "@layouts/APropos";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import Equipe from "@layouts/Equipe";
import ServicesPage from "@layouts/ServicesPage";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import { plainify } from "@lib/utils/textConverter";

// for all regular pages
const RegularPages = async ({ params }) => {
  const { regular } = await params;
  const regularPageData = await getRegularPage(regular);
  const { layout } = regularPageData.frontmatter;

  return layout === "404" ? (
    <NotFound data={regularPageData} />
  ) : layout === "contact" ? (
    <Contact data={regularPageData} />
  ) : layout === "equipe" ? (
    <Equipe data={regularPageData} />
  ) : layout === "services" ? (
    <ServicesPage data={regularPageData} />
  ) : layout === "apropos" ? (
    <APropos data={regularPageData} />
  ) : (
    <Default data={regularPageData} />
  );
};
export default RegularPages;

// per-page SEO metadata
export const generateMetadata = async ({ params }) => {
  const { regular } = await params;
  const { frontmatter, content } = await getRegularPage(regular);
  const { title, meta_title, description, image, noindex, canonical } =
    frontmatter;

  const pageTitle = meta_title || title || config.site.title;
  const pageDescription = plainify(
    description || content.slice(0, 160) || config.metadata.meta_description
  );

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: canonical || `/${regular}` },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/${regular}`,
      images: [image || config.metadata.meta_image],
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
      images: [image || config.metadata.meta_image],
    },
  };
};

// Toute URL hors des pages listées ci-dessous renvoie un vrai 404 HTTP
// plutôt qu'une page d'erreur en statut 200 (« soft 404 » pénalisé en SEO).
export const dynamicParams = false;

// for regular page routes
export const generateStaticParams = async () => {
  const allslugs = getSinglePage("src/content");

  return allslugs.map((item) => ({ regular: item.slug }));
};
