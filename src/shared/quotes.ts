// Pure helpers for the quote book: furigana markup from tokenizer output and
// the deterministic quote of the day. Shared so tests run without a renderer.

import { alignFurigana } from './japanese/furigana'

const KANJI = /[一-鿿㐀-䶿々〆]/
const JAPANESE = /[぀-ヿ一-鿿㐀-䶿々〆]/

export function hasKanji(text: string): boolean {
  return KANJI.test(text)
}

export function isJapanese(text: string): boolean {
  return JAPANESE.test(text)
}

interface ReadingToken {
  surface: string
  reading: string | null
}

// Builds 漢字[かんじ] markup (the notation parseFurigana renders) by walking
// the ORIGINAL text, so whitespace and line breaks the tokenizer drops or trims
// survive. A token whose surface cannot be found at the cursor is skipped and
// its text copied through plain.
export function furiganaMarkup(text: string, tokens: ReadingToken[]): string {
  let out = ''
  let cursor = 0
  for (const token of tokens) {
    if (!token.surface) continue
    const at = text.indexOf(token.surface, cursor)
    if (at < 0) continue
    out += text.slice(cursor, at)
    cursor = at + token.surface.length
    if (!hasKanji(token.surface) || !token.reading) {
      out += token.surface
      continue
    }
    for (const seg of alignFurigana(token.surface, token.reading)) {
      out += seg.ruby && hasKanji(seg.text) ? `${seg.text}[${seg.ruby}]` : seg.text
    }
  }
  return out + text.slice(cursor)
}

// FNV-1a over the day string: the same quote all day, a different one tomorrow.
function hashDay(day: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < day.length; i++) {
    h ^= day.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

// Picks from a stable ordering (by key) so adding a quote moves the pick only
// when it changes the pool, never because the list arrived in a new order.
export function quoteOfTheDay<T extends { key: string }>(quotes: T[], day: string): T | null {
  if (!quotes.length) return null
  const sorted = [...quotes].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
  return sorted[hashDay(day) % sorted.length]
}

// Display size class for a quote's length: short lines get big type.
export type QuoteScale = 'xl' | 'lg' | 'md' | 'sm'

export function quoteScale(text: string): QuoteScale {
  const n = [...text].length
  const weighted = isJapanese(text) ? n * 2 : n
  if (weighted <= 60) return 'xl'
  if (weighted <= 160) return 'lg'
  if (weighted <= 400) return 'md'
  return 'sm'
}
