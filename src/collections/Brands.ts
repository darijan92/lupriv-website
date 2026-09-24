import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access/anyone'

export const brandCategoryOptions = [
  { label: 'Dermokozmetika', value: 'dermokozmetika' },
  { label: 'Dodaci prehrani', value: 'dodaci' },
  { label: 'Njega kose', value: 'kosa' },
  { label: 'Sunce', value: 'sunce' },
  { label: 'Bebe', value: 'bebe' },
  { label: 'Ostalo', value: 'ostalo' },
] as const

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: 'Brand',
    plural: 'Brandovi',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'active', 'sort'],
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
    { name: 'name', type: 'text', required: true, label: 'Naziv' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: { position: 'sidebar' },
    },
    {
      name: 'focus',
      type: 'text',
      required: true,
      label: 'Jednoredni fokus',
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      required: true,
      label: 'Kategorije',
      options: [...brandCategoryOptions],
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktivan',
      defaultValue: true,
      admin: { position: 'sidebar' },
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
