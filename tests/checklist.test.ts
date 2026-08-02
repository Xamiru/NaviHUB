// 'localtime' SQL grouping otherwise depends on the machine's timezone —
// must run before anything touches sqlite.
process.env.TZ = 'UTC'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as checklistRepo from '../src/main/repos/checklistRepo'
import {
  addDays,
  CHECKLIST_DEFS,
  CHECKLIST_SEED,
  checklistDef,
  periodKeyFor,
  weekRange,
  weeklyKey
} from '../src/shared/checklist'

// 2026-07-25 is a Saturday — the week start this app uses.
const SAT = '2026-07-25'
const FRI = '2026-07-24'

const ANIME_TASK = { key: 'anime-episode', cadence: 'daily' as const }
const MOVIE_TASK = { key: 'movie-watch', cadence: 'weekly' as const }
const MANGA_TASK = { key: 'manga-chapter', cadence: 'daily' as const }

beforeEach(() => {
  db = createTestDb()
})

function addMedia(
  mediaType: string,
  title: string,
  extra: {
    status?: string | null
    progress?: number
    totalUnits?: number | null
    rewatchCount?: number
  } = {}
): number {
  return Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, status, progress, total_units, rewatch_count)
         VALUES (?,?,?,?,?,?)`
      )
      .run(
        mediaType,
        title,
        extra.status ?? null,
        extra.progress ?? 0,
        extra.totalUnits ?? null,
        extra.rewatchCount ?? 0
      ).lastInsertRowid
  )
}

function mediaRow(id: number): { status: string | null; progress: number } {
  return db.prepare('SELECT status, progress FROM media_item WHERE id = ?').get(id) as {
    status: string | null
    progress: number
  }
}

function rewatchCount(id: number): number {
  return (
    db.prepare('SELECT rewatch_count AS n FROM media_item WHERE id = ?').get(id) as { n: number }
  ).n
}

// jp_review_log rows need a real card behind them (FKs are ON in the test DB).
function addCard(): number {
  const courseId = Number(
    db.prepare("INSERT INTO jp_course (title) VALUES ('Test')").run().lastInsertRowid
  )
  const lessonId = Number(
    db
      .prepare("INSERT INTO jp_lesson (course_id, kind, title) VALUES (?, 'vocab', 'L1')")
      .run(courseId).lastInsertRowid
  )
  return Number(
    db
      .prepare("INSERT INTO jp_card (lesson_id, front, back) VALUES (?, 'front', 'back')")
      .run(lessonId).lastInsertRowid
  )
}

function addReview(cardId: number, day: string): void {
  db.prepare(
    "INSERT INTO jp_review_log (card_id, grade, reviewed_at, interval_days, ease) VALUES (?, 'good', ?, 1, 2.5)"
  ).run(cardId, `${day} 12:00:00`)
}

// Pin a board row's created_at so the streak window is deterministic.
function backdateTasks(day: string): void {
  db.prepare('UPDATE checklist_task SET created_at = ?').run(`${day} 12:00:00`)
}

function taskByKey(day: string, key: string) {
  const s = checklistRepo.status(day)
  return [...s.daily, ...s.weekly].find((t) => t.key === key)!
}

describe('period helpers', () => {
  it('anchors weeks to Saturday', () => {
    expect(weeklyKey(SAT)).toBe(SAT) // a Saturday is its own key
    expect(weeklyKey(FRI)).toBe('2026-07-18') // Friday belongs to the prior Saturday
    expect(weeklyKey('2026-07-26')).toBe(SAT) // Sunday belongs to the day before
  })

  it('crosses the year boundary', () => {
    expect(weeklyKey('2026-01-01')).toBe('2025-12-27')
    expect(addDays('2025-12-31', 1)).toBe('2026-01-01')
  })

  it('rolls the range over on Friday→Saturday', () => {
    expect(weekRange(FRI)).toEqual({ start: '2026-07-18', end: FRI })
    expect(weekRange(SAT)).toEqual({ start: SAT, end: '2026-07-31' })
  })

  it('keys daily periods by the day itself', () => {
    expect(periodKeyFor('daily', FRI)).toBe(FRI)
    expect(periodKeyFor('weekly', FRI)).toBe('2026-07-18')
  })
})

describe('board', () => {
  it('dedupes a key per cadence but allows both cadences', () => {
    const a = checklistRepo.addTask('anime-episode', 'daily')
    expect(checklistRepo.addTask('anime-episode', 'daily')).toBe(a) // UNIQUE(key, cadence)
    const b = checklistRepo.addTask('anime-episode', 'weekly')
    expect(b).not.toBe(a)
    const s = checklistRepo.status(SAT)
    expect(s.daily).toHaveLength(1)
    expect(s.weekly).toHaveLength(1)
  })

  it('rejects a key the catalog does not know', () => {
    expect(() => checklistRepo.addTask('nope', 'daily')).toThrow()
  })

  it('keeps log history when an item is removed and re-added', () => {
    const id = checklistRepo.addTask('gacha-daily-fgo', 'daily')
    checklistRepo.tick('gacha-daily-fgo', 'daily', SAT)
    checklistRepo.removeTask(id)
    expect(checklistRepo.status(SAT).daily).toHaveLength(0)
    checklistRepo.addTask('gacha-daily-fgo', 'daily')
    expect(taskByKey(SAT, 'gacha-daily-fgo').done).toBe(true)
  })

  it('reports the week the day belongs to', () => {
    expect(checklistRepo.status(FRI).week).toEqual({ start: '2026-07-18', end: FRI })
  })
})

describe('detection', () => {
  it('counts distinct cards reviewed, not repeats of the same card', () => {
    checklistRepo.addTask('jp-reviews', 'daily')
    const c1 = addCard()
    const c2 = addCard()
    addReview(c1, SAT)
    addReview(c1, SAT) // learning-step repeat — same word
    addReview(c2, SAT)
    addReview(c1, FRI) // yesterday
    expect(taskByKey(SAT, 'jp-reviews').progress).toBe(2)
  })

  it('detects distinct English words reviewed (enReviews)', () => {
    checklistRepo.addTask('english-reviews', 'daily')
    const wordId = Number(
      db
        .prepare("INSERT INTO en_word (word, meaning) VALUES ('ephemeral', 'Short-lived.')")
        .run().lastInsertRowid
    )
    const addEnReview = (day: string): void => {
      db.prepare(
        "INSERT INTO en_review_log (word_id, grade, reviewed_at, interval_days, ease) VALUES (?, 'good', ?, 1, 2.5)"
      ).run(wordId, `${day} 12:00:00`)
    }
    addEnReview(SAT)
    addEnReview(SAT) // learning-step repeat — same word
    addEnReview(FRI) // yesterday
    expect(taskByKey(SAT, 'english-reviews').progress).toBe(1)
  })

  it('scopes weekly detection to the Saturday→Friday window', () => {
    checklistRepo.addTask('quiz-round', 'weekly')
    const add = (day: string): void => {
      db.prepare(
        "INSERT INTO quiz_session (kind, score, total, played_at) VALUES ('song', 1, 1, ?)"
      ).run(`${day} 12:00:00`)
    }
    add('2026-07-17') // previous week
    add('2026-07-20') // this week (Mon)
    add(FRI) // this week (Fri)
    expect(taskByKey(FRI, 'quiz-round').progress).toBe(2)
    expect(taskByKey(FRI, 'quiz-round').done).toBe(true)
  })

  it('counts lessons learned in the week', () => {
    checklistRepo.addTask('jp-lesson', 'weekly')
    const courseId = Number(
      db.prepare("INSERT INTO jp_course (title) VALUES ('C')").run().lastInsertRowid
    )
    const addLesson = (learned: number, at: string | null): void => {
      db.prepare(
        `INSERT INTO jp_lesson (course_id, kind, title, learned, learned_at)
         VALUES (?, 'grammar', 'L', ?, ?)`
      ).run(courseId, learned, at)
    }
    addLesson(1, `${SAT} 12:00:00`)
    addLesson(1, '2026-07-17 12:00:00') // previous week
    addLesson(0, null)
    expect(taskByKey(SAT, 'jp-lesson').progress).toBe(1)
  })

  // The activity often happens outside NaviHUB, so detection alone must never
  // be able to strand an item at 0.
  it('adds hand-made credits on top of what was detected', () => {
    checklistRepo.addTask('jp-reviews', 'daily')
    const c = addCard()
    addReview(c, SAT)
    expect(taskByKey(SAT, 'jp-reviews')).toMatchObject({ detected: 1, progress: 1 })

    const logId = checklistRepo.credit('jp-reviews', 'daily', SAT)
    const credited = taskByKey(SAT, 'jp-reviews')
    expect(credited).toMatchObject({ detected: 1, progress: 2 })
    expect(credited.entries.map((e) => e.id)).toEqual([logId]) // undoable on its own

    checklistRepo.undoLog(logId)
    expect(taskByKey(SAT, 'jp-reviews')).toMatchObject({ detected: 1, progress: 1 })
  })

  it('lets credits alone finish a detected item', () => {
    checklistRepo.addTask('quiz-round', 'weekly')
    expect(taskByKey(SAT, 'quiz-round').done).toBe(false)
    checklistRepo.credit('quiz-round', 'weekly', SAT)
    expect(taskByKey(SAT, 'quiz-round').done).toBe(true)
  })
})

describe('logging a manga chapter', () => {
  // Was detected from manga_chapter.read_at, which only ever exists for locally
  // scanned series read in the in-app reader — now it logs like anime.
  it('is a mediaLog item that bumps chapter progress', () => {
    expect(checklistDef('manga-chapter')).toMatchObject({ kind: 'mediaLog', mediaType: 'manga' })
    checklistRepo.addTask('manga-chapter', 'daily')
    const id = addMedia('manga', 'Berserk', { status: 'Plan to Read', progress: 3 })
    checklistRepo.logProgress(id, SAT, MANGA_TASK)
    expect(mediaRow(id)).toEqual({ status: 'Reading', progress: 4 })
    expect(taskByKey(SAT, 'manga-chapter').done).toBe(true)
  })

  it('writes no manga_chapter row — those belong to the scanner', () => {
    checklistRepo.addTask('manga-chapter', 'daily')
    const id = addMedia('manga', 'Berserk')
    checklistRepo.logProgress(id, SAT, MANGA_TASK)
    expect(
      (db.prepare('SELECT COUNT(*) AS n FROM manga_chapter').get() as { n: number }).n
    ).toBe(0)
  })
})

describe('logging an anime episode', () => {
  beforeEach(() => {
    checklistRepo.addTask('anime-episode', 'daily')
  })

  it('bumps progress and promotes a planned title to watching', () => {
    const id = addMedia('anime', 'Bebop', { status: 'Plan to Watch', progress: 3, totalUnits: 26 })
    checklistRepo.logProgress(id, SAT, ANIME_TASK)
    expect(mediaRow(id)).toEqual({ status: 'Watching', progress: 4 })
    const task = taskByKey(SAT, 'anime-episode')
    expect(task.progress).toBe(1)
    expect(task.entries[0].title).toBe('Bebop')
  })

  it('completes the title when the last episode is logged', () => {
    const id = addMedia('anime', 'Bebop', { status: 'Watching', progress: 25, totalUnits: 26 })
    checklistRepo.logProgress(id, SAT, ANIME_TASK)
    expect(mediaRow(id)).toEqual({ status: 'Completed', progress: 26 })
  })

  it('leaves an unknown episode count uncompleted', () => {
    const id = addMedia('anime', 'Ongoing', { status: 'Watching', progress: 5, totalUnits: null })
    checklistRepo.logProgress(id, SAT, ANIME_TASK)
    expect(mediaRow(id)).toEqual({ status: 'Watching', progress: 6 })
  })

  it('restores the prior progress and status on undo', () => {
    const id = addMedia('anime', 'Bebop', { status: 'Plan to Watch', progress: 3, totalUnits: 26 })
    const { logId } = checklistRepo.logProgress(id, SAT, ANIME_TASK)
    checklistRepo.undoLog(logId!)
    expect(mediaRow(id)).toEqual({ status: 'Plan to Watch', progress: 3 })
    expect(taskByKey(SAT, 'anime-episode').progress).toBe(0)
  })

  it('refuses a title of the wrong type', () => {
    const id = addMedia('movie', 'Akira')
    expect(() => checklistRepo.logProgress(id, SAT, ANIME_TASK)).toThrow()
  })

  it('survives the title being deleted afterwards', () => {
    const id = addMedia('anime', 'Bebop', { progress: 0 })
    const { logId } = checklistRepo.logProgress(id, SAT, ANIME_TASK)
    db.prepare('DELETE FROM media_item WHERE id = ?').run(id)
    // The cached title still renders the entry…
    expect(taskByKey(SAT, 'anime-episode').entries[0].title).toBe('Bebop')
    // …and undo just drops the row.
    expect(() => checklistRepo.undoLog(logId!)).not.toThrow()
    expect(taskByKey(SAT, 'anime-episode').progress).toBe(0)
  })
})

describe('logging a movie', () => {
  beforeEach(() => {
    checklistRepo.addTask('movie-watch', 'weekly')
  })

  it('marks it watched and restores the prior status on undo', () => {
    const id = addMedia('movie', 'Akira', { status: 'Want to Watch' })
    const { logId } = checklistRepo.logProgress(id, FRI, MOVIE_TASK)
    expect(mediaRow(id).status).toBe('Watched')
    // Weekly rows key on the week's Saturday, not the day it happened.
    expect(
      db.prepare('SELECT period_key FROM checklist_log WHERE id = ?').get(logId!)
    ).toEqual({ period_key: '2026-07-18' })
    checklistRepo.undoLog(logId!)
    expect(mediaRow(id).status).toBe('Want to Watch')
  })

  it('uses the configured status list over the built-in default', () => {
    db.prepare("INSERT INTO settings (key, value) VALUES ('movie.statuses', ?)").run(
      '["Viewing","Seen","Parked","Abandoned","Queued"]'
    )
    const id = addMedia('movie', 'Akira', { status: 'Queued' })
    checklistRepo.logProgress(id, SAT, MOVIE_TASK)
    expect(mediaRow(id).status).toBe('Seen')
  })

  it('needs two films for the week', () => {
    const a = addMedia('movie', 'Akira')
    const b = addMedia('movie', 'Perfect Blue')
    checklistRepo.logProgress(a, SAT, MOVIE_TASK)
    expect(taskByKey(SAT, 'movie-watch').done).toBe(false)
    checklistRepo.logProgress(b, SAT, MOVIE_TASK)
    expect(taskByKey(SAT, 'movie-watch').done).toBe(true)
  })
})

describe('manual items', () => {
  it('ticks once per period and unticks back', () => {
    checklistRepo.addTask('gacha-daily-hsr', 'daily')
    const first = checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)
    expect(checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)).toBe(first) // clamped at target
    expect(taskByKey(SAT, 'gacha-daily-hsr').progress).toBe(1)
    checklistRepo.untick('gacha-daily-hsr', 'daily', SAT)
    expect(taskByKey(SAT, 'gacha-daily-hsr').done).toBe(false)
  })

  it('refuses to credit a mediaLog item by hand', () => {
    checklistRepo.addTask('anime-episode', 'daily')
    // Crediting one would show the board done with no episode logged, no
    // media_id, and nothing for undo to restore — logProgress is the only way.
    expect(() => checklistRepo.credit('anime-episode', 'daily', SAT)).toThrow(/picking a title/i)
    expect(() => checklistRepo.tick('anime-episode', 'daily', SAT)).toThrow(/picking a title/i)
    expect(taskByKey(SAT, 'anime-episode').progress).toBe(0)
  })

  it('has one item per gacha game', () => {
    const manual = CHECKLIST_DEFS.filter((d) => d.kind === 'manual')
    expect(manual.map((d) => d.key)).toEqual([
      'gacha-daily-hsr',
      'gacha-daily-fgo',
      'gacha-daily-e7',
      'gacha-daily-wuwa'
    ])
  })
})

describe('streak & history', () => {
  it('counts consecutive days where every daily item was done', () => {
    checklistRepo.addTask('gacha-daily-hsr', 'daily')
    backdateTasks('2026-07-01')
    for (const day of [addDays(SAT, -2), FRI, SAT]) {
      checklistRepo.tick('gacha-daily-hsr', 'daily', day)
    }
    expect(checklistRepo.status(SAT).streak.current).toBe(3)
  })

  it('breaks on a missed day', () => {
    checklistRepo.addTask('gacha-daily-hsr', 'daily')
    backdateTasks('2026-07-01')
    checklistRepo.tick('gacha-daily-hsr', 'daily', addDays(SAT, -2))
    checklistRepo.tick('gacha-daily-hsr', 'daily', SAT) // yesterday skipped
    const s = checklistRepo.status(SAT)
    expect(s.streak.current).toBe(1)
    expect(s.streak.longest).toBe(1)
  })

  it('only judges a day by the items that existed then', () => {
    checklistRepo.addTask('gacha-daily-hsr', 'daily')
    backdateTasks('2026-07-01')
    checklistRepo.tick('gacha-daily-hsr', 'daily', FRI)
    checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)
    // A second item joins the board today; yesterday stays complete.
    checklistRepo.addTask('gacha-daily-fgo', 'daily')
    db.prepare('UPDATE checklist_task SET created_at = ? WHERE task_key = ?').run(
      `${SAT} 12:00:00`,
      'gacha-daily-fgo'
    )
    const s = checklistRepo.status(SAT)
    expect(s.streak.current).toBe(1) // today isn't complete — FGO is untouched
    expect(s.history.find((h) => h.day === FRI)?.count).toBe(1)
    checklistRepo.tick('gacha-daily-fgo', 'daily', SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(2)
  })

  it('is empty and safe with no daily items', () => {
    checklistRepo.addTask('movie-watch', 'weekly')
    const s = checklistRepo.status(SAT)
    expect(s.streak).toEqual({ current: 0, longest: 0 })
    expect(s.history).toEqual([])
  })

  it('mixes detected and logged items in one day verdict', () => {
    checklistRepo.addTask('jp-reviews', 'daily')
    checklistRepo.addTask('gacha-daily-hsr', 'daily')
    backdateTasks('2026-07-01')
    checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(0) // reviews target not met
    const cards = Array.from({ length: 20 }, () => addCard())
    for (const c of cards) addReview(c, SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(1)
  })
})

describe('status payload', () => {
  it('reports the board the page renders from', () => {
    checklistRepo.addTask('anime-episode', 'daily')
    checklistRepo.addTask('jp-reviews', 'daily')
    checklistRepo.addTask('movie-watch', 'weekly')
    const s = checklistRepo.status(SAT)
    expect(s.today).toBe(SAT)
    expect(s.daily.map((t) => t.key)).toEqual(['anime-episode', 'jp-reviews'])
    expect(s.weekly.map((t) => t.key)).toEqual(['movie-watch'])
    expect(s.daily[0]).toMatchObject({
      kind: 'mediaLog',
      mediaType: 'anime',
      target: 1,
      progress: 0,
      done: false,
      route: null
    })
    expect(s.daily[1]).toMatchObject({ kind: 'detected', route: '/japanese/review', target: 20 })
  })
})

describe('rewatches', () => {
  it('wraps a finished series into a new pass and restores it on undo', () => {
    checklistRepo.addTask('anime-episode', 'daily')
    const id = addMedia('anime', 'Bebop', { status: 'Completed', progress: 26, totalUnits: 26 })
    const res = checklistRepo.logProgress(id, SAT, ANIME_TASK)
    expect(res.startedRewatch).toBe(true)
    expect(mediaRow(id)).toEqual({ status: 'Watching', progress: 1 })
    expect(rewatchCount(id)).toBe(2) // 0 already meant "seen once"

    checklistRepo.undoLog(res.logId!)
    expect(mediaRow(id)).toEqual({ status: 'Completed', progress: 26 })
    expect(rewatchCount(id)).toBe(0)
  })

  it('counts another viewing of a film', () => {
    checklistRepo.addTask('movie-watch', 'weekly')
    const id = addMedia('movie', 'Akira', { status: 'Watched', totalUnits: 117, rewatchCount: 3 })
    const res = checklistRepo.logProgress(id, SAT, MOVIE_TASK)
    expect(res).toMatchObject({ startedRewatch: true, rewatchCount: 4 })
    expect(mediaRow(id)).toEqual({ status: 'Watched', progress: 0 })
  })
})

// The media detail page's log button calls logProgress with no task in hand.
describe('logging from a media page', () => {
  it('credits the matching board item, preferring daily', () => {
    checklistRepo.addTask('anime-episode', 'weekly')
    checklistRepo.addTask('anime-episode', 'daily')
    const id = addMedia('anime', 'Bebop', { totalUnits: 26 })
    const res = checklistRepo.logProgress(id, SAT)
    expect(res.logId).not.toBeNull()
    expect(taskByKey(SAT, 'anime-episode').progress).toBe(1)
    const row = db.prepare('SELECT cadence FROM checklist_log WHERE id = ?').get(res.logId!)
    expect(row).toEqual({ cadence: 'daily' })
  })

  it('still advances the media row when nothing on the board covers the type', () => {
    checklistRepo.addTask('movie-watch', 'weekly')
    const id = addMedia('anime', 'Bebop', { progress: 4, totalUnits: 26 })
    const res = checklistRepo.logProgress(id, SAT)
    expect(res.logId).toBeNull()
    expect(mediaRow(id)).toEqual({ status: 'Watching', progress: 5 })
    expect(
      (db.prepare('SELECT COUNT(*) AS n FROM checklist_log').get() as { n: number }).n
    ).toBe(0)
  })

  it('rejects a media id that no longer exists', () => {
    expect(() => checklistRepo.logProgress(9999, SAT)).toThrow()
  })
})

describe('targets', () => {
  it('overrides the catalog default and resets back to it', () => {
    const id = checklistRepo.addTask('jp-reviews', 'daily')
    expect(taskByKey(SAT, 'jp-reviews')).toMatchObject({ target: 20, defaultTarget: 20 })

    checklistRepo.setTarget(id, 5)
    expect(taskByKey(SAT, 'jp-reviews')).toMatchObject({ target: 5, defaultTarget: 20 })

    const cards = [addCard(), addCard(), addCard(), addCard(), addCard()]
    for (const c of cards) addReview(c, SAT)
    expect(taskByKey(SAT, 'jp-reviews').done).toBe(true) // 5/5 under the override

    checklistRepo.setTarget(id, null)
    expect(taskByKey(SAT, 'jp-reviews')).toMatchObject({ target: 20, done: false })
  })

  it('ignores a nonsense target', () => {
    const id = checklistRepo.addTask('movie-watch', 'weekly')
    checklistRepo.setTarget(id, 0)
    expect(taskByKey(SAT, 'movie-watch').target).toBe(2)
  })

  it('clamps a manual tick at the overridden target', () => {
    const id = checklistRepo.addTask('gacha-daily-hsr', 'daily')
    checklistRepo.setTarget(id, 3)
    checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)
    checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)
    const third = checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)
    expect(checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)).toBe(third)
    expect(taskByKey(SAT, 'gacha-daily-hsr')).toMatchObject({ progress: 3, done: true })
  })

  it('is honoured by the streak', () => {
    const id = checklistRepo.addTask('gacha-daily-hsr', 'daily')
    checklistRepo.setTarget(id, 2)
    backdateTasks('2026-07-01')
    checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(0) // 1 of 2
    checklistRepo.tick('gacha-daily-hsr', 'daily', SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(1)
  })
})

describe('reorder', () => {
  it('rewrites the board order and leaves the other cadence alone', () => {
    const a = checklistRepo.addTask('anime-episode', 'daily')
    const b = checklistRepo.addTask('jp-reviews', 'daily')
    const c = checklistRepo.addTask('gacha-daily-hsr', 'daily')
    checklistRepo.addTask('movie-watch', 'weekly')
    expect(checklistRepo.status(SAT).daily.map((t) => t.id)).toEqual([a, b, c])

    checklistRepo.reorder('daily', [c, a, b])
    expect(checklistRepo.status(SAT).daily.map((t) => t.id)).toEqual([c, a, b])
    expect(checklistRepo.status(SAT).weekly).toHaveLength(1)
  })

  it('ignores ids from another cadence', () => {
    const a = checklistRepo.addTask('anime-episode', 'daily')
    const w = checklistRepo.addTask('movie-watch', 'weekly')
    checklistRepo.reorder('daily', [w, a])
    expect(checklistRepo.status(SAT).daily.map((t) => t.id)).toEqual([a])
    expect(checklistRepo.status(SAT).weekly.map((t) => t.id)).toEqual([w])
  })
})

describe('starter board', () => {
  it('seeds a routine the catalog actually knows', () => {
    expect(CHECKLIST_SEED.length).toBeGreaterThan(0)
    for (const item of CHECKLIST_SEED) expect(checklistDef(item.key)).toBeTruthy()
    expect(CHECKLIST_SEED.filter((i) => i.cadence === 'weekly').map((i) => i.key)).toEqual([
      'movie-watch',
      'jp-lesson',
      'quiz-round'
    ])
  })
})
