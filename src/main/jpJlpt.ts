import { getDictDb } from './dict/dictDb'
import { randomGrammar } from './dict/grammar'
import { sampleSentences } from './dict/sentences'
import { kanjiByLevel } from './jpDrills'
import { flattenGlossary } from '@shared/dictContent'
import { kanjiChars } from '@shared/confusables'
import { splitMora, toHiragana } from '@shared/kana'
import { shuffle } from '@shared/shuffle'
import type {
  GlossaryItem,
  JlptLevel,
  JlptQuestion,
  JlptSection,
  JlptSectionKey,
  JlptTest
} from '@shared/types'

// The JLPT checkpoint, built from the OFFLINE PACKS rather than from the
// app's own seeded courses (the old sampler measured how much of this app you
// had studied and called it a level). Four sections:
//
//   grammar — a levelled grammar_point cloze (the bank IS levelled N5-N1)
//   vocab   — a frequency-rank window × JMdict meaning MC. JMdict carries NO
//             JLPT tags, so the level here is a FREQUENCY BAND, and the page
//             says so — it is a proxy, not the official list.
//   kanji   — words whose kanji are all at or below the level (KANJIDIC's jlpt
//             stat), reading MC
//   reading — a bank sentence in a per-level length band, pick its translation
//
// Returns null when the packs it needs are missing, and the page falls back to
// the seeded-course sampler it always had.

export const JLPT_RANK_WINDOWS: Record<JlptLevel, [number, number]> = {
  N5: [1, 1000],
  N4: [1001, 2500],
  N3: [2501, 5000],
  N2: [5001, 9000],
  N1: [9001, 15000]
}

export const JLPT_READING_BANDS: Record<JlptLevel, [number, number]> = {
  N5: [8, 18],
  N4: [12, 24],
  N3: [16, 32],
  N2: [20, 40],
  N1: [24, 50]
}

const WANTED: Record<JlptSectionKey, number> = { grammar: 8, vocab: 8, kanji: 8, reading: 6 }
const SECTION_LABEL: Record<JlptSectionKey, string> = {
  grammar: 'Grammar',
  vocab: 'Vocabulary',
  kanji: 'Kanji readings',
  reading: 'Reading'
}

// Hands an unavailable section's slots round-robin to the sections that are
// available, so the test is always the same length.
export function rebalanceSizes(
  available: Record<JlptSectionKey, boolean>
): Record<JlptSectionKey, number> {
  const keys = Object.keys(WANTED) as JlptSectionKey[]
  const live = keys.filter((k) => available[k])
  const out = {} as Record<JlptSectionKey, number>
  for (const k of keys) out[k] = available[k] ? WANTED[k] : 0
  if (live.length === 0) return out
  let spare = keys.filter((k) => !available[k]).reduce((n, k) => n + WANTED[k], 0)
  let i = 0
  while (spare > 0) {
    out[live[i % live.length]] += 1
    spare -= 1
    i += 1
  }
  return out
}

const firstGlossToken = (gloss: string): string =>
  gloss
    .toLowerCase()
    .replace(/^(to|a|an|the)\s+/, '')
    .split(/[\s;,(]/)[0]

interface FreqWord {
  expression: string
  reading: string
  gloss: string
}

// Words in a rank window with a JMdict reading + gloss.
function windowWords(level: JlptLevel, limit: number): FreqWord[] {
  const [lo, hi] = JLPT_RANK_WINDOWS[level]
  try {
    const rows = getDictDb()
      .prepare(
        `SELECT t.expression, t.reading, t.glossary FROM freq f
         JOIN term t ON t.expression = f.expression
         JOIN dict d ON d.id = t.dict_id
         WHERE f.rank BETWEEN ? AND ? AND d.priority >= 0 AND t.reading != ''
         ORDER BY RANDOM() LIMIT ?`
      )
      .all(lo, hi, Math.max(40, limit)) as { expression: string; reading: string; glossary: string }[]
    const seen = new Set<string>()
    const out: FreqWord[] = []
    for (const r of rows) {
      if (seen.has(r.expression)) continue
      let gloss = ''
      try {
        gloss = flattenGlossary(JSON.parse(r.glossary) as GlossaryItem[], 60)
      } catch {
        gloss = ''
      }
      if (!gloss) continue
      seen.add(r.expression)
      out.push({ expression: r.expression, reading: toHiragana(r.reading), gloss })
    }
    return out
  } catch {
    return []
  }
}

function grammarQuestions(level: JlptLevel, n: number): JlptQuestion[] {
  const pool = randomGrammar(Math.max(20, n * 4), [level])
  const out: JlptQuestion[] = []
  for (const point of shuffle(pool)) {
    if (out.length >= n) break
    const ex = point.examples.find((e) => e.clozeJp && e.clozeAnswer)
    if (!ex) continue
    const taken = new Set([ex.clozeAnswer!])
    const options = [ex.clozeAnswer!]
    for (const p of shuffle(pool)) {
      if (options.length >= 4) break
      const cand = p.examples.find((e) => e.clozeAnswer)?.clozeAnswer
      if (!cand || taken.has(cand)) continue
      taken.add(cand)
      options.push(cand)
    }
    if (options.length < 4) continue
    const shuffled = shuffle(options)
    out.push({
      section: 'grammar',
      heading: 'Fill the blank',
      prompt: ex.clozeJp!,
      promptHint: ex.en ?? null,
      options: shuffled,
      correct: shuffled.indexOf(ex.clozeAnswer!),
      reveal: { front: point.title, reading: null, back: point.meaning ?? '' }
    })
  }
  return out
}

function vocabQuestions(level: JlptLevel, n: number): JlptQuestion[] {
  const words = windowWords(level, n * 8)
  const out: JlptQuestion[] = []
  for (const w of words) {
    if (out.length >= n) break
    const taken = new Set([firstGlossToken(w.gloss)])
    const options = [w.gloss]
    for (const other of shuffle(words)) {
      if (options.length >= 4) break
      if (other.expression === w.expression) continue
      const token = firstGlossToken(other.gloss)
      if (taken.has(token)) continue
      taken.add(token)
      options.push(other.gloss)
    }
    if (options.length < 4) continue
    const shuffled = shuffle(options)
    out.push({
      section: 'vocab',
      heading: 'What does this word mean?',
      prompt: w.expression,
      promptHint: w.reading,
      options: shuffled,
      correct: shuffled.indexOf(w.gloss),
      reveal: { front: w.expression, reading: w.reading, back: w.gloss }
    })
  }
  return out
}

function kanjiQuestions(level: JlptLevel, n: number): { questions: JlptQuestion[]; note: string | null } {
  const levels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1']
  const upTo = levels.slice(0, levels.indexOf(level) + 1)
  const allowed = new Set(upTo.flatMap((l) => kanjiByLevel(l)))
  const words = windowWords(level, n * 10).filter((w) => kanjiChars(w.expression).length > 0)
  const note = allowed.size === 0 ? 'unlevelled (KANJIDIC not installed)' : null
  const pool = allowed.size === 0 ? words : words.filter((w) => kanjiChars(w.expression).every((c) => allowed.has(c)))
  const out: JlptQuestion[] = []
  for (const w of pool) {
    if (out.length >= n) break
    const mora = splitMora(w.reading).length
    const taken = new Set([w.reading])
    const options = [w.reading]
    for (const other of shuffle(pool)) {
      if (options.length >= 4) break
      if (other.expression === w.expression || taken.has(other.reading)) continue
      if (Math.abs(splitMora(other.reading).length - mora) > 1) continue
      taken.add(other.reading)
      options.push(other.reading)
    }
    if (options.length < 4) continue
    const shuffled = shuffle(options)
    out.push({
      section: 'kanji',
      heading: 'How is this word read?',
      prompt: w.expression,
      promptHint: null,
      options: shuffled,
      correct: shuffled.indexOf(w.reading),
      reveal: { front: w.expression, reading: w.reading, back: w.gloss }
    })
  }
  return { questions: out, note }
}

function readingQuestions(level: JlptLevel, n: number): JlptQuestion[] {
  const [lo, hi] = JLPT_READING_BANDS[level]
  const rows = sampleSentences({ minChars: lo, maxChars: hi, limit: Math.max(20, n * 6) })
  const out: JlptQuestion[] = []
  for (const s of rows) {
    if (out.length >= n) break
    const firstTwo = (t: string): string => t.toLowerCase().split(/\s+/).slice(0, 2).join(' ')
    const taken = new Set([firstTwo(s.en)])
    const options = [s.en]
    for (const other of shuffle(rows)) {
      if (options.length >= 4) break
      if (other.en === s.en) continue
      if (Math.abs(other.en.length - s.en.length) > s.en.length * 0.4) continue
      const key = firstTwo(other.en)
      if (taken.has(key)) continue
      taken.add(key)
      options.push(other.en)
    }
    if (options.length < 4) continue
    const shuffled = shuffle(options)
    out.push({
      section: 'reading',
      heading: 'What does this sentence say?',
      prompt: s.jp,
      promptHint: null,
      options: shuffled,
      correct: shuffled.indexOf(s.en),
      reveal: { front: s.jp, reading: null, back: s.en }
    })
  }
  return out
}

export function jlptTestPool(req: { level: JlptLevel }): JlptTest | null {
  const level = req.level
  // What the packs can actually supply — probe with small pulls.
  const grammarOk = randomGrammar(4, [level]).length >= 4
  const vocabProbe = windowWords(level, 40)
  const vocabOk = vocabProbe.length >= 8
  if (!grammarOk && !vocabOk) return null

  const kanjiProbe = kanjiQuestions(level, 1)
  const readingProbe = sampleSentences({
    minChars: JLPT_READING_BANDS[level][0],
    maxChars: JLPT_READING_BANDS[level][1],
    limit: 4
  })
  const sizes = rebalanceSizes({
    grammar: grammarOk,
    vocab: vocabOk,
    kanji: kanjiProbe.questions.length > 0,
    reading: readingProbe.length >= 4
  })

  const kanji = sizes.kanji > 0 ? kanjiQuestions(level, sizes.kanji) : { questions: [], note: null }
  const built: JlptSection[] = [
    {
      key: 'grammar' as const,
      label: SECTION_LABEL.grammar,
      wanted: sizes.grammar,
      questions: sizes.grammar > 0 ? grammarQuestions(level, sizes.grammar) : [],
      note: null
    },
    {
      key: 'vocab' as const,
      label: SECTION_LABEL.vocab,
      wanted: sizes.vocab,
      questions: sizes.vocab > 0 ? vocabQuestions(level, sizes.vocab) : [],
      note: 'level approximated by word frequency'
    },
    {
      key: 'kanji' as const,
      label: SECTION_LABEL.kanji,
      wanted: sizes.kanji,
      questions: kanji.questions,
      note: kanji.note
    },
    {
      key: 'reading' as const,
      label: SECTION_LABEL.reading,
      wanted: sizes.reading,
      questions: sizes.reading > 0 ? readingQuestions(level, sizes.reading) : [],
      note: null
    }
  ]
  const sections = built.filter((s) => s.questions.length > 0)

  if (sections.reduce((n, s) => n + s.questions.length, 0) < 8) return null
  return { level, source: 'packs', sections }
}
