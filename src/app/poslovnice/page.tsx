import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { LocationFilter } from "@/components/locations/location-filter";
import { breadcrumbJsonLd, buildPageMetadata, pharmaciesJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("poslovnice", "/poslovnice");

export default function BranchesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "Poslovnice", path: "/poslovnice" }])} />
      <JsonLd data={pharmaciesJsonLd()} />
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Poslovnice</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          Poslovnice Lupriv Plus u Mostaru
        </h1>
        <p className="text-lg leading-relaxed text-charcoal-600">
          Pronađite najbližu Lupriv Plus ljekarnu — adresa, telefon i radno vrijeme na jednom
          mjestu.
        </p>
        <Badge variant="duty" className="w-fit">
          Dežurna · Stjepana Radića 37
        </Badge>
      </div>
      <div className="mt-10">
        <LocationFilter />
      </div>
    </div>
  );
}
