import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access/anyone'
import { MEDIA_IMAGE_SIZES, WEBP_FORMAT_OPTIONS } from '@/lib/media-image-sizes'
import { buildS3FileUrl } from '@/lib/build-s3-file-url'

const sanitizeFilename = (filename: string): string =>
  filename
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medij',
    plural: 'Mediji',
  },
  admin: {
    group: 'Sadržaj',
    description:
      'PNG, JPEG, WebP ili GIF pretvaraju se u WebP (thumbnail 400 px, card 800 px, original do 1600×2400 px). SVG ostaje nepromijenjen. Alt tekst je obavezan.',
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
  upload: {
    mimeTypes: [
      'image/svg+xml',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/gif',
    ],
    adminThumbnail: ({ doc }) => {
      const sizes = doc.sizes
      const thumbnail =
        sizes && typeof sizes === 'object' && sizes !== null && 'thumbnail' in sizes
          ? (sizes as { thumbnail?: { filename?: string | null } | null }).thumbnail
          : undefined
      const filename =
        (typeof thumbnail === 'object' && thumbnail?.filename) ||
        (typeof doc.filename === 'string' ? doc.filename : null)
      if (!filename) return null
      return buildS3FileUrl({
        filename,
        prefix: typeof doc.prefix === 'string' ? doc.prefix : null,
      })
    },
    crop: true,
    focalPoint: true,
    formatOptions: {
      format: 'webp',
      options: {
        quality: WEBP_FORMAT_OPTIONS.master.quality,
        effort: WEBP_FORMAT_OPTIONS.master.effort,
      },
    },
    imageSizes: MEDIA_IMAGE_SIZES,
    resizeOptions: {
      width: 1600,
      height: 2400,
      fit: 'inside',
      withoutEnlargement: true,
    },
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (!data?.filename) {
          return data
        }
        const sanitizedFilename = sanitizeFilename(data.filename)
        if (!sanitizedFilename) {
          throw new Error(
            'Filename must contain at least one alphanumeric character after sanitization.',
          )
        }
        data.filename = sanitizedFilename
        return data
      },
    ],
  },
}
