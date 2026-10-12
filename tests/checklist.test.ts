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
    const a = checklistRepo.addTask('anime-episode', 'daily', SAT)
    expect(checklistRepo.addTask('anime-episode', 'daily', SAT)).toBe(a) // UNIQUE(key, cadence)
    const b = checklistRepo.addTask('anime-episode', 'weekly', SAT)
    expect(b).not.toBe(a)
    const s = checklistRepo.status(SAT)
    expect(s.daily).toHaveLength(1)
    expect(s.weekly).toHaveLength(1)
  })

  it('rejects a key the catalog does not know', () => {
    expect(() => checklistRepo.addTask('nope', 'daily', SAT)).toThrow()
  })

  it('keeps log history when an item is removed and re-added', () => {
    const id = checklistRepo.addTask('game-session', 'daily', SAT)
    checklistRepo.tick('game-session', 'daily', SAT)
    checklistRepo.removeTask(id, SAT)
    expect(checklistRepo.status(SAT).daily).toHaveLength(0)
    checklistRepo.addTask('game-session', 'daily', SAT)
    expect(taskByKey(SAT, 'game-session').done).toBe(true)
  })

  it('reports the week the day belongs to', () => {
    expect(checklistRepo.status(FRI).week).toEqual({ start: '2026-07-18', end: FRI })
  })
})

describe('detection', () => {
  it('counts distinct cards reviewed, not repeats of the same card', () => {
    checklistRepo.addTask('jp-reviews', 'daily', SAT)
    const c1 = addCard()
    const c2 = addCard()
    addReview(c1, SAT)
    addReview(c1, SAT) // learning-step repeat — same word
    addReview(c2, SAT)
    addReview(c1, FRI) // yesterday
    expect(taskByKey(SAT, 'jp-reviews').progress).toBe(2)
  })

  it('detects distinct English words reviewed (enReviews)', () => {
    checklistRepo.addTask('english-reviews', 'daily', SAT)
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
    checklistRepo.addTask('quiz-round', 'weekly', SAT)
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

  it('detects game sessions launched from the app, and stacks manual credit', () => {
    checklistRepo.addTask('game-session', 'daily', SAT)
    const gameId = addMedia('game', 'Persona 5')
    const addSession = (day: string): void => {
      db.prepare(
        `INSERT INTO game_session (media_id, started_at, ended_at, duration)
         VALUES (?, ?, ?, 1800)`
      ).run(gameId, `${day} 12:00:00`, `${day} 12:30:00`)
    }
    addSession(SAT)
    addSession(FRI) // yesterday — outside today's daily window
    expect(taskByKey(SAT, 'game-session')).toMatchObject({ detected: 1, progress: 1, done: true })

    // Played outside NaviHUB → hand credit stacks on top of detection.
    checklistRepo.credit('game-session', 'daily', SAT)
    expect(taskByKey(SAT, 'game-session')).toMatchObject({ detected: 1, progress: 2 })
  })

  it('counts programming lessons completed in the week', () => {
    checklistRepo.addTask('prog-lesson', 'weekly', SAT)
    const add = (key: string, day: string): void => {
      db.prepare('INSERT INTO prog_progress (lesson_key, completed_at) VALUES (?, ?)').run(
        key,
        `${day} 12:00:00`
      )
    }
    add('go-from-python/a', '2026-07-17') // previous week
    add('go-from-python/b', '2026-07-20') // this week (Mon)
    add('go-from-python/c', FRI) // this week (Fri)
    expect(taskByKey(FRI, 'prog-lesson')).toMatchObject({ detected: 2, progress: 2, done: true })
    // Learned outside the app (a book chapter) → hand credit stacks on top.
    checklistRepo.credit('prog-lesson', 'weekly', FRI)
    expect(taskByKey(FRI, 'prog-lesson').progress).toBe(3)
  })

  it('counts lessons learned in the week', () => {
    checklistRepo.addTask('jp-lesson', 'weekly', SAT)
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
    checklistRepo.addTask('jp-reviews', 'daily', SAT)
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
    checklistRepo.addTask('quiz-round', 'weekly', SAT)
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
    checklistRepo.addTask('manga-chapter', 'daily', SAT)
    const id = addMedia('manga', 'Berserk', { status: 'Plan to Read', progress: 3 })
    checklistRepo.logProgress(id, SAT, MANGA_TASK)
    expect(mediaRow(id)).toEqual({ status: 'Reading', progress: 4 })
    expect(taskByKey(SAT, 'manga-chapter').done).toBe(true)
  })

  it('writes no manga_chapter row — those belong to the scanner', () => {
    checklistRepo.addTask('manga-chapter', 'daily', SAT)
    const id = addMedia('manga', 'Berserk')
    checklistRepo.logProgress(id, SAT, MANGA_TASK)
    expect(
      (db.prepare('SELECT COUNT(*) AS n FROM manga_chapter').get() as { n: number }).n
    ).toBe(0)
  })
})

describe('logging an anime episode', () => {
  beforeEach(() => {
    checklistRepo.addTask('anime-episode', 'daily', SAT)
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

describe('episode tick footprints', () => {
  beforeEach(() => {
    checklistRepo.addTask('anime-episode', 'daily', SAT)
  })

  it('tick, untick, tick nets one episode rather than stacking', () => {
    const id = addMedia('anime', 'Bebop', { status: 'Plan to Watch', progress: 3, totalUnits: 26 })
    const first = checklistRepo.logEpisodeProgress(id, SAT)
    checklistRepo.retractEpisodeProgress(id, first)
    expect(mediaRow(id)).toEqual({ status: 'Plan to Watch', progress: 3 })
    expect(taskByKey(SAT, 'anime-episode').progress).toBe(0)
    checklistRepo.logEpisodeProgress(id, SAT)
    expect(mediaRow(id)).toEqual({ status: 'Watching', progress: 4 })
  })

  it('un-completes a title whose last episode is unticked', () => {
    const id = addMedia('anime', 'Bebop', { status: 'Watching', progress: 25, totalUnits: 26 })
    checklistRepo.retractEpisodeProgress(id, checklistRepo.logEpisodeProgress(id, SAT))
    expect(mediaRow(id)).toEqual({ status: 'Watching', progress: 25 })
  })

  it('steps back one when a later tick has moved the title since', () => {
    const id = addMedia('anime', 'Bebop', { status: 'Watching', progress: 3, totalUnits: 26 })
    const first = checklistRepo.logEpisodeProgress(id, SAT)
    checklistRepo.logEpisodeProgress(id, SAT)
    checklistRepo.retractEpisodeProgress(id, first)
    expect(mediaRow(id)).toEqual({ status: 'Watching', progress: 4 })
    expect(taskByKey(SAT, 'anime-episode').progress).toBe(1)
  })

  it('leaves progress alone when the board already undid the tick', () => {
    const id = addMedia('anime', 'Bebop', { status: 'Watching', progress: 4, totalUnits: 26 })
    const undo = checklistRepo.logEpisodeProgress(id, SAT)
    checklistRepo.undoLog((JSON.parse(undo) as { logId: number }).logId)
    checklistRepo.retractEpisodeProgress(id, undo)
    expect(mediaRow(id)).toEqual({ status: 'Watching', progress: 4 })
  })

  it('undoes only the board credit of a held noRewatch tick', () => {
    const id = addMedia('anime', 'Bebop', { status: 'Completed', progress: 26, totalUnits: 26 })
    const undo = checklistRepo.logEpisodeProgress(id, SAT, { noRewatch: true })
    checklistRepo.retractEpisodeProgress(id, undo)
    expect(mediaRow(id)).toEqual({ status: 'Completed', progress: 26 })
    expect(rewatchCount(id)).toBe(0)
    expect(taskByKey(SAT, 'anime-episode').progress).toBe(0)
  })
})

describe('logging a movie', () => {
  beforeEach(() => {
    checklistRepo.addTask('movie-watch', 'weekly', SAT)
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

describe('ticking by hand', () => {
  it('ticks once per period and unticks back', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    const first = checklistRepo.tick('prog-lesson', 'daily', SAT)
    expect(checklistRepo.tick('prog-lesson', 'daily', SAT)).toBe(first) // clamped at target
    expect(taskByKey(SAT, 'prog-lesson').progress).toBe(1)
    checklistRepo.untick('prog-lesson', 'daily', SAT)
    expect(taskByKey(SAT, 'prog-lesson').done).toBe(false)
  })

  it('refuses to credit a mediaLog item by hand', () => {
    checklistRepo.addTask('anime-episode', 'daily', SAT)
    // Crediting one would show the board done with no episode logged, no
    // media_id, and nothing for undo to restore — logProgress is the only way.
    expect(() => checklistRepo.credit('anime-episode', 'daily', SAT)).toThrow(/picking a title/i)
    expect(() => checklistRepo.tick('anime-episode', 'daily', SAT)).toThrow(/picking a title/i)
    expect(taskByKey(SAT, 'anime-episode').progress).toBe(0)
  })
})

describe('streak & history', () => {
  it('counts consecutive days where every daily item was done', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    backdateTasks('2026-07-01')
    for (const day of [addDays(SAT, -2), FRI, SAT]) {
      checklistRepo.tick('prog-lesson', 'daily', day)
    }
    expect(checklistRepo.status(SAT).streak.current).toBe(3)
  })

  it('breaks on a missed day', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', addDays(SAT, -2))
    checklistRepo.tick('prog-lesson', 'daily', SAT) // yesterday skipped
    const s = checklistRepo.status(SAT)
    expect(s.streak.current).toBe(1)
    expect(s.streak.longest).toBe(1)
  })

  it('only judges a day by the items that existed then', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', FRI)
    checklistRepo.tick('prog-lesson', 'daily', SAT)
    // A second item joins the board today; yesterday stays complete.
    checklistRepo.addTask('game-session', 'daily', SAT)
    db.prepare('UPDATE checklist_task SET created_at = ? WHERE task_key = ?').run(
      `${SAT} 12:00:00`,
      'game-session'
    )
    const s = checklistRepo.status(SAT)
    expect(s.streak.current).toBe(1) // today isn't complete — the game session is untouched
    expect(s.history.find((h) => h.day === FRI)?.count).toBe(1)
    checklistRepo.tick('game-session', 'daily', SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(2)
  })

  it('is empty and safe with no daily items', () => {
    checklistRepo.addTask('movie-watch', 'weekly', SAT)
    const s = checklistRepo.status(SAT)
    expect(s.streak).toEqual({ current: 0, longest: 0 })
    expect(s.history).toEqual([])
  })

  it('mixes detected and logged items in one day verdict', () => {
    checklistRepo.addTask('jp-reviews', 'daily', SAT)
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(0) // reviews target not met
    const cards = Array.from({ length: 20 }, () => addCard())
    for (const c of cards) addReview(c, SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(1)
  })
})

describe('status payload', () => {
  it('reports the board the page renders from', () => {
    checklistRepo.addTask('anime-episode', 'daily', SAT)
    checklistRepo.addTask('jp-reviews', 'daily', SAT)
    checklistRepo.addTask('movie-watch', 'weekly', SAT)
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
    checklistRepo.addTask('anime-episode', 'daily', SAT)
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
    checklistRepo.addTask('movie-watch', 'weekly', SAT)
    const id = addMedia('movie', 'Akira', { status: 'Watched', totalUnits: 117, rewatchCount: 3 })
    const res = checklistRepo.logProgress(id, SAT, MOVIE_TASK)
    expect(res).toMatchObject({ startedRewatch: true, rewatchCount: 4 })
    expect(mediaRow(id)).toEqual({ status: 'Watched', progress: 0 })
  })

  // The TV season toggle back-fills a catalogue rather than reporting a new
  // viewing: it credits the board but must leave a finished show finished.
  it('noRewatch credits the board without wrapping a finished title', () => {
    checklistRepo.addTask('anime-episode', 'daily', SAT)
    const id = addMedia('anime', 'Bebop', { status: 'Completed', progress: 26, totalUnits: 26 })
    const res = checklistRepo.logProgress(id, SAT, ANIME_TASK, { noRewatch: true })
    expect(res.startedRewatch).toBe(false)
    expect(mediaRow(id)).toEqual({ status: 'Completed', progress: 26 })
    expect(rewatchCount(id)).toBe(0)
    // The credit is real, and undoing it leaves the held row alone.
    expect(res.logId).not.toBeNull()
    checklistRepo.undoLog(res.logId!)
    expect(mediaRow(id)).toEqual({ status: 'Completed', progress: 26 })
    expect(rewatchCount(id)).toBe(0)
  })

  it('noRewatch still advances a title that is NOT finished', () => {
    checklistRepo.addTask('anime-episode', 'daily', SAT)
    const id = addMedia('anime', 'Bebop', { status: 'Watching', progress: 4, totalUnits: 26 })
    const res = checklistRepo.logProgress(id, SAT, ANIME_TASK, { noRewatch: true })
    expect(res.startedRewatch).toBe(false)
    expect(mediaRow(id)).toEqual({ status: 'Watching', progress: 5 })
  })
})

// The media detail page's log button calls logProgress with no task in hand.
describe('logging from a media page', () => {
  it('credits the matching board item, preferring daily', () => {
    checklistRepo.addTask('anime-episode', 'weekly', SAT)
    checklistRepo.addTask('anime-episode', 'daily', SAT)
    const id = addMedia('anime', 'Bebop', { totalUnits: 26 })
    const res = checklistRepo.logProgress(id, SAT)
    expect(res.logId).not.toBeNull()
    expect(taskByKey(SAT, 'anime-episode').progress).toBe(1)
    const row = db.prepare('SELECT cadence FROM checklist_log WHERE id = ?').get(res.logId!)
    expect(row).toEqual({ cadence: 'daily' })
  })

  it('still advances the media row when nothing on the board covers the type', () => {
    checklistRepo.addTask('movie-watch', 'weekly', SAT)
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
    const id = checklistRepo.addTask('jp-reviews', 'daily', SAT)
    expect(taskByKey(SAT, 'jp-reviews')).toMatchObject({ target: 20, defaultTarget: 20 })

    checklistRepo.setTarget(id, 5, SAT)
    expect(taskByKey(SAT, 'jp-reviews')).toMatchObject({ target: 5, defaultTarget: 20 })

    const cards = [addCard(), addCard(), addCard(), addCard(), addCard()]
    for (const c of cards) addReview(c, SAT)
    expect(taskByKey(SAT, 'jp-reviews').done).toBe(true) // 5/5 under the override

    checklistRepo.setTarget(id, null, SAT)
    expect(taskByKey(SAT, 'jp-reviews')).toMatchObject({ target: 20, done: false })
  })

  it('ignores a nonsense target', () => {
    const id = checklistRepo.addTask('movie-watch', 'weekly', SAT)
    checklistRepo.setTarget(id, 0, SAT)
    expect(taskByKey(SAT, 'movie-watch').target).toBe(2)
  })

  it('clamps a hand tick at the overridden target', () => {
    const id = checklistRepo.addTask('prog-lesson', 'daily', SAT)
    checklistRepo.setTarget(id, 3, SAT)
    checklistRepo.tick('prog-lesson', 'daily', SAT)
    checklistRepo.tick('prog-lesson', 'daily', SAT)
    const third = checklistRepo.tick('prog-lesson', 'daily', SAT)
    expect(checklistRepo.tick('prog-lesson', 'daily', SAT)).toBe(third)
    expect(taskByKey(SAT, 'prog-lesson')).toMatchObject({ progress: 3, done: true })
  })

  it('is honoured by the streak', () => {
    const id = checklistRepo.addTask('prog-lesson', 'daily', SAT)
    checklistRepo.setTarget(id, 2, SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(0) // 1 of 2
    checklistRepo.tick('prog-lesson', 'daily', SAT)
    expect(checklistRepo.status(SAT).streak.current).toBe(1)
  })
})

describe('reorder', () => {
  it('rewrites the board order and leaves the other cadence alone', () => {
    const a = checklistRepo.addTask('anime-episode', 'daily', SAT)
    const b = checklistRepo.addTask('jp-reviews', 'daily', SAT)
    const c = checklistRepo.addTask('prog-lesson', 'daily', SAT)
    checklistRepo.addTask('movie-watch', 'weekly', SAT)
    expect(checklistRepo.status(SAT).daily.map((t) => t.id)).toEqual([a, b, c])

    checklistRepo.reorder('daily', [c, a, b])
    expect(checklistRepo.status(SAT).daily.map((t) => t.id)).toEqual([c, a, b])
    expect(checklistRepo.status(SAT).weekly).toHaveLength(1)
  })

  it('ignores ids from another cadence', () => {
    const a = checklistRepo.addTask('anime-episode', 'daily', SAT)
    const w = checklistRepo.addTask('movie-watch', 'weekly', SAT)
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

// ---------------------------------------------------------------------------
// The 2026-10 revamp: rule history, schedules, skips, past days, amounts, new
// built-in items, reading sessions and custom items.
// ---------------------------------------------------------------------------

const THU = '2026-07-23'
const MON = '2026-07-27'

function dayStateOf(today: string, day: string) {
  return checklistRepo.status(today, day).weekDays.find((c) => c.day === day)?.state
}

describe('rule history', () => {
  it('removing an item never turns a missed day into a complete one', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    const game = checklistRepo.addTask('game-session', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', FRI)
    checklistRepo.tick('prog-lesson', 'daily', SAT)
    expect(dayStateOf(SAT, FRI)).toBe('missed') // no game session on Friday
    checklistRepo.removeTask(game, SAT)
    expect(dayStateOf(SAT, FRI)).toBe('missed')
    expect(dayStateOf(SAT, SAT)).toBe('done') // gone from today on
    expect(checklistRepo.status(SAT).streak.current).toBe(1)
  })

  it('applies a new target from today, keeping the old one for earlier days', () => {
    const id = checklistRepo.addTask('prog-lesson', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', FRI)
    checklistRepo.setTarget(id, 2, SAT)
    expect(dayStateOf(SAT, FRI)).toBe('done') // judged by the target it had then
    expect(checklistRepo.status(SAT, FRI).daily[0].target).toBe(1)
    expect(checklistRepo.status(SAT).daily[0].target).toBe(2)
  })

  it('re-adding a removed item keeps its id and history', () => {
    const id = checklistRepo.addTask('prog-lesson', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', FRI)
    checklistRepo.removeTask(id, SAT)
    expect(checklistRepo.addTask('prog-lesson', 'daily', SAT)).toBe(id)
    expect(checklistRepo.status(SAT).history.find((h) => h.day === FRI)?.count).toBe(1)
  })
})

describe('weekday schedules', () => {
  const MON_ONLY = 1 << 1

  it('is not due off its days, and off days bridge the streak', () => {
    const id = checklistRepo.addTask('prog-lesson', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', THU)
    checklistRepo.tick('prog-lesson', 'daily', FRI)
    checklistRepo.setDays(id, MON_ONLY, SAT)
    const s = checklistRepo.status(SAT)
    expect(s.daily[0]).toMatchObject({ due: false, state: 'off', days: MON_ONLY })
    expect(s.summary).toEqual({ done: 0, due: 0 })
    expect(s.streak.current).toBe(2) // Thursday and Friday, today is off
    // Monday is due and still open.
    expect(checklistRepo.status(MON).daily[0]).toMatchObject({ due: true, state: 'pending' })
  })

  it('refuses a schedule on a weekly item', () => {
    const id = checklistRepo.addTask('movie-watch', 'weekly', SAT)
    expect(() => checklistRepo.setDays(id, MON_ONLY, SAT)).toThrow(/daily/)
  })
})

describe('skips', () => {
  it('a rest day neither completes nor breaks the streak', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', THU)
    checklistRepo.skip(null, 'daily', true, SAT, FRI)
    checklistRepo.tick('prog-lesson', 'daily', SAT)
    const s = checklistRepo.status(SAT)
    expect(s.streak.current).toBe(2)
    expect(s.history.find((h) => h.day === FRI)).toMatchObject({ skipped: true, count: 0 })
    expect(checklistRepo.status(SAT, FRI).restDay).toBe(true)

    checklistRepo.skip(null, 'daily', false, SAT, FRI)
    expect(checklistRepo.status(SAT).streak.current).toBe(1)
  })

  it('skipping one item leaves it out of the day verdict', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    const game = checklistRepo.addTask('game-session', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', SAT)
    expect(checklistRepo.status(SAT).summary).toEqual({ done: 1, due: 2 })
    checklistRepo.skip(game, 'daily', true, SAT)
    const s = checklistRepo.status(SAT)
    expect(s.summary).toEqual({ done: 1, due: 1 })
    expect(s.daily.find((t) => t.id === game)).toMatchObject({ skipped: true, state: 'skipped' })
    expect(s.streak.current).toBe(1)
  })

  it('skips a weekly item for its whole week', () => {
    const id = checklistRepo.addTask('movie-watch', 'weekly', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.skip(id, 'weekly', true, FRI, THU)
    expect(taskByKey(FRI, 'movie-watch')).toMatchObject({ skipped: true, state: 'skipped' })
    expect(taskByKey(SAT, 'movie-watch').skipped).toBe(false) // a new week
  })

  it('judges a skip by the row, so a stale cadence or a vanished item cannot write an orphan', () => {
    const id = checklistRepo.addTask('movie-watch', 'weekly', SAT)
    backdateTasks('2026-07-01')
    // A board that still thinks the item is daily: the weekly row rules.
    checklistRepo.skip(id, 'daily', true, FRI, THU)
    expect(taskByKey(FRI, 'movie-watch')).toMatchObject({ skipped: true, state: 'skipped' })
    expect(db.prepare('SELECT cadence FROM checklist_skip WHERE task_id = ?').all(id)).toEqual([
      { cadence: 'weekly' }
    ])
    checklistRepo.skip(id, 'daily', false, FRI, THU)
    expect(taskByKey(FRI, 'movie-watch').skipped).toBe(false)
    expect(() => checklistRepo.skip(id + 99, 'daily', true, FRI)).toThrow(/no longer exists/)
    expect(db.prepare('SELECT COUNT(*) AS n FROM checklist_skip').get()).toEqual({ n: 0 })
  })
})

describe('past days', () => {
  it('ticks and credits an earlier day without touching today', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    checklistRepo.tick('prog-lesson', 'daily', SAT, FRI)
    expect(checklistRepo.status(SAT, FRI).daily[0]).toMatchObject({ progress: 1, done: true })
    expect(checklistRepo.status(SAT).daily[0].progress).toBe(0)
    checklistRepo.untick('prog-lesson', 'daily', SAT, FRI)
    expect(checklistRepo.status(SAT, FRI).daily[0].progress).toBe(0)
  })

  it('logs a title against an earlier day while moving the title now', () => {
    checklistRepo.addTask('anime-episode', 'daily', SAT)
    const id = addMedia('anime', 'Frieren', { status: 'Watching', progress: 3, totalUnits: 28 })
    checklistRepo.logProgress(id, SAT, ANIME_TASK, { day: FRI })
    expect(mediaRow(id).progress).toBe(4)
    expect(checklistRepo.status(SAT, FRI).daily[0].entries.map((e) => e.title)).toEqual(['Frieren'])
    expect(checklistRepo.status(SAT).daily[0].entries).toEqual([])
  })

  it('refuses a future day or one past the editable window', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    expect(() => checklistRepo.tick('prog-lesson', 'daily', SAT, MON)).toThrow()
    expect(() => checklistRepo.tick('prog-lesson', 'daily', SAT, addDays(SAT, -364))).toThrow()
    expect(() => checklistRepo.tick('prog-lesson', 'daily', SAT, 'yesterday')).toThrow()
  })

  it('shows today when asked for a day it cannot show', () => {
    expect(checklistRepo.status(SAT, MON).day).toBe(SAT)
    expect(checklistRepo.status(SAT, 'nonsense').day).toBe(SAT)
    expect(checklistRepo.status(SAT, FRI)).toMatchObject({ day: FRI, today: SAT })
  })
})

describe('amounts', () => {
  it('adds minutes on top of detected play time', () => {
    checklistRepo.addTask('game-minutes', 'daily', SAT)
    const gameId = addMedia('game', 'Persona 5')
    db.prepare(
      `INSERT INTO game_session (media_id, started_at, ended_at, duration) VALUES (?, ?, ?, ?)`
    ).run(gameId, `${SAT} 10:00:00`, `${SAT} 10:20:00`, 20 * 60 + 59)
    expect(taskByKey(SAT, 'game-minutes')).toMatchObject({
      detected: 20,
      credited: 0,
      unit: 'min',
      target: 30,
      done: false
    })
    checklistRepo.credit('game-minutes', 'daily', SAT, 15)
    expect(taskByKey(SAT, 'game-minutes')).toMatchObject({ credited: 15, progress: 35, done: true })
    expect(taskByKey(SAT, 'game-minutes').entries[0].amount).toBe(15)
  })

  it('rejects a nonsense amount', () => {
    checklistRepo.addTask('quiz-round', 'weekly', SAT)
    expect(() => checklistRepo.credit('quiz-round', 'weekly', SAT, 0)).toThrow()
    expect(() => checklistRepo.credit('quiz-round', 'weekly', SAT, Number.NaN)).toThrow()
  })
})

describe('new detected items', () => {
  const quiz = (kind: string, day: string): void => {
    db.prepare('INSERT INTO quiz_session (kind, score, total, played_at) VALUES (?, 1, 1, ?)').run(
      kind,
      `${day} 12:00:00`
    )
  }

  it('splits Japanese and English drills out of quiz rounds', () => {
    checklistRepo.addTask('jp-drill', 'daily', SAT)
    checklistRepo.addTask('en-drill', 'daily', SAT)
    checklistRepo.addTask('quiz-round', 'weekly', SAT)
    quiz('kana', SAT)
    quiz('englishCloze', SAT)
    quiz('englishVocab', SAT)
    quiz('song', SAT)
    expect(taskByKey(SAT, 'jp-drill').detected).toBe(1)
    expect(taskByKey(SAT, 'en-drill').detected).toBe(2)
    expect(taskByKey(SAT, 'quiz-round').detected).toBe(4)
  })

  it('counts finished tutor days, writing and first solves', () => {
    checklistRepo.addTask('jp-tutor-day', 'daily', SAT)
    checklistRepo.addTask('en-writing', 'weekly', SAT)
    checklistRepo.addTask('prog-exercise', 'weekly', SAT)
    db.prepare(
      `INSERT INTO jp_tutor_day (day, phase_id, started_at, ended_at, planned_minutes,
         completed_minutes, completed_blocks, total_blocks, tomorrow_focus, tasks_json)
       VALUES (?, 'p1', ?, ?, 30, 30, 3, 3, 'kana', '[]')`
    ).run(SAT, `${SAT} 09:00:00`, `${SAT} 09:30:00`)
    db.prepare(
      `INSERT INTO en_writing (prompt_key, prompt_title, submission, feedback, created_at)
       VALUES ('p', 'Prompt', 'text', 'ok', ?)`
    ).run(`${MON} 12:00:00`)
    for (const [key, day] of [['a', SAT], ['b', MON], ['c', '2026-07-24']]) {
      db.prepare("INSERT INTO prog_solve (kind, key, solved_at) VALUES ('sql', ?, ?)").run(
        key,
        `${day} 12:00:00`
      )
    }
    expect(taskByKey(SAT, 'jp-tutor-day')).toMatchObject({ detected: 1, done: true })
    expect(taskByKey(MON, 'en-writing')).toMatchObject({ detected: 1, done: true })
    // Saturday and Monday share a week; Friday the 24th belongs to the one before.
    expect(taskByKey(MON, 'prog-exercise')).toMatchObject({ detected: 2, target: 3, done: false })
  })
})

describe('reading sessions', () => {
  const BOOK_TASK = { key: 'book-session', cadence: 'daily' as const }

  it('starts a planned book without finishing it, and undo restores the status', () => {
    checklistRepo.addTask('book-session', 'daily', SAT)
    const id = addMedia('book', 'Dune', { status: 'Plan to Read', progress: 120, totalUnits: 600 })
    const res = checklistRepo.logSession(BOOK_TASK.key, BOOK_TASK.cadence, id, SAT)
    expect(res).toMatchObject({ title: 'Dune', status: 'Reading' })
    expect(mediaRow(id)).toEqual({ status: 'Reading', progress: 120 })
    expect(taskByKey(SAT, 'book-session')).toMatchObject({ done: true, kind: 'mediaSession' })
    checklistRepo.undoLog(res.logId)
    expect(mediaRow(id)).toEqual({ status: 'Plan to Read', progress: 120 })
  })

  it('leaves a finished visual novel finished', () => {
    checklistRepo.addTask('vn-session', 'daily', SAT)
    const id = addMedia('visual_novel', 'Steins;Gate', { status: 'Completed' })
    const res = checklistRepo.logSession('vn-session', 'daily', id, SAT)
    expect(res.status).toBe('Completed')
    checklistRepo.undoLog(res.logId)
    expect(mediaRow(id).status).toBe('Completed')
  })

  it('refuses the wrong type, a mediaLog item and a hand credit', () => {
    checklistRepo.addTask('book-session', 'daily', SAT)
    const anime = addMedia('anime', 'Frieren')
    expect(() => checklistRepo.logSession('book-session', 'daily', anime, SAT)).toThrow()
    expect(() => checklistRepo.logSession('anime-episode', 'daily', anime, SAT)).toThrow()
    expect(() => checklistRepo.credit('book-session', 'daily', SAT)).toThrow(/picking a title/i)
  })
})

describe('custom items', () => {
  it('creates a counter with a unit and a schedule, then edits and deletes it', () => {
    const MON_WED = (1 << 1) | (1 << 3)
    const taskId = checklistRepo.createCustom(
      { label: '  Workout  ', unit: 'sets', target: 3, note: 'Knees' },
      'daily',
      MON_WED,
      SAT
    )
    const task = checklistRepo.status(MON).daily.find((t) => t.id === taskId)!
    expect(task).toMatchObject({
      label: 'Workout',
      unit: 'sets',
      note: 'Knees',
      target: 3,
      kind: 'manual',
      days: MON_WED,
      due: true
    })
    expect(task.key).toBe(`custom-${task.customId}`)

    checklistRepo.credit(task.key, 'daily', MON, 2)
    checklistRepo.updateCustom(task.customId!, { label: 'Gym', unit: null, note: null })
    expect(checklistRepo.status(MON).daily[0]).toMatchObject({ label: 'Gym', unit: null, progress: 2 })

    checklistRepo.deleteCustom(task.customId!)
    expect(checklistRepo.status(MON).daily).toEqual([])
    expect(db.prepare('SELECT COUNT(*) AS n FROM checklist_log').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM checklist_task').get()).toEqual({ n: 0 })
  })

  it('needs a name and keeps a weekly item unscheduled', () => {
    expect(() =>
      checklistRepo.createCustom({ label: '  ', unit: null, target: 1, note: null }, 'daily', null, SAT)
    ).toThrow(/name/)
    const id = checklistRepo.createCustom(
      { label: 'Call home', unit: null, target: 0, note: null },
      'weekly',
      1 << 1,
      SAT
    )
    expect(checklistRepo.status(SAT).weekly.find((t) => t.id === id)).toMatchObject({
      target: 1,
      days: null
    })
  })
})

describe('per-item stats', () => {
  it('streaks, rates and a week strip for each item', () => {
    checklistRepo.addTask('prog-lesson', 'daily', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('prog-lesson', 'daily', '2026-07-21')
    checklistRepo.tick('prog-lesson', 'daily', THU)
    checklistRepo.tick('prog-lesson', 'daily', FRI)
    const task = checklistRepo.status(SAT).daily[0]
    expect(task.streak).toEqual({ current: 2, longest: 2 })
    // 24 judged days from the 1st to Friday, 3 done; today is still pending.
    expect(task.rate).toEqual({ done: 3, due: 24 })
    expect(task.strip.map((s) => s.state)).toEqual([
      'pending', 'future', 'future', 'future', 'future', 'future', 'future'
    ])
    expect(checklistRepo.status(SAT).weekDays).toHaveLength(7)
  })

  it('counts a weekly item in weeks', () => {
    checklistRepo.addTask('quiz-round', 'weekly', SAT)
    backdateTasks('2026-07-01')
    checklistRepo.tick('quiz-round', 'weekly', '2026-07-14')
    checklistRepo.tick('quiz-round', 'weekly', '2026-07-20')
    const task = taskByKey(SAT, 'quiz-round')
    expect(task.streak.current).toBe(2)
    expect(task.strip).toHaveLength(7)
    expect(task.strip[6]).toEqual({ period: SAT, state: 'pending' })
  })
})

describe('suggestions', () => {
  it('offers what was logged last and what is in progress, never a finished title', () => {
    checklistRepo.addTask('anime-episode', 'daily', SAT)
    const a = addMedia('anime', 'Frieren', { status: 'Watching', progress: 3, totalUnits: 28 })
    const b = addMedia('anime', 'Done', { status: 'Watching', progress: 11, totalUnits: 12 })
    addMedia('anime', 'Mid', { status: 'Watching', progress: 1 })
    checklistRepo.logProgress(b, SAT, ANIME_TASK) // finishes it
    checklistRepo.logProgress(a, SAT, ANIME_TASK)
    const titles = taskByKey(SAT, 'anime-episode').suggestions.map((s) => s.title)
    expect(titles[0]).toBe('Frieren')
    expect(titles).toContain('Mid')
    expect(titles).not.toContain('Done')
    expect(taskByKey(SAT, 'movie-watch' as string)).toBeUndefined()
  })

  it('has none for films', () => {
    checklistRepo.addTask('movie-watch', 'weekly', SAT)
    addMedia('movie', 'Heat', { status: 'Want to Watch' })
    expect(taskByKey(SAT, 'movie-watch').suggestions).toEqual([])
  })
})

describe('media-page credit routing', () => {
  it('prefers an item due today over one off its schedule', () => {
    const daily = checklistRepo.addTask('anime-episode', 'daily', SAT)
    checklistRepo.addTask('anime-episode', 'weekly', SAT)
    checklistRepo.setDays(daily, 1 << 1, SAT) // Mondays only
    const id = addMedia('anime', 'Frieren', { status: 'Watching', progress: 1, totalUnits: 28 })
    checklistRepo.logProgress(id, SAT)
    expect(taskByKey(SAT, 'anime-episode')).toMatchObject({ cadence: 'daily', progress: 0 })
    expect(checklistRepo.status(SAT).weekly[0].progress).toBe(1)
  })
})
