import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Locations } from './collections/Locations'
import { Brands } from './collections/Brands'
import { Services } from './collections/Services'
import { ProductCategories } from './collections/ProductCategories'
import { Pages } from './collections/Pages'
import { SiteSettings } from './globals/SiteSettings'
import { buildS3FileUrl } from './lib/build-s3-file-url'
import { sanitizeDatabaseUrl } from './lib/sanitize-database-url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseURL = sanitizeDatabaseUrl(process.env.DATABASE_URL ?? '')
if (!databaseURL) {
  throw new Error(
    'DATABASE_URL is required (MongoDB connection string). See .env.example — e.g. mongodb://127.0.0.1:27018/lupriv-website',
  )
}
if (!/^mongodb(\+srv)?:\/\//i.test(databaseURL)) {
  throw new Error(
    'DATABASE_URL must be a MongoDB URL (mongodb:// or mongodb+srv://). SQLite/file: URLs are no longer supported.',
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Locations, Brands, Services, ProductCategories, Pages],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: databaseURL,
    // Keep pools tiny on Vercel — each serverless instance opens its own pool.
    connectOptions: {
      maxPoolSize: 10,
      minPoolSize: 0,
      maxIdleTimeMS: 10000,
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: process.env.S3_PREFIX || 'uploads/media',
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => buildS3FileUrl({ filename, prefix }),
        },
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
      },
    }),
  ],
})
