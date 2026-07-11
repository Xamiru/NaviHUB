// Byte-range parsing for the navimg protocol handler. <audio>/<video> seeking
// only works when the server honors Range requests — without it Chromium falls
// back to restarting the stream from byte 0 (and can't read trailing metadata
// like an m4a moov atom, so durations come up empty).

export interface ByteRange {
  start: number
  end: number // inclusive, clamped to size - 1
}

// Parses a Range header against a file of `size` bytes.
// Returns: null when there is no (usable) range header → serve the whole file;
// 'unsatisfiable' when the header is well-formed but out of bounds → 416;
// otherwise the single byte range to serve → 206.
// Multi-range requests ("bytes=0-1,5-9") are served whole-file (null) — that's
// legal per RFC 9110 (Range is a SHOULD) and Chromium media never sends them.
export function parseByteRange(header: string | null, size: number): ByteRange | 'unsatisfiable' | null {
  if (!header) return null
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim())
  if (!m || (m[1] === '' && m[2] === '')) return null
  if (m[1] === '') {
    // Suffix form "bytes=-N": the final N bytes.
    const suffix = Number(m[2])
    if (suffix === 0 || size === 0) return 'unsatisfiable'
    return { start: Math.max(size - suffix, 0), end: size - 1 }
  }
  const start = Number(m[1])
  if (start >= size) return 'unsatisfiable'
  const end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1)
  if (end < start) return 'unsatisfiable'
  return { start, end }
}
