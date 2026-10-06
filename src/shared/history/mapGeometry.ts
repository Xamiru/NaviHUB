// PURE: the History map's geometry — the Equal Earth projection, decoding of
// the delta-encoded CShapes outlines, and which border versions are drawn in a
// given year. CShapes-Europe starts in 1806 and the world set in 1886, so a year
// before 1886 draws Europe's borders over a silhouette of the 1886 world.

import type { HistoryBorders, HistoryMapUnit } from '../types'

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
  /** Land with no borders known for the year (outside Europe before 1886). */
  silhouette: HistoryMapUnit[]
  /** True when only Europe has borders for this year. */
  europeOnly: boolean
}

const active = (u: HistoryMapUnit, year: number): boolean => u.from <= year && year < u.to

/** The units to draw for `year` (a decimal year). */
export function layersAt(data: Pick<HistoryBorders, 'units' | 'worldFrom'>, year: number): MapLayers {
  if (year >= data.worldFrom) {
    return { states: data.units.filter((u) => u.set === 'world' && active(u, year)), silhouette: [], europeOnly: false }
  }
  const states = data.units.filter((u) => u.set === 'europe' && active(u, year))
  const silhouette = data.units.filter((u) => u.set === 'world' && active(u, data.worldFrom))
  return { states, silhouette, europeOnly: true }
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
