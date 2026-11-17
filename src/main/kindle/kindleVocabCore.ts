// Pure rules for importing KOReader's vocabulary builder (words looked up
// while reading) into the study sections: English words into the English
// deck, Japanese words into the Japanese mining inbox. No electron, fs or
// database import; kindle.ts and kindleRepo.ts feed data in.
//
// Every word comes with the sentence it was read in and the book, and is
// offered once: a word imported before (kindle_vocab) or already in the deck
// is not offered again. A word the offline dictionary cannot define is listed
// but cannot be imported, because both decks need a meaning.

import type { KoVocabRow } from './kindleScan'

export type VocabKind = 'en' | 'jp'

// The word as stored: NFKC, trimmed, a curly apostrophe made straight (so
// "don’t" and "don't" are one word).
export function cleanWord(word: string): string {
  return word.normalize('NFKC').trim().replace(/’/g, "'")
}

// Japanese when the word holds kana or kanji; English when it is Latin
// letters (with an inner apostrophe or hyphen); anything else is skipped. A
// word of kanji alone may be Chinese: it is offered only when the Japanese
// dictionary lists that exact word (the lookup in kindle.ts decides).
export function vocabKind(word: string): VocabKind | null {
  const w = cleanWord(word)
  if (!w) return null
  if (/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u.test(w)) return 'jp'
  if (/^[A-Za-z]+(?:['-][A-Za-z]+)*$/.test(w)) return 'en'
  return null
}

// Frozen form (kindle_vocab.word_key): kind and the folded word.
export function vocabKey(kind: VocabKind, word: string): string {
  const w = cleanWord(word)
  return `${kind}:${kind === 'en' ? w.toLowerCase() : w}`
}

const SENTENCE_END = /[.!?。！？\n]/
const CONTEXT_MAX = 300

// The sentence the word was read in: the end of the text before it from the
// last sentence break, the word as tapped, and the text after it up to the
// next break.
export function vocabContext(row: Pick<KoVocabRow, 'word' | 'highlight' | 'prev' | 'next'>): string | null {
  const prev = row.prev ?? ''
  const next = row.next ?? ''
  if (!prev && !next) return null
  let start = 0
  for (let i = prev.length - 1; i >= 0; i--) {
    if (SENTENCE_END.test(prev[i])) {
      start = i + 1
      break
    }
  }
  let end = next.length
  for (let i = 0; i < next.length; i++) {
    if (SENTENCE_END.test(next[i])) {
      end = next[i] === '\n' ? i : i + 1
      break
    }
  }
  const before = prev.slice(start).replace(/\s+/g, ' ').trimStart()
  const word = row.highlight ?? row.word
  const after = next.slice(0, end).replace(/\s+/g, ' ').trimEnd()
  if (!`${before}${word}${after}`.trim()) return null
  // Too long: keep a window around the word, never cutting the word out.
  const room = Math.max(0, CONTEXT_MAX - word.length - 2)
  let b = before
  let a = after
  if (b.length + a.length > room) {
    const half = Math.floor(room / 2)
    const keepA = Math.min(a.length, Math.max(half, room - b.length))
    const keepB = Math.min(b.length, room - keepA)
    b = keepB < b.length ? `…${b.slice(b.length - keepB)}` : b
    a = keepA < a.length ? `${a.slice(0, keepA)}…` : a
  }
  return `${b}${word}${a}`.trim()
}

export interface VocabLookup {
  meaning: string | null
  reading?: string | null
  pos?: string | null
}

export interface PlannedWord {
  key: string
  kind: VocabKind
  word: string
  reading: string | null
  meaning: string | null
  pos: string | null
  context: string | null
  book: string | null
  // False when the dictionary has no meaning: listed, never imported.
  importable: boolean
}

// One line per new word, earliest lookup first. `skip` holds keys already
// imported or already in a deck.
export function planVocab(rows: KoVocabRow[], skip: Set<string>, lookups: Map<string, VocabLookup>): PlannedWord[] {
  const seen = new Set<string>()
  const out: PlannedWord[] = []
  const sorted = [...rows].sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
  for (const r of sorted) {
    const kind = vocabKind(r.word)
    if (!kind) continue
    const key = vocabKey(kind, r.word)
    if (seen.has(key) || skip.has(key)) continue
    seen.add(key)
    const found = lookups.get(key)
    const meaning = found?.meaning?.trim() || null
    out.push({
      key,
      kind,
      word: cleanWord(r.word),
      reading: found?.reading?.trim() || null,
      meaning,
      pos: found?.pos?.trim() || null,
      context: vocabContext(r),
      book: r.title,
      importable: meaning != null
    })
  }
  return out
}
