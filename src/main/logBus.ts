// The log singleton every producer talks to. Holds a bounded ring for the
// renderer's cursor poll and fans each entry out to sinks (logFile.ts).
//
// Imports logCore ONLY — no electron, no fs. http.ts and db/connection.ts log
// through this, and their tests import them with no electron mock; the moment
// this file pulls electron in, a large share of the suite dies.
import { Ring, formatLine, levelAtLeast, redact } from './logCore'
import type { LogEntry, LogLevel, LogPage, LogSource, LogTailRequest } from '@shared/types'

// ~3000 entries at ~200 B each is well under a megabyte, and is sized against
// a resumed ffmpeg/mokuro burst — which is exactly why makeProcLineFilter
// exists upstream of it.
const RING_CAP = 3000
const DEFAULT_LIMIT = 500
const MAX_LIMIT = 2000

const ring = new Ring<LogEntry>(RING_CAP)
const sinks = new Set<(e: LogEntry) => void>()
let seq = 0

export function log(
  level: LogLevel,
  source: LogSource,
  message: string,
  taskId: string | null = null
): void {
  const entry: LogEntry = {
    seq: ++seq,
    ts: Date.now(),
    level,
    source,
    taskId,
    // Redact once, here, so BOTH the ring and the file are clean. Redacting at
    // read time would leave the plaintext sitting on disk.
    message: redact(String(message))
  }
  ring.push(entry)
  for (const sink of sinks) {
    try {
      sink(entry)
    } catch {
      // A failing sink (a full disk) must never break the caller's real work.
    }
  }
  // The app has zero console output by design; this is the one opt-in escape
  // hatch for `NAVIHUB_LOG_STDOUT=1 npm run dev`, and it is not console.*.
  if (process.env['NAVIHUB_LOG_STDOUT'] === '1') {
    process.stdout.write(`${formatLine(entry)}\n`)
  }
}

// Convenience wrappers — the call sites read better than log('warn', 'http', …)
export const logDebug = (source: LogSource, message: string, taskId?: string | null): void =>
  log('debug', source, message, taskId ?? null)
export const logInfo = (source: LogSource, message: string, taskId?: string | null): void =>
  log('info', source, message, taskId ?? null)
export const logWarn = (source: LogSource, message: string, taskId?: string | null): void =>
  log('warn', source, message, taskId ?? null)
export const logError = (source: LogSource, message: string, taskId?: string | null): void =>
  log('error', source, message, taskId ?? null)

export function onEntry(sink: (e: LogEntry) => void): () => void {
  sinks.add(sink)
  return () => sinks.delete(sink)
}

export function readLog(req: LogTailRequest = {}): LogPage {
  const limit = Math.min(Math.max(1, req.limit ?? DEFAULT_LIMIT), MAX_LIMIT)
  const minLevel = req.minLevel ?? 'debug'
  const matches = (e: LogEntry): boolean =>
    (!req.taskId || e.taskId === req.taskId) && levelAtLeast(e.level, minLevel)

  // Seed: no cursor yet. Answer with the NEWEST matching entries and jump the
  // cursor to the head — otherwise a viewer opened against a full ring would
  // spend six polls replaying history the user did not ask for.
  if (!req.afterSeq) {
    const entries: LogEntry[] = []
    for (let i = ring.size - 1; i >= 0 && entries.length < limit; i--) {
      const e = ring.at(i)
      if (matches(e)) entries.push(e)
    }
    entries.reverse()
    return { entries, nextSeq: ring.newestSeq(), oldestSeq: ring.oldestSeq(), dropped: 0 }
  }

  const after = req.afterSeq
  // Entries the ring dropped before this cursor could reach them.
  const oldest = ring.oldestSeq()
  const dropped = oldest > after + 1 ? oldest - after - 1 : 0

  const entries: LogEntry[] = []
  // Track the last SCANNED seq, not the last returned one: with a level filter
  // on, a long run of filtered-out entries would otherwise be rescanned on
  // every poll forever.
  let scannedTo = after
  for (let i = ring.firstIndexAfter(after); i < ring.size; i++) {
    const e = ring.at(i)
    scannedTo = e.seq
    if (!matches(e)) continue
    entries.push(e)
    if (entries.length >= limit) break
  }
  return { entries, nextSeq: scannedTo, oldestSeq: oldest, dropped }
}

// Test seam (the ring and seq counter are module state).
export function __reset(): void {
  ring.clear()
  sinks.clear()
  seq = 0
}
