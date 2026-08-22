import { GoogleTagManager } from "@next/third-parties/google";
import config from "@config/config.json";
import theme from "@config/theme.json";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import Providers from "@layouts/partials/Providers";
import WhatsappButton from "@layouts/partials/WhatsappButton";
import { siteUrl } from "@lib/utils/siteUrl";
import "../styles/style.css";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: config.site.title,
    template: `%s — FÖFÖÏ TECH`,
  },
  description: config.metadata.meta_description,
  authors: [{ name: config.metadata.meta_author }],
  openGraph: {
    type: "website",
    locale: "fr_GN",
    siteName: "FÖFÖÏ TECH",
    title: config.site.title,
    description: config.metadata.meta_description,
    images: [config.metadata.meta_image],
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.title,
    description: config.metadata.meta_description,
    images: [config.metadata.meta_image],
  },
  icons: {
    icon: config.site.favicon,
    shortcut: config.site.favicon,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: theme.colors.default.theme_color.primary,
};

export default function RootLayout({ children }) {
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  return (
    <html suppressHydrationWarning lang="fr">
      {/* google tag manager */}
      {config.google_tag_manager.enable && (
        <GoogleTagManager gtmId={config.google_tag_manager.gtm_id} />
      )}
      <head>
        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
