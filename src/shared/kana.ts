// Pure kana helpers shared by the offline-dictionary lookup (main) and the
// pitch-accent renderer (renderer). No dependencies so both bundles can import
// it and tests run it under plain node.

const HIRA_START = 0x3041
const HIRA_END = 0x3096
const KATA_START = 0x30a1
const KATA_END = 0x30f6
const SHIFT = KATA_START - HIRA_START // 0x60

// Katakana → hiragana (leaves the prolonged-sound mark ー, punctuation, kanji
// and latin untouched). Used so a katakana query matches a hiragana reading.
export function toHiragana(s: string): string {
  let out = ''
  for (const ch of s) {
    const c = ch.codePointAt(0)!
    out += c >= KATA_START && c <= KATA_END ? String.fromCodePoint(c - SHIFT) : ch
  }
  return out
}

// Hiragana → katakana (mirror of the above).
export function toKatakana(s: string): string {
  let out = ''
  for (const ch of s) {
    const c = ch.codePointAt(0)!
    out += c >= HIRA_START && c <= HIRA_END ? String.fromCodePoint(c + SHIFT) : ch
  }
  return out
}

function isKanaChar(c: number): boolean {
  return (c >= HIRA_START && c <= HIRA_END) || (c >= KATA_START && c <= KATA_END) || c === 0x30fc
}

// True when the string is entirely kana (and the ー mark). Blank → false.
export function isKanaOnly(s: string): boolean {
  if (!s) return false
  for (const ch of s) {
    if (!isKanaChar(ch.codePointAt(0)!)) return false
  }
  return true
}

// True when the trimmed string is mostly ASCII letters — i.e. an English query
// that should route to the gloss search rather than an expression/reading match.
export function isMostlyLatin(s: string): boolean {
  const t = s.trim()
  if (!t) return false
  let latin = 0
  let cjkOrKana = 0
  for (const ch of t) {
    const c = ch.codePointAt(0)!
    if ((c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a)) latin++
    else if (isKanaChar(c) || (c >= 0x4e00 && c <= 0x9fff)) cjkOrKana++
  }
  return latin > 0 && latin >= cjkOrKana
}

// Small kana that combine onto the preceding mora (yōon + small vowels).
const SMALL_KANA = new Set([
  'ゃ','ゅ','ょ','ぁ','ぃ','ぅ','ぇ','ぉ','ゎ',
  'ャ','ュ','ョ','ァ','ィ','ゥ','ェ','ォ','ヮ'
])

// Split kana into morae for pitch-accent rendering: a small kana merges into
// the previous mora (きょう → [きょ, う]); っ/ッ/ー/ん/ン each stand alone.
export function splitMora(kana: string): string[] {
  const morae: string[] = []
  for (const ch of kana) {
    if (SMALL_KANA.has(ch) && morae.length > 0) {
      morae[morae.length - 1] += ch
    } else {
      morae.push(ch)
    }
  }
  return morae
}
