import type { MediaType, TorrentFilter, TorrentSearchResult } from './types'

// Torrent-domain vocabulary shared by main (Jackett queries) and renderer
// (category preselect/picker, size formatting). Standard Torznab numbering:
// 2000 Movies, 3000 Audio, 4050 PC/Games, 5000 TV, 5070 TV/Anime,
// 7000 Books, 7030 Books/Comics, 8000 Other.

// Default categories per media type. Manga searches both Books/Comics and
// TV/Anime — anime trackers file manga/LN under literature categories that
// Jackett maps into either inconsistently. Every UI offers an
// "All categories" ([]) escape hatch because indexer mappings are lossy.
export function torznabCategoriesFor(mediaType: MediaType): number[] {
  switch (mediaType) {
    case 'anime':
      return [5070]
    case 'manga':
      return [7030, 5070]
    case 'visual_novel':
    case 'game':
      return [4050]
    case 'movie':
      return [2000]
    case 'tv':
      return [5000]
    case 'book':
      // 7020 Books/EBook first; 7000 parent catches indexers with no subcats.
      return [7020, 7000]
  }
}

// Picker options for the standalone /torrents page. [] = omit the category
// param entirely (search everything).
export const TORRENT_CATEGORY_OPTIONS: { label: string; cats: number[] }[] = [
  { label: 'All categories', cats: [] },
  { label: 'Anime', cats: [5070] },
  { label: 'Movies', cats: [2000] },
  { label: 'TV', cats: [5000] },
  { label: 'Games / VNs', cats: [4050] },
  { label: 'Books / Manga', cats: [7000, 7030] },
  { label: 'Audio', cats: [3000] },
  { label: 'Other', cats: [8000] }
]

// Music lives outside the MediaType union (music_artist rows, not media_item),
// so the artist "discography" search passes these explicitly.
export const AUDIO_CATEGORIES = [3000]

// Wrestling events are wrestling_event rows, not media_item rows, so they sit
// outside torznabCategoriesFor's MediaType switch and the event page passes
// these explicitly. 5060 is TV/Sport; 5000 (TV) is the catch-all for indexers
// with no sport subcategory.
export const WRESTLING_CATEGORIES = [5060, 5000]

// Trackers file an event under the promotion's name AT THE TIME, which is why
// this takes a name rather than deriving one: a 2001 WWE show is "WWF" on every
// tracker, and querying "WWE WrestleMania X-Seven" returns nothing.
export function wrestlingTorrentQuery(promotionName: string, eventName: string): string {
  const name = eventName.trim()
  // Don't repeat the promotion when the event name already carries it.
  return name.toLowerCase().startsWith(promotionName.toLowerCase())
    ? name
    : `${promotionName} ${name}`
}

// Torrent releases of an artist's full catalogue are conventionally named
// "<Artist> Discography" — the dialog's query box stays editable from there.
export function discographyQuery(artist: string): string {
  return `${artist} discography`
}

// 123456789 -> "117.7 MiB". Jackett sizes are bytes; null/non-positive -> em dash.
export function formatBytes(bytes: number | null): string {
  if (bytes == null || !Number.isFinite(bytes) || bytes <= 0) return '—'
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB']
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit++
  }
  return unit === 0 ? `${value} B` : `${value.toFixed(1)} ${units[unit]}`
}

export const SIZE_UNITS = { MiB: 1024 ** 2, GiB: 1024 ** 3 } as const
export type SizeUnit = keyof typeof SIZE_UNITS

// "1.5" + "GiB" -> bytes. Blank/garbage -> null (unconstrained), so a
// half-typed number never silently filters everything away.
export function sizeToBytes(value: string, unit: SizeUnit): number | null {
  const n = Number(value.trim().replace(',', '.'))
  if (!value.trim() || !Number.isFinite(n) || n < 0) return null
  return Math.round(n * SIZE_UNITS[unit])
}

export const EMPTY_TORRENT_FILTER: TorrentFilter = {
  text: '',
  exclude: '',
  minSeeders: null,
  minBytes: null,
  maxBytes: null,
  trackers: []
}

export function torrentFilterActiveCount(f: TorrentFilter): number {
  return (
    (f.text.trim() ? 1 : 0) +
    (f.exclude.trim() ? 1 : 0) +
    (f.minSeeders != null ? 1 : 0) +
    (f.minBytes != null ? 1 : 0) +
    (f.maxBytes != null ? 1 : 0) +
    (f.trackers.length > 0 ? 1 : 0)
  )
}

// Pure client-side narrowing of the accumulated result set (one Jackett fan-out
// can return >1000 rows). Rows with an unknown size/seeder count are KEPT
// unless a bound explicitly excludes them — a null is "unknown", not "zero".
export function applyTorrentFilters(
  results: TorrentSearchResult[],
  f: TorrentFilter
): TorrentSearchResult[] {
  const words = f.text.toLowerCase().split(/\s+/).filter(Boolean)
  const bad = f.exclude.toLowerCase().split(/\s+/).filter(Boolean)
  const trackers = new Set(f.trackers)
  return results.filter((r) => {
    const title = r.title.toLowerCase()
    if (words.length && !words.every((w) => title.includes(w))) return false
    if (bad.length && bad.some((w) => title.includes(w))) return false
    if (trackers.size && !trackers.has(r.tracker)) return false
    if (f.minSeeders != null && (r.seeders ?? 0) < f.minSeeders) return false
    if (f.minBytes != null && r.sizeBytes != null && r.sizeBytes < f.minBytes) return false
    if (f.maxBytes != null && r.sizeBytes != null && r.sizeBytes > f.maxBytes) return false
    return true
  })
}

// ---- relevance (word-boundary title matching) ----

// Search query -> significant tokens. Split on any non-alphanumeric run
// (Unicode-aware, so CJK stays whole), drop tokens under 2 chars — a lone "a"
// or punctuation would match nearly everything.
export function queryTokens(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length >= 2)
}

// Does the title contain EVERY query token as a whole word? This is what kills
// the "akagi" -> "Wakagimi" substring bleed. A query with no usable tokens
// (empty / all too short) matches everything, so relevance never blanks a page.
export function titleMatchesQuery(title: string, query: string): boolean {
  const tokens = queryTokens(query)
  if (tokens.length === 0) return true
  const t = title.toLowerCase()
  return tokens.every((tok) => {
    const esc = tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // \p{L}\p{N} boundaries (not \b) so CJK and cross-script edges work.
    return new RegExp(`(?<![\\p{L}\\p{N}])${esc}(?![\\p{L}\\p{N}])`, 'iu').test(t)
  })
}

export function relevanceFilter(
  results: TorrentSearchResult[],
  query: string
): TorrentSearchResult[] {
  const tokens = queryTokens(query)
  if (tokens.length === 0) return results
  return results.filter((r) => titleMatchesQuery(r.title, query))
}

// ---- indexer scoping by category ----

// Standard Torznab categories are < 10000; anything larger is an indexer's own
// internal id. Bucket = the parent 1000s (5070 and 5000 both -> 5).
function standardBuckets(categories: number[]): Set<number> {
  const out = new Set<number>()
  for (const c of categories) if (c > 0 && c < 10000) out.add(Math.floor(c / 1000))
  return out
}

// Pick the indexers worth querying for a media-type search: those advertising a
// category in the same bucket as any requested one (anime [5070] -> every 5xxx
// indexer, skipping audiobook-/movie-only ones). An empty request means "all
// categories" -> no scoping. Indexers exposing no standard categories are kept
// (don't skip on missing metadata), and if scoping would select nobody we fall
// back to everyone rather than search zero indexers.
export function indexersForCategories<T extends { categories: number[] }>(
  indexers: T[],
  categories: number[]
): T[] {
  if (categories.length === 0) return indexers
  const wanted = standardBuckets(categories)
  const scoped = indexers.filter((ix) => {
    const buckets = standardBuckets(ix.categories)
    if (buckets.size === 0) return true // unknown coverage — query it to be safe
    for (const b of buckets) if (wanted.has(b)) return true
    return false
  })
  return scoped.length > 0 ? scoped : indexers
}
