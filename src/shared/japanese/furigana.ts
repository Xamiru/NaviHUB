// Furigana notation for the graded reading passages: a kanji run followed by
// its reading in square brackets — 漢字[かんじ] — which the reader turns into
// <ruby>. The bracket attaches to the immediately preceding MAXIMAL kanji run,
// so 食[た]べる works and so does 東京駅[とうきょうえき].
//
// Deliberately not mixed-notation (no per-character splitting): a passage is
// authored once and validated by tests/jpReadings.test.ts, which uses
// furiganaProblems() to reject anything the parser cannot render.

export interface FuriganaSegment {
  text: string // the base text (kanji run, or plain text)
  ruby: string | null // the reading, when this segment is a kanji run with one
}

const KANJI = /[一-鿿㐀-䶿々〆]/
const KANA_ONLY = /^[ぁ-んァ-ヶー・]+$/

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
