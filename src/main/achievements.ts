import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { extname, join } from 'path'
import { dialog } from 'electron'
import { getSqlite } from './db/connection'
import { absoluteMediaPath, downloadImages } from './files'
import { fetchWithRetry } from './http'
import { updateActivity } from './progress'
import * as settingsRepo from './repos/settingsRepo'
import * as achievementRepo from './repos/achievementRepo'
import { search as steamSearch } from './steam'
import { exeDirOf, scanUnlocks, steamSettingsDir } from './emuScan'
import { buildGoldbergConfig } from './achievementsCore'
import type { EmuFileIO } from './emuScan'
import type { EmuEnv } from './achievementsCore'
import type {
  AchievementSetupResult,
  SteamAppCandidate,
  AchievementUnlockSource
} from '@shared/types'

// Achievement providers. Steam titles are tracked WITHOUT Steam: the schema
// (names, art, rarity) comes from Steam's Web API once per game and is cached
// in the DB, while the unlocks themselves are read out of whatever emulator
// the game's crack ships — see emuScan.ts. Nothing here needs the game to be
// running; achievementWatcher.ts is the live half.
//
// Two-phase atomic like every importer: all network work (schema, percentages,
// icon downloads) completes before a single DB write happens.

/* eslint-disable @typescript-eslint/no-explicit-any */

const WEB_API = 'https://api.steampowered.com'

function steamKey(): string {
  const key = settingsRepo.get('steam.web_api_key')?.trim()
  if (!key) {
    throw new Error(
      'A Steam Web API key is needed to fetch achievement lists. Get a free one at ' +
        'steamcommunity.com/dev/apikey and paste it into Settings > API keys.'
    )
  }
  return key
}

async function webApiGet(path: string, params: Record<string, string>): Promise<any> {
  const url = new URL(`${WEB_API}${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetchWithRetry(url.toString(), {
    headers: { Accept: 'application/json' },
    timeoutMs: 20_000
  })
  if (res.status === 403) {
    throw new Error('Steam rejected the Web API key — check it in Settings > API keys.')
  }
  if (!res.ok) throw new Error(`Steam Web API request failed (${res.status})`)
  return res.json()
}

// ---------------- Appid resolution ----------------
// A Steam-imported row already knows its appid. Everything else (RAWG/IGDB
// catalog rows, hand-added titles) gets storefront search results to pick from
// — the same keyless endpoint the games importer uses.
export async function resolveSteamCandidates(mediaId: number): Promise<SteamAppCandidate[]> {
  const row = getSqlite()
    .prepare('SELECT title, external_source, external_id FROM media_item WHERE id = ?')
    .get(mediaId) as
    | { title: string; external_source: string | null; external_id: string | null }
    | undefined
  if (!row) throw new Error('Media item not found')

  const out: SteamAppCandidate[] = []
  if (row.external_source === 'steam' && row.external_id) {
    out.push({ appid: row.external_id, name: row.title, coverUrl: null, exact: true })
  }
  const found = await steamSearch(row.title)
  for (const r of found) {
    const appid = String(r.id)
    if (out.some((c) => c.appid === appid)) continue
    out.push({ appid, name: r.title, coverUrl: r.coverUrl, exact: false })
  }
  return out.slice(0, 20)
}

// ---------------- Steam schema ----------------
type SteamSchemaAchievement = {
  name: string
  displayName?: string
  description?: string
  hidden?: number
  icon?: string
  icongray?: string
}

export async function fetchSteamSchema(
  mediaId: number,
  appid: string
): Promise<AchievementSetupResult> {
  const id = appid.trim()
  if (!/^\d+$/.test(id)) throw new Error(`Not a Steam app id: ${appid}`)
  const key = steamKey()

  // Remember the choice before the fetch so a failed network half doesn't cost
  // the user the lookup — but NOT when it would flip a title already tracked on
  // another provider: that would leave the RA achievements on screen labelled
  // as a Steam set, offering emulator imports that make no sense for them.
  // Switching providers commits only once the new set actually arrives.
  const existing = achievementRepo.getTracking(mediaId)
  if (!existing || existing.provider === 'steam') {
    achievementRepo.setAssociation(mediaId, 'steam', id)
  }

  updateActivity({ phase: 'fetching' })
  const schema = await webApiGet('/ISteamUserStats/GetSchemaForGame/v2/', {
    key,
    appid: id,
    l: 'english'
  })
  const list: SteamSchemaAchievement[] = schema?.game?.availableGameStats?.achievements ?? []
  if (!list.length) {
    throw new Error(
      `Steam lists no achievements for app ${id}. Either the game has none, or that is the wrong app id.`
    )
  }

  // Rarity is a separate, KEYLESS endpoint, and a missing/failed one must not
  // sink the whole fetch — percentages are decoration, the set is the point.
  let percentages = new Map<string, number>()
  try {
    const pct = await webApiGet('/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/', {
      gameid: id
    })
    const rows: { name?: string; percent?: number }[] =
      pct?.achievementpercentages?.achievements ?? []
    percentages = new Map(
      rows
        .filter((r) => r.name && typeof r.percent === 'number')
        .map((r) => [r.name as string, r.percent as number])
    )
  } catch {
    percentages = new Map()
  }

  const images = await downloadImages(list.flatMap((a) => [a.icon ?? null, a.icongray ?? null]))

  updateActivity({ phase: 'writing' })
  achievementRepo.upsertSchema(
    mediaId,
    'steam',
    id,
    list.map((a) => ({
      apiName: a.name,
      // Steam occasionally ships an achievement with an empty displayName; the
      // api name is ugly but beats a blank row.
      name: a.displayName?.trim() || a.name,
      description: a.description?.trim() || null,
      hidden: a.hidden === 1,
      iconPath: (a.icon && images.get(a.icon)) || null,
      iconGrayPath: (a.icongray && images.get(a.icongray)) || null,
      points: null, // Steam has no points, and none is invented
      globalPct: percentages.get(a.name) ?? null
    }))
  )

  // Anything already earned is on disk right now — sweep it in so a freshly
  // tracked game does not start at zero.
  const swept = importEmuUnlocks(mediaId)
  const summary = achievementRepo.summaryFor(mediaId)
  return {
    total: summary.total,
    unlocked: summary.unlocked,
    importedFromFiles: swept.imported,
    filesFound: swept.found
  }
}

// ---------------- Emulator sweep ----------------
export type EmuImportResult = { found: number; imported: number; emus: string[] }

// Reads every emulator file for a tracked game and records what it finds. Also
// the diagnostic the UI leans on: `found: 0` means no emulator wrote anything
// for this title, which is what the Goldberg wizard exists to fix.
export function importEmuUnlocks(
  mediaId: number,
  deps: { io?: EmuFileIO; env?: EmuEnv; nowMs?: number } = {}
): EmuImportResult {
  const tracking = achievementRepo.getTracking(mediaId)
  if (!tracking || tracking.provider !== 'steam') return { found: 0, imported: 0, emus: [] }

  const row = getSqlite().prepare('SELECT exe_path FROM media_item WHERE id = ?').get(mediaId) as
    | { exe_path: string | null }
    | undefined
  const scan = scanUnlocks(
    tracking.providerGameId,
    exeDirOf(row?.exe_path ?? null),
    deps.io,
    deps.env
  )
  // A file with no usable timestamp falls back to when it was last written,
  // which is far closer to the truth than "now" for a retroactive sweep.
  const fallback = scan.newestMtimeMs ?? deps.nowMs ?? Date.now()
  const fresh = achievementRepo.insertUnlocks(mediaId, scan.unlocks, 'emu', fallback)
  return { found: scan.files, imported: fresh.length, emus: scan.emus }
}

// ---------------- Manual + lifetime ----------------
export function toggleManual(achievementId: number, unlocked: boolean): void {
  achievementRepo.setManual(achievementId, unlocked)
}

export function disableTracking(mediaId: number): void {
  achievementRepo.disable(mediaId)
}

// Re-run whichever provider a game is already set up with.
export async function refresh(mediaId: number): Promise<AchievementSetupResult> {
  const tracking = achievementRepo.getTracking(mediaId)
  if (!tracking) throw new Error('This title is not tracked yet.')
  if (tracking.provider === 'steam') {
    return fetchSteamSchema(mediaId, tracking.providerGameId)
  }
  const { fetchRaGame } = await import('./retroAchievements')
  return fetchRaGame(mediaId, tracking.providerGameId)
}

// The retroactive sweep on its own, for the "Import from emulator files"
// button. Returns the counts so the UI can say what it found.
export function sweepEmuFiles(mediaId: number): EmuImportResult {
  return importEmuUnlocks(mediaId)
}

// Exported for the watcher, which records unlocks the same way but from a live
// poll rather than a one-shot sweep.
export function recordUnlocks(
  mediaId: number,
  unlocks: { apiName: string; unlockedAtMs: number | null }[],
  source: AchievementUnlockSource,
  fallbackMs: number
): ReturnType<typeof achievementRepo.insertUnlocks> {
  return achievementRepo.insertUnlocks(mediaId, unlocks, source, fallbackMs)
}

// ---------------- Goldberg setup wizard ----------------
// For a game whose crack writes no achievement files at all: generate the
// steam_settings folder Goldberg reads, into a directory the USER picks. This
// deliberately never writes into the game folder — a wrong guess there breaks
// someone's install, and the copy step is one drag the user can see and undo.
export async function generateGoldbergConfig(
  mediaId: number
): Promise<{ dir: string; achievements: number } | null> {
  const tracking = achievementRepo.getTracking(mediaId)
  if (!tracking || tracking.provider !== 'steam') {
    throw new Error('Set this game up with Steam achievements first.')
  }
  // Provider order, NOT listForMedia's unlocked-first UI order — see the repo.
  const rows = achievementRepo.listInProviderOrder(mediaId)
  if (!rows.length) throw new Error('No achievements have been fetched for this game yet.')

  const res = await dialog.showOpenDialog({
    title: 'Where should the generated steam_settings folder go?',
    properties: ['openDirectory', 'createDirectory']
  })
  if (res.canceled || !res.filePaths.length) return null

  const dir = steamSettingsDir(res.filePaths[0])
  const imagesDir = join(dir, 'achievement_images')
  mkdirSync(imagesDir, { recursive: true })

  // Copy the cached icons in under stable names, so the generated config is
  // self-contained and survives the media folder being cleaned later.
  const fileNameFor = (row: (typeof rows)[number], locked: boolean): string | null => {
    const rel = locked ? row.iconGrayPath : row.iconPath
    if (!rel) return null
    const src = absoluteMediaPath(rel)
    if (!existsSync(src)) return null
    const name = `${row.apiName.replace(/[^\w.-]+/g, '_')}${locked ? '_gray' : ''}${extname(src) || '.jpg'}`
    try {
      copyFileSync(src, join(imagesDir, name))
      return name
    } catch {
      return null
    }
  }

  const { achievementsJson, steamAppidTxt } = buildGoldbergConfig(
    tracking.providerGameId,
    rows.map((r) => ({
      apiName: r.apiName,
      name: r.name,
      description: r.description,
      hidden: r.hidden,
      iconFile: fileNameFor(r, false),
      iconGrayFile: fileNameFor(r, true)
    }))
  )
  writeFileSync(join(dir, 'achievements.json'), achievementsJson, 'utf8')
  writeFileSync(join(dir, 'steam_appid.txt'), steamAppidTxt, 'utf8')

  return { dir, achievements: rows.length }
}
