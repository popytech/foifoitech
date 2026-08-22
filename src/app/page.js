import Cta from "@layouts/components/Cta";
import HomeBanner from "@layouts/partials/HomeBanner";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import Presentation from "@layouts/partials/Presentation";
import Services from "@layouts/partials/Services";
import { getListPage } from "../lib/contentParser";

export const metadata = {
  alternates: { canonical: "/" },
};

const Home = async () => {
  const homePage = await getListPage("src/content/_index.md");
  const { frontmatter } = homePage;
  const { banner, presentation, feature, services, call_to_action } =
    frontmatter;

  return (
    <>
      <HomeBanner banner={banner} />
      <Presentation presentation={presentation} />
      <HomeFeatures feature={feature} />
      <Services services={services} />
      <Cta cta={call_to_action} />
    </>
  );
};

export default Home;
