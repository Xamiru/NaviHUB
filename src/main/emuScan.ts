import { existsSync, readdirSync, readFileSync, statSync } from 'fs'
import { join, posix, win32 } from 'path'
import { candidateUnlockPaths, joinUnder, parseUnlockFileFull } from './achievementsCore'
import type { EmuCandidate, EmuEnv, ParsedProgress, ParsedUnlock } from './achievementsCore'
import type { EmuState } from './repos/achievementRepo'

// Reading the unlock files cracked games' Steam emulators leave behind. The
// decisions (which paths, which formats) are in achievementsCore.ts; this is
// the thin IO half, and every filesystem call goes through an injected
// EmuFileIO so tests drive the whole thing from a plain object — the scanner's
// TagReader posture.

export type EmuFileIO = {
  exists(path: string): boolean
  readFile(path: string): string
  mtimeMs(path: string): number | null
  listDirs(path: string): string[]
}

// Every method swallows its errors: these paths point into other programs'
// save folders, which can vanish, be locked mid-write, or sit on a drive that
// just went away. A scan that throws would take a play session's popup with it.
export const nodeFileIO: EmuFileIO = {
  exists: (p) => {
    try {
      return existsSync(p)
    } catch {
      return false
    }
  },
  readFile: (p) => {
    try {
      return readFileSync(p, 'utf8')
    } catch {
      return ''
    }
  },
  mtimeMs: (p) => {
    try {
      return statSync(p).mtimeMs
    } catch {
      return null
    }
  },
  listDirs: (p) => {
    try {
      return readdirSync(p, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
    } catch {
      return []
    }
  }
}

// %APPDATA% and friends. Read here rather than in the pure core so the core
// stays assertable with made-up roots.
export function windowsEnv(env: NodeJS.ProcessEnv = process.env): EmuEnv {
  return {
    appData: env.APPDATA ?? null,
    publicDir: env.PUBLIC ?? null,
    localAppData: env.LOCALAPPDATA ?? null
  }
}

// A `*` segment (ALI213's profile folder) becomes one candidate per directory
// that actually exists there. Everything else passes through untouched.
function expandGlob(candidate: EmuCandidate, io: EmuFileIO): EmuCandidate[] {
  const marker = candidate.path.split(/[\\/]/).indexOf('*')
  if (marker < 0) return [candidate]
  const sep = candidate.path.includes('\\') ? '\\' : '/'
  const parts = candidate.path.split(/[\\/]/)
  const parent = parts.slice(0, marker).join(sep)
  return io.listDirs(parent).map((name) => ({
    ...candidate,
    glob: false,
    path: [...parts.slice(0, marker), name, ...parts.slice(marker + 1)].join(sep)
  }))
}

// The candidate files that exist on this machine right now.
export function existingUnlockFiles(
  appid: string,
  exeDir: string | null,
  io: EmuFileIO = nodeFileIO,
  env: EmuEnv = windowsEnv()
): EmuCandidate[] {
  return candidateUnlockPaths(appid, env, exeDir)
    .flatMap((c) => (c.glob ? expandGlob(c, io) : [c]))
    .filter((c) => io.exists(c.path))
}

export type EmuScanResult = {
  // Every emulator whose file was found, for the "nothing to read" diagnostic.
  emus: string[]
  files: number
  unlocks: ParsedUnlock[]
  // Explicitly not earned in at least one file and earned in none.
  locked: string[]
  // Counters for achievements no file marks earned (highest wins).
  progress: ParsedProgress[]
  // Every file found parsed whole. A torn read anywhere means `locked` must
  // not be acted on — the earned flag may simply not have been read.
  complete: boolean
  // Newest mtime across the files read — the watcher's cheap change check.
  newestMtimeMs: number | null
}

// Read and merge every unlock file for one game. Two emulators can both have
// written for the same title (a re-cracked install); merging keeps the EARLIEST
// timestamp per achievement, matching the repo's insert rule.
export function scanUnlocks(
  appid: string,
  exeDir: string | null,
  io: EmuFileIO = nodeFileIO,
  env: EmuEnv = windowsEnv()
): EmuScanResult {
  const files = existingUnlockFiles(appid, exeDir, io, env)
  const merged = new Map<string, ParsedUnlock>()
  const locked = new Set<string>()
  const progress = new Map<string, ParsedProgress>()
  let complete = files.length > 0
  let newest: number | null = null

  for (const file of files) {
    const mtime = io.mtimeMs(file.path)
    if (mtime != null) newest = newest == null ? mtime : Math.max(newest, mtime)
    const parsed = parseUnlockFileFull(file.format, io.readFile(file.path))
    if (!parsed.complete) complete = false
    for (const name of parsed.locked) locked.add(name)
    for (const p of parsed.progress) {
      const prior = progress.get(p.apiName)
      if (!prior || p.current > prior.current) progress.set(p.apiName, p)
    }
    for (const u of parsed.unlocks) {
      const prior = merged.get(u.apiName)
      if (!prior) {
        merged.set(u.apiName, u)
        continue
      }
      // A known time always beats "no time", then earliest wins.
      if (prior.unlockedAtMs == null) merged.set(u.apiName, u)
      else if (u.unlockedAtMs != null && u.unlockedAtMs < prior.unlockedAtMs) {
        merged.set(u.apiName, u)
      }
    }
  }

  return {
    emus: [...new Set(files.map((f) => f.emu))],
    files: files.length,
    unlocks: [...merged.values()],
    locked: [...locked].filter((name) => !merged.has(name)),
    progress: [...progress.values()].filter((p) => !merged.has(p.apiName)),
    complete,
    newestMtimeMs: newest
  }
}

// What a read says beyond its earned list, in the shape the repo applies
// (achievementRepo.applyEmuScan).
export function emuStateOf(scan: EmuScanResult): EmuState {
  return {
    locked: scan.locked,
    progress: scan.progress,
    complete: scan.complete,
    earned: scan.unlocks.map((u) => ({ apiName: u.apiName, unlockedAtMs: u.unlockedAtMs }))
  }
}

// The folder a linked executable sits in — where the exe-relative candidates
// (Online-Fix, ALI213, Goldberg's local-save mode) are rooted.
export function exeDirOf(exePath: string | null): string | null {
  if (!exePath?.trim()) return null
  // The stored path is a Windows path. Pick the flavor by its separators
  // rather than by the host: tests assert on these paths from Linux, and the
  // posix dirname of "C:\\Games\\x.exe" is "." — a silent miss.
  const dir = exePath.includes('\\') ? win32.dirname(exePath) : posix.dirname(exePath)
  return dir && dir !== '.' ? dir : null
}

// Where the wizard writes a generated Goldberg config.
export function steamSettingsDir(baseDir: string): string {
  return join(baseDir, 'steam_settings')
}

// The exe's folder and up to two above it (some releases keep the exe in
// bin/ or bin/x64/ under the emulator's files) — the one search every
// game-folder lookup uses, so the installer and the schema loader can never
// settle on different folders.
export function gameDirCandidates(exeDir: string | null): string[] {
  if (!exeDir) return []
  const sep = exeDir.includes('\\') ? '\\' : '/'
  const parts = exeDir.split(/[\\/]/)
  const out: string[] = []
  for (let up = 0; up <= 2 && parts.length - up > 0; up++) {
    const base = parts.slice(0, parts.length - up).join(sep)
    if (!base) break
    out.push(base)
  }
  return out
}


export type ApiDllName = 'steam_api64.dll' | 'steam_api.dll'
const API_DLLS: ApiDllName[] = ['steam_api64.dll', 'steam_api.dll']

// The game's steam_api DLL: Goldberg reads steam_settings beside it, so this
// is the folder that matters.
export function findApiDll(
  exeDir: string | null,
  io: EmuFileIO = nodeFileIO
): { dir: string; name: ApiDllName } | null {
  for (const dir of gameDirCandidates(exeDir)) {
    for (const name of API_DLLS) {
      if (io.exists(joinUnder(dir, name))) {
        return { dir, name }
      }
    }
  }
  return null
}

// The achievement schema a Goldberg/GSE crack ships — the zero-network source
// for the list. When the game has a steam_api DLL, ONLY the steam_settings
// beside it counts (it is the one the emulator reads, and the one one-click
// setup writes); otherwise the nearest steam_settings up the same search.
export function findLocalSteamSchema(
  exeDir: string | null,
  io: EmuFileIO = nodeFileIO
): { dir: string; content: string } | null {
  const dll = findApiDll(exeDir, io)
  const dirs = dll ? [dll.dir] : gameDirCandidates(exeDir)
  for (const base of dirs) {
    const dir = joinUnder(base, 'steam_settings')
    const file = joinUnder(dir, 'achievements.json')
    if (io.exists(file)) {
      const content = io.readFile(file)
      if (content.trim()) return { dir, content }
    }
  }
  return null
}
