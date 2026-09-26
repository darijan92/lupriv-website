import type { ImageSize, ImageUploadFormatOptions } from 'payload'

export const WEBP_FORMAT_OPTIONS = {
  master: { quality: 82, effort: 5 },
  variants: { quality: 78, effort: 5 },
} as const

export const MEDIA_DEVICE_SIZES = [400, 800, 1600] as const

const variantFormatOptions: ImageUploadFormatOptions = {
  format: 'webp',
  options: {
    quality: WEBP_FORMAT_OPTIONS.variants.quality,
    effort: WEBP_FORMAT_OPTIONS.variants.effort,
  },
}

type CreateWebpImageSizeArgs = {
  name: string
  width: number
}

export const createWebpImageSize = ({ name, width }: CreateWebpImageSizeArgs): ImageSize => ({
  name,
  width,
  fit: 'inside',
  withoutEnlargement: true,
  formatOptions: variantFormatOptions,
})

export const MEDIA_IMAGE_SIZES: ImageSize[] = [
  createWebpImageSize({ name: 'thumbnail', width: 400 }),
  createWebpImageSize({ name: 'card', width: 800 }),
]

export const MEDIA_VARIANT_GROUPS = {
  thumbnail: ['thumbnail'],
  fluid: ['thumbnail', 'card'],
} as const

export type MediaVariant = keyof typeof MEDIA_VARIANT_GROUPS

export type MediaSizeName = (typeof MEDIA_VARIANT_GROUPS)[MediaVariant][number]
