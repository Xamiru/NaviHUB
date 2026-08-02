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
import { listWritings, removeWriting, saveWriting } from '../src/main/repos/englishRepo'
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
    const fb = parseFeedback(GOOD_JSON)
    expect(fb.scores.grammar).toBe(7)
    expect(fb.corrections).toHaveLength(1)
    expect(fb.modelRewrite).toBe('A polished version.')
  })

  it('strips markdown fences and surrounding prose', () => {
    const fb = parseFeedback('Here is your feedback:\n```json\n' + GOOD_JSON + '\n```\nGood luck!')
    expect(fb.scores.vocabulary).toBe(8)
  })

  it('clamps out-of-range scores and defaults missing fields', () => {
    const fb = parseFeedback(
      JSON.stringify({ scores: { grammar: 14, vocabulary: -2 }, modelRewrite: 7 })
    )
    expect(fb.scores.grammar).toBe(10)
    expect(fb.scores.vocabulary).toBe(0)
    expect(fb.scores.coherence).toBe(0)
    expect(fb.corrections).toEqual([])
    expect(fb.modelRewrite).toBe('')
  })

  it('drops malformed corrections but keeps valid ones', () => {
    const fb = parseFeedback(
      JSON.stringify({
        scores: { grammar: 5, vocabulary: 5, coherence: 5, register: 5 },
        corrections: [{ before: 'a', after: 'b' }, { nonsense: true }, 'text'],
        modelRewrite: '',
        overall: ''
      })
    )
    expect(fb.corrections).toEqual([{ before: 'a', after: 'b', why: '' }])
  })

  it('throws a friendly error on truncated or non-JSON replies', () => {
    expect(() => parseFeedback('Sorry, I cannot help with that.')).toThrow(/unreadable/)
    expect(() => parseFeedback(GOOD_JSON.slice(0, 40))).toThrow(/unreadable/)
  })
})

describe('writing persistence', () => {
  const FEEDBACK: EnWritingFeedback = parseFeedback(GOOD_JSON)

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
