import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access/anyone'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medij',
    plural: 'Mediji',
  },
  admin: {
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
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alternativni tekst',
    },
  ],
  upload: true,
}
