// Furigana notation for the graded reading passages: a kanji run followed by
// its reading in square brackets — 漢字[かんじ] — which the reader turns into
// <ruby>. The bracket attaches to the immediately preceding MAXIMAL kanji run,
// so 食[た]べる works and so does 東京駅[とうきょうえき].
//
// Deliberately not mixed-notation (no per-character splitting): a passage is
// authored once and validated by tests/jpReadings.test.ts, which uses
// furiganaProblems() to reject anything the parser cannot render.

import { toHiragana } from '../kana'

export interface FuriganaSegment {
  text: string // the base text (kanji run, or plain text)
  ruby: string | null // the reading, when this segment is a kanji run with one
}

const KANJI = /[一-鿿㐀-䶿々〆]/
const KANA_ONLY = /^[ぁ-んァ-ヶー・]+$/
const READING_TEXT = /^(?=.*[ぁ-んァ-ヶ])[^A-Za-z一-鿿㐀-䶿々〆]+$/

export function parseFurigana(text: string): FuriganaSegment[] {
  const out: FuriganaSegment[] = []
  let plain = ''
  let i = 0
  const flush = (): void => {
    if (plain) {
      out.push({ text: plain, ruby: null })
      plain = ''
    }
  }
  while (i < text.length) {
    const ch = text[i]
    if (ch !== '[') {
      plain += ch
      i++
      continue
    }
    const close = text.indexOf(']', i)
    if (close < 0) {
      plain += ch // unbalanced: treat as literal (furiganaProblems flags it)
      i++
      continue
    }
    const ruby = text.slice(i + 1, close)
    // Peel the maximal kanji run off the end of the plain buffer.
    let k = plain.length
    while (k > 0 && KANJI.test(plain[k - 1])) k--
    const base = plain.slice(k)
    if (!base || !ruby) {
      plain += text.slice(i, close + 1)
      i = close + 1
      continue
    }
    plain = plain.slice(0, k)
    flush()
    out.push({ text: base, ruby })
    i = close + 1
  }
  flush()
  return out
}

export function stripFurigana(text: string): string {
  return parseFurigana(text)
    .map((s) => s.text)
    .join('')
}

// Everything an author can get wrong, as messages. Empty = renderable.
export function furiganaProblems(text: string): string[] {
  const problems: string[] = []
  let depth = 0
  for (const ch of text) {
    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth < 0) {
        problems.push('closing ] without an opening [')
        depth = 0
      }
    }
  }
  if (depth > 0) problems.push('unclosed [')

  for (const m of text.matchAll(/\[([^\]]*)\]/g)) {
    const ruby = m[1]
    if (!ruby) problems.push('empty reading []')
    else if (!KANA_ONLY.test(ruby)) problems.push(`reading is not kana: [${ruby}]`)
    const before = text.slice(0, m.index)
    if (!before || !KANJI.test(before[before.length - 1])) {
      problems.push(`reading [${ruby}] does not follow a kanji`)
    }
  }

  // Every kanji run must carry a reading — the toggle is the reader's control,
  // so a passage may not be half-annotated.
  const segments = parseFurigana(text)
  for (const seg of segments) {
    if (seg.ruby) continue
    for (const run of seg.text.match(/[一-鿿㐀-䶿々〆]+/g) ?? []) {
      problems.push(`kanji run without a reading: ${run}`)
    }
  }
  return [...new Set(problems)]
}

// Aligns a dictionary-style word with its kana reading so the reading sits
// over the kanji only: 食べ物 + たべもの → 食[た] べ 物[もの]. Kana in the word
// anchor the split (compared as hiragana, so カタカナ words match). When the
// reading cannot be aligned, an all-kanji word carries it whole; anything else
// (a grammar card's sentence, say) comes back as plain text so the caller can
// show the reading on its own line rather than one ruby over a whole sentence.
export function alignFurigana(word: string, reading: string | null | undefined): FuriganaSegment[] {
  const clean = (reading ?? '').trim()
  if (!word) return []
  // A reading is kana, optionally with the sentence's own punctuation; romaji
  // or kanji in it means it is not something to put over the text.
  if (!clean || !KANJI.test(word) || !READING_TEXT.test(clean)) return [{ text: word, ruby: null }]

  const runs: { text: string; kanji: boolean }[] = []
  for (const ch of word) {
    const kanji = KANJI.test(ch)
    const last = runs.at(-1)
    if (last && last.kanji === kanji) last.text += ch
    else runs.push({ text: ch, kanji })
  }
  // Every way to give each kanji run a non-empty slice of the reading with the
  // kana runs matching in place. A kana anchor that also occurs inside a
  // reading allows more than one (母は料理 → はは|は|りょうり or は|は|はりょうり),
  // and nothing in the text says which is right, so only a unique split is
  // used; otherwise the caller shows the reading whole.
  const kana = toHiragana(clean)
  // ways(run, at): how many ways runs[run..] can consume kana[at..], capped at 2.
  const memo = new Map<number, number>()
  const ways = (run: number, at: number): number => {
    if (run === runs.length) return at === kana.length ? 1 : 0
    const key = run * (kana.length + 1) + at
    const hit = memo.get(key)
    if (hit !== undefined) return hit
    let n = 0
    if (!runs[run].kanji) {
      const lit = toHiragana(runs[run].text)
      n = kana.startsWith(lit, at) ? ways(run + 1, at + lit.length) : 0
    } else {
      for (let end = at + 1; end <= kana.length && n < 2; end++) n += ways(run + 1, end)
    }
    n = Math.min(n, 2)
    memo.set(key, n)
    return n
  }
  const total = ways(0, 0)
  if (total === 0) return runs.length === 1 ? [{ text: word, ruby: clean }] : [{ text: word, ruby: null }]
  if (total > 1) return [{ text: word, ruby: null }]
  const split: string[] = []
  let at = 0
  for (let run = 0; run < runs.length; run++) {
    if (!runs[run].kanji) {
      split.push('')
      at += toHiragana(runs[run].text).length
      continue
    }
    let end = at + 1
    while (ways(run + 1, end) === 0) end++
    split.push(kana.slice(at, end))
    at = end
  }
  return runs.map((run, i) => ({ text: run.text, ruby: run.kanji ? split[i] : null }))
}

// The whole reading of a notation string: every annotated kanji run replaced by
// its bracket, kana and punctuation kept — 今日[きょう]は雨[あめ] → きょうは雨…
// → きょうはあめ. What the offline voice needs to read a passage right.
export function furiganaReading(text: string): string {
  return parseFurigana(text)
    .map((seg) => seg.ruby ?? seg.text)
    .join('')
}
