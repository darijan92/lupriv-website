export type WorkingHours = {
  start: string
  end: string
  sunday: boolean
  saturday?: string | null
}

export type Location = {
  code: string
  name: string
  address: string
  city: string
  canton: string
  hours: WorkingHours
  phone: string | null
  email: string | null
  isHq?: boolean | null
  isDuty?: boolean | null
}

export type BrandCategory =
  | 'dermokozmetika'
  | 'dodaci'
  | 'kosa'
  | 'sunce'
  | 'bebe'
  | 'ostalo'

export type Brand = {
  id: string
  name: string
  focus: string
  categories: BrandCategory[]
}

export type SiteSettings = {
  name: string
  brandName: string
  legalName: string
  url: string
  email: string
  phoneDisplay: string
  phoneE164: string
  streetAddress: string
  addressLocality: string
  postalCode: string
  addressCountry: string
  addressLine: string
  instagram: string
  instagramHandle: string
  deliveryFee: string
  freeDeliveryOver: string
  since: number
  citiesBio: string[]
  deliveryBannerText?: string | null
  footerTagline?: string | null
}

export type PageContent = {
  slug: string
  title: string
  metaDescription: string
  eyebrow?: string | null
  h1: string
  intro?: string | null
  paragraphs?: { text: string }[] | null
  heroBadge?: string | null
  aboutTeaser?: string | null
  servicesSectionHeading?: string | null
  servicesSectionIntro?: string | null
  productsTeaserHeading?: string | null
  productsTeaserIntro?: string | null
  ctaHeading?: string | null
  ctaBody?: string | null
  highlightCards?: { title: string; description: string }[] | null
  categoriesSectionHeading?: string | null
  categoriesSectionIntro?: string | null
  collectionSectionHeading?: string | null
  collectionSectionIntro?: string | null
  brandsSectionHeading?: string | null
  brandsSectionIntro?: string | null
  disclaimer?: string | null
  dutyBadgeText?: string | null
}

export type ServiceItem = {
  slug: string
  title: string
  description: string
  icon: string
  imagePath?: string | null
  imageAlt?: string | null
  showOnHome?: boolean | null
}

export type ProductCategoryItem = {
  slug: string
  title: string
  description: string
  icon: string
  href?: string | null
}

export const brandCategoryLabels: Record<Exclude<BrandCategory, 'ostalo'>, string> = {
  dermokozmetika: 'Dermokozmetika',
  dodaci: 'Dodaci prehrani',
  kosa: 'Njega kose',
  sunce: 'Sunce',
  bebe: 'Bebe',
}

export const brandFilterChips: { id: 'svi' | Exclude<BrandCategory, 'ostalo'>; label: string }[] = [
  { id: 'svi', label: 'Svi' },
  { id: 'dermokozmetika', label: 'Dermokozmetika' },
  { id: 'dodaci', label: 'Dodaci prehrani' },
  { id: 'kosa', label: 'Njega kose' },
  { id: 'sunce', label: 'Sunce' },
  { id: 'bebe', label: 'Bebe' },
]

export function formatHours(hours: WorkingHours): string[] {
  const lines: string[] = [`Pon–Pet: ${hours.start}–${hours.end}`]
  if (hours.saturday) lines.push(`Subota: ${hours.saturday}`)
  if (hours.sunday) lines.push(`Nedjelja: ${hours.start}–${hours.end}`)
  return lines
}

export function mapsUrl(loc: Pick<Location, 'address' | 'city'>): string {
  const q = encodeURIComponent(`${loc.address}, ${loc.city}`)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

export function deliveryBanner(site: SiteSettings): string {
  if (site.deliveryBannerText?.trim()) return site.deliveryBannerText.trim()
  return `Dostava diljem BiH · poštarina ${site.deliveryFee} · besplatno iznad ${site.freeDeliveryOver}`
}
