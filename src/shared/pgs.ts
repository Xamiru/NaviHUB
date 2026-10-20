// Blu-ray PGS (Presentation Graphic Stream) subtitles, as the .sup file ffmpeg
// writes with `-c:s copy -f sup`. Pure: no DOM, no electron, so the parser and
// the bitmap decoder are tested on bytes alone.
//
// A .sup file is a run of segments, each behind a 13-byte header: "PG", a
// 32-bit PTS and DTS on the 90 kHz clock, a type byte and a 16-bit size.
// Segments group into display sets (PCS first, END last). A set's picture
// stays on screen until the next set, and a set with no composition objects
// clears it. Objects and palettes persist inside an epoch, so a later set may
// reuse an object defined earlier (palette-only fades do exactly that).
//
// Parsing keeps each object's RLE bytes as views into the file; bitmaps are
// decoded only for the set on screen, because a whole episode decoded at
// 1080p would be hundreds of megabytes.

const SEG_PDS = 0x14
const SEG_ODS = 0x15
const SEG_PCS = 0x16
const SEG_WDS = 0x17
const SEG_END = 0x80

export interface PgsObject {
  width: number
  height: number
  rle: Uint8Array
}

export interface PgsPlacement {
  x: number
  y: number
  object: PgsObject
  // Source rectangle inside the object, when the composition crops it.
  crop: { x: number; y: number; width: number; height: number } | null
}

export interface PgsDisplaySet {
  start: number // seconds
  end: number // seconds; the next set's start, or Infinity for the last
  placements: PgsPlacement[]
  // 256 RGBA entries packed as Uint8 quads; entries the stream never defined
  // are fully transparent.
  palette: Uint8ClampedArray
}

export interface PgsTrack {
  width: number // presentation (video) size the coordinates refer to
  height: number
  sets: PgsDisplaySet[] // only sets that show something; sorted by start
}

interface Composition {
  objectId: number
  x: number
  y: number
  crop: PgsPlacement['crop']
}

interface PendingObject {
  width: number
  height: number
  chunks: Uint8Array[]
}

function u16(b: Uint8Array, i: number): number {
  return (b[i] << 8) | b[i + 1]
}

function u32(b: Uint8Array, i: number): number {
  return ((b[i] << 24) >>> 0) + ((b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3])
}

function concat(chunks: Uint8Array[]): Uint8Array {
  if (chunks.length === 1) return chunks[0]
  const out = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0))
  let at = 0
  for (const c of chunks) {
    out.set(c, at)
    at += c.length
  }
  return out
}

// Limited-range YCbCr to RGB. Blu-ray HD streams use BT.709; SD presentations
// (under 600 lines, DVD-sourced discs) use BT.601, as ffmpeg's decoder does.
export function ycbcrToRgb(
  y: number,
  cb: number,
  cr: number,
  hd: boolean
): [number, number, number] {
  const yy = 1.164 * (y - 16)
  const u = cb - 128
  const v = cr - 128
  const clamp = (n: number): number => Math.max(0, Math.min(255, Math.round(n)))
  if (hd) return [clamp(yy + 1.793 * v), clamp(yy - 0.213 * u - 0.533 * v), clamp(yy + 2.112 * u)]
  return [clamp(yy + 1.596 * v), clamp(yy - 0.392 * u - 0.813 * v), clamp(yy + 2.017 * u)]
}

export function parsePgs(bytes: Uint8Array): PgsTrack {
  let width = 0
  let height = 0
  const sets: PgsDisplaySet[] = []

  // Epoch state.
  const objects = new Map<number, PgsObject>()
  const pending = new Map<number, PendingObject>()
  const palettes = new Map<number, Uint8ClampedArray>()

  // The display set being read.
  let start = 0
  let paletteId = 0
  let compositions: Composition[] = []
  let inSet = false

  let i = 0
  while (i + 13 <= bytes.length) {
    if (bytes[i] !== 0x50 || bytes[i + 1] !== 0x47) {
      // Lost sync (a truncated or corrupt file): stop with what was read
      // rather than reading garbage as subtitles.
      break
    }
    const pts = u32(bytes, i + 2) / 90000
    const type = bytes[i + 10]
    const size = u16(bytes, i + 11)
    const body = i + 13
    if (body + size > bytes.length) break
    const seg = bytes.subarray(body, body + size)
    i = body + size

    if (type === SEG_PCS && seg.length >= 11) {
      width = u16(seg, 0) || width
      height = u16(seg, 2) || height
      const state = seg[7]
      if (state & 0x80) {
        // Epoch start: everything defined before is gone.
        objects.clear()
        pending.clear()
        palettes.clear()
      }
      paletteId = seg[9]
      const count = seg[10]
      compositions = []
      let at = 11
      for (let n = 0; n < count && at + 8 <= seg.length; n++) {
        const objectId = u16(seg, at)
        const cropped = (seg[at + 3] & 0x80) !== 0
        const x = u16(seg, at + 4)
        const y = u16(seg, at + 6)
        at += 8
        let crop: PgsPlacement['crop'] = null
        if (cropped && at + 8 <= seg.length) {
          crop = {
            x: u16(seg, at),
            y: u16(seg, at + 2),
            width: u16(seg, at + 4),
            height: u16(seg, at + 6)
          }
          at += 8
        }
        compositions.push({ objectId, x, y, crop })
      }
      start = pts
      inSet = true
    } else if (type === SEG_PDS && seg.length >= 2) {
      const id = seg[0]
      const palette = palettes.get(id) ?? new Uint8ClampedArray(256 * 4)
      const hd = height === 0 || height >= 600
      for (let at = 2; at + 5 <= seg.length; at += 5) {
        const entry = seg[at]
        const [r, g, b] = ycbcrToRgb(seg[at + 1], seg[at + 3], seg[at + 2], hd)
        palette[entry * 4] = r
        palette[entry * 4 + 1] = g
        palette[entry * 4 + 2] = b
        palette[entry * 4 + 3] = seg[at + 4]
      }
      palettes.set(id, palette)
    } else if (type === SEG_ODS && seg.length >= 4) {
      const id = u16(seg, 0)
      const flags = seg[3]
      if (flags & 0x80) {
        // First fragment: 24-bit data length, then width and height.
        if (seg.length < 11) continue
        pending.set(id, { width: u16(seg, 7), height: u16(seg, 9), chunks: [seg.subarray(11)] })
      } else {
        pending.get(id)?.chunks.push(seg.subarray(4))
      }
      if (flags & 0x40) {
        const p = pending.get(id)
        if (p) objects.set(id, { width: p.width, height: p.height, rle: concat(p.chunks) })
        pending.delete(id)
      }
    } else if (type === SEG_END && inSet) {
      inSet = false
      const palette = palettes.get(paletteId)
      const placements: PgsPlacement[] = []
      for (const c of compositions) {
        const object = objects.get(c.objectId)
        if (object && object.width > 0 && object.height > 0) {
          placements.push({ x: c.x, y: c.y, object, crop: c.crop })
        }
      }
      // A set always ends whatever was on screen, so it closes the previous
      // one even when it shows nothing itself.
      const last = sets[sets.length - 1]
      if (last && last.end === Infinity) last.end = start
      if (placements.length > 0 && palette) {
        // Palettes update in place across sets; each set keeps its own copy so
        // a later fade step cannot repaint an earlier one.
        sets.push({ start, end: Infinity, placements, palette: palette.slice() })
      }
    } else if (type === SEG_WDS) {
      // Windows only bound where objects may draw; placements already say where.
    }
  }

  sets.sort((a, b) => a.start - b.start)
  return { width, height, sets }
}

// Decodes one object's run-length bitmap into RGBA pixels. The encoding:
//   CCCCCCCC               one pixel of colour C (C != 0)
//   00000000 00000000      end of line
//   00000000 00LLLLLL      L pixels of colour 0
//   00000000 01LLLLLL LLLLLLLL            L pixels of colour 0
//   00000000 10LLLLLL CCCCCCCC            L pixels of colour C
//   00000000 11LLLLLL LLLLLLLL CCCCCCCC   L pixels of colour C
export function decodePgsObject(
  object: PgsObject,
  palette: Uint8ClampedArray
): Uint8ClampedArray<ArrayBuffer> {
  const { width, height, rle } = object
  const out = new Uint8ClampedArray(new ArrayBuffer(width * height * 4))
  let x = 0
  let y = 0
  let i = 0
  const put = (color: number, count: number): void => {
    if (y >= height) return
    const n = Math.min(count, width - x)
    if (n <= 0) return
    const a = palette[color * 4 + 3]
    if (a !== 0) {
      const r = palette[color * 4]
      const g = palette[color * 4 + 1]
      const b = palette[color * 4 + 2]
      let at = (y * width + x) * 4
      for (let k = 0; k < n; k++) {
        out[at] = r
        out[at + 1] = g
        out[at + 2] = b
        out[at + 3] = a
        at += 4
      }
    }
    x += n
  }
  while (i < rle.length && y < height) {
    const b = rle[i++]
    if (b !== 0) {
      put(b, 1)
      continue
    }
    if (i >= rle.length) break
    const flag = rle[i++]
    if (flag === 0) {
      x = 0
      y += 1
      continue
    }
    let length = flag & 0x3f
    if (flag & 0x40) {
      if (i >= rle.length) break
      length = (length << 8) | rle[i++]
    }
    let color = 0
    if (flag & 0x80) {
      if (i >= rle.length) break
      color = rle[i++]
    }
    put(color, length)
  }
  return out
}

// The set on screen at time t (seconds), by binary search over starts.
export function pgsSetAt(track: PgsTrack, t: number): number {
  const sets = track.sets
  let lo = 0
  let hi = sets.length - 1
  let found = -1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (sets[mid].start <= t) {
      found = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return found >= 0 && t < sets[found].end ? found : -1
}
