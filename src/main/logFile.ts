// The file half of the logger — the ONLY part that touches electron or fs.
// Subscribes to logBus and appends to userData/logs/navihub.log, rotating at a
// size cap so a long-lived install can't fill the disk.
import { app } from 'electron'
import { join } from 'path'
import { closeSync, existsSync, mkdirSync, openSync, renameSync, statSync, unlinkSync, writeSync } from 'fs'
import { formatLine, levelAtLeast, rotationPlan } from './logCore'
import { onEntry } from './logBus'
import type { LogEntry, LogLevel } from '@shared/types'

const CAP_BYTES = 2 * 1024 * 1024 // 2 MB per file
const KEEP = 3 // navihub.1.log … navihub.3.log -> ~8 MB total
const FLUSH_BYTES = 8 * 1024
const FLUSH_MS = 250

let dir: string | null = null
let fd: number | null = null
let bytes = 0
let pending: string[] = []
let pendingBytes = 0
let timer: NodeJS.Timeout | null = null
let unsubscribe: (() => void) | null = null
let minLevel: LogLevel = 'debug'

export function logFilePath(): string {
  return join(dir ?? defaultDir(), 'navihub.log')
}

export function logDir(): string {
  return dir ?? defaultDir()
}

function defaultDir(): string {
  return join(app.getPath('userData'), 'logs')
}

export function startFileSink(
  opts: { dir?: string; capBytes?: number; keep?: number; minLevel?: LogLevel } = {}
): void {
  if (fd != null) return
  try {
    dir = opts.dir ?? defaultDir()
    minLevel = opts.minLevel ?? 'debug'
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    open()
  } catch {
    // No writable userData (headless test runtime, read-only volume): the ring
    // buffer still works and the app still starts. Logging is never load-bearing.
    dir = null
    fd = null
    return
  }
  const cap = opts.capBytes ?? CAP_BYTES
  const keep = opts.keep ?? KEEP
  unsubscribe = onEntry((e) => accept(e, cap, keep))
}

function open(): void {
  const path = logFilePath()
  fd = openSync(path, 'a')
  bytes = existsSync(path) ? statSync(path).size : 0
}

function accept(e: LogEntry, cap: number, keep: number): void {
  if (fd == null || !levelAtLeast(e.level, minLevel)) return
  const line = `${formatLine(e)}\n`
  pending.push(line)
  pendingBytes += Buffer.byteLength(line)
  if (pendingBytes >= FLUSH_BYTES) {
    flush(cap, keep)
    return
  }
  // A DEBOUNCED ONE-SHOT, and unref'd: a repeating interval here would be a
  // second main-process timer (achievementWatcher owns the app's one), and an
  // un-unref'd one would hold the process open at quit.
  if (timer == null) {
    timer = setTimeout(() => {
      timer = null
      flush(cap, keep)
    }, FLUSH_MS)
    timer.unref()
  }
}

function flush(cap: number, keep: number): void {
  if (fd == null || pending.length === 0) return
  const chunk = pending.join('')
  pending = []
  pendingBytes = 0
  try {
    writeSync(fd, chunk)
    bytes += Buffer.byteLength(chunk)
  } catch {
    return
  }
  const plan = rotationPlan(bytes, cap, keep)
  if (plan.rotate) rotate(plan.unlink, plan.renames)
}

function rotate(unlink: string[], renames: [string, string][]): void {
  const base = dir
  if (base == null || fd == null) return
  try {
    closeSync(fd)
    fd = null
    for (const name of unlink) {
      const p = join(base, name)
      if (existsSync(p)) unlinkSync(p)
    }
    // Newest index first, so nothing is clobbered mid-chain.
    for (const [from, to] of renames) {
      const src = join(base, from)
      if (existsSync(src)) renameSync(src, join(base, to))
    }
  } catch {
    // Fall through and reopen — a failed rotation must not stop logging.
  }
  try {
    open()
  } catch {
    fd = null
  }
}

// Called LAST in before-quit. Synchronous by design: writeSync + closeSync
// means the final lines are on disk when this returns. A WriteStream's end()
// is async and before-quit does not await, so the tail of every session would
// be lost.
export function stopFileSink(): void {
  unsubscribe?.()
  unsubscribe = null
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  flush(CAP_BYTES, KEEP)
  if (fd != null) {
    try {
      closeSync(fd)
    } catch {
      /* nothing useful left to do at quit */
    }
    fd = null
  }
  pending = []
  pendingBytes = 0
}
