import { toHiragana } from './kana'

// Shiritori chain rules, pure so the game logic is testable without the
// dictionary. Readings come in as kana (either script); everything is
// normalized to hiragana before comparison.

// Small kana → the full-size kana the next word must start with (しゃ → や).
const SMALL_TO_BIG: Record<string, string> = {
  ゃ: 'や', ゅ: 'ゆ', ょ: 'よ',
  ぁ: 'あ', ぃ: 'い', ぅ: 'う', ぇ: 'え', ぉ: 'お', ゎ: 'わ'
}

// Vowel kana for resolving a trailing ー (コーヒー → い).
const VOWEL_OF: Record<string, string> = { a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お' }

// Rough vowel of a single hiragana, via its position in the gojūon row.
function vowelKana(ch: string): string | null {
  const rows: Record<string, string> = {
    a: 'あかがさざただなはばぱまやらわ',
    i: 'いきぎしじちぢにひびぴみり',
    u: 'うくぐすずつづぬふぶぷむゆる',
    e: 'えけげせぜてでねへべぺめれ',
    o: 'おこごそぞとどのほぼぽもよろを'
  }
  const base = SMALL_TO_BIG[ch] ?? ch
  for (const [v, kana] of Object.entries(rows)) {
    if (kana.includes(base)) return VOWEL_OF[v]
  }
  return null
}

// The kana the NEXT word must start with, or null when the word ends the game
// (ん). Trailing ー resolves to the vowel of the preceding mora; small kana
// resolve to their full-size form; っ resolves like ー does not — a word can't
// end in っ in practice, but fall back to the preceding kana if one does.
export function chainKana(reading: string): string | null {
  const hira = toHiragana(reading.trim())
  if (!hira) return null
  let i = hira.length - 1
  // Skip trailing prolonged-sound marks, remembering we must take a vowel.
  let sawChoon = false
  while (i >= 0 && hira[i] === 'ー') {
    sawChoon = true
    i--
  }
  if (i < 0) return null
  let last = hira[i]
  if (last === 'っ') {
    if (i === 0) return null
    last = hira[i - 1]
  }
  if (last === 'ん') return null
  if (sawChoon) return vowelKana(last)
  return SMALL_TO_BIG[last] ?? last
}

// Does `reading` start with the required kana? First CHARACTER comparison in
// hiragana — しゃ counts as starting with し, which matches how the game is
// actually played.
export function startsWithKana(required: string, reading: string): boolean {
  const hira = toHiragana(reading.trim())
  if (!hira || !required) return false
  return hira[0] === toHiragana(required)
}

// Full chain predicate: next must start with prev's chain kana.
export function validNext(prevReading: string, nextReading: string): boolean {
  const req = chainKana(prevReading)
  if (req === null) return false
  return startsWithKana(req, nextReading)
}
