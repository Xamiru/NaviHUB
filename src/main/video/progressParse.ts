// Parsing ffmpeg's `-progress pipe:1` stream. Pure, so the gotchas below are
// testable without running ffmpeg.
//
// The output is key=value lines in blocks terminated by progress=continue or
// progress=end, e.g.
//   frame=124
//   fps=53.2
//   out_time_us=5170000
//   out_time_ms=5170000
//   out_time=00:00:05.170000
//   speed=2.13x
//   progress=continue

export interface FfProgress {
  // The three time keys are kept SEPARATE and the best one is chosen at read
  // time (see progressTime). Collapsing them on the way in needs per-block
  // precedence tracking, and the obvious "first writer wins" version quietly
  // freezes the clock after block one on any ffmpeg that omits out_time_us.
  outTimeUs: number | null
  outTimeMsKey: number | null
  outTimeClock: number | null
  frame: number | null
  fps: number | null
  speed: number | null
  totalSize: number | null
  ended: boolean
}

export function emptyProgress(): FfProgress {
  return {
    outTimeUs: null,
    outTimeMsKey: null,
    outTimeClock: null,
    frame: null,
    fps: null,
    speed: null,
    totalSize: null,
    ended: false
  }
}

function clock(raw: string): number | null {
  const m = /^(\d+):(\d{2}):(\d{2}(?:\.\d+)?)$/.exec(raw.trim())
  if (!m) return null
  const n = Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3])
  return Number.isFinite(n) ? n : null
}

function numeric(raw: string): number | null {
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : null
}

export function applyProgressLine(state: FfProgress, line: string): FfProgress {
  const eq = line.indexOf('=')
  if (eq === -1) return state
  const key = line.slice(0, eq).trim()
  const value = line.slice(eq + 1).trim()
  const next = { ...state }
  switch (key) {
    case 'out_time_us':
      next.outTimeUs = numeric(value)
      break
    case 'out_time_ms':
      // ffmpeg's long-standing quirk: DESPITE THE NAME, out_time_ms is
      // microseconds. Treating it as milliseconds makes every percentage and
      // ETA 1000× too large.
      next.outTimeMsKey = numeric(value)
      break
    case 'out_time':
      next.outTimeClock = clock(value)
      break
    case 'frame':
      next.frame = numeric(value)
      break
    case 'fps':
      next.fps = numeric(value)
      break
    case 'total_size':
      next.totalSize = numeric(value)
      break
    case 'speed':
      // "N/A" during startup and again at the very end.
      next.speed = value === 'N/A' ? null : numeric(value.replace(/x$/, ''))
      break
    case 'progress':
      next.ended = value === 'end'
      break
    default:
      break
  }
  return next
}

export function progressTime(state: FfProgress): number | null {
  if (state.outTimeUs != null) return state.outTimeUs / 1e6
  if (state.outTimeMsKey != null) return state.outTimeMsKey / 1e6
  return state.outTimeClock
}

export function progressPercent(state: FfProgress, durationSec: number | null): number | null {
  if (state.ended) return 100
  const t = progressTime(state)
  if (!durationSec || durationSec <= 0 || t == null) return null
  return Math.min(100, Math.max(0, (t / durationSec) * 100))
}

export function progressEta(state: FfProgress, durationSec: number | null): number | null {
  const t = progressTime(state)
  if (!durationSec || t == null || !state.speed || state.speed <= 0) return null
  const remaining = durationSec - t
  return remaining > 0 ? remaining / state.speed : 0
}
