import { describe, expect, it } from 'vitest'
import { GLYPH_SIZE, glyphBitmap, type GlyphName } from '../src/main/playerGlyphs'

const NAMES: GlyphName[] = ['prev', 'play', 'pause', 'next']

function opaquePixels(buf: Buffer): number {
  let n = 0
  for (let o = 3; o < buf.length; o += 4) if (buf[o] > 0) n++
  return n
}

describe('glyphBitmap', () => {
  it('produces a full RGBA buffer for every glyph', () => {
    for (const name of NAMES) {
      expect(glyphBitmap(name).length).toBe(GLYPH_SIZE * GLYPH_SIZE * 4)
    }
  })

  it('draws something for every glyph, but never fills the whole tile', () => {
    const total = GLYPH_SIZE * GLYPH_SIZE
    for (const name of NAMES) {
      const filled = opaquePixels(glyphBitmap(name))
      // A transport glyph occupies a recognizable chunk of the tile, and the
      // tile keeps transparent margins (a solid square means a broken shape).
      expect(filled, name).toBeGreaterThan(total * 0.05)
      expect(filled, name).toBeLessThan(total * 0.8)
    }
  })

  it('is monochrome gray (R=G=B) so BGRA-vs-RGBA byte order cannot matter', () => {
    for (const name of NAMES) {
      const buf = glyphBitmap(name)
      for (let o = 0; o < buf.length; o += 4) {
        if (buf[o + 3] === 0) {
          expect(buf[o] | buf[o + 1] | buf[o + 2]).toBe(0)
        } else {
          expect(buf[o]).toBe(buf[o + 1])
          expect(buf[o + 1]).toBe(buf[o + 2])
        }
      }
    }
  })

  it('play and pause are distinct shapes', () => {
    expect(glyphBitmap('play').equals(glyphBitmap('pause'))).toBe(false)
  })

  it('prev and next mirror each other horizontally', () => {
    const prev = glyphBitmap('prev')
    const next = glyphBitmap('next')
    let mismatches = 0
    for (let y = 0; y < GLYPH_SIZE; y++) {
      for (let x = 0; x < GLYPH_SIZE; x++) {
        const a = prev[(y * GLYPH_SIZE + x) * 4 + 3]
        const b = next[(y * GLYPH_SIZE + (GLYPH_SIZE - 1 - x)) * 4 + 3]
        if (a !== b) mismatches++
      }
    }
    // Sub-pixel sampling keeps a perfect mirror from being guaranteed, but the
    // shapes are geometric mirrors — allow only a sliver of edge disagreement.
    expect(mismatches).toBeLessThan(GLYPH_SIZE * GLYPH_SIZE * 0.02)
  })
})
