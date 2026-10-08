// User text → FTS5 prefix query: bare quoted tokens ANDed, each with a
// trailing *. Quoting neutralizes FTS operators (NEAR, -, ^) in user input.
// Shared by both offline games catalogs.
export function ftsQueryFor(raw: string): string | null {
  const tokens = raw
    .split(/\s+/)
    .map((t) => t.replace(/"/g, '').trim())
    .filter(Boolean)
  if (!tokens.length) return null
  return tokens.map((t) => `"${t}"*`).join(' ')
}
