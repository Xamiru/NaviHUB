// The Kindle bridge's orchestration: Check device (detect + a read-only scan
// with a KOReader snapshot), the import preview, apply, undo and links. Runs
// only on a user action; nothing here polls or starts by itself.

import { app } from 'electron'
import { promises as fsp } from 'fs'
import { join } from 'path'
import type {
  KindleApplySelection,
  KindleDeviceBook,
  KindleDeviceInfo,
  KindleDeviceSeries,
  KindleImportPreview,
  KindleImportResult,
  KindleLinkSuggestion,
  KindleStatus,
  KindleUndoResult
} from '@shared/types'
import { logInfo, logWarn } from '../logBus'
import * as kindleRepo from '../repos/kindleRepo'
import * as settingsRepo from '../repos/settingsRepo'
import * as tasks from '../tasks'
import {
  aggregateReadingDays,
  hasChanges,
  isComicPath,
  isComicRead,
  linkCandidates,
  mergeDeviceBooks,
  mergeForMedia,
  parseKindleUnit,
  planBook,
  planManga,
  seriesKeyFor,
  seriesName,
  splitLooseComics,
  suggestLinks,
  summarizeSeries,
  type ReadingDay,
  type SeriesFile,
  type DeviceBookRecord,
  type LinkCandidate,
  type PlannedBook
} from './kindleCore'
import { detectDevices } from './kindleDevice'
import { cancelSends } from './kindleSend'
import { claimKindle, releaseKindle } from './kindleBusy'
import { readDevice, type KoVocabRow } from './kindleScan'
import { cleanWord, planVocab, vocabKey, vocabKind, type PlannedWord, type VocabLookup } from './kindleVocabCore'

const SNAPSHOTS_KEPT = 10
const SNAPSHOT_NAME = /^\d{8}-\d{6}(-\d+)?$/

interface CheckResult {
  scanId: string
  checkedAt: string
  device: KindleDeviceInfo
  books: DeviceBookRecord[]
  // Comic files grouped by series folder (seriesKeyFor), kept out of books.
  series: Map<string, DeviceBookRecord[]>
  warnings: string[]
  futureDays: number
  // Link suggestions per unlinked book and per unlinked series, computed
  // during the check (which yields between batches), never in a status read.
  suggestions: Map<string, KindleLinkSuggestion[]>
  seriesSuggestions: Map<string, KindleLinkSuggestion[]>
  // KOReader's vocabulary builder, and the offline dictionary's answers for
  // it (looked up once, at the first preview of this check).
  vocab: KoVocabRow[]
  lookups: Map<string, VocabLookup> | null
}

// Comic files in a series folder become manga series; everything else stays
// a book. A comic KOReader knows only from its statistics has no path, so it
// stays a book (unlinkable until it is opened again).
function splitSeries(all: DeviceBookRecord[]): {
  books: DeviceBookRecord[]
  series: Map<string, DeviceBookRecord[]>
} {
  const books: DeviceBookRecord[] = []
  const series = new Map<string, DeviceBookRecord[]>()
  for (const b of all) {
    const key = b.devicePath && isComicPath(b.devicePath) ? seriesKeyFor(b.devicePath) : null
    if (!key) {
      books.push(b)
      continue
    }
    const list = series.get(key)
    if (list) list.push(b)
    else series.set(key, [b])
  }
  return { books, series: splitLooseComics(series, (b) => b.devicePath!) }
}

function seriesFiles(key: string, records: DeviceBookRecord[]): SeriesFile[] {
  const name = seriesName(key)
  return records.map((r) => ({
    unit: parseKindleUnit(r.devicePath!.slice(r.devicePath!.lastIndexOf('/') + 1), name),
    read: isComicRead(r.sidecar, r.statsProgress ?? null),
    finished: r.sidecar?.status === 'complete'
  }))
}

// Each day's reading summed over a series' files.
function seriesDays(records: DeviceBookRecord[]): ReadingDay[] {
  const byDay = new Map<string, ReadingDay>()
  for (const r of records) {
    for (const d of r.days) {
      const had = byDay.get(d.day)
      byDay.set(d.day, had ? { day: d.day, seconds: had.seconds + d.seconds, pages: had.pages + d.pages } : { ...d })
    }
  }
  return [...byDay.values()].sort((a, b) => a.day.localeCompare(b.day))
}

let current: CheckResult | null = null
let lastError: string | null = null
let checkedAt: string | null = null
let running = false
let quitting = false

function today(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function kindleDir(): string {
  return join(app.getPath('userData'), 'kindle')
}

async function folderBytes(dir: string): Promise<number> {
  let total = 0
  for (const e of await fsp.readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const abs = join(dir, e.name)
    if (e.isDirectory()) total += await folderBytes(abs)
    else if (e.isFile()) total += (await fsp.stat(abs).catch(() => null))?.size ?? 0
  }
  return total
}

// Keeps the newest snapshots, and the largest older one as well: a reset
// Kindle checked ten times would otherwise push the last copy of years of
// KOReader data out. Only folders this module named are candidates.
async function pruneSnapshots(dir: string): Promise<void> {
  const names = (await fsp.readdir(dir).catch(() => [] as string[])).filter((n) => SNAPSHOT_NAME.test(n)).sort()
  const older = names.slice(0, Math.max(0, names.length - SNAPSHOTS_KEPT))
  if (!older.length) return
  let largest = older[0]
  let largestBytes = -1
  for (const name of older) {
    const bytes = await folderBytes(join(dir, name))
    if (bytes > largestBytes) {
      largest = name
      largestBytes = bytes
    }
  }
  for (const name of older) {
    if (name === largest) continue
    await fsp.rm(join(dir, name), { recursive: true, force: true }).catch(() => undefined)
  }
}

function stamp(): string {
  const d = new Date()
  const p = (n: number): string => String(n).padStart(2, '0')
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
}

// Before-quit: the check stops at its next step and never touches the
// database afterwards (status() is not read once quitting), and a running
// send ends its upload at once; its ledger row stays 'pending', so the next
// launch lists it under Unfinished sends.
export function cancelKindleJobs(): void {
  quitting = true
  // A running send's gio copy is ended at once; its partial copy is left for
  // Unfinished sends next launch (the database is about to close).
  cancelSends()
}

// What a check returns while the app quits: no database read.
const QUITTING_STATUS: KindleStatus = {
  device: null,
  checkedAt: null,
  books: [],
  series: [],
  lastImportAt: null,
  canUndoImport: false,
  error: null
}

export async function check(): Promise<KindleStatus> {
  if (running) throw new Error('The Kindle is already being read')
  if (quitting) return QUITTING_STATUS
  // Never alongside a send or clean-up: they share the device's one session.
  claimKindle('check')
  running = true
  try {
    await tasks.runTask(
      {
        kind: 'kindleScan',
        label: 'Reading the Kindle',
        route: '/books/kindle',
        controls: tasks.flagCancel('The Kindle check is short; stop it and check again instead')
      },
      async (handle) => {
        const shouldStop = (): boolean => quitting || handle.cancelRequested()
        const found = await detectDevices({
          platform: process.platform,
          uid: typeof process.getuid === 'function' ? process.getuid() : null,
          user: process.env.USER ?? null,
          folderSetting: settingsRepo.get('kindle.folder') || null
        })
        const at = new Date().toISOString()
        if (!found.length) {
          checkedAt = at
          current = null
          lastError = null
          return
        }
        const device = found[0]
        const space = await device.freeSpace()
        const snapshotsDir = join(kindleDir(), 'snapshots')
        let snapshotDir = join(snapshotsDir, stamp())
        for (let n = 2; await fsp.stat(snapshotDir).then(() => true, () => false); n++) {
          snapshotDir = join(snapshotsDir, `${stamp()}-${n}`)
        }
        const workDir = join(kindleDir(), 'work')
        let snap: Awaited<ReturnType<typeof readDevice>>
        try {
          snap = await readDevice(device, { snapshotDir, workDir, shouldStop })
        } catch (err) {
          // A stopped or failed check leaves no partial snapshot to crowd
          // complete ones out of the ten kept.
          await fsp.rm(snapshotDir, { recursive: true, force: true }).catch(() => undefined)
          throw err
        }
        await pruneSnapshots(snapshotsDir)
        const { byMd5, future } = aggregateReadingDays(snap.statDays, today())
        const all = mergeDeviceBooks(snap.sidecars, snap.statsBooks, snap.files, byMd5)
        // A whole, warning-free read says which linked books are still on the
        // device; a partial one says nothing, so nothing is marked from it.
        if (snap.warnings.length === 0 && snap.hasKoReader) {
          kindleRepo.reconcileOnDevice(
            new Set(all.map((b) => b.md5).filter((m): m is string => !!m)),
            new Set(snap.files.map((f) => f.path))
          )
        }
        const { books, series } = splitSeries(all)
        const suggestions = await suggestAll(books, shouldStop)
        const seriesSuggestions = await suggestSeries(series, shouldStop)
        checkedAt = at
        current = {
          scanId: `${Date.now()}`,
          checkedAt: at,
          device: {
            label: device.label,
            transport: device.transport,
            location: device.location,
            hasKoReader: snap.hasKoReader,
            freeBytes: space?.free ?? null,
            totalBytes: space?.total ?? null
          },
          books,
          series,
          warnings: snap.warnings,
          futureDays: future,
          suggestions,
          seriesSuggestions,
          vocab: snap.vocab,
          lookups: null
        }
        lastError = null
        for (const w of snap.warnings) logWarn('app', `Kindle: ${w}`)
        logInfo('app', `Kindle: read ${books.length} books and ${series.size} manga series from ${device.label}`)
      }
    )
  } catch (err) {
    // A stopped check keeps the previous result and reports no failure.
    if (!(err instanceof tasks.TaskCancelledError)) {
      lastError = err instanceof Error ? err.message : String(err)
      current = null
    }
  } finally {
    running = false
    releaseKindle('check')
  }
  return quitting ? QUITTING_STATUS : status()
}

// Title matches for the books not linked at check time. Matching a device
// against a large library is the one sizeable piece of work here, so it runs
// in batches that yield to the event loop between them.
async function suggestAll(
  books: DeviceBookRecord[],
  shouldStop: () => boolean
): Promise<Map<string, KindleLinkSuggestion[]>> {
  const out = new Map<string, KindleLinkSuggestion[]>()
  const links = kindleRepo.links()
  const todo = books.filter((b) => b.md5 && !links.has(b.md5))
  if (!todo.length) return out
  const candidates: LinkCandidate[] = linkCandidates(kindleRepo.bookCandidates())
  for (let i = 0; i < todo.length; i++) {
    if (i % 10 === 0) {
      await new Promise<void>((resolve) => setImmediate(resolve))
      if (shouldStop()) throw new tasks.TaskCancelledError('Kindle check')
    }
    out.set(todo[i].md5!, suggestLinks(todo[i].title, candidates))
  }
  return out
}

async function suggestSeries(
  series: Map<string, DeviceBookRecord[]>,
  shouldStop: () => boolean
): Promise<Map<string, KindleLinkSuggestion[]>> {
  const out = new Map<string, KindleLinkSuggestion[]>()
  const links = kindleRepo.seriesLinks()
  const todo = [...series.keys()].filter((k) => !links.has(k))
  if (!todo.length) return out
  const candidates: LinkCandidate[] = linkCandidates(kindleRepo.mangaCandidates())
  for (let i = 0; i < todo.length; i++) {
    if (i % 10 === 0) {
      await new Promise<void>((resolve) => setImmediate(resolve))
      if (shouldStop()) throw new tasks.TaskCancelledError('Kindle check')
    }
    out.set(todo[i], suggestLinks(seriesName(todo[i]), candidates))
  }
  return out
}

function seriesStatus(): KindleDeviceSeries[] {
  if (!current) return []
  const links = kindleRepo.seriesLinks()
  return [...current.series]
    .map(([key, records]) => {
      const summary = summarizeSeries(seriesFiles(key, records))
      const link = links.get(key)
      return {
        key,
        name: seriesName(key),
        files: summary.files,
        lastChapter: summary.lastChapter,
        chaptersRead: summary.chaptersRead,
        numbering: summary.numbering,
        volumesRead: summary.volumesRead,
        readSeconds: records.reduce((n, r) => n + r.days.reduce((m, d) => m + d.seconds, 0), 0),
        mediaId: link?.mediaId ?? null,
        mediaTitle: link?.mediaTitle ?? null,
        suggestions: link ? [] : (current!.seriesSuggestions.get(key) ?? [])
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function status(): KindleStatus {
  const last = kindleRepo.lastImport()
  const base = {
    lastImportAt: last?.importedAt ?? null,
    canUndoImport: !!last && !last.undone,
    checkedAt,
    error: lastError
  }
  if (!current) return { ...base, device: null, books: [], series: [] }
  const links = kindleRepo.links()
  const books: KindleDeviceBook[] = current.books.map((b) => {
    const link = b.md5 ? links.get(b.md5) : undefined
    return {
      key: b.key,
      devicePath: b.devicePath,
      title: b.title,
      authors: b.authors,
      partialMd5: b.md5,
      percent: b.sidecar?.percent ?? null,
      status: b.sidecar?.status ?? null,
      highlights: b.sidecar?.annotations.length ?? 0,
      readSeconds: b.days.reduce((n, d) => n + d.seconds, 0),
      mediaId: link?.mediaId ?? null,
      mediaTitle: link?.mediaTitle ?? null,
      link: link?.origin ?? null,
      suggestions: link || !b.md5 ? [] : (current!.suggestions.get(b.md5) ?? [])
    }
  })
  return { ...base, device: current.device, books, series: seriesStatus() }
}

// One plan per linked library book. Two device files of the same book are
// merged first (mergeForMedia), so their reading on one day adds up and the
// stored total is folded in once.
function plans(): { planned: PlannedBook[]; unmatched: DeviceBookRecord[] } {
  if (!current) throw new Error('Check the Kindle first')
  const links = kindleRepo.links()
  const byMedia = new Map<number, DeviceBookRecord[]>()
  const unmatched: DeviceBookRecord[] = []
  for (const b of current.books) {
    const link = b.md5 ? links.get(b.md5) : undefined
    if (!link) {
      if (b.sidecar || b.days.length) unmatched.push(b)
      continue
    }
    const list = byMedia.get(link.mediaId)
    if (list) list.push(b)
    else byMedia.set(link.mediaId, [b])
  }
  const allDays = [...new Set(current.books.flatMap((b) => b.days.map((d) => d.day)))]
  const t = today()
  const creditable = kindleRepo.creditableDays(allDays, t)
  const planned: PlannedBook[] = []
  const loggedDays = kindleRepo.loggedSessionDays()
  for (const [mediaId, records] of byMedia) {
    const { sidecar, days } = mergeForMedia(records)
    const input = kindleRepo.planInput(mediaId, sidecar, days, loggedDays)
    if (!input) continue
    const plan = planBook(input, t, (day) => creditable.has(day))
    // The daily item is one checkbox: a day credited for this book is not
    // credited again for another book read the same day.
    for (const d of plan.days) if (d.credit) creditable.delete(d.day)
    if (hasChanges(plan)) planned.push(plan)
  }
  // Manga: one plan per linked library manga. Two series folders linked to
  // the same manga (a split download) are planned together.
  const seriesLinks = kindleRepo.seriesLinks()
  const byManga = new Map<number, Array<[string, DeviceBookRecord[]]>>()
  for (const entry of current.series) {
    const link = seriesLinks.get(entry[0])
    if (!link) continue
    const list = byManga.get(link.mediaId)
    if (list) list.push(entry)
    else byManga.set(link.mediaId, [entry])
  }
  for (const [mediaId, entries] of byManga) {
    if (byMedia.has(mediaId)) continue // a manga id cannot also be a linked book
    const files = entries.flatMap(([key, records]) => seriesFiles(key, records))
    const days = seriesDays(entries.flatMap(([, records]) => records))
    const input = kindleRepo.mangaPlanInput(mediaId, files, days)
    if (!input) continue
    const plan = planManga(input, t)
    if (hasChanges(plan)) planned.push(plan)
  }
  return { planned, unmatched }
}

// At most this many new words are looked up and offered per check; the rest
// come in the next import.
const MAX_WORDS = 300

// Offline meanings for the words a check found: English from the installed
// WordNet, Japanese from the installed Yomitan dictionaries. No network: a
// word neither dictionary knows has no meaning. Each word is looked up once
// per check (the answers are cached on the check), and only up to MAX_WORDS
// new words are planned per preview; the rest follow in the next one.
async function wordPlan(check: CheckResult): Promise<PlannedWord[]> {
  const isSkipped = kindleRepo.vocabSkipper()
  const todo: Array<{ key: string; kind: 'en' | 'jp'; word: string }> = []
  const seen = new Set<string>()
  for (const r of check.vocab) {
    if (todo.length >= MAX_WORDS) break
    const kind = vocabKind(r.word)
    if (!kind) continue
    const key = vocabKey(kind, r.word)
    if (seen.has(key)) continue
    seen.add(key)
    const word = cleanWord(r.word)
    if (isSkipped({ key, kind, word })) continue
    todo.push({ key, kind, word })
  }
  const lookups = (check.lookups ??= new Map<string, VocabLookup>())
  const missing = todo.filter((c) => !lookups.has(c.key))
  if (missing.length) {
    const english = missing.some((c) => c.kind === 'en') ? await import('../english') : null
    const japanese = missing.some((c) => c.kind === 'jp') ? await import('../dict/lookup') : null
    const { deinflect } = japanese ? await import('../dict/deinflect') : { deinflect: null }
    const { flattenGlossary } = await import('@shared/dictContent')
    for (let i = 0; i < missing.length; i++) {
      if (i % 20 === 0) await new Promise<void>((resolve) => setImmediate(resolve))
      const c = missing[i]
      try {
        if (c.kind === 'en' && english) {
          const meaning = english.lookupOffline(c.word)[0]?.meanings[0]
          const def = meaning?.definitions[0]?.definition ?? null
          lookups.set(c.key, { meaning: def, pos: meaning?.partOfSpeech ?? null })
        } else if (c.kind === 'jp' && japanese) {
          // Only an entry for this whole word (or its dictionary form):
          // lookupWord also returns prefixes, whose meaning would be another
          // word's. A kanji-only Chinese word has no such entry, so it stays
          // out of the Japanese deck.
          const forms = new Set((deinflect ? deinflect(c.word) : [{ term: c.word }]).map((d) => d.term))
          const entries = await japanese.lookupWord(c.word)
          const entry = entries.find((e) => e.expression === c.word) ?? entries.find((e) => forms.has(e.expression))
          const gloss = entry?.defs[0] ? flattenGlossary(entry.defs[0].glossary, 160) : ''
          lookups.set(c.key, { meaning: gloss || null, reading: entry?.reading || null })
        }
      } catch {
        lookups.set(c.key, { meaning: null })
      }
    }
  }
  const allowed = new Set(todo.map((c) => c.key))
  const rows = check.vocab.filter((r) => {
    const kind = vocabKind(r.word)
    return kind != null && allowed.has(vocabKey(kind, r.word))
  })
  return planVocab(rows, new Set(), lookups)
}

export async function preview(): Promise<KindleImportPreview> {
  if (!current) throw new Error('Check the Kindle first')
  const check = current
  const words = await wordPlan(check)
  if (current !== check) throw new Error('The Kindle was checked again; open the preview again')
  const { planned, unmatched } = plans()
  const unmatchedKeys = new Set(unmatched.map((u) => u.key))
  const warnings = [...current.warnings]
  if (current.futureDays > 0) {
    warnings.push(
      `${current.futureDays} days of reading are dated after today, so the Kindle's clock may be wrong; they were left out.`
    )
  }
  const days = [
    ...current.books.flatMap((b) => b.days.map((d) => d.day)),
    ...[...current.series.values()].flatMap((records) => records.flatMap((r) => r.days.map((d) => d.day)))
  ].sort()
  return {
    scanId: current.scanId,
    scannedAt: current.checkedAt,
    deviceLabel: current.device.label,
    readingRange: days.length ? { first: days[0], last: days[days.length - 1] } : null,
    books: planned.map((p) => ({
      mediaId: p.mediaId,
      title: p.title,
      kind: p.kind,
      progress: p.progress,
      progressDefaultOn: p.progressDefaultOn,
      chapterNumbering: p.chapterNumbering,
      status: p.status,
      statusDefaultOn: p.statusDefaultOn,
      rereading: p.rereading,
      percent: p.percent,
      volumesRead: p.volumesRead,
      quotes: p.quotes.map((q) => ({ key: q.key, kind: q.kind, text: q.text, note: q.note, locator: q.locator })),
      skippedDeleted: p.skippedDeleted,
      reading: p.reading
    })),
    unmatched: status().books.filter((b) => unmatchedKeys.has(b.key)),
    words: words.map((w) => ({
      key: w.key,
      kind: w.kind,
      word: w.word,
      reading: w.reading,
      meaning: w.meaning,
      context: w.context,
      book: w.book,
      importable: w.importable
    })),
    warnings
  }
}

// The plan is rebuilt from the scanned device data and the library as it is
// NOW, so anything changed since the preview is judged afresh.
export async function apply(selection: KindleApplySelection): Promise<KindleImportResult> {
  if (!current || current.scanId !== selection.scanId) {
    throw new Error('The Kindle was checked again since this preview; review the new one')
  }
  const check = current
  const typed = selection.wordMeanings && typeof selection.wordMeanings === 'object' ? selection.wordMeanings : {}
  const words = (selection.words?.length ? await wordPlan(check) : []).map((w) => {
    // A meaning the user typed makes a word the dictionary did not know
    // importable; it never replaces a dictionary meaning.
    const own = typeof typed[w.key] === 'string' ? typed[w.key].trim().slice(0, 500) : ''
    return !w.importable && own ? { ...w, meaning: own, importable: true } : w
  })
  if (current !== check) throw new Error('The Kindle was checked again since this preview; review the new one')
  const { planned } = plans()
  const result = kindleRepo.apply(planned, selection, today(), words)
  logInfo(
    'app',
    `Kindle import ${result.importId}: ${result.progressUpdated} progress, ${result.statusUpdated} status, ` +
      `${result.quotesAdded} new quotes, ${result.quotesUpdated} updated, ${result.readingDays} reading days, ` +
      `${result.wordsAdded} words`
  )
  return result
}

export function undoLastImport(): KindleUndoResult {
  return kindleRepo.undoLast()
}

export function link(md5: string, mediaId: number): void {
  const book = current?.books.find((b) => b.md5 === md5)
  kindleRepo.link(md5, mediaId, book?.devicePath ?? null)
}

export function unlink(md5: string): void {
  kindleRepo.unlink(md5)
}

// Only a series folder the last check found can be linked.
export function linkSeries(seriesKey: string, mediaId: number): void {
  if (!current?.series.has(seriesKey)) throw new Error('That series is not on the Kindle; check it again')
  kindleRepo.linkSeries(seriesKey, mediaId)
}

export function unlinkSeries(seriesKey: string): void {
  kindleRepo.unlinkSeries(seriesKey)
}
