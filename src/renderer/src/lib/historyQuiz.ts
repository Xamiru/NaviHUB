import type { HistoryQuizKind } from '@shared/types'

// The History quiz's games, shared by the quiz room, the game page and the
// central quiz hub. Route slugs are frozen: /history/quiz/<slug>.
export interface HistoryQuizGame {
  slug: 'chronology' | 'quote' | 'date' | 'map'
  kind: HistoryQuizKind
  title: string
  body: string
  /** Questions (or events, for a chronology board) a round needs. */
  minimum: number
}

export const HISTORY_QUIZ_GAMES: HistoryQuizGame[] = [
  { slug: 'chronology', kind: 'historyChronology', title: 'Chronology', body: 'Put five events of one era in the order they began.', minimum: 5 },
  { slug: 'quote', kind: 'historyQuote', title: 'Who said it', body: 'Name the person behind a quoted passage, from four of the same era.', minimum: 1 },
  { slug: 'date', kind: 'historyDate', title: 'Year', body: 'Pick the year an event began from four of its era.', minimum: 1 },
  { slug: 'map', kind: 'historyMapState', title: 'Whose land', body: 'Name the state that held a place in the year of an event there, from the map borders.', minimum: 1 }
]

export function historyQuizGame(slug: string | undefined): HistoryQuizGame | null {
  return HISTORY_QUIZ_GAMES.find((g) => g.slug === slug) ?? null
}
