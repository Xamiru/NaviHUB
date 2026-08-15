import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { extname, join } from 'path'
import { dialog } from 'electron'
import { getSqlite } from './db/connection'
import { absoluteMediaPath, downloadImages, importImageFile } from './files'
import { fetchWithRetry } from './http'
import { updateActivity } from './progress'
import * as settingsRepo from './repos/settingsRepo'
import * as achievementRepo from './repos/achievementRepo'
import { search as steamSearch } from './steam'
import { exeDirOf, findLocalSteamSchema, scanUnlocks, steamSettingsDir } from './emuScan'
import {
  buildGoldbergConfig,
  joinCommunityWithPercentages,
  parseCommunityAchievementsPage,
  parseGoldbergSchema
} from './achievementsCore'
import type { EmuFileIO } from './emuScan'
import type { EmuEnv, PercentRow, SchemaRow } from './achievementsCore'
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

// Optional: Steam only issues keys to accounts that have spent money, and this
// user's never will. With one the Web API is tried second; without, the two
// keyless sources below carry the whole feature.
function steamKey(): string | null {
  return settingsRepo.get('steam.web_api_key')?.trim() || null
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
// Three sources, tried in order; the first that yields a set wins:
//   1. steam_settings/achievements.json beside the exe — what Goldberg/GSE
//      cracks ship. Zero network, and it uses the exact api names the emulator
//      writes unlocks under.
//   2. The Web API, only if the user has a key.
//   3. The public community stats page + the keyless percentages endpoint,
//      joined by percentage (see achievementsCore.joinCommunityWithPercentages).
// Rarity always comes from the keyless percentages endpoint, best-effort.

type SteamSchemaAchievement = {
  name: string
  displayName?: string
  description?: string
  hidden?: number
  icon?: string
  icongray?: string
}

export type SteamSchemaSource = 'local' | 'webapi' | 'community'

async function fetchPercentages(appid: string): Promise<PercentRow[]> {
  const pct = await webApiGet('/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/', {
    gameid: appid
  })
  const rows: { name?: string; percent?: number | string }[] =
    pct?.achievementpercentages?.achievements ?? []
  return rows
    .filter((r) => r.name && Number.isFinite(Number(r.percent)))
    .map((r) => ({ name: r.name as string, percent: Number(r.percent) }))
}

// A schema plus where its icons live, before any of them is stored.
type LoadedSchema = {
  source: SteamSchemaSource
  rows: SchemaRow[]
  // For 'local': the steam_settings folder icons resolve against.
  localDir: string | null
  unmatched: number
}

async function loadSteamSchema(
  appid: string,
  exeDir: string | null,
  io?: EmuFileIO
): Promise<LoadedSchema> {
  const tried: string[] = []

  // 1. The crack's own config.
  const local = findLocalSteamSchema(exeDir, io)
  if (local) {
    const rows = parseGoldbergSchema(local.content)
    if (rows.length) return { source: 'local', rows, localDir: local.dir, unmatched: 0 }
    tried.push(`${local.dir} (unreadable achievements.json)`)
  } else {
    tried.push('no steam_settings/achievements.json beside the executable')
  }

  // 2. The Web API, if a key exists.
  const key = steamKey()
  if (key) {
    const schema = await webApiGet('/ISteamUserStats/GetSchemaForGame/v2/', {
      key,
      appid,
      l: 'english'
    })
    const list: SteamSchemaAchievement[] = schema?.game?.availableGameStats?.achievements ?? []
    if (list.length) {
      return {
        source: 'webapi',
        localDir: null,
        unmatched: 0,
        rows: list.map((a) => ({
          apiName: a.name,
          // Steam occasionally ships an achievement with an empty displayName;
          // the api name is ugly but beats a blank row.
          name: a.displayName?.trim() || a.name,
          description: a.description?.trim() || null,
          hidden: a.hidden === 1,
          icon: a.icon ?? null,
          iconGray: a.icongray ?? null,
          globalPct: null
        }))
      }
    }
    tried.push('Steam Web API listed no achievements')
  }

  // 3. The public community page.
  const pageRes = await fetchWithRetry(
    `https://steamcommunity.com/stats/${appid}/achievements/?l=english`,
    { headers: { Accept: 'text/html' }, timeoutMs: 20_000 }
  )
  const page = pageRes.ok ? parseCommunityAchievementsPage(await pageRes.text()) : []
  if (page.length) {
    // Here the percentages are not decoration — they are the only bridge to
    // the api names — so a failure IS a failure.
    const pct = await fetchPercentages(appid)
    const joined = joinCommunityWithPercentages(page, pct)
    if (joined.rows.length) {
      return { source: 'community', localDir: null, ...joined }
    }
    tried.push('community page found achievements but none could be matched to api names')
  } else {
    tried.push(`community stats page had no achievements (HTTP ${pageRes.status})`)
  }

  throw new Error(
    `Could not get an achievement list for Steam app ${appid} — ${tried.join('; ')}. ` +
      'Either the game has no achievements or that is the wrong app id.'
  )
}

// Stores every icon the schema references and returns apiName → stored paths.
// Local icons are copied in (content-addressed); remote ones downloaded.
async function storeIcons(
  schema: LoadedSchema
): Promise<Map<string, { icon: string | null; gray: string | null }>> {
  const out = new Map<string, { icon: string | null; gray: string | null }>()
  if (schema.source === 'local' && schema.localDir) {
    const dir = schema.localDir
    const sep = dir.includes('\\') ? '\\' : '/'
    const resolve = (rel: string | null): string | null =>
      rel ? importImageFile(`${dir}${sep}${rel.replace(/^[\\/]+/, '').split('/').join(sep)}`) : null
    for (const r of schema.rows) out.set(r.apiName, { icon: resolve(r.icon), gray: resolve(r.iconGray) })
    return out
  }
  const images = await downloadImages(schema.rows.flatMap((r) => [r.icon, r.iconGray]))
  for (const r of schema.rows) {
    out.set(r.apiName, {
      icon: (r.icon && images.get(r.icon)) || null,
      gray: (r.iconGray && images.get(r.iconGray)) || null
    })
  }
  return out
}

export async function fetchSteamSchema(
  mediaId: number,
  appid: string,
  deps: { io?: EmuFileIO } = {}
): Promise<AchievementSetupResult> {
  const id = appid.trim()
  if (!/^\d+$/.test(id)) throw new Error(`Not a Steam app id: ${appid}`)

  // Remember the choice before the fetch so a failed network half doesn't cost
  // the user the lookup — but NOT when it would flip a title already tracked on
  // another provider: that would leave the RA achievements on screen labelled
  // as a Steam set, offering emulator imports that make no sense for them.
  // Switching providers commits only once the new set actually arrives.
  const existing = achievementRepo.getTracking(mediaId)
  if (!existing || existing.provider === 'steam') {
    achievementRepo.setAssociation(mediaId, 'steam', id)
  }

  const row = getSqlite().prepare('SELECT exe_path FROM media_item WHERE id = ?').get(mediaId) as
    | { exe_path: string | null }
    | undefined
  const exeDir = exeDirOf(row?.exe_path ?? null)

  updateActivity({ phase: 'fetching' })
  const schema = await loadSteamSchema(id, exeDir, deps.io)

  // Rarity for the two sources that don't already carry it. Decoration: a
  // failure here must not sink the fetch.
  let percentages = new Map<string, number>()
  if (schema.source !== 'community') {
    try {
      percentages = new Map((await fetchPercentages(id)).map((p) => [p.name, p.percent]))
    } catch {
      percentages = new Map()
    }
  }

  const icons = await storeIcons(schema)

  updateActivity({ phase: 'writing' })
  achievementRepo.upsertSchema(
    mediaId,
    'steam',
    id,
    schema.rows.map((r) => ({
      apiName: r.apiName,
      name: r.name,
      description: r.description,
      hidden: r.hidden,
      iconPath: icons.get(r.apiName)?.icon ?? null,
      iconGrayPath: icons.get(r.apiName)?.gray ?? null,
      points: null, // Steam has no points, and none is invented
      globalPct: r.globalPct ?? percentages.get(r.apiName) ?? null
    }))
  )

  // Anything already earned is on disk right now — sweep it in so a freshly
  // tracked game does not start at zero.
  const swept = importEmuUnlocks(mediaId, { io: deps.io })
  const summary = achievementRepo.summaryFor(mediaId)
  return {
    total: summary.total,
    unlocked: summary.unlocked,
    importedFromFiles: swept.imported,
    filesFound: swept.found,
    schemaSource: schema.source,
    unmatched: schema.unmatched
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
