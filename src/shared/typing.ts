import { splitMora, toHiragana } from './kana'
import { acceptedRomaji, romajiToHiragana } from './romaji'

// Per-keystroke checking for typed drills whose answers are multi-kana strings
// (numbers drill: さんぼん). Generalizes the kana drill's single-kana check.
//
// The invariant that matters: NEVER return 'wrong' while any accepted answer
// can still be reached by typing more — a lone "n" might become ん or な, a
// single "p" might be the start of っぽ, "sanb" is on its way to さんぼん.
// Worst-case degradation is a too-lenient 'prefix', never a false miss.

export type MatchState = 'match' | 'prefix' | 'wrong'

const SPELLING_CAP = 2000

// Every accepted romaji rendering of a kana string, or null when the string
// contains something we can't expand (non-kana) or explodes past the cap —
// callers fall back to exact-kana comparison.
function romajiSpellings(kana: string): string[] | null {
  const morae = splitMora(toHiragana(kana))
  let outs = ['']
  let sokuon = false
  for (let idx = 0; idx < morae.length; idx++) {
    const mora = morae[idx]
    if (mora === 'っ') {
      sokuon = true
      continue
    }
    let variants: string[]
    if (mora === 'ー') {
      outs = outs.map((o) => {
        const v = o.match(/[aeiou]$/)?.[0]
        return v ? o + v : o + '-'
      })
      continue
    } else if (mora === 'ん') {
      // Bare "n" is only unambiguous when the next syllable doesn't start
      // with a vowel or y.
      const next = morae[idx + 1]
      const nextSpellings = next && next !== 'っ' ? acceptedRomaji(next) : []
      const vowelNext = nextSpellings.some((s) => /^[aeiouy]/.test(s))
      variants = vowelNext ? ['nn', "n'"] : ['n', 'nn', "n'"]
    } else {
      variants = acceptedRomaji(mora)
      if (!variants.length) return null
    }
    if (sokuon) {
      variants = variants.map((v) => (v.startsWith('ch') ? 't' + v : v[0] + v))
      sokuon = false
    }
    const next: string[] = []
    for (const o of outs) for (const v of variants) next.push(o + v)
    if (next.length > SPELLING_CAP) return null
    outs = next
  }
  return outs
}

interface Interpretation {
  head: string // the kana already committed
  tail: string // trailing latin letters still being typed
}

// The typed input as (committed kana, pending romaji tail) readings. Two
// interpretations exist when the input ends in a single "n": ん, or the start
// of a na-row syllable.
function interpret(raw: string): Interpretation[] | null {
  const asKana = toHiragana(romajiToHiragana(raw))
  const firstLatin = asKana.search(/[a-z']/)
  const head = firstLatin === -1 ? asKana : asKana.slice(0, firstLatin)
  const tail = firstLatin === -1 ? '' : asKana.slice(firstLatin)
  // Latin followed by more kana can never resolve — the conversion already
  // gave up mid-string.
  if (/[^a-z']/.test(tail)) return null
  const out: Interpretation[] = [{ head, tail }]
  const lower = raw.toLowerCase()
  if (
    tail === '' &&
    head.endsWith('ん') &&
    lower.endsWith('n') &&
    !lower.endsWith('nn') &&
    !lower.endsWith("n'")
  ) {
    out.push({ head: head.slice(0, -1), tail: 'n' })
  }
  return out
}

// How the current input stands against the accepted kana answers.
export function matchState(input: string, answers: string[]): MatchState {
  const raw = input.trim()
  if (!raw) return 'prefix'
  const interps = interpret(raw)
  if (!interps) return 'wrong'

  let anyPrefix = false
  for (const answer of answers) {
    const a = toHiragana(answer)
    for (const { head, tail } of interps) {
      if (tail === '') {
        if (head === a) return 'match'
        if (a.startsWith(head)) anyPrefix = true
        continue
      }
      if (!a.startsWith(head) || head === a) continue
      const rest = a.slice(head.length)
      const spellings = romajiSpellings(rest) ?? []
      if (spellings.some((s) => s.startsWith(tail))) anyPrefix = true
    }
  }
  return anyPrefix ? 'prefix' : 'wrong'
}
