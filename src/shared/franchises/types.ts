// Types for the curated cross-media franchise pages (/franchises). Pure data,
// the wrestling.ts / programming/ pattern: one file per franchise exports a
// FranchiseCfg, index.ts is the catalog, and the renderer renders entirely
// from it — no franchise tables exist. A franchise may mix media types (games,
// visual novels, anime, manga, films, TV, books); each entry names its own.
//
// `id` strings (franchise, entry and character ids) are FROZEN vocabulary:
// they key persisted UI state (localStorage) and route params. Rename labels
// freely, never ids. Entry ids are unique across ALL franchises (guarded by
// tests/franchises.test.ts).

import type { MediaType } from '../types'

export interface FranchiseExternalRef {
  // Matches media_item.external_source / external_id, e.g. { source: 'steam', id: '287700' },
  // compared only against library rows of the entry's own media type (TMDB
  // movie and TV ids share one number space).
  source: string
  id: string
}

export interface FranchiseEntry {
  id: string
  title: string
  // Absent = 'game' (every entry authored before the cross-media merge).
  mediaType?: MediaType
  // Extra normalized-match candidates BESIDES the title: regional names,
  // remaster/edition titles that should count as owning this entry. Exact
  // normalized equality only — never substrings (see match.ts).
  aliases?: string[]
  // Strong-match keys; any library row with one of these wins over title matching.
  externalIds?: FranchiseExternalRef[]
  year: number
  // 'YYYY-MM-DD' when known — tie-break for release ordering within a year.
  releaseDate?: string
  // Curated in-universe story order (1-based). Omitted on every entry of a
  // franchise whose stories are standalone (Final Fantasy) — the Story column
  // hides itself when no entry has one. An adaptation shares its source's
  // number (a retelling occupies the same story slot); release order breaks
  // the tie. An entry from a separate continuity (the live-action Resident
  // Evil films) has none and sinks below the story order.
  chrono?: number
  // Editorial route position (1-based, unique per franchise): the suggested
  // way through a cross-media franchise, carried over from the old guides.
  // Entries without one sit outside the route. Optional route entries are
  // detours — they never become "Next up".
  route?: number
  optional?: boolean
  // Hardcoded Metacritic fallback so unowned (greyed) rows still rank in the
  // meta-score view; a matched library row's own metadata always wins.
  mc?: number
  spinOff?: boolean
  remake?: boolean
  // An adaptation of another entry (anime of a novel, film of a game).
  adaptation?: boolean
  // Curated wide artwork for THIS entry (https, curl-verified). RESERVED: the
  // franchise page no longer uses per-game art (2026-08-15 feedback — one
  // background per franchise, see FranchiseCfg.heroUrl); this is kept for the
  // future per-game background on the detail page. Cached with the rest of the
  // franchise art so it will already be on disk when that lands.
  bgUrl?: string
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
  color: string // per-franchise accent (hex), the wrestling idiom
  // Curated wide hero art (https, curl-verified): the index card image and the
  // page's default background. The user overrides the page background with a
  // settings row `franchise.<id>.background` (a media/ path from pickImage).
  heroUrl: string
  studio: string
  tagline: string
  trivia: FranchiseTriviaSection[]
  // Authored in RELEASE order (year, then releaseDate) — the Release view
  // renders the array as-is; tests enforce the sort so the two can't drift.
  // One row per release: each season, film or OVA is its own entry.
  entries: FranchiseEntry[]
  characters: FranchiseCharacter[]
}
