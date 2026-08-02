import { getSqlite } from './db/connection'
import { componentsFor } from './dict/krad'
import { kanjiChars } from '@shared/confusables'
import { toHiragana } from '@shared/kana'
import type { JpConfusableCardRef, JpConfusablePair } from '@shared/types'

// "You may be confusing X with Y" — static overlap analysis over the user's
// LAPSING cards (the pre-leech band, lapses >= 3): exact same reading, a
// shared kanji character, or visually-similar kanji (component Jaccard). This
// is the signal the Anki-world addons use; time-correlation over the review
// log is a documented stretch goal (a single-user log rarely has enough
// interleaved lapse events per pair to clear noise).

const LAPSE_FLOOR = 3
const LAPSING_LIMIT = 200
const PAIR_LIMIT = 20
const COMPONENT_JACCARD = 0.5

const REASON_SCORE: Record<JpConfusablePair['reasons'][number], number> = {
  reading: 3,
  kanji: 2,
  components: 1
}

// Pure core, injectable componentsOf for tests. `lapsing` drives the search;
// `all` is the candidate set (a lapsing card can be confused with a healthy
// one — the healthy one is winning the fight).
export function findConfusablePairs(
  lapsing: JpConfusableCardRef[],
  all: JpConfusableCardRef[],
  componentsOf: (kanji: string) => string[]
): JpConfusablePair[] {
  // Inverted indexes over the candidate set.
  const byReading = new Map<string, JpConfusableCardRef[]>()
  const byKanji = new Map<string, JpConfusableCardRef[]>()
  for (const card of all) {
    const reading = toHiragana(card.reading ?? card.front)
    if (reading) {
      const list = byReading.get(reading) ?? []
      list.push(card)
      byReading.set(reading, list)
    }
    for (const k of new Set(kanjiChars(card.front))) {
      const list = byKanji.get(k) ?? []
      list.push(card)
      byKanji.set(k, list)
    }
  }

  const memoComponents = new Map<string, string[]>()
  const partsOf = (kanji: string): string[] => {
    let parts = memoComponents.get(kanji)
    if (!parts) {
      parts = componentsOf(kanji)
      memoComponents.set(kanji, parts)
    }
    return parts
  }
  const kanjiSimilar = (a: string, b: string): boolean => {
    const pa = partsOf(a)
    const pb = partsOf(b)
    if (pa.length === 0 || pb.length === 0) return false
    const sa = new Set(pa)
    let inter = 0
    for (const x of pb) if (sa.has(x)) inter++
    return inter / (sa.size + new Set(pb).size - inter) >= COMPONENT_JACCARD
  }

  const seen = new Set<string>()
  const scored: { pair: JpConfusablePair; score: number }[] = []
  const addPair = (a: JpConfusableCardRef, b: JpConfusableCardRef, reason: JpConfusablePair['reasons'][number]): void => {
    if (a.id === b.id || a.front === b.front) return
    const key = a.id < b.id ? `${a.id}|${b.id}` : `${b.id}|${a.id}`
    const existing = scored.find((s) => (s.pair.a.id === a.id && s.pair.b.id === b.id) || (s.pair.a.id === b.id && s.pair.b.id === a.id))
    if (existing) {
      if (!existing.pair.reasons.includes(reason)) {
        existing.pair.reasons.push(reason)
        existing.score += REASON_SCORE[reason]
      }
      return
    }
    if (seen.has(key)) return
    seen.add(key)
    const [first, second] = a.id < b.id ? [a, b] : [b, a]
    scored.push({ pair: { a: first, b: second, reasons: [reason] }, score: REASON_SCORE[reason] })
  }

  for (const card of lapsing) {
    // 1. Exact reading.
    const reading = toHiragana(card.reading ?? card.front)
    for (const other of byReading.get(reading) ?? []) addPair(card, other, 'reading')
    // 2. Shared kanji character.
    const ownKanji = new Set(kanjiChars(card.front))
    for (const k of ownKanji) {
      for (const other of byKanji.get(k) ?? []) addPair(card, other, 'kanji')
    }
    // 3. Visually-similar kanji (component overlap) — only when they DON'T
    // already share a character (avoid double-reporting the same signal).
    for (const k of ownKanji) {
      if (partsOf(k).length === 0) continue
      for (const other of all) {
        if (other.id === card.id) continue
        const otherKanji = kanjiChars(other.front)
        if (otherKanji.some((ok) => ownKanji.has(ok))) continue
        if (otherKanji.some((ok) => kanjiSimilar(k, ok))) addPair(card, other, 'components')
      }
    }
  }

  scored.sort(
    (x, y) =>
      y.score - x.score ||
      y.pair.a.lapses + y.pair.b.lapses - (x.pair.a.lapses + x.pair.b.lapses) ||
      x.pair.a.id - y.pair.a.id
  )
  return scored.slice(0, PAIR_LIMIT).map((s) => s.pair)
}

// IO wrapper: lapsing cards + the full candidate set from navihub.db,
// components from the kradfile pack (missing pack → the components reason
// simply never fires).
export function listConfusables(): JpConfusablePair[] {
  const db = getSqlite()
  const mapRow = (r: Record<string, unknown>): JpConfusableCardRef => ({
    id: r.id as number,
    front: r.front as string,
    reading: (r.reading as string) ?? null,
    back: r.back as string,
    lapses: r.lapses as number
  })
  const lapsing = (
    db
      .prepare(
        `SELECT id, front, reading, back, lapses FROM jp_card
         WHERE lapses >= ? ORDER BY lapses DESC, id ASC LIMIT ?`
      )
      .all(LAPSE_FLOOR, LAPSING_LIMIT) as Record<string, unknown>[]
  ).map(mapRow)
  if (lapsing.length === 0) return []
  const all = (
    db.prepare('SELECT id, front, reading, back, lapses FROM jp_card').all() as Record<
      string,
      unknown
    >[]
  ).map(mapRow)
  return findConfusablePairs(lapsing, all, componentsFor)
}
