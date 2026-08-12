// The wiki-link convention, pure and shared. The wrestling importer rewrites
// [[Article Title]] into markdown [label](wiki:Article_Title), which the
// existing shared/markdown.ts alternation already parses — so adding an
// internal-link syntax cost the parser nothing.
//
// Kept here (not in the renderer) so it stays importable by main and by tests
// with no DOM, and so the whole-app wiki the user eventually wants inherits the
// same vocabulary.

export const WIKI_SCHEME = 'wiki:'

// Encodes a title for use as a markdown href. Two escapes, both load-bearing
// because markdown.ts's href class is [^)\s]+:
//   * spaces -> underscores, or the link ends at the first space;
//   * parentheses -> %28/%29, or a disambiguated title ends the link early.
// The second is not a corner case — Wikipedia wrestling titles are full of
// them ("Sting (wrestler)", "Starrcade (1997)", "All Out (2019)"), and an
// unencoded one silently truncates to "Sting_(wrestler" and resolves to
// nothing. `%` goes first so decoding is unambiguous.
export function wikiHref(title: string): string {
  const encoded = title
    .trim()
    .replace(/\s+/g, '_')
    .replace(/%/g, '%25')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
  return `${WIKI_SCHEME}${encoded}`
}

export function decodeWikiTitle(encoded: string): string {
  return encoded.replace(/%28/g, '(').replace(/%29/g, ')').replace(/%25/g, '%')
}

// The article title inside a wiki: href, or null if it isn't one.
export function wikiTarget(href: string): string | null {
  return href.startsWith(WIKI_SCHEME) ? decodeWikiTitle(href.slice(WIKI_SCHEME.length)) : null
}

// The public Wikipedia URL for an article title — for "Open on Wikipedia",
// which is the one link in a local wiki that should leave the app.
export function wikipediaUrl(title: string): string {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title.trim().replace(/\s+/g, '_'))}`
}

// Every wiki: target in a block of markdown — deduped and SORTED, so the same
// prose produces one stable cache key regardless of the order links appear in.
export function extractWikiTitles(text: string | null | undefined): string[] {
  if (!text) return []
  const out = new Set<string>()
  const re = /\]\(wiki:([^)\s]+)\)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) out.add(decodeWikiTitle(m[1]))
  return [...out].sort()
}
