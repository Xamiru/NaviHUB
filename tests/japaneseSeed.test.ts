import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { seedJapanese } from '../src/main/db/japaneseSeed'
import * as jp from '../src/main/repos/japaneseRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

describe('seedJapanese', () => {
  it('seeds three courses (foundations, kanji, casual) and is idempotent', () => {
    seedJapanese(db)
    seedJapanese(db)
    const titles = jp.listCourses().map((c) => c.title)
    expect(titles).toHaveLength(3)
    expect(titles.join(' ')).toContain('N5 Foundations')
    expect(titles.join(' ')).toContain('N5 Kanji')
    expect(titles.join(' ')).toContain('Manga & VN')
  })

  it('does not re-seed even after the user deletes the courses', () => {
    seedJapanese(db)
    for (const c of jp.listCourses()) jp.removeCourse(c.id)
    seedJapanese(db)
    expect(jp.listCourses()).toHaveLength(0)
  })

  it('adds only the new packs when the first flag is already set (live-DB upgrade)', () => {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('japanese.seeded', '1')
    seedJapanese(db)
    const titles = jp.listCourses().map((c) => c.title)
    expect(titles).toHaveLength(2)
    expect(titles.join(' ')).not.toContain('Foundations')
    expect(titles.join(' ')).toContain('N5 Kanji')
    expect(titles.join(' ')).toContain('Manga & VN')
  })

  it('ships a substantial N5 course with valid, unlearned content', () => {
    seedJapanese(db)
    const course = jp.listCourses().find((c) => c.title.includes('Foundations'))!
    expect(course.lessonCount).toBeGreaterThanOrEqual(20)
    expect(course.learnedLessonCount).toBe(0)
    expect(course.cardCount).toBeGreaterThanOrEqual(150)

    const detail = jp.getCourse(course.id)!
    const grammar = detail.lessons.filter((l) => l.kind === 'grammar')
    const vocab = detail.lessons.filter((l) => l.kind === 'vocab')
    expect(grammar.length).toBeGreaterThanOrEqual(12)
    expect(vocab.length).toBeGreaterThanOrEqual(9)

    for (const lesson of detail.lessons) {
      const full = jp.getLesson(lesson.id)!
      if (lesson.kind === 'grammar') expect(full.body).toBeTruthy()
      expect(full.cards.length).toBeGreaterThan(0)
      for (const card of full.cards) {
        expect(card.front.trim()).not.toBe('')
        expect(card.back.trim()).not.toBe('')
        expect(card.status).toBe('new')
      }
    }

    // Nothing learned yet → review and quiz start empty (learned-gating).
    expect(jp.reviewQueue(10)).toEqual({ due: [], fresh: [] })
    expect(jp.quizPool()).toHaveLength(0)
  })

  it('kanji pack: ~100 kanji cards, each with reading, meaning and on/kun readings', () => {
    seedJapanese(db)
    const course = jp.listCourses().find((c) => c.title.includes('Kanji'))!
    expect(course.cardCount).toBeGreaterThanOrEqual(100)

    const detail = jp.getCourse(course.id)!
    expect(detail.lessons.every((l) => l.kind === 'kanji')).toBe(true)

    const seen = new Set<string>()
    for (const lesson of detail.lessons) {
      for (const card of jp.getLesson(lesson.id)!.cards) {
        expect(card.front.trim()).not.toBe('')
        expect(card.reading?.trim()).toBeTruthy()
        expect(card.back.trim()).not.toBe('')
        expect(card.onyomi || card.kunyomi).toBeTruthy()
        expect(card.exampleJp?.trim()).toBeTruthy()
        expect(seen.has(card.front)).toBe(false) // no duplicate kanji
        seen.add(card.front)
      }
    }
  })

  it('casual pack: grammar lessons with bodies + a slang vocab lesson', () => {
    seedJapanese(db)
    const course = jp.listCourses().find((c) => c.title.includes('Manga & VN'))!
    const detail = jp.getCourse(course.id)!
    expect(detail.lessons.filter((l) => l.kind === 'grammar').length).toBeGreaterThanOrEqual(10)
    expect(detail.lessons.filter((l) => l.kind === 'vocab')).toHaveLength(1)
  })
})
