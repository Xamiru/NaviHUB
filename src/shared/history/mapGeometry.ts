// PURE: the History map's geometry — the Equal Earth projection, decoding of
// the delta-encoded CShapes outlines, and which border versions are drawn in a
// given year. CShapes-Europe starts in 1806 and the world set in 1886, so a year
// before 1886 draws Europe's borders over a silhouette of the 1886 world.

import type { HistoryBorders, HistoryMapUnit, HistoryTerritory } from '../types'

const A1 = 1.340264
const A2 = -0.081106
const A3 = 0.000893
const A4 = 0.003796
const M = Math.sqrt(3) / 2

/** Equal Earth (Šavrič, Patterson and Jenny 2018); x within about ±2.71, y ±1.32, north up. */
export function equalEarth(lon: number, lat: number): [number, number] {
  const lambda = (lon * Math.PI) / 180
  const theta = Math.asin(M * Math.sin((lat * Math.PI) / 180))
  const t2 = theta * theta
  const t6 = t2 * t2 * t2
  const x = (lambda * Math.cos(theta)) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)))
  const y = theta * (A1 + A2 * t2 + t6 * (A3 + A4 * t2))
  return [x, -y]
}

export const EQUAL_EARTH_BOUNDS = (() => {
  const [x] = equalEarth(180, 0)
  const [, y] = equalEarth(0, 90)
  return { width: 2 * x, height: 2 * -y, x0: -x, y0: y }
})()

/** Decodes one ring of `[dx, dy, ...]` integer deltas into [lon, lat] pairs. */
export function decodeRing(deltas: number[], quantum: number): Array<[number, number]> {
  const out: Array<[number, number]> = []
  let x = 0
  let y = 0
  for (let i = 0; i + 1 < deltas.length; i += 2) {
    x += deltas[i]
    y += deltas[i + 1]
    out.push([x * quantum, y * quantum])
  }
  return out
}

/** An SVG path for one shape in projected units, scaled by `k`. */
export function shapePath(rings: number[][], quantum: number, k = 100): string {
  let d = ''
  for (const ring of rings) {
    const pts = decodeRing(ring, quantum)
    pts.forEach(([lon, lat], i) => {
      const [x, y] = equalEarth(lon, lat)
      d += `${i === 0 ? 'M' : 'L'}${(x * k).toFixed(1)} ${(y * k).toFixed(1)}`
    })
    d += 'Z'
  }
  return d
}

export interface MapLayers {
  /** Border versions in force, drawn as states. */
  states: HistoryMapUnit[]
  /** Land drawn beneath the states: the 1886 world, for gaps in earlier layers. */
  silhouette: HistoryMapUnit[]
  /** True before 1886: borders outside Europe are the approximate early layer. */
  approximate: boolean
  /** True when no layer has borders for the year. */
  noBorders: boolean
}

/**
 * CShapes-Europe's first full year. Before it the set records only two
 * microstates (Liechtenstein from 1806, San Marino from 1811), so drawing it
 * would show an empty Europe instead of an unmapped one.
 */
export const EUROPE_FROM = 1816

const active = (u: HistoryMapUnit, year: number): boolean => u.from <= year && year < u.to

/** The units to draw for `year` (a decimal year). */
export function layersAt(data: Pick<HistoryBorders, 'units' | 'worldFrom'>, year: number): MapLayers {
  if (year >= data.worldFrom) {
    return { states: data.units.filter((u) => u.set === 'world' && active(u, year)), silhouette: [], approximate: false, noBorders: false }
  }
  // Before 1886: the early world layer (Cliopatria) underneath, CShapes-Europe on
  // top from 1816 (drawn later, so it also takes the pointer), over the 1886 land.
  const silhouette = data.units.filter((u) => u.set === 'world' && active(u, data.worldFrom))
  const early = data.units.filter((u) => u.set === 'early' && active(u, year))
  const europe = year >= EUROPE_FROM ? data.units.filter((u) => u.set === 'europe' && active(u, year)) : []
  const states = [...early, ...europe]
  return { states, silhouette, approximate: early.length > 0, noBorders: states.length === 0 }
}

/**
 * The whole years the borders cover. The end comes from the world set alone:
 * from 1886 only world units are drawn, so a later Europe version would leave
 * the map blank. `to` is exclusive and may be fractional (2019.999).
 */
export function bordersRange(data: Pick<HistoryBorders, 'units'>): { min: number; max: number } {
  let min = Infinity
  let max = -Infinity
  let worldMax = -Infinity
  for (const u of data.units) {
    min = Math.min(min, u.from)
    max = Math.max(max, u.to)
    if (u.set === 'world') worldMax = Math.max(worldMax, u.to)
  }
  return { min: Math.floor(min), max: Math.ceil(Number.isFinite(worldMax) ? worldMax : max) - 1 }
}

/** `year` held inside the covered span. */
export function clampYear(year: number, range: { min: number; max: number }): number {
  return Math.min(range.max, Math.max(range.min, year))
}

/** A stable, muted hue for a state, so its colour holds across border versions. */
export function stateHue(code: number): number {
  return (code * 137.508) % 360
}

/**
 * A state's outline in every border version its CShapes links cover: the unit
 * versions of the same set and code whose span meets the link's optional span.
 */
export function territoryOf(
  data: Pick<HistoryBorders, 'units' | 'shapes' | 'quantum'>,
  links: Array<{ set: 'world' | 'europe' | 'early'; code: number; from?: number; to?: number }>
): HistoryTerritory[] {
  const out: HistoryTerritory[] = []
  for (const u of data.units) {
    const link = links.find(
      (l) => l.set === u.set && l.code === u.code && (l.from === undefined || u.to > l.from) && (l.to === undefined || u.from < l.to)
    )
    if (!link) continue
    const rings = data.shapes[u.shape]
    let x0 = Infinity
    let y0 = Infinity
    let x1 = -Infinity
    let y1 = -Infinity
    for (const ring of rings) {
      for (const [lon, lat] of decodeRing(ring, data.quantum)) {
        const [x, y] = equalEarth(lon, lat)
        x0 = Math.min(x0, x * 100)
        x1 = Math.max(x1, x * 100)
        y0 = Math.min(y0, y * 100)
        y1 = Math.max(y1, y * 100)
      }
    }
    if (!Number.isFinite(x0)) continue
    out.push({
      from: Math.max(u.from, link.from ?? u.from),
      to: Math.min(u.to, link.to ?? u.to),
      path: shapePath(rings, data.quantum),
      box: [x0, y0, x1 - x0, y1 - y0]
    })
  }
  return out.sort((a, b) => a.from - b.from)
}
