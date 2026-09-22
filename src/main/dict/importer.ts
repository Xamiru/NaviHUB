import { unlink } from 'fs/promises'
import { join } from 'path'
import { setImmediate as yieldToLoop } from 'timers/promises'
import yauzl from 'yauzl'
import type Database from 'better-sqlite3'
import { fetchWithRetry } from '../http'
import { streamResponseToFile } from '../streamDownload'
import * as tasks from '../tasks'
import { getDictDb } from './dictDb'
import { flattenGlossary } from '@shared/dictContent'
import type {
  DictImportStatus,
  DictImportSummary,
  DictInfo,
  GlossaryItem
} from '@shared/types'

// Imports Yomitan dictionary zips into dictionaries.db. Two hard constraints
// shape everything here:
//  1. better-sqlite3 is synchronous and runs on the main process, so a 200k-row
//     import is broken into ~1000-row transactions with an event-loop yield
//     between each — the status poll and UI stay responsive.
//  2. The `dict` registry row is written LAST (stage-then-swap), so a crash
//     mid-import leaves only orphan child rows, which dictDb sweeps on startup.

const CHUNK = 1000
const DELETE_CHUNK = 2000
const UA = 'NaviHUB/1.0 (+https://github.com/yomidevs/jmdict-yomitan)'
const MAX_DICTIONARY_ARCHIVE_BYTES = 2 * 1024 * 1024 * 1024
const MAX_DICTIONARY_ENTRY_BYTES = 256 * 1024 * 1024
let downloadCounter = 0

// Freely-hosted presets. Other dictionaries (pitch accent, DOJG, 新和英) are
// imported from a user-picked zip via importZipFile. The two frequency
// dictionaries are ordinary Yomitan zips whose term_meta banks carry mode='freq'
// rows — they import through exactly the same path as JMdict.
const PRESETS: Record<string, string> = {
  'jmdict-en': 'https://github.com/yomidevs/jmdict-yomitan/releases/latest/download/JMdict_english.zip',
  'kanjidic-en': 'https://github.com/yomidevs/jmdict-yomitan/releases/latest/download/KANJIDIC_english.zip',
  'jpdb-freq':
    'https://github.com/Kuuuube/yomitan-dictionaries/raw/main/dictionaries/JPDB_v2.2_Frequency_Kana_2024-10-13.zip',
  'bccwj-freq':
    'https://github.com/Kuuuube/yomitan-dictionaries/raw/main/dictionaries/BCCWJ_SUW_LUW_combined.zip',
  jmnedict: 'https://github.com/yomidevs/jmdict-yomitan/releases/latest/download/JMnedict.zip'
}
export type PresetKey = keyof typeof PRESETS

// Per-preset import options. JMnedict is ~740k proper names:
//  · glossFts:false keeps its romaji glosses OUT of the English search —
//    searchEnglish ranks purely by FTS score, so names would swamp real words
//    (it also roughly halves the import time and DB growth);
//  · defaultPriority:-10 sinks name-only groups below every word group in
//    lookupJapanese's sort, so names never crowd out words in lookups.
const PRESET_OPTS: Record<string, ImportOpts> = {
  jmnedict: { glossFts: false, defaultPriority: -10 }
}

// ---- live status (module-level, polled via dict:importStatus) ----

const importState: DictImportStatus = {
  running: false,
  phase: 'idle',
  done: 0,
  total: 0,
  dictTitle: null,
  error: null
}

export function getImportStatus(): DictImportStatus {
  return { ...importState }
}

// Phase/progress setter shared with the sentence and stroke importers, which
// run through the same one-at-a-time `runImport` gate and the same status poll.
export function setImportPhase(phase: DictImportStatus['phase'], done = 0, total = 0): void {
  importState.phase = phase
  importState.done = done
  importState.total = total
}

export function setImportProgress(done: number, total?: number): void {
  importState.done = done
  if (total !== undefined) importState.total = total
  // Every importer in this family reports through here, so one check covers
  // dictionaries, sentence banks and stroke sets alike. Rows already written
  // are kept — dictDb.sweepOrphans clears a half-import on the next startup,
  // and the `dict` registry row is written LAST, so a stopped import is never
  // mistaken for a complete one.
  if (activeImport?.cancelRequested()) {
    throw new tasks.TaskCancelledError(importState.dictTitle ?? 'Dictionary import')
  }
}

// The task behind the current runImport, so the progress setter above can see
// a cancel without every call site threading a handle.
let activeImport: tasks.TaskHandle | null = null
let activeImportSignal: AbortSignal | null = null

// ---- zip reader seam (importFromReader is pure of yauzl for testing) ----

export interface YomitanIndex {
  title: string
  revision?: string
  format?: number
  sequenced?: boolean
}

export interface BankReader {
  readIndex(): Promise<YomitanIndex>
  bankNames(): string[]
  readBank(name: string): Promise<unknown[]>
  // Raw bytes of an entry — the sentence bank ships TSV, not JSON.
  readRaw(name: string): Promise<Buffer>
}

interface OpenZip {
  zipfile: yauzl.ZipFile
  entries: Map<string, yauzl.Entry>
}

function openZipOnce(absPath: string): Promise<OpenZip> {
  return new Promise((resolve, reject) => {
    yauzl.open(absPath, { lazyEntries: true, autoClose: false }, (err, zipfile) => {
      if (err || !zipfile) return reject(err ?? new Error('yauzl returned no zipfile'))
      const entries = new Map<string, yauzl.Entry>()
      zipfile.on('entry', (entry: yauzl.Entry) => {
        if (!entry.fileName.endsWith('/')) entries.set(entry.fileName, entry)
        zipfile.readEntry()
      })
      zipfile.on('end', () => resolve({ zipfile, entries }))
      zipfile.on('error', reject)
      zipfile.readEntry()
    })
  })
}

// One-shot reader over a Yomitan zip (own fd, no LRU cache — unlike archive.ts
// this is read once end-to-end then closed).
export async function openZipReader(zipPath: string): Promise<BankReader & { close(): void }> {
  const { zipfile, entries } = await openZipOnce(zipPath)
  const readEntry = (name: string): Promise<Buffer> =>
    new Promise((resolve, reject) => {
      const entry = entries.get(name)
      if (!entry) return reject(new Error(`Missing zip entry: ${name}`))
      if (entry.uncompressedSize > MAX_DICTIONARY_ENTRY_BYTES) {
        return reject(new Error(`Dictionary entry ${name} exceeds the 256 MB limit`))
      }
      zipfile.openReadStream(entry, (err, stream) => {
        if (err || !stream) return reject(err ?? new Error('no read stream'))
        const chunks: Buffer[] = []
        let total = 0
        stream.on('data', (c: Buffer) => {
          total += c.length
          if (total > MAX_DICTIONARY_ENTRY_BYTES) {
            stream.destroy(new Error(`Dictionary entry ${name} exceeds the 256 MB limit`))
            return
          }
          chunks.push(c)
        })
        stream.on('end', () => resolve(Buffer.concat(chunks, total)))
        stream.on('error', reject)
      })
    })
  return {
    async readIndex() {
      const buf = await readEntry('index.json')
      return JSON.parse(buf.toString('utf8'))
    },
    bankNames() {
      return [...entries.keys()]
    },
    async readBank(name) {
      const buf = await readEntry(name)
      return JSON.parse(buf.toString('utf8'))
    },
    readRaw(name) {
      return readEntry(name)
    },
    close() {
      zipfile.close()
    }
  }
}

// ---- row normalization (format 1 and 3 collapse to one shape) ----

/* eslint-disable @typescript-eslint/no-explicit-any */

interface TermRow {
  expression: string
  reading: string
  defTags: string
  rules: string
  score: number
  glossary: GlossaryItem[]
  sequence: number | null
  termTags: string
}

function mapTermRow(row: any): TermRow | null {
  if (!Array.isArray(row) || typeof row[0] !== 'string') return null
  // format 3: [expr, reading, defTags, rules, score, glossary[], sequence, termTags]
  // format 1 (legacy): glossary strings spread from index 5.
  const glossary: GlossaryItem[] = Array.isArray(row[5]) ? row[5] : row.slice(5).filter((x: any) => x != null)
  return {
    expression: row[0],
    reading: typeof row[1] === 'string' ? row[1] : '',
    defTags: typeof row[2] === 'string' ? row[2] : '',
    rules: typeof row[3] === 'string' ? row[3] : '',
    score: typeof row[4] === 'number' ? row[4] : 0,
    glossary,
    sequence: typeof row[6] === 'number' ? row[6] : null,
    termTags: typeof row[7] === 'string' ? row[7] : ''
  }
}

interface KanjiRow {
  character: string
  onyomi: string
  kunyomi: string
  tags: string
  meanings: string
  stats: string
}

function mapKanjiRow(row: any): KanjiRow | null {
  if (!Array.isArray(row) || typeof row[0] !== 'string') return null
  return {
    character: row[0],
    onyomi: typeof row[1] === 'string' ? row[1] : '',
    kunyomi: typeof row[2] === 'string' ? row[2] : '',
    tags: typeof row[3] === 'string' ? row[3] : '',
    meanings: JSON.stringify(Array.isArray(row[4]) ? row[4] : []),
    stats: JSON.stringify(row[5] && typeof row[5] === 'object' ? row[5] : {})
  }
}

interface PitchRow {
  expression: string
  reading: string
  pitches: string
}

// term_meta row: [expression, mode, data]. Only mode='pitch' is kept.
function mapPitchRow(row: any): PitchRow | null {
  if (!Array.isArray(row) || row[1] !== 'pitch') return null
  const data = row[2]
  const pitches = data?.pitches
  if (!Array.isArray(pitches) || pitches.length === 0) return null
  return {
    expression: row[0],
    reading: typeof data?.reading === 'string' ? data.reading : '',
    pitches: JSON.stringify(pitches)
  }
}

interface FreqRow {
  expression: string
  reading: string
  rank: number
  display: string | null
}

// term_meta row: [expression, 'freq', data]. `data` comes in four shapes across
// the freq dictionaries in the wild:
//   12345                                    bare number
//   "12345"                                  numeric string
//   { value, displayValue? }                 ranked value with a display form
//   { reading, frequency: number | {value, displayValue?} }   reading-specific
function mapFreqRow(row: any): FreqRow | null {
  if (!Array.isArray(row) || row[1] !== 'freq' || typeof row[0] !== 'string') return null
  let data = row[2]
  let reading = ''
  if (data && typeof data === 'object' && !Array.isArray(data) && 'frequency' in data) {
    if (typeof data.reading === 'string') reading = data.reading
    data = data.frequency
  }
  let rank: number | null = null
  let display: string | null = null
  if (typeof data === 'number') {
    rank = data
  } else if (typeof data === 'string') {
    const n = Number(data)
    if (Number.isFinite(n)) rank = n
    else return null
  } else if (data && typeof data === 'object' && !Array.isArray(data)) {
    const value = (data as any).value
    if (typeof value === 'number') rank = value
    else if (typeof value === 'string' && Number.isFinite(Number(value))) rank = Number(value)
    const dv = (data as any).displayValue
    if (typeof dv === 'string') display = dv
  }
  if (rank === null || !Number.isFinite(rank)) return null
  return { expression: row[0], reading, rank: Math.round(rank), display }
}

interface TagRow {
  name: string
  category: string
  ord: number
  notes: string
  score: number
}

function mapTagRow(row: any): TagRow | null {
  if (!Array.isArray(row) || typeof row[0] !== 'string') return null
  return {
    name: row[0],
    category: typeof row[1] === 'string' ? row[1] : '',
    ord: typeof row[2] === 'number' ? row[2] : 0,
    notes: typeof row[3] === 'string' ? row[3] : '',
    score: typeof row[4] === 'number' ? row[4] : 0
  }
}

// ---- deletion (chunked, yielding — used for re-import swap and remove) ----

async function deleteDictRows(db: Database.Database, dictId: number): Promise<void> {
  // tag (WITHOUT ROWID) and gloss_fts (virtual) don't take a LIMIT subquery;
  // they delete in one statement — rare op, acceptable.
  db.prepare('DELETE FROM gloss_fts WHERE dict_id = ?').run(dictId)
  await yieldToLoop()
  db.prepare('DELETE FROM tag WHERE dict_id = ?').run(dictId)
  await yieldToLoop()
  for (const table of ['term', 'kanji', 'pitch', 'freq']) {
    const del = db.prepare(
      `DELETE FROM ${table} WHERE id IN (SELECT id FROM ${table} WHERE dict_id = ? LIMIT ${DELETE_CHUNK})`
    )
    let changes = 0
    do {
      changes = del.run(dictId).changes
      await yieldToLoop()
    } while (changes > 0)
  }
}

// ---- core import (pure of zip/network IO — the unit-test entry point) ----

export interface ImportOpts {
  // false skips the gloss_fts rows (JMnedict — see PRESET_OPTS).
  glossFts?: boolean
  // Priority for a FRESH install; an existing same-title dict's priority
  // always wins on re-import.
  defaultPriority?: number
}

export async function importFromReader(
  reader: BankReader,
  opts: ImportOpts = {}
): Promise<DictImportSummary> {
  const db = getDictDb()
  const index = await reader.readIndex()
  const title = (index?.title ?? '').trim()
  if (!title) throw new Error('Dictionary zip has no title in index.json')
  importState.dictTitle = title

  // Stage under a fresh id; the dict registry row is written only at finalize.
  const newId = (db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM dict').get() as { n: number }).n
  const banks = reader.bankNames()
  const termBanks = banks.filter((n) => /(^|\/)term_bank_\d+\.json$/.test(n))
  const kanjiBanks = banks.filter((n) => /(^|\/)kanji_bank_\d+\.json$/.test(n))
  const metaBanks = banks.filter((n) => /(^|\/)term_meta_bank_\d+\.json$/.test(n))
  const tagBanks = banks.filter((n) => /(^|\/)tag_bank_\d+\.json$/.test(n))

  const insTerm = db.prepare(
    `INSERT INTO term (dict_id, expression, reading, def_tags, rules, score, glossary, sequence, term_tags)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
  const insFts = db.prepare('INSERT INTO gloss_fts (gloss, term_id, dict_id) VALUES (?, ?, ?)')
  const insTermChunk = db.transaction((rows: TermRow[]) => {
    for (const r of rows) {
      const info = insTerm.run(
        newId,
        r.expression,
        r.reading,
        r.defTags,
        r.rules,
        r.score,
        JSON.stringify(r.glossary),
        r.sequence,
        r.termTags
      )
      if (opts.glossFts !== false) {
        const gloss = flattenGlossary(r.glossary)
        if (gloss) insFts.run(gloss, info.lastInsertRowid as number, newId)
      }
    }
  })

  const insKanji = db.prepare(
    `INSERT INTO kanji (dict_id, character, onyomi, kunyomi, tags, meanings, stats)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
  const insKanjiChunk = db.transaction((rows: KanjiRow[]) => {
    for (const r of rows) insKanji.run(newId, r.character, r.onyomi, r.kunyomi, r.tags, r.meanings, r.stats)
  })

  const insPitch = db.prepare('INSERT INTO pitch (dict_id, expression, reading, pitches) VALUES (?, ?, ?, ?)')
  const insPitchChunk = db.transaction((rows: PitchRow[]) => {
    for (const r of rows) insPitch.run(newId, r.expression, r.reading, r.pitches)
  })

  const insFreq = db.prepare(
    'INSERT INTO freq (dict_id, expression, reading, rank, display) VALUES (?, ?, ?, ?, ?)'
  )
  const insFreqChunk = db.transaction((rows: FreqRow[]) => {
    for (const r of rows) insFreq.run(newId, r.expression, r.reading, r.rank, r.display)
  })

  const insTag = db.prepare(
    'INSERT OR REPLACE INTO tag (dict_id, name, category, ord, notes, score) VALUES (?, ?, ?, ?, ?, ?)'
  )
  const insTagChunk = db.transaction((rows: TagRow[]) => {
    for (const r of rows) insTag.run(newId, r.name, r.category, r.ord, r.notes, r.score)
  })

  let termCount = 0
  let kanjiCount = 0
  let pitchCount = 0
  let freqCount = 0

  try {
    importState.phase = 'terms'
    importState.done = 0
    importState.total = 0
    for (const name of termBanks) {
      const rows = (await reader.readBank(name)).map(mapTermRow).filter((r): r is TermRow => r !== null)
      for (let i = 0; i < rows.length; i += CHUNK) {
        const slice = rows.slice(i, i + CHUNK)
        insTermChunk(slice)
        termCount += slice.length
        importState.done = termCount
        await yieldToLoop()
      }
    }

    importState.phase = 'kanji'
    importState.done = 0
    for (const name of kanjiBanks) {
      const rows = (await reader.readBank(name)).map(mapKanjiRow).filter((r): r is KanjiRow => r !== null)
      for (let i = 0; i < rows.length; i += CHUNK) {
        const slice = rows.slice(i, i + CHUNK)
        insKanjiChunk(slice)
        kanjiCount += slice.length
        importState.done = kanjiCount
        await yieldToLoop()
      }
    }

    // term_meta banks carry both pitch and frequency rows; read each bank once
    // and split it (a freq dictionary is megabytes — re-reading to make two
    // passes would double the parse cost for no gain).
    importState.phase = 'pitch'
    importState.done = 0
    importState.total = 0
    // Rows discovered so far, per kind — the banks are read one at a time, so
    // the grand total isn't known until the end; a growing denominator still
    // beats one borrowed from another phase.
    let pitchTotal = 0
    let freqTotal = 0
    for (const name of metaBanks) {
      const raw = await reader.readBank(name)
      const pitchRows = raw.map(mapPitchRow).filter((r): r is PitchRow => r !== null)
      const freqRows = raw.map(mapFreqRow).filter((r): r is FreqRow => r !== null)
      pitchTotal += pitchRows.length
      freqTotal += freqRows.length
      // Each kind owns the progress pair while it runs, so the bar never shows
      // one counter against the other's total (or against the terms phase's).
      if (pitchRows.length > 0) {
        importState.phase = 'pitch'
        importState.total = pitchTotal
      }
      for (let i = 0; i < pitchRows.length; i += CHUNK) {
        const slice = pitchRows.slice(i, i + CHUNK)
        insPitchChunk(slice)
        pitchCount += slice.length
        importState.done = pitchCount
        await yieldToLoop()
      }
      if (freqRows.length > 0) {
        importState.phase = 'frequency'
        importState.total = freqTotal
      }
      for (let i = 0; i < freqRows.length; i += CHUNK) {
        const slice = freqRows.slice(i, i + CHUNK)
        insFreqChunk(slice)
        freqCount += slice.length
        importState.done = freqCount
        await yieldToLoop()
      }
    }

    importState.phase = 'tags'
    importState.done = 0
    for (const name of tagBanks) {
      const rows = (await reader.readBank(name)).map(mapTagRow).filter((r): r is TagRow => r !== null)
      insTagChunk(rows)
      importState.done += rows.length
      await yieldToLoop()
    }
  } catch (err) {
    // Roll back everything staged under newId; any existing same-title dict is
    // untouched (its rows live under a different id).
    await deleteDictRows(db, newId)
    throw err
  }

  // Finalize: swap out the old same-title dictionary (inheriting its priority),
  // then write the registry row that makes the staged rows "live".
  importState.phase = 'finalizing'
  const old = db.prepare('SELECT id, priority FROM dict WHERE title = ?').get(title) as
    | { id: number; priority: number }
    | undefined
  const priority = old?.priority ?? opts.defaultPriority ?? 0
  if (old) {
    await deleteDictRows(db, old.id)
    db.prepare('DELETE FROM dict WHERE id = ?').run(old.id)
  }
  db.prepare(
    `INSERT INTO dict (id, title, revision, format, priority, term_count, kanji_count)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(newId, title, index.revision ?? null, index.format ?? null, priority, termCount, kanjiCount)
  try {
    db.pragma('optimize')
  } catch {
    // optimize is advisory
  }

  return { title, termCount, kanjiCount, pitchCount, freqCount }
}

// ---- registry queries ----

export function listDictionaries(): DictInfo[] {
  // freq_count / pitch_count are computed rather than stored: a frequency or
  // pitch dictionary (Kanjium) has no terms or kanji of its own, so without
  // these its row would read "0 terms".
  const rows = getDictDb()
    .prepare(
      `SELECT d.id, d.title, d.revision, d.format, d.priority, d.term_count, d.kanji_count,
              d.imported_at, (SELECT COUNT(*) FROM freq f WHERE f.dict_id = d.id) AS freq_count,
              (SELECT COUNT(*) FROM pitch p WHERE p.dict_id = d.id) AS pitch_count
       FROM dict d ORDER BY d.priority DESC, d.title ASC`
    )
    .all() as any[]
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    revision: r.revision ?? null,
    format: r.format ?? null,
    priority: r.priority,
    termCount: r.term_count,
    kanjiCount: r.kanji_count,
    freqCount: r.freq_count,
    pitchCount: r.pitch_count,
    importedAt: r.imported_at
  }))
}

export async function removeDictionary(id: number): Promise<void> {
  const db = getDictDb()
  await deleteDictRows(db, id)
  db.prepare('DELETE FROM dict WHERE id = ?').run(id)
}

// ---- top-level entry points (guarded, with download for presets) ----

// The single import gate: one import at a time across dictionaries, sentence
// banks and stroke sets, all reporting through the same polled status object.
export async function runImport<T>(fn: () => Promise<T>): Promise<T> {
  if (importState.running) throw new Error('A dictionary import is already running')
  importState.running = true
  importState.error = null
  importState.dictTitle = null
  importState.phase = 'reading'
  importState.done = 0
  importState.total = 0
  const controller = new AbortController()
  // One task for the whole gate, so dictionaries, sentence banks and stroke
  // sets all appear without each entry point needing its own wiring.
  return tasks.runTask(
    {
      kind: 'dictImport',
      label: 'Dictionary import',
      route: '/settings',
      controls: {
        cancel: () => controller.abort(),
        pauseNote: 'Dictionary imports cannot be paused'
      },
      project: () => ({
        detail: importState.dictTitle ?? importState.phase,
        done: importState.done,
        total: importState.total
      })
    },
    async (handle) => {
      activeImport = handle
      activeImportSignal = controller.signal
      try {
        return await fn()
      } catch (err) {
        importState.error = err instanceof Error ? err.message : String(err)
        if (handle.cancelRequested()) {
          throw new tasks.TaskCancelledError(importState.dictTitle ?? 'Dictionary import')
        }
        throw err
      } finally {
        activeImport = null
        activeImportSignal = null
        importState.running = false
        importState.phase = 'idle'
      }
    }
  )
}

// Streams a pack download to a temp file, reporting bytes through the shared
// status. `ext` covers the non-zip packs (KanjiVG ships a .xml.gz).
export async function downloadToTemp(url: string, ext = 'zip'): Promise<string> {
  const { app } = await import('electron')
  importState.phase = 'downloading'
  importState.done = 0
  importState.total = 0
  const res = await fetchWithRetry(url, {
    timeoutMs: 10 * 60_000,
    headers: { 'User-Agent': UA },
    taskSignal: activeImportSignal ?? undefined
  })
  if (!res.ok || !res.body) throw new Error(`Download failed (HTTP ${res.status})`)
  importState.total = Number(res.headers.get('content-length')) || 0
  downloadCounter += 1
  const tmp = join(
    app.getPath('temp'),
    `navihub-dict-${process.pid}-${Date.now()}-${downloadCounter}.${ext}`
  )
  await streamResponseToFile(res, tmp, {
    label: 'Dictionary archive',
    maxInputBytes: MAX_DICTIONARY_ARCHIVE_BYTES,
    signal: activeImportSignal ?? undefined,
    onProgress: (done, total) => {
      importState.done = done
      importState.total = total
      if (activeImport?.cancelRequested()) {
        throw new tasks.TaskCancelledError(importState.dictTitle ?? 'Dictionary import')
      }
    }
  })
  return tmp
}

export function importPreset(key: PresetKey): Promise<DictImportSummary> {
  const url = PRESETS[key]
  if (!url) throw new Error(`Unknown dictionary preset: ${key}`)
  return runImport(async () => {
    const tmp = await downloadToTemp(url)
    try {
      const reader = await openZipReader(tmp)
      try {
        return await importFromReader(reader, PRESET_OPTS[key])
      } finally {
        reader.close()
      }
    } finally {
      await unlink(tmp).catch(() => {})
    }
  })
}

export function importZipFile(zipPath: string): Promise<DictImportSummary> {
  return runImport(async () => {
    const reader = await openZipReader(zipPath)
    try {
      return await importFromReader(reader)
    } finally {
      reader.close()
    }
  })
}

// Opens a native file picker for a Yomitan .zip and imports it. Returns null
// when the dialog is cancelled.
export async function importZipViaDialog(): Promise<DictImportSummary | null> {
  const { dialog } = await import('electron')
  const res = await dialog.showOpenDialog({
    title: 'Import a Yomitan dictionary (.zip)',
    properties: ['openFile'],
    filters: [{ name: 'Yomitan dictionary', extensions: ['zip'] }]
  })
  if (res.canceled || res.filePaths.length === 0) return null
  return importZipFile(res.filePaths[0])
}
