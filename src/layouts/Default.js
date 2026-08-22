import MDXContent from "@/app/helper/MDXContent";
import { markdownify } from "@lib/utils/textConverter";

const Default = ({ data }) => {
  const { frontmatter, content } = data;
  const { title } = frontmatter;
  return (
    <>
      {/* Top Banner Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-12 lg:py-16">
        <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container text-center">
          {markdownify(title, "h1", "text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl")}
        </div>
      </section>

      {/* Page Content */}
      <section className="section py-12 lg:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-lg shadow-slate-100">
            <div className="content prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <MDXContent content={content} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Default;
