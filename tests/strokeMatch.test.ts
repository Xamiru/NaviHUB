import { describe, expect, it } from 'vitest'
import { KANJIVG_SIZE } from '../src/shared/types'
import { samplePath, type Point } from '../src/shared/strokes'
import { normalizeStroke, START_TOL, strokeVerdict } from '../src/shared/strokeMatch'

// Real KanjiVG paths (109x109 space): 一's single horizontal stroke, and 十's
// horizontal-then-vertical pair.
const ICHI =
  'M11,54.25c3.19,0.62,6.25,0.75,9.66,0.5c20.34-1.5,50.21-4.87,68.34-5.5c3.42-0.12,6.75,0,10.5,0.5'
const JUU_VERTICAL =
  'M50.25,10.75c1.5,1,2.25,3.25,2.25,5.5c0,15.75,0.25,60.25,0.25,72.5c0,12.25,0.5,15.25-1,3.75'

const CANVAS = 260

// Draws a straight stroke in canvas pixels between two reference-space points.
function drawn(from: Point, to: Point, steps = 12): Point[] {
  const k = CANVAS / KANJIVG_SIZE
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps
    return { x: (from.x + (to.x - from.x) * t) * k, y: (from.y + (to.y - from.y) * t) * k }
  })
}

function endpoints(path: string): { start: Point; end: Point } {
  const pts = samplePath(path)
  return { start: pts[0], end: pts[pts.length - 1] }
}

describe('normalizeStroke', () => {
  it('maps canvas pixels into the 109-unit reference space', () => {
    const pts = normalizeStroke([{ x: 0, y: 0 }, { x: CANVAS, y: CANVAS }], CANVAS)
    expect(pts[0]).toEqual({ x: 0, y: 0 })
    expect(pts[1].x).toBeCloseTo(KANJIVG_SIZE, 5)
  })

  it('leaves points alone for a zero-size canvas', () => {
    expect(normalizeStroke([{ x: 5, y: 5 }], 0)).toEqual([{ x: 5, y: 5 }])
  })
})

describe('strokeVerdict', () => {
  it('accepts a stroke drawn along the reference', () => {
    const { start, end } = endpoints(ICHI)
    expect(strokeVerdict(drawn(start, end), ICHI, CANVAS)).toEqual({ ok: true, reason: null })
  })

  it('accepts a sloppy but recognisable stroke', () => {
    const { start, end } = endpoints(ICHI)
    const wobbly = drawn({ x: start.x + 8, y: start.y - 9 }, { x: end.x - 10, y: end.y + 8 })
    expect(strokeVerdict(wobbly, ICHI, CANVAS).ok).toBe(true)
  })

  it('rejects a stroke drawn backwards', () => {
    const { start, end } = endpoints(ICHI)
    // Right-to-left: it starts where the stroke should end.
    expect(strokeVerdict(drawn(end, start), ICHI, CANVAS)).toEqual({ ok: false, reason: 'start' })
  })

  it('rejects the right direction from the wrong place', () => {
    const { start, end } = endpoints(ICHI)
    const shifted = drawn({ x: start.x, y: start.y + 45 }, { x: end.x, y: end.y + 45 })
    expect(strokeVerdict(shifted, ICHI, CANVAS)).toEqual({ ok: false, reason: 'start' })
  })

  it('rejects the wrong direction from the right place (vertical vs horizontal)', () => {
    const { start } = endpoints(ICHI)
    const downward = drawn(start, { x: start.x + 4, y: start.y + 70 })
    expect(strokeVerdict(downward, ICHI, CANVAS).ok).toBe(false)
    expect(strokeVerdict(downward, ICHI, CANVAS).reason).toBe('direction')
  })

  it('rejects a stroke that stops far short', () => {
    const { start, end } = endpoints(ICHI)
    const stub = drawn(start, { x: start.x + (end.x - start.x) * 0.25, y: start.y })
    expect(strokeVerdict(stub, ICHI, CANVAS).ok).toBe(false)
  })

  it('judges the vertical stroke of 十 on its own terms', () => {
    const { start, end } = endpoints(JUU_VERTICAL)
    expect(strokeVerdict(drawn(start, end), JUU_VERTICAL, CANVAS).ok).toBe(true)
    // The horizontal stroke of 一 must not pass as 十's vertical one.
    const ichi = endpoints(ICHI)
    expect(strokeVerdict(drawn(ichi.start, ichi.end), JUU_VERTICAL, CANVAS).ok).toBe(false)
  })

  it('needs at least two points', () => {
    expect(strokeVerdict([{ x: 10, y: 10 }], ICHI, CANVAS)).toEqual({ ok: false, reason: 'empty' })
    expect(strokeVerdict([], ICHI, CANVAS)).toEqual({ ok: false, reason: 'empty' })
  })

  it('does not punish the learner for an unparseable reference', () => {
    const { start, end } = endpoints(ICHI)
    expect(strokeVerdict(drawn(start, end), 'not a path', CANVAS)).toEqual({ ok: true, reason: null })
  })

  it('keeps the start tolerance meaningfully smaller than the glyph', () => {
    expect(START_TOL).toBeLessThan(KANJIVG_SIZE / 2)
  })
})
