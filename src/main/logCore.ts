// Pure half of the logger (the logBus.ts / logFile.ts split follows the
// updaterCore/updater and gameLaunchCore/gameLaunch precedent). Every decision
// the log sink makes lives here: what a line looks like, what gets redacted,
// when the file rotates, which child-process lines are worth keeping.
//
// ZERO runtime imports, deliberately. The producers of log lines are modules
// like http.ts that tests import with no electron mock — if the logging chain
// ever pulls electron in, those tests die. `import type` is erased, so the
// shared types below cost nothing at runtime.
import type { LogEntry, LogLevel } from '@shared/types'

const LEVEL_ORDER: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 }

export function levelAtLeast(level: LogLevel, min: LogLevel): boolean {
  return (LEVEL_ORDER[level] ?? 0) >= (LEVEL_ORDER[min] ?? 0)
}

// Secrets that would otherwise land in a file the user might share. Applied
// ONCE at ingest (logBus.log) so the ring buffer and the file are both clean —
// redacting at read time would leave the plaintext sitting on disk.
//
// Idempotent by construction: re-running it over '***' is a no-op, so an
// already-redacted string can pass through again safely.
const REDACTIONS: [RegExp, string][] = [
  [/(?:set-cookie|cookie)\s*:\s*[^\r\n]+/gi, 'Cookie: ***'],
  // ?apikey= / &api_key= / ?token= / &key= / ?access_token= — every importer's
  // credential is a query param (TMDB, RAWG, IGDB, RetroAchievements, Jackett).
  [/([?&](?:api[_-]?key|apikey|access[_-]?token|token|key|secret)=)[^&\s"']+/gi, '$1***'],
  // Authorization: Bearer … / Token … (AniList, GitHub releases)
  [/(authorization"?\s*[:=]\s*"?(?:bearer|token)\s+)[^\s"',]+/gi, '$1***'],
  // API-Football uses a nonstandard authorization header. http.ts does not log
  // headers today, but defense-in-depth keeps future diagnostics safe.
  [/(x-apisports-key"?\s*[:=]\s*"?)[^\s"',}]+/gi, '$1***'],
  // GitHub PATs, which the updater takes as a setting and could echo in an error
  [/\bghp_[A-Za-z0-9]{16,}/g, 'ghp_***'],
  [/\bgithub_pat_[A-Za-z0-9_]{16,}/g, 'github_pat_***']
]

// RetroAchievements is the one source whose credentials are SINGLE-LETTER query
// params (z = username, y = Web API key), which no name-based rule above can
// match without also eating unrelated `?y=`/`?z=` query strings. So it is
// scoped to the host: find an RA URL, then redact inside it. http.ts logs the
// full URL on every retry and every >=400, so without this the user's API key
// lands verbatim in a file the Tools menu invites them to open and share.
const RA_URL = /https?:\/\/[^\s"']*retroachievements\.org[^\s"']*/gi
const RA_CRED = /([?&][yz]=)[^&\s"']+/gi

export function redact(text: string): string {
  let out = text.replace(/https?:\/\/[^\s"']*googlevideo\.com[^\s"']*/gi, '[private audio stream]')
  for (const [re, replacement] of REDACTIONS) out = out.replace(re, replacement)
  return out.replace(RA_URL, (url) => url.replace(RA_CRED, '$1***'))
}

function pad(n: number, width = 2): string {
  return String(n).padStart(width, '0')
}

// Local time, not ISO/UTC: this log is read by one person on one machine, and
// correlating a line with "the import I started a minute ago" is the whole job.
export function formatTs(ms: number): string {
  const d = new Date(ms)
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`
  )
}

export function formatLine(e: LogEntry): string {
  const task = e.taskId ? ` [${e.taskId}]` : ''
  return `${formatTs(e.ts)} ${e.level.toUpperCase().padEnd(5)} ${e.source.padEnd(5)}${task} ${e.message}`
}

// ---- file rotation ----
// Pure plan so the fs half stays a dumb executor: navihub.log -> navihub.1.log
// -> … -> navihub.<keep>.log, oldest dropped. Renames run NEWEST-INDEX-FIRST so
// nothing is clobbered mid-chain.
export interface RotationPlan {
  rotate: boolean
  unlink: string[]
  renames: [string, string][]
}

export function rotationPlan(size: number, capBytes: number, keep: number): RotationPlan {
  if (size < capBytes) return { rotate: false, unlink: [], renames: [] }
  // keep 0 = no history wanted: drop the current file and start over.
  if (keep < 1) return { rotate: true, unlink: ['navihub.log'], renames: [] }
  const renames: [string, string][] = []
  for (let i = keep - 1; i >= 1; i--) renames.push([`navihub.${i}.log`, `navihub.${i + 1}.log`])
  renames.push(['navihub.log', 'navihub.1.log'])
  return { rotate: true, unlink: [`navihub.${keep}.log`], renames }
}

// ---- the ring buffer ----
// A real circular buffer, not an array + shift(): this is written to from every
// HTTP retry and every child-process line, and shift() on a 3000-element array
// is O(n) per push in V8.
//
// `seq` is supplied by the caller and must be strictly increasing and NEVER
// reused — a poller holds it as a cursor, and an index-based id would silently
// rewind that cursor every time the buffer wrapped.
export class Ring<T extends { seq: number }> {
  private buf: (T | undefined)[]
  private head = 0 // next write slot
  private count = 0

  constructor(readonly cap: number) {
    this.buf = new Array(Math.max(1, cap))
  }

  push(value: T): void {
    this.buf[this.head] = value
    this.head = (this.head + 1) % this.cap
    if (this.count < this.cap) this.count++
  }

  get size(): number {
    return this.count
  }

  // Index 0 is the OLDEST retained entry.
  at(i: number): T {
    return this.buf[(this.head - this.count + i + this.cap) % this.cap]!
  }

  oldestSeq(): number {
    return this.count === 0 ? 0 : this.at(0).seq
  }

  newestSeq(): number {
    return this.count === 0 ? 0 : this.at(this.count - 1).seq
  }

  // Entries are pushed in increasing seq order, so the cursor position is a
  // binary search rather than a scan of everything the poller already has.
  firstIndexAfter(seq: number): number {
    let lo = 0
    let hi = this.count
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (this.at(mid).seq > seq) hi = mid
      else lo = mid + 1
    }
    return lo
  }

  clear(): void {
    this.buf = new Array(Math.max(1, this.cap))
    this.head = 0
    this.count = 0
  }
}

// ---- child-process line filtering ----
// Not an optimization — a correctness requirement. mokuro emits a
// progress line per page on a bare \r; unfiltered, one run floods
// a 3000-entry ring in under a minute and evicts everything worth reading.
export type ProcTool = 'ytdlp' | 'spotdl' | 'mokuro'

const PERCENT_STEP: Record<ProcTool, number> = { ytdlp: 10, spotdl: 10, mokuro: 25 }

// Returns a stateful keep/drop predicate — one per spawn, never shared.
export function makeProcLineFilter(tool: ProcTool): (line: string) => boolean {
  const step = PERCENT_STEP[tool]
  let lastBucket = -1
  return (line: string): boolean => {
    const text = line.trim()
    if (text === '') return false

    const percent = matchPercent(tool, text)
    if (percent == null) return true

    const bucket = Math.floor(percent / step)
    if (bucket === lastBucket) return false
    lastBucket = bucket
    return true
  }
}

function matchPercent(tool: ProcTool, text: string): number | null {
  if (tool === 'ytdlp' || tool === 'spotdl') {
    // "[download]  45.3% of  120.00MiB at 2.00MiB/s ETA 00:30"
    const m = /^\[download\]\s+(\d+(?:\.\d+)?)%/.exec(text)
    return m ? Number(m[1]) : null
  }
  if (tool === 'mokuro') {
    // tqdm: " 45%|████      | 12/26 [00:03<00:04,  2.9it/s]"
    const m = /^(\d+)%\|/.exec(text)
    return m ? Number(m[1]) : null
  }
  return null
}
