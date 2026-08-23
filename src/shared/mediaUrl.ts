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

// A downscaled variant of a stored image, served from the main process's disk
// cache (generated on first request — see src/main/thumbs.ts). Small cover
// slots should use this: full-resolution sources (Steam's 1200x1800 library
// art, VNDB originals) decoded at thumbnail size are what makes long cover
// grids jank on scroll. Falls back to the original via <img> onError when the
// thumb can't be produced.
export function thumbUrl(relPath: string | null | undefined, width: number): string | null {
  if (!relPath) return null
  return mediaUrl(`thumb/${width}/${relPath}`)
}
