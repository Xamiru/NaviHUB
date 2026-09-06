import { describe, expect, it } from 'vitest'
import {
  hasIndependentTransfer, learningSettingKey, matchesLearningAnswer, parseLearningRecord,
  transferDueAt, unusedTransferExercises, TRANSFER_DELAY_MS, type LearningAttempt, type LearningUnit
} from '../src/shared/learningEvidence'
import { ENGLISH_REPAIR_UNITS, suggestedRepair } from '../src/shared/english/remediation'
import { ENGLISH_MISTAKES_KEY, parseEnglishMistakes, updateEnglishMistakes } from '../src/shared/english/mistakes'
import { EN_MECHANICS } from '../src/shared/english/mechanics'
import { JP_OUTPUT_TRANSFER } from '../src/shared/japanese/outputTransfer'
import { OUTPUT_UNITS } from '../src/shared/japanese/output'
import { PROGRAMMING_APPLIED_PRACTICE } from '../src/shared/programming/appliedPractice'
import { recommendLesson } from '../src/shared/programming/recommendation'
import type { ProgCourseDef } from '../src/shared/programming/types'
import { createTestDb } from './helpers'
// @ts-expect-error — plain CJS maintenance module
import { sanitizeDb } from '../scripts/sanitizeSql.cjs'

const attempt: LearningAttempt = {
  at: '2026-09-01T12:00:00.000Z', completed: true, mode: 'practice', score: 2, total: 2,
  assisted: true, exerciseIds: ['p1', 'p2']
}

describe('learning evidence boundaries', () => {
  it('requires finished successful practice and a full day before delayed transfer', () => {
    expect(transferDueAt({ attempts: [] })).toBeNull()
    expect(transferDueAt({ attempts: [{ ...attempt, completed: false }] })).toBeNull()
    expect(transferDueAt({ attempts: [{ ...attempt, score: 1 }] })).toBeNull()
    expect(transferDueAt({ attempts: [attempt] })).toBe(Date.parse(attempt.at) + TRANSFER_DELAY_MS)
    const started = { ...attempt, mode: 'transfer' as const, at: '2026-09-03T12:00:00.000Z', completed: false }
    expect(transferDueAt({ attempts: [attempt, started] })).toBe(Date.parse(started.at) + TRANSFER_DELAY_MS)
  })

  it('never calls guided, incomplete or failed work an independent pass', () => {
    expect(hasIndependentTransfer({ attempts: [attempt] })).toBe(false)
    const transfer = { ...attempt, mode: 'transfer' as const, assisted: false }
    expect(hasIndependentTransfer({ attempts: [transfer] })).toBe(true)
    expect(hasIndependentTransfer({ attempts: [{ ...transfer, assisted: true }] })).toBe(false)
    expect(hasIndependentTransfer({ attempts: [{ ...transfer, completed: false }] })).toBe(false)
    expect(hasIndependentTransfer({ attempts: [{ ...transfer, score: 1 }] })).toBe(false)
  })

  it('retains exposed forms independently of the bounded attempt history', () => {
    const unit = ENGLISH_REPAIR_UNITS[0]
    const record = parseLearningRecord(JSON.stringify({ attempts: Array(70).fill(attempt), exposedIds: [unit.transfer[0].id] }))
    expect(record.attempts).toHaveLength(50)
    expect(unusedTransferExercises(unit, record).map((item) => item.id)).toEqual([unit.transfer[1].id])
  })

  it('rejects corrupt records and preserves meaningful answer syntax', () => {
    expect(parseLearningRecord('broken')).toEqual({ attempts: [] })
    expect(parseLearningRecord(JSON.stringify({ attempts: [null, {}, { ...attempt, score: 3 }] })).attempts).toEqual([])
    expect(matchesLearningAnswer('  10\n 20  ', ['10 20'])).toBe(true)
    expect(matchesLearningAnswer('False', ['false'])).toBe(false)
    expect(matchesLearningAnswer('a,b', ['ab'])).toBe(false)
    expect(matchesLearningAnswer('じゃありません', ['ではありません', 'じゃありません'])).toBe(true)
  })

  it('strips private notes, answers and error queues from library exports', () => {
    const db = createTestDb()
    try {
      const insert = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)')
      for (const domain of ['programming', 'english', 'japanese'] as const) {
        insert.run(learningSettingKey(domain, 'private'), JSON.stringify({ project: { note: 'private draft' } }))
      }
      insert.run(ENGLISH_MISTAKES_KEY, 'private mistakes')
      insert.run('ui.theme', 'lain')
      sanitizeDb(db)
      expect(db.prepare("SELECT count(*) AS n FROM settings WHERE key LIKE 'learning.evidence.v1.%'").get()).toEqual({ n: 0 })
      expect(db.prepare("SELECT value FROM settings WHERE key='ui.theme'").get()).toEqual({ value: 'lain' })
    } finally { db.close() }
  })
})

describe('authored repairs and transfer', () => {
  const units: LearningUnit[] = [...ENGLISH_REPAIR_UNITS, ...Object.values(JP_OUTPUT_TRANSFER), ...Object.values(PROGRAMMING_APPLIED_PRACTICE)]
  it.each(units)('$id keeps model and delayed forms separate and accepts its stated answers', (unit) => {
    const ids = [...unit.practice, ...unit.transfer].map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(unit.transfer.length).toBeGreaterThanOrEqual(2)
    for (const exercise of [...unit.practice, ...unit.transfer]) {
      expect(exercise.prompt.trim().length).toBeGreaterThan(10)
      expect(exercise.explanation.length).toBeGreaterThan(10)
      expect(exercise.answers.length).toBeGreaterThan(0)
      for (const answer of exercise.answers) expect(matchesLearningAnswer(answer, exercise.answers)).toBe(true)
      // A format example must not print the entire computed answer in its prompt.
      for (const answer of exercise.answers.filter((a) => a.length > 8 && /\d/.test(a))) {
        expect(exercise.prompt, `${exercise.id}: answer leaked in prompt`).not.toContain(answer)
      }
    }
  })
  it('covers each Japanese output unit without silently falling back to another skill', () => {
    expect(Object.keys(JP_OUTPUT_TRANSFER)).toEqual(OUTPUT_UNITS.map((unit) => unit.id))
  })
  it('suggests a same-category repair while preserving exact error identity', () => {
    for (const item of EN_MECHANICS) expect(suggestedRepair(item).category).toBe(item.category)
    expect(suggestedRepair(EN_MECHANICS.find((item) => item.key === 'articles-01')!).id).toBe('articles-sound')
  })
  it('does not clear an error by repeating a revealed answer in the same round', () => {
    const at = attempt.at
    const result = updateEnglishMistakes([], [{ key: 'articles-01', correct: false }, { key: 'articles-01', correct: true }], at)
    expect(result).toEqual([{ key: 'articles-01', misses: 1, lastAt: at }])
    expect(parseEnglishMistakes(JSON.stringify(result))).toEqual(result)
    expect(updateEnglishMistakes(result, [{ key: 'articles-01', correct: true }], at)).toEqual([])
  })
})

describe('programming recommendations', () => {
  const course: ProgCourseDef = { key: 'chosen', title: 'Chosen', description: '', lessons: ['one', 'two'].map((key) => ({ key, title: key, body: '', questions: [] })) }
  it('prioritizes the latest missed check even when an earlier attempt was perfect', () => {
    const attempts = [
      { lessonKey: 'chosen/one', score: 4, total: 4, at: '2026-09-01' },
      { lessonKey: 'chosen/one', score: 2, total: 4, at: '2026-09-02' }
    ]
    expect(recommendLesson(course, [], attempts)?.lesson.key).toBe('one')
    expect(recommendLesson(course, [], attempts)?.reason).toContain('latest self-check')
  })
  it('stays inside the chosen course and distinguishes unread from unchecked', () => {
    const progress = course.lessons.map((l) => ({ lessonKey: `chosen/${l.key}`, completedAt: '2026-09-01' }))
    expect(recommendLesson(course, progress.slice(0, 1), [])?.lesson.key).toBe('two')
    expect(recommendLesson(course, progress, [])?.reason).toContain('not completed its self-check')
    const attempts = progress.map((p) => ({ lessonKey: p.lessonKey, score: 4, total: 4, at: p.completedAt }))
    expect(recommendLesson(course, progress, attempts)).toBeNull()
  })
})
