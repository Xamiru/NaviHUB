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

// ---------------------------------------------------------------------------
// Lyrics search
// ---------------------------------------------------------------------------

/** Search form of lyric text: case, apostrophes and punctuation never decide a match. */
export function normalizeLyricText(text: string): string {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/['‘’`´]/g, '')
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, ' ')
    .trim()
}

/** Lines of stored lyrics, with times when the lyrics are synced. */
export function lyricSearchLines(
  synced: string | null,
  plain: string | null
): { text: string; time: number | null }[] {
  const timed = synced ? parseLrc(synced).filter((line) => line.text) : []
  if (timed.length) return timed
  return (plain ?? '')
    .split(/\r\n?|\n/)
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text) => ({ text, time: null }))
}

function searchableLines(lines: readonly { text: string; time: number | null }[]) {
  return lines
    .map((line) => ({ ...line, norm: normalizeLyricText(line.text) }))
    .filter((line) => line.norm)
}

/** The one indexed document per track: normalized lines joined, so a phrase may cross a line break. */
export function lyricSearchDocument(synced: string | null, plain: string | null): string {
  return searchableLines(lyricSearchLines(synced, plain))
    .map((line) => line.norm)
    .join(' ')
}

export interface LyricMatchLocation {
  line: string // the matched line(s) as written, joined with " / " when the phrase crosses lines
  time: number | null // start of the first matched line, synced lyrics only
  count: number // non-overlapping occurrences in the song
}

/** Where a query occurs in a track's lyrics; null when it does not. */
export function locateLyricMatch(
  synced: string | null,
  plain: string | null,
  query: string
): LyricMatchLocation | null {
  const q = normalizeLyricText(query)
  if (!q) return null
  const lines = searchableLines(lyricSearchLines(synced, plain))
  const starts: number[] = []
  let doc = ''
  for (const line of lines) {
    if (doc) doc += ' '
    starts.push(doc.length)
    doc += line.norm
  }
  const at = doc.indexOf(q)
  if (at < 0) return null
  let count = 0
  for (let i = at; i >= 0; i = doc.indexOf(q, i + q.length)) count += 1
  const lineAt = (offset: number): number => {
    let index = 0
    while (index + 1 < starts.length && starts[index + 1] <= offset) index += 1
    return index
  }
  const first = lineAt(at)
  const last = lineAt(at + q.length - 1)
  return {
    line: lines
      .slice(first, last + 1)
      .map((line) => line.text)
      .join(' / '),
    time: lines[first].time,
    count
  }
}
