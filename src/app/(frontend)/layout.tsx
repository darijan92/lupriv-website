import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/json-ld";
import { getPageBySlug, getSiteSettings } from "@/lib/payload";
import { deliveryBanner } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [site, home] = await Promise.all([getSiteSettings(), getPageBySlug("home")]);
  const title = home?.title ?? site.brandName;
  const description = home?.metaDescription ?? "";

  return {
    title: {
      default: title,
      template: "%s | Lupriv Plus",
    },
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: site.brandName,
      locale: "hr_BA",
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const site = await getSiteSettings();

  return (
    <html lang="hr" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-charcoal-900 font-sans">
        <JsonLd data={organizationJsonLd(site)} />
        <div className="bg-emerald-800 text-center text-xs sm:text-sm text-emerald-50 px-4 py-2">
          {deliveryBanner(site)}
        </div>
        <Header site={site} />
        <main className="flex-1">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
