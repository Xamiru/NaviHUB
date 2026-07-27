// Pure geometry helpers for KanjiVG stroke paths, shared by the stroke-order
// diagram (number badge placement) and the writing drill's matcher (sampling
// reference strokes). Everything works in KanjiVG's 109x109 space; no DOM, so
// both the renderer and the tests can use them.

export interface Point {
  x: number
  y: number
}

// One parsed path command, already resolved to absolute coordinates.
interface Seg {
  kind: 'move' | 'line' | 'cubic'
  points: Point[] // line: [end]; cubic: [c1, c2, end]; move: [to]
}

const NUM = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g

// KanjiVG uses M/m, C/c, S/s exclusively, but L/l/H/V/Z appear in hand-edited
// files and other sources — parse them too rather than silently dropping a
// stroke's tail.
function parsePath(d: string): Seg[] {
  const segs: Seg[] = []
  const tokens = d.match(/[MmLlHhVvCcSsZz]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g)
  if (!tokens) return segs
  let cur: Point = { x: 0, y: 0 }
  let start: Point = { x: 0, y: 0 }
  let prevCtrl: Point | null = null
  let cmd = ''
  let i = 0
  const num = (): number => Number(tokens[i++])
  while (i < tokens.length) {
    // Every iteration MUST consume at least one token. A malformed path (a
    // stray coordinate after Z, an unhandled command) would otherwise spin
    // forever — and this runs per drawn stroke in the writing drill, so a hang
    // here freezes the app with no way out.
    const before = i
    const tok = tokens[i]
    if (/[MmLlHhVvCcSsZz]/.test(tok)) {
      cmd = tok
      i++
    }
    const rel = cmd === cmd.toLowerCase()
    switch (cmd.toUpperCase()) {
      case 'M': {
        const x = num()
        const y = num()
        cur = rel ? { x: cur.x + x, y: cur.y + y } : { x, y }
        start = cur
        segs.push({ kind: 'move', points: [cur] })
        prevCtrl = null
        // Subsequent coordinate pairs after a moveto are implicit linetos.
        cmd = rel ? 'l' : 'L'
        break
      }
      case 'L': {
        const x = num()
        const y = num()
        cur = rel ? { x: cur.x + x, y: cur.y + y } : { x, y }
        segs.push({ kind: 'line', points: [cur] })
        prevCtrl = null
        break
      }
      case 'H': {
        const x = num()
        cur = { x: rel ? cur.x + x : x, y: cur.y }
        segs.push({ kind: 'line', points: [cur] })
        prevCtrl = null
        break
      }
      case 'V': {
        const y = num()
        cur = { x: cur.x, y: rel ? cur.y + y : y }
        segs.push({ kind: 'line', points: [cur] })
        prevCtrl = null
        break
      }
      case 'C': {
        const x1 = num()
        const y1 = num()
        const x2 = num()
        const y2 = num()
        const x = num()
        const y = num()
        const c1 = rel ? { x: cur.x + x1, y: cur.y + y1 } : { x: x1, y: y1 }
        const c2 = rel ? { x: cur.x + x2, y: cur.y + y2 } : { x: x2, y: y2 }
        const end = rel ? { x: cur.x + x, y: cur.y + y } : { x, y }
        segs.push({ kind: 'cubic', points: [c1, c2, end] })
        prevCtrl = c2
        cur = end
        break
      }
      case 'S': {
        const x2 = num()
        const y2 = num()
        const x = num()
        const y = num()
        // Smooth cubic: first control point mirrors the previous one.
        const c1 = prevCtrl ? { x: 2 * cur.x - prevCtrl.x, y: 2 * cur.y - prevCtrl.y } : cur
        const c2 = rel ? { x: cur.x + x2, y: cur.y + y2 } : { x: x2, y: y2 }
        const end = rel ? { x: cur.x + x, y: cur.y + y } : { x, y }
        segs.push({ kind: 'cubic', points: [c1, c2, end] })
        prevCtrl = c2
        cur = end
        break
      }
      case 'Z': {
        cur = start
        segs.push({ kind: 'line', points: [cur] })
        prevCtrl = null
        // closepath takes no arguments and nothing may repeat it implicitly;
        // clearing cmd sends any stray coordinate to `default` to be skipped.
        cmd = ''
        break
      }
      default:
        i++ // unknown command: skip the token and keep going
    }
    if (Number.isNaN(cur.x) || Number.isNaN(cur.y)) return segs
    if (i === before) i++ // backstop: guarantee forward progress
  }
  return segs
}

function cubicAt(p0: Point, c1: Point, c2: Point, p1: Point, t: number): Point {
  const mt = 1 - t
  const a = mt * mt * mt
  const b = 3 * mt * mt * t
  const c = 3 * mt * t * t
  const d = t * t * t
  return {
    x: a * p0.x + b * c1.x + c * c2.x + d * p1.x,
    y: a * p0.y + b * c1.y + c * c2.y + d * p1.y
  }
}

// The stroke's starting point — where KanjiVG's own stroke-number badges sit.
export function pathStart(d: string): Point | null {
  const m = d.match(/^\s*[Mm]\s*(-?[\d.]+)[,\s]+(-?[\d.]+)/)
  if (!m) return null
  const x = Number(m[1])
  const y = Number(m[2])
  return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null
}

// Samples a path into `n` evenly-indexed points (by segment, not arc length —
// close enough for direction/endpoint comparison and much cheaper).
export function samplePath(d: string, n = 24): Point[] {
  const segs = parsePath(d)
  if (segs.length === 0) return []
  const drawable: { from: Point; seg: Seg }[] = []
  let cur: Point | null = null
  for (const seg of segs) {
    if (seg.kind === 'move') {
      cur = seg.points[0]
      continue
    }
    if (!cur) continue
    drawable.push({ from: cur, seg })
    cur = seg.points[seg.points.length - 1]
  }
  if (drawable.length === 0) {
    const only = segs.find((s) => s.kind === 'move')
    return only ? [only.points[0]] : []
  }
  const per = Math.max(2, Math.ceil(n / drawable.length))
  const out: Point[] = []
  for (const { from, seg } of drawable) {
    for (let i = 1; i <= per; i++) {
      const t = i / per
      if (seg.kind === 'line') {
        const to = seg.points[0]
        out.push({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t })
      } else {
        out.push(cubicAt(from, seg.points[0], seg.points[1], seg.points[2], t))
      }
    }
  }
  return [drawable[0].from, ...out]
}

// Total polyline length of a point list (used for the length-ratio check).
export function polylineLength(points: Point[]): number {
  let total = 0
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
  }
  return total
}
