// Pure helpers for the games catalog v2 (launchboxCatalog.ts). No IO, no
// electron — tests/launchboxCatalog.test.ts drives them directly.

export const LAUNCHBOX_SOURCE = 'launchbox'
export const LAUNCHBOX_IMAGE_BASE = 'https://images.launchbox-app.com/'
// Covers are stored downscaled to this long edge (files.downloadScaledImage).
export const COVER_MAX_EDGE = 1000

// The title matching key shared with the catalog builder
// (scripts/build-games-catalog2.cjs titleKey — the test diffs the two): NFKC,
// lower case, "&" as "and", everything that is not a letter or digit dropped in
// any script, so Japanese titles keep their kana and kanji.
export function titleKey(s: string | null | undefined): string {
  return String(s ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\p{L}\p{N}]+/gu, '')
}

export function imageUrl(file: string): string {
  return `${LAUNCHBOX_IMAGE_BASE}${encodeURIComponent(file)}`
}

export function yearOf(date: string | null | undefined): number | null {
  const m = /^(\d{4})/.exec(date ?? '')
  return m ? Number(m[1]) : null
}

export function jsonList(json: string | null | undefined): string[] {
  try {
    const v = JSON.parse(json ?? '[]')
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim() !== '') : []
  } catch {
    return []
  }
}

// LaunchBox platform names as the tag a person would type: "Sony Playstation 4"
// → "PlayStation 4", "Microsoft Xbox 360" → "Xbox 360", "Windows" → "PC".
export function platformLabel(name: string): string {
  const n = name.trim()
  if (/^windows$/i.test(n) || /^ms-dos$/i.test(n)) return n.toLowerCase() === 'windows' ? 'PC' : 'MS-DOS'
  return n
    .replace(/^Sony\s+/i, '')
    .replace(/Playstation/g, 'PlayStation')
    .replace(/^Microsoft\s+(?=Xbox)/i, '')
}

// A RAWG-era or Steam row and a catalog work agree when the titles share a key
// and the years are within one (re-releases often land a year apart).
export function sameGame(
  a: { title: string; year: number | null },
  b: { keys: string[]; year: number | null }
): boolean {
  const k = titleKey(a.title)
  if (!k || !b.keys.includes(k)) return false
  return a.year == null || b.year == null || Math.abs(a.year - b.year) <= 1
}
