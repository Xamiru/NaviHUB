import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmdirSync,
  statSync,
  unlinkSync,
  writeFileSync
} from 'fs'
import { createHash } from 'crypto'
import { join } from 'path'
import * as achievementRepo from './repos/achievementRepo'
import {
  GOLDBERG_BACKUP_SUFFIX,
  GOLDBERG_MANIFEST,
  looksLikeGoldbergDll,
  mergeGoldbergList,
  parseGoldbergSchema
} from './achievementsCore'
import { exeDirOf, findApiDll } from './emuScan'
import type { ApiDllName } from './emuScan'
import type { GoldbergState } from '@shared/types'

// One-click achievement saving for a game that already runs the Goldberg
// emulator. gbe_fork silently drops any unlock for an achievement its
// steam_settings/achievements.json does not list, so this writes a complete
// list. It writes into the user's game folder, so it keeps these rules — each
// has its own test in tests/goldbergInstall.test.ts, and every write below is
// ordered so a failure at that line still keeps them:
//
// R1. Never touches a DLL. The steam_api DLL is only read, to recognise
//     Goldberg. (Swapping it in automatically was built and removed on
//     2026-10-11; see docs/architecture/removed.md.)
// R2. Writes only inside <DLL folder>/steam_settings/, only when that DLL is
//     Goldberg, and only three files: achievements.json, its one backup and
//     the manifest.
// R3. The game always has a list: the original is COPIED to the backup, never
//     renamed away, and the new list replaces it by one atomic rename.
// R4. The game's own latest list is never lost: it is always in place or in
//     the backup. The backup is replaced only by a newer list of the game's
//     own (a game update, or one copied in by hand) found in place of
//     NaviHUB's, and is deleted only after Restore has put it back.
// R5. The release's entries are kept exactly (mergeGoldbergList): tracked ids
//     it lacks are added, hand-fixed names get their text, nothing is removed.
// R6. The written list contains every tracked id.
// R7. Restore reverses exactly what setup did, and a Restore interrupted at
//     any step can be run again to finish. It never claims success it did not
//     have: if the game's own list is gone, it says so.
//
// Which list is NaviHUB's own is decided by content: the manifest keeps the
// fingerprints of the last lists NaviHUB wrote, saved BEFORE each write, so a
// write that dies halfway can never make NaviHUB's previous list look foreign.

const BACKUP = GOLDBERG_BACKUP_SUFFIX
const TMP = '.navihub-tmp'

type Manifest = {
  version: 1
  // Whether the backup holds a list of the game's own.
  original: 'backed-up' | 'none'
  createdSettingsDir: boolean
  // sha1 of the last lists NaviHUB wrote (newest last). Absent on a manifest
  // from before fingerprints, whose list is then taken as NaviHUB's own.
  written?: string[]
}

const KEPT_FINGERPRINTS = 5

function fingerprint(content: string | Buffer): string {
  return createHash('sha1').update(content).digest('hex')
}

// Is the list now in place one NaviHUB wrote?
function isOurs(manifest: Manifest | null, content: Buffer): boolean {
  if (!manifest) return false
  if (!manifest.written) return true
  return manifest.written.includes(fingerprint(content))
}

function writeManifest(settingsDir: string, m: Manifest): void {
  writeAtomic(join(settingsDir, GOLDBERG_MANIFEST), JSON.stringify(m, null, 2) + '\n')
}

// The launch check runs on every Play, and a steam_api DLL is several MB, so
// the verdict is cached per file and only re-read when its size or modified
// time changes (a swap, a game update).
const dllVerdicts = new Map<string, { size: number; mtimeMs: number; goldberg: boolean }>()

function isGoldbergFile(path: string): boolean {
  try {
    const st = statSync(path)
    const hit = dllVerdicts.get(path)
    if (hit && hit.size === st.size && hit.mtimeMs === st.mtimeMs) return hit.goldberg
    const goldberg = looksLikeGoldbergDll(readFileSync(path))
    dllVerdicts.set(path, { size: st.size, mtimeMs: st.mtimeMs, goldberg })
    return goldberg
  } catch {
    return false
  }
}

function readManifest(settingsDir: string): Manifest | null {
  try {
    const m = JSON.parse(readFileSync(join(settingsDir, GOLDBERG_MANIFEST), 'utf8')) as Manifest
    return m && m.version === 1 && (m.original === 'backed-up' || m.original === 'none') ? m : null
  } catch {
    return null
  }
}

// Temp name then rename, so a crash mid-write never leaves a half-written file.
function writeAtomic(path: string, content: string): void {
  const tmp = path + TMP
  try {
    writeFileSync(tmp, content, 'utf8')
    renameSync(tmp, path)
  } catch (e) {
    if (existsSync(tmp)) unlinkSync(tmp)
    throw e
  }
}

// copyFile through a temp name: the destination is either untouched or a
// complete copy, never a partial one.
function copyAtomic(from: string, to: string): void {
  const tmp = to + TMP
  try {
    copyFileSync(from, tmp)
    renameSync(tmp, to)
  } catch (e) {
    if (existsSync(tmp)) unlinkSync(tmp)
    throw e
  }
}

function locate(mediaId: number): {
  dll: { dir: string; name: ApiDllName } | null
  settingsDir: string | null
} {
  const dll = findApiDll(exeDirOf(achievementRepo.exePathOf(mediaId)))
  // Goldberg reads steam_settings beside its DLL, so with no DLL there is no
  // folder to speak of.
  return { dll, settingsDir: dll ? join(dll.dir, 'steam_settings') : null }
}

export function goldbergState(mediaId: number): GoldbergState {
  const { dll, settingsDir } = locate(mediaId)
  const rows = achievementRepo.listInProviderOrder(mediaId)
  let listed: Set<string> | null = null
  if (settingsDir) {
    try {
      const names = parseGoldbergSchema(readFileSync(join(settingsDir, 'achievements.json'), 'utf8'))
      if (names.length) listed = new Set(names.map((r) => r.apiName))
    } catch {
      listed = null
    }
  }
  const missing = listed ? rows.filter((r) => !listed!.has(r.apiName)).length : rows.length
  return {
    gameDir: dll?.dir ?? null,
    dllName: dll?.name ?? null,
    emulator: !dll ? 'none' : isGoldbergFile(join(dll.dir, dll.name)) ? 'goldberg' : 'other',
    settingsDir,
    list: !listed ? 'missing' : missing ? 'incomplete' : 'complete',
    missing,
    total: rows.length,
    canRestore: settingsDir != null && readManifest(settingsDir) != null
  }
}

// Writes a complete list (R5, R6). Everything is checked before the first
// write; each write after that is ordered for R3 and R4.
export function installConfig(mediaId: number): GoldbergState {
  const tracking = achievementRepo.getTracking(mediaId)
  if (!tracking || tracking.provider !== 'steam') {
    throw new Error('Set this game up with Steam achievements first.')
  }
  const rows = achievementRepo.listInProviderOrder(mediaId)
  if (!rows.length) throw new Error('No achievements have been fetched for this game yet.')
  const { dll, settingsDir } = locate(mediaId)
  if (!dll || !settingsDir) {
    throw new Error('Could not find steam_api64.dll or steam_api.dll next to the game executable.')
  }
  if (!isGoldbergFile(join(dll.dir, dll.name))) {
    throw new Error(`This game's ${dll.name} is not Goldberg, so it would not read the list.`)
  }

  const list = join(settingsDir, 'achievements.json')
  const backup = list + BACKUP
  const createdSettingsDir = !existsSync(settingsDir)
  mkdirSync(settingsDir, { recursive: true })

  const prior = readManifest(settingsDir)
  const current = existsSync(list) ? readFileSync(list) : null
  // A list in place that NaviHUB did not write is the game's own: the release's
  // on a first run, a game update's (or a hand copy) on a later one. Copy it to
  // the backup — copy, not rename, so the list stays in place (R3) — making it
  // the list Restore brings back (R4).
  const foreign = current != null && !isOurs(prior, current)
  if (foreign) copyAtomic(list, backup)

  let release: unknown = []
  if (existsSync(backup)) {
    try {
      release = JSON.parse(readFileSync(backup, 'utf8'))
    } catch {
      release = [] // unreadable: replaced, and still safe in the backup
    }
  }
  const merged = mergeGoldbergList(
    release,
    rows.map((r) => ({
      apiName: r.apiName,
      name: r.name,
      description: r.description,
      hidden: r.hidden,
      manual: r.nameStatus === 'manual'
    }))
  )
  const content = JSON.stringify(merged, null, 2) + '\n'

  // The fingerprint is saved BEFORE the list is written: if the write then
  // fails, the previous list is still recognised as NaviHUB's.
  writeManifest(settingsDir, {
    version: 1,
    original: existsSync(backup) ? 'backed-up' : 'none',
    createdSettingsDir: prior ? prior.createdSettingsDir : createdSettingsDir,
    written: [...(prior?.written ?? []), fingerprint(content)].slice(-KEPT_FINGERPRINTS)
  })
  writeAtomic(list, content)
  return goldbergState(mediaId)
}

// Puts the folder back as it was before NaviHUB's first write (R7). Every step
// leaves a state this function can finish from: the backup is deleted only
// once it is back in place, and the manifest only once nothing else remains.
export function restore(mediaId: number): GoldbergState {
  const { settingsDir } = locate(mediaId)
  const manifest = settingsDir ? readManifest(settingsDir) : null
  if (!settingsDir || !manifest) throw new Error('NaviHUB has not changed this game folder.')
  const list = join(settingsDir, 'achievements.json')
  const backup = list + BACKUP

  const current = existsSync(list) ? readFileSync(list) : null
  let lost = false
  if (existsSync(backup)) {
    copyAtomic(backup, list)
    unlinkSync(backup)
  } else if (current && isOurs(manifest, current)) {
    if (manifest.original === 'none') unlinkSync(list)
    // 'backed-up' with NaviHUB's list still in place: the backup was deleted
    // outside the app. NaviHUB's list stays (it is complete); say so below.
    else lost = true
  }
  // Otherwise the game's own list is already in place: a Restore that put it
  // back and then failed to drop the manifest. Only the manifest remains.
  unlinkSync(join(settingsDir, GOLDBERG_MANIFEST))
  if (manifest.createdSettingsDir) {
    try {
      if (readdirSync(settingsDir).length === 0) rmdirSync(settingsDir)
    } catch {
      // Left in place; an empty folder is harmless.
    }
  }
  if (lost) {
    throw new Error(
      "The game's original list was deleted outside NaviHUB, so it cannot be put back. NaviHUB's complete list stays in place."
    )
  }
  return goldbergState(mediaId)
}
