// Gallery helpers shared by main and the renderer: resolution tiers for the
// "find a higher resolution" search, and the page an image came from.

// Tiers are minimums on the SHORTER side, so a 1080x1920 phone wallpaper is
// 1080p like its landscape twin. pictureLibrary's RESOLUTION_SQL uses the
// same thresholds.
export const RESOLUTION_TIERS = [
  { short: 1080, long: 1920 },
  { short: 1440, long: 2560 },
  { short: 2160, long: 3840 }
] as const

// The smallest tier above the image's shorter side, oriented like the image.
// Null when the size is unknown or already 4K+.
export function nextResolutionTier(
  width: number | null,
  height: number | null
): { width: number; height: number } | null {
  if (!width || !height) return null
  const short = Math.min(width, height)
  const tier = RESOLUTION_TIERS.find((t) => t.short > short)
  if (!tier) return null
  return width >= height
    ? { width: tier.long, height: tier.short }
    : { width: tier.short, height: tier.long }
}

// A search result is an upgrade only when its known shorter side beats the
// current image's. Unknown result sizes are kept: the user can judge them.
export function isLarger(
  result: { width: number | null; height: number | null },
  width: number,
  height: number
): boolean {
  if (!result.width || !result.height) return true
  return Math.min(result.width, result.height) > Math.min(width, height)
}

// Where "Open original" goes: the provider's page for the image when its file
// URL identifies one, otherwise the file URL itself. Null for local files.
export function sourcePageUrl(source: string | null, sourceUrl: string | null): string | null {
  if (!sourceUrl || !/^https?:\/\//i.test(sourceUrl)) return null
  if (source === 'wallhaven') {
    const m = /\/wallhaven-([a-z0-9]+)\.\w+$/i.exec(sourceUrl)
    if (m) return `https://wallhaven.cc/w/${m[1]}`
  }
  if (source === 'danbooru') {
    const m = /\/([0-9a-f]{32})\.\w+$/i.exec(sourceUrl)
    if (m) return `https://danbooru.donmai.us/posts?tags=md5%3A${m[1].toLowerCase()}`
  }
  return sourceUrl
}
