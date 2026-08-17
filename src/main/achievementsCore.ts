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

// ---------------------------------------------------------------------------
// Keyless schema sources. Steam only hands out Web API keys to accounts that
// have spent money, and this user's account never will — so the achievement
// LIST has to come from somewhere that needs no key. Two sources, in the order
// achievements.ts tries them:
//
//   1. The crack's own steam_settings/achievements.json (Goldberg/GSE ship it
//      beside the exe). Full schema, INCLUDING the api names the emulator
//      writes unlocks under, and it needs no network at all.
//   2. Steam's public community stats page, which lists names/art/global % but
//      NOT api names — those are joined in from the keyless percentages
//      endpoint by matching percentages (both are sorted by % desc).
// ---------------------------------------------------------------------------

export type SchemaRow = {
  apiName: string
  name: string
  description: string | null
  hidden: boolean
  // Local sources: a path relative to steam_settings. Remote: a URL.
  icon: string | null
  iconGray: string | null
  globalPct: number | null
}

// Goldberg's displayName/description are plain strings in older configs and
// `{ english: "…", german: "…" }` objects in newer GSE ones.
function localized(v: unknown): string | null {
  if (typeof v === 'string') return v.trim() || null
  if (v && typeof v === 'object') {
    const rec = v as Record<string, unknown>
    const pick = rec.english ?? Object.values(rec)[0]
    return typeof pick === 'string' && pick.trim() ? pick.trim() : null
  }
  return null
}

function str(v: unknown): string | null {
  return typeof v === 'string' && v.trim() ? v.trim() : null
}

// steam_settings/achievements.json — an array (documented shape), tolerating
// the object-keyed-by-name variant some tools write. Never throws.
export function parseGoldbergSchema(content: string): SchemaRow[] {
  try {
    const data: unknown = JSON.parse(content)
    const entries: [string | null, Record<string, unknown>][] = Array.isArray(data)
      ? data.map((e) => [null, (e ?? {}) as Record<string, unknown>])
      : data && typeof data === 'object'
        ? Object.entries(data as Record<string, unknown>).map(([k, e]) => [
            k,
            (e ?? {}) as Record<string, unknown>
          ])
        : []
    const out: SchemaRow[] = []
    const seen = new Set<string>()
    for (const [key, e] of entries) {
      const apiName = str(e.name) ?? key
      if (!apiName || seen.has(apiName)) continue
      seen.add(apiName)
      out.push({
        apiName,
        name: localized(e.displayName) ?? apiName,
        description: localized(e.description),
        hidden: isTruthyFlag(e.hidden),
        icon: str(e.icon),
        iconGray: str(e.icongray) ?? str(e.icon_gray),
        globalPct: null
      })
    }
    return out
  } catch {
    return []
  }
}

export type CommunityRow = {
  name: string
  description: string | null
  iconUrl: string | null
  percent: number | null
}

function decodeEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&')
    .trim()
}

// steamcommunity.com/stats/<appid>/achievements — one `achieveRow` block per
// achievement: image, "82.4%", <h3>name</h3>, <h5>description</h5>. Regex, not
// a DOM: main has no parser and the page shape has been stable for a decade.
// Never throws; a page that is not the stats page (login wall, error) → [].
export function parseCommunityAchievementsPage(html: string): CommunityRow[] {
  const blocks = html.split(/class="achieveRow/).slice(1)
  const out: CommunityRow[] = []
  for (const block of blocks) {
    const name = /<h3[^>]*>([\s\S]*?)<\/h3>/.exec(block)?.[1]
    if (name == null) continue
    const desc = /<h5[^>]*>([\s\S]*?)<\/h5>/.exec(block)?.[1] ?? ''
    const img = /<img[^>]+src="([^"]+)"/.exec(block)?.[1] ?? null
    const pctRaw = /achievePercent[^>]*>\s*([\d.]+)\s*%/.exec(block)?.[1]
    const pct = pctRaw != null ? Number(pctRaw) : NaN
    out.push({
      name: decodeEntities(name.replace(/<[^>]+>/g, '')),
      description: decodeEntities(desc.replace(/<[^>]+>/g, '')) || null,
      iconUrl: img,
      percent: Number.isFinite(pct) ? pct : null
    })
  }
  return out
}

export type PercentRow = { name: string; percent: number }

// The community page carries no api names, and the percentages endpoint
// carries nothing BUT api names — and both are sorted by global % descending.
// That shared ORDER is the bridge, not the numbers: Steam serves the page from
// a cache and the endpoint live, so on any game with active players most
// values differ by a tenth and an exact-percent join collapses (AC4 Black Flag:
// 12 of 49 paired). So:
//   - equal counts → pair by rank outright (a tie run can at worst swap names
//     inside itself, which a later re-fetch corrects);
//   - unequal counts (a page/endpoint out of step about an added or removed
//     achievement) → an order-preserving alignment that pairs rows within
//     PCT_TOLERANCE of each other and drops what cannot be placed, counted so
//     the caller can say so.
const PCT_TOLERANCE = 1.5

function byPercentDesc<T extends { percent: number | null }>(rows: readonly T[]): T[] {
  return [...rows].sort((a, b) => (b.percent ?? -1) - (a.percent ?? -1))
}

export function joinCommunityWithPercentages(
  page: readonly CommunityRow[],
  pct: readonly PercentRow[]
): { rows: SchemaRow[]; unmatched: number } {
  const p = byPercentDesc(page)
  const a = byPercentDesc(pct)
  const toRow = (row: CommunityRow, partner: PercentRow): SchemaRow => ({
    apiName: partner.name,
    name: row.name,
    description: row.description,
    // Steam blanks the description of HIDDEN achievements on the public page
    // (verified: Yakuza 6 shows 8 empty <h5>s out of 59, exactly its secret
    // set), so an empty description is the hidden flag here. The real text
    // stays unknown until a source that has it is fetched.
    hidden: row.description == null,
    icon: row.iconUrl,
    iconGray: null, // Steam serves no locked art here; the UI greys the icon
    globalPct: partner.percent
  })

  if (p.length === a.length) {
    return { rows: p.map((row, i) => toRow(row, a[i])), unmatched: 0 }
  }

  // Order-preserving alignment (LCS over "close enough" pairs).
  const n = p.length
  const m = a.length
  const close = (i: number, j: number): boolean =>
    p[i].percent != null && Math.abs((p[i].percent as number) - a[j].percent) <= PCT_TOLERANCE
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1], close(i, j) ? 1 + dp[i + 1][j + 1] : 0)
    }
  }
  const rows: SchemaRow[] = []
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (close(i, j) && dp[i][j] === 1 + dp[i + 1][j + 1]) {
      rows.push(toRow(p[i], a[j]))
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++
    else j++
  }
  return { rows, unmatched: n - rows.length }
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
