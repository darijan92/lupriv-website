import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseURL = process.env.DATABASE_URL
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
  }),
  sharp,
  plugins: [],
})
