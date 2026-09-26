const DEFAULT_MEDIA_PREFIX = 'uploads/media'

const joinUrl = (...parts: (string | undefined)[]): string =>
  parts
    .filter(Boolean)
    .map((part) => part!.replace(/^\/+|\/+$/g, ''))
    .join('/')

type BuildS3FileUrlArgs = {
  filename: string
  prefix?: string | null
}

/**
 * Public URL for an S3 object. Prefer `S3_PREFIX` from env so URL generation
 * always matches the storage-s3 upload prefix.
 */
export const buildS3FileUrl = ({ filename, prefix }: BuildS3FileUrlArgs): string => {
  const encodedFilename = encodeURIComponent(filename)
  const resolvedPrefix = process.env.S3_PREFIX || prefix || DEFAULT_MEDIA_PREFIX
  return joinUrl(process.env.S3_ENDPOINT, resolvedPrefix, encodedFilename)
}
