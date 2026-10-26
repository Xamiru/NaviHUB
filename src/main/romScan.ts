import { opendir } from 'fs/promises'
import { join } from 'path'
import { dialog } from 'electron'
import { getSqlite } from './db/connection'
import * as tasks from './tasks'
import * as emulation from './emulation'
import { logWarn } from './logBus'
import { dropCueTracks, matchScan, SCAN_SKIP_EXTENSIONS, type LibraryGame, type ScanFile } from './romScanCore'
import type { RomIdentity } from './romIdentity'
import {
  ALL_GAME_EXTENSIONS,
  PLATFORMS,
  fileExtension,
  isPlatformKey,
  platformFromName,
  platformsForExtension,
  type PlatformKey
} from '@shared/emulation/platforms'
import type { RomScanAcceptResult, RomScanStatus } from '@shared/types'

// Games → Emulators "Find game files": walk folders the user picks, read each
// file's id, and suggest which library game it belongs to. Read-only until
// the user accepts rows in the review list; results live in memory only, and
// accepting sends result ids — never paths — back to main.

const MAX_DEPTH = 6
const MAX_FILES = 50_000
const MAX_IDENTIFIED = 5_000
const IDENTIFY_EXTENSIONS = new Set(['iso', 'gcm', 'rvz', 'wia', 'wbfs', 'ciso', 'cue', 'nsp', 'nsz'])
const GAME_EXTENSIONS = new Set(ALL_GAME_EXTENSIONS.filter((e) => !SCAN_SKIP_EXTENSIONS.has(e)))

interface Job {
  id: string
  state: RomScanStatus['state']
  scanned: number
  found: number
  message: string | null
  cancelled: boolean
  // The console a console page's scan is limited to; null scans for every console.
  platform: PlatformKey | null
  results: Array<RomScanStatus['results'][number] & { path: string; identity: RomIdentity | null }>
}

let counter = 0
let job: Job | null = null

export function status(): RomScanStatus | null {
  if (!job) return null
  return {
    id: job.id,
    state: job.state,
    scanned: job.scanned,
    found: job.found,
    message: job.message,
    platform: job.platform,
    // Paths stay in main; the renderer shows the file and folder names.
    results: job.results.map(({ path: _path, identity: _identity, ...row }) => row)
  }
}

export function cancel(): void {
  if (job && job.state === 'scanning') job.cancelled = true
}

// before-quit: the walk is read-only, but its last step reads the library, so
// it must stop before the database closes.
export function cancelRomScan(): void {
  cancel()
}

async function walk(root: string, j: Job, out: string[], depth = 0): Promise<void> {
  if (j.cancelled || depth > MAX_DEPTH || out.length >= MAX_FILES) return
  let dir
  try {
    dir = await opendir(root)
  } catch (e) {
    logWarn('app', `game scan could not read ${root}: ${e instanceof Error ? e.message : String(e)}`)
    return
  }
  for await (const entry of dir) {
    if (j.cancelled || out.length >= MAX_FILES) break
    if (entry.name.startsWith('.')) continue
    const full = join(root, entry.name)
    if (entry.isDirectory()) {
      await walk(full, j, out, depth + 1)
    } else if (entry.isFile()) {
      j.scanned += 1
      if (GAME_EXTENSIONS.has(fileExtension(entry.name))) out.push(full)
    }
  }
}

function libraryGames(): LibraryGame[] {
  const db = getSqlite()
  const games = db.prepare("SELECT id, title FROM media_item WHERE media_type = 'game'").all() as {
    id: number
    title: string
  }[]
  const tags = db
    .prepare(
      `SELECT mt.media_id, t.name FROM media_tag mt JOIN tag t ON t.id = mt.tag_id
        WHERE t.category = 'platform'`
    )
    .all() as { media_id: number; name: string }[]
  const roms = db.prepare('SELECT media_id, rom_path FROM game_rom').all() as {
    media_id: number
    rom_path: string
  }[]
  const platformsOf = new Map<number, PlatformKey[]>()
  for (const t of tags) {
    const p = platformFromName(t.name)
    if (!p) continue
    const list = platformsOf.get(t.media_id) ?? []
    if (!list.includes(p)) list.push(p)
    platformsOf.set(t.media_id, list)
  }
  const pathsOf = new Map<number, Set<string>>()
  for (const r of roms) {
    const set = pathsOf.get(r.media_id) ?? new Set<string>()
    set.add(r.rom_path)
    pathsOf.set(r.media_id, set)
  }
  return games.map((g) => ({
    mediaId: g.id,
    title: g.title,
    platforms: platformsOf.get(g.id) ?? [],
    linkedPaths: pathsOf.get(g.id) ?? new Set<string>()
  }))
}

async function run(j: Job, roots: string[]): Promise<void> {
  const paths: string[] = []
  for (const root of roots) await walk(root, j, paths)
  const candidates = dropCueTracks(paths)
  const files: ScanFile[] = []
  const identities = new Map<string, RomIdentity | null>()
  let identified = 0
  for (const path of candidates) {
    if (j.cancelled) break
    const ext = fileExtension(path)
    let platforms = platformsForExtension(ext)
    // A console page's scan skips files no header could make that console's.
    if (j.platform && !platforms.includes(j.platform)) continue
    let gameCode: string | null = null
    if (IDENTIFY_EXTENSIONS.has(ext) && identified < MAX_IDENTIFIED) {
      identified += 1
      const identity = await emulation.readRomIdentity(path)
      identities.set(path, identity)
      if (identity) {
        gameCode = identity.code
        if (identity.platform) platforms = [identity.platform]
      }
    }
    if (j.platform) {
      if (!platforms.includes(j.platform)) continue
      // A shared extension (iso, chd) defaults to the console being scanned,
      // while a library game tagged for another console still claims its file.
      platforms = [j.platform, ...platforms.filter((p) => p !== j.platform)]
    }
    files.push({ path, fileName: path.split(/[\\/]/).pop() ?? path, platforms, gameCode })
    j.found = files.length
  }
  // A quit cancels the scan before the database closes; never read it after.
  if (j.cancelled) {
    j.state = 'cancelled'
    return
  }
  const games = libraryGames()
  const titleOf = new Map(games.map((g) => [g.mediaId, g.title]))
  // A console page's scan offers only games that can be that console's.
  const fitsScan = new Set(
    games
      .filter((g) => j.platform == null || g.platforms.length === 0 || g.platforms.includes(j.platform))
      .map((g) => g.mediaId)
  )
  const matches = matchScan(files, games).filter((m) => j.platform == null || m.platform === j.platform)
  j.results = matches.map((m, i) => {
    const candidates = m.candidates.filter((id) => fitsScan.has(id))
    return {
      id: i + 1,
      path: m.file.path,
      identity: identities.has(m.file.path) ? identities.get(m.file.path) ?? null : null,
      fileName: m.file.fileName,
      folder: m.file.path.slice(0, m.file.path.length - m.file.fileName.length),
      platform: m.platform,
      gameCode: m.file.gameCode,
      candidates: candidates.map((mediaId) => ({ mediaId, title: titleOf.get(mediaId) ?? '' })),
      suggestedMediaId: m.suggested != null && candidates.includes(m.suggested) ? m.suggested : null,
      alreadyLinked: m.alreadyLinked
    }
  })
  j.state = 'done'
}

export async function start(forPlatform?: unknown): Promise<{ id: string } | null> {
  if (forPlatform != null && !isPlatformKey(forPlatform)) throw new Error('Unknown console')
  const platform = forPlatform == null ? null : (forPlatform as PlatformKey)
  if (job?.state === 'scanning') throw new Error('A game folder scan is already running.')
  const res = await dialog.showOpenDialog({
    title: 'Folders with your game files',
    properties: ['openDirectory', 'multiSelections']
  })
  if (res.canceled || res.filePaths.length === 0) return null
  counter += 1
  const j: Job = {
    id: `romscan-${counter}`,
    state: 'scanning',
    scanned: 0,
    found: 0,
    message: null,
    cancelled: false,
    platform,
    results: []
  }
  job = j
  tasks.create({
    kind: 'romScan',
    label: platform ? `Find ${PLATFORMS[platform].short} game files` : 'Find game files',
    route: platform ? `/games/emulators/${platform}` : '/games/emulators/tools',
    controls: { cancel: () => cancel(), pauseNote: 'A folder scan cannot be paused' },
    project: () => {
      if (job?.id !== j.id) return null
      if (j.state === 'scanning') return { detail: `${j.found} game files in ${j.scanned} files` }
      if (j.state === 'error') return { state: 'error', error: j.message }
      return { state: j.state === 'cancelled' ? 'cancelled' : 'done', detail: `${j.results.length} game files` }
    }
  })
  void run(j, res.filePaths).catch((e) => {
    j.state = 'error'
    j.message = e instanceof Error ? e.message : String(e)
  })
  return { id: j.id }
}

// Links the accepted rows. Each row is linked on its own, so one unreadable
// file does not stop the rest.
export async function accept(items: { resultId: number; mediaId: number }[]): Promise<RomScanAcceptResult> {
  if (!job || job.state !== 'done') throw new Error('Run a scan first.')
  const current = job
  let linked = 0
  const failed: string[] = []
  const byId = new Map(current.results.map((r) => [r.id, r]))
  for (const item of Array.isArray(items) ? items : []) {
    const row = byId.get(item?.resultId)
    if (!row || !Number.isInteger(item.mediaId)) continue
    // Only a game the row offered: a pick left over from another scan's row
    // with the same id must not link this file.
    if (!row.candidates.some((c) => c.mediaId === item.mediaId)) {
      failed.push(`${row.fileName}: that game is not one of its matches`)
      continue
    }
    try {
      // The scan already read the header; files it did not read are read now.
      const rom = await emulation.linkRom(
        item.mediaId,
        row.path,
        row.identity || !IDENTIFY_EXTENSIONS.has(fileExtension(row.path)) ? { identity: row.identity } : undefined
      )
      // The file's own header wins; the scan's console only settles a file
      // no header identified (a console page's iso or chd).
      if (rom.gameCodeSource !== 'file' && rom.platform !== row.platform) {
        emulation.updateRom(rom.id, { platform: row.platform })
      }
      row.alreadyLinked = true
      row.suggestedMediaId = null
      linked += 1
    } catch (e) {
      failed.push(`${row.fileName}: ${e instanceof Error ? e.message : String(e)}`)
    }
  }
  return { linked, failed }
}
