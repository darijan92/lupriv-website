const LOCAL_FALLBACK_ORIGIN = 'http://localhost:3456'

function isAbsoluteHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function normalizeOrigin(value: string): string {
  return new URL(value).origin
}

/**
 * Resolves the public site origin for metadata, sitemap, and JSON-LD.
 * Prefers a valid CMS URL, then NEXT_PUBLIC_SERVER_URL, then the Vercel
 * deployment host, then local development.
 */
export function resolvePublicSiteUrl(cmsUrl: unknown = null): string {
  const fromCms = typeof cmsUrl === 'string' ? cmsUrl.trim() : ''
  if (isAbsoluteHttpUrl(fromCms)) return normalizeOrigin(fromCms)
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.trim() ?? ''
  if (isAbsoluteHttpUrl(fromEnv)) return normalizeOrigin(fromEnv)
  const vercelHost = process.env.VERCEL_URL?.trim() ?? ''
  const vercelOrigin = vercelHost.length > 0 ? `https://${vercelHost}` : ''
  if (isAbsoluteHttpUrl(vercelOrigin)) return normalizeOrigin(vercelOrigin)
  return LOCAL_FALLBACK_ORIGIN
}
