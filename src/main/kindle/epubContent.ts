// Pure: the books NaviHUB makes for the Kindle, as EpubBook values built from
// library data the caller reads. No electron, fs or database import.
//
// - My Quotes: the user's quote book, one chapter per source title (or per
//   theme), in the order the Quotes page shows them.
// - Japanese graded readings: the built-in passages of one level, with ruby
//   furigana, the glossary, and the questions; answers close each chapter,
//   after a rule, so the reader can check without seeing them first.

import { parseFurigana } from '@shared/japanese/furigana'
import type { JpPassage, JpReadingLevel } from '@shared/japanese/types'
import type { SavedQuote } from '@shared/types'
import type { Block, EpubBook, EpubChapter, Inline } from './epubBuild'

export type QuoteGrouping = 'source' | 'theme'

export interface QuotesBookOptions {
  grouping: QuoteGrouping
  favoritesOnly: boolean
}

function ruby(text: string): Inline[] {
  return parseFurigana(text).map((s) => (s.ruby ? { text: s.text, ruby: s.ruby } : { text: s.text }))
}

function quoteBlocks(q: SavedQuote, withSource: boolean): Block[] {
  const blocks: Block[] = [{ kind: 'p', style: 'quote', parts: q.furigana ? ruby(q.furigana) : [{ text: q.text }] }]
  if (q.translation) blocks.push({ kind: 'p', style: 'muted', parts: [{ text: q.translation }] })
  const by = [q.speakerName, withSource ? q.sourceTitle : null, q.locator].filter((s): s is string => !!s?.trim())
  if (by.length) blocks.push({ kind: 'p', style: 'source', parts: [{ text: `— ${by.join(', ')}` }] })
  if (q.note) blocks.push({ kind: 'p', style: 'note', parts: [{ text: `Note: ${q.note}` }] })
  return blocks
}

const NO_SOURCE = 'Without a source'
const NO_THEME = 'Without a theme'

export function quotesBook(quotes: SavedQuote[], opts: QuotesBookOptions, now: Date, id: string): EpubBook {
  const kept = quotes.filter((q) => q.text.trim() && (!opts.favoritesOnly || q.favorite))
  if (!kept.length) throw new Error(opts.favoritesOnly ? 'No favorite quotes yet' : 'No quotes yet')
  const groups = new Map<string, SavedQuote[]>()
  const add = (key: string, q: SavedQuote): void => {
    const list = groups.get(key)
    if (list) list.push(q)
    else groups.set(key, [q])
  }
  for (const q of kept) {
    if (opts.grouping === 'theme') {
      if (q.themes.length) for (const t of q.themes) add(t, q)
      else add(NO_THEME, q)
    } else {
      add(q.sourceTitle?.trim() || NO_SOURCE, q)
    }
  }
  const leftover = opts.grouping === 'theme' ? NO_THEME : NO_SOURCE
  const names = [...groups.keys()].sort((a, b) =>
    a === leftover ? 1 : b === leftover ? -1 : a.localeCompare(b, undefined, { sensitivity: 'base' })
  )
  const chapters: EpubChapter[] = names.map((name) => {
    const blocks: Block[] = []
    groups.get(name)!.forEach((q, i) => {
      if (i > 0) blocks.push({ kind: 'rule' })
      blocks.push(...quoteBlocks(q, opts.grouping === 'theme'))
    })
    return { title: name, blocks }
  })
  return {
    id,
    title: opts.favoritesOnly ? 'My Favorite Quotes' : 'My Quotes',
    author: 'NaviHUB',
    language: 'en',
    modified: isoSeconds(now),
    chapters
  }
}

export const READING_LEVELS: JpReadingLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1']

export function readingsBook(passages: JpPassage[], level: JpReadingLevel, now: Date, id: string): EpubBook {
  const chosen = passages.filter((p) => p.level === level)
  if (!chosen.length) throw new Error(`No ${level} passages`)
  const chapters: EpubChapter[] = chosen.map((p) => {
    const blocks: Block[] = [{ kind: 'p', style: 'muted', parts: [{ text: p.topic }] }]
    for (const para of p.text.split('\n')) {
      if (para.trim()) blocks.push({ kind: 'p', parts: ruby(para) })
    }
    if (p.glossary.length) {
      blocks.push({ kind: 'h2', text: 'Words' })
      blocks.push({
        kind: 'list',
        ordered: false,
        items: p.glossary.map((g) => [{ text: g.word, ruby: g.reading }, { text: ` ${g.gloss}` }])
      })
    }
    blocks.push({ kind: 'h2', text: 'Questions' })
    p.questions.forEach((q, i) => {
      blocks.push({ kind: 'p', parts: [{ text: `${i + 1}. ` }, ...ruby(q.prompt)] })
      blocks.push({
        kind: 'list',
        ordered: false,
        items: q.options.map((o, j) => [{ text: `${'ABCD'[j]}. ` }, ...ruby(o)])
      })
    })
    blocks.push({ kind: 'rule' })
    blocks.push({ kind: 'h2', text: 'Answers' })
    p.questions.forEach((q, i) => {
      blocks.push({
        kind: 'p',
        style: 'note',
        parts: [{ text: `${i + 1}. ${'ABCD'[q.correct] ?? '?'}: ${q.explain}` }]
      })
    })
    return { title: stripRuby(p.title), blocks }
  })
  return {
    id,
    title: `Japanese Graded Readings ${level}`,
    author: 'NaviHUB',
    language: 'ja',
    modified: isoSeconds(now),
    chapters
  }
}

function stripRuby(text: string): string {
  return parseFurigana(text)
    .map((s) => s.text)
    .join('')
}

function isoSeconds(d: Date): string {
  return d.toISOString().replace(/\.\d{3}Z$/, 'Z')
}
