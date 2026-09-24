import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { BrandFilterGrid } from "@/components/proizvodi/brand-filter-grid";
import { InstagramIcon } from "@/components/icons";
import { LucideIconByName } from "@/components/lucide-icon";
import {
  getBrands,
  getPageBySlug,
  getProductCategories,
  getSiteSettings,
} from "@/lib/payload";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSiteSettings(), getPageBySlug("proizvodi")]);
  if (!page) return {};
  return buildPageMetadata(page, "/proizvodi", site);
}

export default async function ProductsPage() {
  const [site, page, brands, categories] = await Promise.all([
    getSiteSettings(),
    getPageBySlug("proizvodi"),
    getBrands(),
    getProductCategories(),
  ]);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Proizvodi", path: "/proizvodi" }], site)} />
      <JsonLd
        data={collectionPageJsonLd(
          {
            name: page.h1,
            description: page.metaDescription,
            path: "/proizvodi",
            brandNames: brands.map((b) => b.name),
          },
          site,
        )}
      />

      <div className="max-w-3xl space-y-4">
        {page.eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            {page.eyebrow}
          </p>
        ) : null}
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-charcoal-900">
          {page.h1}
        </h1>
        {page.intro ? (
          <p className="text-lg leading-relaxed text-charcoal-600">{page.intro}</p>
        ) : null}
        {(page.paragraphs ?? []).map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-charcoal-600">
            {p.text}
          </p>
        ))}
      </div>

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

      <section className="mt-14" aria-labelledby="kategorije-heading">
        <h2
          id="kategorije-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-charcoal-900 sm:text-3xl"
        >
          {page.categoriesSectionHeading ?? "Kategorije asortimana"}
        </h2>
        {page.categoriesSectionIntro ? (
          <p className="mt-2 max-w-2xl text-charcoal-600">{page.categoriesSectionIntro}</p>
        ) : null}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} href={c.href || `#${c.slug}`}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <LucideIconByName name={c.icon} className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{c.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section id="kolekcija" className="mt-16 scroll-mt-28" aria-labelledby="kolekcija-heading">
        <h2
          id="kolekcija-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-charcoal-900 sm:text-3xl"
        >
          {page.collectionSectionHeading ?? "Što nudimo u našim ljekarnama"}
        </h2>
        {page.collectionSectionIntro ? (
          <p className="mt-2 max-w-2xl text-charcoal-600">{page.collectionSectionIntro}</p>
        ) : null}
        {(page.highlightCards?.length ?? 0) > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {page.highlightCards!.map((card) => (
              <Card key={card.title} className="h-full bg-sand-50 border-sand-200">
                <CardHeader>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-charcoal-600">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : null}
        <div className="mt-6">
          <Button asChild variant="outline">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-4 w-4" />
              Pogledajte {site.instagramHandle}
            </a>
          </Button>
        </div>
      </section>

      <section id="brandovi" className="mt-16 scroll-mt-28" aria-labelledby="brandovi-heading">
        <h2
          id="brandovi-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-charcoal-900 sm:text-3xl"
        >
          {page.brandsSectionHeading ?? "Svjetski brandovi koje možete pronaći"}
        </h2>
        {page.brandsSectionIntro ? (
          <p className="mt-2 max-w-3xl text-charcoal-600 leading-relaxed">
            {page.brandsSectionIntro}
          </p>
        ) : null}
        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-charcoal-600">Učitavanje brandova…</p>}>
            <BrandFilterGrid brands={brands} />
          </Suspense>
        </div>
        {page.disclaimer ? (
          <p className="mt-6 text-sm leading-relaxed text-charcoal-500">{page.disclaimer}</p>
        ) : null}
      </section>

      {(page.ctaHeading || page.ctaBody) && (
        <section
          className="mt-14 rounded-3xl border border-emerald-100 bg-sand-50 px-6 py-10 text-center sm:px-10"
          aria-labelledby="cta-heading"
        >
          {page.ctaHeading ? (
            <h2
              id="cta-heading"
              className="font-[family-name:var(--font-display)] text-2xl font-semibold text-charcoal-900"
            >
              {page.ctaHeading}
            </h2>
          ) : null}
          {page.ctaBody ? (
            <p className="mx-auto mt-3 max-w-xl text-charcoal-600">{page.ctaBody}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/poslovnice">Pronađite poslovnicu</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/kontakt">Javite nam se</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
