import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { getPageBySlug, getSiteSettings } from "@/lib/payload";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSiteSettings(), getPageBySlug("o-nama")]);
  if (!page) return {};
  return buildPageMetadata(page, "/o-nama", site);
}

export default async function AboutPage() {
  const [site, page] = await Promise.all([getSiteSettings(), getPageBySlug("o-nama")]);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "O nama", path: "/o-nama" }], site)} />
      <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="max-w-3xl space-y-6 lg:col-span-3">
          {page.eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              {page.eyebrow}
            </p>
          ) : null}
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-charcoal-900">
            {page.h1}
          </h1>
          <div className="space-y-4 text-lg leading-relaxed text-charcoal-700">
            {page.intro ? <p>{page.intro}</p> : null}
            {(page.paragraphs ?? []).map((p, i) => (
              <p key={i}>{p.text}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link href="/poslovnice">Pronađite poslovnicu</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/kontakt">Javite nam se</Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg shadow-emerald-900/10 lg:col-span-2 lg:sticky lg:top-24">
          <Image
            src="/images/soft-green.jpg"
            alt="Mirni biljni detalji"
            fill
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {(page.highlightCards?.length ?? 0) > 0 ? (
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {page.highlightCards!.map((card, i) => (
            <Card key={card.title} className={i === 0 ? "bg-sand-50 border-sand-200" : undefined}>
              <CardHeader>
                <CardTitle className="text-base">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-charcoal-600">{card.description}</CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <p className="mt-10 text-sm text-charcoal-600">
        Pratite nas na Instagramu{" "}
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-800 hover:underline"
        >
          {site.instagramHandle}
        </a>
        .
      </p>
    </div>
  );
}
