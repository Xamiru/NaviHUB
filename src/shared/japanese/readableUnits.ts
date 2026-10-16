import { parseFurigana, type FuriganaSegment } from './furigana'

// A paragraph in furigana notation, cut into clickable word units from the
// tokenizer's surfaces. A ruby segment is never split: when a reading spans two
// tokens (東京駅[とうきょうえき] → 東京 + 駅), they merge into one unit so the
// reading stays over the whole run. Null when the tokens do not line up with
// the text, so the caller falls back to plain rendering.

export interface ReadableToken {
  surface: string
  base: string
  tier: string // 'known' | 'learning' | 'unstarted' | 'unknown' | 'nonword'
}

export interface ReadableUnit {
  segments: FuriganaSegment[] // what to render, ruby intact
  surface: string // plain text of the unit
  base: string | null // the word to look up, null for particles and punctuation
  tier: string
}

export function buildReadableUnits(notation: string, tokens: readonly ReadableToken[]): ReadableUnit[] | null {
  const segs = parseFurigana(notation)
  const plain = segs.map((s) => s.text).join('')
  if (tokens.map((t) => t.surface).join('') !== plain) return null

  // Segment spans over the plain text.
  const spans: { start: number; end: number; seg: FuriganaSegment }[] = []
  let at = 0
  for (const seg of segs) {
    spans.push({ start: at, end: at + seg.text.length, seg })
    at += seg.text.length
  }
  const insideRuby = (pos: number): boolean => spans.some((s) => s.seg.ruby && s.start < pos && pos < s.end)

  // Group tokens; a boundary inside a ruby segment joins its neighbours.
  const groups: { start: number; end: number; toks: ReadableToken[] }[] = []
  at = 0
  for (const t of tokens) {
    const start = at
    const end = at + t.surface.length
    at = end
    const last = groups.at(-1)
    if (last && insideRuby(start)) {
      last.end = end
      last.toks.push(t)
    } else {
      groups.push({ start, end, toks: [t] })
    }
  }

  return groups.map((g) => {
    const segments: FuriganaSegment[] = []
    for (const s of spans) {
      if (s.end <= g.start || s.start >= g.end) continue
      if (s.seg.ruby) segments.push(s.seg)
      else segments.push({ text: s.seg.text.slice(Math.max(0, g.start - s.start), g.end - s.start), ruby: null })
    }
    const word = g.toks.find((t) => t.tier !== 'nonword')
    const surface = plain.slice(g.start, g.end)
    return {
      segments,
      surface,
      base: word ? (g.toks.length > 1 ? surface : word.base) : null,
      tier: word?.tier ?? 'nonword'
    }
  })
}
