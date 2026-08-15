import { existsSync, readdirSync, readFileSync, statSync } from 'fs'
import { dirname, join } from 'path'
import { candidateUnlockPaths, parseUnlockFile } from './achievementsCore'
import type { EmuCandidate, EmuEnv, ParsedUnlock } from './achievementsCore'

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
  let newest: number | null = null

  for (const file of files) {
    const mtime = io.mtimeMs(file.path)
    if (mtime != null) newest = newest == null ? mtime : Math.max(newest, mtime)
    for (const u of parseUnlockFile(file.format, io.readFile(file.path))) {
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
    newestMtimeMs: newest
  }
}

// The folder a linked executable sits in — where the exe-relative candidates
// (Online-Fix, ALI213, Goldberg's local-save mode) are rooted.
export function exeDirOf(exePath: string | null): string | null {
  if (!exePath?.trim()) return null
  // The stored path is a Windows path; dirname handles it on Windows and
  // degrades to a harmless miss on Linux, where none of this runs anyway.
  const dir = dirname(exePath)
  return dir && dir !== '.' ? dir : null
}

// Where the wizard writes a generated Goldberg config.
export function steamSettingsDir(baseDir: string): string {
  return join(baseDir, 'steam_settings')
}
