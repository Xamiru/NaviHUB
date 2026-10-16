// PURE: the History quiz's deals. Main extracts small facts from the catalog
// (historyQuizPool.ts) and these builders turn them into rounds with an
// injected seeded rng, building only what the round reaches. Every prompt is a
// page title, a quoted passage, a date or a map name the section already shows;
// the quiz adds no text of its own.

import type { HistoryQuizChoice, HistoryQuizQuestion } from '../types'
import { drawUntil, balancedBuiltDeal } from '../quizCore'
import { shuffle } from '../shuffle'
import { yearLabel } from './calendars'

export interface QuizEventFact {
  ref: string
  title: string
  /** Decimal start year, for ordering. */
  s: number
  /** The year the event began, astronomical. */
  year: number
  /** The sources disagree on the year, or give it as approximate: never asked as a date. */
  uncertain: boolean
}

export interface QuizSpeakerFact {
  ref: string
  title: string
  /** Birth year, for picking people of the same era as wrong answers. */
  born: number | null
  /** Every name the person goes by: a quote that uses one gives the answer away. */
  names: string[]
}

export interface QuizQuoteFact {
  key: string
  /** The page the quote is on. */
  page: string
  speaker: string
  text: string
  lang: string
  translation: { text: string; lang: string } | null
  source: string
}

export interface QuizPlaceFact {
  key: string
  event: string
  eventTitle: string
  place: string
  lon: number
  lat: number
  year: number
}

/** The state over a point in a year, and its nearest neighbours that year. */
export type StateLookup = (lon: number, lat: number, year: number) => { answer: string; others: string[]; approximate: boolean } | null

export const CHRONOLOGY_SIZE = 5
const CHOICES = 4
/** Events either side of the anchor a chronology board draws from, so its events share an era. */
const CHRONOLOGY_WINDOW = 12

const choice = (key: string, label: string): HistoryQuizChoice => ({ key, label, image: null })

/** "Siege of Vienna (1529)", "Bengal famine of 1943": the title gives the date away. */
export function titleGivesYear(title: string): boolean {
  return /(^|\D)\d{3,4}(\D|$)/.test(title)
}

const askable = (e: QuizEventFact): boolean => !e.uncertain && !titleGivesYear(e.title)

/** Five events of one era, each a different year, to put in order. */
export function chronologyDeal(events: QuizEventFact[], length: number, rng: () => number): HistoryQuizQuestion[] {
  const sorted = events.filter(askable).sort((a, b) => a.s - b.s)
  const used = new Set<string>()
  const out: HistoryQuizQuestion[] = []
  const anchors = sorted.map((_, i) => i)
  drawUntil(
    anchors,
    rng,
    (i) => {
      if (used.has(sorted[i].ref)) return false
      const window = sorted.slice(Math.max(0, i - CHRONOLOGY_WINDOW), i + CHRONOLOGY_WINDOW + 1).filter((e) => !used.has(e.ref))
      const years = new Set<number>([sorted[i].year])
      const picked = [sorted[i]]
      for (const e of shuffle(window, rng)) {
        if (picked.length >= CHRONOLOGY_SIZE) break
        if (years.has(e.year)) continue
        years.add(e.year)
        picked.push(e)
      }
      if (picked.length < CHRONOLOGY_SIZE) return false
      picked.forEach((e) => used.add(e.ref))
      const ordered = [...picked].sort((a, b) => a.s - b.s)
      out.push({
        kind: 'historyChronology',
        key: ordered.map((e) => e.ref).join('|'),
        choices: shuffle(picked, rng).map((e) => choice(e.ref, e.title)),
        validKeys: ordered.map((e) => e.ref),
        years: Object.fromEntries(picked.map((e) => [e.ref, yearLabel(e.year)]))
      })
      return true
    },
    length
  )
  return out
}

/** Spacing of the wrong years: a few years apart for the modern era, centuries apart in antiquity. */
export function yearStep(year: number): number {
  if (year >= 1900) return 2
  if (year >= 1700) return 5
  if (year >= 1000) return 10
  if (year >= 0) return 25
  return 50
}

/** The year an event began, against three years of its era. */
export function dateDeal(events: QuizEventFact[], length: number, rng: () => number, latest: number): HistoryQuizQuestion[] {
  const order = events.filter(askable)
  return drawUntil(order, rng, () => true, length).map((e) => {
    const step = yearStep(e.year)
    // No wrong year after `latest` (this year): a future year is no choice.
    const candidates = [-3, -2, -1, 1, 2, 3].map((o) => e.year + o * step).filter((y) => y <= latest)
    const years = shuffle([e.year, ...shuffle(candidates, rng).slice(0, CHOICES - 1)], rng)
    return {
      kind: 'historyDate',
      key: e.ref,
      ref: e.ref,
      title: e.title,
      image: null,
      choices: years.map((y) => choice(String(y), yearLabel(y))),
      validKeys: [String(e.year)]
    }
  })
}

/** Does a passage name its speaker? Then it gives the answer away. */
export function namesSpeaker(text: string, names: string[]): boolean {
  const lower = text.toLowerCase()
  const words = new Set(
    names.flatMap((n) => [n, ...n.split(/[\s,]+/)]).map((w) => w.toLowerCase().replace(/^(al|el|ibn|bin)-/, '')).filter((w) => w.length >= 4)
  )
  return [...words].some((w) => new RegExp(`(^|[^\\p{L}])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\p{L}])`, 'u').test(lower))
}

/** Who said or wrote a passage, against three people of the same era. */
export function quoteDeal(
  quotes: QuizQuoteFact[],
  speakers: Map<string, QuizSpeakerFact>,
  length: number,
  rng: () => number
): HistoryQuizQuestion[] {
  const people = [...speakers.values()]
  if (people.length < CHOICES) return []
  return balancedBuiltDeal(
    quotes,
    length,
    (q) => q.speaker,
    (q): HistoryQuizQuestion | null => {
      const speaker = speakers.get(q.speaker)
      if (!speaker) return null
      if (namesSpeaker(q.text, speaker.names) || (q.translation && namesSpeaker(q.translation.text, speaker.names))) return null
      // The nearest in birth year make the wrong answers; people with no
      // birth year come last.
      const near = people
        .filter((p) => p.ref !== speaker.ref)
        .sort((a, b) => Math.abs((a.born ?? 1e6) - (speaker.born ?? 0)) - Math.abs((b.born ?? 1e6) - (speaker.born ?? 0)))
      const wrong = shuffle(near.slice(0, 8), rng).slice(0, CHOICES - 1)
      return {
        kind: 'historyQuote',
        key: q.key,
        ref: q.page,
        text: q.text,
        lang: q.lang,
        translation: q.translation,
        source: q.source,
        choices: shuffle([speaker, ...wrong], rng).map((p) => choice(p.ref, p.title)),
        validKeys: [speaker.ref]
      }
    },
    rng
  )
}

/** Which state held a place in the year of an event there, against its neighbours that year. */
export function mapStateDeal(places: QuizPlaceFact[], lookup: StateLookup, length: number, rng: () => number): HistoryQuizQuestion[] {
  const out: HistoryQuizQuestion[] = []
  const seen = new Set<string>()
  drawUntil(
    [...places],
    rng,
    (p) => {
      if (seen.has(`${p.place}|${p.year}`)) return false
      const hit = lookup(p.lon, p.lat, p.year)
      if (!hit || hit.others.length < CHOICES - 1) return false
      seen.add(`${p.place}|${p.year}`)
      const wrong = shuffle(hit.others.slice(0, 6), rng).slice(0, CHOICES - 1)
      out.push({
        kind: 'historyMapState',
        key: p.key,
        ref: p.event,
        event: p.eventTitle,
        place: p.place,
        year: p.year,
        approximate: hit.approximate,
        choices: shuffle([hit.answer, ...wrong], rng).map((n) => choice(n, n)),
        validKeys: [hit.answer]
      })
      return true
    },
    length
  )
  return out
}
