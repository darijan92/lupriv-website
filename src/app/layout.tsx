import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/data/locations";
import { pageMeta } from "@/data/page-meta";
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

export const metadata: Metadata = {
  title: {
    default: pageMeta.home.title,
    template: "%s | Lupriv Plus",
  },
  description: pageMeta.home.description,
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: pageMeta.home.title,
    description: pageMeta.home.description,
    url: "/",
    siteName: SITE.brandName,
    locale: "hr_BA",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-charcoal-900 font-sans">
        <JsonLd data={organizationJsonLd()} />
        <div className="bg-emerald-800 text-center text-xs sm:text-sm text-emerald-50 px-4 py-2">
          Dostava diljem BiH · poštarina {SITE.deliveryFee} · besplatno iznad{" "}
          {SITE.freeDeliveryOver}
        </div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
