// Review directions beyond recognition (Japanese → meaning, the card itself):
//   production — see the meaning, recall the Japanese word;
//   reading    — see a kanji word, recall how it is read.
// Each has its own schedule in jp_card_review; recognition stays on jp_card,
// so everything that asks "is this word known" (coverage, the i+1 feed, the
// JLPT ladder) is unchanged. Values are FROZEN (stored in jp_card_review and
// jp_review_log.direction).

export type JpReviewDirection = 'recognition' | 'production' | 'reading'
export type JpExtraDirection = Exclude<JpReviewDirection, 'recognition'>

export const EXTRA_DIRECTIONS: readonly JpExtraDirection[] = ['production', 'reading']

// A word earns its extra directions once recognition is no longer fragile: the
// card graduated and reached this interval. Introducing them at once would
// double a new word's load before the learner can even recognise it.
export const DIRECTION_SPAWN_INTERVAL_DAYS = 3

// Settings → Learning → Japanese review directions. Missing = on.
export const DIRECTION_SETTING: Record<JpExtraDirection, string> = {
  production: 'japanese.direction.production',
  reading: 'japanese.direction.reading'
}

export function directionEnabled(raw: string | null | undefined): boolean {
  return raw !== '0'
}

const HAS_KANJI = /[㐀-鿿豈-﫿々]/

// Which extra directions a card can carry. Vocabulary only: grammar cards are
// whole sentences (their practice is the cloze) and kanji cards already drill
// readings on the kana page. Reading needs kanji whose reading differs.
export function eligibleDirections(
  card: { front: string; reading: string | null },
  lessonKind: string
): JpExtraDirection[] {
  if (lessonKind !== 'vocab') return []
  const out: JpExtraDirection[] = ['production']
  if (HAS_KANJI.test(card.front) && card.reading && card.reading !== card.front) out.push('reading')
  return out
}

export const DIRECTION_LABEL: Record<JpReviewDirection, string> = {
  recognition: 'Meaning',
  production: 'Say it in Japanese',
  reading: 'Reading'
}
