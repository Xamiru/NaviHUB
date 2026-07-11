import { describe, expect, it } from 'vitest'
import { parseByteRange } from '../src/main/httpRange'

describe('parseByteRange', () => {
  it('serves whole file when no header', () => {
    expect(parseByteRange(null, 1000)).toBeNull()
  })

  it('parses an open-ended range (Chromium media probe)', () => {
    expect(parseByteRange('bytes=0-', 1000)).toEqual({ start: 0, end: 999 })
    expect(parseByteRange('bytes=500-', 1000)).toEqual({ start: 500, end: 999 })
  })

  it('parses a bounded range and clamps end to the file size', () => {
    expect(parseByteRange('bytes=0-499', 1000)).toEqual({ start: 0, end: 499 })
    expect(parseByteRange('bytes=200-99999', 1000)).toEqual({ start: 200, end: 999 })
  })

  it('parses the suffix form (last N bytes — how moov atoms get read)', () => {
    expect(parseByteRange('bytes=-100', 1000)).toEqual({ start: 900, end: 999 })
    expect(parseByteRange('bytes=-5000', 1000)).toEqual({ start: 0, end: 999 })
  })

  it('flags unsatisfiable ranges for a 416', () => {
    expect(parseByteRange('bytes=1000-', 1000)).toBe('unsatisfiable')
    expect(parseByteRange('bytes=800-700', 1000)).toBe('unsatisfiable')
    expect(parseByteRange('bytes=-0', 1000)).toBe('unsatisfiable')
    expect(parseByteRange('bytes=0-', 0)).toBe('unsatisfiable')
  })

  it('ignores malformed or multi-range headers (whole file, not an error)', () => {
    expect(parseByteRange('bytes=abc-def', 1000)).toBeNull()
    expect(parseByteRange('bytes=0-1,5-9', 1000)).toBeNull()
    expect(parseByteRange('items=0-10', 1000)).toBeNull()
    expect(parseByteRange('bytes=-', 1000)).toBeNull()
  })
})
