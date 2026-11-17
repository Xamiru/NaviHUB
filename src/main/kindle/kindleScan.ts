// Reads everything an import needs from a Kindle, read-only: KOReader book
// sidecars, the statistics database and the list of book files. Each KOReader
// file read is also copied into a snapshot folder under userData, so the
// user's highlights and reading history survive a reset or lost device.

import Database from 'better-sqlite3'
import { promises as fsp } from 'fs'
import { dirname, join } from 'path'
import type { KindleDevice } from './kindleDevice'
import { TaskCancelledError } from '../tasks'
import {
  isSafeRelative,
  normalizeSidecar,
  partialMd5,
  type KoSidecar,
  type StatDayRow
} from './kindleCore'
import { isLuaTable, parseLuaLiteral } from './luaLiteral'

export const BOOK_EXTENSIONS = new Set(['epub', 'cbz', 'pdf', 'mobi', 'azw3', 'fb2', 'txt', 'djvu'])
const SIDECAR_RE = /^metadata\.[a-z0-9]+\.lua$/i
// KOReader sidecars are tens of KB, a few MB with thousands of highlights;
// the Lua parser holds a string as one number per byte, so this bounds it.
const SIDECAR_MAX_BYTES = 4 * 1024 * 1024
// A KOReader SQLite file copied off the device for reading (statistics,
// vocabulary): years of statistics stay well under this.
const DB_COPY_MAX_BYTES = 512 * 1024 * 1024
const STATS_PATH = 'koreader/settings/statistics.sqlite3'
const VOCAB_PATH = 'koreader/settings/vocabulary_builder.sqlite3'
// A vocabulary list is the user's own lookups; this bounds a pathological file.
const MAX_VOCAB_ROWS = 20000

// One word looked up in KOReader's vocabulary builder (schema confirmed on the
// user's device, 2026-11-17): `word` is the dictionary form ("lurch"),
// `highlight` the form tapped when it differs ("lurched"), and the text on
// either side of it; `title` names the book.
export interface KoVocabRow {
  word: string
  highlight: string | null
  prev: string | null
  next: string | null
  title: string | null
  createdAt: number | null // unix seconds
}
// Kept in the snapshot for later features and as a backup; not read here.
// The vocabulary builder is not here: readVocab copies it once (with its WAL)
// and files that copy in the snapshot, as readStats does for the statistics.
const SNAPSHOT_EXTRAS = [
  'koreader/history.lua',
  'koreader/settings.reader.lua'
]

export interface DeviceSidecar extends KoSidecar {
  sidecarPath: string
}

export interface StatsBook {
  md5: string
  title: string | null
  authors: string | null
  // KOReader's page count for the book and the furthest page read. Used only
  // for comics whose sidecar has no position (seen on the user's device:
  // ZenOS-touched sidecars with no percent_finished).
  pages?: number | null
  maxPage?: number | null
}

export interface DeviceFile {
  path: string
  size: number
}

export interface DeviceSnapshot {
  hasKoReader: boolean
  sidecars: DeviceSidecar[]
  files: DeviceFile[]
  statsBooks: StatsBook[]
  statDays: StatDayRow[]
  vocab: KoVocabRow[]
  warnings: string[]
}

export interface ScanLimits {
  maxEntries: number
  maxDepth: number
}

const DEFAULT_LIMITS: ScanLimits = { maxEntries: 50_000, maxDepth: 10 }

interface Walk {
  sdrDirs: string[]
  files: DeviceFile[]
  entries: number
}

async function walk(
  device: KindleDevice,
  start: string,
  limits: ScanLimits,
  out: Walk,
  shouldStop: () => boolean
): Promise<void> {
  const queue: Array<{ rel: string; depth: number }> = [{ rel: start, depth: 0 }]
  while (queue.length) {
    if (shouldStop()) throw new TaskCancelledError('Kindle check')
    const { rel, depth } = queue.shift()!
    for (const e of await device.list(rel)) {
      if (++out.entries > limits.maxEntries) {
        throw new Error(`The device has more than ${limits.maxEntries} files; the scan stopped`)
      }
      const child = `${rel}/${e.name}`
      // A name no Kindle path can hold (a backslash, a control code) is
      // skipped rather than failing the whole check.
      if (!isSafeRelative(child)) continue
      if (e.isDir) {
        // Hidden folders (the stock reader's .cache) and the stock
        // dictionaries are never the user's books.
        if (e.name.startsWith('.') || child === 'documents/dictionaries') continue
        if (e.name.endsWith('.sdr')) out.sdrDirs.push(child)
        else if (depth + 1 < limits.maxDepth) queue.push({ rel: child, depth: depth + 1 })
      } else {
        const ext = /\.([^./]+)$/.exec(e.name)?.[1]?.toLowerCase()
        if (ext && BOOK_EXTENSIONS.has(ext) && rel.startsWith('documents')) {
          out.files.push({ path: child, size: e.size })
        }
      }
    }
  }
}

type SidecarLocation = 'doc' | 'dir' | 'hash'

// KOReader's `document_metadata_folder` setting: beside the book (default),
// under koreader/docsettings, or hashed.
async function sidecarLocation(device: KindleDevice): Promise<SidecarLocation> {
  try {
    const text = await device.readText('koreader/settings.reader.lua', 4 * 1024 * 1024)
    const v = text ? parseLuaLiteral(text) : null
    const setting = isLuaTable(v) ? v.document_metadata_folder : null
    return setting === 'dir' || setting === 'hash' ? setting : 'doc'
  } catch {
    return 'doc'
  }
}

export function locationRank(sidecarPath: string, prefer: SidecarLocation): number {
  const where: SidecarLocation = sidecarPath.startsWith('koreader/docsettings/')
    ? 'dir'
    : sidecarPath.startsWith('koreader/hashdocsettings/')
      ? 'hash'
      : 'doc'
  return where === prefer ? 0 : 1
}

async function writeSnapshotFile(snapshotDir: string | null, rel: string, text: string): Promise<void> {
  if (!snapshotDir) return
  const target = join(snapshotDir, ...rel.split('/'))
  await fsp.mkdir(dirname(target), { recursive: true })
  await fsp.writeFile(target, text, 'utf8')
}

// Copies one device file under targetRoot. A file larger than the cap is
// refused before any byte is copied, so a hostile or runaway file cannot fill
// userData (it would be copied twice: the working copy and the snapshot).
async function copySnapshotFile(
  device: KindleDevice,
  rel: string,
  targetRoot: string,
  maxBytes = DB_COPY_MAX_BYTES
): Promise<string | null> {
  const slash = rel.lastIndexOf('/')
  const entry = (await device.list(slash < 0 ? '' : rel.slice(0, slash))).find(
    (e) => e.name === rel.slice(slash + 1)
  )
  if (!entry || entry.isDir) return null
  if (entry.size > maxBytes) {
    throw new Error(`${rel} is ${Math.round(entry.size / 1024 ** 2)} MiB, over the ${Math.round(maxBytes / 1024 ** 2)} MiB limit`)
  }
  const target = join(targetRoot, ...rel.split('/'))
  await fsp.mkdir(dirname(target), { recursive: true })
  return (await device.copyToLocal(rel, target)) ? target : null
}

export async function readDevice(
  device: KindleDevice,
  opts: {
    snapshotDir: string | null
    workDir: string
    limits?: ScanLimits
    shouldStop?: () => boolean
  }
): Promise<DeviceSnapshot> {
  const limits = opts.limits ?? DEFAULT_LIMITS
  const shouldStop = opts.shouldStop ?? (() => false)
  const warnings: string[] = []
  const root = await device.list('')
  const hasKoReader = root.some((e) => e.isDir && e.name === 'koreader')

  const w: Walk = { sdrDirs: [], files: [], entries: 0 }
  if (root.some((e) => e.isDir && e.name === 'documents')) {
    await walk(device, 'documents', limits, w, shouldStop)
  }
  if (hasKoReader) {
    await walk(device, 'koreader/docsettings', { ...limits, maxDepth: limits.maxDepth + 6 }, w, shouldStop)
    await walk(device, 'koreader/hashdocsettings', limits, w, shouldStop)
  }

  const sidecars: DeviceSidecar[] = []
  for (const sdr of w.sdrDirs) {
    if (shouldStop()) throw new TaskCancelledError('Kindle check')
    const meta = (await device.list(sdr)).find((e) => !e.isDir && SIDECAR_RE.test(e.name))
    if (!meta) continue // the stock reader's own .sdr folders
    const sidecarPath = `${sdr}/${meta.name}`
    let text: string | null
    try {
      text = await device.readText(sidecarPath, SIDECAR_MAX_BYTES)
    } catch (err) {
      warnings.push(`Could not read ${sidecarPath}: ${(err as Error).message}`)
      continue
    }
    if (text == null) continue
    await writeSnapshotFile(opts.snapshotDir, sidecarPath, text)
    try {
      const parsed = normalizeSidecar(parseLuaLiteral(text), sidecarPath)
      if (parsed) sidecars.push({ ...parsed, sidecarPath })
    } catch (err) {
      warnings.push(`Could not read ${sidecarPath}: ${(err as Error).message}`)
    }
  }

  // A book can have a stale sidecar left in an old location after the user
  // switched KOReader's "book metadata location"; the one KOReader is set to
  // use comes first, and mergeDeviceBooks keeps the first per book.
  if (hasKoReader && sidecars.length > 1) {
    const prefer = await sidecarLocation(device)
    sidecars.sort((a, b) => locationRank(a.sidecarPath, prefer) - locationRank(b.sidecarPath, prefer))
  }

  // Older sidecars may lack the checksum; KOReader computes it from the file.
  const filePaths = new Set(w.files.map((f) => f.path))
  for (const s of sidecars) {
    if (s.partialMd5 || !s.bookPath || !filePaths.has(s.bookPath)) continue
    try {
      s.partialMd5 = await partialMd5((offset, length) => device.readRange(s.bookPath!, offset, length))
    } catch (err) {
      warnings.push(`Could not fingerprint ${s.bookPath}: ${(err as Error).message}`)
    }
  }

  let statsBooks: StatsBook[] = []
  let statDays: StatDayRow[] = []
  let vocab: KoVocabRow[] = []
  if (hasKoReader) {
    if (opts.snapshotDir) {
      for (const rel of SNAPSHOT_EXTRAS) {
        if (shouldStop()) throw new TaskCancelledError('Kindle check')
        try {
          await copySnapshotFile(device, rel, opts.snapshotDir)
        } catch (err) {
          warnings.push(`Could not back up ${rel}: ${(err as Error).message}`)
        }
      }
    }
    if (shouldStop()) throw new TaskCancelledError('Kindle check')
    const stats = await readStats(device, opts.snapshotDir, opts.workDir, warnings, shouldStop)
    statsBooks = stats.books
    statDays = stats.days
    if (shouldStop()) throw new TaskCancelledError('Kindle check')
    vocab = await readVocab(device, opts.snapshotDir, opts.workDir, warnings, shouldStop)
  }

  return { hasKoReader, sidecars, files: w.files, statsBooks, statDays, vocab, warnings }
}

// The vocabulary builder: copied off the device once, with its WAL, into a
// working folder; the snapshot gets that copy, and only the working copy is
// opened. A copy torn while KOReader was writing fails the integrity check and
// is skipped with a warning.
async function readVocab(
  device: KindleDevice,
  snapshotDir: string | null,
  workDir: string,
  warnings: string[],
  shouldStop: () => boolean
): Promise<KoVocabRow[]> {
  const work = join(workDir, `vocab-${process.pid}-${Date.now()}`)
  await fsp.mkdir(work, { recursive: true })
  try {
    const copied = await copySnapshotFile(device, VOCAB_PATH, work)
    if (!copied) return []
    await copySnapshotFile(device, `${VOCAB_PATH}-wal`, work).catch(() => null)
    if (shouldStop()) throw new TaskCancelledError('Kindle check')
    if (snapshotDir) {
      const snap = join(snapshotDir, ...VOCAB_PATH.split('/'))
      await fsp.mkdir(dirname(snap), { recursive: true })
      await fsp.copyFile(copied, snap)
      await fsp.copyFile(`${copied}-wal`, `${snap}-wal`).catch(() => undefined)
    }
    const { rows, capped } = readVocabFile(copied)
    if (capped) warnings.push(`KOReader holds more than ${MAX_VOCAB_ROWS} looked-up words; only the newest were read.`)
    return rows
  } catch (err) {
    if (err instanceof TaskCancelledError) throw err
    warnings.push(`Could not read KOReader's vocabulary: ${(err as Error).message}`)
    return []
  } finally {
    await fsp.rm(work, { recursive: true, force: true }).catch(() => undefined)
  }
}

// Older KOReader versions lack some columns (highlight, the contexts, the
// title table); each missing one reads as NULL. Past the cap, the NEWEST
// lookups are kept: they are the ones not imported yet.
export function readVocabFile(path: string): { rows: KoVocabRow[]; capped: boolean } {
  const db = new Database(path, { fileMustExist: true })
  try {
    const check = db.pragma('quick_check', { simple: true })
    if (check !== 'ok') throw new Error(`the copy is damaged (${String(check)})`)
    const has = (name: string): boolean =>
      !!db.prepare(`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?`).get(name)
    if (!has('vocabulary')) return { rows: [], capped: false }
    const cols = new Set((db.prepare('PRAGMA table_info(vocabulary)').all() as Array<{ name: string }>).map((c) => c.name))
    if (!cols.has('word')) return { rows: [], capped: false }
    const col = (name: string, as: string): string => (cols.has(name) ? `v.${name} AS ${as}` : `NULL AS ${as}`)
    const titles = has('title') && cols.has('title_id')
    const order = cols.has('create_time') ? 'v.create_time DESC' : 'v.rowid DESC'
    const rows = (
      db
        .prepare(
          `SELECT v.word AS word, ${col('highlight', 'highlight')}, ${col('prev_context', 'prev')},
                  ${col('next_context', 'next')}, ${titles ? 't.name' : 'NULL'} AS title,
                  ${col('create_time', 'createdAt')}
           FROM vocabulary v ${titles ? 'LEFT JOIN title t ON t.id = v.title_id' : ''}
           ORDER BY ${order} LIMIT ?`
        )
        .all(MAX_VOCAB_ROWS + 1) as Array<Record<string, unknown>>
    ).reverse()
    const capped = rows.length > MAX_VOCAB_ROWS
    if (capped) rows.shift()
    const str = (v: unknown): string | null => (typeof v === 'string' && v.trim() ? v : null)
    const out = rows
      .map((r) => ({
        word: typeof r.word === 'string' ? r.word.trim() : '',
        highlight: str(r.highlight),
        prev: str(r.prev),
        next: str(r.next),
        title: str(r.title),
        createdAt: typeof r.createdAt === 'number' ? r.createdAt : null
      }))
      .filter((r) => r.word.length > 0 && r.word.length <= 100)
    return { rows: out, capped }
  } finally {
    db.close()
  }
}

async function readStats(
  device: KindleDevice,
  snapshotDir: string | null,
  workDir: string,
  warnings: string[],
  shouldStop: () => boolean
): Promise<{ books: StatsBook[]; days: StatDayRow[] }> {
  const work = join(workDir, `stats-${process.pid}-${Date.now()}`)
  await fsp.mkdir(work, { recursive: true })
  try {
    // The working copy is opened read-write so SQLite can replay a WAL; the
    // snapshot copy is never opened.
    const copied = await copySnapshotFile(device, STATS_PATH, work)
    if (!copied) return { books: [], days: [] }
    await copySnapshotFile(device, `${STATS_PATH}-wal`, work).catch(() => null)
    if (shouldStop()) throw new TaskCancelledError('Kindle check')
    if (snapshotDir) {
      const snap = join(snapshotDir, ...STATS_PATH.split('/'))
      await fsp.mkdir(dirname(snap), { recursive: true })
      await fsp.copyFile(copied, snap)
      await fsp.copyFile(`${copied}-wal`, `${snap}-wal`).catch(() => undefined)
    }
    return readStatsFile(copied)
  } catch (err) {
    if (err instanceof TaskCancelledError) throw err
    warnings.push(`Could not read KOReader statistics: ${(err as Error).message}`)
    return { books: [], days: [] }
  } finally {
    await fsp.rm(work, { recursive: true, force: true }).catch(() => undefined)
  }
}

// Reading time per book and local day, summed inside SQLite: page_stat_data
// holds a row per page turn (hundreds of thousands after a few years), and
// grouping there keeps that loop out of JavaScript. 'localtime' is this
// process's zone, the same one main uses for "today".
export function readStatsFile(path: string): { books: StatsBook[]; days: StatDayRow[] } {
  const db = new Database(path, { fileMustExist: true })
  try {
    // A copy torn while KOReader was writing is refused, never half-read.
    const check = db.pragma('quick_check', { simple: true })
    if (check !== 'ok') throw new Error(`the copy is damaged (${String(check)})`)
    const has = (name: string): boolean =>
      !!db.prepare(`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?`).get(name)
    if (!has('book')) return { books: [], days: [] }
    const hasPages = has('page_stat_data')
    // One MAX per book: page_stat_data's key starts with id_book, so it seeks.
    const books = (
      db
        .prepare(
          hasPages
            ? `SELECT md5, title, authors, pages,
                      (SELECT MAX(p.page) FROM page_stat_data p WHERE p.id_book = book.id) AS max_page
               FROM book WHERE md5 IS NOT NULL`
            : `SELECT md5, title, authors, pages, NULL AS max_page FROM book WHERE md5 IS NOT NULL`
        )
        .all() as Array<{
        md5: string
        title: string | null
        authors: string | null
        pages: number | null
        max_page: number | null
      }>
    ).map((b) => ({
      md5: b.md5.toLowerCase(),
      title: b.title,
      authors: b.authors,
      pages: typeof b.pages === 'number' ? b.pages : null,
      maxPage: typeof b.max_page === 'number' ? b.max_page : null
    }))
    const days = hasPages
      ? (db
          .prepare(
            `SELECT b.md5 AS md5, date(p.start_time, 'unixepoch', 'localtime') AS day,
                    SUM(p.duration) AS seconds, COUNT(DISTINCT p.page) AS pages
             FROM page_stat_data p JOIN book b ON b.id = p.id_book
             WHERE p.duration > 0 AND b.md5 IS NOT NULL
             GROUP BY b.md5, day`
          )
          .all() as StatDayRow[])
      : []
    return { books, days }
  } finally {
    db.close()
  }
}
