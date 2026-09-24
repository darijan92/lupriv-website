import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access/anyone'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Postavke stranice',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'brandName', type: 'text', required: true, label: 'Brand naziv' },
        { name: 'legalName', type: 'text', required: true, label: 'Pravni naziv' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Kratki naziv' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, label: 'E-pošta' },
        { name: 'phoneDisplay', type: 'text', required: true, label: 'Telefon (prikaz)' },
        { name: 'phoneE164', type: 'text', required: true, label: 'Telefon (E.164)' },
      ],
    },
    {
      name: 'streetAddress',
      type: 'text',
      required: true,
      label: 'Ulica',
    },
    {
      type: 'row',
      fields: [
        { name: 'addressLocality', type: 'text', required: true, label: 'Grad' },
        { name: 'postalCode', type: 'text', required: true, label: 'Poštanski broj' },
        { name: 'addressCountry', type: 'text', required: true, label: 'Država (ISO)' },
      ],
    },
    {
      name: 'addressLine',
      type: 'text',
      required: true,
      label: 'Adresa (jedna linija)',
    },
    {
      type: 'row',
      fields: [
        { name: 'instagram', type: 'text', required: true, label: 'Instagram URL' },
        { name: 'instagramHandle', type: 'text', required: true, label: 'Instagram handle' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'deliveryFee', type: 'text', required: true, label: 'Poštarina' },
        { name: 'freeDeliveryOver', type: 'text', required: true, label: 'Besplatna dostava iznad' },
        { name: 'since', type: 'number', required: true, label: 'Godina od' },
      ],
    },
    {
      name: 'citiesBio',
      type: 'array',
      label: 'Gradovi (bio)',
      labels: { singular: 'Grad', plural: 'Gradovi' },
      fields: [{ name: 'city', type: 'text', required: true, label: 'Grad' }],
    },
    {
      name: 'deliveryBannerText',
      type: 'text',
      label: 'Banner dostave (opcionalno)',
      admin: {
        description:
          'Ako je prazno, frontend koristi: Dostava diljem BiH · poštarina {fee} · besplatno iznad {free}',
      },
    },
    {
      name: 'footerTagline',
      type: 'text',
      label: 'Footer tagline',
    },
  ],
}
