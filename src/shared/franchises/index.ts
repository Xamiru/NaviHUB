// The franchise catalog (/franchises). Adding a franchise = one file
// exporting a FranchiseCfg + an entry here; no DB rows exist for the canon —
// library rows are matched at render time (see match.ts) and personal state
// stays on media_item / media_image.

import type { MediaItem, MediaType } from '../types'
import type { FranchiseCfg, FranchiseEntry } from './types'
import { entryMediaType, matchLibrary } from './match'
import { METAL_GEAR } from './metalGear'
import { ZELDA } from './zelda'
import { RESIDENT_EVIL } from './residentEvil'
import { YAKUZA } from './yakuza'
import { FINAL_FANTASY } from './finalFantasy'
import { SILENT_HILL } from './silentHill'
import { GTA } from './gta'
import { DRAGON_QUEST } from './dragonQuest'
import { SOULS } from './souls'
import { FIRE_EMBLEM } from './fireEmblem'
import { TRAILS } from './trails'
import { MASS_EFFECT } from './massEffect'
import { PERSONA } from './persona'
import { HALO } from './halo'
import { SCIENCE_ADVENTURE } from './scienceAdventure'
import { WHEN_THEY_CRY } from './whenTheyCry'
import { MONOGATARI } from './monogatari'
import { FATE } from './fate'
import { EVANGELION } from './evangelion'
import { GUNDAM_UC } from './gundam'
import { BERSERK } from './berserk'
import { JOJO } from './jojo'
import { GHOST_IN_THE_SHELL } from './ghostInTheShell'
import { SERIAL_EXPERIMENTS_LAIN } from './lain'
import { ATTACK_ON_TITAN } from './attackOnTitan'
import { STAR_WARS } from './starWars'
import { MIDDLE_EARTH } from './middleEarth'
import { WIZARDING_WORLD } from './wizardingWorld'
import { DUNE } from './dune'
import { BATMAN } from './batman'
import { TWIN_PEAKS } from './twinPeaks'
import { KINGDOM_HEARTS } from './kingdomHearts'
import { ACE_ATTORNEY } from './aceAttorney'
import { DANGANRONPA } from './danganronpa'
import { ZERO_ESCAPE } from './zeroEscape'
import { XENO } from './xeno'
import { NIER_DRAKENGARD } from './nier'
import { SHIN_MEGAMI_TENSEI } from './shinMegamiTensei'
import { TALES_OF } from './talesOf'
import { MONSTER_HUNTER } from './monsterHunter'
import { POKEMON } from './pokemon'
import { SUPER_MARIO } from './superMario'
import { METROID } from './metroid'
import { STREET_FIGHTER } from './streetFighter'
import { DEVIL_MAY_CRY } from './devilMayCry'
import { CASTLEVANIA } from './castlevania'
import { MEGA_MAN } from './megaMan'
import { SONIC } from './sonic'
import { ACE_COMBAT } from './aceCombat'
import { ARMORED_CORE } from './armoredCore'
import { CHRONO } from './chrono'
import { YS } from './ys'
import { SUIKODEN } from './suikoden'
import { STAR_OCEAN } from './starOcean'
import { BREATH_OF_FIRE } from './breathOfFire'
import { MOTHER } from './mother'
import { MANA } from './mana'
import { PHANTASY_STAR } from './phantasyStar'
import { VALKYRIA_CHRONICLES } from './valkyriaChronicles'
import { ATELIER } from './atelier'
import { DISGAEA } from './disgaea'
import { KEY_VISUAL_ARTS } from './key'
import { TYPE_MOON } from './typeMoon'
import { SWORD_ART_ONLINE } from './swordArtOnline'
import { OVERLORD } from './overlord'
import { MUSHOKU_TENSEI } from './mushokuTensei'
import { WITCHER } from './witcher'
import { SONG_OF_ICE_AND_FIRE } from './songOfIceAndFire'
import { DIGIMON } from './digimon'
import { WARCRAFT } from './warcraft'

export * from './types'
export { entryMediaType, matchLibrary, normalizeGameTitle } from './match'

export const FRANCHISES: FranchiseCfg[] = [
  METAL_GEAR,
  ZELDA,
  RESIDENT_EVIL,
  YAKUZA,
  FINAL_FANTASY,
  SILENT_HILL,
  GTA,
  DRAGON_QUEST,
  SOULS,
  FIRE_EMBLEM,
  TRAILS,
  MASS_EFFECT,
  PERSONA,
  HALO,
  SCIENCE_ADVENTURE,
  WHEN_THEY_CRY,
  MONOGATARI,
  FATE,
  EVANGELION,
  GUNDAM_UC,
  BERSERK,
  JOJO,
  GHOST_IN_THE_SHELL,
  SERIAL_EXPERIMENTS_LAIN,
  ATTACK_ON_TITAN,
  STAR_WARS,
  MIDDLE_EARTH,
  WIZARDING_WORLD,
  DUNE,
  BATMAN,
  TWIN_PEAKS,
  KINGDOM_HEARTS,
  ACE_ATTORNEY,
  DANGANRONPA,
  ZERO_ESCAPE,
  XENO,
  NIER_DRAKENGARD,
  SHIN_MEGAMI_TENSEI,
  TALES_OF,
  MONSTER_HUNTER,
  POKEMON,
  SUPER_MARIO,
  METROID,
  STREET_FIGHTER,
  DEVIL_MAY_CRY,
  CASTLEVANIA,
  MEGA_MAN,
  SONIC,
  ACE_COMBAT,
  ARMORED_CORE,
  CHRONO,
  YS,
  SUIKODEN,
  STAR_OCEAN,
  BREATH_OF_FIRE,
  MOTHER,
  MANA,
  PHANTASY_STAR,
  VALKYRIA_CHRONICLES,
  ATELIER,
  DISGAEA,
  KEY_VISUAL_ARTS,
  TYPE_MOON,
  SWORD_ART_ONLINE,
  OVERLORD,
  MUSHOKU_TENSEI,
  WITCHER,
  SONG_OF_ICE_AND_FIRE,
  DIGIMON,
  WARCRAFT
]

export function franchiseCfg(id: string): FranchiseCfg | null {
  return FRANCHISES.find((f) => f.id === id) ?? null
}

// Community rating (0-100) with library precedence: a matched row's own
// metadata beats the hardcoded fallback. Mirrors the key order of
// mediaRepo.COMMUNITY_SQL — the renderer has no shared community-score helper,
// so this is the franchise-scoped equivalent.
export function communityScoreFor(entry: FranchiseEntry, item: MediaItem | null): number | null {
  const meta = item?.metadata
  if (meta) {
    for (const key of ['averageScore', 'metacritic', 'igdbRating', 'vndbRating', 'olRating']) {
      const v = meta[key]
      if (typeof v === 'number' && v > 0) return Math.round(v)
    }
    const imdb = meta['imdbRating']
    if (typeof imdb === 'number' && imdb > 0) return Math.round(imdb * 10)
  }
  return entry.mc ?? null
}

// The media types a franchise spans, in first-appearance (release) order.
export function franchiseMediaTypes(cfg: FranchiseCfg): MediaType[] {
  return [...new Set(cfg.entries.map(entryMediaType))]
}

// Every media type any franchise references — the index page's query set.
export const FRANCHISE_MEDIA_TYPES: MediaType[] = [
  ...new Set(FRANCHISES.flatMap(franchiseMediaTypes))
]

// The first core route entry not yet finished; null when the franchise has no
// route or the route is complete.
export function nextRouteEntry(
  cfg: FranchiseCfg,
  finished: (entry: FranchiseEntry) => boolean
): FranchiseEntry | null {
  return (
    cfg.entries
      .filter((e) => e.route != null && !e.optional)
      .sort((a, b) => a.route! - b.route!)
      .find((e) => !finished(e)) ?? null
  )
}

export interface FranchiseMembership {
  cfg: FranchiseCfg
  entry: FranchiseEntry
  // The entry after this one in route order (or release order when the
  // franchise has no route, or this entry sits outside it).
  next: FranchiseEntry | null
}

// The franchises one library row belongs to — the detail page's "Part of"
// fact. Matches the single row against same-type entries with the page
// matcher, so the rules cannot diverge.
export function franchisesForItem(item: MediaItem): FranchiseMembership[] {
  const out: FranchiseMembership[] = []
  for (const cfg of FRANCHISES) {
    const candidates = cfg.entries.filter((e) => entryMediaType(e) === item.mediaType)
    if (candidates.length === 0) continue
    const [entryId] = matchLibrary(candidates, [item]).keys()
    const entry = entryId ? cfg.entries.find((e) => e.id === entryId) : undefined
    if (!entry) continue
    let next: FranchiseEntry | null
    if (entry.route != null) {
      next =
        cfg.entries
          .filter((e) => e.route != null && e.route > entry.route!)
          .sort((a, b) => a.route! - b.route!)[0] ?? null
    } else {
      next = cfg.entries[cfg.entries.indexOf(entry) + 1] ?? null
    }
    out.push({ cfg, entry, next })
  }
  return out
}

// Every curated art URL for one franchise, deduped — the download set for
// src/main/franchiseArt.ts.
export function franchiseArtUrls(cfg: FranchiseCfg): string[] {
  const urls = new Set<string>([cfg.heroUrl])
  for (const e of cfg.entries) if (e.bgUrl) urls.add(e.bgUrl)
  for (const c of cfg.characters) urls.add(c.portraitUrl)
  return [...urls]
}

// franchiseId -> hero art URL, the index page's download set (one small file
// per franchise, fetched before any single franchise page has been opened).
export function franchiseHeroUrls(): Record<string, string> {
  return Object.fromEntries(FRANCHISES.map((f) => [f.id, f.heroUrl]))
}

// The settings key holding the user's own page background for a franchise
// ('' or absent = use the curated heroUrl). Shared by the page (read/write)
// and the export sanitizer's LIKE 'franchise.%' wipe.
export const franchiseBackgroundKey = (franchiseId: string): string =>
  `franchise.${franchiseId}.background`
