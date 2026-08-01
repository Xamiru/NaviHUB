import { readFile, unlink } from 'fs/promises'
import { setImmediate as yieldToLoop } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getDictDb } from './dictDb'
import { downloadToTemp, runImport, setImportPhase, setImportProgress } from './importer'
import type { KanjiumImportSummary, PitchWordEntry } from '@shared/types'

// Kanjium pitch-accent data (mifunetoshiro/kanjium, CC BY-SA 4.0): 124k
// term/reading/downstep rows imported INTO THE EXISTING `pitch` table under a
// `dict` registry row. That's the whole trick — lookup.ts's loadPitches
// queries pitch with no dict filter, so the dictionary page's PitchAccent
// rendering lights up with zero lookup changes.
//
// Not a Yomitan format: a plain UTF-8 TSV, one download, no zip.

export const KANJIUM_TITLE = 'Kanjium Pitch Accents'
const CHUNK = 1000
const DELETE_CHUNK = 2000

// Pinned at a commit sha — the repo is alive and raw/master would move.
const KANJIUM_SHA = '8a0cdaa16d64a281a2048de2eee2ec5e3a440fa6'
const ACCENTS_URL = `https://raw.githubusercontent.com/mifunetoshiro/kanjium/${KANJIUM_SHA}/data/source_files/raw/accents.txt`

// ---- pure parsing (exported for tests) ----

export interface AccentRow {
  expression: string
  reading: string // '' when empty or same as the expression (pitch-table convention)
  positions: number[]
}

// Lines are `term \t reading \t accents`. The accent column is comma-separated
// downstep positions, some annotated with a part of speech — `0,2`, `(副)1`,
// `(名)2,(代)2,0` all appear in the real file — so each segment is reduced to
// its digits defensively. Lines yielding no positions are skipped.
export function parseAccentLines(text: string): AccentRow[] {
  const out: AccentRow[] = []
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue
    const cols = line.split('\t')
    if (cols.length < 3) continue
    const expression = cols[0].trim()
    const rawReading = cols[1].trim()
    if (!expression) continue
    const positions: number[] = []
    for (const seg of cols[2].split(',')) {
      const m = seg.match(/(\d+)/)
      if (!m) continue
      const n = Number(m[1])
      if (!positions.includes(n)) positions.push(n)
    }
    if (positions.length === 0) continue
    out.push({
      expression,
      reading: rawReading === expression ? '' : rawReading,
      positions
    })
  }
  return out
}

// ---- import ----

async function deletePitchRows(db: Database.Database, dictId: number): Promise<void> {
  const del = db.prepare(
    `DELETE FROM pitch WHERE id IN (SELECT id FROM pitch WHERE dict_id = ? LIMIT ${DELETE_CHUNK})`
  )
  let changes = 0
  do {
    changes = del.run(dictId).changes
    await yieldToLoop()
  } while (changes > 0)
}

// Core import, pure of network IO — the unit-test entry point.
export async function importKanjiumText(text: string): Promise<KanjiumImportSummary> {
  const db = getDictDb()
  const rows = parseAccentLines(text)
  if (rows.length === 0) throw new Error('No pitch-accent rows found in the downloaded file')

  // Stage under a fresh id; the registry row lands last (dict-table idiom).
  const newId = (db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM dict').get() as { n: number }).n

  const ins = db.prepare('INSERT INTO pitch (dict_id, expression, reading, pitches) VALUES (?, ?, ?, ?)')
  const insChunk = db.transaction((slice: AccentRow[]) => {
    for (const r of slice) {
      ins.run(newId, r.expression, r.reading, JSON.stringify(r.positions.map((p) => ({ position: p }))))
    }
  })

  let written = 0
  try {
    setImportPhase('pitch', 0, rows.length)
    for (let i = 0; i < rows.length; i += CHUNK) {
      const slice = rows.slice(i, i + CHUNK)
      insChunk(slice)
      written += slice.length
      setImportProgress(written)
      await yieldToLoop()
    }
  } catch (err) {
    await deletePitchRows(db, newId)
    throw err
  }

  setImportPhase('finalizing')
  const old = db.prepare('SELECT id, priority FROM dict WHERE title = ?').get(KANJIUM_TITLE) as
    | { id: number; priority: number }
    | undefined
  if (old) {
    await deletePitchRows(db, old.id)
    db.prepare('DELETE FROM dict WHERE id = ?').run(old.id)
  }
  db.prepare(
    `INSERT INTO dict (id, title, revision, format, priority, term_count, kanji_count)
     VALUES (?, ?, ?, NULL, ?, 0, 0)`
  ).run(newId, KANJIUM_TITLE, KANJIUM_SHA.slice(0, 7), old?.priority ?? 0)
  return { pitchCount: written }
}

export function importKanjium(): Promise<KanjiumImportSummary> {
  return runImport(async () => {
    const tmp = await downloadToTemp(ACCENTS_URL, 'txt')
    try {
      setImportPhase('reading')
      const text = await readFile(tmp, 'utf8')
      return await importKanjiumText(text)
    } finally {
      await unlink(tmp).catch(() => {})
    }
  })
}

// ---- queries ----

// Bulk pitch fetch for the quiz pool: all attested positions per
// (expression, reading), across every installed pitch source, deduped. Never
// throws; [] when nothing is installed.
export function pitchForWords(words: string[]): PitchWordEntry[] {
  const unique = [...new Set(words.filter((w) => w && w.trim()))]
  if (unique.length === 0) return []
  const db = getDictDb()
  const byKey = new Map<string, PitchWordEntry>()
  try {
    for (let i = 0; i < unique.length; i += 500) {
      const slice = unique.slice(i, i + 500)
      const placeholders = slice.map(() => '?').join(',')
      const rows = db
        .prepare(`SELECT expression, reading, pitches FROM pitch WHERE expression IN (${placeholders})`)
        .all(...slice) as { expression: string; reading: string; pitches: string }[]
      for (const row of rows) {
        const key = `${row.expression}|${row.reading}`
        let entry = byKey.get(key)
        if (!entry) {
          entry = { expression: row.expression, reading: row.reading, positions: [] }
          byKey.set(key, entry)
        }
        try {
          for (const p of JSON.parse(row.pitches) as { position?: number }[]) {
            if (typeof p.position === 'number' && !entry.positions.includes(p.position)) {
              entry.positions.push(p.position)
            }
          }
        } catch {
          // one malformed pitches blob must not break the pool
        }
      }
    }
  } catch {
    return []
  }
  return [...byKey.values()].filter((e) => e.positions.length > 0)
}
