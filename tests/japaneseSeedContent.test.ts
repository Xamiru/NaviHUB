import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'

vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

import { SEED_PACKS } from '../src/main/db/japaneseSeed'
import { cardSeedKey } from '../src/main/db/japaneseSeedSync'
import { kuromojiBackend } from '../src/main/tokenizer'

// Content gates for the built-in Japanese courses. Every content wave lands
// with these green; they catch the mistakes a human proofreader misses most:
// a reading typo, an example sentence about a different word, a decorative
// glyph, a grammar lesson with no explanation.

const exceptions = JSON.parse(
  readFileSync(fileURLToPath(new URL('./fixtures/jpSeedReadingExceptions.json', import.meta.url)), 'utf8')
) as { cards: Record<string, string>; examples: Record<string, string> }

const hira = (s: string): string =>
  s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
const kana = (s: string): string => hira(s).replace(/[^ぁ-ゖー]/g, '')

// Packs whose vocabulary lessons must carry example sentences (wave 3 adds
// the N5–N3 decks as their sentences land).
const EXAMPLE_REQUIRED = new Set<string>(['n5', 'n4vocab', 'n3vocab', 'n2vocab', 'n1vocab', 'setphrases', 'vnslang'])

const lessons = SEED_PACKS.flatMap((p) => p.course.lessons.map((l) => ({ pack: p.key, ...l })))

describe('built-in course content', () => {
  it('every reading matches the tokenizer, or is a reviewed exception', async () => {
    const mismatches: string[] = []
    for (const lesson of lessons) {
      if (lesson.kind === 'kanji') continue // a lone character has several readings
      for (const card of lesson.cards) {
        if (!card.reading) continue
        const tokens = await kuromojiBackend.tokenize(card.front)
        const got = kana(tokens.map((t) => t.reading ?? t.surface).join(''))
        if (got !== kana(card.reading)) mismatches.push(cardSeedKey(lesson.key, card))
      }
    }
    const listed = new Set(Object.keys(exceptions.cards))
    // A new mismatch: a typo, or a card to check and add to the exceptions file.
    expect(mismatches.filter((k) => !listed.has(k))).toEqual([])
    // A listed card that now matches (or no longer exists) leaves the list.
    expect([...listed].filter((k) => !mismatches.includes(k))).toEqual([])
  }, 60_000)

  it('every example reading matches the tokenizer, or is a reviewed exception', async () => {
    const mismatches: string[] = []
    for (const lesson of lessons) {
      for (const card of lesson.cards) {
        if (!card.exampleJp || !card.exampleReading) continue
        const tokens = await kuromojiBackend.tokenize(card.exampleJp)
        const got = kana(tokens.map((t) => t.reading ?? t.surface).join(''))
        if (got !== kana(card.exampleReading)) mismatches.push(cardSeedKey(lesson.key, card))
      }
    }
    const listed = new Set(Object.keys(exceptions.examples))
    expect(mismatches.filter((k) => !listed.has(k))).toEqual([])
    expect([...listed].filter((k) => !mismatches.includes(k))).toEqual([])
  }, 60_000)

  it('every vocabulary card in the N5–N3 vocabulary decks has an example sentence', () => {
    // Words met in context stick; the curated N5–N3 vocabulary decks carry one
    // authored sentence per word (the N2/N1 decks always did).
    const bare = lessons
      .filter((l) => l.kind === 'vocab' && EXAMPLE_REQUIRED.has(l.pack))
      .flatMap((l) => l.cards.filter((c) => !c.exampleJp || !c.exampleReading || !c.exampleEn).map((c) => `${l.key}: ${c.front}`))
    expect(bare).toEqual([])
  })

  it('grammar lessons explain themselves and give at least five examples', () => {
    const problems = lessons
      .filter((l) => l.kind === 'grammar')
      .flatMap((l) => [
        ...(l.body?.trim() ? [] : [`${l.key}: no explanation`]),
        ...(l.cards.length >= 5 ? [] : [`${l.key}: ${l.cards.length} examples`])
      ])
    expect(problems).toEqual([])
  })

  it('a vocabulary example sentence uses its own word', () => {
    // The word itself, or its stem when the sentence inflects it (含まれる →
    // 含まれていない; 勉強する → 勉強した).
    const stem = (front: string): string => front.replace(/する$/, '').replace(/[ぁ-ん]$/, '')
    const strays = lessons
      .filter((l) => l.kind === 'vocab')
      .flatMap((l) => l.cards.map((c) => ({ l, c })))
      .filter(({ c }) => c.exampleJp && !c.exampleJp.includes(c.front) && !c.exampleJp.includes(stem(c.front)))
      .map(({ l, c }) => `${l.key}: ${c.front} | ${c.exampleJp}`)
    expect(strays).toEqual([])
  })

  it('no card front repeats inside a lesson', () => {
    const dups = lessons.flatMap((l) => {
      const seen = new Set<string>()
      return l.cards.filter((c) => (seen.has(c.front) ? true : (seen.add(c.front), false))).map((c) => `${l.key}: ${c.front}`)
    })
    expect(dups).toEqual([])
  })

  it('a Japanese sentence and its reading carry no stray spaces', () => {
    // Japanese is written without spaces; one inside a sentence front or its
    // kana reading is a typo that breaks typed answers and reading checks.
    const japanese = /[ぁ-んァ-ヶ一-龯]/
    const spaced = lessons.flatMap((l) =>
      l.cards
        .filter((c) => japanese.test(c.front) && (/[ 　]/.test(c.front) || /[ 　]/.test(c.reading ?? '')))
        .map((c) => `${l.key}: ${c.front}`)
    )
    expect(spaced).toEqual([])
  })

  it('carries no emoji or decorative glyphs', () => {
    const pictographic = /\p{Extended_Pictographic}/u
    const hits: string[] = []
    for (const p of SEED_PACKS) {
      for (const text of [p.course.title, p.course.description]) if (pictographic.test(text)) hits.push(p.key)
      for (const l of p.course.lessons) {
        const strings = [l.title, l.body ?? '', ...l.cards.flatMap((c) => Object.values(c).filter((v): v is string => typeof v === 'string'))]
        if (strings.some((s) => pictographic.test(s))) hits.push(l.key)
      }
    }
    expect(hits).toEqual([])
  })
})
