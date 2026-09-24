import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access/anyone'

export const Locations: CollectionConfig = {
  slug: 'locations',
  labels: {
    singular: 'Poslovnica',
    plural: 'Poslovnice',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'city', 'isHq', 'isDuty', 'sort'],
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
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      label: 'Šifra',
      admin: { position: 'sidebar' },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Naziv',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Adresa',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'Grad',
    },
    {
      name: 'canton',
      type: 'text',
      required: true,
      label: 'Županija / kanton',
    },
    {
      name: 'hours',
      type: 'group',
      label: 'Radno vrijeme',
      fields: [
        { name: 'start', type: 'text', required: true, label: 'Početak (Pon–Pet)' },
        { name: 'end', type: 'text', required: true, label: 'Kraj (Pon–Pet)' },
        { name: 'sunday', type: 'checkbox', label: 'Radi nedjeljom', defaultValue: false },
        { name: 'saturday', type: 'text', label: 'Subota (npr. 08:00–19:00)' },
      ],
    },
    { name: 'phone', type: 'text', label: 'Telefon' },
    { name: 'email', type: 'email', label: 'E-pošta' },
    { name: 'isHq', type: 'checkbox', label: 'Sjedište', defaultValue: false },
    { name: 'isDuty', type: 'checkbox', label: 'Dežurna', defaultValue: false },
    {
      name: 'sort',
      type: 'number',
      label: 'Redoslijed',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
