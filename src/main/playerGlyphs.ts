// Rasterized transport glyphs for the Windows taskbar thumbnail toolbar
// (BrowserWindow.setThumbarButtons wants nativeImages, and shipping binary
// icon assets for four monochrome shapes is silly). The shapes mirror
// components/PlayerIcons.tsx — same 16-unit geometry, scanline-filled here.
//
// Pure module on purpose (no electron import): playerBridge wraps the buffers
// with nativeImage.createFromBitmap, and tests exercise the rasterizer as-is.
// createFromBitmap reads RGBA on some platforms and BGRA on others; the glyphs
// are gray (R=G=B), so the ambiguity cannot show.

export type GlyphName = 'prev' | 'play' | 'pause' | 'next'

export const GLYPH_SIZE = 32

// Near-white, matching the app's light-on-dark chrome; Windows draws the
// thumbbar on a dark hover card in dark mode and re-tints on light themes.
const GLYPH_RGB = 230

// Shape predicates in the 16-unit viewBox space of PlayerIcons.tsx.

function inRect(x: number, y: number, x0: number, y0: number, w: number, h: number): boolean {
  return x >= x0 && x <= x0 + w && y >= y0 && y <= y0 + h
}

// Horizontal triangle: vertical edge at xEdge spanning [yTop, yBottom], apex at
// (xApex, midY). Works for both directions (xApex < xEdge or > xEdge).
function inTriangle(
  x: number,
  y: number,
  xEdge: number,
  xApex: number,
  yTop: number,
  yBottom: number
): boolean {
  const lo = Math.min(xEdge, xApex)
  const hi = Math.max(xEdge, xApex)
  if (x < lo || x > hi) return false
  const midY = (yTop + yBottom) / 2
  const halfSpan = ((yBottom - yTop) / 2) * (Math.abs(xApex - x) / Math.abs(xApex - xEdge))
  return Math.abs(y - midY) <= halfSpan
}

const SHAPES: Record<GlyphName, (x: number, y: number) => boolean> = {
  play: (x, y) => inTriangle(x, y, 5.5, 13.1, 3.1, 12.9),
  pause: (x, y) => inRect(x, y, 3.6, 3, 3.2, 10) || inRect(x, y, 9.2, 3, 3.2, 10),
  prev: (x, y) => inRect(x, y, 2.8, 3, 2.2, 10) || inTriangle(x, y, 13.2, 6.6, 3, 13),
  next: (x, y) => inTriangle(x, y, 2.8, 9.4, 3, 13) || inRect(x, y, 11, 3, 2.2, 10)
}

// 32x32 RGBA bitmap, 2x2-supersampled so the diagonals don't stair-step at
// taskbar size. Transparent outside the shape.
export function glyphBitmap(name: GlyphName): Buffer {
  const shape = SHAPES[name]
  const size = GLYPH_SIZE
  const scale = 16 / size // pixel space -> viewBox space
  const buf = Buffer.alloc(size * size * 4)
  const sub = [0.25, 0.75]
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let hits = 0
      for (const dy of sub) {
        for (const dx of sub) {
          if (shape((px + dx) * scale, (py + dy) * scale)) hits++
        }
      }
      if (hits === 0) continue
      const o = (py * size + px) * 4
      buf[o] = GLYPH_RGB
      buf[o + 1] = GLYPH_RGB
      buf[o + 2] = GLYPH_RGB
      buf[o + 3] = Math.round((hits / 4) * 255)
    }
  }
  return buf
}
