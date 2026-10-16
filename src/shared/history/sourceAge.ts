// PURE: how old the scholarship behind a page is. A 1911 encyclopedia can carry
// a date well, but its judgements are a century old; readers should see that.
// Only scholarship ages this way: a primary text, a newspaper or a government
// record is as old as it is meant to be.

import type { HistoryEntity, HistorySource, Quote, Section, SourceType } from './schema'

/** Scholarship published before this year is marked as older. */
export const OLDER_BEFORE = 1950

const SCHOLARLY: ReadonlySet<SourceType> = new Set(['book', 'chapter', 'article', 'encyclopedia'])

/** The year a source was published, when its date gives one. */
export function sourceYear(source: Pick<HistorySource, 'date'>): number | null {
  const y = parseInt(source.date, 10)
  return Number.isFinite(y) ? y : null
}

/** True for scholarship or a reference work published before 1950. */
export function isOlderScholarship(source: Pick<HistorySource, 'date' | 'type'>): boolean {
  const y = sourceYear(source)
  return SCHOLARLY.has(source.type) && y !== null && y < OLDER_BEFORE
}

export interface DatedNarration {
  /** Share of the page's narrative quotes cut from older scholarship, 0 to 1. */
  share: number
  /** Publication year of the oldest of those works. */
  oldest: number
}

/**
 * How much of a page's narrative rests on older scholarship. The narrative is
 * every section except the subject's own words, plus the dated course. Null
 * when the page has no narrative quote from older scholarship.
 */
export function datedNarration(e: HistoryEntity, sources: (id: string) => HistorySource | undefined): DatedNarration | null {
  const o = e as unknown as { sections?: Section[]; course?: Array<{ quote: Quote }> }
  const quotes = [
    ...(o.sections ?? []).filter((s) => s.kind !== 'in-their-words').flatMap((s) => s.quotes),
    ...(o.course ?? []).map((c) => c.quote)
  ]
  if (quotes.length === 0) return null
  const years: number[] = []
  for (const q of quotes) {
    const s = sources(q.cite.source)
    if (s && isOlderScholarship(s)) years.push(sourceYear(s)!)
  }
  if (years.length === 0) return null
  return { share: years.length / quotes.length, oldest: Math.min(...years) }
}
