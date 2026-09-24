import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Korisnik',
    plural: 'Korisnici',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Ime',
    },
  ],
}
