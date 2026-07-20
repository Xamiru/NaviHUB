import { join } from 'path'
import { setImmediate as yieldToLoop } from 'timers/promises'
import type Database from 'better-sqlite3'
import { getSqlite } from './db/connection'
import { getDictDb } from './dict/dictDb'
import { mangaRootDir } from './files'
import { listChapterPages } from './manga'
import { getChapterOcr } from './mokuro'
import { isEpubFile, listEpubPages } from './epub'
import { readArchiveEntry } from './archive'
import { tokenize } from './tokenizer'
import { flattenGlossary } from '@shared/dictContent'
import * as japaneseRepo from './repos/japaneseRepo'
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
    if (word.length < 1) continue
    // Single kana or Latin/digit-only tokens are noise; single kanji is fine.
    if (word.length === 1 && !/[一-鿿]/.test(word)) continue
    if (!/[぀-ヿ一-鿿]/.test(word)) continue
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

// Writes the course + lessons-of-25 in one transaction via the real repo fns.
export function writePrepCourse(
  mediaId: number,
  seriesTitle: string,
  words: { word: string; count: number; reading: string; gloss: string }[]
): number {
  const courseId = japaneseRepo.createCourse({
    title: `Reading prep: ${seriesTitle}`,
    description:
      `The ${words.length} most frequent words in "${seriesTitle}" that aren't in your decks yet — ` +
      'auto-built from its pages. Mark a lesson learned to start reviewing, then go read.',
    level: null,
    difficulty: null
  })
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
        notes: `appears ${w.count}× in this series`,
        sourceMediaId: mediaId
      }))
    })
  }
  return courseId
}

// ---- text extraction ----

// Strips tags/entities from EPUB spine XHTML — same spirit as the flattener:
// crude but safe, feeding a tokenizer rather than a renderer.
export function stripXhtml(xml: string): string {
  return xml
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<rt[\s\S]*?<\/rt>/gi, ' ') // furigana would double-count readings
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
}

async function* chapterTexts(dirPath: string): AsyncGenerator<string> {
  const abs = join(mangaRootDir(), dirPath)
  if (isEpubFile(dirPath)) {
    for (const entry of await listEpubPages(abs)) {
      const buf = await readArchiveEntry(abs, entry)
      if (buf) yield stripXhtml(buf.toString('utf8'))
    }
    return
  }
  const pageFiles = await listChapterPages(abs)
  if (pageFiles.length === 0) return
  const ocr = getChapterOcr(abs, pageFiles)
  if (!ocr) return
  for (const page of ocr.pages) {
    if (!page) continue
    for (const block of page.blocks) yield block.lines.join('')
  }
}

// ---- the build ----

export async function buildPrepDeck(mediaId: number, limit = 100): Promise<PrepDeckSummary> {
  if (status.running) throw new Error('A prep deck is already being built')
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

    const chapters = db
      .prepare('SELECT dir_path FROM manga_chapter WHERE media_id = ? ORDER BY sort_order, id')
      .all(mediaId) as { dir_path: string }[]
    if (chapters.length === 0) {
      throw new Error('No chapters attached — link the series folder first')
    }

    // Phase 1: read + tokenize everything, counting dictionary-form frequencies.
    status.total = chapters.length
    const counts = new Map<string, number>()
    let sawText = false
    for (const ch of chapters) {
      for await (const text of chapterTexts(ch.dir_path)) {
        if (!text.trim()) continue
        sawText = true
        for (const tok of await tokenize(text)) {
          if (!tok.wordLike) continue
          const base = tok.base || tok.surface
          counts.set(base, (counts.get(base) ?? 0) + 1)
        }
      }
      status.done += 1
      await yieldToLoop()
    }
    if (!sawText) {
      throw new Error(
        'No readable text found — manga chapters need mokuro OCR, or attach an EPUB book'
      )
    }

    // Phase 2: rank, drop known words, gloss from the offline dictionaries.
    status.phase = 'glossing'
    status.done = 0
    status.total = limit
    const known = new Set(
      (db.prepare('SELECT front FROM jp_card').all() as { front: string }[]).map((r) => r.front)
    )
    const candidates = rankCandidates(counts, known)
    const words: { word: string; count: number; reading: string; gloss: string }[] = []
    let sinceYield = 0
    for (const cand of candidates) {
      if (words.length >= limit) break
      const glossed = glossFor(dictDb, cand.word)
      if (glossed) {
        words.push({ word: cand.word, count: cand.count, ...glossed })
        status.done = words.length
      }
      if (++sinceYield % 50 === 0) await yieldToLoop()
    }
    if (words.length === 0) {
      throw new Error('Nothing new to learn — every frequent word is already in your decks')
    }

    // Phase 3: write the course.
    status.phase = 'writing'
    const courseId = writePrepCourse(mediaId, media.title, words)

    return {
      courseId,
      courseTitle: `Reading prep: ${media.title}`,
      words: words.length,
      chaptersScanned: chapters.length,
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
