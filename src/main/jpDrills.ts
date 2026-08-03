import { getSqlite } from './db/connection'
import { getDictDb } from './dict/dictDb'
import { pitchForWords } from './dict/kanjium'
import { componentsFor, kradComponents, kradFor, kradSample } from './dict/krad'
import { lookupKanji } from './dict/lookup'
import { rankFor } from './dict/similarKanji'
import { tokenize } from './tokenizer'
import { isKanaOnly, splitMora, toHiragana } from '@shared/kana'
import { chainKana } from '@shared/shiritori'
import { flattenGlossary } from '@shared/dictContent'
import { isLoanwordCandidate, kanjiChars } from '@shared/confusables'
import { TRANSITIVITY_PAIRS } from '@shared/transitivity'
import type {
  ComponentQuizItem,
  GlossaryItem,
  HomophoneQuizItem,
  LoanwordQuizItem,
  LookalikeQuizItem,
  PitchPoolItem,
  TransitivityQuestion
} from '@shared/types'

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

// Single-character kanji from the user's kanji-KIND lessons (by lesson kind,
// not the old title heuristic).
function kanjiFromCards(): string[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT DISTINCT c.front FROM jp_card c
       JOIN jp_lesson l ON l.id = c.lesson_id
       WHERE l.kind = 'kanji'`
    )
    .all() as { front: string }[]
  return rows.map((r) => r.front).filter((f) => [...f].length === 1)
}

// KANJIDIC kanji at an N level. KANJIDIC's jlpt stat uses the OLD 1-4 levels;
// some dicts carry jlpt_new 1-5 — accept either via the maps above.
function kanjiByLevel(level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'): string[] {
  const out: string[] = []
  try {
    const dictDb = getDictDb()
    const rows = dictDb
      .prepare('SELECT character, stats FROM kanji')
      .all() as { character: string; stats: string | null }[]
    for (const row of rows) {
      try {
        const stats = JSON.parse(row.stats ?? '{}') as Record<string, unknown>
        const jlptNew = String(stats.jlpt_new ?? '')
        const jlptOld = String(stats.jlpt ?? '')
        if (jlptNew === NEW_JLPT[level] || (!jlptNew && jlptOld === OLD_JLPT[level])) {
          out.push(row.character)
        }
      } catch {
        /* skip unparseable stats */
      }
    }
  } catch {
    /* pack absent */
  }
  return out
}

function componentCandidates(req: ComponentPoolRequest, limit: number): string[] {
  if (req.source.kind === 'cards') return kanjiFromCards()
  const byLevel = kanjiByLevel(req.source.level)
  // No KANJIDIC (or no jlpt stats at all): random decomposable kanji so the
  // drill still works, just unleveled.
  return byLevel.length > 0 ? byLevel : kradSample(limit * 3).map((e) => e.kanji)
}

// Kanji for the build-a-kanji drill: the char, its meaning/reading (KANJIDIC),
// its real components, and decoys. Empty when kradfile is missing; the
// renderer explains which pack to install.
export function componentQuizPool(req: ComponentPoolRequest): ComponentQuizItem[] {
  const limit = Math.max(1, Math.min(100, req.limit))
  const allComponents = kradComponents()
  if (allComponents.length === 0) return []

  const candidates = componentCandidates(req, limit)

  const picked: ComponentQuizItem[] = []
  const kanjiInfo = new Map(
    lookupKanji([...new Set(candidates)].slice(0, 400).join('')).map((k) => [k.character, k])
  )
  for (const kanji of shuffle([...new Set(candidates)])) {
    if (picked.length >= limit) break
    const decomposition = kradFor(kanji)
    if (!decomposition || decomposition.components.length === 0) continue
    const inKanji = new Set(decomposition.components.map((c) => c.char))
    // MEANER decoys first: components of this kanji's top look-alikes that
    // aren't in the kanji itself — the parts you'd pick if you were confusing
    // it with its visual neighbor.
    const decoyChars: { char: string; strokes: number | null }[] = []
    const taken = new Set<string>()
    for (const lookalike of rankFor(kanji, { limit: 2 })) {
      for (const part of componentsFor(lookalike.character)) {
        if (decoyChars.length >= 3) break
        if (inKanji.has(part) || taken.has(part)) continue
        taken.add(part)
        const known = allComponents.find((c) => c.component === part)
        decoyChars.push({ char: part, strokes: known?.strokes ?? null })
      }
    }
    // Top up to 6 with stroke-count-biased random components.
    const targetStrokes =
      decomposition.components.reduce((sum, c) => sum + (c.strokes ?? 3), 0) /
      decomposition.components.length
    const fill = allComponents
      .filter((c) => !inKanji.has(c.component) && !taken.has(c.component))
      .map((c) => ({
        c,
        score: Math.abs((c.strokes ?? 3) - targetStrokes) + Math.random() * 4
      }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 6 - decoyChars.length)
      .map(({ c }) => ({ char: c.component, strokes: c.strokes }))
    const decoys = [...decoyChars, ...fill]
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

// Look-alike drill pool: pick the RIGHT kanji among its visual neighbors.
// Decoys are real look-alikes with two fairness exclusions: never a decoy
// sharing a meaning string (variant kanji would make two options correct) and
// — since the prompt shows the reading — never one sharing that exact reading.
export function lookalikePool(req: ComponentPoolRequest): LookalikeQuizItem[] {
  const limit = Math.max(1, Math.min(100, req.limit))
  const candidates = [...new Set(componentCandidates(req, limit))]
  if (candidates.length === 0) return []

  const infoByChar = new Map(
    lookupKanji(candidates.slice(0, 400).join('')).map((k) => [k.character, k])
  )
  const out: LookalikeQuizItem[] = []
  for (const kanji of shuffle(candidates)) {
    if (out.length >= limit) break
    const info = infoByChar.get(kanji)
    const meaning = info?.meanings.slice(0, 3).join(', ') || null
    const reading = info?.kunyomi[0] ?? info?.onyomi[0] ?? null
    if (!meaning && !reading) continue // nothing to prompt with
    const ranked = rankFor(kanji, { limit: 10 })
    if (ranked.length === 0) continue
    const targetMeanings = new Set((info?.meanings ?? []).map((m) => m.toLowerCase()))
    const targetReadings = new Set([...(info?.kunyomi ?? []), ...(info?.onyomi ?? [])])
    const decoyInfo = new Map(
      lookupKanji(ranked.map((r) => r.character).join('')).map((k) => [k.character, k])
    )
    const decoys: string[] = []
    for (const cand of ranked) {
      if (decoys.length >= 3) break
      const dInfo = decoyInfo.get(cand.character)
      if (dInfo) {
        if (dInfo.meanings.some((m) => targetMeanings.has(m.toLowerCase()))) continue
        if ([...dInfo.kunyomi, ...dInfo.onyomi].some((r) => targetReadings.has(r))) continue
      }
      decoys.push(cand.character)
    }
    if (decoys.length < 3) continue
    out.push({ kanji, meaning, reading, decoys })
  }
  return out
}

// ---- transitivity drill pool ----

export interface TransitivityPoolRequest {
  limit: number
}

// Real Tatoeba sentences first, the pair's authored example as the always-
// present fallback — the drill needs no pack gating at all. A sentence is
// accepted only when it contains EXACTLY one verb token of the chosen member
// and none of the partner (both present = ambiguous question).
export async function transitivityPool(req: TransitivityPoolRequest): Promise<TransitivityQuestion[]> {
  const limit = Math.max(1, Math.min(50, req.limit))
  const out: TransitivityQuestion[] = []
  for (const pairDef of shuffle([...TRANSITIVITY_PAIRS]).slice(0, limit)) {
    const side: 'trans' | 'intrans' = Math.random() < 0.5 ? 'trans' : 'intrans'
    out.push(await buildTransitivityQuestion(pairDef, side))
  }
  return out
}

// One question for one pair+side — exported so tests hit both paths
// deterministically.
export async function buildTransitivityQuestion(
  pairDef: (typeof TRANSITIVITY_PAIRS)[number],
  side: 'trans' | 'intrans'
): Promise<TransitivityQuestion> {
  const member = side === 'trans' ? pairDef.trans : pairDef.intrans
  const other = side === 'trans' ? pairDef.intrans : pairDef.trans

  try {
    const db = getDictDb()
    const rows = db
      .prepare(
        `SELECT s.jp, s.en FROM sentence_fts f JOIN sentence s ON s.id = f.sentence_id
         WHERE f.keywords MATCH ? ORDER BY length(s.jp) ASC LIMIT 8`
      )
      .all(`"${member}"`) as { jp: string; en: string }[]
    for (const row of rows) {
      const tokens = await tokenize(row.jp)
      if (tokens.length === 0) break // tokenizer unavailable
      const verbTokens = tokens.filter((t) => t.pos === '動詞' && t.base === member)
      const otherPresent = tokens.some((t) => t.base === other)
      if (verbTokens.length === 1 && !otherPresent) {
        return {
          pairKey: pairDef.key,
          side,
          jp: row.jp,
          surface: verbTokens[0].surface,
          en: row.en,
          source: 'tatoeba'
        }
      }
    }
  } catch {
    /* no sentence bank — authored fallback below */
  }
  return {
    pairKey: pairDef.key,
    side,
    jp: side === 'trans' ? pairDef.exampleTrans : pairDef.exampleIntrans,
    surface: side === 'trans' ? pairDef.exampleTransSurface : pairDef.exampleIntransSurface,
    en: side === 'trans' ? pairDef.exampleTransEn : pairDef.exampleIntransEn,
    source: 'authored'
  }
}

// ---- homophone drill pool ----

export interface HomophonePoolRequest {
  source: 'cards' | 'frequency' | 'both'
  limit: number
}

interface HomophoneRow {
  expression: string
  reading: string
  glossary: string
  rank: number | null
}

// Same-reading, different-kanji groups from common vocabulary (driven from the
// frequency table so the whole term table is never scanned). Sentence mode
// renders the target as its KANA in place — okurigana differs across members
// (帰った vs 変えた), so a literal blank is unworkable.
export async function homophonePool(req: HomophonePoolRequest): Promise<HomophoneQuizItem[]> {
  const limit = Math.max(1, Math.min(50, req.limit))
  let rows: HomophoneRow[] = []
  try {
    const db = getDictDb()
    const src = db
      .prepare(
        `SELECT f.dict_id AS id FROM freq f JOIN dict d ON d.id = f.dict_id
         GROUP BY f.dict_id ORDER BY d.priority DESC, d.id DESC LIMIT 1`
      )
      .get() as { id: number } | undefined
    if (!src) return [] // gating: the pool needs a frequency dictionary
    rows = db
      .prepare(
        `SELECT t.expression, t.reading, t.glossary, MIN(f.rank) AS rank
         FROM freq f JOIN term t ON t.expression = f.expression
         JOIN dict d ON d.id = t.dict_id
         WHERE f.dict_id = ? AND f.rank <= 30000 AND d.priority >= 0 AND t.reading != ''
         GROUP BY t.expression, t.reading`
      )
      .all(src.id) as HomophoneRow[]
  } catch {
    return []
  }

  // Group kanji-bearing expressions by hiragana reading.
  const groups = new Map<string, HomophoneRow[]>()
  for (const row of rows) {
    if (kanjiChars(row.expression).length === 0) continue
    const key = toHiragana(row.reading)
    const list = groups.get(key) ?? []
    if (!list.some((r) => r.expression === row.expression)) list.push(row)
    groups.set(key, list)
  }
  let eligible = [...groups.entries()].filter(([, members]) => members.length >= 2)
  for (const [, members] of eligible) {
    members.sort((a, b) => (a.rank ?? 99999) - (b.rank ?? 99999))
    members.splice(5) // cap group size
  }

  if (req.source !== 'frequency') {
    // Cards mode: keep groups whose reading matches a learned card's.
    const db = getSqlite()
    const cardReadings = new Set(
      (
        db
          .prepare(
            `SELECT DISTINCT c.reading FROM jp_card c
             JOIN jp_lesson l ON l.id = c.lesson_id
             WHERE l.learned = 1 AND c.reading IS NOT NULL AND c.reading != ''`
          )
          .all() as { reading: string }[]
      ).map((r) => toHiragana(r.reading))
    )
    const fromCards = eligible.filter(([reading]) => cardReadings.has(reading))
    eligible =
      req.source === 'cards' ? fromCards : [...fromCards, ...eligible.filter(([r]) => !cardReadings.has(r))]
  }

  const glossOf = (row: HomophoneRow): string => {
    try {
      return flattenGlossary(JSON.parse(row.glossary) as GlossaryItem[], 80) || ''
    } catch {
      return ''
    }
  }
  const firstGlossToken = (gloss: string): string =>
    gloss.split(/[,;(/]| to /)[0]?.trim().toLowerCase().replace(/^to /, '') ?? ''

  const out: HomophoneQuizItem[] = []
  for (const [reading, members] of req.source === 'cards' || req.source === 'both'
    ? eligible
    : shuffle(eligible)) {
    if (out.length >= limit) break
    const withGloss = members.map((m) => ({
      expression: m.expression,
      gloss: glossOf(m),
      rank: m.rank
    }))
    if (withGloss.some((m) => !m.gloss)) continue
    const target = withGloss[Math.floor(Math.random() * withGloss.length)]
    // Near-synonym spellings (変える/換える) are unfair as OPTIONS; they stay
    // in the reveal group.
    // Deduped by first gloss token across ALL options, not merely against the
    // target: with target 買える, both 変える and 換える would otherwise survive
    // as options, and two choices that both mean "to change" is a question
    // with two defensible answers. (The target being random made this a
    // coin-flip CI failure before it was a fairness bug.)
    const seenTokens = new Set([firstGlossToken(target.gloss)])
    const options = [target]
    for (const m of withGloss) {
      if (options.length >= 4) break
      if (m.expression === target.expression) continue
      const token = firstGlossToken(m.gloss)
      // An unparseable gloss ('') never blocks another one.
      if (token && seenTokens.has(token)) continue
      if (token) seenTokens.add(token)
      options.push(m)
    }
    if (options.length < 2) continue

    // Sentence mode: shortest bank sentence containing the target, its surface
    // swapped for the kana reading.
    let jp: string | null = null
    let en: string | null = null
    try {
      const db = getDictDb()
      const sentences = db
        .prepare(
          `SELECT s.jp, s.en FROM sentence_fts f JOIN sentence s ON s.id = f.sentence_id
           WHERE f.keywords MATCH ?
           ORDER BY (instr(s.jp, ?) > 0) DESC, length(s.jp) ASC LIMIT 3`
        )
        .all(`"${target.expression}"`, target.expression) as { jp: string; en: string }[]
      for (const sentence of sentences) {
        const tokens = await tokenize(sentence.jp)
        if (tokens.length === 0) break
        let offset = 0
        for (const tok of tokens) {
          const idx = sentence.jp.indexOf(tok.surface, offset)
          if (idx === -1) break
          if (tok.base === target.expression || tok.surface === target.expression) {
            const kana = toHiragana(tok.reading ?? target.expression)
            jp = sentence.jp.slice(0, idx) + kana + sentence.jp.slice(idx + tok.surface.length)
            en = sentence.en
            break
          }
          offset = idx + tok.surface.length
        }
        if (jp) break
      }
    } catch {
      /* gloss mode below */
    }

    out.push({
      reading,
      target: target.expression,
      options: shuffle(options),
      group: withGloss,
      jp,
      en,
      mode: jp ? 'sentence' : 'gloss'
    })
  }
  return out
}

// ---- katakana loanword pool ----

export interface LoanwordPoolRequest {
  limit: number
}

// Common all-katakana words (the reading='' kana-only convention) — the drill
// asks what they mean, which is harder than it sounds once phonetic drift
// kicks in (ミシン ← machine).
export function loanwordSample(req: LoanwordPoolRequest): LoanwordQuizItem[] {
  const limit = Math.max(4, Math.min(200, req.limit))
  try {
    const db = getDictDb()
    const rows = db
      .prepare(
        `SELECT t.expression, t.term_tags, t.glossary,
                (SELECT MIN(f.rank) FROM freq f WHERE f.expression = t.expression) AS rank
         FROM term t JOIN dict d ON d.id = t.dict_id
         WHERE d.priority >= 0 AND t.reading = ''
         GROUP BY t.expression`
      )
      .all() as { expression: string; term_tags: string | null; glossary: string; rank: number | null }[]
    const candidates: { item: LoanwordQuizItem; score: number }[] = []
    for (const row of rows) {
      const tags = (row.term_tags ?? '').split(/\s+/).filter(Boolean)
      if (!isLoanwordCandidate(row.expression, tags, row.rank)) continue
      let gloss = ''
      try {
        gloss = flattenGlossary(JSON.parse(row.glossary) as GlossaryItem[], 80) || ''
      } catch {
        continue
      }
      if (!gloss) continue
      candidates.push({
        item: { word: row.expression, gloss, rank: row.rank },
        score: (row.rank ?? 60000) + Math.random() * 30000
      })
    }
    candidates.sort((a, b) => a.score - b.score)
    return candidates.slice(0, limit).map((c) => c.item)
  } catch {
    return []
  }
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
