// PURE: lays a state's office holders out as a succession chart. One row per
// office title, each reign a bar on a shared year axis; reigns that overlap in
// the same office (co-rulers, rival claimants) stack into lanes of their row.

import type { Claim, HistDate } from './schema'
import { decimalYear } from './calendars'

export interface SuccessionRuler {
  person: string
  title: string
  start: Claim<HistDate> | null
  end: Claim<HistDate> | null
}

/** A range of years an edge may sit in, when sources disagree or a date is approximate. */
export interface SoftEdge {
  from: number
  to: number
}

export interface SuccessionBar {
  /** Position of the holder in the input list. */
  index: number
  person: string
  title: string
  row: number
  lane: number
  /** Decimal years on the chart's axis. */
  s: number
  e: number
  softStart: SoftEdge | null
  softEnd: SoftEdge | null
  /** The source gives no end: the bar runs to the next holder, the state's end or today. */
  openEnd: boolean
}

export interface SuccessionRow {
  title: string
  lanes: number
}

export interface SuccessionLayout {
  from: number
  to: number
  rows: SuccessionRow[]
  bars: SuccessionBar[]
  ticks: number[]
}

/** Overlap, in years, still read as one holder succeeding another. */
const HANDOFF = 1

/** Offices charted at most; a state's long tail of single officials stays in the list. */
const MAX_ROWS = 6

const words = (s: string): string[] => s.toLowerCase().split(/[^\p{L}]+/u).filter((w) => w.length >= 4)

/**
 * One office however the sources style it: "Shah of Iran" and "shah of Iran",
 * "Prime Minister" and "Prime Minister of the United Kingdom". The "of …" tail
 * is dropped only when it names the state itself (a word shared with one of
 * `stateNames`), so "Minister of the Interior" and "Minister of Finance" stay
 * two offices.
 */
export function officeKey(title: string, stateNames: string[] = []): string {
  const base = title
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const m = /^(.*?)\s+of\s+(.*)$/.exec(base)
  if (!m) return base
  const state = stateNames.flatMap(words)
  const namesState = words(m[2]).some((w) => state.some((s) => s.startsWith(w) || w.startsWith(s)))
  return namesState ? m[1] : base
}

function commonest(titles: string[]): string {
  const n = new Map<string, number>()
  for (const t of titles) n.set(t, (n.get(t) ?? 0) + 1)
  return [...n.entries()].sort((a, b) => b[1] - a[1])[0][0]
}

const STEPS = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]

function edgeRange(c: Claim<HistDate> | null, edge: 'start' | 'end'): { at: number; soft: SoftEdge | null } | null {
  // Each alternative is a range: from its first day to its last (or its notAfter).
  const spans = (c?.alts ?? []).flatMap(({ value: v }) => {
    const lo = decimalYear(v.d, 'start')
    const hi = decimalYear(v.notAfter ?? v.d, 'end')
    if (lo === null || hi === null) return []
    // Without notAfter the edge is a point: a start at its first day, an end at its last.
    const point = edge === 'start' ? lo : hi
    return [{ lo: v.notAfter ? lo : point, hi: v.notAfter ? hi : point, approx: !!v.approx || !!v.notAfter }]
  })
  if (spans.length === 0) return null
  const at = edge === 'start' ? spans[0].lo : spans[0].hi
  const soft = spans.length > 1 || spans.some((x) => x.approx)
  if (!soft) return { at, soft: null }
  const from = Math.min(...spans.map((x) => x.lo))
  const to = Math.max(...spans.map((x) => x.hi))
  // An approximate year with no range still gets a visible fade of a year.
  return { at, soft: to > from ? { from, to } : { from: at - 0.5, to: at + 0.5 } }
}

/** Round axis ticks, about six across the span. */
export function axisTicks(from: number, to: number): number[] {
  const len = Math.max(1, to - from)
  const step = STEPS.find((s) => len / s <= 7) ?? Math.ceil(len / 7 / 1000) * 1000
  const out: number[] = []
  for (let y = Math.ceil(from / step) * step; y <= to; y += step) out.push(y)
  return out
}

/**
 * Null when no office passed between two dated holders: a lone bar says nothing
 * the list below the chart does not. Holders the sources give no start for stay
 * in the list only, since a guessed start would draw a reign nobody dated.
 */
export function successionLayout(
  rulers: SuccessionRuler[],
  span: { s: number; e: number | null } | null,
  now: number,
  stateNames: string[] = []
): SuccessionLayout | null {
  const placed: Array<Omit<SuccessionBar, 'row' | 'lane' | 'e' | 'openEnd'> & { e: number | null }> = []
  rulers.forEach((r, index) => {
    const start = edgeRange(r.start, 'start')
    if (!start) return
    const end = edgeRange(r.end, 'end')
    placed.push({ index, person: r.person, title: r.title, s: start.at, e: end?.at ?? null, softStart: start.soft, softEnd: end?.soft ?? null })
  })
  if (placed.length < 2) return null

  const stateEnd = span?.e ?? now
  const groups = new Map<string, typeof placed>()
  for (const p of placed) {
    const key = officeKey(p.title, stateNames)
    groups.set(key, [...(groups.get(key) ?? []), p])
  }
  // Only offices that passed from one holder to another make a succession;
  // the rest stay in the list under the chart.
  const offices = [...groups.values()]
    .filter((g) => new Set(g.map((p) => p.person)).size >= 2)
    .sort((a, b) => b.length - a.length || Math.min(...a.map((p) => p.s)) - Math.min(...b.map((p) => p.s)))
    .slice(0, MAX_ROWS)
  if (offices.length === 0) return null

  const bars: SuccessionBar[] = []
  const rows: SuccessionRow[] = []
  offices.forEach((group, row) => {
    const reigns = group.slice().sort((a, b) => a.s - b.s)
    const lanes: SuccessionBar[] = []
    reigns.forEach((p, i) => {
      // An open end runs to the next holder of the same office, else to the state's end.
      const next = reigns.slice(i + 1).find((n) => n.s > p.s)
      const e = p.e ?? Math.max(p.s, next ? next.s : stateEnd)
      // Dates given only to the year make every handoff overlap by up to a
      // year ("1501 to 1524", "1524 to 1576"); that is a succession, not co-rule.
      let lane = lanes.findIndex((last) => last.e <= p.s + HANDOFF)
      if (lane < 0) lane = lanes.length
      const prev = lanes[lane]
      if (prev && prev.e > p.s) prev.e = Math.max(prev.s, p.s)
      const bar: SuccessionBar = { ...p, e, openEnd: p.e === null, row, lane }
      lanes[lane] = bar
      bars.push(bar)
    })
    rows.push({ title: commonest(group.map((p) => p.title)), lanes: lanes.length })
  })

  let from = Math.min(...bars.map((b) => b.softStart?.from ?? b.s))
  let to = Math.max(...bars.map((b) => b.softEnd?.to ?? b.e))
  // Reach the state's own start and end when they are near, so the chart sits
  // in the state's life; a six-century empire with two charted sultans keeps
  // its bars readable instead.
  const reach = (to - from) / 2
  if (span && span.s < from && from - span.s <= reach) from = span.s
  const end = span?.e ?? null
  if (end !== null && end > to && end - to <= reach) to = end
  bars.sort((a, b) => a.row - b.row || a.s - b.s)
  return { from, to, rows, bars, ticks: axisTicks(from, to) }
}
