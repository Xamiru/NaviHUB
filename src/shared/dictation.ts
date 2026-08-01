import { toHiragana } from './kana'
import type { JpToken } from './types'

// Pure helpers for the dictation drill (listen → type what you heard).
// Correctness is judged on kuromoji READINGS so typing 食べた for たべた (or
// vice versa) both count; the per-character diff is only the reveal display.

// Strip punctuation and whitespace, keep the script as typed.
export function normalizeDictation(s: string): string {
  return s.replace(/[\s。、．，！？!?.,・「」『』（）()…〜~―ー─:：;；'"’”]/g, (ch) =>
    // ー between kana is a real sound — only strip it when it's clearly a dash
    // (surrounded by nothing kana-ish is unknowable here, so keep it).
    ch === 'ー' ? 'ー' : ''
  )
}

export type DiffState = 'same' | 'add' | 'del'

export interface DiffChar {
  ch: string
  // 'same' in both; 'del' = typed but not in the transcript; 'add' = in the
  // transcript but missing from what was typed.
  state: DiffState
}

// Character-level LCS diff from the user's answer to the transcript, for the
// reveal display. Strings are short (≤ ~60 chars), so O(n·m) is fine.
export function diffChars(user: string, transcript: string): DiffChar[] {
  const a = [...user]
  const b = [...transcript]
  const n = a.length
  const m = b.length
  // lcs[i][j] = LCS length of a[i..] vs b[j..]
  const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1])
    }
  }
  const out: DiffChar[] = []
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      out.push({ ch: a[i], state: 'same' })
      i++
      j++
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      out.push({ ch: a[i], state: 'del' })
      i++
    } else {
      out.push({ ch: b[j], state: 'add' })
      j++
    }
  }
  while (i < n) out.push({ ch: a[i++], state: 'del' })
  while (j < m) out.push({ ch: b[j++], state: 'add' })
  return out
}

// Tokenized text → a hiragana reading key for equality comparison. Punctuation
// and symbol tokens contribute nothing; tokens without a reading fall back to
// their surface (kana surfaces normalize fine, kanji-only mismatches then fail
// the comparison honestly).
export function readingsKey(tokens: JpToken[]): string {
  let out = ''
  for (const t of tokens) {
    if (t.pos === '記号') continue
    const part = t.reading ?? t.surface
    out += normalizeDictation(toHiragana(part))
  }
  return out
}
