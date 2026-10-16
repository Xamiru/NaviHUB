import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { SEED_PACKS, seedJapanese, type SeedCourse } from '../src/main/db/japaneseSeed'
import {
  backfillSeedKeys,
  cardSeedKey,
  seedDrift,
  reattachSeedRows,
  insertSeedCourse,
  seedContentHash,
  syncSeedContent,
  SEED_KEYS_FLAG,
  SEED_VERSION_KEY,
  type SeedPack
} from '../src/main/db/japaneseSeedSync'
import { SEED_VERSION } from '../src/main/db/japaneseSeedVersion'
import * as jp from '../src/main/repos/japaneseRepo'
import { SEED_COURSE_PHASE } from '../src/shared/japanese/coursePhases'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

describe('built-in seed identity', () => {
  it('pins SEED_VERSION to the current seed content', () => {
    const hash = seedContentHash([...SEED_PACKS])
    expect(SEED_VERSION, `Seed content changed: set SEED_VERSION = '${hash}' in src/main/db/japaneseSeedVersion.ts`).toBe(hash)
  })

  it('keeps every shipped key, and every key is locked and unique', () => {
    const lock = JSON.parse(
      readFileSync(
        fileURLToPath(new URL('../src/main/db/japaneseSeedKeys.lock.json', import.meta.url)),
        'utf8'
      )
    ) as { courses: string[]; lessons: string[]; cards: string[] }
    const courses = SEED_PACKS.map((p) => p.key)
    const lessons = SEED_PACKS.flatMap((p) => p.course.lessons.map((l) => l.key))
    const cards = SEED_PACKS.flatMap((p) =>
      p.course.lessons.flatMap((l) => l.cards.map((c) => cardSeedKey(l.key, c)))
    )
    for (const [name, keys] of [
      ['course', courses],
      ['lesson', lessons],
      ['card', cards]
    ] as const) {
      expect(new Set(keys).size, `${name} keys unique`).toBe(keys.length)
    }
    // A vanished key orphans the rows already in libraries (a changed card front
    // needs `key: '<old front>'`); a new key must be appended to the lock.
    expect(lock.courses.filter((k) => !courses.includes(k))).toEqual([])
    expect(lock.lessons.filter((k) => !lessons.includes(k))).toEqual([])
    const cardSet = new Set(cards)
    expect(lock.cards.filter((k) => !cardSet.has(k))).toEqual([])
    const locked = new Set([...lock.courses, ...lock.lessons, ...lock.cards])
    expect([...courses, ...lessons, ...cards].filter((k) => !locked.has(k))).toEqual([])
  })

  it('gives every built-in course a Tutor phase', () => {
    expect(SEED_PACKS.map((p) => p.key).filter((k) => !SEED_COURSE_PHASE[k])).toEqual([])
  })

  it('stamps every seeded row with its key and hash, and a second launch does nothing', () => {
    seedJapanese(db)
    for (const table of ['jp_course', 'jp_lesson', 'jp_card']) {
      const missing = db
        .prepare(`SELECT COUNT(*) AS n FROM ${table} WHERE seed_key IS NULL OR seed_hash IS NULL`)
        .get() as { n: number }
      expect(missing.n, table).toBe(0)
    }
    expect(syncSeedContent(db, [...SEED_PACKS], SEED_VERSION)).toBeNull()
  })

  it('backfills a library seeded before keys existed without changing anything', () => {
    seedJapanese(db)
    db.exec(`UPDATE jp_course SET seed_key = NULL, seed_hash = NULL;
      UPDATE jp_lesson SET seed_key = NULL, seed_hash = NULL;
      UPDATE jp_card SET seed_key = NULL, seed_hash = NULL;
      DELETE FROM settings WHERE key IN ('${SEED_KEYS_FLAG}', '${SEED_VERSION_KEY}');`)
    const before = db.prepare('SELECT id, front, back, sort_order FROM jp_card ORDER BY id').all()
    seedJapanese(db)
    expect(db.prepare('SELECT id, front, back, sort_order FROM jp_card ORDER BY id').all()).toEqual(before)
    const unkeyed = db.prepare('SELECT COUNT(*) AS n FROM jp_card WHERE seed_hash IS NULL').get()
    expect(unkeyed).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM jp_seed_tombstone').get()).toEqual({ n: 0 })
  })
})

// ---- the sync rules, over a small synthetic pack ----

function course(overrides: Partial<SeedCourse> = {}): SeedCourse {
  return {
    title: 'Test Course',
    description: 'desc',
    level: 'N5',
    difficulty: 1,
    lessons: [
      {
        key: 't.01',
        kind: 'vocab',
        title: 'Lesson one',
        cards: [
          { front: '猫', reading: 'ねこ', back: 'cat' },
          { front: '犬', reading: 'いぬ', back: 'dog' }
        ]
      },
      {
        key: 't.02',
        kind: 'grammar',
        title: 'Lesson two',
        body: 'body',
        cards: [{ front: '行く。', reading: 'いく。', back: 'Go.' }]
      }
    ],
    ...overrides
  }
}

const pack = (c: SeedCourse): SeedPack => ({ flag: 'japanese.seeded.test', key: 't', course: c })

function seedTest(c: SeedCourse = course()): void {
  insertSeedCourse(db, pack(c))
  db.prepare("INSERT INTO settings (key, value) VALUES ('japanese.seeded.test', '1')").run()
  db.prepare(`INSERT INTO settings (key, value) VALUES ('${SEED_KEYS_FLAG}', '1')`).run()
}

const sync = (c: SeedCourse, version = String(Math.random())) =>
  syncSeedContent(db, [pack(c)], version)

const card = (front: string) =>
  db.prepare('SELECT * FROM jp_card WHERE front = ?').get(front) as
    | { id: number; back: string; sort_order: number; lesson_id: number }
    | undefined
const lessonTitles = () =>
  (db.prepare('SELECT title FROM jp_lesson ORDER BY sort_order, id').all() as { title: string }[]).map(
    (r) => r.title
  )

describe('syncSeedContent', () => {
  it('rewrites unedited rows and leaves the user’s edits alone', () => {
    seedTest()
    jp.updateCard(card('犬')!.id, { back: 'my own note' })
    const next = course()
    next.lessons[0].cards = [
      { front: '猫', reading: 'ねこ', back: 'cat (corrected)' },
      { front: '犬', reading: 'いぬ', back: 'dog (corrected)' }
    ]
    const report = sync(next)
    expect(card('猫')!.back).toBe('cat (corrected)')
    expect(card('犬')!.back).toBe('my own note')
    expect(report?.updated).toBe(1)
  })

  it('keeps review state when a corrected front is keyed to the old one', () => {
    seedTest()
    const id = card('犬')!.id
    db.prepare("UPDATE jp_card SET status = 'review', reps = 4, interval_days = 9 WHERE id = ?").run(id)
    const next = course()
    next.lessons[0].cards[1] = { key: '犬', front: '狗', reading: 'いぬ', back: 'dog' }
    sync(next)
    const row = db.prepare('SELECT front, reps, interval_days FROM jp_card WHERE id = ?').get(id)
    expect(row).toEqual({ front: '狗', reps: 4, interval_days: 9 })
  })

  it('inserts new lessons and cards after their seed sibling, around user additions', () => {
    seedTest()
    const courseId = (db.prepare('SELECT id FROM jp_course').get() as { id: number }).id
    // The user appended their own lesson and their own card.
    jp.createLesson({ courseId, kind: 'vocab', title: 'Mine', cards: [] })
    jp.createCard(card('猫')!.lesson_id, { front: '鳥', back: 'bird' })
    const next = course()
    next.lessons.splice(1, 0, {
      key: 't.03',
      kind: 'vocab',
      title: 'Inserted',
      cards: [{ front: '馬', reading: 'うま', back: 'horse' }]
    })
    next.lessons[0].cards.splice(1, 0, { front: '牛', reading: 'うし', back: 'cow' })
    const report = sync(next)
    expect(report?.inserted).toBe(2)
    expect(lessonTitles()).toEqual(['Lesson one', 'Inserted', 'Lesson two', 'Mine'])
    const order = (
      db
        .prepare('SELECT front FROM jp_card WHERE lesson_id = ? ORDER BY sort_order, id')
        .all(card('猫')!.lesson_id) as { front: string }[]
    ).map((r) => r.front)
    expect(order).toEqual(['猫', '牛', '犬', '鳥'])
  })

  it('never brings back a lesson or card the user deleted', () => {
    seedTest()
    jp.removeCard(card('犬')!.id)
    const lessonTwo = db.prepare("SELECT id FROM jp_lesson WHERE title = 'Lesson two'").get() as {
      id: number
    }
    jp.removeLesson(lessonTwo.id)
    const next = course({ description: 'changed so the sync runs' })
    sync(next)
    expect(card('犬')).toBeUndefined()
    expect(lessonTitles()).toEqual(['Lesson one'])
  })

  it('skips a pack whose course the user deleted', () => {
    seedTest()
    jp.removeCourse((db.prepare('SELECT id FROM jp_course').get() as { id: number }).id)
    sync(course({ description: 'new' }))
    expect(db.prepare('SELECT COUNT(*) AS n FROM jp_course').get()).toEqual({ n: 0 })
  })

  it('removes dropped seed rows only while unedited and unreviewed', () => {
    seedTest()
    db.prepare('UPDATE jp_card SET reps = 1 WHERE front = ?').run('犬')
    const next = course()
    next.lessons[0].cards = []
    next.lessons.pop() // lesson two dropped, never touched
    const report = sync(next)
    expect(card('猫')).toBeUndefined()
    expect(card('犬')).toBeDefined() // reviewed: kept
    expect(lessonTitles()).toEqual(['Lesson one'])
    expect(report?.removed).toBe(2)
  })

  it('keeps a dropped lesson that holds the user’s own card', () => {
    seedTest()
    const lessonTwo = db.prepare("SELECT id FROM jp_lesson WHERE title = 'Lesson two'").get() as {
      id: number
    }
    jp.createCard(lessonTwo.id, { front: '来る。', back: 'Come.' })
    const next = course()
    next.lessons.pop()
    sync(next)
    expect(lessonTitles()).toEqual(['Lesson one', 'Lesson two'])
  })

  it('moves an unedited course to a new step, but not one the user renumbered', () => {
    seedTest()
    sync(course({ difficulty: 4 }))
    expect(db.prepare('SELECT difficulty FROM jp_course').get()).toEqual({ difficulty: 4 })
    const id = (db.prepare('SELECT id FROM jp_course').get() as { id: number }).id
    jp.updateCourse(id, { difficulty: 9 })
    sync(course({ difficulty: 6 }))
    expect(db.prepare('SELECT difficulty FROM jp_course').get()).toEqual({ difficulty: 9 })
  })

  it('runs only when the version stamp changes', () => {
    seedTest()
    expect(sync(course(), 'v1')).not.toBeNull()
    expect(sync(course({ description: 'ignored' }), 'v1')).toBeNull()
  })
})

describe('moving a lesson between built-in courses', () => {
  const two = (first: SeedCourse, second: SeedCourse): SeedPack[] => [
    { flag: 'japanese.seeded.a', key: 'a', course: first },
    { flag: 'japanese.seeded.b', key: 'b', course: second }
  ]
  const lessonA = { key: 'a.01', kind: 'grammar' as const, title: 'Moves', body: 'b', cards: [{ front: '行く。', back: 'Go.' }] }
  const stay = { key: 'b.01', kind: 'vocab' as const, title: 'Stays', cards: [{ front: '猫', back: 'cat' }] }

  for (const order of ['later course takes it', 'earlier course takes it'] as const) {
    it(`keeps the lesson and its review progress (${order})`, () => {
      const start = two(
        { title: 'A', description: '', level: 'N1', difficulty: 2, lessons: [lessonA] },
        { title: 'B', description: '', level: 'N2', difficulty: 1, lessons: [stay] }
      )
      for (const p of start) {
        insertSeedCourse(db, p)
        db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(p.flag, '1')
      }
      db.prepare("UPDATE jp_card SET reps = 4, status = 'review' WHERE front = '行く。'").run()
      const moved = two(
        { title: 'A', description: '', level: 'N1', difficulty: 2, lessons: [] },
        { title: 'B', description: '', level: 'N2', difficulty: 1, lessons: [stay, lessonA] }
      )
      syncSeedContent(db, order === 'later course takes it' ? moved : [moved[1], moved[0]], 'v2')
      const rows = db
        .prepare(
          `SELECT c.title AS course, l.title AS lesson, k.reps FROM jp_card k
           JOIN jp_lesson l ON l.id = k.lesson_id JOIN jp_course c ON c.id = l.course_id
           WHERE k.front = '行く。'`
        )
        .all()
      expect(rows).toEqual([{ course: 'B', lesson: 'Moves', reps: 4 }])
    })
  }
})

describe('backfillSeedKeys', () => {
  it('trusts only rows equal to today’s seed and tombstones what the library lacks', () => {
    // A library seeded long ago: no keys, one card edited, one lesson deleted.
    insertSeedCourse(db, pack(course()))
    db.exec(`UPDATE jp_course SET seed_key = NULL, seed_hash = NULL;
      UPDATE jp_lesson SET seed_key = NULL, seed_hash = NULL;
      UPDATE jp_card SET seed_key = NULL, seed_hash = NULL;`)
    db.prepare("INSERT INTO settings (key, value) VALUES ('japanese.seeded.test', '1')").run()
    db.prepare("UPDATE jp_card SET back = 'edited long ago' WHERE front = '犬'").run()
    db.prepare("DELETE FROM jp_lesson WHERE title = 'Lesson two'").run()

    backfillSeedKeys(db, [pack(course())])
    expect(db.prepare("SELECT seed_key, seed_hash IS NULL AS detached FROM jp_card WHERE front = '犬'").get()).toEqual({
      seed_key: 't.01/犬',
      detached: 1
    })
    expect(db.prepare("SELECT seed_hash IS NULL AS detached FROM jp_card WHERE front = '猫'").get()).toEqual({
      detached: 0
    })
    expect(db.prepare('SELECT seed_key FROM jp_seed_tombstone').all()).toEqual([{ seed_key: 't.02' }])

    // The sync then corrects the trusted card only, and never restores lesson two.
    const next = course()
    next.lessons[0].cards = [
      { front: '猫', reading: 'ねこ', back: 'cat!' },
      { front: '犬', reading: 'いぬ', back: 'dog!' }
    ]
    sync(next)
    expect(card('猫')!.back).toBe('cat!')
    expect(card('犬')!.back).toBe('edited long ago')
    expect(lessonTitles()).toEqual(['Lesson one'])
  })

  it('matches a lesson renamed since the library was seeded through formerTitles', () => {
    insertSeedCourse(db, pack(course()))
    db.exec(`UPDATE jp_course SET seed_key = NULL, seed_hash = NULL;
      UPDATE jp_lesson SET seed_key = NULL, seed_hash = NULL;
      UPDATE jp_card SET seed_key = NULL, seed_hash = NULL;`)
    db.prepare("INSERT INTO settings (key, value) VALUES ('japanese.seeded.test', '1')").run()
    const renamed = course()
    renamed.lessons[0] = { ...renamed.lessons[0], title: 'Lesson one, renamed', formerTitles: ['Lesson one'] }
    backfillSeedKeys(db, [pack(renamed)])
    expect(db.prepare('SELECT COUNT(*) AS n FROM jp_seed_tombstone').get()).toEqual({ n: 0 })
    sync(renamed)
    expect(lessonTitles()).toEqual(['Lesson one, renamed', 'Lesson two'])
  })
})

describe('review hardening', () => {
  it('keeps seed order when several lessons and cards are inserted', () => {
    seedTest()
    const next = course()
    next.lessons = [
      { key: 't.00', kind: 'vocab', title: 'New first', cards: [] },
      next.lessons[0],
      { key: 't.05', kind: 'vocab', title: 'New middle', cards: [] },
      next.lessons[1],
      { key: 't.06', kind: 'vocab', title: 'New last', cards: [] }
    ]
    next.lessons[1].cards = [
      { front: '牛', reading: 'うし', back: 'cow' },
      next.lessons[1].cards[0],
      { front: '馬', reading: 'うま', back: 'horse' },
      next.lessons[1].cards[1],
      { front: '羊', reading: 'ひつじ', back: 'sheep' }
    ]
    sync(next)
    expect(lessonTitles()).toEqual(['New first', 'Lesson one', 'New middle', 'Lesson two', 'New last'])
    const order = (
      db
        .prepare('SELECT front FROM jp_card WHERE lesson_id = ? ORDER BY sort_order, id')
        .all(card('猫')!.lesson_id) as { front: string }[]
    ).map((r) => r.front)
    expect(order).toEqual(['牛', '猫', '馬', '犬', '羊'])
  })

  it('never deletes a dropped card with review history, attachments, or a learned lesson', () => {
    seedTest()
    const cat = card('猫')!
    const dog = card('犬')!
    // Reset after reviewing: reps 0 and status new again, but the log remains.
    db.prepare("INSERT INTO jp_review_log (card_id, grade, interval_days, ease) VALUES (?, 'good', 1, 2.5)").run(cat.id)
    jp.updateCard(dog.id, { audioPath: 'jpaudio/mining/x.mp3' })
    const lessonTwo = db.prepare("SELECT id FROM jp_lesson WHERE title = 'Lesson two'").get() as { id: number }
    jp.setLessonLearned(lessonTwo.id, true)
    const next = course()
    next.lessons[0].cards = []
    next.lessons.pop()
    const report = sync(next)
    expect(report?.removed).toBe(0)
    expect(card('猫')).toBeDefined()
    expect(card('犬')).toBeDefined()
    expect(lessonTitles()).toEqual(['Lesson one', 'Lesson two'])
  })

  it('keys a built-in course the user renamed, by its lessons', () => {
    insertSeedCourse(db, pack(course()))
    db.exec(`UPDATE jp_course SET seed_key = NULL, seed_hash = NULL, title = 'My renamed course';
      UPDATE jp_lesson SET seed_key = NULL, seed_hash = NULL;
      UPDATE jp_card SET seed_key = NULL, seed_hash = NULL;`)
    db.prepare("INSERT INTO settings (key, value) VALUES ('japanese.seeded.test', '1')").run()
    backfillSeedKeys(db, [pack(course())])
    expect(db.prepare('SELECT seed_key, title FROM jp_course').get()).toEqual({
      seed_key: 't',
      title: 'My renamed course'
    })
    const next = course({ title: 'Test Course' })
    next.lessons[0].cards[0] = { front: '猫', reading: 'ねこ', back: 'cat (fixed)' }
    sync(next)
    expect(card('猫')!.back).toBe('cat (fixed)')
    expect(db.prepare('SELECT title FROM jp_course').get()).toEqual({ title: 'My renamed course' })
  })
})

describe('restoring built-in text', () => {
  it('puts the built-in text back over edits, keeping progress, user cards and deletions', () => {
    seedTest()
    const dog = card('犬')!
    jp.updateCard(dog.id, { back: 'my note' })
    db.prepare('UPDATE jp_card SET reps = 5 WHERE id = ?').run(dog.id)
    jp.createCard(dog.lesson_id, { front: '鳥', back: 'bird' })
    jp.removeCard(card('猫')!.id)
    sync(course(), 'v1')
    expect(card('犬')!.back).toBe('my note')
    expect(seedDrift(db)).toEqual({ edited: 1, missing: 0 })

    reattachSeedRows(db)
    sync(course({ description: 'v2' }), 'v1') // the stamp was cleared, so even v1 runs
    expect(card('犬')!.back).toBe('dog')
    expect(db.prepare('SELECT reps FROM jp_card WHERE id = ?').get(dog.id)).toEqual({ reps: 5 })
    expect(card('鳥')!.back).toBe('bird')
    expect(card('猫')).toBeUndefined() // the user's own deletion stays
    expect(seedDrift(db)).toEqual({ edited: 0, missing: 0 })
  })

  it('counts and restores what the backfill could not trust or find', () => {
    insertSeedCourse(db, pack(course()))
    db.exec(`UPDATE jp_course SET seed_key = NULL, seed_hash = NULL;
      UPDATE jp_lesson SET seed_key = NULL, seed_hash = NULL;
      UPDATE jp_card SET seed_key = NULL, seed_hash = NULL;`)
    db.prepare("INSERT INTO settings (key, value) VALUES ('japanese.seeded.test', '1')").run()
    db.prepare("UPDATE jp_card SET back = 'old text' WHERE front = '猫'").run()
    db.prepare("DELETE FROM jp_lesson WHERE title = 'Lesson two'").run()
    backfillSeedKeys(db, [pack(course())])
    sync(course(), 'v1')
    expect(seedDrift(db)).toEqual({ edited: 1, missing: 1 })
    reattachSeedRows(db)
    sync(course(), 'v1')
    expect(card('猫')!.back).toBe('cat')
    expect(lessonTitles()).toEqual(['Lesson one', 'Lesson two'])
    expect(seedDrift(db)).toEqual({ edited: 0, missing: 0 })
  })
})
