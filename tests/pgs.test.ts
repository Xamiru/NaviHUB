import { describe, expect, it } from 'vitest'
import { decodePgsObject, parsePgs, pgsSetAt, ycbcrToRgb } from '../src/shared/pgs'

// A tiny .sup writer, so every case is built from the segment layout ffmpeg
// writes: "PG", PTS, DTS (90 kHz), type, 16-bit size, body.
function segment(ptsSec: number, type: number, body: number[]): number[] {
  const pts = Math.round(ptsSec * 90000)
  const u32 = [(pts >>> 24) & 255, (pts >>> 16) & 255, (pts >>> 8) & 255, pts & 255]
  return [0x50, 0x47, ...u32, ...u32, type, (body.length >> 8) & 255, body.length & 255, ...body]
}
const u16 = (n: number): number[] => [(n >> 8) & 255, n & 255]

function pcs(
  pts: number,
  objects: { id: number; x: number; y: number }[],
  opts: { epochStart?: boolean; palette?: number; size?: [number, number] } = {}
): number[] {
  const [w, h] = opts.size ?? [1920, 1080]
  const body = [
    ...u16(w),
    ...u16(h),
    0x10,
    ...u16(0),
    opts.epochStart === false ? 0x00 : 0x80,
    0x00,
    opts.palette ?? 0,
    objects.length
  ]
  for (const o of objects) body.push(...u16(o.id), 0, 0x00, ...u16(o.x), ...u16(o.y))
  return segment(pts, 0x16, body)
}
// Entries as [index, Y, Cr, Cb, alpha].
const pds = (pts: number, entries: number[][], id = 0): number[] =>
  segment(pts, 0x14, [id, 0, ...entries.flat()])
function ods(pts: number, id: number, width: number, height: number, rle: number[]): number[] {
  const length = rle.length + 4
  return segment(pts, 0x15, [
    ...u16(id),
    0,
    0xc0,
    (length >> 16) & 255,
    (length >> 8) & 255,
    length & 255,
    ...u16(width),
    ...u16(height),
    ...rle
  ])
}
const end = (pts: number): number[] => segment(pts, 0x80, [])
const sup = (...parts: number[][]): Uint8Array => new Uint8Array(parts.flat())

// White (Y 235) fully opaque at index 1; index 0 left undefined (transparent).
const WHITE = [1, 235, 128, 128, 255]

describe('parsePgs', () => {
  it('times each set until the next one and drops clearing sets', () => {
    const track = parsePgs(
      sup(
        pcs(1, [{ id: 0, x: 10, y: 20 }]),
        pds(1, [WHITE]),
        ods(1, 0, 2, 1, [1, 1, 0, 0]),
        end(1),
        pcs(3.5, [], { epochStart: false }),
        end(3.5)
      )
    )
    expect(track.width).toBe(1920)
    expect(track.height).toBe(1080)
    expect(track.sets).toHaveLength(1)
    expect(track.sets[0].start).toBe(1)
    expect(track.sets[0].end).toBe(3.5)
    expect(track.sets[0].placements[0]).toMatchObject({ x: 10, y: 20 })
    expect(pgsSetAt(track, 0.5)).toBe(-1)
    expect(pgsSetAt(track, 2)).toBe(0)
    expect(pgsSetAt(track, 3.5)).toBe(-1)
  })

  it('reuses an object defined earlier in the epoch and keeps each set its own palette', () => {
    const track = parsePgs(
      sup(
        pcs(1, [{ id: 0, x: 0, y: 0 }]),
        pds(1, [WHITE]),
        ods(1, 0, 1, 1, [1, 0, 0]),
        end(1),
        // A fade step: a new palette, no new object.
        pcs(2, [{ id: 0, x: 0, y: 0 }], { epochStart: false }),
        pds(2, [[1, 235, 128, 128, 128]]),
        end(2)
      )
    )
    expect(track.sets).toHaveLength(2)
    expect(track.sets[0].end).toBe(2)
    expect(track.sets[1].placements[0].object).toBe(track.sets[0].placements[0].object)
    expect(track.sets[0].palette[7]).toBe(255)
    expect(track.sets[1].palette[7]).toBe(128)
  })

  it('forgets objects at an epoch start', () => {
    const track = parsePgs(
      sup(
        pcs(1, [{ id: 0, x: 0, y: 0 }]),
        pds(1, [WHITE]),
        ods(1, 0, 1, 1, [1, 0, 0]),
        end(1),
        // References object 0 but starts a new epoch without defining it.
        pcs(2, [{ id: 0, x: 0, y: 0 }]),
        pds(2, [WHITE]),
        end(2)
      )
    )
    expect(track.sets).toHaveLength(1)
    expect(track.sets[0].end).toBe(2)
  })

  it('joins an object split over several ODS fragments', () => {
    const first = segment(1, 0x15, [...u16(0), 0, 0x80, 0, 0, 7, ...u16(3), ...u16(1), 1])
    const last = segment(1, 0x15, [...u16(0), 0, 0x40, 1, 1, 0, 0])
    const track = parsePgs(sup(pcs(1, [{ id: 0, x: 0, y: 0 }]), pds(1, [WHITE]), first, last, end(1)))
    const object = track.sets[0].placements[0].object
    expect(object.width).toBe(3)
    const px = decodePgsObject(object, track.sets[0].palette)
    expect([px[3], px[7], px[11]]).toEqual([255, 255, 255])
  })

  it('stops at lost sync instead of reading garbage', () => {
    const good = sup(pcs(1, [{ id: 0, x: 0, y: 0 }]), pds(1, [WHITE]), ods(1, 0, 1, 1, [1, 0, 0]), end(1))
    const bytes = new Uint8Array([...good, 0x00, 0x11, 0x22, ...new Array(20).fill(0)])
    expect(parsePgs(bytes).sets).toHaveLength(1)
    expect(parsePgs(new Uint8Array(0)).sets).toEqual([])
  })
})

describe('decodePgsObject', () => {
  const palette = new Uint8ClampedArray(256 * 4)
  palette.set([255, 0, 0, 255], 1 * 4)
  palette.set([0, 0, 255, 255], 2 * 4)
  const alphaAt = (px: Uint8ClampedArray, i: number): number => px[i * 4 + 3]
  const redAt = (px: Uint8ClampedArray, i: number): number => px[i * 4]

  it('decodes all four run forms and line ends', () => {
    // Row 0 (width 6): one pixel of 1, 2 transparent, 3 pixels of 2 (short run).
    // Row 1: 70 pixels of 1 (long run, clipped to the width).
    const rle = [1, 0, 0x02, 0, 0x80 | 3, 2, 0, 0, 0, 0xc0 | 0, 70, 1, 0, 0]
    const px = decodePgsObject({ width: 6, height: 2, rle: new Uint8Array(rle) }, palette)
    expect(redAt(px, 0)).toBe(255)
    expect(alphaAt(px, 1)).toBe(0)
    expect(alphaAt(px, 2)).toBe(0)
    expect([px[3 * 4 + 2], px[5 * 4 + 2]]).toEqual([255, 255])
    for (let i = 6; i < 12; i++) expect(redAt(px, i)).toBe(255)
  })

  it('decodes a long transparent run', () => {
    const rle = [0, 0x40 | 0, 4, 1, 0, 0]
    const px = decodePgsObject({ width: 5, height: 1, rle: new Uint8Array(rle) }, palette)
    expect([0, 1, 2, 3].map((i) => alphaAt(px, i))).toEqual([0, 0, 0, 0])
    expect(redAt(px, 4)).toBe(255)
  })

  it('survives truncated data', () => {
    const px = decodePgsObject({ width: 4, height: 4, rle: new Uint8Array([1, 0]) }, palette)
    expect(px).toHaveLength(64)
    expect(redAt(px, 0)).toBe(255)
  })
})

describe('ycbcrToRgb', () => {
  it('maps limited-range white, black and BT.709 red', () => {
    expect(ycbcrToRgb(235, 128, 128, true)).toEqual([255, 255, 255])
    expect(ycbcrToRgb(16, 128, 128, true)).toEqual([0, 0, 0])
    const [r, g, b] = ycbcrToRgb(63, 102, 240, true)
    expect(r).toBeGreaterThan(250)
    expect(g).toBeLessThan(5)
    expect(b).toBeLessThan(5)
  })
})
