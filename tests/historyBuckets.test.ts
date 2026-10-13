import { describe, expect, it } from 'vitest'
import { bucketLabel, bucketOf, inBucket } from '../src/shared/history/buckets'

describe('History front pages', () => {
  it('reads modern history by decade', () => {
    expect(bucketOf(1979)).toEqual({ start: 1970, span: 10 })
    expect(bucketLabel(bucketOf(1722))).toBe('1720s')
    expect(bucketOf(1700)).toEqual({ start: 1700, span: 10 })
  })

  it('reads 1000-1699 by century', () => {
    expect(bucketOf(1699)).toEqual({ start: 1600, span: 100 })
    expect(bucketLabel(bucketOf(1514))).toBe('16th century')
    expect(bucketLabel(bucketOf(1001))).toBe('11th century')
  })

  it('reads earlier history by half-millennium, BCE as readers count it', () => {
    expect(bucketLabel(bucketOf(622))).toBe('500–999')
    expect(bucketLabel(bucketOf(224))).toBe('1–499')
    // 480 BCE is year -479; 1 BCE is year 0.
    expect(bucketLabel(bucketOf(-479))).toBe('500–1 BCE')
    expect(bucketLabel(bucketOf(0))).toBe('500–1 BCE')
    expect(bucketLabel(bucketOf(-549))).toBe('1000–501 BCE')
  })

  it('maps every year of a bucket back to the same bucket', () => {
    for (const year of [-3000, -501, -500, -499, 0, 1, 499, 500, 999, 1000, 1550, 1699, 1700, 1709, 2024]) {
      const b = bucketOf(year)
      expect(inBucket(b, year)).toBe(true)
      expect(bucketOf(b.start)).toEqual(b)
      expect(bucketOf(b.start + b.span - 1)).toEqual(b)
    }
  })
})
