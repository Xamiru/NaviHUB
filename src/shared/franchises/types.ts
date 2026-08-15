// Types for the curated game-franchise pages (/games/franchises). Pure data,
// the wrestling.ts / programming/ pattern: one file per franchise exports a
// FranchiseCfg, index.ts is the catalog, and the renderer renders entirely
// from it — no franchise tables exist.
//
// `id` strings (franchise, entry and character ids) are FROZEN vocabulary:
// they key persisted UI state (localStorage) and route params. Rename labels
// freely, never ids. Entry ids are unique across ALL franchises (guarded by
// tests/franchises.test.ts).

export interface FranchiseExternalRef {
  // Matches media_item.external_source / external_id, e.g. { source: 'steam', id: '287700' }.
  source: string
  id: string
}

export interface FranchiseEntry {
  id: string
  title: string
  // Extra normalized-match candidates BESIDES the title: regional names,
  // remaster/edition titles that should count as owning this entry. Exact
  // normalized equality only — never substrings (see match.ts).
  aliases?: string[]
  // Strong-match keys; any library row with one of these wins over title matching.
  externalIds?: FranchiseExternalRef[]
  year: number
  // 'YYYY-MM-DD' when known — tie-break for release ordering within a year.
  releaseDate?: string
  // Curated in-universe story order (1-based, unique per franchise). Omitted
  // on every entry of a franchise whose stories are standalone (Final
  // Fantasy) — the Story order pill hides itself when no entry has one.
  chrono?: number
  // Hardcoded Metacritic fallback so unowned (greyed) rows still rank in the
  // meta-score view; a matched library row's own metadata always wins.
  mc?: number
  spinOff?: boolean
  remake?: boolean
  // Curated wide background artwork (https, curl-verified at authoring time).
  // Cached content-addressed on first page visit (src/main/franchiseArt.ts);
  // until then the remote URL renders directly (CSP allows img-src https:).
  bgUrl: string
  // One-liner shown on the row ('Remake of Snake Eater', 'aka Biohazard 7').
  note?: string
}

export interface FranchiseCharacter {
  id: string
  name: string
  role: string
  // Portrait art (https, curl-verified), cached via the same art pipeline.
  portraitUrl: string
  // FranchiseEntry ids within the same franchise (guarded by tests).
  appearsIn: string[]
  blurb: string
}

export interface FranchiseTriviaSection {
  title: string
  // Plain text; paragraphs separated by \n\n. NOT markdown — rendered verbatim.
  body: string
}

export interface FranchiseCfg {
  id: string
  name: string
  short: string // breadcrumb / card label
  color: string // per-franchise accent (hex), the GACHA_GAMES / wrestling idiom
  studio: string
  tagline: string
  trivia: FranchiseTriviaSection[]
  // Authored in RELEASE order (year, then releaseDate) — the Release view
  // renders the array as-is; tests enforce the sort so the two can't drift.
  entries: FranchiseEntry[]
  characters: FranchiseCharacter[]
}
