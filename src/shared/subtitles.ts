// Subtitle parsing for the video player — SRT, WebVTT and ASS/SSA.
//
// Hand-rolled and fixture-tested, like every other parser in the app (epub.ts,
// mokuro.ts, the Atom scan in gachaNews, the WordNet importer): no dependency,
// nothing throws, a malformed block is skipped rather than fatal.
//
// It lives in src/shared because BOTH halves need it — the renderer parses cues
// to render the clickable overlay, and main parses them to feed subtitle text
// into the comprehension scan / prep deck (seriesText.ts).
//
// We reproduce the WORDS and their TIMING, plus the single layout bit that
// matters (top vs bottom), and deliberately nothing else. Karaoke timings,
// inline colours/fonts, \pos animation and embedded styles are all dropped:
// the app renders its own DOM subtitles in its own typography so that every
// word is a click target, and a clean token flow is fundamentally incompatible
// with reproducing ASS layout. See NOT_SUPPORTED at the bottom of this file.

export type SubFormat = 'srt' | 'vtt' | 'ass'
export type SubLang = 'ja' | 'en' | 'other'

// A cue as it comes out of a parser: no id yet, not sorted, possibly empty.
export interface RawCue {
  start: number
  end: number
  text: string
  top: boolean
  style: string | null
  actor: string | null
}

// One displayable line-group. `id` is assigned by normalizeCues and is stable
// for the life of the parsed track (React keys, transcript rows, seek targets).
export interface SubCue extends RawCue {
  id: number
}

// Start-sorted cues plus a prefix-max of `end`. The prefix-max is what makes
// cuesAt an O(log n + k) interval stab even though cues legally overlap — see
// cuesAt for why a plain binary search isn't enough.
export interface CueTrack {
  cues: SubCue[]
  maxEnd: number[]
}

// Seek this far BEFORE a cue's start so the line is already up when its audio
// begins; without the lead you consistently hear the first mora before you can
// read it.
export const CUE_SEEK_LEAD = 0.15

// "Previous cue" replays the current line when you're already this far into it,
// and only steps back to the real previous line when you're at its very start.
// That is the mpv sub-seek behaviour and it's what makes the key usable.
export const CUE_REPLAY_GRACE = 0.25

// ---------------------------------------------------------------- decoding

const BOM_UTF8 = [0xef, 0xbb, 0xbf]

// Subtitle files carry no encoding declaration and Japanese .srt rips are
// routinely Shift-JIS, so trusting UTF-8 blindly produces a mojibake track that
// poisons BOTH mining and the coverage scan. Try UTF-8, and if the result shows
// replacement characters fall through the encodings that actually occur.
export function decodeSubtitleBytes(bytes: Uint8Array): string {
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return stripBom(decodeWith(bytes.subarray(2), 'utf-16le') ?? '')
  }
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    return stripBom(decodeWith(bytes.subarray(2), 'utf-16be') ?? '')
  }
  if (bytes.length >= 3 && BOM_UTF8.every((b, i) => bytes[i] === b)) {
    return decodeWith(bytes.subarray(3), 'utf-8') ?? ''
  }
  const utf8 = decodeWith(bytes, 'utf-8')
  if (utf8 != null && !utf8.includes('�')) return utf8
  for (const enc of ['shift_jis', 'euc-jp', 'windows-1252']) {
    const alt = decodeWith(bytes, enc)
    if (alt != null && !alt.includes('�')) return alt
  }
  return utf8 ?? ''
}

function decodeWith(bytes: Uint8Array, encoding: string): string | null {
  try {
    return new TextDecoder(encoding, { fatal: false }).decode(bytes)
  } catch {
    return null
  }
}

function stripBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
}

// ---------------------------------------------------------------- timestamps

// One clock parser for all three formats. ASS writes centiseconds (0:00:01.50)
// and SRT/VTT write milliseconds (00:00:01,500), but read as a plain decimal
// fraction both mean the same 1.5 seconds — so the digit count needs no special
// casing, and being lenient about the , / . separator is strictly better than
// enforcing each format's preference.
function parseClock(raw: string): number | null {
  const m = /^(?:(\d+):)?(\d{1,3}):(\d{1,2})(?:[.,](\d{1,3}))?$/.exec(raw.trim())
  if (!m) return null
  const seconds =
    Number(m[1] ?? 0) * 3600 + Number(m[2]) * 60 + Number(m[3]) + (m[4] ? Number(`0.${m[4]}`) : 0)
  return Number.isFinite(seconds) ? seconds : null
}

export function parseSrtTime(raw: string): number | null {
  return parseClock(raw)
}
export function parseVttTime(raw: string): number | null {
  return parseClock(raw)
}
export function parseAssTime(raw: string): number | null {
  return parseClock(raw)
}

// "1:02:03" / "2:03" / "2:03.4" — the transcript and scrubber label.
export function formatTime(sec: number, opts?: { ms?: boolean }): string {
  const safe = Number.isFinite(sec) && sec > 0 ? sec : 0
  const h = Math.floor(safe / 3600)
  const m = Math.floor((safe % 3600) / 60)
  const s = Math.floor(safe % 60)
  const pad = (n: number): string => String(n).padStart(2, '0')
  const base = h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
  if (!opts?.ms) return base
  return `${base}.${Math.floor((safe % 1) * 10)}`
}

// ---------------------------------------------------------------- text bits

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' '
}

function decodeEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (whole, body: string) => {
    if (body[0] === '#') {
      const code =
        body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10)
      return Number.isFinite(code) && code > 0 ? String.fromCodePoint(code) : whole
    }
    return ENTITIES[body.toLowerCase()] ?? whole
  })
}

// Markup that shows up inside SRT and VTT payloads. VTT karaoke timestamps
// (<00:00:01.000>) are stripped by the same pass — they're the only reason a
// naive tag regex would leave stray digits behind.
function stripInlineTags(text: string): string {
  return decodeEntities(text.replace(/<[^>]*>/g, ''))
}

// Collapse horizontal whitespace without touching the hard line breaks a cue
// legitimately carries, then drop empty lines at either end.
function tidyLines(text: string): string {
  return text
    .split('\n')
    .map((line) => line.replace(/[^\S\n]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ---------------------------------------------------------------- ASS text

// Removes {\...} override blocks and resolves the escapes that carry meaning.
//
// The subtle part is \p: inside an override block, \p1..\p4 switches the
// renderer into VECTOR DRAWING mode and everything up to \p0 is coordinates,
// not text. Left in, a typeset sign contributes "m 0 0 l 100 0" to the cue and
// (worse) to the comprehension corpus.
export function stripAssOverrides(text: string): string {
  let out = ''
  let drawing = false
  let i = 0
  while (i < text.length) {
    const ch = text[i]
    if (ch === '\\' && (text[i + 1] === '{' || text[i + 1] === '}')) {
      if (!drawing) out += text[i + 1]
      i += 2
      continue
    }
    if (ch === '{') {
      const close = text.indexOf('}', i + 1)
      if (close === -1) {
        // An unmatched brace is literal text, not a malformed override.
        if (!drawing) out += ch
        i += 1
        continue
      }
      const block = text.slice(i + 1, close)
      const draws = block.match(/\\p(\d+)/g)
      if (draws) drawing = Number(draws[draws.length - 1].slice(2)) > 0
      i = close + 1
      continue
    }
    if (!drawing) out += ch
    i += 1
  }
  return tidyLines(
    out
      .replace(/\\[Nn]/g, '\n')
      .replace(/\\h/g, ' ')
  )
}

// {\an8} → 8. Also understands legacy SSA {\a6}, whose numbering is different
// enough that mapping it through is the only way top-vs-bottom stays right.
const LEGACY_ALIGN: Record<number, number> = { 1: 1, 2: 2, 3: 3, 5: 7, 6: 8, 7: 9, 9: 4, 10: 5, 11: 6 }

export function assAlignment(text: string): number | null {
  const an = /\\an(\d)/.exec(text)
  if (an) {
    const n = Number(an[1])
    return n >= 1 && n <= 9 ? n : null
  }
  const legacy = /\\a(\d{1,2})(?!n)/.exec(text)
  if (legacy) return LEGACY_ALIGN[Number(legacy[1])] ?? null
  return null
}

// Fansub ASS routinely ships the signs & songs track as extra STYLES inside the
// same file as the dialogue, so a "Japanese subtitles" track is really a mix.
// Classifying by style name is what lets the clickable track be dialogue-only —
// and it's a UI filter, never a hard drop, because the classification is a
// heuristic over free-text names.
export function assStyleClass(
  style: string | null,
  effect?: string | null
): 'dialogue' | 'sign' | 'song' {
  const name = `${style ?? ''} ${effect ?? ''}`
  if (/\b(op|ed)\b|song|karaoke|lyric|romaji|insert|kara/i.test(name)) return 'song'
  if (/sign|caption|note|title|credit|logo|screen|banner|scroll|overlap/i.test(name)) return 'sign'
  return 'dialogue'
}

// ---------------------------------------------------------------- parsers

// Scans for timing lines rather than splitting on blank lines. Index lines,
// missing blank separators, a trailing block with no final newline and
// duplicated/non-numeric indices are all common in the wild and all become
// non-issues this way — the "-->" line is the only reliable anchor.
function scanTimedBlocks(
  text: string,
  onBlock: (timingLine: string, body: string[]) => void
): void {
  const lines = stripBom(text).replace(/\r\n?/g, '\n').split('\n')
  let i = 0
  while (i < lines.length) {
    if (!lines[i].includes('-->')) {
      i += 1
      continue
    }
    const timing = lines[i]
    const body: string[] = []
    let j = i + 1
    while (j < lines.length && lines[j].trim() !== '' && !lines[j].includes('-->')) {
      body.push(lines[j])
      j += 1
    }
    // A missing blank line leaves the NEXT cue's index sitting at the end of
    // this body; drop it rather than printing "42" under the dialogue.
    if (j < lines.length && lines[j].includes('-->') && body.length > 0) {
      if (/^\d+$/.test(body[body.length - 1].trim())) body.pop()
    }
    onBlock(timing, body)
    i = j
  }
}

export function parseSrt(text: string): RawCue[] {
  const cues: RawCue[] = []
  scanTimedBlocks(text, (timing, body) => {
    const [rawStart, rawRest] = timing.split('-->')
    if (rawRest == null) return
    const start = parseSrtTime(rawStart)
    // Trailing coordinates ("X1:0 X2:640 Y1:0 Y2:480") follow the end time.
    const end = parseSrtTime(rawRest.trim().split(/\s+/)[0] ?? '')
    if (start == null || end == null) return
    const joined = body.join('\n')
    // {\an8} shows up in SRTs converted from ASS, so honour it before stripping.
    const align = assAlignment(joined)
    const cleaned = tidyLines(stripInlineTags(stripAssOverrides(joined)))
    cues.push({ start, end, text: cleaned, top: align != null && align >= 7, style: null, actor: null })
  })
  return cues
}

export function parseVtt(text: string): RawCue[] {
  const cues: RawCue[] = []
  scanTimedBlocks(text, (timing, body) => {
    const arrow = timing.indexOf('-->')
    const start = parseVttTime(timing.slice(0, arrow))
    const after = timing.slice(arrow + 3).trim().split(/\s+/)
    const end = parseVttTime(after[0] ?? '')
    if (start == null || end == null) return
    // Cue settings: only `line` matters to us — it's how a VTT says "top".
    let top = false
    for (const setting of after.slice(1)) {
      const m = /^line:(-?\d+(?:\.\d+)?)%?$/.exec(setting)
      if (!m) continue
      const value = Number(m[1])
      if (value >= 0 && value <= 20) top = true
    }
    let actor: string | null = null
    const voice = /<v(?:\.[^\s>]+)*\s+([^>]+)>/.exec(body.join('\n'))
    if (voice) actor = voice[1].trim()
    const cleaned = tidyLines(stripInlineTags(body.join('\n')))
    cues.push({ start, end, text: cleaned, top, style: null, actor })
  })
  return cues
}

// The ASS Text field is the only one allowed to contain commas, so it absorbs
// whatever is left after the fixed fields are peeled off — a plain .split(',')
// truncates every line at its first comma. Peeling from BOTH ends (rather than
// assuming Text is last) means a Format line that puts Text mid-list still
// parses, and costs nothing when it doesn't.
function splitAssFields(payload: string, fieldCount: number, textIdx: number): string[] {
  const out: string[] = new Array(fieldCount).fill('')
  const tailCount = textIdx >= 0 ? fieldCount - textIdx - 1 : 0
  const headCount = textIdx >= 0 ? textIdx : fieldCount - 1
  let rest = payload
  for (let i = 0; i < headCount; i += 1) {
    const comma = rest.indexOf(',')
    if (comma === -1) {
      out[i] = rest
      rest = ''
      continue
    }
    out[i] = rest.slice(0, comma)
    rest = rest.slice(comma + 1)
  }
  for (let i = 0; i < tailCount; i += 1) {
    const comma = rest.lastIndexOf(',')
    if (comma === -1) break
    out[fieldCount - 1 - i] = rest.slice(comma + 1)
    rest = rest.slice(0, comma)
  }
  out[textIdx >= 0 ? textIdx : fieldCount - 1] = rest
  return out
}

const ASS_DEFAULT_FORMAT = [
  'layer',
  'start',
  'end',
  'style',
  'name',
  'marginl',
  'marginr',
  'marginv',
  'effect',
  'text'
]

export function parseAss(text: string): RawCue[] {
  const lines = stripBom(text).replace(/\r\n?/g, '\n').split('\n')
  const cues: RawCue[] = []
  let inEvents = false
  let fields: string[] = ASS_DEFAULT_FORMAT
  for (const raw of lines) {
    const line = raw.trim()
    if (line === '' || line.startsWith(';')) continue
    if (line.startsWith('[')) {
      inEvents = /^\[events\]/i.test(line)
      continue
    }
    if (!inEvents) continue
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim().toLowerCase()
    const payload = line.slice(colon + 1)
    if (key === 'format') {
      // The Format line DEFINES field order — reordered Format lines are the
      // single most common ASS parsing bug, so never assume the canonical ten.
      fields = payload.split(',').map((f) => f.trim().toLowerCase())
      continue
    }
    // Comment: lines are karaoke-templater leftovers, translator notes and
    // alternative TLs — never displayed, so never mined.
    if (key !== 'dialogue') continue
    const textIdx = fields.indexOf('text')
    const values = splitAssFields(payload, fields.length, textIdx)
    const at = (name: string): string => {
      const idx = fields.indexOf(name)
      return idx === -1 ? '' : (values[idx] ?? '').trim()
    }
    const start = parseAssTime(at('start'))
    const end = parseAssTime(at('end'))
    if (start == null || end == null) continue
    // Take Text verbatim (leading spaces are meaningful indentation in signs).
    const rawText = values[textIdx >= 0 ? textIdx : values.length - 1] ?? ''
    const align = assAlignment(rawText)
    const cleaned = stripAssOverrides(rawText)
    const style = at('style') || null
    cues.push({
      start,
      end,
      text: cleaned,
      top: align != null && align >= 7,
      style,
      actor: at('name') || null
    })
  }
  return cues
}

// Sniffs the format when the caller has no filename to go on.
export function detectSubFormat(fileNameOrText: string): SubFormat {
  const ext = /\.(srt|vtt|ass|ssa|sub)$/i.exec(fileNameOrText.trim())
  if (ext) {
    const e = ext[1].toLowerCase()
    if (e === 'ass' || e === 'ssa') return 'ass'
    if (e === 'vtt') return 'vtt'
    return 'srt'
  }
  const head = fileNameOrText.slice(0, 4096)
  if (/^﻿?WEBVTT/.test(head)) return 'vtt'
  if (/\[Script Info\]|\[V4\+? Styles\]|^\s*Dialogue:/im.test(head)) return 'ass'
  return 'srt'
}

export function parseSubtitles(text: string, format?: SubFormat): SubCue[] {
  const fmt = format ?? detectSubFormat(text)
  const raw = fmt === 'ass' ? parseAss(text) : fmt === 'vtt' ? parseVtt(text) : parseSrt(text)
  return normalizeCues(raw)
}

// ---------------------------------------------------------------- normalize

// Overlapping cues are LEGITIMATE — two speakers, or dialogue plus a sign — so
// this deliberately does not clip them. The only clip is the sub-60ms sliver
// that makes consecutive lines double-render for one frame.
const FLICKER_SNAP = 0.06

export function normalizeCues(raw: RawCue[]): SubCue[] {
  const kept = raw
    .filter((c) => c.text.trim() !== '')
    .filter((c) => Number.isFinite(c.start) && Number.isFinite(c.end) && c.start >= 0)
    .map((c) => ({ ...c, end: Math.max(c.end, c.start + 0.05) }))

  kept.sort((a, b) => a.start - b.start || a.end - b.end)

  const merged: RawCue[] = []
  for (const cue of kept) {
    const prev = merged[merged.length - 1]
    if (prev && prev.start === cue.start && prev.end === cue.end) {
      // Same slot, same text: an ASS file repeating a line across two styles.
      if (prev.text === cue.text) continue
      // Same slot, different text, same placement: a two-line dialogue pair.
      // Merging is what makes "click a word → mine the WHOLE line" correct.
      if (prev.top === cue.top) {
        prev.text = `${prev.text}\n${cue.text}`
        continue
      }
    }
    merged.push({ ...cue })
  }

  for (let i = 0; i < merged.length - 1; i += 1) {
    const gap = merged[i].end - merged[i + 1].start
    if (gap > 0 && gap < FLICKER_SNAP) merged[i].end = merged[i + 1].start
  }

  return merged.map((c, id) => ({ ...c, id }))
}

export function buildTrack(cues: SubCue[]): CueTrack {
  const maxEnd: number[] = new Array(cues.length)
  let running = -Infinity
  for (let i = 0; i < cues.length; i += 1) {
    running = Math.max(running, cues[i].end)
    maxEnd[i] = running
  }
  return { cues, maxEnd }
}

// Last index whose start is <= t, or -1.
function lastStartingAtOrBefore(cues: SubCue[], t: number): number {
  let lo = 0
  let hi = cues.length - 1
  let found = -1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (cues[mid].start <= t) {
      found = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return found
}

// Every cue covering `t`, in document order.
//
// A binary search alone is not enough: cues are sorted by START, so a long cue
// that began well before `t` can still be active while later-starting cues have
// already ended. Walking back from the last candidate and stopping as soon as
// maxEnd[i] <= t (no cue at or before i can still be open) is what keeps this
// O(log n + k) instead of a full scan on every frame.
export function cuesAt(track: CueTrack, t: number): SubCue[] {
  const { cues, maxEnd } = track
  const last = lastStartingAtOrBefore(cues, t)
  const out: SubCue[] = []
  for (let i = last; i >= 0; i -= 1) {
    if (maxEnd[i] <= t) break
    if (cues[i].end > t) out.push(cues[i])
  }
  return out.reverse()
}

export function nextCue(track: CueTrack, t: number): SubCue | null {
  const { cues } = track
  const idx = lastStartingAtOrBefore(cues, t) + 1
  return idx < cues.length ? cues[idx] : null
}

// Steps back to the previous line — but replays the CURRENT line when you're
// already past its first moment, which is the behaviour that makes the key
// usable for shadowing (you almost always mean "say that again").
export function prevCue(track: CueTrack, t: number): SubCue | null {
  const idx = lastStartingAtOrBefore(track.cues, t - CUE_REPLAY_GRACE)
  return idx >= 0 ? track.cues[idx] : null
}

// ---------------------------------------------------------------- track bits

export function filterDialogue(cues: SubCue[]): SubCue[] {
  return cues.filter((c) => assStyleClass(c.style) === 'dialogue')
}

export function listStyles(
  cues: SubCue[]
): { style: string; count: number; class: 'dialogue' | 'sign' | 'song' }[] {
  const counts = new Map<string, number>()
  for (const c of cues) {
    const key = c.style ?? ''
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([style, count]) => ({ style, count, class: assStyleClass(style || null) }))
    .sort((a, b) => b.count - a.count)
}

export function cueMatches(cue: SubCue, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return cue.text.toLowerCase().includes(q)
}

// The corpus feed for the comprehension scan / prep deck: dialogue only, with
// consecutive repeats dropped (a held line re-cued every few seconds would
// otherwise inflate its own frequency).
export function dialogueText(cues: SubCue[]): string[] {
  const out: string[] = []
  for (const cue of filterDialogue(cues)) {
    const text = cue.text.replace(/\n/g, '')
    if (text && text !== out[out.length - 1]) out.push(text)
  }
  return out
}

const CJK = /[぀-ヿ㐀-䶿一-鿿]/
const LATIN = /[A-Za-z]/

export function guessCueLang(text: string): SubLang {
  if (CJK.test(text)) return 'ja'
  if (LATIN.test(text)) return 'en'
  return 'other'
}

const LANG_TAGS: Record<string, SubLang> = {
  ja: 'ja',
  jp: 'ja',
  jpn: 'ja',
  japanese: 'ja',
  en: 'en',
  eng: 'en',
  english: 'en'
}

// "[Group] Show - 03 [1080p].ja.forced.ass" → { lang:'ja', forced:true, … }
export function parseSubtitleFileName(name: string): {
  lang: SubLang
  forced: boolean
  sdh: boolean
  signs: boolean
  label: string
} {
  const base = name.replace(/\.[^.]+$/, '')
  const tags = base.split(/[.\-_\s]+/).map((t) => t.toLowerCase())
  let lang: SubLang = 'other'
  for (const tag of tags) {
    const hit = LANG_TAGS[tag]
    if (hit) lang = hit
  }
  const flat = base.toLowerCase()
  return {
    lang,
    forced: tags.includes('forced'),
    sdh: tags.includes('sdh') || tags.includes('cc') || tags.includes('hi'),
    signs: /signs?|songs?/.test(flat),
    label: base
  }
}

// Seeds the two track slots from the user's language preferences. The clickable
// slot avoids signs tracks (thirty lines of sign translations is not a script),
// and the crutch slot never repeats whatever the clickable slot picked.
export function pickDefaultTracks<T extends { lang: SubLang; signs?: boolean; forced?: boolean }>(
  tracks: T[],
  prefs: { primary: SubLang; secondary: SubLang }
): { primary: T | null; secondary: T | null } {
  const rank = (t: T, want: SubLang): number => {
    let score = t.lang === want ? 100 : t.lang === 'other' ? 10 : 0
    if (t.signs) score -= 60
    if (t.forced) score -= 30
    return score
  }
  const best = (want: SubLang, exclude: T | null): T | null => {
    let winner: T | null = null
    let winning = 0
    for (const t of tracks) {
      if (t === exclude) continue
      const score = rank(t, want)
      if (score > winning) {
        winning = score
        winner = t
      }
    }
    return winner
  }
  const primary = best(prefs.primary, null)
  return { primary, secondary: best(prefs.secondary, primary) }
}

// The English "tokenizer" — pure and synchronous, so an English subtitle row is
// clickable with zero IPC (kuromoji is only needed for Japanese).
export function splitEnglishWords(text: string): { text: string; word: boolean }[] {
  const out: { text: string; word: boolean }[] = []
  const re = /[A-Za-z][A-Za-z'’-]*/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push({ text: text.slice(last, m.index), word: false })
    out.push({ text: m[0], word: true })
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ text: text.slice(last), word: false })
  return out
}

// The lookup term for an English word: lowercased, possessive dropped.
export function englishLookupTerm(word: string): string {
  return word.toLowerCase().replace(/['’]s$/, '').replace(/^[-']+|[-']+$/g, '')
}

// Documented here rather than in a comment above each drop site, so the
// omissions read as decisions instead of gaps. See the file header for why.
export const NOT_SUPPORTED = [
  'karaoke timings (\\k \\kf \\ko)',
  'inline styling (\\b \\i \\c \\fn \\fs \\frz \\blur)',
  '[V4+ Styles] definitions — only the style NAME is read, for the signs filter',
  'positioning and animation (\\pos \\move \\org \\clip \\t \\fade)',
  'alignment beyond top-vs-bottom',
  'embedded [Fonts] / [Graphics] attachments',
  'VTT regions and ::cue styling'
] as const
