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
  it('seeds twenty-four courses in study order (Step 1..24) and is idempotent', () => {
    seedJapanese(db)
    seedJapanese(db)
    const courses = jp.listCourses()
    expect(courses).toHaveLength(24)
    // listCourses orders by difficulty — the seeded packs are the study path.
    expect(courses.map((c) => c.difficulty)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ])
    expect(courses[0].title).toContain('N5 Foundations')
    expect(courses[1].title).toContain('Radicals')
    expect(courses[2].title).toContain('N5 Kanji')
    expect(courses[3].title).toContain('Manga & VN Japanese')
    expect(courses[4].title).toContain('Counters')
    expect(courses[5].title).toContain('N4 Grammar')
    expect(courses[6].title).toContain('N4 Vocabulary')
    expect(courses[7].title).toContain('N4 Kanji')
    expect(courses[8].title).toContain('SFX')
    expect(courses[9].title).toContain('Manga & VN Japanese II')
    expect(courses[10].title).toContain('N3 Grammar I')
    expect(courses[11].title).toContain('N3 Grammar II')
    expect(courses[12].title).toContain('N3 Vocabulary')
    expect(courses[13].title).toContain('N3 Kanji')
    expect(courses[14].title).toContain('Speech Styles')
    expect(courses[15].title).toContain('N2 Grammar I')
    expect(courses[16].title).toContain('N2 Grammar II')
    expect(courses[17].title).toContain('N2 Vocabulary')
    expect(courses[18].title).toContain('N2 Kanji')
    expect(courses[19].title).toContain('Idioms')
    expect(courses[20].title).toContain('N1 Grammar I')
    expect(courses[21].title).toContain('N1 Grammar II')
    expect(courses[22].title).toContain('N1 Vocabulary')
    expect(courses[23].title).toContain('N1 Kanji')
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
    // 7 later JLPT packs + the 5 packs of the 2026-07-05 wave + the 4 packs of
    // the 2026-07-27 wave (N2/N1 vocabulary and kanji).
    expect(titles).toHaveLength(16)
    expect(titles.join(' ')).toContain('N3 Grammar II')
    expect(titles.join(' ')).toContain('N3 Vocabulary')
    expect(titles.join(' ')).toContain('N3 Kanji')
    expect(titles.join(' ')).toContain('N2 Grammar I')
    expect(titles.join(' ')).toContain('N2 Grammar II')
    expect(titles.join(' ')).toContain('N1 Grammar I')
    expect(titles.join(' ')).toContain('N1 Grammar II')
    expect(titles.join(' ')).toContain('Radicals')
    expect(titles.join(' ')).toContain('Counters')
    expect(titles.join(' ')).toContain('SFX')
    expect(titles.join(' ')).toContain('Speech Styles')
    expect(titles.join(' ')).toContain('Idioms')
    expect(titles.join(' ')).toContain('N2 Vocabulary')
    expect(titles.join(' ')).toContain('N2 Kanji')
    expect(titles.join(' ')).toContain('N1 Vocabulary')
    expect(titles.join(' ')).toContain('N1 Kanji')
  })

  it('renumbers a live DB from the old 1–15 layout to the current 24-step path', () => {
    // Simulate the pre-2026-07-05 install: all 15 packs seeded under the old
    // step numbers, all flags set (so no pack re-seeds), levels backfilled.
    const OLD: [string, string, number][] = [
      ['japanese.seeded', 'JLPT N5 Foundations', 1],
      ['japanese.seeded.kanji', 'JLPT N5 Kanji', 2],
      ['japanese.seeded.casual', 'Manga & VN Japanese', 3],
      ['japanese.seeded.n4', 'JLPT N4 Grammar', 4],
      ['japanese.seeded.n4vocab', 'JLPT N4 Vocabulary', 5],
      ['japanese.seeded.n4kanji', 'JLPT N4 Kanji', 6],
      ['japanese.seeded.casual2', 'Manga & VN Japanese II', 7],
      ['japanese.seeded.n3', 'JLPT N3 Grammar I', 8],
      ['japanese.seeded.n3b', 'JLPT N3 Grammar II', 9],
      ['japanese.seeded.n3vocab', 'JLPT N3 Vocabulary', 10],
      ['japanese.seeded.n3kanji', 'JLPT N3 Kanji Essentials', 11],
      ['japanese.seeded.n2a', 'JLPT N2 Grammar I', 12],
      ['japanese.seeded.n2b', 'JLPT N2 Grammar II', 13],
      ['japanese.seeded.n1a', 'JLPT N1 Grammar I', 14],
      ['japanese.seeded.n1b', 'JLPT N1 Grammar II', 15]
    ]
    const insertFlag = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)')
    const insertCourse = db.prepare(
      `INSERT INTO jp_course (title, description, level, difficulty, sort_order)
       VALUES (?, 'old row', 'N?', ?, ?)`
    )
    OLD.forEach(([flag, title, step], i) => {
      insertFlag.run(flag, '1')
      insertCourse.run(title, step, i)
    })
    insertFlag.run('japanese.seeded.levels', '1')

    seedJapanese(db)

    const courses = jp.listCourses()
    expect(courses).toHaveLength(24)
    // Path is contiguous 1..24 with both later waves slotted in.
    expect(courses.map((c) => c.difficulty)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ])
    const at = (step: number): string => courses[step - 1].title
    expect(at(2)).toContain('Radicals')
    expect(at(3)).toBe('JLPT N5 Kanji')
    expect(at(5)).toContain('Counters')
    expect(at(9)).toContain('SFX')
    expect(at(15)).toContain('Speech Styles')
    expect(at(18)).toContain('N2 Vocabulary')
    expect(at(20)).toContain('Idioms')
    expect(at(22)).toBe('JLPT N1 Grammar II')
    expect(at(24)).toBe('JLPT N1 Kanji')
    // The old rows were UPDATEd, not replaced — user data preserved.
    expect(courses[2].description).toBe('old row')

    // Running again changes nothing (flag-guarded).
    seedJapanese(db)
    expect(jp.listCourses().map((c) => c.difficulty)).toEqual(
      courses.map((c) => c.difficulty)
    )
  })

  it('renumbers a live DB from the 20-step layout to the 24-step path', () => {
    // The 2026-07-27 wave: N2/N1 vocabulary and kanji slot in beside their
    // grammar packs, pushing Idioms and the N1 grammar courses down.
    const OLD: [string, string, number][] = [
      ['japanese.seeded.n2b', 'JLPT N2 Grammar II', 17],
      ['japanese.seeded.idioms', 'Idioms & Set Phrases (慣用句)', 18],
      ['japanese.seeded.n1a', 'JLPT N1 Grammar I', 19],
      ['japanese.seeded.n1b', 'JLPT N1 Grammar II', 20]
    ]
    const insertFlag = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)')
    const insertCourse = db.prepare(
      `INSERT INTO jp_course (title, description, level, difficulty, sort_order)
       VALUES (?, 'old row', 'N?', ?, ?)`
    )
    OLD.forEach(([flag, title, step], i) => {
      insertFlag.run(flag, '1')
      insertCourse.run(title, step, i)
    })
    // Everything before step 17 is already seeded and needs no renumbering.
    for (const flag of [
      'japanese.seeded',
      'japanese.seeded.radicals',
      'japanese.seeded.kanji',
      'japanese.seeded.casual',
      'japanese.seeded.counters',
      'japanese.seeded.n4',
      'japanese.seeded.n4vocab',
      'japanese.seeded.n4kanji',
      'japanese.seeded.sfx',
      'japanese.seeded.casual2',
      'japanese.seeded.n3',
      'japanese.seeded.n3b',
      'japanese.seeded.n3vocab',
      'japanese.seeded.n3kanji',
      'japanese.seeded.speech',
      'japanese.seeded.n2a',
      'japanese.seeded.levels',
      'japanese.seeded.order2'
    ]) {
      insertFlag.run(flag, '1')
    }

    seedJapanese(db)

    const byTitle = new Map(jp.listCourses().map((c) => [c.title, c]))
    // The moved packs kept their rows (description 'old row') at new steps.
    expect(byTitle.get('Idioms & Set Phrases (慣用句)')).toMatchObject({
      difficulty: 20,
      description: 'old row'
    })
    expect(byTitle.get('JLPT N1 Grammar I')).toMatchObject({ difficulty: 21, description: 'old row' })
    expect(byTitle.get('JLPT N1 Grammar II')).toMatchObject({ difficulty: 22, description: 'old row' })
    expect(byTitle.get('JLPT N2 Grammar II')!.difficulty).toBe(17) // unmoved
    // …and the four new packs landed on the freed steps.
    expect(byTitle.get('JLPT N2 Vocabulary')!.difficulty).toBe(18)
    expect(byTitle.get('JLPT N2 Kanji')!.difficulty).toBe(19)
    expect(byTitle.get('JLPT N1 Vocabulary')!.difficulty).toBe(23)
    expect(byTitle.get('JLPT N1 Kanji')!.difficulty).toBe(24)
    // No two courses share a step.
    const steps = jp.listCourses().map((c) => c.difficulty)
    expect(new Set(steps).size).toBe(steps.length)

    // Idempotent: a second run changes nothing (order3 flag guards it).
    seedJapanese(db)
    expect(jp.listCourses().map((c) => c.difficulty)).toEqual(steps)
  })

  it('the 24-step reorder leaves a renamed or user-renumbered course alone', () => {
    const insertFlag = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)')
    // User renamed Idioms and moved N1 Grammar I somewhere of their own.
    db.prepare(
      `INSERT INTO jp_course (title, description, level, difficulty) VALUES (?, 'mine', 'N1', ?)`
    ).run('My idioms deck', 18)
    db.prepare(
      `INSERT INTO jp_course (title, description, level, difficulty) VALUES (?, 'mine', 'N1', ?)`
    ).run('JLPT N1 Grammar I', 99)
    insertFlag.run('japanese.seeded.idioms', '1')
    insertFlag.run('japanese.seeded.n1a', '1')

    seedJapanese(db)

    const byTitle = new Map(jp.listCourses().map((c) => [c.title, c]))
    expect(byTitle.get('My idioms deck')!.difficulty).toBe(18) // untouched
    expect(byTitle.get('JLPT N1 Grammar I')!.difficulty).toBe(99) // untouched
  })

  it('reorder leaves renamed or user-renumbered courses alone', () => {
    // A renamed course (title no longer matches) and a course the user moved
    // to a custom step must both survive the migration untouched.
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('japanese.seeded.kanji', '1')
    db.prepare(
      `INSERT INTO jp_course (title, description, level, difficulty, sort_order)
       VALUES ('My renamed kanji course', NULL, 'N5', 2, 0)`
    ).run()
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('japanese.seeded.n4', '1')
    db.prepare(
      `INSERT INTO jp_course (title, description, level, difficulty, sort_order)
       VALUES ('JLPT N4 Grammar', NULL, 'N4', 99, 1)`
    ).run()

    seedJapanese(db)

    const courses = jp.listCourses()
    const renamed = courses.find((c) => c.title === 'My renamed kanji course')!
    expect(renamed.difficulty).toBe(2) // not touched (title mismatch)
    const custom = courses.find((c) => c.title === 'JLPT N4 Grammar')!
    expect(custom.difficulty).toBe(99) // not touched (old step mismatch)
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

  it('kanji packs: N5 → N1 cards, valid and with no duplicates across decks', () => {
    seedJapanese(db)
    const byTitle = (t: string) => jp.listCourses().find((c) => c.title.includes(t))!
    const n5 = byTitle('N5 Kanji')
    const n4 = byTitle('N4 Kanji')
    const n3 = byTitle('N3 Kanji')
    const n2 = byTitle('N2 Kanji')
    const n1 = byTitle('N1 Kanji')
    expect(n5.cardCount).toBeGreaterThanOrEqual(100)
    expect(n4.cardCount).toBeGreaterThanOrEqual(150)
    expect(n3.cardCount).toBeGreaterThanOrEqual(140)
    expect(n2.cardCount).toBeGreaterThanOrEqual(140)
    expect(n1.cardCount).toBeGreaterThanOrEqual(130)

    const seen = new Set<string>()
    for (const course of [n5, n4, n3, n2, n1]) {
      const detail = jp.getCourse(course.id)!
      expect(detail.lessons.every((l) => l.kind === 'kanji')).toBe(true)
      for (const lesson of detail.lessons) {
        for (const card of jp.getLesson(lesson.id)!.cards) {
          expect(card.front.trim()).not.toBe('')
          expect(card.reading?.trim()).toBeTruthy()
          expect(card.back.trim()).not.toBe('')
          expect(card.onyomi || card.kunyomi).toBeTruthy()
          expect(card.exampleJp?.trim()).toBeTruthy()
          // Kanji fronts are ONE character and unique across every deck.
          expect([...card.front]).toHaveLength(1)
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

  it('radicals pack: intro grammar lesson + kanji-kind lessons with named readings', () => {
    seedJapanese(db)
    const course = jp.listCourses().find((c) => c.title.includes('Radicals'))!
    expect(course.difficulty).toBe(2)
    expect(course.cardCount).toBeGreaterThanOrEqual(75)
    const detail = jp.getCourse(course.id)!
    expect(detail.lessons[0].kind).toBe('grammar')
    const kanjiLessons = detail.lessons.filter((l) => l.kind === 'kanji')
    expect(kanjiLessons.length).toBeGreaterThanOrEqual(8)
    const seen = new Set<string>()
    for (const lesson of kanjiLessons) {
      for (const card of jp.getLesson(lesson.id)!.cards) {
        expect(card.front.trim()).not.toBe('')
        // Every radical carries its Japanese name as the reading (quizzable).
        expect(card.reading?.trim()).toBeTruthy()
        expect(card.back.trim()).not.toBe('')
        expect(card.exampleJp?.trim()).toBeTruthy()
        expect(seen.has(card.front)).toBe(false) // no duplicate radicals
        seen.add(card.front)
      }
    }
  })

  it('counters / SFX / speech / idioms packs: substantial, valid cards', () => {
    seedJapanese(db)
    const check = (titlePart: string, minCards: number): void => {
      const course = jp.listCourses().find((c) => c.title.includes(titlePart))!
      expect(course.cardCount).toBeGreaterThanOrEqual(minCards)
      const detail = jp.getCourse(course.id)!
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
    }
    check('Counters', 50)
    check('SFX', 60)
    check('Speech Styles', 45)
    check('Idioms', 50)
  })

  it('casual pack: grammar lessons with bodies + a slang vocab lesson', () => {
    seedJapanese(db)
    const course = jp.listCourses().find((c) => c.title.includes('Manga & VN'))!
    const detail = jp.getCourse(course.id)!
    expect(detail.lessons.filter((l) => l.kind === 'grammar').length).toBeGreaterThanOrEqual(10)
    expect(detail.lessons.filter((l) => l.kind === 'vocab')).toHaveLength(1)
  })

  it('N2 + N1 vocabulary packs: pos and a full example triple on every card', () => {
    seedJapanese(db)
    const n2 = jp.listCourses().find((c) => c.title.includes('N2 Vocabulary'))!
    const n1 = jp.listCourses().find((c) => c.title.includes('N1 Vocabulary'))!
    expect(n2.cardCount).toBeGreaterThanOrEqual(110)
    expect(n1.cardCount).toBeGreaterThanOrEqual(110)

    const fronts = new Set<string>()
    for (const course of [n2, n1]) {
      const detail = jp.getCourse(course.id)!
      expect(detail.lessons).toHaveLength(8)
      expect(detail.lessons.every((l) => l.kind === 'vocab')).toBe(true)
      for (const lesson of detail.lessons) {
        for (const card of jp.getLesson(lesson.id)!.cards) {
          expect(card.front.trim()).not.toBe('')
          expect(card.back.trim()).not.toBe('')
          expect(card.pos?.trim()).toBeTruthy()
          // The example triple is what feeds the typed cloze mode in reviews.
          expect(card.exampleJp?.trim()).toBeTruthy()
          expect(card.exampleReading?.trim()).toBeTruthy()
          expect(card.exampleEn?.trim()).toBeTruthy()
          // The example must actually use the word. Verbs and adjectives show
          // up inflected (含まれる → 含まれていない), so match on the stem —
          // that is also exactly when buildTypedPrompt falls back from a cloze
          // to type-the-reading, which is the intended behaviour.
          const stem = card.front.slice(0, -1)
          expect(
            card.exampleJp!.includes(card.front) || (stem.length > 0 && card.exampleJp!.includes(stem))
          ).toBe(true)
          expect(fronts.has(card.front)).toBe(false)
          fronts.add(card.front)
        }
      }
    }
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
