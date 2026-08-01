import { getSqlite } from './db/connection'
import { getDictDb } from './dict/dictDb'
import { pitchForWords } from './dict/kanjium'
import { kradComponents, kradFor, kradSample } from './dict/krad'
import { lookupKanji } from './dict/lookup'
import { isKanaOnly, splitMora, toHiragana } from '@shared/kana'
import { chainKana } from '@shared/shiritori'
import { flattenGlossary } from '@shared/dictContent'
import type { ComponentQuizItem, GlossaryItem, PitchPoolItem } from '@shared/types'

// Question pools for the Japanese drills that need BOTH databases (the
// coreDeck.ts pattern: navihub.db for the user's cards, dictionaries.db for
// pack data, joined in JS). Pools are sampled fresh per round in a plain await
// from the Start handler — never cached in the query client.

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export interface PitchPoolRequest {
  source: 'cards' | 'frequency' | 'both'
  limit: number
}

// Words for the pitch-pattern quiz: the user's learned cards joined against
// the installed pitch data, topped up from the frequency table so the pool is
// playable even with few matching cards. Readings under 2 morae are skipped —
// a one-mora word has no pattern worth quizzing.
export function pitchQuizPool(req: PitchPoolRequest): PitchPoolItem[] {
  const limit = Math.max(1, Math.min(500, req.limit))
  const out: PitchPoolItem[] = []
  const seen = new Set<string>()

  const push = (term: string, reading: string, positions: number[], fromCards: boolean): void => {
    const displayReading = reading || term
    if (!isKanaOnly(displayReading)) return
    if (splitMora(toHiragana(displayReading)).length < 2) return
    const key = `${term}|${displayReading}`
    if (seen.has(key)) return
    seen.add(key)
    out.push({ term, reading: displayReading, positions, fromCards })
  }

  if (req.source !== 'frequency') {
    const db = getSqlite()
    // Cards whose lessons are learned = the words the user actually knows.
    const cards = db
      .prepare(
        `SELECT c.front, c.reading FROM jp_card c
         JOIN jp_lesson l ON l.id = c.lesson_id
         WHERE l.learned = 1`
      )
      .all() as { front: string; reading: string | null }[]
    const entries = pitchForWords(cards.map((c) => c.front))
    const byExpr = new Map<string, typeof entries>()
    for (const e of entries) {
      const list = byExpr.get(e.expression) ?? []
      list.push(e)
      byExpr.set(e.expression, list)
    }
    for (const card of shuffle(cards)) {
      const candidates = byExpr.get(card.front)
      if (!candidates || candidates.length === 0) continue
      // Prefer the entry whose reading agrees with the card's; fall back to
      // the first attested reading for the expression.
      const match =
        (card.reading &&
          candidates.find(
            (e) => toHiragana(e.reading || e.expression) === toHiragana(card.reading!)
          )) ||
        candidates[0]
      push(card.front, match.reading, match.positions, true)
    }
  }

  if (req.source !== 'cards' && out.length < limit) {
    try {
      const dictDb = getDictDb()
      // Most common words that have pitch data, from the highest-priority
      // frequency dictionary (coreDeck's source-pick rationale).
      const src = dictDb
        .prepare(
          `SELECT f.dict_id AS id FROM freq f JOIN dict d ON d.id = f.dict_id
           GROUP BY f.dict_id ORDER BY d.priority DESC, d.id DESC LIMIT 1`
        )
        .get() as { id: number } | undefined
      if (src) {
        const rows = dictDb
          .prepare(
            `SELECT p.expression, p.reading, p.pitches, MIN(f.rank) AS rank
             FROM freq f JOIN pitch p ON p.expression = f.expression
             WHERE f.dict_id = ?
             GROUP BY p.expression, p.reading
             ORDER BY rank ASC LIMIT ?`
          )
          .all(src.id, limit * 4) as {
          expression: string
          reading: string
          pitches: string
        }[]
        for (const row of shuffle(rows)) {
          if (out.length >= limit * 2) break
          let positions: number[] = []
          try {
            positions = (JSON.parse(row.pitches) as { position?: number }[])
              .map((p) => p.position)
              .filter((p): p is number => typeof p === 'number')
          } catch {
            continue
          }
          if (positions.length === 0) continue
          push(row.expression, row.reading, positions, false)
        }
      }
    } catch {
      // No dict data — the cards half (if any) still plays.
    }
  }

  // Cards first (they're the point), frequency fill shuffled behind them.
  const cards = out.filter((i) => i.fromCards)
  const fill = out.filter((i) => !i.fromCards)
  return [...shuffle(cards), ...shuffle(fill)].slice(0, limit)
}

export interface ComponentPoolRequest {
  source: { kind: 'cards' } | { kind: 'level'; level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' }
  limit: number
}

// KANJIDIC's jlpt stat uses the OLD 1-4 levels; some dicts carry a jlpt_new
// 1-5. Accept either, mapping new N-levels onto the old scale (N3/N2 both
// landed in old level 2 — the historically honest approximation).
const OLD_JLPT: Record<string, string> = { N5: '4', N4: '3', N3: '2', N2: '2', N1: '1' }
const NEW_JLPT: Record<string, string> = { N5: '5', N4: '4', N3: '3', N2: '2', N1: '1' }

// Kanji for the build-a-kanji drill: the char, its meaning/reading (KANJIDIC),
// its real components, and stroke-similar decoys. Empty when kradfile is
// missing; the renderer explains which pack to install.
export function componentQuizPool(req: ComponentPoolRequest): ComponentQuizItem[] {
  const limit = Math.max(1, Math.min(100, req.limit))
  const allComponents = kradComponents()
  if (allComponents.length === 0) return []

  // Candidate kanji characters per source.
  let candidates: string[] = []
  if (req.source.kind === 'cards') {
    const db = getSqlite()
    // Kanji-kind lessons by LESSON KIND — not the old title heuristic.
    const rows = db
      .prepare(
        `SELECT DISTINCT c.front FROM jp_card c
         JOIN jp_lesson l ON l.id = c.lesson_id
         WHERE l.kind = 'kanji'`
      )
      .all() as { front: string }[]
    candidates = rows.map((r) => r.front).filter((f) => [...f].length === 1)
  } else {
    try {
      const dictDb = getDictDb()
      const level = req.source.level
      const rows = dictDb
        .prepare('SELECT character, stats FROM kanji')
        .all() as { character: string; stats: string | null }[]
      for (const row of rows) {
        try {
          const stats = JSON.parse(row.stats ?? '{}') as Record<string, unknown>
          const jlptNew = String(stats.jlpt_new ?? '')
          const jlptOld = String(stats.jlpt ?? '')
          if (jlptNew === NEW_JLPT[level] || (!jlptNew && jlptOld === OLD_JLPT[level])) {
            candidates.push(row.character)
          }
        } catch {
          /* skip unparseable stats */
        }
      }
    } catch {
      candidates = []
    }
    // No KANJIDIC (or no jlpt stats at all): random decomposable kanji so the
    // drill still works, just unleveled.
    if (candidates.length === 0) {
      candidates = kradSample(limit * 3).map((e) => e.kanji)
    }
  }

  const picked: ComponentQuizItem[] = []
  const kanjiInfo = new Map(
    lookupKanji([...new Set(candidates)].slice(0, 400).join('')).map((k) => [k.character, k])
  )
  for (const kanji of shuffle([...new Set(candidates)])) {
    if (picked.length >= limit) break
    const decomposition = kradFor(kanji)
    if (!decomposition || decomposition.components.length === 0) continue
    const inKanji = new Set(decomposition.components.map((c) => c.char))
    // Decoys: real components not in this kanji, biased toward similar stroke
    // counts so they're plausible.
    const targetStrokes =
      decomposition.components.reduce((sum, c) => sum + (c.strokes ?? 3), 0) /
      decomposition.components.length
    const decoys = allComponents
      .filter((c) => !inKanji.has(c.component))
      .map((c) => ({
        c,
        score: Math.abs((c.strokes ?? 3) - targetStrokes) + Math.random() * 4
      }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 6)
      .map(({ c }) => ({ char: c.component, strokes: c.strokes }))
    const info = kanjiInfo.get(kanji)
    picked.push({
      kanji,
      meaning: info?.meanings.slice(0, 3).join(', ') || null,
      reading: info?.kunyomi[0] ?? info?.onyomi[0] ?? null,
      components: decomposition.components,
      decoys
    })
  }
  return picked
}

export interface ShiritoriNextRequest {
  kana: string // required starting kana (hiragana)
  exclude: string[] // expressions AND readings already used
}

export interface ShiritoriWord {
  expression: string
  reading: string
  gloss: string | null
}

// The app's shiritori reply: a random common-ish noun whose reading starts
// with `kana`, doesn't end the game (ん), and hasn't been used. null = the app
// is out of words and the user wins. Common-ness comes from the freq table
// with jitter so games don't repeat the same openers.
export function shiritoriNext(req: ShiritoriNextRequest): ShiritoriWord | null {
  const kana = toHiragana((req.kana ?? '').trim())
  if (!kana) return null
  const used = new Set(req.exclude.map((w) => toHiragana(w)))
  try {
    const db = getDictDb()
    // Candidate rows: reading (or kana-only expression) starts with the kana.
    // JMnedict sits at negative priority — obscure names are no fun to lose to.
    const rows = db
      .prepare(
        `SELECT t.expression, t.reading, t.def_tags, t.glossary,
                (SELECT MIN(f.rank) FROM freq f WHERE f.expression = t.expression) AS rank
         FROM term t JOIN dict d ON d.id = t.dict_id
         WHERE d.priority >= 0
           AND (CASE WHEN t.reading != '' THEN t.reading ELSE t.expression END) LIKE ? || '%'
         LIMIT 4000`
      )
      .all(kana) as {
      expression: string
      reading: string
      def_tags: string | null
      glossary: string
      rank: number | null
    }[]

    const candidates: { word: ShiritoriWord; score: number }[] = []
    const seen = new Set<string>()
    for (const row of rows) {
      const reading = row.reading || row.expression
      const hira = toHiragana(reading)
      if (!isKanaOnly(hira)) continue
      if (splitMora(hira).length < 2) continue
      // Nouns only — the game is played with nouns, and 'n' is a JMdict tag.
      const tags = (row.def_tags ?? '').split(/\s+/)
      if (!tags.includes('n')) continue
      // Never answer with a word that ends the game or one already played.
      if (chainKana(hira) === null) continue
      if (used.has(toHiragana(row.expression)) || used.has(hira)) continue
      const key = `${row.expression}|${hira}`
      if (seen.has(key)) continue
      seen.add(key)
      let gloss: string | null = null
      try {
        gloss = flattenGlossary(JSON.parse(row.glossary) as GlossaryItem[], 120) || null
      } catch {
        /* keep null */
      }
      // Rank with jitter: common words dominate but games stay varied.
      const score = (row.rank ?? 60_000) + Math.random() * 30_000
      candidates.push({ word: { expression: row.expression, reading: hira, gloss }, score })
    }
    if (candidates.length === 0) return null
    candidates.sort((a, b) => a.score - b.score)
    return candidates[0].word
  } catch {
    return null
  }
}
