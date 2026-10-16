// PURE: the History quiz's pools, cut from the catalog index and the reader's
// marks. The builders in @shared/history/quiz.ts deal from them; the map kind
// gets its borders lookup injected, since the borders load separately.

import { stateAtPoint } from '@shared/history/mapGeometry'
import { primaryName, refOf, type HistorySource, type Quote } from '@shared/history/schema'
import {
  chronologyDeal,
  dateDeal,
  mapStateDeal,
  quoteDeal,
  titleGivesYear,
  type QuizEventFact,
  type QuizPlaceFact,
  type QuizQuoteFact,
  type QuizSpeakerFact,
  type StateLookup
} from '@shared/history/quiz'
import { seededRng } from '@shared/quizCore'
import type { HistoryBorders, HistoryMark, HistoryQuizCounts, HistoryQuizQuestion, HistoryQuizRequest, HistoryQuizScope } from '@shared/types'
import { firstValue, refInfo, type CachedLookup, type HistoryIndex } from './historyIndex'
import { lookup } from '@shared/history/model'
import { yearOf } from '@shared/history/calendars'

export interface QuizPoolContext {
  marks: Map<string, HistoryMark>
  cached: CachedLookup
}

export interface QuizPools {
  events: QuizEventFact[]
  quotes: QuizQuoteFact[]
  speakers: Map<string, QuizSpeakerFact>
  places: QuizPlaceFact[]
}

function sourceLabel(s: HistorySource | undefined): string {
  if (!s) return ''
  const by = s.contributors[0]?.name
  const year = /^-?\d{4}/.test(s.date) ? ` (${s.date.slice(0, 4)})` : ''
  return `${by ? `${by}, ` : ''}${s.title}${year}`
}

export function quizPools(index: HistoryIndex, scope: HistoryQuizScope, ctx: QuizPoolContext): QuizPools {
  const c = index.catalog
  const read = (ref: string): boolean => scope === 'all' || !!ctx.marks.get(ref)?.read

  const events: QuizEventFact[] = []
  const places: QuizPlaceFact[] = []
  for (const t of index.events) {
    if (t.personal || !read(t.ref)) continue
    const e = c.events.get(t.ref.slice('event:'.length))
    if (!e) continue
    const alts = e.start.alts
    const years = new Set(alts.map((a) => yearOf(a.value.d)))
    const first = alts[0]?.value
    const year = first ? yearOf(first.d) : null
    if (year === null) continue
    const uncertain = years.size > 1 || !!first.approx || (!!first.notAfter && yearOf(first.notAfter) !== year)
    events.push({ ref: t.ref, title: t.title, s: t.s, year, uncertain })
    if (uncertain) continue
    for (const link of e.places ?? []) {
      const place = c.places.get(link.ref.slice('place:'.length))
      if (!place?.coords) continue
      places.push({
        key: `${t.ref}|${link.ref}`,
        event: t.ref,
        eventTitle: t.title,
        place: primaryName(place),
        lon: place.coords.lon,
        lat: place.coords.lat,
        year
      })
      break
    }
  }

  const speakers = new Map<string, QuizSpeakerFact>()
  const speaker = (ref: string): QuizSpeakerFact | null => {
    const known = speakers.get(ref)
    if (known) return known
    const p = lookup(c, ref)
    if (p?.kind !== 'person') return null
    const born = firstValue(p.born)
    const fact = { ref, title: primaryName(p), born: born ? yearOf(born.d) : null, names: p.names.map((n) => n.text) }
    speakers.set(ref, fact)
    return fact
  }
  const quotes: QuizQuoteFact[] = []
  const add = (page: string, who: string, q: Quote): void => {
    quotes.push({
      key: `${page}#${q.id}`,
      page,
      speaker: who,
      text: q.text,
      lang: q.lang,
      translation: q.translation ? { text: q.translation.text, lang: q.translation.lang } : null,
      source: sourceLabel(c.sources.get(q.cite.source))
    })
  }
  // A person page's own words.
  for (const p of c.people.values()) {
    const ref = refOf('person', p.id)
    if (index.personal.has(ref) || !read(ref)) continue
    const own = (p.sections ?? []).filter((s) => s.kind === 'in-their-words').flatMap((s) => s.quotes)
    if (own.length && speaker(ref)) own.forEach((q) => add(ref, ref, q))
  }
  // A view held by one person, in a primary text: their words, not a scholar's summary.
  for (const i of c.interpretations.values()) {
    const page = i.about.find((r) => read(r))
    if (!page) continue
    for (const pos of i.positions) {
      if (pos.holders.length !== 1) continue
      const who = pos.holders[0].ref
      if (!who?.startsWith('person:') || !speaker(who)) continue
      for (const q of pos.statements) {
        if (c.sources.get(q.cite.source)?.type === 'primary') add(page, who, q)
      }
    }
  }
  // Every page's people are possible wrong answers, read or not, so a small
  // reading list still gets four choices.
  for (const p of c.people.values()) {
    const ref = refOf('person', p.id)
    if (!index.personal.has(ref)) speaker(ref)
  }
  return { events, quotes, speakers, places }
}

export function quizCounts(pools: QuizPools): HistoryQuizCounts {
  const askable = pools.events.filter((e) => !e.uncertain && !titleGivesYear(e.title)).length
  return {
    historyChronology: askable,
    historyDate: askable,
    historyQuote: pools.quotes.length,
    historyMapState: pools.places.length
  }
}

export function bordersLookup(data: HistoryBorders): StateLookup {
  return (lon, lat, year) => {
    const hit = stateAtPoint(data, year, lon, lat)
    if (!hit) return null
    // Asked only when the same state held the place the year before and the
    // year after: an event that changed hands there (a conquest, a founding)
    // would make the borders' answer for its own year a trick question.
    for (const y of [year - 1, year + 1]) {
      if (stateAtPoint(data, y, lon, lat)?.unit.name !== hit.unit.name) return null
    }
    const others = [...new Set(hit.others.map((u) => u.name))]
    return { answer: hit.unit.name, others, approximate: hit.approximate }
  }
}

/** A round, with each page choice's cached picture filled in. */
export function quizDeal(
  index: HistoryIndex,
  request: HistoryQuizRequest,
  ctx: QuizPoolContext,
  borders: StateLookup | null,
  latest: number
): HistoryQuizQuestion[] {
  const pools = quizPools(index, request.scope, ctx)
  const rng = seededRng(request.seed)
  const length = Math.max(1, Math.min(20, Math.floor(request.length)))
  const deal =
    request.kind === 'historyChronology'
      ? chronologyDeal(pools.events, length, rng)
      : request.kind === 'historyDate'
        ? dateDeal(pools.events, length, rng, latest)
        : request.kind === 'historyQuote'
          ? quoteDeal(pools.quotes, pools.speakers, length, rng)
          : borders
            ? mapStateDeal(pools.places, borders, length, rng)
            : []
  const image = (ref: string): string | null => (ref.includes(':') ? refInfo(index, ref, ctx.cached).image?.cached ?? null : null)
  return deal.map((q) => {
    const choices = q.kind === 'historyMapState' ? q.choices : q.choices.map((ch) => ({ ...ch, image: image(ch.key) }))
    return q.kind === 'historyDate' ? { ...q, choices, image: image(q.ref) } : { ...q, choices }
  })
}
