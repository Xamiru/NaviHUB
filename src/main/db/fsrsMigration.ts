import type Database from 'better-sqlite3'
import { calendarDaysBetween, nextMemory, parseSqliteUtc } from '@shared/srs'
import type { SrsGrade } from '@shared/types'

// One-time move of the Japanese and English decks from SM-2 to FSRS
// (src/shared/srs.ts). FSRS schedules from a memory state (stability,
// difficulty) that SM-2 never kept, so every card answered before the switch
// gets one by replaying its own review log through the FSRS update — the
// grades and their real timestamps are exactly what the model consumes.
// Only scheduling inputs are written: status, due date, interval, reps and
// lapses stay as they were, so nothing jumps in the queue on upgrade; the next
// answer schedules from the derived state.
//
// Replay starts at the card's last reset: resetCard zeroes the state but keeps
// the log, so only the newest `reps` rows belong to the current run (the same
// rule listLeeches uses). A card with state but no usable log (marked "Already
// known", or imported with history) falls back to stability = its interval and
// a difficulty read off its SM-2 ease.

interface DeckTables {
  flag: string
  cards: string
  log: string
  fk: string
}

const DECKS: DeckTables[] = [
  { flag: 'srs.fsrs.jp', cards: 'jp_card', log: 'jp_review_log', fk: 'card_id' },
  { flag: 'srs.fsrs.en', cards: 'en_word', log: 'en_review_log', fk: 'word_id' }
]

const GRADES = new Set<SrsGrade>(['again', 'hard', 'good', 'easy'])

// SM-2 ease 2.5 (the default) reads as middling difficulty; the floor 1.3 as
// the hardest; 3.1+ as easy.
export function difficultyFromEase(ease: number): number {
  return Math.min(10, Math.max(1, 5 + (2.5 - ease) * (5 / 1.2)))
}

export function replayMemory(
  rows: { grade: string; reviewed_at: string }[]
): { stability: number; difficulty: number } | null {
  let memory: { stability: number | null; difficulty: number | null } = {
    stability: null,
    difficulty: null
  }
  let last: number | null = null
  for (const row of rows) {
    if (!GRADES.has(row.grade as SrsGrade)) continue
    const at = parseSqliteUtc(row.reviewed_at)
    if (at == null) continue
    const elapsed = last == null ? 0 : calendarDaysBetween(last, at)
    memory = nextMemory(memory, row.grade as SrsGrade, elapsed)
    last = at
  }
  return memory.stability == null || memory.difficulty == null
    ? null
    : { stability: memory.stability, difficulty: memory.difficulty }
}

export function migrateToFsrs(sqlite: Database.Database): void {
  for (const deck of DECKS) {
    if (sqlite.prepare('SELECT 1 FROM settings WHERE key = ?').get(deck.flag)) continue
    const cards = sqlite
      .prepare(
        `SELECT id, reps, interval_days, ease FROM ${deck.cards}
         WHERE reps > 0 AND stability IS NULL`
      )
      .all() as { id: number; reps: number; interval_days: number; ease: number }[]
    const logRows = sqlite.prepare(
      `SELECT grade, reviewed_at FROM ${deck.log} WHERE ${deck.fk} = ?
       ORDER BY reviewed_at DESC, id DESC LIMIT ?`
    )
    const write = sqlite.prepare(
      `UPDATE ${deck.cards} SET stability = ?, fsrs_difficulty = ? WHERE id = ?`
    )
    const tx = sqlite.transaction(() => {
      for (const card of cards) {
        const rows = (logRows.all(card.id, card.reps) as { grade: string; reviewed_at: string }[]).reverse()
        const memory = replayMemory(rows) ?? {
          stability: Math.max(0.1, card.interval_days),
          difficulty: difficultyFromEase(card.ease)
        }
        write.run(memory.stability, memory.difficulty, card.id)
      }
      sqlite.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(deck.flag, '1')
    })
    tx()
  }
}
