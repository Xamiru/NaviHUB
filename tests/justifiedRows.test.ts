import { describe, expect, it } from 'vitest'
import { aspectOf, justifiedRows } from '../src/renderer/src/lib/justifiedRows'

// The Pictures gallery's row layout: full rows span the width exactly and keep
// each image's aspect ratio; the last row is never stretched.

const opts = { containerWidth: 1000, targetHeight: 200, gap: 10 }

describe('justifiedRows', () => {
  it('fills each full row to the container width at a shared height', () => {
    const rows = justifiedRows([16 / 9, 16 / 9, 16 / 9, 2 / 3, 1], opts)
    const [first] = rows
    expect(first.items).toEqual([0, 1, 2])
    const width = first.widths.reduce((a, b) => a + b, 0) + opts.gap * (first.items.length - 1)
    expect(width).toBeCloseTo(1000)
    expect(first.height).toBeLessThanOrEqual(200)
    first.items.forEach((i, j) => expect(first.widths[j] / first.height).toBeCloseTo(16 / 9))
  })

  it('keeps a short last row at the target height', () => {
    const rows = justifiedRows([16 / 9, 16 / 9, 16 / 9, 2 / 3], opts)
    const last = rows[rows.length - 1]
    expect(last.items).toEqual([3])
    expect(last.height).toBe(200)
  })

  it('covers every image exactly once, in order', () => {
    const aspects = Array.from({ length: 40 }, (_, i) => (i % 3 === 0 ? 2 / 3 : 16 / 9))
    const order = justifiedRows(aspects, opts).flatMap((r) => r.items)
    expect(order).toEqual(aspects.map((_, i) => i))
  })

  it('lays out nothing before the container has a width', () => {
    expect(justifiedRows([1, 1], { ...opts, containerWidth: 0 })).toEqual([])
  })
})

describe('aspectOf', () => {
  it('falls back by kind and clamps extremes', () => {
    expect(aspectOf(null, null, 'wallpaper')).toBeCloseTo(16 / 9)
    expect(aspectOf(null, 0, 'fanart')).toBeCloseTo(2 / 3)
    expect(aspectOf(10000, 1000, 'wallpaper')).toBe(3)
    expect(aspectOf(100, 1000, 'fanart')).toBe(0.4)
  })
})
