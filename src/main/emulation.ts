import { existsSync } from 'fs'
import { open as openFile, readdir, stat } from 'fs/promises'
import { join } from 'path'
import { app, dialog } from 'electron'
import { getSqlite } from './db/connection'
import * as emulatorRepo from './repos/emulatorRepo'
import type { EmulatorRow, GameRomRow } from './repos/emulatorRepo'
import { assertLaunchableExe } from './gameLaunchCore'
import {
  buildArgv,
  chooseLaunch,
  dirOf,
  emulatorIdFor,
  parseArgsJson,
  parsePlatforms,
  resolveDataDir,
  resolveScreenshotDir,
  sessionShots,
  templateFor,
  validateArgs,
  type FolderEnv
} from './emulationCore'
import { identifyRom, type ByteSource, type RomIdentity } from './romIdentity'
import {
  EMULATOR_PRESETS,
  detectPreset,
  isPresetKey,
  type PresetKey
} from '@shared/emulation/emulatorPresets'
import {
  ALL_GAME_EXTENSIONS,
  PLATFORMS,
  fileExtension,
  isPlatformKey,
  platformFromName,
  platformsForExtension,
  type PlatformKey
} from '@shared/emulation/platforms'
import type {
  EmulationStats,
  EmulatorInfo,
  EmulatorUpdate,
  GameLaunchChoice,
  GamePlayOptions,
  GameRom
} from '@shared/types'

// The IO half of emulator support (emulationCore.ts is the pure half):
// registering emulators, linking game files, reading their ids, and turning a
// Play choice into the exact program + argv that gameLaunch spawns. Pickers
// live in main (the games:pickExe posture), so the renderer never sends a raw
// path for anything that gets executed.

function folderEnv(): FolderEnv {
  let documents: string | null = null
  try {
    documents = app.getPath('documents')
  } catch {
    documents = null
  }
  return {
    appData: process.env.APPDATA ?? null,
    localAppData: process.env.LOCALAPPDATA ?? null,
    documents
  }
}

function presetOf(row: EmulatorRow): PresetKey {
  return isPresetKey(row.preset_key) ? row.preset_key : 'custom'
}

function dataDirOf(row: EmulatorRow): string | null {
  return resolveDataDir(
    EMULATOR_PRESETS[presetOf(row)].dataDir,
    row.exe_path,
    row.data_dir,
    folderEnv(),
    existsSync
  )
}

export function screenshotDirOf(row: EmulatorRow): string | null {
  return resolveScreenshotDir(presetOf(row), row.screenshot_dir, dataDirOf(row))
}

function toInfo(row: EmulatorRow, defaults: Map<string, number>): EmulatorInfo {
  const preset = presetOf(row)
  const custom = parseArgsJson(row.args_json)
  const dataDir = dataDirOf(row)
  return {
    id: row.id,
    presetKey: preset,
    name: row.name,
    exePath: row.exe_path,
    exeExists: existsSync(row.exe_path),
    corePath: row.core_path,
    args: [...(custom ?? EMULATOR_PRESETS[preset].args)],
    argsCustom: custom != null,
    dataDir,
    dataDirOverride: row.data_dir,
    screenshotDir: resolveScreenshotDir(preset, row.screenshot_dir, dataDir),
    screenshotDirOverride: row.screenshot_dir,
    platforms: parsePlatforms(row.platforms),
    defaultFor: [...defaults.entries()]
      .filter(([platform, id]) => id === row.id && isPlatformKey(platform))
      .map(([platform]) => platform as PlatformKey),
    verified: EMULATOR_PRESETS[preset].verified
  }
}

export function listEmulators(): EmulatorInfo[] {
  const defaults = emulatorRepo.defaults()
  return emulatorRepo.list().map((row) => toInfo(row, defaults))
}

function requireEmulator(id: number): EmulatorRow {
  const row = emulatorRepo.get(id)
  if (!row) throw new Error('Emulator not found')
  return row
}

// Registers an executable. Its platforms come from the preset, and it becomes
// the default for any of them that has none yet, so a first emulator just works.
// `forPlatform` is the console the user added it from: a custom emulator or a
// multi-system preset with no fixed consoles (RetroArch) takes it on, while a
// known preset keeps its own consoles (PCSX2 picked from the Wii never plays Wii).
export function registerEmulator(exePath: string, forPlatform: PlatformKey | null = null): EmulatorInfo {
  assertLaunchableExe(exePath)
  const existing = emulatorRepo.list().find((r) => r.exe_path.toLowerCase() === exePath.toLowerCase())
  if (existing) {
    adoptPlatform(existing, forPlatform)
    return toInfo(requireEmulator(existing.id), emulatorRepo.defaults())
  }
  const preset = detectPreset(exePath)
  const platforms = [...EMULATOR_PRESETS[preset].platforms]
  if (forPlatform && adoptsPlatforms(preset) && !platforms.includes(forPlatform)) platforms.push(forPlatform)
  const name =
    preset === 'custom'
      ? (exePath.split(/[\\/]/).pop() ?? 'Emulator').replace(/\.exe$/i, '')
      : EMULATOR_PRESETS[preset].name
  const id = emulatorRepo.insert({ presetKey: preset, name, exePath, platforms })
  const defaults = emulatorRepo.defaults()
  for (const platform of platforms) {
    if (!defaults.has(platform)) emulatorRepo.setDefault(platform, id)
  }
  return toInfo(requireEmulator(id), emulatorRepo.defaults())
}

// Presets whose consoles the user chooses: their own list is empty or open-ended.
function adoptsPlatforms(preset: PresetKey): boolean {
  return preset === 'custom' || EMULATOR_PRESETS[preset].platforms.length === 0
}

function adoptPlatform(row: EmulatorRow, platform: PlatformKey | null): void {
  if (!platform || !adoptsPlatforms(presetOf(row))) return
  const current = parsePlatforms(row.platforms)
  if (!current.includes(platform)) {
    emulatorRepo.update(row.id, { platforms: JSON.stringify([...current, platform]) })
  }
  if (!emulatorRepo.defaults().has(platform)) emulatorRepo.setDefault(platform, row.id)
}

export async function pickAndAddEmulator(forPlatform?: unknown): Promise<EmulatorInfo | null> {
  const platform = forPlatform == null ? null : isPlatformKey(forPlatform) ? forPlatform : null
  if (forPlatform != null && !platform) throw new Error('Unknown console')
  const res = await dialog.showOpenDialog({
    title: 'Add an emulator',
    properties: ['openFile'],
    filters: [
      { name: 'Programs', extensions: ['exe'] },
      { name: 'All files', extensions: ['*'] }
    ]
  })
  if (res.canceled || res.filePaths.length === 0) return null
  return registerEmulator(res.filePaths[0], platform)
}

// The emulator program's own icon as a data URL, for the hub's chips. Windows
// reads the exe's embedded icon; elsewhere the OS gives a generic one. Cached
// per emulator until the program file changes; null when it is missing.
const iconCache = new Map<number, { path: string; mtimeMs: number; url: string | null }>()

export async function emulatorIcon(id: number): Promise<string | null> {
  const row = requireEmulator(id)
  let mtimeMs: number
  try {
    mtimeMs = (await stat(row.exe_path)).mtimeMs
  } catch {
    iconCache.delete(id)
    return null
  }
  const hit = iconCache.get(id)
  if (hit && hit.path === row.exe_path && hit.mtimeMs === mtimeMs) return hit.url
  let url: string | null = null
  try {
    const image = await app.getFileIcon(row.exe_path, { size: 'large' })
    url = image.isEmpty() ? null : image.toDataURL()
  } catch {
    url = null
  }
  iconCache.set(id, { path: row.exe_path, mtimeMs, url })
  return url
}

export function updateEmulator(id: number, upd: EmulatorUpdate): EmulatorInfo {
  requireEmulator(id)
  const fields: Parameters<typeof emulatorRepo.update>[1] = {}
  if (upd.name !== undefined) {
    const name = upd.name.trim()
    if (!name) throw new Error('Name the emulator.')
    fields.name = name.slice(0, 80)
  }
  if (upd.platforms !== undefined) {
    fields.platforms = JSON.stringify([...new Set(upd.platforms.filter(isPlatformKey))])
  }
  if (upd.args !== undefined) fields.args_json = upd.args == null ? null : JSON.stringify(validateArgs(upd.args))
  if (upd.corePath !== undefined) {
    if (upd.corePath) assertLaunchableExe(upd.corePath)
    fields.core_path = upd.corePath || null
  }
  if (upd.dataDir !== undefined) fields.data_dir = upd.dataDir || null
  if (upd.screenshotDir !== undefined) fields.screenshot_dir = upd.screenshotDir || null
  emulatorRepo.update(id, fields)
  return toInfo(requireEmulator(id), emulatorRepo.defaults())
}

// The renderer may rename, change consoles and arguments, and reset the
// folders and core to their detected values — but never send a path: those
// come only from the pickers in main (a core is a DLL RetroArch loads, and the
// user folder decides where mods are written).
export function updateEmulatorFromRenderer(id: number, upd: EmulatorUpdate): EmulatorInfo {
  const safe: EmulatorUpdate = {}
  if (upd.name !== undefined) safe.name = upd.name
  if (upd.platforms !== undefined) safe.platforms = upd.platforms
  if (upd.args !== undefined) safe.args = upd.args
  if (upd.corePath === null) safe.corePath = null
  if (upd.dataDir === null) safe.dataDir = null
  if (upd.screenshotDir === null) safe.screenshotDir = null
  return updateEmulator(id, safe)
}

export function removeEmulator(id: number): void {
  emulatorRepo.remove(id)
}

export function setDefaultEmulator(platform: string, emulatorId: number | null): void {
  if (!isPlatformKey(platform)) throw new Error('Unknown platform')
  if (emulatorId != null) requireEmulator(emulatorId)
  emulatorRepo.setDefault(platform, emulatorId)
}

export async function pickEmulatorExe(id: number): Promise<EmulatorInfo | null> {
  requireEmulator(id)
  const res = await dialog.showOpenDialog({
    title: 'Locate the emulator',
    properties: ['openFile'],
    filters: [
      { name: 'Programs', extensions: ['exe'] },
      { name: 'All files', extensions: ['*'] }
    ]
  })
  if (res.canceled || res.filePaths.length === 0) return null
  assertLaunchableExe(res.filePaths[0])
  emulatorRepo.update(id, { exe_path: res.filePaths[0] })
  return toInfo(requireEmulator(id), emulatorRepo.defaults())
}

export async function pickEmulatorCore(id: number): Promise<EmulatorInfo | null> {
  const row = requireEmulator(id)
  const res = await dialog.showOpenDialog({
    title: 'Pick a RetroArch core',
    defaultPath: dirOf(row.exe_path),
    properties: ['openFile'],
    filters: [
      { name: 'Cores', extensions: ['dll', 'so', 'dylib'] },
      { name: 'All files', extensions: ['*'] }
    ]
  })
  if (res.canceled || res.filePaths.length === 0) return null
  return updateEmulator(id, { corePath: res.filePaths[0] })
}

export async function pickEmulatorFolder(
  id: number,
  which: 'data' | 'screenshots'
): Promise<EmulatorInfo | null> {
  requireEmulator(id)
  const res = await dialog.showOpenDialog({
    title: which === 'data' ? 'Emulator user folder' : 'Emulator screenshot folder',
    properties: ['openDirectory']
  })
  if (res.canceled || res.filePaths.length === 0) return null
  return updateEmulator(id, which === 'data' ? { dataDir: res.filePaths[0] } : { screenshotDir: res.filePaths[0] })
}

// ---- game files ----

function platformTagsOf(mediaId: number): PlatformKey[] {
  const rows = getSqlite()
    .prepare(
      `SELECT t.name FROM media_tag mt JOIN tag t ON t.id = mt.tag_id
        WHERE mt.media_id = ? AND t.category = 'platform'`
    )
    .all(mediaId) as { name: string }[]
  return [...new Set(rows.map((r) => platformFromName(r.name)).filter((p): p is PlatformKey => p != null))]
}

async function fileSource(path: string): Promise<{ src: ByteSource; close: () => Promise<void> } | null> {
  try {
    const handle = await openFile(path, 'r')
    const stat = await handle.stat()
    return {
      src: {
        size: stat.size,
        read: async (offset, length) => {
          const buf = Buffer.alloc(length)
          const { bytesRead } = await handle.read(buf, 0, length, offset)
          return buf.subarray(0, bytesRead)
        }
      },
      close: () => handle.close()
    }
  } catch {
    return null
  }
}

export async function readRomIdentity(path: string): Promise<RomIdentity | null> {
  const main = await fileSource(path)
  if (!main) return null
  const extra: Array<() => Promise<void>> = []
  try {
    return await identifyRom(path, fileExtension(path), main.src, async (other) => {
      const opened = await fileSource(other)
      if (!opened) return null
      extra.push(opened.close)
      return opened.src
    })
  } finally {
    await main.close().catch(() => undefined)
    for (const close of extra) await close().catch(() => undefined)
  }
}

// The platform for a newly linked file: what its header proves, else the
// first hint (in order) among the extension's candidates, else the first
// candidate. The Ways to play card lets the user change it.
export function choosePlatform(
  candidates: readonly PlatformKey[],
  identified: PlatformKey | null,
  hints: readonly PlatformKey[]
): PlatformKey | null {
  if (identified) return identified
  for (const hint of hints) if (candidates.includes(hint)) return hint
  if (candidates.length === 0 && hints.length === 1) return hints[0]
  return candidates[0] ?? null
}

function exePathOf(mediaId: number): string | null {
  const r = getSqlite().prepare('SELECT exe_path FROM media_item WHERE id = ?').get(mediaId) as
    | { exe_path: string | null }
    | undefined
  return r?.exe_path ?? null
}

// A linked executable that is itself an emulator (the pre-emulation way to
// play retro games here).
function exePresetOf(exePath: string | null): PresetKey | null {
  if (!exePath) return null
  const preset = detectPreset(exePath)
  return preset === 'custom' ? null : preset
}

// `known` is an identity already read (the folder scan) — no second read.
export async function linkRom(
  mediaId: number,
  romPath: string,
  known?: { identity: RomIdentity | null }
): Promise<GameRom> {
  assertLaunchableExe(romPath)
  if (!emulatorRepo.mediaTitle(mediaId)) throw new Error('Media item not found')
  const identity = known ? known.identity : await readRomIdentity(romPath)
  const candidates = platformsForExtension(fileExtension(romPath))
  const exePath = exePathOf(mediaId)
  const exePreset = exePresetOf(exePath)
  // The game's platform tags first, then the consoles of an emulator linked
  // as its executable.
  const hints = [...platformTagsOf(mediaId), ...(exePreset ? EMULATOR_PRESETS[exePreset].platforms : [])]
  const platform = choosePlatform(candidates, identity?.platform ?? null, hints)
  if (!platform) {
    throw new Error('NaviHUB does not recognise this kind of game file.')
  }
  // An emulator linked as the executable can play the new file: register it
  // so nothing has to be set up twice.
  if (exePath && exePreset && EMULATOR_PRESETS[exePreset].platforms.includes(platform)) {
    if (!emulatorRepo.defaults().has(platform)) {
      const emu = registerEmulator(exePath)
      // Already registered (registerEmulator returns early) leaves the
      // default unset; set it so the new file has someone to play it.
      if (!emulatorRepo.defaults().has(platform)) emulatorRepo.setDefault(platform, emu.id)
    }
  }
  const hasOthers = emulatorRepo.romsFor(mediaId).length > 0
  const id = emulatorRepo.linkRom({
    mediaId,
    romPath,
    platform,
    gameCode: identity?.code ?? null,
    gameCodeSource: identity ? 'file' : null,
    // The first file becomes the way to play, unless a real PC executable is
    // already linked (a native port keeps Play until the user says otherwise).
    preferred: !hasOthers && (!exePath || exePreset != null)
  })
  return romInfo(id)
}

export async function pickAndLinkRom(mediaId: number): Promise<GameRom | null> {
  const res = await dialog.showOpenDialog({
    title: 'Link a game file',
    properties: ['openFile'],
    filters: [
      { name: 'Game files', extensions: [...ALL_GAME_EXTENSIONS] },
      { name: 'All files', extensions: ['*'] }
    ]
  })
  if (res.canceled || res.filePaths.length === 0) return null
  return linkRom(mediaId, res.filePaths[0])
}

function toRom(row: GameRomRow, emulators: Map<number, EmulatorRow>, defaults: Map<string, number>): GameRom {
  const effectiveId = emulatorIdFor({ emulatorId: row.emulator_id, platform: row.platform }, defaults)
  const effective = effectiveId != null ? emulators.get(effectiveId) ?? null : null
  return {
    id: row.id,
    mediaId: row.media_id,
    romPath: row.rom_path,
    exists: existsSync(row.rom_path),
    // Platform keys are frozen and validated on every write, so the fallback
    // is unreachable in practice; it only keeps the type honest.
    platform: isPlatformKey(row.platform) ? row.platform : 'nes',
    emulatorId: row.emulator_id,
    effectiveEmulatorId: effective?.id ?? null,
    effectiveEmulatorName: effective?.name ?? null,
    gameCode: row.game_code,
    gameCodeSource: row.game_code_source,
    preferred: row.preferred === 1
  }
}

function romInfo(id: number): GameRom {
  const row = emulatorRepo.rom(id)
  if (!row) throw new Error('Game file not found')
  const emulators = new Map(emulatorRepo.list().map((e) => [e.id, e]))
  return toRom(row, emulators, emulatorRepo.defaults())
}

export function playOptions(mediaId: number): GamePlayOptions {
  const exePath = exePathOf(mediaId)
  const emulators = new Map(emulatorRepo.list().map((e) => [e.id, e]))
  const defaults = emulatorRepo.defaults()
  return {
    supported: process.platform === 'win32',
    exePath,
    exePreset: exePresetOf(exePath),
    roms: emulatorRepo.romsFor(mediaId).map((row) => toRom(row, emulators, defaults))
  }
}

export function unlinkRom(romId: number): void {
  emulatorRepo.unlinkRom(romId)
}

export function setPreferred(mediaId: number, romId: number | null): void {
  if (romId != null) {
    const row = emulatorRepo.rom(romId)
    if (!row || row.media_id !== mediaId) throw new Error('Game file not found')
  }
  emulatorRepo.setPreferred(mediaId, romId)
}

export function updateRom(
  romId: number,
  upd: { platform?: string; emulatorId?: number | null; gameCode?: string | null }
): GameRom {
  if (!emulatorRepo.rom(romId)) throw new Error('Game file not found')
  const fields: Parameters<typeof emulatorRepo.updateRom>[1] = {}
  if (upd.platform !== undefined) {
    if (!isPlatformKey(upd.platform)) throw new Error('Unknown platform')
    fields.platform = upd.platform
  }
  if (upd.emulatorId !== undefined) {
    if (upd.emulatorId != null) requireEmulator(upd.emulatorId)
    fields.emulator_id = upd.emulatorId
  }
  if (upd.gameCode !== undefined) {
    const code = upd.gameCode?.trim().toUpperCase() || null
    if (code && !/^[A-Z0-9-]{4,20}$/.test(code)) {
      throw new Error('A game code is letters, digits and dashes, like SLUS-20312 or 0100F2C0115B6000.')
    }
    fields.game_code = code
    fields.game_code_source = code ? 'manual' : null
  }
  emulatorRepo.updateRom(romId, fields)
  return romInfo(romId)
}

// ---- launching ----

export interface LaunchSpec {
  program: string
  args: string[]
  cwd: string
  via: string
  platform: PlatformKey | null
  // The executable the Goldberg achievement check reads; native launches only.
  native: boolean
  emulatorId: number | null
}

export function launchSpec(mediaId: number, requested: GameLaunchChoice | null): LaunchSpec {
  const exePath = exePathOf(mediaId)
  const roms = emulatorRepo.romsFor(mediaId)
  const choice = chooseLaunch(
    requested,
    exePath,
    roms.map((r) => ({ id: r.id, preferred: r.preferred === 1 }))
  )
  if (choice.kind === 'native') {
    const exe = (exePath ?? '').trim()
    assertLaunchableExe(exe)
    if (!existsSync(exe)) throw new Error(`Executable not found: ${exe} — relink it if the game moved.`)
    return { program: exe, args: [], cwd: dirOf(exe), via: 'native', platform: null, native: true, emulatorId: null }
  }
  const rom = roms.find((r) => r.id === choice.romId)
  if (!rom) throw new Error('That game file is no longer linked.')
  if (!existsSync(rom.rom_path)) {
    throw new Error(`Game file not found: ${rom.rom_path} — relink it if it moved.`)
  }
  const emulatorId = emulatorIdFor({ emulatorId: rom.emulator_id, platform: rom.platform }, emulatorRepo.defaults())
  const platformLabel = isPlatformKey(rom.platform) ? PLATFORMS[rom.platform].label : rom.platform
  if (emulatorId == null) {
    throw new Error(`No emulator plays ${platformLabel} yet — add one on the Emulators page.`)
  }
  const emulator = requireEmulator(emulatorId)
  assertLaunchableExe(emulator.exe_path)
  if (!existsSync(emulator.exe_path)) {
    throw new Error(`${emulator.name} is not at ${emulator.exe_path} any more — locate it on the Emulators page.`)
  }
  const preset = presetOf(emulator)
  const args = buildArgv(templateFor(preset, emulator.args_json), rom.rom_path, emulator.core_path)
  return {
    program: emulator.exe_path,
    args,
    cwd: dirOf(emulator.exe_path),
    via: `emu:${preset}`,
    platform: isPlatformKey(rom.platform) ? rom.platform : null,
    native: false,
    emulatorId: emulator.id
  }
}

// ---- after a session ----

const MAX_SHOT_BYTES = 64 * 1024 * 1024
const MAX_SHOT_ENTRIES = 20_000
const SHOT_NAME = /\.(png|jpe?g|webp|bmp)$/i
// Emulators can flush a screenshot as they close.
export const SHOT_GRACE_MS = 8_000

// Screenshots the emulator wrote while the session ran: its screenshot folder
// and one level of subfolders (Dolphin and others file them per game).
export async function findSessionShots(
  emulatorId: number,
  startedAtMs: number,
  endedAtMs: number
): Promise<string[]> {
  const row = emulatorRepo.get(emulatorId)
  const dir = row ? screenshotDirOf(row) : null
  if (!dir) return []
  const files: { path: string; mtimeMs: number; size: number }[] = []
  async function scan(folder: string, depth: number): Promise<void> {
    let entries
    try {
      entries = await readdir(folder, { withFileTypes: true })
    } catch {
      return
    }
    // Names first (cheap), then stat only image files, in parallel batches;
    // the newest-looking names come last in most emulators' naming, so a
    // folder past the cap keeps its tail.
    const images = entries.filter((e) => e.isFile() && SHOT_NAME.test(e.name)).slice(-MAX_SHOT_ENTRIES)
    for (let i = 0; i < images.length; i += 64) {
      await Promise.all(
        images.slice(i, i + 64).map(async (entry) => {
          const full = join(folder, entry.name)
          try {
            const s = await stat(full)
            if (s.mtimeMs >= startedAtMs) files.push({ path: full, mtimeMs: s.mtimeMs, size: s.size })
          } catch {
            // A file removed mid-read is simply not a candidate.
          }
        })
      )
    }
    if (depth === 0) {
      for (const entry of entries.filter((e) => e.isDirectory()).slice(0, 500)) await scan(join(folder, entry.name), 1)
    }
  }
  await scan(dir, 0)
  return sessionShots(files, startedAtMs, endedAtMs, SHOT_GRACE_MS, MAX_SHOT_BYTES)
}

// Tracked time per console and per emulator, from sessions launched through
// an emulator (game_session.via / platform).
export function stats(): EmulationStats {
  const db = getSqlite()
  const byPlatform = db
    .prepare(
      `SELECT platform, SUM(duration) AS seconds, COUNT(*) AS sessions, COUNT(DISTINCT media_id) AS games
         FROM game_session WHERE platform IS NOT NULL
        GROUP BY platform ORDER BY seconds DESC`
    )
    .all() as { platform: string; seconds: number; sessions: number; games: number }[]
  const byVia = db
    .prepare(
      `SELECT via, SUM(duration) AS seconds, COUNT(*) AS sessions
         FROM game_session WHERE via LIKE 'emu:%'
        GROUP BY via ORDER BY seconds DESC`
    )
    .all() as { via: string; seconds: number; sessions: number }[]
  return {
    byPlatform: byPlatform
      .filter((r) => isPlatformKey(r.platform))
      .map((r) => ({ platform: r.platform as PlatformKey, seconds: r.seconds, sessions: r.sessions, games: r.games })),
    byEmulator: byVia
      .map((r) => ({ key: r.via.slice(4), seconds: r.seconds, sessions: r.sessions }))
      .filter((r) => isPresetKey(r.key))
      .map((r) => ({ presetKey: r.key as PresetKey, seconds: r.seconds, sessions: r.sessions }))
  }
}
