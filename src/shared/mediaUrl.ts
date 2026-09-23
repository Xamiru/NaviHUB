// Builds the navimg:// custom-protocol URL for a stored relative media path.
// Pure string transform (no fs / electron imports) so BOTH the main process and
// the renderer can use it — the renderer builds cover URLs synchronously without
// an IPC round-trip per image.
//
// Must stay in sync with the navimg protocol handler's decode in src/main/index.ts
// (`decodeURIComponent(url.host + url.pathname)`): each path segment is
// percent-encoded so filenames with spaces/punctuation resolve correctly.
export function mediaUrl(relPath: string | null | undefined): string | null {
  if (!relPath) return null
  const encoded = relPath
    .split('\\')
    .join('/')
    .split('/')
    .map(encodeURIComponent)
    .join('/')
  return `navimg://${encoded}`
}

// Shared with the navimg thumbnail parser so renderer requests always use a
// width the main process can serve. Keep these sorted from smallest to largest.
export const THUMB_WIDTHS: readonly number[] = [160, 320, 480]

// Use the smallest cached size at least as wide as the caller needs. Larger
// artwork and paths outside media/ use their original URL via CoverImage.
export function thumbUrl(relPath: string | null | undefined, width: number): string | null {
  if (!relPath || !Number.isFinite(width) || width <= 0) return null
  const sourceRel = relPath.split('\\').join('/')
  if (!sourceRel.startsWith('media/')) return null
  const cachedWidth = THUMB_WIDTHS.find((candidate) => candidate >= width)
  return cachedWidth ? mediaUrl(`thumb/${cachedWidth}/${sourceRel}`) : null
}
