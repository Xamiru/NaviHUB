import { beforeEach, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
})

it('reports where a word already has a card, preferring a learned lesson', () => {
  const c = jp.createCourse({ title: 'Deck', description: null, level: null, difficulty: null })
  const draft = jp.createLesson({ courseId: c, kind: 'vocab', title: 'Draft', cards: [{ front: '猫', back: 'cat' }] })
  const known = jp.createLesson({ courseId: c, kind: 'vocab', title: 'Known', cards: [{ front: '猫', back: 'cat' }] })
  jp.setLessonLearned(known, true)
  const out = jp.cardsForFronts(['猫', '犬', ''])
  expect(out).toHaveLength(1)
  expect(out[0]).toMatchObject({ front: '猫', lessonId: known, lessonTitle: 'Known', courseTitle: 'Deck', learned: true })
  expect(draft).not.toBe(known)
  expect(jp.cardsForFronts([])).toEqual([])
})
