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
