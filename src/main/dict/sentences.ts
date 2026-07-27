import { readFile, unlink } from 'fs/promises'
import { setImmediate as yieldToLoop } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getDictDb } from './dictDb'
import { downloadToTemp, openZipReader, runImport, setImportPhase, setImportProgress } from './importer'
import { tokenize } from '../tokenizer'
import type { SentenceBankInfo, SentenceExample, SentenceImportSummary } from '@shared/types'

// Offline example-sentence bank: ~110k Tatoeba JP/EN pairs, used to fill
// mined cards' examples, show usage on the dictionary page, and widen the
// cloze quiz pool. Not a Yomitan format — a plain TSV inside a zip — so it has
// its own import path, but it shares the importer's one-at-a-time gate and
// polled status.
//
// Sentences are indexed by their kuromoji BASE forms (see init.sql): the whole
// point is that looking up 食べる finds a 食べた sentence, which no substring
// or raw-text FTS index can do for unsegmented Japanese. Tokenizing 110k
// sentences costs a minute once, at import, instead of every query.

const SOURCE = 'tatoeba'
const CHUNK = 500
const DELETE_CHUNK = 2000

// Tatoeba pairs republished as one small zip of tab-separated lines. The
// Tatoeba-native per-language exports are bz2 (no built-in Node decoder) and
// need a three-file id join, so this is the offline-friendliest source.
const SENTENCES_URL = 'https://www.manythings.org/anki/jpn-eng.zip'

// ---- pure parsing (exported for tests) ----

// Lines are `english \t japanese \t attribution`, with older/edited files
// sometimes carrying only the first two columns. Malformed lines are skipped
// rather than failing the import — this is a 110k-line community corpus.
export function parseSentenceLines(text: string): { jp: string; en: string; attribution: string | null }[] {
  const out: { jp: string; en: string; attribution: string | null }[] = []
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue
    const cols = line.split('\t')
    if (cols.length < 2) continue
    const en = cols[0].trim()
    const jp = cols[1].trim()
    if (!en || !jp) continue
    const attribution = cols.length > 2 && cols[2].trim() ? cols[2].trim() : null
    out.push({ jp, en, attribution })
  }
  return out
}

// The FTS payload for one sentence: base forms first, then any surface that
// differs, so both dictionary-form and literal inflected queries hit.
export async function sentenceKeywords(jp: string): Promise<string> {
  const words = new Set<string>()
  try {
    for (const tok of await tokenize(jp)) {
      if (!tok.wordLike) continue
      if (tok.base) words.add(tok.base)
      if (tok.surface) words.add(tok.surface)
    }
  } catch {
    // Tokenizer unavailable: fall back to no keywords rather than failing the
    // whole import (the LIKE path in querySentences still finds the sentence).
    return ''
  }
  return [...words].join(' ')
}

// ---- import ----

async function deleteBankRows(db: Database.Database, bankId: number): Promise<void> {
  db.prepare('DELETE FROM sentence_fts WHERE bank_id = ?').run(bankId)
  await yieldToLoop()
  const del = db.prepare(
    `DELETE FROM sentence WHERE id IN (SELECT id FROM sentence WHERE bank_id = ? LIMIT ${DELETE_CHUNK})`
  )
  let changes = 0
  do {
    changes = del.run(bankId).changes
    await yieldToLoop()
  } while (changes > 0)
}

// Core import, pure of network/zip IO — the unit-test entry point.
export async function importSentenceText(text: string): Promise<SentenceImportSummary> {
  const db = getDictDb()
  const rows = parseSentenceLines(text)
  if (rows.length === 0) throw new Error('No sentence pairs found in the downloaded file')

  // Stage under a fresh id; the registry row lands last (dict-table idiom).
  const newId = (db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM sentence_bank').get() as { n: number })
    .n

  const insSentence = db.prepare('INSERT INTO sentence (bank_id, jp, en, attribution) VALUES (?, ?, ?, ?)')
  const insFts = db.prepare('INSERT INTO sentence_fts (keywords, sentence_id, bank_id) VALUES (?, ?, ?)')
  const insChunk = db.transaction((slice: { jp: string; en: string; attribution: string | null; kw: string }[]) => {
    for (const r of slice) {
      const info = insSentence.run(newId, r.jp, r.en, r.attribution)
      if (r.kw) insFts.run(r.kw, info.lastInsertRowid as number, newId)
    }
  })

  let written = 0
  try {
    setImportPhase('sentences', 0, rows.length)
    for (let i = 0; i < rows.length; i += CHUNK) {
      const slice = rows.slice(i, i + CHUNK)
      // Tokenizing is the expensive half; do it outside the transaction.
      const withKeywords = [] as { jp: string; en: string; attribution: string | null; kw: string }[]
      for (const r of slice) withKeywords.push({ ...r, kw: await sentenceKeywords(r.jp) })
      insChunk(withKeywords)
      written += slice.length
      setImportProgress(written)
      await yieldToLoop()
    }
  } catch (err) {
    await deleteBankRows(db, newId)
    throw err
  }

  setImportPhase('finalizing')
  const old = db.prepare('SELECT id FROM sentence_bank WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (old) {
    await deleteBankRows(db, old.id)
    db.prepare('DELETE FROM sentence_bank WHERE id = ?').run(old.id)
  }
  db.prepare('INSERT INTO sentence_bank (id, source, sentence_count) VALUES (?, ?, ?)').run(
    newId,
    SOURCE,
    written
  )
  return { sentenceCount: written }
}

export function importSentences(): Promise<SentenceImportSummary> {
  return runImport(async () => {
    const tmp = await downloadToTemp(SENTENCES_URL)
    try {
      setImportPhase('reading')
      const reader = await openZipReader(tmp)
      try {
        const name = reader.bankNames().find((n) => n.endsWith('.txt') || n.endsWith('.tsv'))
        if (!name) throw new Error('No sentence file found inside the download')
        // readBank JSON-parses; sentences are plain text, so read the entry raw.
        const raw = await reader.readRaw(name)
        return await importSentenceText(raw.toString('utf8'))
      } finally {
        reader.close()
      }
    } finally {
      await unlink(tmp).catch(() => {})
    }
  })
}

// Imports a plain .tsv/.txt of pairs the user already has (escape hatch for
// when the hosted file moves).
export function importSentenceFile(path: string): Promise<SentenceImportSummary> {
  return runImport(async () => {
    setImportPhase('reading')
    const text = await readFile(path, 'utf8')
    return importSentenceText(text)
  })
}

// ---- queries ----

// Example sentences containing `term`. Exact-surface matches come first, then
// shortest — short sentences make the best cards and cloze prompts. Never
// throws (a malformed FTS query must not break a lookup).
export function querySentences(term: string, limit = 5): SentenceExample[] {
  const q = term.trim().replace(/"/g, '')
  if (!q) return []
  const db = getDictDb()
  try {
    const rows = db
      .prepare(
        `SELECT s.jp, s.en, s.attribution FROM sentence_fts f
         JOIN sentence s ON s.id = f.sentence_id
         WHERE f.keywords MATCH ?
         ORDER BY (instr(s.jp, ?) > 0) DESC, length(s.jp) ASC
         LIMIT ?`
      )
      .all(`"${q}"`, q, limit) as { jp: string; en: string; attribution: string | null }[]
    if (rows.length > 0) return rows.map((r) => ({ jp: r.jp, en: r.en, attribution: r.attribution ?? null }))
    // Rare fallback: a sentence whose tokenization missed the term still
    // contains it literally.
    const like = db
      .prepare(
        `SELECT jp, en, attribution FROM sentence WHERE jp LIKE ? ORDER BY length(jp) ASC LIMIT ?`
      )
      .all(`%${q}%`, limit) as { jp: string; en: string; attribution: string | null }[]
    return like.map((r) => ({ jp: r.jp, en: r.en, attribution: r.attribution ?? null }))
  } catch {
    return []
  }
}

export function getSentenceBankInfo(): SentenceBankInfo | null {
  try {
    const row = getDictDb()
      .prepare('SELECT sentence_count, imported_at FROM sentence_bank WHERE source = ?')
      .get(SOURCE) as { sentence_count: number; imported_at: string } | undefined
    return row ? { sentenceCount: row.sentence_count, importedAt: row.imported_at } : null
  } catch {
    return null
  }
}

export async function removeSentenceBank(): Promise<void> {
  const db = getDictDb()
  const row = db.prepare('SELECT id FROM sentence_bank WHERE source = ?').get(SOURCE) as
    | { id: number }
    | undefined
  if (!row) return
  await deleteBankRows(db, row.id)
  db.prepare('DELETE FROM sentence_bank WHERE id = ?').run(row.id)
}
