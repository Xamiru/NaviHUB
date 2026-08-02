import { isKanaOnly, splitMora, toHiragana, toKatakana } from './kana'
import { transitivityPartner } from './transitivity'

// In-pool confusable detection for the practice quiz's tier-0 distractors —
// cheap pure checks only (shared kanji chars, same reading, transitivity
// partner), NO IPC. Worst-case degradation: an empty tier, which falls through
// to the existing generic tiers.

export interface ConfusablePoolItem {
  id: number
  front: string
  reading: string | null
}

export type ConfusableDirection = 'jp2en' | 'en2jp' | 'jp2reading' | 'cloze'

export function kanjiChars(s: string): string[] {
  return [...s].filter((ch) => {
    const c = ch.codePointAt(0)!
    return c >= 0x4e00 && c <= 0x9fff
  })
}

// Distractors that are REAL confusables for the target, prioritized:
//  · en2jp / cloze (answer = the word): transitivity partner, then true
//    homophones (same reading, different word), then shared-kanji words.
//  · jp2reading (answer = the reading): shared-kanji words — their readings
//    are the plausible misreadings. Same-reading items are useless (identical
//    answer text, the caller's dedupe kills them anyway).
//  · jp2en (answer = the meaning): the partner ONLY — shared-kanji words often
//    have genuinely related meanings and would create arguably-correct options.
export function confusableTier<T extends ConfusablePoolItem>(
  pool: T[],
  target: ConfusablePoolItem,
  dir: ConfusableDirection
): T[] {
  const partner = transitivityPartner(target.front)
  const partnerForms = partner ? new Set([partner.partner, partner.partnerKana]) : null
  const targetReading = target.reading ? toHiragana(target.reading) : null
  const targetKanji = new Set(kanjiChars(target.front))

  const partners: T[] = []
  const homophones: T[] = []
  const sharedKanji: T[] = []
  for (const item of pool) {
    if (item.id === target.id || item.front === target.front) continue
    if (partnerForms && (partnerForms.has(item.front) || (item.reading && partnerForms.has(item.reading)))) {
      partners.push(item)
      continue
    }
    if (dir === 'jp2en') continue // partner only for meaning questions
    const itemReading = item.reading ? toHiragana(item.reading) : null
    if (
      dir !== 'jp2reading' &&
      targetReading &&
      itemReading === targetReading
    ) {
      homophones.push(item)
      continue
    }
    if (targetKanji.size > 0 && kanjiChars(item.front).some((c) => targetKanji.has(c))) {
      sharedKanji.push(item)
    }
  }
  return [...partners, ...homophones, ...sharedKanji]
}

// Common katakana loanword predicate for the loanword drill pool: an
// all-katakana expression of at least two morae that is common enough to be
// worth drilling (a common-usage tag, or a decent frequency rank).
export const LOANWORD_COMMON_TAGS = new Set(['P', 'news1', 'ichi1', 'spec1', 'gai1', 'gai2'])

export function isLoanwordCandidate(
  expression: string,
  termTags: string[],
  rank: number | null
): boolean {
  if (!expression || !isKanaOnly(expression)) return false
  if (expression !== toKatakana(expression)) return false // must be katakana
  // ー-only or single-mora strings aren't words worth drilling.
  if (splitMora(toHiragana(expression)).length < 2) return false
  if (termTags.some((t) => LOANWORD_COMMON_TAGS.has(t))) return true
  return rank !== null && rank <= 20000
}
