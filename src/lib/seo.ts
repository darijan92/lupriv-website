import type { Metadata } from "next";
import { pageMeta, type PageMetaKey } from "@/data/page-meta";
import { HQ, SITE, locations, type Location, type WorkingHours } from "@/data/locations";

const BASE = SITE.url;

/** Convert local BA phone like "036/332-636" to "+387-36-332-636". */
export function toE164(phone: string): string {
  const cleaned = phone.replace(/\s/g, "");
  const withoutSlash = cleaned.replace(/\//g, "-");
  if (withoutSlash.startsWith("0")) {
    return `+387-${withoutSlash.slice(1)}`;
  }
  if (withoutSlash.startsWith("+")) return withoutSlash;
  return `+387-${withoutSlash}`;
}

export function buildPageMetadata(key: PageMetaKey, path: string): Metadata {
  const meta = pageMeta[key];
  const canonical = path === "/" ? "/" : path;

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: SITE.brandName,
      locale: "hr_BA",
      type: "website",
    },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brandName,
    alternateName: SITE.legalName,
    url: BASE,
    foundingDate: String(SITE.since),
    email: SITE.email,
    telephone: SITE.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.addressLocality,
      postalCode: SITE.postalCode,
      addressCountry: SITE.addressCountry,
    },
    sameAs: [SITE.instagram],
  };
}

function openingHoursSpecification(hours: WorkingHours): Record<string, unknown>[] {
  const specs: Record<string, unknown>[] = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: hours.start,
      closes: hours.end,
    },
  ];

  if (hours.saturday) {
    const parts = hours.saturday.split(/[–-]/).map((s) => s.trim());
    if (parts.length >= 2) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: parts[0],
        closes: parts[1],
      });
    }
  }

  if (hours.sunday) {
    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: hours.start,
      closes: hours.end,
    });
  }

  return specs;
}

export function pharmacyJsonLd(loc: Location): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@type": "Pharmacy",
    name: `Ljekarna ${loc.name} — ${loc.address}`,
    url: `${BASE}/poslovnice`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.canton,
      addressCountry: "BA",
    },
    openingHoursSpecification: openingHoursSpecification(loc.hours),
    parentOrganization: {
      "@type": "Organization",
      name: SITE.brandName,
    },
  };

  if (loc.phone) data.telephone = toE164(loc.phone);
  if (loc.email) data.email = loc.email;

  return data;
}

export function pharmaciesJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": locations.map(pharmacyJsonLd),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Početna",
        item: `${BASE}/`,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${BASE}${item.path}`,
      })),
    ],
  };
}

/** HQ NAP — single source used by schema; mirrors SITE. */
export const NAP = {
  brandName: SITE.brandName,
  legalName: SITE.legalName,
  streetAddress: SITE.streetAddress,
  addressLocality: SITE.addressLocality,
  postalCode: SITE.postalCode,
  addressCountry: SITE.addressCountry,
  addressLine: SITE.addressLine,
  phone: SITE.phoneDisplay,
  phoneE164: SITE.phoneE164,
  email: SITE.email,
  hq: HQ,
} as const;
