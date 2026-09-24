import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { LocationFilter } from "@/components/locations/location-filter";
import { getLocations, getPageBySlug, getSiteSettings } from "@/lib/payload";
import { breadcrumbJsonLd, buildPageMetadata, pharmaciesJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([getSiteSettings(), getPageBySlug("poslovnice")]);
  if (!page) return {};
  return buildPageMetadata(page, "/poslovnice", site);
}

export default async function BranchesPage() {
  const [site, page, locations] = await Promise.all([
    getSiteSettings(),
    getPageBySlug("poslovnice"),
    getLocations(),
  ]);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Poslovnice", path: "/poslovnice" }], site)} />
      <JsonLd data={pharmaciesJsonLd(locations, site)} />
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
          <p className="text-lg leading-relaxed text-charcoal-600">{page.intro}</p>
        ) : null}
        {page.dutyBadgeText ? (
          <Badge variant="duty" className="w-fit">
            {page.dutyBadgeText}
          </Badge>
        ) : null}
      </div>
      <div className="mt-10">
        <LocationFilter locations={locations} />
      </div>
    </div>
  );
}
