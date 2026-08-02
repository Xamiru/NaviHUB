import { readFile, unlink } from 'fs/promises'
import { setImmediate as yieldToLoop } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getDictDb } from './dictDb'
import { downloadToTemp, runImport, setImportPhase, setImportProgress } from './importer'
import type { EnFreqInfo } from '@shared/types'

// English word-frequency pack (hermitdave/FrequencyWords en_50k, CC BY-SA:
// OpenSubtitles 2018 ranks). Not a dictionary — the vocab/spelling pools join
// it against en_lemma to tier "advanced" words, and subtitle-corpus ranks
// match what this app's user actually consumes. Kanjium recipe: plain text
// file, sha-pinned raw URL, staged rows, registry row (`en_freq_set`) LAST.

export const EN_FREQ_SOURCE = 'opensubtitles'
const CHUNK = 2000

// Pinned at a commit sha — the repo is alive and raw/master would move.
const FREQ_SHA = '525f9b560de45753a5ea01069454e72e9aa541c6'
const FREQ_URL = `https://raw.githubusercontent.com/hermitdave/FrequencyWords/${FREQ_SHA}/content/2018/en/en_50k.txt`

// ---- pure parsing (exported for tests) ----

// Lines are `word count` (space-separated, already frequency-ordered). Keep
// only plain lowercase word tokens — digits, punctuation runs and
// apostrophe-fragments ('s, 're) are corpus noise, not vocabulary. Rank is
// the 1-based position AFTER filtering, so dropped noise doesn't leave holes.
export function parseFreqLines(text: string): { word: string; rank: number }[] {
  const out: { word: string; rank: number }[] = []
  const seen = new Set<string>()
  for (const line of text.split(/\r?\n/)) {
    const word = line.split(' ')[0]?.trim().toLowerCase()
    if (!word || !/^[a-z][a-z'-]*$/.test(word)) continue
    if (word.endsWith("'")) continue
    if (seen.has(word)) continue
    seen.add(word)
    out.push({ word, rank: out.length + 1 })
  }
  return out
}

// ---- import ----

function deleteFreqRows(db: Database.Database, bankId: number): void {
  db.prepare('DELETE FROM en_freq WHERE bank_id = ?').run(bankId)
}

function mapInfo(r: Record<string, unknown>): EnFreqInfo {
  return {
    source: r.source as string,
    revision: (r.revision as string) ?? null,
    wordCount: r.word_count as number,
    importedAt: r.imported_at as string
  }
}

// Core import, pure of network IO — the unit-test entry point.
export async function importEnFreqText(text: string): Promise<EnFreqInfo> {
  const db = getDictDb()
  const rows = parseFreqLines(text)
  if (rows.length === 0) throw new Error('No frequency rows found in the downloaded file')

  // Stage under a fresh id; the registry row lands last (dict-table idiom).
  const newId = (
    db.prepare('SELECT COALESCE(MAX(id), 0) + 1 AS n FROM en_freq_set').get() as { n: number }
  ).n

  const ins = db.prepare('INSERT INTO en_freq (bank_id, word, rank) VALUES (?, ?, ?)')
  const insChunk = db.transaction((slice: { word: string; rank: number }[]) => {
    for (const r of slice) ins.run(newId, r.word, r.rank)
  })

  let written = 0
  try {
    setImportPhase('frequency', 0, rows.length)
    for (let i = 0; i < rows.length; i += CHUNK) {
      const slice = rows.slice(i, i + CHUNK)
      insChunk(slice)
      written += slice.length
      setImportProgress(written)
      await yieldToLoop()
    }
  } catch (err) {
    deleteFreqRows(db, newId)
    throw err
  }

  setImportPhase('finalizing')
  const old = db.prepare('SELECT id FROM en_freq_set WHERE source = ?').get(EN_FREQ_SOURCE) as
    | { id: number }
    | undefined
  if (old) {
    deleteFreqRows(db, old.id)
    db.prepare('DELETE FROM en_freq_set WHERE id = ?').run(old.id)
  }
  db.prepare(
    'INSERT INTO en_freq_set (id, source, revision, word_count) VALUES (?, ?, ?, ?)'
  ).run(newId, EN_FREQ_SOURCE, FREQ_SHA.slice(0, 7), written)
  const row = db
    .prepare('SELECT * FROM en_freq_set WHERE id = ?')
    .get(newId) as Record<string, unknown>
  return mapInfo(row)
}

export function importEnFreq(): Promise<EnFreqInfo> {
  return runImport(async () => {
    const tmp = await downloadToTemp(FREQ_URL, 'txt')
    try {
      setImportPhase('reading')
      const text = await readFile(tmp, 'utf8')
      return await importEnFreqText(text)
    } finally {
      await unlink(tmp).catch(() => {})
    }
  })
}

// ---- queries ----

export function getEnFreqInfo(): EnFreqInfo | null {
  try {
    const row = getDictDb()
      .prepare('SELECT * FROM en_freq_set WHERE source = ?')
      .get(EN_FREQ_SOURCE) as Record<string, unknown> | undefined
    return row ? mapInfo(row) : null
  } catch {
    return null
  }
}

export function hasEnFreq(): boolean {
  return getEnFreqInfo() !== null
}

export function removeEnFreq(): void {
  const db = getDictDb()
  const old = db.prepare('SELECT id FROM en_freq_set WHERE source = ?').get(EN_FREQ_SOURCE) as
    | { id: number }
    | undefined
  if (!old) return
  deleteFreqRows(db, old.id)
  db.prepare('DELETE FROM en_freq_set WHERE id = ?').run(old.id)
}
