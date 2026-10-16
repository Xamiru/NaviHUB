import { posix, win32 } from 'path'
import { EMULATOR_PRESETS, type DataDirRule, type PresetKey } from '@shared/emulation/emulatorPresets'
import { isPlatformKey, type PlatformKey } from '@shared/emulation/platforms'
import { assertLaunchableExe } from './gameLaunchCore'

// The pure half of emulator launching (the gameLaunchCore seam): argument
// lists, user-folder resolution, which way to play, and which screenshot files
// belong to a session. No fs, no electron — emulation.ts is the IO half.

const MAX_ARGS = 64
const MAX_ARG_CHARS = 1024

// Stored paths are Windows paths, but tests run on Linux: pick the flavor by
// the path's own shape (the emuScan.exeDirOf rule).
export function pathApi(p: string): typeof win32 | typeof posix {
  return p.includes('\\') || /^[a-z]:/i.test(p) ? win32 : posix
}

export function dirOf(p: string): string {
  return pathApi(p).dirname(p)
}

export function joinPath(base: string, ...parts: string[]): string {
  const api = pathApi(base)
  return api.join(base, ...parts.flatMap((part) => part.split(/[\\/]/).filter(Boolean)))
}

// A user-edited argument list: a JSON array of plain strings. Null when the
// value is unusable, so the caller falls back to the preset.
export function parseArgsJson(json: string | null | undefined): string[] | null {
  if (!json) return null
  try {
    const value = JSON.parse(json)
    if (!Array.isArray(value) || value.length === 0 || value.length > MAX_ARGS) return null
    if (!value.every((a) => typeof a === 'string' && a.length <= MAX_ARG_CHARS && !a.includes('\u0000'))) {
      return null
    }
    return value as string[]
  } catch {
    return null
  }
}

export function validateArgs(args: unknown): string[] {
  const parsed = parseArgsJson(JSON.stringify(args ?? null))
  if (!parsed) throw new Error('Arguments must be a list of up to 64 short values.')
  if (parsed.filter((a) => a === '{rom}').length > 1) {
    throw new Error('The game file ({rom}) can appear only once.')
  }
  return parsed
}

// The argv for one launch. Every token is one element; a template with no
// '{rom}' gets the game file appended. The game file and core must be plain
// absolute paths, so neither can be read as an option.
export function buildArgv(template: readonly string[], rom: string, core: string | null): string[] {
  assertLaunchableExe(rom)
  const needsCore = template.includes('{core}')
  if (needsCore) {
    if (!core?.trim()) throw new Error('Pick a RetroArch core for this emulator first.')
    assertLaunchableExe(core)
  }
  const out = template.map((arg) => (arg === '{rom}' ? rom : arg === '{core}' ? (core as string) : arg))
  if (!template.includes('{rom}')) out.push(rom)
  return out
}

export function templateFor(preset: PresetKey, argsJson: string | null): readonly string[] {
  return parseArgsJson(argsJson) ?? EMULATOR_PRESETS[preset].args
}

export interface FolderEnv {
  appData: string | null
  localAppData: string | null
  documents: string | null
}

function expand(template: string, exeDir: string, env: FolderEnv): string | null {
  const tokens: Record<string, string | null> = {
    '{exeDir}': exeDir,
    '{appData}': env.appData,
    '{localAppData}': env.localAppData,
    '{documents}': env.documents
  }
  const m = /^(\{[a-zA-Z]+\})(.*)$/.exec(template)
  if (!m) return null
  const base = tokens[m[1]]
  if (!base) return null
  return m[2] ? joinPath(base, m[2]) : base
}

// The emulator's user folder: an explicit override wins, then a portable
// marker beside the exe, then the first default folder that exists. Null when
// nothing is known — the Emulators page asks the user instead of guessing.
export function resolveDataDir(
  rule: DataDirRule,
  exePath: string,
  override: string | null,
  env: FolderEnv,
  exists: (path: string) => boolean
): string | null {
  if (override?.trim()) return override
  const exeDir = dirOf(exePath)
  for (const { marker, dir } of rule.portable) {
    if (exists(joinPath(exeDir, marker))) return expand(dir, exeDir, env)
  }
  for (const candidate of rule.defaults) {
    const path = expand(candidate, exeDir, env)
    if (path && exists(path)) return path
  }
  return null
}

export function resolveScreenshotDir(
  preset: PresetKey,
  override: string | null,
  dataDir: string | null
): string | null {
  if (override?.trim()) return override
  const sub = EMULATOR_PRESETS[preset].screenshots
  return sub && dataDir ? joinPath(dataDir, sub) : null
}

export function parsePlatforms(json: string | null | undefined): PlatformKey[] {
  try {
    const value = JSON.parse(json ?? '[]')
    return Array.isArray(value) ? [...new Set(value.filter(isPlatformKey))] : []
  } catch {
    return []
  }
}

// ---- which way to play ----

export type LaunchChoice = { kind: 'native' } | { kind: 'rom'; romId: number }

export interface RomChoiceRow {
  id: number
  preferred: boolean
}

// An explicit choice wins; otherwise the preferred game file, then the linked
// executable, then a game file when it is the only one.
export function chooseLaunch(
  requested: LaunchChoice | null,
  exePath: string | null,
  roms: readonly RomChoiceRow[]
): LaunchChoice {
  if (requested) {
    if (requested.kind === 'native') {
      if (!exePath?.trim()) throw new Error('No executable linked — use "Link executable" first.')
      return requested
    }
    if (!roms.some((r) => r.id === requested.romId)) throw new Error('That game file is no longer linked.')
    return requested
  }
  const preferred = roms.find((r) => r.preferred)
  if (preferred) return { kind: 'rom', romId: preferred.id }
  if (exePath?.trim()) return { kind: 'native' }
  if (roms.length === 1) return { kind: 'rom', romId: roms[0].id }
  if (roms.length > 1) throw new Error('Several game files are linked — choose one to play.')
  throw new Error('Nothing to launch — link an executable or a game file first.')
}

// The emulator for a game file: its own pick, else the platform default.
export function emulatorIdFor(
  rom: { emulatorId: number | null; platform: string },
  defaults: ReadonlyMap<string, number>
): number | null {
  return rom.emulatorId ?? defaults.get(rom.platform) ?? null
}

// ---- session screenshots ----

export interface ShotCandidate {
  path: string
  mtimeMs: number
  size: number
}

const SHOT_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'webp', 'bmp'])
export const MAX_SESSION_SHOTS = 200

// Image files written while the game ran (plus the grace after exit, when
// emulators flush). Oldest first; empty or oversized files are skipped.
export function sessionShots(
  files: readonly ShotCandidate[],
  startedAtMs: number,
  endedAtMs: number,
  graceMs: number,
  maxBytes: number
): string[] {
  return files
    .filter((f) => {
      const ext = f.path.split('.').pop()?.toLowerCase() ?? ''
      return (
        SHOT_EXTENSIONS.has(ext) &&
        f.size > 0 &&
        f.size <= maxBytes &&
        f.mtimeMs >= startedAtMs &&
        f.mtimeMs <= endedAtMs + graceMs
      )
    })
    .sort((a, b) => a.mtimeMs - b.mtimeMs)
    .slice(0, MAX_SESSION_SHOTS)
    .map((f) => f.path)
}

// Which known emulator an already-linked executable is, so the Ways to play
// card can say "PCSX2" instead of calling an emulator a native port.
export { detectPreset } from '@shared/emulation/emulatorPresets'
