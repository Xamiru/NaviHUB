import { setImmediate as yieldToLoop } from 'timers/promises'
import { getSqlite } from './db/connection'
import { getDictDb } from './dict/dictDb'
import { glossFor, writeWordCourse } from './prepDeck'
import { querySentences } from './dict/sentences'
import { isLearnableWord } from './seriesText'
import * as tasks from './tasks'
import type { CoreDeckStatus, CoreDeckSummary } from '@shared/types'

// "Core frequency deck": the next N most common Japanese words you don't have a
// card for yet, glossed from JMdict and (when the sentence bank is installed)
// carrying a real example sentence. The prep deck's idea sourced from the whole
// language instead of one series — and because it dedupes against every
// existing jp_card front, deck #2 simply continues where #1 stopped.

const status: CoreDeckStatus = {
  running: false,
  phase: 'idle',
  done: 0,
  total: 0,
  error: null
}

export function getCoreDeckStatus(): CoreDeckStatus {
  return { ...status }
}

export async function buildCoreDeck(limit = 500): Promise<CoreDeckSummary> {
  if (status.running) throw new Error('A deck is already being built')
  return tasks.runTask(
    {
      kind: 'coreDeck',
      label: 'Building core deck',
      route: '/japanese',
      controls: tasks.flagCancel('Deck builds are short — stop and re-run instead'),
      project: () => ({ detail: status.phase, done: status.done, total: status.total })
    },
    (handle) => buildCoreDeckInner(limit, handle)
  )
}

async function buildCoreDeckInner(
  limit: number,
  handle: tasks.TaskHandle
): Promise<CoreDeckSummary> {
  status.running = true
  status.error = null
  status.phase = 'selecting'
  status.done = 0
  status.total = limit

  try {
    const db = getSqlite()
    const dictDb = getDictDb()

    // Highest-priority installed frequency dictionary wins; mixing two corpora's
    // ranks in one deck would order it by nothing in particular. This JOIN is
    // also the installed-check: `freq` alone can hold rows staged by an import
    // still in flight (the dict registry row is written LAST, by design), and
    // those have no dictionary to name.
    const src = dictDb
      .prepare(
        `SELECT f.dict_id AS id, d.title AS title FROM freq f JOIN dict d ON d.id = f.dict_id
         GROUP BY f.dict_id ORDER BY d.priority DESC, d.id DESC LIMIT 1`
      )
      .get() as { id: number; title: string } | undefined
    if (!src) {
      throw new Error(
        'No frequency dictionary installed — add JPDB or BCCWJ frequency in Settings first'
      )
    }
    const hasDict = (dictDb.prepare('SELECT COUNT(*) AS n FROM term').get() as { n: number }).n > 0
    if (!hasDict) {
      throw new Error('No offline dictionary installed — add JMdict in Settings first')
    }

    const known = new Set(
      (db.prepare('SELECT front FROM jp_card').all() as { front: string }[]).map((r) => r.front)
    )
    const hasSentences =
      (dictDb.prepare('SELECT COUNT(*) AS n FROM sentence_bank').get() as { n: number }).n > 0

    status.phase = 'glossing'
    const words: {
      word: string
      reading: string
      gloss: string
      notes: string | null
      exampleJp?: string | null
      exampleEn?: string | null
    }[] = []
    const picked = new Set<string>()
    let ranksScanned = 0
    let skippedKnown = 0
    let sinceYield = 0

    const rows = dictDb
      .prepare(
        `SELECT expression, MIN(rank) AS rank FROM freq WHERE dict_id = ?
         GROUP BY expression ORDER BY rank ASC`
      )
      .iterate(src.id) as IterableIterator<{ expression: string; rank: number }>

    for (const row of rows) {
      if (words.length >= limit) break
      ranksScanned += 1
      const word = row.expression
      if (picked.has(word)) continue
      if (known.has(word)) {
        skippedKnown += 1
        continue
      }
      if (!isLearnableWord(word)) continue
      const glossed = glossFor(dictDb, word)
      if (!glossed) continue // not in JMdict: names and corpus artifacts land here
      picked.add(word)
      const entry: (typeof words)[number] = {
        word,
        reading: glossed.reading,
        gloss: glossed.gloss,
        notes: `global frequency rank #${row.rank}`
      }
      if (hasSentences) {
        const [example] = querySentences(word, 1)
        if (example) {
          entry.exampleJp = example.jp
          entry.exampleEn = example.en
        }
      }
      words.push(entry)
      status.done = words.length
      // Yield point doubles as the cancel point — a stopped build writes no
      // partial deck, and runTask settles it 'cancelled'.
      if (++sinceYield % 50 === 0) {
        if (handle.cancelRequested()) throw new tasks.TaskCancelledError('Building core deck')
        await yieldToLoop()
      }
    }

    if (words.length === 0) {
      throw new Error('Nothing new to learn — every frequent word is already in your decks')
    }

    status.phase = 'writing'
    const k =
      ((
        db.prepare(
          "SELECT COUNT(*) AS n FROM jp_course WHERE title LIKE 'Core frequency deck #%'"
        ).get() as { n: number }
      ).n ?? 0) + 1
    const courseTitle = `Core frequency deck #${k}`
    const courseId = writeWordCourse({
      title: courseTitle,
      description:
        `The next ${words.length} most frequent Japanese words (per ${src.title}) that aren't in ` +
        'your decks yet. Mark a lesson learned to start reviewing.',
      words,
      sourceMediaId: null
    })

    return { courseId, courseTitle, words: words.length, ranksScanned, skippedKnown }
  } catch (err) {
    status.error = err instanceof Error ? err.message : String(err)
    throw err
  } finally {
    status.running = false
    status.phase = 'idle'
  }
}
