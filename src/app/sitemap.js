import { getRegularPage, getSinglePage } from "@lib/contentParser";
import { absoluteUrl } from "@lib/utils/siteUrl";

// Priorités par page : l'accueil et les pages commerciales passent devant
// les pages légales.
const PRIORITY = {
  "": 1,
  services: 0.9,
  contact: 0.9,
  "a-propos": 0.8,
  equipe: 0.7,
  "mentions-legales": 0.3,
};

export default async function sitemap() {
  const lastModified = new Date();

  const pages = getSinglePage("src/content").map((page) => page.slug);

  const { frontmatter } = await getRegularPage("services");
  const poleSlugs = (frontmatter.poles || []).map(
    (pole) => `services/${pole.slug}`
  );

  return ["", ...pages, ...poleSlugs].map((slug) => ({
    url: absoluteUrl(slug === "" ? "/" : `/${slug}`),
    lastModified,
    changeFrequency: slug === "" ? "monthly" : "yearly",
    priority: slug.startsWith("services/") ? 0.8 : (PRIORITY[slug] ?? 0.5),
  }));
}
