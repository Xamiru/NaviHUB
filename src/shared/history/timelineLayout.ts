// Pure geometry for the History world timeline: the zoom model, tick marks,
// lane row packing and the overview minimap. The renderer only measures its
// width and draws what these functions return, so every behaviour here
// (semantic zoom, label culling, edge flipping) is unit-tested.

export interface View {
  /** Decimal years. */
  s: number
  e: number
}

export interface Bounds {
  min: number
  max: number
  /** Narrowest view, in years. */
  minSpan: number
}

export type ZoomLevel = 'century' | 'decade' | 'year'

export const LEVEL_SPANS: Record<ZoomLevel, number> = { century: 100, decade: 10, year: 1.5 }

export function zoomLevel(view: View): ZoomLevel {
  const span = view.e - view.s
  return span > 40 ? 'century' : span > 6 ? 'decade' : 'year'
}

export function clampView(view: View, b: Bounds): View {
  const span = Math.min(Math.max(view.e - view.s, b.minSpan), b.max - b.min)
  let s = view.s
  if (s < b.min) s = b.min
  if (s + span > b.max) s = b.max - span
  return { s, e: s + span }
}

/** factor < 1 zooms in. The anchor year stays under the pointer. */
export function zoomView(view: View, factor: number, b: Bounds, anchor?: number): View {
  const a = anchor ?? (view.s + view.e) / 2
  return clampView({ s: a - (a - view.s) * factor, e: a + (view.e - a) * factor }, b)
}

export function panView(view: View, years: number, b: Bounds): View {
  return clampView({ s: view.s + years, e: view.e + years }, b)
}

export function viewAtLevel(view: View, level: ZoomLevel, b: Bounds): View {
  const c = (view.s + view.e) / 2
  const w = LEVEL_SPANS[level]
  return clampView({ s: c - w / 2, e: c + w / 2 }, b)
}

export function yearToX(year: number, view: View, width: number): number {
  return ((year - view.s) / (view.e - view.s)) * width
}

export interface Tick {
  year: number
  x: number
  major: boolean
  label: string
}

const QUARTERS = ['', 'Apr', 'Jul', 'Oct']

export function ticks(view: View, width: number): Tick[] {
  const level = zoomLevel(view)
  const step = level === 'century' ? 10 : level === 'decade' ? 1 : 0.25
  const out: Tick[] = []
  // Integer stepping avoids floating-point drift across many ticks.
  const first = Math.ceil(view.s / step)
  const last = Math.floor(view.e / step)
  for (let i = first; i <= last; i++) {
    const year = i * step
    const whole = Number.isInteger(year)
    const major =
      level === 'year' ? whole : level === 'decade' ? year % 5 === 0 : year % 50 === 0
    const label =
      level === 'century'
        ? `${year}s`
        : level === 'decade'
          ? String(year)
          : whole
            ? String(year)
            : QUARTERS[Math.round((year - Math.floor(year)) * 4)]
    out.push({ year, x: yearToX(year, view, width), major, label })
  }
  return out
}

export interface LaneItem {
  key: string
  label: string
  /** Decimal years; `e` absent for a point event. */
  s: number
  e?: number
  prominence: 1 | 2 | 3
}

export interface Placed {
  item: LaneItem
  x0: number
  x1: number
  row: number
  showLabel: boolean
  /** Label drawn inside a wide enough bar. */
  inside: boolean
  /** Label drawn to the left because it would run off the right edge. */
  flip: boolean
}

export interface LaneLayout {
  placed: Placed[]
  rows: number
}

/** Which prominence tiers are drawn at all at a zoom level. */
export function visibleProminence(level: ZoomLevel): number {
  return level === 'century' ? 2 : 3
}

export interface LayoutOptions {
  /** Label width in px. */
  measure: (label: string) => number
  maxRows?: number
  /** Item keys that always keep their label (the selection). */
  pinned?: ReadonlySet<string>
}

const GAP = 4
const MARK = 6

/**
 * Packs one lane. Items are placed most prominent first, each in the first
 * row where it fits together with its label; past `maxRows` an item keeps only
 * its mark (its title remains available on hover and focus) instead of making
 * the lane taller.
 */
/** Unlabelled rows a crowded lane may add below its labelled ones. */
export const OVERFLOW_ROWS = 2

export function layoutLane(items: LaneItem[], view: View, width: number, opts: LayoutOptions): LaneLayout {
  const maxRows = opts.maxRows ?? 3
  const level = zoomLevel(view)
  const visible = items
    .filter((it) => (it.e ?? it.s) >= view.s && it.s <= view.e && it.prominence <= visibleProminence(level))
    .sort((a, b) => a.prominence - b.prominence || a.s - b.s)
  const rows: Array<Array<[number, number]>> = []
  const fits = (r: number, [a, b]: [number, number]): boolean =>
    !(rows[r] ?? []).some(([c, d]) => a < d + GAP && c < b + GAP)

  const placed = visible.map((item): Placed => {
    const x0 = yearToX(item.s, view, width)
    const x1 = item.e !== undefined ? yearToX(item.e, view, width) : x0
    const textW = opts.measure(item.label)
    // Only the on-screen part of a bar can hold its label.
    const inside = item.e !== undefined && Math.min(x1, width) - Math.max(x0, 0) > textW
    const flip = !inside && Math.max(x1, x0) + textW > width && x0 - textW > 0
    const extent = (withLabel: boolean): [number, number] => {
      const right = Math.max(x1, x0 + MARK)
      if (inside || !withLabel) return [x0 - MARK, right]
      return flip ? [x0 - textW - MARK, right] : [x0 - MARK, Math.max(x1, x0) + textW + 2 * GAP]
    }
    const pinned = opts.pinned?.has(item.key) ?? false
    let row = -1
    let showLabel = true
    for (let r = 0; r < maxRows; r++) {
      if (fits(r, extent(true))) {
        row = r
        break
      }
    }
    if (row === -1) {
      // No labelled slot: drop the label and, rather than drawing over a
      // neighbour, spill into up to OVERFLOW_ROWS extra rows.
      showLabel = pinned
      for (let r = 0; r < maxRows + OVERFLOW_ROWS; r++) {
        if (fits(r, extent(showLabel))) {
          row = r
          break
        }
      }
    }
    if (row === -1) row = maxRows + OVERFLOW_ROWS - 1
    ;(rows[row] ??= []).push(extent(showLabel))
    return { item, x0, x1, row, showLabel, inside, flip }
  })
  return { placed, rows: Math.max(rows.length, 1) }
}

export interface Bin {
  start: number
  count: number
}

/** Event counts per `size`-year bin across the minimap's range. */
export function densityBins(starts: number[], min: number, max: number, size: number): Bin[] {
  const bins: Bin[] = []
  for (let s = min; s < max; s += size) bins.push({ start: s, count: 0 })
  for (const y of starts) {
    const i = Math.floor((y - min) / size)
    if (i >= 0 && i < bins.length) bins[i].count++
  }
  return bins
}

/** Approximate label width for the timeline's 11px label face. */
export function estimateLabelWidth(label: string): number {
  return label.length * 6.4 + 14
}

export interface BandBox {
  key: string
  /** Visible left and right edges in px. */
  x0: number
  x1: number
  label: string
}

/** Width of a period band's small caps label (9 px, tracked uppercase). */
export function estimateBandLabelWidth(label: string): number {
  return label.length * 7 + 6
}

/**
 * Which period bands in one lane get their (right-aligned) label: the label
 * must fit inside its band and must not overlap a label already placed.
 * Longer bands are placed first, so a reign keeps its name over the shorter
 * periods nested in it.
 */
export function bandLabels(bands: BandBox[], measure: (label: string) => number = estimateBandLabelWidth): Set<string> {
  const placed: Array<[number, number]> = []
  const shown = new Set<string>()
  for (const b of [...bands].sort((a, c) => c.x1 - c.x0 - (a.x1 - a.x0) || a.x0 - c.x0)) {
    const w = measure(b.label)
    const span: [number, number] = [b.x1 - w - 6, b.x1 - 6]
    if (w > b.x1 - b.x0 - 6) continue
    if (placed.some(([a, c]) => span[0] < c + GAP && a < span[1] + GAP)) continue
    placed.push(span)
    shown.add(b.key)
  }
  return shown
}
