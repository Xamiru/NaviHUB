import { join } from 'path'
import { readFileSync } from 'fs'
import { setImmediate as yieldToLoop } from 'timers/promises'
import { getSqlite } from './db/connection'
import { absoluteMediaPath, mangaRootDir, videoRootDir } from './files'
import { listChapterPages } from './manga'
import { getChapterOcr } from './mokuro'
import { isEpubFile, listEpubPages } from './epub'
import { readArchiveEntry } from './archive'
import { tokenize } from './tokenizer'
import { probeFile } from './video/ffmpeg'
import * as videoSubs from './video/subtitles'
import { dialogueText, parseSubtitles } from '@shared/subtitles'
import type { VideoSubtitleTrack } from '@shared/types'

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

// One readable unit of a series: a manga chapter (OCR / EPUB spine) or a video
// file (its best Japanese subtitle track). The two formats meet here so the
// comprehension scan and the prep deck light up for anime with NO change to
// coverage.ts or prepDeck.ts.
export interface CorpusUnit {
  kind: 'chapter' | 'video' | 'vn'
  path: string
  label: string
}

export function seriesCorpus(mediaId: number): CorpusUnit[] {
  const db = getSqlite()
  const vn = db.prepare("SELECT id FROM media_item WHERE id=? AND media_type='visual_novel'").get(mediaId)
  if (vn) return (db.prepare('SELECT id,title FROM vn_text_capture WHERE media_id=? ORDER BY id').all(mediaId) as { id: number; title: string }[])
    .map((c) => ({ kind: 'vn', path: String(c.id), label: c.title }))
  const chapters = db
    .prepare('SELECT dir_path, title FROM manga_chapter WHERE media_id = ? ORDER BY sort_order, id')
    .all(mediaId) as { dir_path: string; title: string }[]
  // Manga wins when both exist: a series with scanned chapters AND an attached
  // video folder is being READ, and OCR text is the richer corpus.
  if (chapters.length > 0) {
    return chapters.map((c) => ({ kind: 'chapter', path: c.dir_path, label: c.title }))
  }
  const videos = db
    .prepare('SELECT file_path, title FROM video_file WHERE media_id = ? ORDER BY sort_order, id')
    .all(mediaId) as { file_path: string; title: string }[]
  return videos.map((v) => ({ kind: 'video', path: v.file_path, label: v.title }))
}

// Subtitle lines of one video, dialogue only. A file with no textual track
// contributes nothing and the scan carries on — a season with three subbed
// episodes still produces a usable corpus.
export async function* videoTexts(filePath: string): AsyncGenerator<string> {
  const abs = join(videoRootDir(), filePath)
  const relPath = `video/${filePath}`
  let tracks: Awaited<ReturnType<typeof videoSubs.extractAll>>
  try {
    const probe = await probeFile(abs)
    tracks = await videoSubs.extractAll(abs, videoSubs.listTracks(abs, relPath, probe))
  } catch {
    return
  }
  const track = pickCorpusTrack(tracks)
  if (!track?.url) return
  let raw: string
  try {
    raw = readFileSync(absoluteMediaPath(urlToRelPath(track.url)), 'utf8')
  } catch {
    return
  }
  for (const line of dialogueText(parseSubtitles(raw, track.format))) yield line
}

// navimg://a/b -> "a/b". The URL is percent-encoded per segment by mediaUrl.
function urlToRelPath(url: string): string {
  const u = new URL(url)
  return decodeURIComponent(u.host + u.pathname)
}

// Which track becomes the corpus. Textual only, Japanese preferred, and signs
// and forced tracks pushed DOWN — a "Signs & Songs" track is thirty lines of
// sign translations and would report absurd comprehension.
export function pickCorpusTrack(tracks: VideoSubtitleTrack[]): VideoSubtitleTrack | null {
  let best: VideoSubtitleTrack | null = null
  let bestScore = -Infinity
  for (const t of tracks) {
    if (!t.textual) continue
    let score = t.lang === 'ja' ? 100 : t.lang === 'other' ? 10 : 0
    if (t.signs) score -= 60
    if (t.forced) score -= 30
    if (score > bestScore) {
      bestScore = score
      best = t
    }
  }
  return best
}

export async function* capturedTexts(id: string): AsyncGenerator<string> {
  const row = getSqlite().prepare('SELECT body FROM vn_text_capture WHERE id=?').get(Number(id)) as { body: string } | undefined
  if (!row) throw new Error('Captured text changed. Run the scan again.')
  // Bound each synchronous tokenizer call, including logs without newlines.
  for (const paragraph of row.body.split(/\n+/)) for (let i = 0; i < paragraph.length; i += 4000) yield paragraph.slice(i, i + 4000)
}
export function captureStamp(mediaId: number): string {
  return JSON.stringify(getSqlite().prepare('SELECT id,fingerprint FROM vn_text_capture WHERE media_id=? ORDER BY id').all(mediaId))
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
  const units = seriesCorpus(mediaId)
  const stamp = captureStamp(mediaId)
  if (units.length === 0) {
    throw new Error('No readable text yet. Attach chapters/episodes or save a VN text capture first.')
  }

  const counts = new Map<string, number>()
  let tokenCount = 0
  let sawText = false
  let done = 0
  onProgress?.(0, units.length)
  for (const unit of units) {
    const stream = unit.kind === 'vn' ? capturedTexts(unit.path) : unit.kind === 'chapter' ? chapterTexts(unit.path) : videoTexts(unit.path)
    for await (const text of stream) {
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
    onProgress?.(done, units.length)
    await yieldToLoop()
  }
  if (stamp !== captureStamp(mediaId)) throw new Error('Captured text changed during the scan. Run it again.')
  if (!sawText) {
    throw new Error(
      'No readable text found — manga chapters need mokuro OCR, attach an EPUB book, or put subtitle files next to the episodes'
    )
  }
  // chaptersScanned now means "units scanned" (jp_coverage.chapters_scanned
  // keeps its name — renaming it would be a migration for cosmetics).
  return { counts, tokenCount, chaptersScanned: units.length }
}
