import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { resolvePublicSiteUrl } from '@/lib/public-site-url'
import type {
  Brand,
  BrandCategory,
  Location,
  PageContent,
  ProductCategoryItem,
  ServiceItem,
  SiteSettings,
} from '@/lib/site'

export async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

function mapLocation(doc: {
  code: string
  name: string
  address: string
  city: string
  canton: string
  hours: { start: string; end: string; sunday?: boolean | null; saturday?: string | null }
  phone?: string | null
  email?: string | null
  isHq?: boolean | null
  isDuty?: boolean | null
}): Location {
  return {
    code: doc.code,
    name: doc.name,
    address: doc.address,
    city: doc.city,
    canton: doc.canton,
    hours: {
      start: doc.hours.start,
      end: doc.hours.end,
      sunday: Boolean(doc.hours.sunday),
      saturday: doc.hours.saturday || undefined,
    },
    phone: doc.phone ?? null,
    email: doc.email ?? null,
    isHq: doc.isHq ?? false,
    isDuty: doc.isDuty ?? false,
  }
}

function mapBrand(doc: {
  slug: string
  name: string
  focus: string
  categories?: (string | null)[] | null
}): Brand {
  return {
    id: doc.slug,
    name: doc.name,
    focus: doc.focus,
    categories: (doc.categories ?? []).filter(Boolean) as BrandCategory[],
  }
}

function mapSite(doc: Record<string, unknown>): SiteSettings {
  const cities = Array.isArray(doc.citiesBio)
    ? (doc.citiesBio as { city?: string }[]).map((c) => c.city).filter(Boolean) as string[]
    : []
  return {
    name: String(doc.name ?? ''),
    brandName: String(doc.brandName ?? ''),
    legalName: String(doc.legalName ?? ''),
    url: resolvePublicSiteUrl(doc.url),
    email: String(doc.email ?? ''),
    phoneDisplay: String(doc.phoneDisplay ?? ''),
    phoneE164: String(doc.phoneE164 ?? ''),
    streetAddress: String(doc.streetAddress ?? ''),
    addressLocality: String(doc.addressLocality ?? ''),
    postalCode: String(doc.postalCode ?? ''),
    addressCountry: String(doc.addressCountry ?? 'BA'),
    addressLine: String(doc.addressLine ?? ''),
    instagram: String(doc.instagram ?? ''),
    instagramHandle: String(doc.instagramHandle ?? ''),
    deliveryFee: String(doc.deliveryFee ?? ''),
    freeDeliveryOver: String(doc.freeDeliveryOver ?? ''),
    since: Number(doc.since ?? 1994),
    citiesBio: cities,
    deliveryBannerText: (doc.deliveryBannerText as string | null) ?? null,
    footerTagline: (doc.footerTagline as string | null) ?? null,
  }
}

function mapPage(doc: Record<string, unknown>): PageContent {
  return {
    slug: String(doc.slug ?? ''),
    title: String(doc.title ?? ''),
    metaDescription: String(doc.metaDescription ?? ''),
    eyebrow: (doc.eyebrow as string | null) ?? null,
    h1: String(doc.h1 ?? ''),
    intro: (doc.intro as string | null) ?? null,
    paragraphs: (doc.paragraphs as { text: string }[] | null) ?? null,
    heroBadge: (doc.heroBadge as string | null) ?? null,
    aboutTeaser: (doc.aboutTeaser as string | null) ?? null,
    servicesSectionHeading: (doc.servicesSectionHeading as string | null) ?? null,
    servicesSectionIntro: (doc.servicesSectionIntro as string | null) ?? null,
    productsTeaserHeading: (doc.productsTeaserHeading as string | null) ?? null,
    productsTeaserIntro: (doc.productsTeaserIntro as string | null) ?? null,
    ctaHeading: (doc.ctaHeading as string | null) ?? null,
    ctaBody: (doc.ctaBody as string | null) ?? null,
    highlightCards: (doc.highlightCards as { title: string; description: string }[] | null) ?? null,
    categoriesSectionHeading: (doc.categoriesSectionHeading as string | null) ?? null,
    categoriesSectionIntro: (doc.categoriesSectionIntro as string | null) ?? null,
    collectionSectionHeading: (doc.collectionSectionHeading as string | null) ?? null,
    collectionSectionIntro: (doc.collectionSectionIntro as string | null) ?? null,
    brandsSectionHeading: (doc.brandsSectionHeading as string | null) ?? null,
    brandsSectionIntro: (doc.brandsSectionIntro as string | null) ?? null,
    disclaimer: (doc.disclaimer as string | null) ?? null,
    dutyBadgeText: (doc.dutyBadgeText as string | null) ?? null,
  }
}

const getCachedSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    return mapSite(doc as unknown as Record<string, unknown>)
  },
  ['site-settings'],
  { revalidate: 60, tags: ['site-settings'] },
)

export const getSiteSettings = cache(async () => getCachedSiteSettings())

const getCachedLocations = unstable_cache(
  async (): Promise<Location[]> => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'locations',
      limit: 100,
      depth: 0,
      sort: 'sort',
      pagination: false,
    })
    return result.docs.map((d) => mapLocation(d as never))
  },
  ['locations'],
  { revalidate: 60, tags: ['locations'] },
)

export const getLocations = cache(async () => getCachedLocations())

export const getHq = cache(async () => {
  const locs = await getLocations()
  return locs.find((l) => l.isHq) ?? locs[0]
})

const getCachedBrands = unstable_cache(
  async (): Promise<Brand[]> => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'brands',
      where: { active: { equals: true } },
      limit: 100,
      depth: 0,
      sort: 'sort',
      pagination: false,
    })
    return result.docs.map((d) => mapBrand(d as never))
  },
  ['brands'],
  { revalidate: 60, tags: ['brands'] },
)

export const getBrands = cache(async () => getCachedBrands())

const getCachedServices = unstable_cache(
  async (): Promise<ServiceItem[]> => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'services',
      limit: 50,
      depth: 0,
      sort: 'sort',
      pagination: false,
    })
    return result.docs.map((d) => ({
      slug: d.slug,
      title: d.title,
      description: d.description,
      icon: d.icon,
      imagePath: d.imagePath,
      imageAlt: d.imageAlt,
      showOnHome: d.showOnHome,
    }))
  },
  ['services'],
  { revalidate: 60, tags: ['services'] },
)

export const getServices = cache(async () => getCachedServices())

const getCachedProductCategories = unstable_cache(
  async (): Promise<ProductCategoryItem[]> => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'product-categories',
      limit: 50,
      depth: 0,
      sort: 'sort',
      pagination: false,
    })
    return result.docs.map((d) => ({
      slug: d.slug,
      title: d.title,
      description: d.description,
      icon: d.icon,
      href: d.href,
    }))
  },
  ['product-categories'],
  { revalidate: 60, tags: ['product-categories'] },
)

export const getProductCategories = cache(async () => getCachedProductCategories())

export const getPageBySlug = cache(async (slug: string): Promise<PageContent | null> => {
  const getCached = unstable_cache(
    async (): Promise<PageContent | null> => {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
        pagination: false,
      })
      const doc = result.docs[0]
      if (!doc) return null
      return mapPage(doc as unknown as Record<string, unknown>)
    },
    ['page', slug],
    { revalidate: 60, tags: ['pages', `pages_${slug}`] },
  )
  return getCached()
})
