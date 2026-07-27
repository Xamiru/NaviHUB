import { join } from 'path'
import { setImmediate as yieldToLoop } from 'timers/promises'
import { getSqlite } from './db/connection'
import { mangaRootDir } from './files'
import { listChapterPages } from './manga'
import { getChapterOcr } from './mokuro'
import { isEpubFile, listEpubPages } from './epub'
import { readArchiveEntry } from './archive'
import { tokenize } from './tokenizer'

// Reading a whole series as text: mokuro OCR blocks for manga, spine XHTML for
// EPUB books. Extracted from prepDeck.ts so the prep deck and the comprehension
// scan walk a series exactly once each, the same way — one definition of "what
// counts as a word in this series".

// Strips tags/entities from EPUB spine XHTML — same spirit as the flattener:
// crude but safe, feeding a tokenizer rather than a renderer.
export function stripXhtml(xml: string): string {
  return xml
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<rt[\s\S]*?<\/rt>/gi, ' ') // furigana would double-count readings
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
}

// Words worth learning: Japanese-looking, not a bare kana particle, not
// Latin/digits. The single definition used by the prep deck, the comprehension
// scan, the text analyzer and the core-deck generator — they must agree on what
// a countable word is or their percentages disagree.
export function isLearnableWord(word: string): boolean {
  if (!word) return false
  // Single kana or Latin/digit-only tokens are noise; single kanji is fine.
  if (word.length === 1 && !/[一-鿿]/.test(word)) return false
  return /[぀-ヿ一-鿿]/.test(word)
}

export async function* chapterTexts(dirPath: string): AsyncGenerator<string> {
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

export interface SeriesWordCounts {
  counts: Map<string, number> // dictionary (base) form -> occurrences
  tokenCount: number // total word-like token occurrences (coverage denominator)
  chaptersScanned: number
}

// Reads and tokenizes every chapter of a series, counting dictionary-form
// frequencies. Yields to the event loop per chapter so the polled status keeps
// moving and the app stays responsive on a 200-chapter series.
export async function countSeriesWords(
  mediaId: number,
  onProgress?: (done: number, total: number) => void
): Promise<SeriesWordCounts> {
  const db = getSqlite()
  const chapters = db
    .prepare('SELECT dir_path FROM manga_chapter WHERE media_id = ? ORDER BY sort_order, id')
    .all(mediaId) as { dir_path: string }[]
  if (chapters.length === 0) {
    throw new Error('No chapters attached — link the series folder first')
  }

  const counts = new Map<string, number>()
  let tokenCount = 0
  let sawText = false
  let done = 0
  onProgress?.(0, chapters.length)
  for (const ch of chapters) {
    for await (const text of chapterTexts(ch.dir_path)) {
      if (!text.trim()) continue
      sawText = true
      for (const tok of await tokenize(text)) {
        if (!tok.wordLike) continue
        const base = tok.base || tok.surface
        counts.set(base, (counts.get(base) ?? 0) + 1)
        tokenCount += 1
      }
    }
    done += 1
    onProgress?.(done, chapters.length)
    await yieldToLoop()
  }
  if (!sawText) {
    throw new Error('No readable text found — manga chapters need mokuro OCR, or attach an EPUB book')
  }
  return { counts, tokenCount, chaptersScanned: chapters.length }
}
