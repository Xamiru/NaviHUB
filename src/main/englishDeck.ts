import { getDictDb } from './dict/dictDb'
import * as englishRepo from './repos/englishRepo'
import type { EnDeckWord, EnWord } from '@shared/types'

// The English deck overview (/english/deck): every saved word with its
// OpenSubtitles frequency rank attached, so the auto-save-misses loop's tail
// vocabulary (a 40k-rank word on the same schedule as one you need) can be
// SEEN and pruned by hand. Rank lives in dictionaries.db (en_freq), the deck
// in navihub.db — joined in JS like englishDrills.ts. No pack → every rank is
// null and the page says so.

export function attachRanks(words: EnWord[], ranks: Map<string, number>): EnDeckWord[] {
  return words.map((w) => ({ ...w, rank: ranks.get(w.word.trim().toLowerCase()) ?? null }))
}

function rankMap(words: string[]): Map<string, number> {
  const out = new Map<string, number>()
  const db = getDictDb()
  const bank = db
    .prepare("SELECT id FROM en_freq_set WHERE source = 'opensubtitles'")
    .get() as { id: number } | undefined
  if (!bank) return out
  const keys = [...new Set(words.map((w) => w.trim().toLowerCase()))]
  for (let i = 0; i < keys.length; i += 500) {
    const chunk = keys.slice(i, i + 500)
    const rows = db
      .prepare(
        `SELECT word, rank FROM en_freq WHERE bank_id = ? AND word IN (${chunk.map(() => '?').join(',')})`
      )
      .all(bank.id, ...chunk) as { word: string; rank: number }[]
    for (const r of rows) out.set(r.word, r.rank)
  }
  return out
}

export function deckOverview(): EnDeckWord[] {
  const words = englishRepo.listWords()
  return attachRanks(words, rankMap(words.map((w) => w.word)))
}
