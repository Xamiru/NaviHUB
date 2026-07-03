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
  it('seeds fifteen courses in study order (Step 1..15) and is idempotent', () => {
    seedJapanese(db)
    seedJapanese(db)
    const courses = jp.listCourses()
    expect(courses).toHaveLength(15)
    // listCourses orders by difficulty — the seeded packs are the study path.
    expect(courses.map((c) => c.difficulty)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
    ])
    expect(courses[0].title).toContain('N5 Foundations')
    expect(courses[1].title).toContain('N5 Kanji')
    expect(courses[2].title).toContain('Manga & VN Japanese')
    expect(courses[3].title).toContain('N4 Grammar')
    expect(courses[4].title).toContain('N4 Vocabulary')
    expect(courses[5].title).toContain('N4 Kanji')
    expect(courses[6].title).toContain('Manga & VN Japanese II')
    expect(courses[7].title).toContain('N3 Grammar I')
    expect(courses[8].title).toContain('N3 Grammar II')
    expect(courses[9].title).toContain('N3 Vocabulary')
    expect(courses[10].title).toContain('N3 Kanji')
    expect(courses[11].title).toContain('N2 Grammar I')
    expect(courses[12].title).toContain('N2 Grammar II')
    expect(courses[13].title).toContain('N1 Grammar I')
    expect(courses[14].title).toContain('N1 Grammar II')
    expect(courses.every((c) => c.level)).toBe(true)
  })

  it('does not re-seed even after the user deletes the courses', () => {
    seedJapanese(db)
    for (const c of jp.listCourses()) jp.removeCourse(c.id)
    seedJapanese(db)
    expect(jp.listCourses()).toHaveLength(0)
  })

  it('adds only the new packs when earlier flags are already set (live-DB upgrade)', () => {
    for (const flag of [
      'japanese.seeded',
      'japanese.seeded.kanji',
      'japanese.seeded.casual',
      'japanese.seeded.n4',
      'japanese.seeded.n4vocab',
      'japanese.seeded.n4kanji',
      'japanese.seeded.casual2',
      'japanese.seeded.n3'
    ]) {
      db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(flag, '1')
    }
    seedJapanese(db)
    const titles = jp.listCourses().map((c) => c.title)
    expect(titles).toHaveLength(7)
    expect(titles.join(' ')).toContain('N3 Grammar II')
    expect(titles.join(' ')).toContain('N3 Vocabulary')
    expect(titles.join(' ')).toContain('N3 Kanji')
    expect(titles.join(' ')).toContain('N2 Grammar I')
    expect(titles.join(' ')).toContain('N2 Grammar II')
    expect(titles.join(' ')).toContain('N1 Grammar I')
    expect(titles.join(' ')).toContain('N1 Grammar II')
  })

  it('backfills level/difficulty onto pre-existing seeded courses (by original title)', () => {
    // Simulate an install where the first pack was seeded before the level
    // columns existed: course row present, flag set, level/difficulty NULL.
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('japanese.seeded', '1')
    db.prepare(
      `INSERT INTO jp_course (title, description, sort_order) VALUES ('JLPT N5 Foundations', 'old row', 0)`
    ).run()
    seedJapanese(db)
    const n5 = jp.listCourses().find((c) => c.description === 'old row')!
    expect(n5.level).toBe('N5')
    expect(n5.difficulty).toBe(1)
    // First in study order despite being the oldest row.
    expect(jp.listCourses()[0].id).toBe(n5.id)
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

  it('kanji packs: N5 + N4 + N3 cards, valid and with no duplicates across decks', () => {
    seedJapanese(db)
    const n5 = jp.listCourses().find((c) => c.title.includes('N5 Kanji'))!
    const n4 = jp.listCourses().find((c) => c.title.includes('N4 Kanji'))!
    const n3 = jp.listCourses().find((c) => c.title.includes('N3 Kanji'))!
    expect(n5.cardCount).toBeGreaterThanOrEqual(100)
    expect(n4.cardCount).toBeGreaterThanOrEqual(150)
    expect(n3.cardCount).toBeGreaterThanOrEqual(140)

    const seen = new Set<string>()
    for (const course of [n5, n4, n3]) {
      const detail = jp.getCourse(course.id)!
      expect(detail.lessons.every((l) => l.kind === 'kanji')).toBe(true)
      for (const lesson of detail.lessons) {
        for (const card of jp.getLesson(lesson.id)!.cards) {
          expect(card.front.trim()).not.toBe('')
          expect(card.reading?.trim()).toBeTruthy()
          expect(card.back.trim()).not.toBe('')
          expect(card.onyomi || card.kunyomi).toBeTruthy()
          expect(card.exampleJp?.trim()).toBeTruthy()
          // No duplicate kanji within OR across the two decks.
          expect(seen.has(card.front)).toBe(false)
          seen.add(card.front)
        }
      }
    }
  })

  it('all grammar packs (N3 I/II, N2 I/II, N1 I/II): bodies and 3 cards per lesson', () => {
    seedJapanese(db)
    const grammarCourses = jp
      .listCourses()
      .filter((c) => /N[123] Grammar/.test(c.title))
    expect(grammarCourses).toHaveLength(6)
    for (const course of grammarCourses) {
      const detail = jp.getCourse(course.id)!
      expect(detail.lessons.length).toBeGreaterThanOrEqual(14)
      expect(detail.lessons.every((l) => l.kind === 'grammar')).toBe(true)
      for (const lesson of detail.lessons) {
        const full = jp.getLesson(lesson.id)!
        expect(full.body).toBeTruthy()
        expect(full.cards).toHaveLength(3)
        for (const card of full.cards) {
          expect(card.front.trim()).not.toBe('')
          expect(card.reading?.trim()).toBeTruthy()
          expect(card.back.trim()).not.toBe('')
        }
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

  it('N4 pack: 20 grammar lessons, all with bodies and 3 example cards', () => {
    seedJapanese(db)
    const course = jp.listCourses().find((c) => c.title.includes('N4 Grammar'))!
    const detail = jp.getCourse(course.id)!
    expect(detail.lessons).toHaveLength(20)
    expect(detail.lessons.every((l) => l.kind === 'grammar')).toBe(true)
    for (const lesson of detail.lessons) {
      const full = jp.getLesson(lesson.id)!
      expect(full.body).toBeTruthy()
      expect(full.cards).toHaveLength(3)
      for (const card of full.cards) {
        expect(card.front.trim()).not.toBe('')
        expect(card.reading?.trim()).toBeTruthy()
        expect(card.back.trim()).not.toBe('')
      }
    }
  })
})
