import { describe, expect, it } from 'vitest'
import {
  bandLabels,
  clampView,
  densityBins,
  layoutLane,
  panView,
  ticks,
  viewAtLevel,
  yearToX,
  zoomLevel,
  zoomView,
  type LaneItem
} from '../src/shared/history/timelineLayout'

const B = { min: 1895, max: 2005, minSpan: 0.6 }
const measure = (s: string): number => s.length * 6.4 + 14

describe('timeline zoom model', () => {
  it('derives the semantic level from the visible span', () => {
    expect(zoomLevel({ s: 1900, e: 2000 })).toBe('century')
    expect(zoomLevel({ s: 1970, e: 1980 })).toBe('decade')
    expect(zoomLevel({ s: 1978, e: 1979.5 })).toBe('year')
  })

  it('clamps to the bounds and the narrowest span', () => {
    expect(clampView({ s: 1880, e: 1920 }, B)).toEqual({ s: 1895, e: 1935 })
    expect(clampView({ s: 1990, e: 2030 }, B)).toEqual({ s: 1965, e: 2005 })
    expect(clampView({ s: 1979, e: 1979.1 }, B).e - 1979).toBeCloseTo(0.6)
    expect(clampView({ s: 1800, e: 2100 }, B)).toEqual({ s: 1895, e: 2005 })
  })

  it('keeps the anchor year under the pointer while zooming', () => {
    const v = { s: 1900, e: 2000 }
    const z = zoomView(v, 0.5, B, 1950)
    expect(z).toEqual({ s: 1925, e: 1975 })
    const anchorBefore = (1960 - v.s) / (v.e - v.s)
    const z2 = zoomView(v, 0.5, B, 1960)
    expect((1960 - z2.s) / (z2.e - z2.s)).toBeCloseTo(anchorBefore)
  })

  it('pans and jumps to a level around the centre', () => {
    expect(panView({ s: 1900, e: 1950 }, 10, B)).toEqual({ s: 1910, e: 1960 })
    expect(viewAtLevel({ s: 1900, e: 2000 }, 'decade', B)).toEqual({ s: 1945, e: 1955 })
  })
})

describe('ticks', () => {
  it('labels decades on the century view with majors every fifty years', () => {
    const t = ticks({ s: 1900, e: 2000 }, 1000)
    expect(t[0]).toMatchObject({ year: 1900, label: '1900s', major: true, x: 0 })
    expect(t.filter((x) => x.major).map((x) => x.year)).toEqual([1900, 1950, 2000])
    expect(t).toHaveLength(11)
  })

  it('labels quarters on the year view', () => {
    const t = ticks({ s: 1978, e: 1979 }, 400)
    expect(t.map((x) => x.label)).toEqual(['1978', 'Apr', 'Jul', 'Oct', '1979'])
  })
})

describe('lane packing', () => {
  const view = { s: 1970, e: 1980 }

  it('stacks overlapping labelled items on separate rows', () => {
    const items: LaneItem[] = [
      { key: 'a', label: 'Iranian Revolution', s: 1978, e: 1979.1, prominence: 1 },
      { key: 'b', label: 'Hostage crisis', s: 1979.8, e: 1981, prominence: 2 }
    ]
    const { placed, rows } = layoutLane(items, view, 1000, { measure })
    expect(rows).toBe(2)
    expect(placed.map((p) => [p.item.key, p.row, p.showLabel])).toEqual([
      ['a', 0, true],
      ['b', 1, true]
    ])
  })

  it('puts a label inside a bar wide enough for it', () => {
    const items: LaneItem[] = [{ key: 'w', label: 'Vietnam War', s: 1970, e: 1975, prominence: 1 }]
    expect(layoutLane(items, view, 1000, { measure }).placed[0].inside).toBe(true)
  })

  it('flips a label to the left at the right edge', () => {
    const items: LaneItem[] = [{ key: 'p', label: 'Fall of the Berlin Wall', s: 1979.9, prominence: 1 }]
    const p = layoutLane(items, view, 1000, { measure }).placed[0]
    expect(p.flip).toBe(true)
    expect(p.showLabel).toBe(true)
  })

  it('drops labels past the row limit and spills into an unlabelled row instead of overlapping', () => {
    const items: LaneItem[] = [1, 2, 3, 4].map((i) => ({
      key: `k${i}`,
      label: 'An event with a long label',
      s: 1975 + i * 0.01,
      prominence: 1 as const
    }))
    const free = layoutLane(items, view, 1000, { measure, maxRows: 3 })
    const unlabelled = free.placed.filter((p) => !p.showLabel)
    expect(unlabelled).toHaveLength(1)
    expect(unlabelled[0].row).toBe(3)
    expect(free.rows).toBe(4)
    const pinned = layoutLane(items, view, 1000, { measure, maxRows: 3, pinned: new Set(['k4']) })
    expect(pinned.placed.find((p) => p.item.key === 'k4')!.showLabel).toBe(true)
  })

  it('hides minor events on the century view', () => {
    const items: LaneItem[] = [
      { key: 'big', label: 'Big', s: 1950, prominence: 1 },
      { key: 'small', label: 'Small', s: 1951, prominence: 3 }
    ]
    const keys = layoutLane(items, { s: 1900, e: 2000 }, 1000, { measure }).placed.map((p) => p.item.key)
    expect(keys).toEqual(['big'])
  })
})

describe('minimap', () => {
  it('bins event starts and maps years to pixels', () => {
    const bins = densityBins([1901, 1903, 1907, 1999, 1850], 1900, 2000, 5)
    expect(bins).toHaveLength(20)
    expect(bins[0]).toEqual({ start: 1900, count: 2 })
    expect(bins[1].count).toBe(1)
    expect(bins[19].count).toBe(1)
    expect(yearToX(1950, { s: 1900, e: 2000 }, 1000)).toBe(500)
  })
})

describe('period band labels', () => {
  const measure = (label: string): number => label.length * 10

  it('labels a band only when its name fits inside it', () => {
    const shown = bandLabels([
      { key: 'wide', x0: 0, x1: 300, label: 'Long reign' },
      { key: 'narrow', x0: 400, x1: 450, label: 'Long reign' }
    ], measure)
    expect([...shown]).toEqual(['wide'])
  })

  it('keeps the enclosing period named when a nested one would overprint it', () => {
    // A 1834-1848 reign and a 1844-1848 movement inside it end at the same x:
    // both labels would sit at the right edge, so only the reign keeps one.
    const shown = bandLabels([
      { key: 'reign', x0: 100, x1: 400, label: 'Reign' },
      { key: 'movement', x0: 300, x1: 400, label: 'Movement' }
    ], measure)
    expect([...shown]).toEqual(['reign'])
  })

  it('labels adjacent bands whose names do not collide', () => {
    const shown = bandLabels([
      { key: 'a', x0: 0, x1: 200, label: 'First' },
      { key: 'b', x0: 200, x1: 400, label: 'Second' }
    ], measure)
    expect(shown).toEqual(new Set(['a', 'b']))
  })
})
