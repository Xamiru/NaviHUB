import { toHiragana } from './kana'

// Kana ↔ romaji for the drill page (and anywhere typed answers must match kana
// readings). Accepts every common romanization (Hepburn + kunrei variants:
// shi/si, chi/ti, tsu/tu, fu/hu, ji/zi…) so the drill never marks a correct
// system "wrong". Pure and dependency-light for node tests.

// Base hiragana → accepted romaji spellings (first entry = canonical Hepburn).
const BASE: Record<string, string[]> = {
  あ: ['a'], い: ['i'], う: ['u'], え: ['e'], お: ['o'],
  か: ['ka'], き: ['ki'], く: ['ku'], け: ['ke'], こ: ['ko'],
  さ: ['sa'], し: ['shi', 'si'], す: ['su'], せ: ['se'], そ: ['so'],
  た: ['ta'], ち: ['chi', 'ti'], つ: ['tsu', 'tu'], て: ['te'], と: ['to'],
  な: ['na'], に: ['ni'], ぬ: ['nu'], ね: ['ne'], の: ['no'],
  は: ['ha'], ひ: ['hi'], ふ: ['fu', 'hu'], へ: ['he'], ほ: ['ho'],
  ま: ['ma'], み: ['mi'], む: ['mu'], め: ['me'], も: ['mo'],
  や: ['ya'], ゆ: ['yu'], よ: ['yo'],
  ら: ['ra'], り: ['ri'], る: ['ru'], れ: ['re'], ろ: ['ro'],
  わ: ['wa'], を: ['wo', 'o'], ん: ['n', 'nn'],
  が: ['ga'], ぎ: ['gi'], ぐ: ['gu'], げ: ['ge'], ご: ['go'],
  ざ: ['za'], じ: ['ji', 'zi'], ず: ['zu'], ぜ: ['ze'], ぞ: ['zo'],
  だ: ['da'], ぢ: ['ji', 'di'], づ: ['zu', 'du'], で: ['de'], ど: ['do'],
  ば: ['ba'], び: ['bi'], ぶ: ['bu'], べ: ['be'], ぼ: ['bo'],
  ぱ: ['pa'], ぴ: ['pi'], ぷ: ['pu'], ぺ: ['pe'], ぽ: ['po']
}

// Digraphs (yōon). Derived: consonant of the い-column kana + ya/yu/yo, with
// the irregular sh/ch/j sets spelled out.
const DIGRAPHS: Record<string, string[]> = {
  きゃ: ['kya'], きゅ: ['kyu'], きょ: ['kyo'],
  しゃ: ['sha', 'sya'], しゅ: ['shu', 'syu'], しょ: ['sho', 'syo'],
  ちゃ: ['cha', 'tya'], ちゅ: ['chu', 'tyu'], ちょ: ['cho', 'tyo'],
  にゃ: ['nya'], にゅ: ['nyu'], にょ: ['nyo'],
  ひゃ: ['hya'], ひゅ: ['hyu'], ひょ: ['hyo'],
  みゃ: ['mya'], みゅ: ['myu'], みょ: ['myo'],
  りゃ: ['rya'], りゅ: ['ryu'], りょ: ['ryo'],
  ぎゃ: ['gya'], ぎゅ: ['gyu'], ぎょ: ['gyo'],
  じゃ: ['ja', 'jya', 'zya'], じゅ: ['ju', 'jyu', 'zyu'], じょ: ['jo', 'jyo', 'zyo'],
  ぢゃ: ['ja', 'dya'], ぢゅ: ['ju', 'dyu'], ぢょ: ['jo', 'dyo'],
  びゃ: ['bya'], びゅ: ['byu'], びょ: ['byo'],
  ぴゃ: ['pya'], ぴゅ: ['pyu'], ぴょ: ['pyo']
}

const ALL: Record<string, string[]> = { ...BASE, ...DIGRAPHS }

// Accepted romaji spellings for one kana unit (single kana or digraph), in
// either script. [] for unknown input.
export function acceptedRomaji(kana: string): string[] {
  return ALL[toHiragana(kana)] ?? []
}

// Longest-match table for full-string conversion, sorted by kana length.
const UNITS = Object.keys(ALL).sort((a, b) => b.length - a.length)

// Kana string → canonical Hepburn romaji. っ doubles the next consonant; ー
// repeats the previous vowel. Unknown characters pass through.
export function kanaToRomaji(kana: string): string {
  const hira = toHiragana(kana)
  let out = ''
  let i = 0
  let sokuon = false
  while (i < hira.length) {
    const ch = hira[i]
    if (ch === 'っ') {
      sokuon = true
      i++
      continue
    }
    if (ch === 'ー') {
      const last = out.match(/[aeiou]$/)?.[0]
      out += last ?? '-'
      i++
      continue
    }
    const unit = UNITS.find((u) => hira.startsWith(u, i))
    if (!unit) {
      out += ch
      sokuon = false
      i++
      continue
    }
    let syl = ALL[unit][0]
    if (sokuon) {
      // っち → tchi (Hepburn); everything else doubles the first consonant.
      out += syl.startsWith('ch') ? 't' : syl[0]
      sokuon = false
    }
    // ん before a vowel/y would be ambiguous — write n' (accepted loosely on input).
    if (unit === 'ん') {
      const next = hira[i + 1]
      syl = next && 'あいうえおやゆよ'.includes(next) ? "n'" : 'n'
    }
    out += syl
    i += unit.length
  }
  return out
}

// Reverse map romaji → hiragana, longest-spelling-first so "sha" wins over "sa".
const ROMAJI_TO_KANA: [string, string][] = Object.entries(ALL)
  .flatMap(([kana, spellings]) => spellings.map((r): [string, string] => [r, kana]))
  .sort((a, b) => b[0].length - a[0].length)

// Typed romaji → hiragana ("kyou" → きょう). Handles doubled consonants (っ),
// "nn"/"n'" → ん, and a lone trailing "n". Unknown letters pass through so a
// wrong answer still fails the comparison rather than throwing.
export function romajiToHiragana(input: string): string {
  const s = input.toLowerCase().trim()
  let out = ''
  let i = 0
  while (i < s.length) {
    // ん spelled n' or nn, or n before a non-vowel consonant / end of string.
    if (s[i] === 'n') {
      const rest = s.slice(i)
      if (rest.startsWith("n'") || rest.startsWith('nn')) {
        out += 'ん'
        i += 2
        continue
      }
      const next = s[i + 1]
      if (next === undefined || !'aeiouy'.includes(next)) {
        out += 'ん'
        i += 1
        continue
      }
    }
    // Doubled consonant → っ (except "nn", handled above).
    if (s[i] === s[i + 1] && /[bcdfghjklmpqrstvwxz]/.test(s[i])) {
      out += 'っ'
      i += 1
      continue
    }
    // "tch" is Hepburn っち.
    if (s.startsWith('tch', i)) {
      out += 'っ'
      i += 1
      continue
    }
    const hit = ROMAJI_TO_KANA.find(([r]) => s.startsWith(r, i))
    if (hit) {
      out += hit[1]
      i += hit[0].length
    } else if (s[i] === '-') {
      out += 'ー'
      i += 1
    } else {
      out += s[i]
      i += 1
    }
  }
  return out
}

// Does a typed answer match any of the expected kana readings? The answer may
// be romaji (converted) or kana (either script). Readings tolerate the
// okurigana dot KANJIDIC uses (つ.ぐ) and interpunct/comma separated lists.
export function readingMatches(input: string, readings: string[]): boolean {
  const t = input.trim()
  if (!t) return false
  const typedKana = /[a-zA-Z]/.test(t) ? romajiToHiragana(t) : toHiragana(t)
  return readings.some((r) =>
    splitReadings(r).some((one) => toHiragana(one) === typedKana)
  )
}

// "ア アク" / "つ.ぐ、うつ.す" style reading fields → individual clean readings.
export function splitReadings(raw: string): string[] {
  return raw
    .split(/[\s,、・／/]+/)
    .map((r) => r.replace(/\./g, '').trim())
    .filter(Boolean)
}
