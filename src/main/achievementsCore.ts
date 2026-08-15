// Pure decisions for achievement tracking: where cracked games' Steam
// emulators keep their unlock files, how to read those files, the rarity
// cutoffs, and the Goldberg config the setup wizard hands the user. No fs, no
// electron, no fetch — the gameLaunchCore.ts seam, so tests/achievementsCore
// drives the whole matrix on Linux against literal fixture strings.

import { posix, win32 } from 'path'

export type EmuFormat = 'goldberg-json' | 'ini'

export type EmuCandidate = {
  emu: string // display name; surfaces in the "found 0 files" diagnostic
  format: EmuFormat
  path: string
  // The path contains one `*` segment the IO half must expand (ALI213 keeps a
  // profile folder named after an arbitrary user). Kept last in the table.
  glob?: boolean
}

// Windows environment roots. Every entry is optional: a missing one simply
// drops its candidates, which is what makes this callable (and assertable)
// from a Linux test run.
export type EmuEnv = {
  appData?: string | null // %APPDATA%
  publicDir?: string | null // %PUBLIC%
  localAppData?: string | null // %LOCALAPPDATA%
}

export type ParsedUnlock = {
  apiName: string
  // Epoch ms, or null when the emulator wrote no usable time (0/absent is
  // common). The caller substitutes the file mtime or "now".
  unlockedAtMs: number | null
}

// Join under whichever path flavor the base looks like. The real inputs are
// Windows paths, but tests build them from POSIX roots.
function joinUnder(base: string, ...parts: string[]): string {
  const win = /^[a-zA-Z]:[\\/]/.test(base) || base.includes('\\')
  return win ? win32.join(base, ...parts) : posix.join(base, ...parts)
}

type Root = 'appData' | 'publicDir' | 'localAppData' | 'exeDir'

type EmuSource = {
  emu: string
  format: EmuFormat
  root: Root
  // Path segments below the root; `<appid>` is substituted, `*` marks a glob.
  segments: string[]
  glob?: boolean
}

// Table-driven on purpose: emulator layouts are community knowledge and the
// user's own machine is the ground truth, so extending this list must stay a
// one-line change. Ordered roughly by how common the emulator is; the glob
// entry is last because expanding it costs a directory read.
const EMU_SOURCES: EmuSource[] = [
  // Goldberg and its maintained fork (GSE / gbe_fork) — also what the setup
  // wizard installs, so this is the path most tracked games end up using.
  {
    emu: 'Goldberg',
    format: 'goldberg-json',
    root: 'appData',
    segments: ['Goldberg SteamEmu Saves', '<appid>', 'achievements.json']
  },
  {
    emu: 'GSE',
    format: 'goldberg-json',
    root: 'appData',
    segments: ['GSE Saves', '<appid>', 'achievements.json']
  },
  // Goldberg's local_save mode keeps everything beside the executable.
  {
    emu: 'Goldberg (local save)',
    format: 'goldberg-json',
    root: 'exeDir',
    segments: ['Goldberg SteamEmu Saves', '<appid>', 'achievements.json']
  },
  {
    emu: 'GSE (local save)',
    format: 'goldberg-json',
    root: 'exeDir',
    segments: ['GSE Saves', '<appid>', 'achievements.json']
  },
  {
    emu: 'CODEX',
    format: 'ini',
    root: 'publicDir',
    segments: ['Documents', 'Steam', 'CODEX', '<appid>', 'achievements.ini']
  },
  {
    emu: 'CODEX',
    format: 'ini',
    root: 'appData',
    segments: ['Steam', 'CODEX', '<appid>', 'achievements.ini']
  },
  {
    emu: 'RUNE',
    format: 'ini',
    root: 'publicDir',
    segments: ['Documents', 'Steam', 'RUNE', '<appid>', 'achievements.ini']
  },
  {
    emu: 'EMPRESS',
    format: 'goldberg-json',
    root: 'appData',
    segments: ['EMPRESS', '<appid>', 'achievements.json']
  },
  {
    emu: 'EMPRESS',
    format: 'goldberg-json',
    root: 'publicDir',
    segments: ['Documents', 'EMPRESS', '<appid>', 'remote', '<appid>', 'achievements.json']
  },
  {
    emu: 'Online-Fix',
    format: 'ini',
    root: 'publicDir',
    segments: ['Documents', 'OnlineFix', '<appid>', 'Stats', 'Achievements.ini']
  },
  {
    emu: 'Online-Fix',
    format: 'ini',
    root: 'exeDir',
    segments: ['OnlineFix', 'Achievements.ini']
  },
  {
    emu: 'SKIDROW',
    format: 'ini',
    root: 'localAppData',
    segments: ['SKIDROW', '<appid>', 'SteamEmu', 'UserStats', 'achiev.ini']
  },
  {
    emu: 'SKIDROW',
    format: 'ini',
    root: 'appData',
    segments: ['SKIDROW', '<appid>', 'SteamEmu', 'UserStats', 'achiev.ini']
  },
  {
    emu: 'SmartSteamEmu',
    format: 'ini',
    root: 'appData',
    segments: ['SmartSteamEmu', '<appid>', 'stats', 'achievements.ini']
  },
  {
    emu: 'ALI213',
    format: 'ini',
    root: 'exeDir',
    segments: ['Profile', '*', 'Stats', 'achievements.ini'],
    glob: true
  }
]

// Every file that could hold this appid's unlocks on this machine. Nothing is
// stat'd here — the IO half filters to the ones that exist.
export function candidateUnlockPaths(
  appid: string,
  env: EmuEnv,
  exeDir: string | null
): EmuCandidate[] {
  if (!appid.trim()) return []
  const out: EmuCandidate[] = []
  const seen = new Set<string>()
  for (const src of EMU_SOURCES) {
    const base = src.root === 'exeDir' ? exeDir : env[src.root]
    if (!base) continue
    const path = joinUnder(base, ...src.segments.map((s) => (s === '<appid>' ? appid : s)))
    if (seen.has(path)) continue
    seen.add(path)
    out.push({ emu: src.emu, format: src.format, path, ...(src.glob ? { glob: true } : {}) })
  }
  return out
}

// Emulators write epoch SECONDS, but a couple of forks write milliseconds.
// Anything past ~2001 in ms is well beyond a plausible seconds value.
const MS_THRESHOLD = 1e12
// Anything past this is not a date — a microsecond/nanosecond clock, or a
// corrupt value. It MUST be rejected here rather than passed down: SQLite's
// datetime(?, 'unixepoch') returns NULL beyond year 9999, and unlocked_at is
// NOT NULL, so one bad number would abort the whole insert transaction and
// discard every good unlock alongside it.
const MAX_PLAUSIBLE_MS = Date.UTC(2100, 0, 1)

export function normalizeTime(raw: unknown): number | null {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : NaN
  if (!Number.isFinite(n) || n <= 0) return null
  const ms = n >= MS_THRESHOLD ? Math.floor(n) : Math.floor(n * 1000)
  // No time is better than a wrong one: the caller falls back to the file's
  // mtime, which is a far more honest guess than year 55534.
  return ms > MAX_PLAUSIBLE_MS ? null : ms
}

function isTruthyFlag(raw: unknown): boolean {
  if (typeof raw === 'boolean') return raw
  if (typeof raw === 'number') return raw > 0
  if (typeof raw === 'string') {
    const v = raw.trim().toLowerCase()
    // "1,1690000000" — some INI variants pack state and time into one value.
    const head = v.split(',')[0].trim()
    return head === '1' || head === 'true' || head === 'yes'
  }
  return false
}

const EARNED_KEYS = ['earned', 'achieved', 'haveachieved', 'unlocked', 'state']
const TIME_KEYS = [
  'earned_time',
  'earnedtime',
  'unlocktime',
  'unlock_time',
  'haveachievedtime',
  'achievedtime',
  'time',
  'timestamp'
]

function pick(obj: Record<string, unknown>, keys: string[]): unknown {
  for (const k of keys) if (k in obj) return obj[k]
  return undefined
}

// Goldberg/GSE/EMPRESS: an object keyed by api name, or (some forks) an array
// of entries carrying their own name.
function parseGoldbergJson(content: string): ParsedUnlock[] {
  const data: unknown = JSON.parse(content)
  const out: ParsedUnlock[] = []

  const consume = (apiName: string, entry: unknown): void => {
    if (!apiName) return
    if (typeof entry === 'boolean' || typeof entry === 'number') {
      if (isTruthyFlag(entry)) out.push({ apiName, unlockedAtMs: null })
      return
    }
    if (!entry || typeof entry !== 'object') return
    const rec = entry as Record<string, unknown>
    if (!isTruthyFlag(pick(rec, EARNED_KEYS))) return
    out.push({ apiName, unlockedAtMs: normalizeTime(pick(rec, TIME_KEYS)) })
  }

  if (Array.isArray(data)) {
    for (const entry of data) {
      const rec = (entry ?? {}) as Record<string, unknown>
      consume(String(rec.name ?? rec.apiname ?? rec.api_name ?? ''), rec)
    }
  } else if (data && typeof data === 'object') {
    for (const [key, entry] of Object.entries(data as Record<string, unknown>)) {
      consume(key, entry)
    }
  }
  return out
}

// Sections that hold a flat list of achievements rather than being one
// achievement each (ALI213/SmartSteamEmu style).
const CONTAINER_SECTIONS = new Set(['achievements', 'achievement', 'steamachievements', 'stats'])

// The CODEX/RUNE/Online-Fix/SKIDROW family. Two shapes coexist in the wild:
//
//   [ACH_NAME]            |   [Achievements]
//   Achieved=1            |   ACH_NAME=1
//   UnlockTime=1690000000 |   ACH_OTHER=1,1690000000
//
// so both are handled in one pass. A section is an achievement unless its name
// is a known container.
function parseIni(content: string): ParsedUnlock[] {
  const out: ParsedUnlock[] = []
  let section = ''
  let fields: Record<string, string> = {}

  const flushSection = (): void => {
    if (!section || CONTAINER_SECTIONS.has(section.toLowerCase())) return
    if (!isTruthyFlag(pick(fields, EARNED_KEYS))) return
    out.push({ apiName: section, unlockedAtMs: normalizeTime(pick(fields, TIME_KEYS)) })
  }

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith(';') || line.startsWith('#')) continue

    const header = /^\[(.+)\]$/.exec(line)
    if (header) {
      flushSection()
      section = header[1].trim()
      fields = {}
      continue
    }

    const eq = line.indexOf('=')
    if (eq < 0) continue
    const key = line.slice(0, eq).trim()
    const value = line.slice(eq + 1).trim()
    if (!key) continue

    if (CONTAINER_SECTIONS.has(section.toLowerCase())) {
      if (!isTruthyFlag(value)) continue
      // "1,1690000000" packs the timestamp into the same value.
      const parts = value.split(',')
      out.push({ apiName: key, unlockedAtMs: parts.length > 1 ? normalizeTime(parts[1]) : null })
    } else {
      fields[key.toLowerCase()] = value
    }
  }
  flushSection()
  return out
}

// Never throws. A file read mid-write is half-written more often than not, and
// a torn parse must look like "nothing new yet", not like a crashed session.
export function parseUnlockFile(format: EmuFormat, content: string): ParsedUnlock[] {
  try {
    const parsed = format === 'goldberg-json' ? parseGoldbergJson(content) : parseIni(content)
    // Last write wins per api name, so a file listing one achievement twice
    // cannot produce two unlock rows.
    const byName = new Map<string, ParsedUnlock>()
    for (const u of parsed) if (u.apiName.trim()) byName.set(u.apiName, u)
    return [...byName.values()]
  } catch {
    return []
  }
}

export function diffNewUnlocks(
  known: ReadonlySet<string>,
  parsed: readonly ParsedUnlock[]
): ParsedUnlock[] {
  return parsed.filter((u) => !known.has(u.apiName))
}

export type RarityTier = 'common' | 'uncommon' | 'rare' | 'ultra-rare'

// Steam-style rarity from the global unlock percentage. Cutoffs live here
// alone; the renderer displays the tier it is given rather than re-deriving it.
export function rarityTier(globalPct: number | null | undefined): RarityTier | null {
  if (globalPct == null || !Number.isFinite(globalPct)) return null
  if (globalPct > 25) return 'common'
  if (globalPct > 10) return 'uncommon'
  if (globalPct > 3) return 'rare'
  return 'ultra-rare'
}

export type GoldbergAchievementInput = {
  apiName: string
  name: string
  description: string | null
  hidden: boolean
  iconFile: string | null // file name inside achievement_images/
  iconGrayFile: string | null
}

// The two files Goldberg reads out of a game's steam_settings folder. Goldberg
// wants `hidden` as a string and icon paths relative to steam_settings, which
// is why this is a builder rather than a JSON.stringify at the call site.
export function buildGoldbergConfig(
  appid: string,
  rows: readonly GoldbergAchievementInput[]
): { achievementsJson: string; steamAppidTxt: string } {
  const entries = rows.map((r) => ({
    name: r.apiName,
    displayName: r.name,
    description: r.description ?? '',
    hidden: r.hidden ? '1' : '0',
    icon: r.iconFile ? `achievement_images/${r.iconFile}` : '',
    icongray: r.iconGrayFile ? `achievement_images/${r.iconGrayFile}` : ''
  }))
  return {
    achievementsJson: JSON.stringify(entries, null, 2) + '\n',
    steamAppidTxt: `${appid}\n`
  }
}
