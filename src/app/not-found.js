import NotFound from "@layouts/404";
import { getRegularPage } from "@lib/contentParser";

export const metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

const notFound = async () => {
  const notFoundData = await getRegularPage("404");
  return <NotFound data={notFoundData} />;
};

export default notFound;
