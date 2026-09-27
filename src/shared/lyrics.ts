// LRC lyrics: "[mm:ss.xx]text" lines, several time tags per line allowed, plus
// metadata tags such as [ar:...] and [offset:+250] (milliseconds; positive shows
// lyrics earlier). Pure, so main (sidecar detection) and renderer share it.

export interface LyricLine {
  time: number // seconds
  text: string
}

const TIME_TAG = /\[(\d{1,3}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g
const OFFSET_TAG = /^\s*\[offset:\s*([+-]?\d+)\s*\]\s*$/i

export function parseLrc(source: string): LyricLine[] {
  let offset = 0
  const lines: LyricLine[] = []
  for (const raw of source.replace(/\r\n?/g, '\n').split('\n')) {
    const offsetMatch = OFFSET_TAG.exec(raw)
    if (offsetMatch) {
      offset = Number(offsetMatch[1]) / 1000
      continue
    }
    const times: number[] = []
    let rest = raw
    TIME_TAG.lastIndex = 0
    for (let match = TIME_TAG.exec(raw); match && match.index === raw.length - rest.length; match = TIME_TAG.exec(raw)) {
      const fraction = match[3] ? Number(match[3]) / 10 ** match[3].length : 0
      times.push(Number(match[1]) * 60 + Number(match[2]) + fraction)
      rest = raw.slice(TIME_TAG.lastIndex)
    }
    const text = rest.trim()
    for (const time of times) lines.push({ time: Math.max(0, time - offset), text })
  }
  // Stable: lines sharing a timestamp keep their file order.
  return lines.map((line, i) => ({ line, i })).sort((a, b) => a.line.time - b.line.time || a.i - b.i).map(({ line }) => line)
}

/** Index of the line being sung at `time`, or -1 before the first line. */
export function activeLyricIndex(lines: readonly LyricLine[], time: number): number {
  let low = 0
  let high = lines.length - 1
  let found = -1
  while (low <= high) {
    const mid = (low + high) >> 1
    if (lines[mid].time <= time) {
      found = mid
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return found
}

/** Synced lines back to LRC text, e.g. from embedded SYLT timestamps. */
export function formatLrc(lines: readonly LyricLine[]): string {
  return lines
    .map(({ time, text }) => {
      const minutes = Math.floor(time / 60)
      const seconds = time - minutes * 60
      return `[${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}]${text}`
    })
    .join('\n')
}
