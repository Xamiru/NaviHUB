import { setImmediate as yieldToLoop } from 'timers/promises'
import { getSqlite } from './db/connection'
import { getDictDb } from './dict/dictDb'
import { glossFor } from './prepDeck'
import { isLearnableWord } from './seriesText'
import * as japaneseRepo from './repos/japaneseRepo'
import * as tasks from './tasks'
import { toHiragana } from '@shared/kana'
import type { CoreDeckStatus, KanjiDeckSummary } from '@shared/types'

// "Kanji deck": the next N kanji worth learning that no kanji card covers yet.
// The curated kanji courses stop at 715; reading needs the ~2,100 of the jōyō
// list, and this fills the gap from the offline KANJIDIC. Kanji that already
// appear in the learner's own vocabulary come first (they are the ones being
// met), then the rest by newspaper frequency. Each card's example word is the
// learner's own word when there is one, else the most frequent dictionary word
// that uses it. Deck #2 continues where #1 stopped, because every existing
// kanji card front is skipped.

const KANJI_PER_LESSON = 20
const KANJI = /^[一-鿿㐀-䶿々]$/u
// Ranks scanned for example words; the common kanji all appear well before this.
const EXAMPLE_SCAN_LIMIT = 80000

const status: CoreDeckStatus = { running: false, phase: 'idle', done: 0, total: 0, error: null }

export function getKanjiDeckStatus(): CoreDeckStatus {
  return { ...status }
}

export async function buildKanjiDeck(limit = 100): Promise<KanjiDeckSummary> {
  if (status.running) throw new Error('A kanji deck is already being built')
  return tasks.runTask(
    {
      kind: 'kanjiDeck',
      label: 'Building kanji deck',
      route: '/japanese/roadmap',
      controls: tasks.flagCancel('Deck builds are short — stop and re-run instead'),
      project: () => ({ detail: status.phase, done: status.done, total: status.total })
    },
    (handle) => buildKanjiDeckInner(limit, handle)
  )
}

interface KanjiEntry {
  character: string
  onyomi: string[]
  kunyomi: string[]
  meanings: string[]
  freq: number
  grade: number | null
}

interface Example {
  word: string
  reading: string
  gloss: string
}

// KANJIDIC kun'yomi mark okurigana with a dot (ひと.つ); the curated cards
// write it in brackets (ひと(つ)).
export function formatKunyomi(raw: string): string[] {
  const out: string[] = []
  for (const r of raw.split(/\s+/).filter(Boolean)) {
    const v = r.replace(/\.(.+)$/, '($1)')
    if (!out.includes(v)) out.push(v)
  }
  return out
}

export function primaryReading(entry: Pick<KanjiEntry, 'onyomi' | 'kunyomi'>): string | null {
  if (entry.onyomi[0]) return toHiragana(entry.onyomi[0])
  // Prefer a standalone kun reading over KANJIDIC's affix forms (-こ(む), あい-).
  const kun = entry.kunyomi.find((k) => !k.startsWith('-') && !k.endsWith('-')) ?? entry.kunyomi[0]
  const stem = kun?.replace(/\(.*$/, '').replace(/-/g, '')
  return stem || null
}

function readKanjidic(): Map<string, KanjiEntry> {
  const rows = getDictDb()
    .prepare(
      `SELECT k.character, k.onyomi, k.kunyomi, k.meanings, k.stats FROM kanji k
       JOIN dict d ON d.id = k.dict_id ORDER BY d.priority DESC, d.id DESC`
    )
    .all() as { character: string; onyomi: string | null; kunyomi: string | null; meanings: string; stats: string | null }[]
  const out = new Map<string, KanjiEntry>()
  for (const r of rows) {
    if (out.has(r.character) || !KANJI.test(r.character)) continue
    let meanings: string[] = []
    let stats: Record<string, unknown> = {}
    try {
      meanings = (JSON.parse(r.meanings) as unknown[]).map(String).filter(Boolean)
      stats = r.stats ? (JSON.parse(r.stats) as Record<string, unknown>) : {}
    } catch {
      continue
    }
    if (meanings.length === 0) continue
    const freq = Number(stats.freq)
    const grade = Number(stats.grade)
    out.set(r.character, {
      character: r.character,
      onyomi: (r.onyomi ?? '').split(/\s+/).filter(Boolean),
      kunyomi: formatKunyomi(r.kunyomi ?? ''),
      meanings,
      freq: Number.isFinite(freq) && freq > 0 ? freq : Number.POSITIVE_INFINITY,
      grade: Number.isFinite(grade) && grade > 0 ? grade : null
    })
  }
  return out
}

// Jōyō (school grades 1–6 and 8) or among the 2,500 most frequent: worth a card.
function worthLearning(e: KanjiEntry): boolean {
  return (e.grade != null && e.grade <= 8) || e.freq <= 2500
}

async function buildKanjiDeckInner(limit: number, handle: tasks.TaskHandle): Promise<KanjiDeckSummary> {
  status.running = true
  status.error = null
  status.phase = 'selecting'
  status.done = 0
  status.total = limit

  try {
    const db = getSqlite()
    const dictDb = getDictDb()
    if ((dictDb.prepare('SELECT COUNT(*) AS n FROM kanji').get() as { n: number }).n === 0) {
      throw new Error('No kanji dictionary installed — add KANJIDIC in Settings first')
    }
    const kanjidic = readKanjidic()

    const covered = new Set(
      (
        db
          .prepare(
            `SELECT c.front FROM jp_card c JOIN jp_lesson l ON l.id = c.lesson_id WHERE l.kind = 'kanji'`
          )
          .all() as { front: string }[]
      )
        .map((r) => r.front.trim())
        .filter((f) => KANJI.test(f))
    )

    // The learner's own words: how often each kanji appears, and the best
    // example (a learned lesson's word first, then the shortest).
    const ownCount = new Map<string, number>()
    const ownExample = new Map<string, Example & { learned: boolean }>()
    const vocab = db
      .prepare(
        `SELECT c.front, c.reading, c.back, l.learned FROM jp_card c
         JOIN jp_lesson l ON l.id = c.lesson_id WHERE l.kind = 'vocab'`
      )
      .all() as { front: string; reading: string | null; back: string; learned: number }[]
    for (const v of vocab) {
      if (!v.reading) continue
      for (const ch of new Set([...v.front])) {
        if (!KANJI.test(ch) || covered.has(ch)) continue
        ownCount.set(ch, (ownCount.get(ch) ?? 0) + (v.learned ? 2 : 1))
        const prev = ownExample.get(ch)
        const learned = v.learned === 1
        if (!prev || (learned && !prev.learned) || (learned === prev.learned && v.front.length < prev.word.length)) {
          ownExample.set(ch, { word: v.front, reading: v.reading, gloss: v.back, learned })
        }
      }
    }

    const candidates = [...kanjidic.values()]
      .filter((e) => !covered.has(e.character) && (worthLearning(e) || ownCount.has(e.character)))
      .sort(
        (a, b) =>
          (ownCount.get(b.character) ?? 0) - (ownCount.get(a.character) ?? 0) ||
          a.freq - b.freq ||
          (a.grade ?? 99) - (b.grade ?? 99)
      )
      .slice(0, limit)
    if (candidates.length === 0) {
      throw new Error('Nothing new to learn — every common kanji is already in your decks')
    }

    // Example words for kanji the learner has no word for: the first frequent,
    // learnable dictionary word that uses each one.
    status.phase = 'glossing'
    const examples = new Map<string, Example>()
    for (const c of candidates) {
      const own = ownExample.get(c.character)
      if (own) examples.set(c.character, own)
    }
    const want = new Set(candidates.map((c) => c.character).filter((ch) => !examples.has(ch)))
    const freqSource = dictDb
      .prepare(
        `SELECT f.dict_id AS id FROM freq f JOIN dict d ON d.id = f.dict_id
         GROUP BY f.dict_id ORDER BY d.priority DESC, d.id DESC LIMIT 1`
      )
      .get() as { id: number } | undefined
    if (want.size > 0 && freqSource) {
      const rows = dictDb
        .prepare(
          `SELECT expression, MIN(rank) AS rank FROM freq WHERE dict_id = ?
           GROUP BY expression ORDER BY rank ASC LIMIT ?`
        )
        .iterate(freqSource.id, EXAMPLE_SCAN_LIMIT) as IterableIterator<{ expression: string }>
      let scanned = 0
      for (const row of rows) {
        if (want.size === 0) break
        const word = row.expression
        const hits = [...new Set([...word])].filter((ch) => want.has(ch))
        if (hits.length > 0 && word.length > 1 && isLearnableWord(word)) {
          const glossed = glossFor(dictDb, word)
          if (glossed) {
            for (const ch of hits) {
              examples.set(ch, { word, reading: glossed.reading, gloss: glossed.gloss })
              want.delete(ch)
            }
          }
        }
        if (++scanned % 2000 === 0) {
          if (handle.cancelRequested()) throw new tasks.TaskCancelledError('Building kanji deck')
          await yieldToLoop()
        }
      }
    }
    status.done = candidates.length
    if (handle.cancelRequested()) throw new tasks.TaskCancelledError('Building kanji deck')

    status.phase = 'writing'
    // One past the highest number in use, not the count: after deleting deck
    // #1 a count would name the new deck #2 beside the existing #2.
    const k =
      (
        db.prepare("SELECT title FROM jp_course WHERE title LIKE 'Kanji deck #%'").all() as { title: string }[]
      ).reduce((max, r) => Math.max(max, Number(/#(\d+)$/.exec(r.title)?.[1] ?? 0)), 0) + 1
    const courseTitle = `Kanji deck #${k}`
    const courseId = db.transaction(() => {
      const id = japaneseRepo.createCourse({
        title: courseTitle,
        description:
          `The next ${candidates.length} kanji worth learning that no card covers yet: kanji from your own ` +
          'words first, then the most frequent. Mark a lesson learned to start reviewing.',
        level: null,
        difficulty: null
      })
      for (let i = 0; i < candidates.length; i += KANJI_PER_LESSON) {
        const slice = candidates.slice(i, i + KANJI_PER_LESSON)
        japaneseRepo.createLesson({
          courseId: id,
          kind: 'kanji',
          title: `Kanji ${i + 1}–${i + slice.length}`,
          cards: slice.map((e) => {
            const ex = examples.get(e.character)
            return {
              front: e.character,
              reading: primaryReading(e),
              back: e.meanings.slice(0, 3).join(', '),
              onyomi: e.onyomi.length ? e.onyomi.join(', ') : null,
              kunyomi: e.kunyomi.length ? e.kunyomi.join(', ') : null,
              exampleJp: ex?.word ?? null,
              exampleReading: ex && ex.reading !== ex.word ? ex.reading : null,
              exampleEn: ex?.gloss ?? null
            }
          })
        })
      }
      return id
    })()

    return { courseId, courseTitle, kanji: candidates.length }
  } catch (err) {
    status.error = err instanceof Error ? err.message : String(err)
    throw err
  } finally {
    status.running = false
    status.phase = 'idle'
  }
}
