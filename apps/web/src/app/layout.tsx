import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WaitlistProvider } from "@/components/waitlist";
import { site } from "@/lib/site";
import { articles } from "@/lib/articles";
import { resources } from "@/lib/resources";
import { EngagementTracker } from "@/components/engagement-tracker";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AirBloom — Sinusitis Tracker & Daily Support",
    template: "%s | AirBloom",
  },
  description: site.description,
  applicationName: site.name,
  category: "health",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: site.name,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AirBloom — Sinusitis Tracker & Daily Support",
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: site.demo
    ? { index: false, follow: false }
    : { googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};
export const viewport: Viewport = { themeColor: "#f8f9f5" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <WaitlistProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
          <Suspense fallback={null}>
            <EngagementTracker
              enabled={!site.demo}
              articlePaths={articles.map((article) => `/journal/${article.slug}`)}
              resources={resources.map(({ id, pdf, editable, spreadsheet, csv }) => ({
                id, pdf, editable, spreadsheet, csv,
              }))}
            />
          </Suspense>
        </WaitlistProvider>
      </body>
    </html>
  );
}
