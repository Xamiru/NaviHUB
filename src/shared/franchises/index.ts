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
import { SILENT_HILL } from './silentHill'
import { GTA } from './gta'
import { DRAGON_QUEST } from './dragonQuest'
import { SOULS } from './souls'

export * from './types'
export { matchLibrary, normalizeGameTitle } from './match'

export const FRANCHISES: FranchiseCfg[] = [
  METAL_GEAR,
  ZELDA,
  RESIDENT_EVIL,
  YAKUZA,
  FINAL_FANTASY,
  SILENT_HILL,
  GTA,
  DRAGON_QUEST,
  SOULS
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
  const urls = new Set<string>([cfg.heroUrl])
  for (const e of cfg.entries) urls.add(e.bgUrl)
  for (const c of cfg.characters) urls.add(c.portraitUrl)
  return [...urls]
}

// franchiseId -> hero art URL, the index page's download set (5 small files,
// fetched before any single franchise page has been opened).
export function franchiseHeroUrls(): Record<string, string> {
  return Object.fromEntries(FRANCHISES.map((f) => [f.id, f.heroUrl]))
}

// The settings key holding the user's own page background for a franchise
// ('' or absent = use the curated heroUrl). Shared by the page (read/write)
// and the export sanitizer's LIKE 'franchise.%' wipe.
export const franchiseBackgroundKey = (franchiseId: string): string =>
  `franchise.${franchiseId}.background`
