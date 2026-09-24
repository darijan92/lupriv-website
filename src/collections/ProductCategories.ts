import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access/anyone'

export const categoryIconOptions = [
  { label: 'Sparkles', value: 'Sparkles' },
  { label: 'Leaf', value: 'Leaf' },
  { label: 'Waves', value: 'Waves' },
  { label: 'Sun', value: 'Sun' },
  { label: 'Baby', value: 'Baby' },
  { label: 'Flower2', value: 'Flower2' },
] as const

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: {
    singular: 'Kategorija proizvoda',
    plural: 'Kategorije proizvoda',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sort'],
    group: 'Sadržaj',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultSort: 'sort',
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Naslov' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Opis',
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: 'Ikona (Lucide)',
      options: [...categoryIconOptions],
    },
    {
      name: 'href',
      type: 'text',
      label: 'Link (relativni)',
      admin: { description: 'Npr. /proizvodi?kat=dermokozmetika#brandovi' },
    },
    {
      name: 'sort',
      type: 'number',
      label: 'Redoslijed',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
