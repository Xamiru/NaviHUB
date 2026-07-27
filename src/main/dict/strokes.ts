import { readFile, unlink } from 'fs/promises'
import { gunzipSync } from 'zlib'
import { setImmediate as yieldToLoop } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getDictDb } from './dictDb'
import { downloadToTemp, runImport, setImportPhase, setImportProgress } from './importer'
import type { KanjiStrokes, StrokeImportSummary, StrokeSetInfo } from '@shared/types'

// KanjiVG stroke-order data: ordered SVG paths per character, powering the
// animated stroke diagrams and the writing drill. CC BY-SA 3.0, Ulrich Apel —
// credited in Settings.
//
// The release ships one gzipped XML of every kanji. Assets are date-named, so
// `releases/latest/download/…` is impossible and the URL is pinned; releases
// are roughly yearly and old assets never disappear.

const SOURCE = 'kanjivg'
const REVISION = 'r20250816'
const STROKES_URL =
  'https://github.com/KanjiVG/kanjivg/releases/download/r20250816/kanjivg-20250816.xml.gz'
const CHUNK = 1000

// ---- pure parsing (exported for tests) ----

// Hand-rolled tag scan, the epub.ts approach — no XML dependency for what is a
// completely regular machine-generated file. Variant entries (ids like
// kvg:kanji_04e00-Kaisho) are skipped: we want one canonical stroke order per
// character.
export function parseKanjiVgXml(xml: string): Map<string, string[]> {
  const out = new Map<string, string[]>()
  const kanjiRe = /<kanji\s+id="kvg:kanji_([0-9a-fA-F-]+)"\s*>([\s\S]*?)<\/kanji>/g
  let m: RegExpExecArray | null
  while ((m = kanjiRe.exec(xml)) !== null) {
    const id = m[1]
    if (id.includes('-')) continue // variant form (Kaisho, HzFst, …)
    const code = parseInt(id, 16)
    if (!Number.isFinite(code) || code <= 0) continue
    const char = String.fromCodePoint(code)
    const body = m[2]
    const paths: string[] = []
    const pathRe = /<path\b[^>]*\bd="([^"]+)"/g
    let p: RegExpExecArray | null
    while ((p = pathRe.exec(body)) !== null) paths.push(p[1])
    if (paths.length > 0) out.set(char, paths)
  }
  return out
}

// ---- import ----

async function deleteSetRows(db: Database.Database, setId: number): Promise<void> {
  db.prepare('DELETE FROM stroke WHERE set_id = ?').run(setId)
  await yieldToLoop()
}

// Core import, pure of network IO — the unit-test entry point.
export async function importStrokeXml(xml: string, revision = REVISION): Promise<StrokeImportSummary> {
  const db = getDictDb()
  const parsed = parseKanjiVgXml(xml)
  if (parsed.size === 0) throw new Error('No stroke data found in the downloaded file')

  const newId = (db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM stroke_set').get() as { n: number })
    .n
  const ins = db.prepare('INSERT INTO stroke (set_id, character, strokes) VALUES (?, ?, ?)')
  const insChunk = db.transaction((rows: [string, string[]][]) => {
    for (const [char, paths] of rows) ins.run(newId, char, JSON.stringify(paths))
  })

  const entries = [...parsed.entries()]
  let written = 0
  try {
    setImportPhase('strokes', 0, entries.length)
    for (let i = 0; i < entries.length; i += CHUNK) {
      const slice = entries.slice(i, i + CHUNK)
      insChunk(slice)
      written += slice.length
      setImportProgress(written)
      await yieldToLoop()
    }
  } catch (err) {
    await deleteSetRows(db, newId)
    throw err
  }

  setImportPhase('finalizing')
  const old = db.prepare('SELECT id FROM stroke_set WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (old) {
    await deleteSetRows(db, old.id)
    db.prepare('DELETE FROM stroke_set WHERE id = ?').run(old.id)
  }
  db.prepare('INSERT INTO stroke_set (id, source, revision, char_count) VALUES (?, ?, ?, ?)').run(
    newId,
    SOURCE,
    revision,
    written
  )
  return { charCount: written, revision }
}

export function importStrokes(): Promise<StrokeImportSummary> {
  return runImport(async () => {
    const tmp = await downloadToTemp(STROKES_URL, 'xml.gz')
    try {
      setImportPhase('reading')
      const gz = await readFile(tmp)
      const xml = gunzipSync(gz).toString('utf8')
      return await importStrokeXml(xml)
    } finally {
      await unlink(tmp).catch(() => {})
    }
  })
}

// ---- queries ----

// Ordered strokes for one character, or null when the pack isn't installed or
// the character isn't covered. Never throws — every consumer treats null as
// "just don't show the diagram".
export function getStrokes(char: string): KanjiStrokes | null {
  if (!char) return null
  try {
    const row = getDictDb()
      .prepare(
        `SELECT s.character, s.strokes FROM stroke s
         JOIN stroke_set ss ON ss.id = s.set_id
         WHERE s.character = ? ORDER BY ss.id DESC LIMIT 1`
      )
      .get([...char][0]) as { character: string; strokes: string } | undefined
    if (!row) return null
    const strokes = JSON.parse(row.strokes)
    if (!Array.isArray(strokes) || strokes.length === 0) return null
    return { character: row.character, strokes }
  } catch {
    return null
  }
}

export function getStrokeSetInfo(): StrokeSetInfo | null {
  try {
    const row = getDictDb()
      .prepare('SELECT revision, char_count, imported_at FROM stroke_set WHERE source = ?')
      .get(SOURCE) as { revision: string | null; char_count: number; imported_at: string } | undefined
    return row
      ? { revision: row.revision ?? null, charCount: row.char_count, importedAt: row.imported_at }
      : null
  } catch {
    return null
  }
}

export async function removeStrokeSet(): Promise<void> {
  const db = getDictDb()
  const row = db.prepare('SELECT id FROM stroke_set WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (!row) return
  await deleteSetRows(db, row.id)
  db.prepare('DELETE FROM stroke_set WHERE id = ?').run(row.id)
}
