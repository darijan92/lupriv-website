import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access/anyone'

export const serviceIconOptions = [
  { label: 'Stethoscope', value: 'Stethoscope' },
  { label: 'HeartPulse', value: 'HeartPulse' },
  { label: 'ClipboardList', value: 'ClipboardList' },
  { label: 'Sparkles', value: 'Sparkles' },
  { label: 'Leaf', value: 'Leaf' },
  { label: 'Truck', value: 'Truck' },
  { label: 'Package', value: 'Package' },
] as const

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Usluga',
    plural: 'Usluge',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'showOnHome', 'sort'],
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
      options: [...serviceIconOptions],
    },
    {
      name: 'imagePath',
      type: 'text',
      label: 'Putanja slike (npr. /images/skincare.jpg)',
      admin: { description: 'Opcionalno za kartice na početnoj.' },
    },
    { name: 'imageAlt', type: 'text', label: 'Alt tekst slike' },
    {
      name: 'showOnHome',
      type: 'checkbox',
      label: 'Prikaži na početnoj',
      defaultValue: false,
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
