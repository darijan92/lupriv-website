/**
 * Prints a redacted hint for composing DATABASE_URL from .atlas-credentials.env.
 * Never prints passwords or full credentialed URIs.
 *
 * Usage: pnpm exec tsx scripts/print-database-url-hint.ts
 */
import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
loadEnv({ path: path.join(root, '.atlas-credentials.env') , quiet: true })
loadEnv({ path: path.join(root, '.env.local') , quiet: true })
loadEnv({ path: path.join(root, '.env') , quiet: true })

const uri = process.env.MONGODB_URI?.trim()
const user = process.env.MONGODB_USERNAME?.trim()
const pass = process.env.MONGODB_PASSWORD?.trim()
const current = process.env.DATABASE_URL?.trim()

function redact(u: string): string {
  return u.replace(/^(mongodb(?:\+srv)?:\/\/)([^@/]+)@/i, '$1***@')
}

console.log('=== DATABASE_URL hint (secrets redacted) ===')
if (current) {
  console.log('Current DATABASE_URL:', redact(current))
} else {
  console.log('Current DATABASE_URL: (not set)')
}

console.log('')
console.log('Local Docker (day-to-day):')
console.log('  DATABASE_URL=mongodb://127.0.0.1:27018/lupriv-website')
console.log('  docker compose up -d')
console.log('  pnpm seed')

console.log('')
if (uri) {
  const redacted = redact(uri)
  console.log('Atlas MONGODB_URI present:', redacted)
  const hasCredsInUri = /^(mongodb(?:\+srv)?:\/\/)[^@/]+@/i.test(uri)
  if (hasCredsInUri) {
    console.log(
      'URI already includes userinfo. For production seed/deploy, set DATABASE_URL to that Atlas URI',
    )
    console.log('(in Vercel env or temporarily in .env.local). Append /lupriv-website?retryWrites=true&w=majority if missing db name.')
  } else if (user && pass) {
    console.log(
      'URI has no userinfo; compose: mongodb+srv://USER:PASS@HOST/lupriv-website?retryWrites=true&w=majority',
    )
    console.log('(username/password are in .atlas-credentials.env — do not commit; do not paste into chat).')
  } else {
    console.log('URI has no userinfo and username/password missing — fill .atlas-credentials.env.')
  }
} else {
  console.log('No .atlas-credentials.env / MONGODB_URI found.')
  console.log('For Atlas: set DATABASE_URL=mongodb+srv://USER:PASS@CLUSTER/lupriv-website?retryWrites=true&w=majority')
}

console.log('')
console.log('Production seed: point DATABASE_URL at Atlas, then: SEED_MODE=production pnpm seed')
console.log('Ensure Atlas Network Access allows your IP (or 0.0.0.0/0 for Vercel if appropriate).')
