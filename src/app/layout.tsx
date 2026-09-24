import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE } from "@/data/locations";
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
    default: "Ljekarne Lupriv Plus | Mostar i BiH od 1994.",
    template: "%s | Lupriv Plus",
  },
  description:
    "Ljekarne Lupriv Plus — recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Tradicija od 1994. Pronađite poslovnicu ili nas kontaktirajte.",
  metadataBase: new URL("https://luprivplus.com"),
  openGraph: {
    title: "Ljekarne Lupriv Plus | Mostar i BiH od 1994.",
    description:
      "Ljekarne Lupriv Plus — recepti, farmaceutsko savjetovanje, ortopedska pomagala i dostava diljem BiH. Tradicija od 1994.",
    locale: "hr_BA",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-charcoal-900 font-sans">
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
