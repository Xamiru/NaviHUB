// The franchise catalog (/games/franchises). Adding a franchise = one file
// exporting a FranchiseCfg + an entry here; no DB rows exist for the canon —
// library games are matched at render time (see match.ts) and personal state
// stays on media_item / media_image.

import type { MediaItem } from '../types'
import type { FranchiseCfg, FranchiseEntry } from './types'
import { METAL_GEAR } from './metalGear'
import { ZELDA } from './zelda'
import { RESIDENT_EVIL } from './residentEvil'
import { YAKUZA } from './yakuza'
import { FINAL_FANTASY } from './finalFantasy'

export * from './types'
export { matchLibrary, normalizeGameTitle } from './match'

export const FRANCHISES: FranchiseCfg[] = [
  METAL_GEAR,
  ZELDA,
  RESIDENT_EVIL,
  YAKUZA,
  FINAL_FANTASY
]

export function franchiseCfg(id: string): FranchiseCfg | null {
  return FRANCHISES.find((f) => f.id === id) ?? null
}

// Meta score with library precedence: a matched row's own metadata beats the
// hardcoded fallback. The renderer has no shared community-score helper
// (GAME.formatCardSub inlines its metacritic read; the SQL fold lives in
// mediaRepo.COMMUNITY_SQL) — this is the franchise-scoped equivalent.
export function metaScoreFor(entry: FranchiseEntry, item: MediaItem | null): number | null {
  const meta = item?.metadata
  const own = meta?.['metacritic'] ?? meta?.['igdbRating']
  if (typeof own === 'number' && own > 0) return Math.round(own)
  return entry.mc ?? null
}

// Every curated art URL for one franchise, deduped — the download set for
// src/main/franchiseArt.ts.
export function franchiseArtUrls(cfg: FranchiseCfg): string[] {
  const urls = new Set<string>()
  for (const e of cfg.entries) urls.add(e.bgUrl)
  for (const c of cfg.characters) urls.add(c.portraitUrl)
  return [...urls]
}
