import { describe, expect, it } from 'vitest'
import { bordersRange, clampYear, decodeRing, equalEarth, layersAt, shapePath } from '../src/shared/history/mapGeometry'
import type { HistoryMapUnit } from '../src/shared/types'

// The History map's pure geometry: the Equal Earth projection, the decoding of
// build-history-borders.cjs output, and which CShapes versions a year draws.

const unit = (over: Partial<HistoryMapUnit>): HistoryMapUnit => ({
  set: 'world',
  name: 'X',
  code: 1,
  from: 1886,
  to: 2020,
  shape: 0,
  label: [0, 0],
  capital: null,
  capitalAt: null,
  ...over
})

describe('Equal Earth projection', () => {
  it('puts the origin at the centre, keeps the hemispheres apart and is symmetric', () => {
    expect(equalEarth(0, 0)).toEqual([0, -0])
    const [xe] = equalEarth(90, 0)
    const [xw] = equalEarth(-90, 0)
    expect(xe).toBeCloseTo(-xw, 9)
    // North is up: a northern point has a smaller (negative) y.
    expect(equalEarth(0, 45)[1]).toBeLessThan(0)
    expect(equalEarth(0, -45)[1]).toBeGreaterThan(0)
    // The published extent: x about 2.7066 at the antimeridian, y about 1.3173 at the pole.
    expect(equalEarth(180, 0)[0]).toBeCloseTo(2.7066, 3)
    expect(-equalEarth(0, 90)[1]).toBeCloseTo(1.3173, 3)
  })
})

describe('border decoding', () => {
  it('decodes delta-encoded integer rings at the stored quantum', () => {
    // (51.40, 35.70) then +0.10 lon, then -0.20 lat.
    expect(decodeRing([5140, 3570, 10, 0, 0, -20], 0.01)).toEqual([
      [51.4, 35.7],
      [51.5, 35.7],
      [51.5, 35.5]
    ])
    expect(shapePath([[0, 0, 100, 0, 0, 100]], 0.01)).toMatch(/^M0\.0 -?0\.0L.+L.+Z$/)
  })
})

describe('layers for a year', () => {
  const units = [
    unit({ name: 'Persia', code: 630, from: 1886, to: 1925 }),
    unit({ name: 'Iran', code: 630, from: 1925, to: 2020 }),
    unit({ set: 'europe', name: 'Bavaria', code: 245, from: 1816, to: 1871 }),
    unit({ set: 'europe', name: 'Germany', code: 255, from: 1871, to: 1946 })
  ]
  const data = { units, worldFrom: 1886 }

  it('draws the world set from 1886, one version per state', () => {
    expect(layersAt(data, 1900).states.map((u) => u.name)).toEqual(['Persia'])
    expect(layersAt(data, 1930).states.map((u) => u.name)).toEqual(['Iran'])
    expect(layersAt(data, 1930).approximate).toBe(false)
  })

  it('draws Europe only before 1886, over the 1886 world as a silhouette', () => {
    const l = layersAt(data, 1850)
    expect(l.states.map((u) => u.name)).toEqual(['Bavaria'])
    expect(l.silhouette.map((u) => u.name)).toEqual(['Persia'])
    expect(l.approximate).toBe(false)
    expect(layersAt(data, 1880).states.map((u) => u.name)).toEqual(['Germany'])
  })

  it('draws no borders before CShapes-Europe is complete', () => {
    const early = layersAt({ units: [...units, unit({ set: 'europe', name: 'Liechtenstein', code: 223, from: 1806, to: 2020 })], worldFrom: 1886 }, 1810)
    expect(early.states).toEqual([])
    expect(early.noBorders).toBe(true)
    expect(early.silhouette.map((u) => u.name)).toEqual(['Persia'])
    expect(layersAt(data, 1850).noBorders).toBe(false)
  })

  it('draws the early world layer beneath Europe before 1886', () => {
    const withEarly = {
      units: [...units, unit({ set: 'early', name: 'Qajar Dynasty', code: 630, from: 1800, to: 1886 })],
      worldFrom: 1886
    }
    const l = layersAt(withEarly, 1850)
    expect(l.states.map((u) => u.name)).toEqual(['Qajar Dynasty', 'Bavaria'])
    expect(l.approximate).toBe(true)
    expect(layersAt(withEarly, 1810).states.map((u) => u.name)).toEqual(['Qajar Dynasty'])
    expect(layersAt(withEarly, 1900).states.map((u) => u.name)).toEqual(['Persia'])
  })

  it('reports the span of years covered', () => {
    expect(bordersRange(data)).toEqual({ min: 1816, max: 2019 })
  })

  it('ends the span where the world set ends, not at a later Europe version', () => {
    const later = {
      units: [
        unit({ name: 'Iran', code: 630, from: 1886, to: 2019.999 }),
        unit({ set: 'europe', name: 'Germany', code: 255, from: 1816, to: 2024 })
      ]
    }
    const range = bordersRange(later)
    expect(range).toEqual({ min: 1816, max: 2019 })
    expect(layersAt({ ...later, worldFrom: 1886 }, range.max + 0.5).states.map((u) => u.name)).toEqual(['Iran'])
    expect(clampYear(2024, range)).toBe(2019)
    expect(clampYear(1801, range)).toBe(1816)
    expect(clampYear(1900, range)).toBe(1900)
  })
})
