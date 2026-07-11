// Resolves an href found inside an EPUB (OPF manifest, nav document, or a
// spine document's <img src>) against the zip-entry path of the document it
// appeared in, yielding the referenced entry's zip path. Pure string logic,
// shared by the main-process parser (src/main/epub.ts) and the renderer's
// book content renderer (which rewrites relative image srcs to navimg URLs).
//
// Returns null for external/unsupported references (http:, data:, mailto:,
// fragment-only links) and for paths that try to escape the zip root.
export function resolveEpubHref(baseEntryPath: string, href: string): string | null {
  if (!href) return null
  const trimmed = href.trim()
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return null // absolute URL scheme
  // Strip fragment and query; a fragment-only href points at the base doc itself.
  const bare = trimmed.split('#')[0].split('?')[0]
  if (!bare) return null

  // Hrefs are URL-encoded; zip entry names are literal.
  const decode = (s: string): string => {
    try {
      return decodeURIComponent(s)
    } catch {
      return s
    }
  }

  const baseDir = baseEntryPath.includes('/')
    ? baseEntryPath.slice(0, baseEntryPath.lastIndexOf('/'))
    : ''
  const start = bare.startsWith('/') ? [] : baseDir ? baseDir.split('/') : []
  const out = [...start]
  for (const seg of bare.replace(/\\/g, '/').split('/')) {
    if (seg === '' || seg === '.') continue
    if (seg === '..') {
      if (out.length === 0) return null // escapes the zip root
      out.pop()
      continue
    }
    out.push(decode(seg))
  }
  return out.length ? out.join('/') : null
}
