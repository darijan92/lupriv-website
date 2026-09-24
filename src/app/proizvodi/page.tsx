import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  Baby,
  Flower2,
  Leaf,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { BrandFilterGrid } from "@/components/proizvodi/brand-filter-grid";
import { InstagramIcon } from "@/components/icons";
import { SITE } from "@/data/locations";
import { brands } from "@/data/brands";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("proizvodi", "/proizvodi");

const categories = [
  {
    id: "dermokozmetika",
    icon: Sparkles,
    title: "Dermokozmetika",
    desc: "Njega lica i tijela za osjetljivu i normalnu kožu.",
    href: "/proizvodi?kat=dermokozmetika#brandovi",
  },
  {
    id: "dodaci",
    icon: Leaf,
    title: "Dodaci prehrani",
    desc: "Vitamini, minerali i pripravci uz savjet farmaceuta.",
    href: "/proizvodi?kat=dodaci#brandovi",
  },
  {
    id: "kosa",
    icon: Waves,
    title: "Njega kose",
    desc: "Dermatološke linije za svakodnevnu i ciljanu njegu.",
    href: "/proizvodi?kat=kosa#brandovi",
  },
  {
    id: "sunce",
    icon: Sun,
    title: "Zaštita od sunca",
    desc: "Fotoprotekcija za lice i tijelo kroz cijelu godinu.",
    href: "/proizvodi?kat=sunce#brandovi",
  },
  {
    id: "bebe",
    icon: Baby,
    title: "Bebe i djeca",
    desc: "Nježna njega i dodaci prilagođeni najmlađima.",
    href: "/proizvodi?kat=bebe#brandovi",
  },
  {
    id: "sezonska",
    icon: Flower2,
    title: "Sezonska ponuda",
    desc: "Asortiman koji prati godišnje doba i tipične tegobe.",
    href: "#kolekcija",
  },
];

const collectionCards = [
  {
    title: "Njega kože i tijela",
    desc: "Krema, losioni i proizvodi za svakodnevnu njegu koje biramo za osjetljivu i normalnu kožu. Fokus je na jednostavnoj uporabi i sastojcima koje ljekarnici mogu objasniti bez marketinga.",
  },
  {
    title: "Dodaci prehrani",
    desc: "Vitamini, minerali i pripravci za podršku organizmu, u skladu s potrebama koje najčešće čujemo od naših kupaca. Savjet o dozi i prikladnosti uvijek možete zatražiti u ljekarni.",
  },
  {
    title: "Sezonska podrška",
    desc: "U hladnijim mjesecima i u sezoni alergija širimo ponudu proizvodima koji pomažu kod tipičnih tegoba (imunitet, vlažnost zraka, blaga njega). Asortiman se mijenja kroz godinu, pa pitajte što je trenutačno dostupno u vašoj poslovnici.",
  },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Proizvodi", path: "/proizvodi" }])} />
      <JsonLd
        data={collectionPageJsonLd({
          name: "Proizvodi i brandovi u Ljekarnama Lupriv Plus",
          description:
            "Pregled asortimana i svjetskih brandova dostupnih u poslovnicama Ljekarni Lupriv Plus u Mostaru.",
          path: "/proizvodi",
          brandNames: brands.map((b) => b.name),
        })}
      />

      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Proizvodi
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-charcoal-900">
          Proizvodi i brandovi u Ljekarnama Lupriv Plus
        </h1>
        <p className="text-lg leading-relaxed text-charcoal-600">
          U našim ljekarnama u Mostaru i diljem BiH nalazite širok asortiman lijekova, dermatološke
          njege, dodataka prehrani i proizvoda za svakodnevnu zdravstvenu njegu. Dio ponude čini i
          vlastita kolekcija Lupriv Plus, koju biramo i razvijamo uz iste standarde koje njegujemo od{" "}
          {SITE.since}.
        </p>
        <p className="text-base leading-relaxed text-charcoal-600">
          Ova stranica je pregled asortimana u poslovnicama — ne online trgovina. Za dostupnost
          pitajte farmaceuta; ponuda se može razlikovati po poslovnici.
        </p>
      </div>

      {/* Image strip */}
      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          { src: "/images/skincare.jpg", alt: "Proizvodi za njegu kože" },
          { src: "/images/botanicals.jpg", alt: "Biljni detalji njege" },
          { src: "/images/shelves.jpg", alt: "Police ljekarne" },
        ].map((img) => (
          <div
            key={img.src}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md shadow-emerald-900/10"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Categories */}
      <section className="mt-14" aria-labelledby="kategorije-heading">
        <h2
          id="kategorije-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-charcoal-900 sm:text-3xl"
        >
          Kategorije asortimana
        </h2>
        <p className="mt-2 max-w-2xl text-charcoal-600">
          Odaberite kategoriju i pogledajte brandove koje najčešće držimo u našim ljekarnama.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.id} href={c.href} className="group block h-full">
              <Card className="h-full transition group-hover:-translate-y-0.5 group-hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{c.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Naša kolekcija */}
      <section id="kolekcija" className="mt-16 scroll-mt-28" aria-labelledby="kolekcija-heading">
        <h2
          id="kolekcija-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-charcoal-900 sm:text-3xl"
        >
          Što nudimo u našim ljekarnama
        </h2>
        <p className="mt-2 max-w-2xl text-charcoal-600">
          Vlastita kolekcija Lupriv Plus i sezonski odabiri koje kuriraju naši farmaceuti. Aktualne
          akcije pratite na Instagramu {SITE.instagramHandle}.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {collectionCards.map((card) => (
            <Card key={card.title} className="h-full bg-sand-50 border-sand-200">
              <CardHeader>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-charcoal-600">
                  {card.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild variant="outline">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-4 w-4" />
              Pogledajte {SITE.instagramHandle}
            </a>
          </Button>
        </div>
      </section>

      {/* Brands */}
      <section id="brandovi" className="mt-16 scroll-mt-28" aria-labelledby="brandovi-heading">
        <h2
          id="brandovi-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-charcoal-900 sm:text-3xl"
        >
          Svjetski brandovi koje možete pronaći
        </h2>
        <p className="mt-2 max-w-3xl text-charcoal-600 leading-relaxed">
          Uz vlastitu kolekciju, u ljekarnama Lupriv Plus držimo poznate i pouzdane brendove iz
          farmacije, dermatologije i zdravstvene njege. Cilj nam je da na jednom mjestu nađete ono
          što vam treba, uz stručni savjet farmaceutskog osoblja.
        </p>
        <div className="mt-8">
          <Suspense
            fallback={
              <p className="text-sm text-charcoal-600">Učitavanje brandova…</p>
            }
          >
            <BrandFilterGrid />
          </Suspense>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-charcoal-500">
          Točan asortiman može se razlikovati po poslovnici, ovisno o prostoru, potražnji i
          dostupnosti dobavljača. Za konkretan proizvod najbolje je pitati u najbližoj ljekarni ili
          nas kontaktirati.
        </p>
      </section>

      {/* CTA */}
      <section
        className="mt-14 rounded-3xl border border-emerald-100 bg-sand-50 px-6 py-10 text-center sm:px-10"
        aria-labelledby="cta-heading"
      >
        <h2
          id="cta-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-charcoal-900"
        >
          Posjetite poslovnice u Mostaru
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-charcoal-600">
          Pronađite najbližu ljekarnu, javite nam se ili pratite aktualne ponude na Instagramu.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/poslovnice">Pronađite poslovnicu</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/kontakt">Javite nam se</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
