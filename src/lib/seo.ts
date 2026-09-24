import type { Metadata } from 'next'
import type { Location, SiteSettings, WorkingHours } from '@/lib/site'

function toE164(local: string): string {
  const digits = local.replace(/\D/g, '')
  if (digits.startsWith('0')) return `+387-${digits.slice(1, 3)}-${digits.slice(3)}`
  if (digits.startsWith('387')) return `+${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
  return local
}

export function buildPageMetadata(
  page: { title: string; metaDescription: string },
  path: string,
  site: SiteSettings,
): Metadata {
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: path,
      siteName: site.brandName,
      locale: 'hr_BA',
      type: 'website',
    },
  }
}

export function organizationJsonLd(site: SiteSettings): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.brandName,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.streetAddress,
      addressLocality: site.addressLocality,
      postalCode: site.postalCode,
      addressCountry: site.addressCountry,
    },
    sameAs: [site.instagram],
  }
}

function openingHoursSpecification(hours: WorkingHours): Record<string, unknown>[] {
  const specs: Record<string, unknown>[] = [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: hours.start,
      closes: hours.end,
    },
  ]

  if (hours.saturday) {
    const [opens, closes] = hours.saturday.split('–')
    if (opens && closes) {
      specs.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: opens.trim(),
        closes: closes.trim(),
      })
    }
  }

  if (hours.sunday) {
    specs.push({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: hours.start,
      closes: hours.end,
    })
  }

  return specs
}

export function pharmacyJsonLd(loc: Location, site: SiteSettings): Record<string, unknown> {
  const base = site.url.replace(/\/$/, '')
  const data: Record<string, unknown> = {
    '@type': 'Pharmacy',
    name: `Ljekarna ${loc.name} — ${loc.address}`,
    url: `${base}/poslovnice`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.canton,
      addressCountry: 'BA',
    },
    openingHoursSpecification: openingHoursSpecification(loc.hours),
    parentOrganization: {
      '@type': 'Organization',
      name: site.brandName,
    },
  }

  if (loc.phone) data.telephone = toE164(loc.phone)
  if (loc.email) data.email = loc.email

  return data
}

export function pharmaciesJsonLd(locations: Location[], site: SiteSettings): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': locations.map((loc) => pharmacyJsonLd(loc, site)),
  }
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  site: SiteSettings,
): Record<string, unknown> {
  const base = site.url.replace(/\/$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Početna',
        item: `${base}/`,
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${base}${item.path}`,
      })),
    ],
  }
}

export function collectionPageJsonLd(
  opts: {
    name: string
    description: string
    path: string
    brandNames: string[]
  },
  site: SiteSettings,
): Record<string, unknown> {
  const base = site.url.replace(/\/$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: `${base}${opts.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: site.brandName,
      url: base,
    },
    about: {
      '@type': 'Pharmacy',
      name: site.brandName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.streetAddress,
        addressLocality: site.addressLocality,
        postalCode: site.postalCode,
        addressCountry: site.addressCountry,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Brandovi u poslovnicama',
      itemListElement: opts.brandNames.map((name, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Brand', name },
      })),
    },
  }
}
