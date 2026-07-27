import { KANJIVG_SIZE } from './types'
import { polylineLength, samplePath, type Point } from './strokes'

// Judging a hand-drawn stroke against its KanjiVG reference.
//
// Deliberately NOT shape matching: what a learner gets wrong is stroke ORDER,
// stroke DIRECTION and where a stroke STARTS — not whether their 曲 curves
// exactly like the font. Strokes are checked one at a time in order, so stroke
// count and sequence are enforced structurally; this only has to answer "was
// that the stroke I asked for?" for the current one.

// Tolerances in KanjiVG's 109-unit space (a stroke spans ~90 units, so 30 is
// roughly a third of the glyph). Exported so the drill and its tests agree.
export const START_TOL = 30
export const END_TOL = 35
export const DIRECTION_TOL_DEG = 60
export const MIN_LENGTH_RATIO = 0.4
export const MAX_LENGTH_RATIO = 2.5

export type StrokeFailure = 'start' | 'direction' | 'length' | 'empty'

export interface StrokeVerdict {
  ok: boolean
  reason: StrokeFailure | null
}

// Maps canvas pixel coordinates into the 109x109 reference space.
export function normalizeStroke(points: Point[], canvasSize: number): Point[] {
  if (canvasSize <= 0) return points
  const k = KANJIVG_SIZE / canvasSize
  return points.map((p) => ({ x: p.x * k, y: p.y * k }))
}

function angleDeg(from: Point, to: Point): number {
  return (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI
}

function angleDelta(a: number, b: number): number {
  let d = Math.abs(a - b) % 360
  if (d > 180) d = 360 - d
  return d
}

// Judges one drawn stroke (canvas coordinates) against one reference path.
export function strokeVerdict(user: Point[], referencePath: string, canvasSize: number): StrokeVerdict {
  if (user.length < 2) return { ok: false, reason: 'empty' }
  const ref = samplePath(referencePath)
  if (ref.length < 2) return { ok: true, reason: null } // unparseable reference: don't punish

  const drawn = normalizeStroke(user, canvasSize)
  const uStart = drawn[0]
  const uEnd = drawn[drawn.length - 1]
  const rStart = ref[0]
  const rEnd = ref[ref.length - 1]

  if (Math.hypot(uStart.x - rStart.x, uStart.y - rStart.y) > START_TOL) {
    return { ok: false, reason: 'start' }
  }

  const refLen = polylineLength(ref)
  const userLen = polylineLength(drawn)
  // A dot-like reference stroke (へ, 点) has almost no length or direction to
  // compare — landing near its start is the whole test.
  const isDot = refLen < 6
  if (!isDot) {
    if (angleDelta(angleDeg(uStart, uEnd), angleDeg(rStart, rEnd)) > DIRECTION_TOL_DEG) {
      return { ok: false, reason: 'direction' }
    }
    if (Math.hypot(uEnd.x - rEnd.x, uEnd.y - rEnd.y) > END_TOL) {
      return { ok: false, reason: 'direction' }
    }
    const ratio = userLen / refLen
    if (ratio < MIN_LENGTH_RATIO || ratio > MAX_LENGTH_RATIO) {
      return { ok: false, reason: 'length' }
    }
  }
  return { ok: true, reason: null }
}

export function failureHint(reason: StrokeFailure | null): string {
  switch (reason) {
    case 'start':
      return 'Wrong starting point'
    case 'direction':
      return 'Wrong direction'
    case 'length':
      return 'Wrong length'
    case 'empty':
      return 'Draw a stroke'
    default:
      return ''
  }
}
