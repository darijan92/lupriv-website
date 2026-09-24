import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { LucideIconByName } from "@/components/lucide-icon";
import { getPageBySlug, getServices, getSiteSettings } from "@/lib/payload";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSiteSettings(), getPageBySlug("usluge")]);
  if (!page) return {};
  return buildPageMetadata(page, "/usluge", site);
}

export default async function ServicesPage() {
  const [site, page, services] = await Promise.all([
    getSiteSettings(),
    getPageBySlug("usluge"),
    getServices(),
  ]);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Usluge", path: "/usluge" }], site)} />
      <div className="max-w-3xl space-y-4">
        {page.eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            {page.eyebrow}
          </p>
        ) : null}
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          {page.h1}
        </h1>
        {page.intro ? (
          <p className="text-lg text-charcoal-600 leading-relaxed">{page.intro}</p>
        ) : null}
        <Badge variant="promo" className="w-fit">
          Dostava {site.deliveryFee} · besplatno iznad {site.freeDeliveryOver}
        </Badge>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Card
            key={s.slug}
            id={s.slug}
            className="h-full scroll-mt-28 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <LucideIconByName name={s.icon} className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">{s.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">{s.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-charcoal-600">
        Tražite brandove i asortiman?{" "}
        <Link
          href="/proizvodi"
          className="font-medium text-emerald-800 underline-offset-4 hover:underline"
        >
          Pogledajte proizvode i brandove
        </Link>
        .
      </p>

      {(page.ctaHeading || page.ctaBody) && (
        <div className="mt-14 rounded-3xl border border-emerald-100 bg-sand-50 px-6 py-10 text-center sm:px-10">
          {page.ctaHeading ? (
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              {page.ctaHeading}
            </h2>
          ) : null}
          {page.ctaBody ? <p className="mt-3 text-charcoal-600">{page.ctaBody}</p> : null}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/poslovnice">Pronađite poslovnicu</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/kontakt">Javite nam se</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
