/**
 * Strips whitespace and .env-style quotes from DATABASE_URL.
 * Vercel env values keep wrapping quotes that dotenv would have removed.
 */
export function sanitizeDatabaseUrl(raw: string): string {
  let value = raw.trim()
  const first = value.charAt(0)
  const last = value.charAt(value.length - 1)
  const hasWrappingQuotes =
    value.length >= 2 && (first === '"' || first === "'") && first === last
  if (hasWrappingQuotes) {
    value = value.slice(1, -1).trim()
  }
  return value.replace(/["']+$/g, '')
}
