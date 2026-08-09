import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
// llm.ts pulls the SDKs; the pure prompt/parse halves under test never touch
// them, but the module graph does — stub the lot.
vi.mock('../src/main/llm', () => ({
  completeOnce: vi.fn(),
  friendlyError: (e: unknown) => (e as Error).message
}))

import { buildFeedbackPrompt, parseFeedback } from '../src/main/englishWriting'
import { listWritings, removeWriting, saveWriting, writingErrorTally } from '../src/main/repos/englishRepo'
import type { EnWritingPrompt } from '../src/shared/english/types'
import type { EnWritingFeedback } from '../src/shared/types'

beforeEach(() => {
  db = createTestDb()
})

const PROMPT: EnWritingPrompt = {
  key: 'opinion-test',
  kind: 'opinion',
  title: 'Test prompt',
  instructions: 'Argue for or against the proposition.',
  minWords: 180,
  maxWords: 300
}

// The learner's submission, so corrections can be checked against it.
const SUBMISSION = 'i think the argument holds, but i would qualify it.'

const GOOD_JSON = JSON.stringify({
  scores: { grammar: 7, vocabulary: 8, coherence: 6, register: 7 },
  corrections: [{ before: 'i think', after: 'I think', why: 'Capitalize the pronoun I.' }],
  modelRewrite: 'A polished version.',
  overall: 'Solid argument; fix capitalization.'
})

describe('buildFeedbackPrompt', () => {
  it('includes the task, length expectation, weak spots and the submission', () => {
    const built = buildFeedbackPrompt(PROMPT, null, 'My essay text.')
    expect(built.system).toContain('C1/C2')
    expect(built.system).toContain('run-ons, comma splices')
    expect(built.prompt).toContain('Argue for or against')
    expect(built.prompt).toContain('180-300 words')
    expect(built.prompt).toContain('My essay text.')
    expect(built.prompt).not.toContain('# Passage')
  })

  it('embeds the passage for summary tasks', () => {
    const built = buildFeedbackPrompt(
      { ...PROMPT, kind: 'summary', passageKey: 'x' },
      'The passage body.',
      'My summary.'
    )
    expect(built.prompt).toContain('# Passage the task refers to')
    expect(built.prompt).toContain('The passage body.')
  })
})

describe('parseFeedback', () => {
  it('parses a clean JSON reply', () => {
    const fb = parseFeedback(GOOD_JSON, SUBMISSION)
    expect(fb.scores.grammar).toBe(7)
    expect(fb.corrections).toHaveLength(1)
    expect(fb.modelRewrite).toBe('A polished version.')
  })

  it('strips markdown fences and surrounding prose', () => {
    const fb = parseFeedback(
      'Here is your feedback:\n```json\n' + GOOD_JSON + '\n```\nGood luck!',
      SUBMISSION
    )
    expect(fb.scores.vocabulary).toBe(8)
  })

  it('clamps out-of-range scores and coerces numeric strings', () => {
    const fb = parseFeedback(
      JSON.stringify({
        scores: { grammar: 14, vocabulary: -2, coherence: '8', register: 5 },
        modelRewrite: 7
      }),
      SUBMISSION
    )
    expect(fb.scores.grammar).toBe(10)
    expect(fb.scores.vocabulary).toBe(0)
    // A model that types a score as a string used to be persisted as 0.
    expect(fb.scores.coherence).toBe(8)
    expect(fb.corrections).toEqual([])
    expect(fb.modelRewrite).toBe('')
  })

  // Throwing here discarded the whole graded reply — rewrite, corrections and
  // the user's essay — because of one absent key. null is the honest answer.
  it('reports a missing score as null instead of a 0 or a thrown-away essay', () => {
    const fb = parseFeedback(
      JSON.stringify({ scores: { grammar: 7 }, corrections: [], modelRewrite: 'x' }),
      SUBMISSION
    )
    expect(fb.scores).toEqual({ grammar: 7, vocabulary: null, coherence: null, register: null })
    expect(fb.modelRewrite).toBe('x')
  })

  // The learner types a curly apostrophe; the model quotes a straight one.
  it('matches corrections through quote and whitespace normalization', () => {
    const submission = 'i think it\u2019s fine,  but  the\nargument holds.'
    const fb = parseFeedback(
      JSON.stringify({
        scores: { grammar: 5, vocabulary: 5, coherence: 5, register: 5 },
        corrections: [
          { before: "it's fine", after: 'it is fine', why: 'straight quote' },
          { before: 'but the argument', after: 'but the argument', why: 'collapsed newline' },
          { before: '', after: 'x', why: 'empty' },
          { before: 'a sentence never written', after: 'y', why: 'hallucinated' }
        ]
      }),
      submission
    )
    expect(fb.corrections.map((c) => c.why)).toEqual(['straight quote', 'collapsed newline'])
  })

  it('drops corrections whose before text is not in the submission', () => {
    const fb = parseFeedback(
      JSON.stringify({
        scores: { grammar: 5, vocabulary: 5, coherence: 5, register: 5 },
        corrections: [
          { before: 'i think', after: 'I think', why: 'real' },
          { before: 'a sentence the learner never wrote', after: 'x', why: 'hallucinated' }
        ]
      }),
      SUBMISSION
    )
    expect(fb.corrections.map((c) => c.before)).toEqual(['i think'])
  })

  it('drops malformed corrections but keeps valid ones', () => {
    const fb = parseFeedback(
      JSON.stringify({
        scores: { grammar: 5, vocabulary: 5, coherence: 5, register: 5 },
        corrections: [{ before: 'i think', after: 'I think' }, { nonsense: true }, 'text'],
        modelRewrite: '',
        overall: ''
      }),
      SUBMISSION
    )
    expect(fb.corrections).toEqual([
      { before: 'i think', after: 'I think', why: '', category: null }
    ])
  })

  it('throws a friendly error on truncated or non-JSON replies', () => {
    expect(() => parseFeedback('Sorry, I cannot help with that.', SUBMISSION)).toThrow(
      /unreadable/
    )
    expect(() => parseFeedback(GOOD_JSON.slice(0, 40), SUBMISSION)).toThrow(/unreadable/)
  })
})

describe('writing persistence', () => {
  const FEEDBACK: EnWritingFeedback = parseFeedback(GOOD_JSON, SUBMISSION)

  it('saves, lists newest-first, and removes', () => {
    const a = saveWriting({
      promptKey: 'opinion-test',
      promptTitle: 'Test prompt',
      submission: 'First.',
      feedback: FEEDBACK,
      score: 7
    })
    saveWriting({
      promptKey: 'opinion-test',
      promptTitle: 'Test prompt',
      submission: 'Second.',
      feedback: FEEDBACK,
      score: 8
    })
    const rows = listWritings()
    expect(rows).toHaveLength(2)
    expect(rows[0].submission).toBe('Second.') // newest first
    expect(rows[1].feedback.scores.grammar).toBe(7)
    removeWriting(a.id)
    expect(listWritings()).toHaveLength(1)
  })
})

describe('correction categories and the error tally', () => {
  const withCats = (cats: (string | undefined)[]): string =>
    JSON.stringify({
      scores: { grammar: 5, vocabulary: 5, coherence: 5, register: 5 },
      corrections: cats.map((category) => ({
        before: 'i think',
        after: 'I think',
        why: 'x',
        ...(category === undefined ? {} : { category })
      }))
    })

  it('keeps only the six known category keys', () => {
    const fb = parseFeedback(
      withCats(['articles', 'PUNCTUATION', ' spelling ', 'vibes', undefined]),
      SUBMISSION
    )
    expect(fb.corrections.map((c) => c.category)).toEqual([
      'articles',
      'punctuation',
      'spelling',
      null,
      null
    ])
  })

  it('tallies categories across submissions, newest first, ignoring bad rows', () => {
    const save = (cats: string[]): void => {
      saveWriting({
        promptKey: 'opinion-test',
        promptTitle: 'T',
        submission: SUBMISSION,
        feedback: parseFeedback(withCats(cats), SUBMISSION),
        score: 5
      })
    }
    save(['articles', 'articles', 'spelling'])
    save(['articles', 'boundaries'])
    // A row whose JSON is unreadable must not sink the whole tally.
    db.prepare(
      `INSERT INTO en_writing (prompt_key, prompt_title, submission, feedback, score)
       VALUES ('x', 'X', 'y', 'not json', 5)`
    ).run()

    const tally = writingErrorTally()
    expect(tally.submissions).toBe(3)
    expect(tally.corrections).toBe(5)
    expect(tally.byCategory).toEqual([
      { category: 'articles', count: 3 },
      { category: 'boundaries', count: 1 },
      { category: 'spelling', count: 1 }
    ])
  })

  it('is empty, not broken, before any writing is graded', () => {
    expect(writingErrorTally()).toEqual({ submissions: 0, corrections: 0, byCategory: [] })
  })
})
