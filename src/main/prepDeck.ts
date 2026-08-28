import { setImmediate as yieldToLoop } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getSqlite } from './db/connection'
import { getDictDb } from './dict/dictDb'
import { countSeriesWords, isLearnableWord } from './seriesText'
import * as tasks from './tasks'
import { flattenGlossary } from '@shared/dictContent'
import * as japaneseRepo from './repos/japaneseRepo'
import * as coverageRepo from './repos/coverageRepo'
import type { PrepDeckStatus, PrepDeckSummary } from '@shared/types'

// "Series prep deck": tokenize everything readable in a series (mokuro OCR
// pages and/or EPUB spine text), frequency-rank the words, drop what the user
// already has in jp_card, gloss the rest from the offline dictionaries, and
// write a ready-to-learn vocab course. The unique thing the app can do that no
// textbook can: a deck for the exact book you're about to read.

const WORDS_PER_LESSON = 25

// ---- live status (musicDownload pattern, polled via japanese:prepDeckStatus) ----

const status: PrepDeckStatus = {
  running: false,
  phase: 'idle',
  done: 0,
  total: 0,
  error: null
}

export function getPrepDeckStatus(): PrepDeckStatus {
  return { ...status }
}

// ---- pure helpers (exported for tests) ----

// Frequency-ranked candidates: unknown words, Japanese-looking, not single
// kana, ordered by count desc then by first-seen order for stability.
export function rankCandidates(
  counts: Map<string, number>,
  known: Set<string>
): { word: string; count: number }[] {
  const out: { word: string; count: number }[] = []
  for (const [word, count] of counts) {
    if (known.has(word)) continue
    if (!isLearnableWord(word)) continue
    out.push({ word, count })
  }
  return out.sort((a, b) => b.count - a.count)
}

// Best offline-dictionary gloss for a word: exact expression match first, then
// reading match; highest score/priority row wins. Null when no dictionary has
// it (drop the word — OCR noise and names land here).
export function glossFor(
  dictDb: Database.Database,
  word: string
): { reading: string; gloss: string } | null {
  const rows = dictDb
    .prepare(
      `SELECT t.reading, t.glossary FROM term t JOIN dict d ON d.id = t.dict_id
       WHERE t.expression = ? ORDER BY t.score DESC, d.priority DESC LIMIT 1`
    )
    .all(word) as { reading: string; glossary: string }[]
  const row =
    rows[0] ??
    (dictDb
      .prepare(
        `SELECT t.reading, t.glossary FROM term t JOIN dict d ON d.id = t.dict_id
         WHERE t.reading = ? ORDER BY t.score DESC, d.priority DESC LIMIT 1`
      )
      .get(word) as { reading: string; glossary: string } | undefined)
  if (!row) return null
  let gloss = ''
  try {
    gloss = flattenGlossary(JSON.parse(row.glossary), 300)
  } catch {
    return null
  }
  if (!gloss) return null
  return { reading: row.reading, gloss }
}

// Re-orders series candidates by fusing their in-series rank with a global
// corpus rank (Borda-style: sum of positions). Rank fusion is scale-free, so
// JPDB's 1–900k ranks and a series' 1–500 counts need no normalizing constant.
// Words the frequency dictionary doesn't know sink to the end of the global
// half, and an empty map makes this the identity — no new failure mode when no
// frequency dictionary is installed.
export function fuseWithGlobalRank(
  candidates: { word: string; count: number }[],
  globalRank: Map<string, number>,
  weight = 0.5
): { word: string; count: number }[] {
  if (globalRank.size === 0) return candidates
  // Global positions, densely ranked among the candidates we actually have.
  const known = candidates
    .filter((c) => globalRank.has(c.word))
    .sort((a, b) => globalRank.get(a.word)! - globalRank.get(b.word)!)
  const globalIndex = new Map<string, number>()
  known.forEach((c, i) => globalIndex.set(c.word, i))
  const missing = candidates.length
  return candidates
    .map((c, seriesIndex) => ({
      c,
      seriesIndex,
      score: seriesIndex + weight * (globalIndex.get(c.word) ?? missing)
    }))
    .sort((a, b) => a.score - b.score || a.seriesIndex - b.seriesIndex)
    .map((x) => x.c)
}

// Global ranks for a batch of words, from the highest-priority installed
// frequency dictionary. Empty map when none is installed.
export function loadGlobalRanks(dictDb: Database.Database, words: string[]): Map<string, number> {
  const out = new Map<string, number>()
  if (words.length === 0) return out
  try {
    const src = dictDb
      .prepare(
        `SELECT f.dict_id AS id FROM freq f JOIN dict d ON d.id = f.dict_id
         GROUP BY f.dict_id ORDER BY d.priority DESC, d.id DESC LIMIT 1`
      )
      .get() as { id: number } | undefined
    if (!src) return out
    for (let i = 0; i < words.length; i += 500) {
      const slice = words.slice(i, i + 500)
      const placeholders = slice.map(() => '?').join(',')
      const rows = dictDb
        .prepare(
          `SELECT expression, MIN(rank) AS rank FROM freq
           WHERE dict_id = ? AND expression IN (${placeholders}) GROUP BY expression`
        )
        .all(src.id, ...slice) as { expression: string; rank: number }[]
      for (const r of rows) out.set(r.expression, r.rank)
    }
  } catch {
    return new Map()
  }
  return out
}

// Writes a vocab course as lessons of 25 in one transaction via the real repo
// fns. Shared by the series prep deck and the core frequency deck — only the
// titles and per-card notes differ between them.
export function writeWordCourse(input: {
  title: string
  description: string
  words: {
    word: string
    reading: string
    gloss: string
    notes: string | null
    exampleJp?: string | null
    exampleEn?: string | null
  }[]
  sourceMediaId: number | null
}): number {
  const { title, description, words, sourceMediaId } = input
  const courseId = japaneseRepo.createCourse({ title, description, level: null, difficulty: null })
  for (let i = 0; i < words.length; i += WORDS_PER_LESSON) {
    const slice = words.slice(i, i + WORDS_PER_LESSON)
    japaneseRepo.createLesson({
      courseId,
      kind: 'vocab',
      title: `Most frequent ${i + 1}–${i + slice.length}`,
      cards: slice.map((w) => ({
        front: w.word,
        reading: w.reading && w.reading !== w.word ? w.reading : null,
        back: w.gloss,
        notes: w.notes,
        exampleJp: w.exampleJp ?? null,
        exampleEn: w.exampleEn ?? null,
        sourceMediaId
      }))
    })
  }
  return courseId
}

// Writes the course + lessons-of-25 in one transaction via the real repo fns.
export function writePrepCourse(
  mediaId: number,
  seriesTitle: string,
  words: { word: string; count: number; reading: string; gloss: string; rank?: number | null }[]
): number {
  return writeWordCourse({
    title: `Reading prep: ${seriesTitle}`,
    description:
      `The ${words.length} most frequent words in "${seriesTitle}" that aren't in your decks yet — ` +
      'auto-built from its pages. Mark a lesson learned to start reviewing, then go read.',
    words: words.map((w) => ({
      word: w.word,
      reading: w.reading,
      gloss: w.gloss,
      notes:
        `appears ${w.count}× in this series` +
        (w.rank ? ` · global rank #${w.rank}` : '')
    })),
    sourceMediaId: mediaId
  })
}

// ---- the build ----

export async function buildPrepDeck(mediaId: number, limit = 100): Promise<PrepDeckSummary> {
  if (status.running) throw new Error('A prep deck is already being built')
  return tasks.runTask(
    {
      kind: 'prepDeck',
      label: 'Building prep deck',
      route: `/japanese/comprehension/${mediaId}`,
      controls: tasks.flagCancel('Deck builds are short — stop and re-run instead'),
      project: () => ({ detail: status.phase, done: status.done, total: status.total })
    },
    (handle) => buildPrepDeckInner(mediaId, limit, handle)
  )
}

async function buildPrepDeckInner(
  mediaId: number,
  limit: number,
  handle: tasks.TaskHandle
): Promise<PrepDeckSummary> {
  status.running = true
  status.error = null
  status.phase = 'reading'
  status.done = 0
  status.total = 0

  try {
    const db = getSqlite()
    const media = db.prepare('SELECT title FROM media_item WHERE id = ?').get(mediaId) as
      | { title: string }
      | undefined
    if (!media) throw new Error('Media item not found')

    const dictDb = getDictDb()
    const hasDict = (dictDb.prepare('SELECT COUNT(*) AS n FROM term').get() as { n: number }).n > 0
    if (!hasDict) {
      throw new Error('No offline dictionary installed — add JMdict in Settings first')
    }

    // Phase 1: read + tokenize everything, counting dictionary-form frequencies.
    const scan = await countSeriesWords(mediaId, (done, total) => {
      status.done = done
      status.total = total
      if (handle.cancelRequested()) throw new tasks.TaskCancelledError('Building prep deck')
    })
    const { counts } = scan

    // Phase 2: rank, drop known words, gloss from the offline dictionaries.
    status.phase = 'glossing'
    status.done = 0
    status.total = limit
    const known = new Set(
      (db.prepare('SELECT front FROM jp_card').all() as { front: string }[]).map((r) => r.front)
    )
    const candidates = rankCandidates(counts, known)
    // Blend in global corpus frequency when a frequency dictionary is installed,
    // so a word that is merely locally repeated doesn't outrank one the learner
    // will meet everywhere. Capped: the tail is noise either way.
    const shortlist = candidates.slice(0, 2000)
    const globalRank = loadGlobalRanks(
      dictDb,
      shortlist.map((c) => c.word)
    )
    const ordered = [...fuseWithGlobalRank(shortlist, globalRank), ...candidates.slice(2000)]
    const words: { word: string; count: number; reading: string; gloss: string; rank: number | null }[] =
      []
    let sinceYield = 0
    for (const cand of ordered) {
      if (words.length >= limit) break
      const glossed = glossFor(dictDb, cand.word)
      if (glossed) {
        words.push({
          word: cand.word,
          count: cand.count,
          ...glossed,
          rank: globalRank.get(cand.word) ?? null
        })
        status.done = words.length
      }
      // The yield point is also the cancel point: throwing here means a
      // stopped build writes NO partial course, and runTask settles it
      // 'cancelled' rather than 'error'.
      if (++sinceYield % 50 === 0) {
        if (handle.cancelRequested()) throw new tasks.TaskCancelledError('Building prep deck')
        await yieldToLoop()
      }
    }
    if (words.length === 0) {
      throw new Error('Nothing new to learn — every frequent word is already in your decks')
    }

    // Phase 3: write the course. The scan we just paid for is also exactly what
    // the comprehension score needs, so snapshot it on the way out.
    status.phase = 'writing'
    const courseId = writePrepCourse(mediaId, media.title, words)
    try {
      coverageRepo.saveScan(mediaId, scan)
    } catch {
      // A coverage snapshot is a bonus, never a reason to fail the deck build.
    }

    return {
      courseId,
      courseTitle: `Reading prep: ${media.title}`,
      words: words.length,
      chaptersScanned: scan.chaptersScanned,
      uniqueWordsSeen: counts.size
    }
  } catch (err) {
    status.error = err instanceof Error ? err.message : String(err)
    throw err
  } finally {
    status.running = false
    status.phase = 'idle'
  }
}
