import { createWriteStream } from 'fs'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { Readable, Transform } from 'stream'
import { pipeline } from 'stream/promises'
import { setImmediate as yieldToLoop } from 'timers/promises'
import yauzl from 'yauzl'
import type Database from 'better-sqlite3'
import { fetchWithRetry } from '../http'
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

// Freely-hosted presets. Other dictionaries (pitch accent, DOJG, 新和英) are
// imported from a user-picked zip via importZipFile.
const PRESETS: Record<string, string> = {
  'jmdict-en': 'https://github.com/yomidevs/jmdict-yomitan/releases/latest/download/JMdict_english.zip',
  'kanjidic-en': 'https://github.com/yomidevs/jmdict-yomitan/releases/latest/download/KANJIDIC_english.zip'
}
export type PresetKey = keyof typeof PRESETS

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
      zipfile.openReadStream(entry, (err, stream) => {
        if (err || !stream) return reject(err ?? new Error('no read stream'))
        const chunks: Buffer[] = []
        stream.on('data', (c: Buffer) => chunks.push(c))
        stream.on('end', () => resolve(Buffer.concat(chunks)))
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
  for (const table of ['term', 'kanji', 'pitch']) {
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

export async function importFromReader(reader: BankReader): Promise<DictImportSummary> {
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
      const gloss = flattenGlossary(r.glossary)
      if (gloss) insFts.run(gloss, info.lastInsertRowid as number, newId)
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

  const insTag = db.prepare(
    'INSERT OR REPLACE INTO tag (dict_id, name, category, ord, notes, score) VALUES (?, ?, ?, ?, ?, ?)'
  )
  const insTagChunk = db.transaction((rows: TagRow[]) => {
    for (const r of rows) insTag.run(newId, r.name, r.category, r.ord, r.notes, r.score)
  })

  let termCount = 0
  let kanjiCount = 0
  let pitchCount = 0

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

    importState.phase = 'pitch'
    importState.done = 0
    for (const name of metaBanks) {
      const rows = (await reader.readBank(name)).map(mapPitchRow).filter((r): r is PitchRow => r !== null)
      for (let i = 0; i < rows.length; i += CHUNK) {
        const slice = rows.slice(i, i + CHUNK)
        insPitchChunk(slice)
        pitchCount += slice.length
        importState.done = pitchCount
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
  const priority = old?.priority ?? 0
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

  return { title, termCount, kanjiCount, pitchCount }
}

// ---- registry queries ----

export function listDictionaries(): DictInfo[] {
  const rows = getDictDb()
    .prepare(
      `SELECT id, title, revision, format, priority, term_count, kanji_count, imported_at
       FROM dict ORDER BY priority DESC, title ASC`
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
    importedAt: r.imported_at
  }))
}

export async function removeDictionary(id: number): Promise<void> {
  const db = getDictDb()
  await deleteDictRows(db, id)
  db.prepare('DELETE FROM dict WHERE id = ?').run(id)
}

// ---- top-level entry points (guarded, with download for presets) ----

async function runImport(fn: () => Promise<DictImportSummary>): Promise<DictImportSummary> {
  if (importState.running) throw new Error('A dictionary import is already running')
  importState.running = true
  importState.error = null
  importState.dictTitle = null
  importState.phase = 'reading'
  importState.done = 0
  importState.total = 0
  try {
    return await fn()
  } catch (err) {
    importState.error = err instanceof Error ? err.message : String(err)
    throw err
  } finally {
    importState.running = false
    importState.phase = 'idle'
  }
}

async function downloadToTemp(url: string): Promise<string> {
  const { app } = await import('electron')
  importState.phase = 'downloading'
  importState.done = 0
  importState.total = 0
  const res = await fetchWithRetry(url, { timeoutMs: 10 * 60_000, headers: { 'User-Agent': UA } })
  if (!res.ok || !res.body) throw new Error(`Download failed (HTTP ${res.status})`)
  importState.total = Number(res.headers.get('content-length')) || 0
  const tmp = join(app.getPath('temp'), `navihub-dict-${Date.now()}.zip`)
  const counter = new Transform({
    transform(chunk, _enc, cb) {
      importState.done += chunk.length
      cb(null, chunk)
    }
  })
  await pipeline(Readable.fromWeb(res.body as any), counter, createWriteStream(tmp))
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
        return await importFromReader(reader)
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
