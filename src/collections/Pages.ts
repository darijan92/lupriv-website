import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access/anyone'

export const pageSlugOptions = [
  { label: 'Početna', value: 'home' },
  { label: 'O nama', value: 'o-nama' },
  { label: 'Usluge', value: 'usluge' },
  { label: 'Proizvodi', value: 'proizvodi' },
  { label: 'Poslovnice', value: 'poslovnice' },
  { label: 'Kontakt', value: 'kontakt' },
] as const

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Stranica',
    plural: 'Stranice',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['slug', 'title', 'updatedAt'],
    group: 'Sadržaj',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: [...pageSlugOptions],
      admin: { position: 'sidebar' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'SEO naslov',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      required: true,
      label: 'Meta opis',
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Nadnaslov (eyebrow)',
    },
    {
      name: 'h1',
      type: 'text',
      required: true,
      label: 'H1',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Uvod',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Dodatni odlomci',
      labels: { singular: 'Odlomak', plural: 'Odlomci' },
      fields: [
        { name: 'text', type: 'textarea', required: true, label: 'Tekst' },
      ],
    },
    {
      name: 'heroBadge',
      type: 'text',
      label: 'Hero badge',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'home',
      },
    },
    {
      name: 'aboutTeaser',
      type: 'textarea',
      label: 'O nama teaser (početna)',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'home',
      },
    },
    {
      name: 'servicesSectionHeading',
      type: 'text',
      label: 'Usluge — naslov sekcije',
    },
    {
      name: 'servicesSectionIntro',
      type: 'textarea',
      label: 'Usluge — uvod sekcije',
    },
    {
      name: 'productsTeaserHeading',
      type: 'text',
      label: 'Proizvodi teaser — naslov',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'home',
      },
    },
    {
      name: 'productsTeaserIntro',
      type: 'textarea',
      label: 'Proizvodi teaser — uvod',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'home',
      },
    },
    {
      name: 'ctaHeading',
      type: 'text',
      label: 'CTA naslov',
    },
    {
      name: 'ctaBody',
      type: 'textarea',
      label: 'CTA tekst',
    },
    {
      name: 'highlightCards',
      type: 'array',
      label: 'Istaknute kartice',
      labels: { singular: 'Kartica', plural: 'Kartice' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'categoriesSectionHeading',
      type: 'text',
      label: 'Kategorije — naslov',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'proizvodi',
      },
    },
    {
      name: 'categoriesSectionIntro',
      type: 'textarea',
      label: 'Kategorije — uvod',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'proizvodi',
      },
    },
    {
      name: 'collectionSectionHeading',
      type: 'text',
      label: 'Kolekcija — naslov',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'proizvodi',
      },
    },
    {
      name: 'collectionSectionIntro',
      type: 'textarea',
      label: 'Kolekcija — uvod',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'proizvodi',
      },
    },
    {
      name: 'brandsSectionHeading',
      type: 'text',
      label: 'Brandovi — naslov',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'proizvodi',
      },
    },
    {
      name: 'brandsSectionIntro',
      type: 'textarea',
      label: 'Brandovi — uvod',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'proizvodi',
      },
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      label: 'Napomena / disclaimer',
    },
    {
      name: 'dutyBadgeText',
      type: 'text',
      label: 'Badge dežurne',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.slug === 'poslovnice' || siblingData?.slug === 'home',
      },
    },
  ],
}
