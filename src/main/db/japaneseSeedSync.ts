import { createHash } from 'crypto'
import type Database from 'better-sqlite3'
import type { SeedCard, SeedCourse, SeedLesson } from './japaneseSeed'
import { SEED_VERSION_KEY } from './japaneseSeedVersion'

// Keeps the built-in Japanese courses in step with the seed definitions.
//
// seedPack() inserts a pack once; before this module nothing could ever reach
// a library that already had it, so a corrected reading or a new lesson only
// helped fresh installs. Every seeded row now carries a frozen `seed_key` and
// a `seed_hash` — the hash of the seed content last written to it. The sync
// rewrites a row only while its current content still hashes to `seed_hash`,
// i.e. the user has not edited it; an edited row is left alone for good (until
// the seed happens to converge on the user's own text). Deletions the user
// makes are recorded in jp_seed_tombstone so a sync never brings them back.
// SRS state is never touched: updates write content columns only, and a row
// is removed only while unedited and never reviewed.

export interface SeedPack {
  flag: string
  key: string
  course: SeedCourse
}

export const SEED_KEYS_FLAG = 'japanese.seeded.keys'
export { SEED_VERSION_KEY }

export function cardSeedKey(lessonKey: string, card: Pick<SeedCard, 'key' | 'front'>): string {
  return `${lessonKey}/${card.key ?? card.front}`
}

function digest(values: unknown[]): string {
  return createHash('sha1').update(JSON.stringify(values)).digest('hex')
}

const n = (v: unknown): unknown => (v === undefined || v === '' ? null : v)

// Each hash covers exactly the columns the user can edit for that row, in one
// fixed order, so a seed object and a database row hash identically.
export function courseHash(c: {
  title: string
  description?: string | null
  level?: string | null
  difficulty?: number | null
}): string {
  return digest([c.title, n(c.description), n(c.level), n(c.difficulty)])
}

export function lessonHash(l: { title: string; body?: string | null }): string {
  return digest([l.title, n(l.body)])
}

interface CardFields {
  front: string
  reading?: string | null
  back: string
  pos?: string | null
  notes?: string | null
  onyomi?: string | null
  kunyomi?: string | null
  exampleJp?: string | null
  exampleReading?: string | null
  exampleEn?: string | null
}

export function cardHash(c: CardFields): string {
  return digest([
    c.front,
    n(c.reading),
    c.back,
    n(c.pos),
    n(c.notes),
    n(c.onyomi),
    n(c.kunyomi),
    n(c.exampleJp),
    n(c.exampleReading),
    n(c.exampleEn)
  ])
}

// Hash of the whole seed, stored after a sync so an unchanged seed costs one
// settings read per launch. tests/japaneseSeedSync.test.ts pins SEED_VERSION to it.
export function seedContentHash(packs: SeedPack[]): string {
  return digest(packs.map((p) => [p.flag, p.key, p.course]))
}

interface CourseRow {
  id: number
  title: string
  description: string | null
  level: string | null
  difficulty: number | null
  seed_key: string | null
  seed_hash: string | null
}

interface LessonRow {
  id: number
  kind: string
  title: string
  body: string | null
  sort_order: number
  learned: number
  seed_key: string | null
  seed_hash: string | null
}

interface CardRow {
  id: number
  sort_order: number
  front: string
  reading: string | null
  back: string
  pos: string | null
  notes: string | null
  onyomi: string | null
  kunyomi: string | null
  example_jp: string | null
  example_reading: string | null
  example_en: string | null
  reps: number
  status: string
  source_media_id: number | null
  audio_path: string | null
  image_path: string | null
  seed_key: string | null
  seed_hash: string | null
}

function rowCardHash(r: CardRow): string {
  return cardHash({
    front: r.front,
    reading: r.reading,
    back: r.back,
    pos: r.pos,
    notes: r.notes,
    onyomi: r.onyomi,
    kunyomi: r.kunyomi,
    exampleJp: r.example_jp,
    exampleReading: r.example_reading,
    exampleEn: r.example_en
  })
}

function seedCardValues(card: SeedCard): unknown[] {
  return [
    card.front,
    card.reading ?? null,
    card.back,
    card.pos ?? null,
    card.notes ?? null,
    card.onyomi ?? null,
    card.kunyomi ?? null,
    card.exampleJp ?? null,
    card.exampleReading ?? null,
    card.exampleEn ?? null
  ]
}

function hasFlag(sqlite: Database.Database, key: string): boolean {
  return !!sqlite.prepare('SELECT 1 FROM settings WHERE key = ?').get(key)
}

function statements(sqlite: Database.Database) {
  return {
    insertLesson: sqlite.prepare(
      `INSERT INTO jp_lesson (course_id, kind, title, body, sort_order, seed_key, seed_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ),
    insertCard: sqlite.prepare(
      `INSERT INTO jp_card (lesson_id, sort_order, front, reading, back, pos, notes,
                            onyomi, kunyomi, example_jp, example_reading, example_en,
                            seed_key, seed_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
  }
}

// Inserts a whole course with its keys and hashes. Used by seedPack for a pack
// the library has never had.
export function insertSeedCourse(sqlite: Database.Database, pack: SeedPack): void {
  const { course } = pack
  const st = statements(sqlite)
  const next = (
    sqlite.prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_course').get() as {
      next: number
    }
  ).next
  const courseId = Number(
    sqlite
      .prepare(
        `INSERT INTO jp_course (title, description, level, difficulty, sort_order, seed_key, seed_hash)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        course.title,
        course.description,
        course.level,
        course.difficulty,
        next,
        pack.key,
        courseHash(course)
      ).lastInsertRowid
  )
  course.lessons.forEach((lesson, li) => insertLesson(st, courseId, lesson, li))
}

function insertLesson(
  st: ReturnType<typeof statements>,
  courseId: number,
  lesson: SeedLesson,
  sortOrder: number
): void {
  const lessonId = Number(
    st.insertLesson.run(
      courseId,
      lesson.kind,
      lesson.title,
      lesson.body ?? null,
      sortOrder,
      lesson.key,
      lessonHash(lesson)
    ).lastInsertRowid
  )
  lesson.cards.forEach((card, ci) => {
    st.insertCard.run(
      lessonId,
      ci,
      ...seedCardValues(card),
      cardSeedKey(lesson.key, card),
      cardHash(card)
    )
  })
}

// ---- One-time backfill: give rows seeded before keys existed their keys ----

// The unkeyed course a pack seeded: by its current or former title, else (a
// course the user renamed) the one holding most of the pack's lesson titles.
function findLegacyCourse(
  sqlite: Database.Database,
  course: SeedCourse
): CourseRow | undefined {
  const rows = sqlite
    .prepare('SELECT * FROM jp_course WHERE seed_key IS NULL ORDER BY id')
    .all() as CourseRow[]
  const titles = [course.title, ...(course.formerTitles ?? [])]
  const byTitle = rows.find((r) => titles.includes(r.title))
  if (byTitle) return byTitle
  const seedTitles = new Set(course.lessons.flatMap((l) => [l.title, ...(l.formerTitles ?? [])]))
  const lessonTitles = sqlite.prepare('SELECT title FROM jp_lesson WHERE course_id = ?')
  let best: { row: CourseRow; score: number } | null = null
  for (const row of rows) {
    const score = (lessonTitles.all(row.id) as { title: string }[]).filter((l) =>
      seedTitles.has(l.title)
    ).length
    if (score > (best?.score ?? 0)) best = { row, score }
  }
  return best && best.score * 2 >= course.lessons.length ? best.row : undefined
}

// Matches each flagged pack's rows one-to-one by title chain and front. A
// row's hash is trusted only when it equals today's seed exactly: a mismatch
// may be a user edit OR an older seed text, and the two are indistinguishable,
// so it is stored as NULL (never auto-updated) rather than risk an overwrite.
// Seed lessons/cards with no matching row were deleted by the user OR added to
// the pack after this library seeded it — also indistinguishable — so they
// get a 'backfill' tombstone: kept out like a deletion, but listed in Settings
// ("Built-in course updates"), where restoring brings them in.
export function backfillSeedKeys(sqlite: Database.Database, packs: SeedPack[]): void {
  if (hasFlag(sqlite, SEED_KEYS_FLAG)) return
  const tombstone = sqlite.prepare(
    "INSERT OR IGNORE INTO jp_seed_tombstone (seed_key, source) VALUES (?, 'backfill')"
  )
  const stampCourse = sqlite.prepare('UPDATE jp_course SET seed_key = ?, seed_hash = ? WHERE id = ?')
  const stampLesson = sqlite.prepare('UPDATE jp_lesson SET seed_key = ?, seed_hash = ? WHERE id = ?')
  const stampCard = sqlite.prepare('UPDATE jp_card SET seed_key = ?, seed_hash = ? WHERE id = ?')
  const selectLessons = sqlite.prepare(
    'SELECT * FROM jp_lesson WHERE course_id = ? AND seed_key IS NULL ORDER BY sort_order, id'
  )
  const selectCards = sqlite.prepare(
    'SELECT * FROM jp_card WHERE lesson_id = ? AND seed_key IS NULL ORDER BY sort_order, id'
  )

  const tx = sqlite.transaction(() => {
    for (const pack of packs) {
      if (!hasFlag(sqlite, pack.flag)) continue
      const { course } = pack
      const courseRow = findLegacyCourse(sqlite, course)
      if (!courseRow) continue // deleted course: never synced again
      // A row still carrying a former title is the older seed, not an edit:
      // storing its own hash marks it unedited, so the sync renames it.
      const titles = [course.title, ...(course.formerTitles ?? [])]
      const courseNow = courseHash(courseRow)
      const courseTrusted = titles.some((title) => courseNow === courseHash({ ...course, title }))
      stampCourse.run(pack.key, courseTrusted ? courseNow : null, courseRow.id)

      const lessonRows = selectLessons.all(courseRow.id) as LessonRow[]
      const claimedLessons = new Set<number>()
      for (const lesson of course.lessons) {
        const lessonTitles = [lesson.title, ...(lesson.formerTitles ?? [])]
        const row = lessonRows.find(
          (r) => !claimedLessons.has(r.id) && r.kind === lesson.kind && lessonTitles.includes(r.title)
        )
        if (!row) {
          tombstone.run(lesson.key)
          continue
        }
        claimedLessons.add(row.id)
        const lessonNow = lessonHash(row)
        const lessonTrusted = lessonTitles.some(
          (title) => lessonNow === lessonHash({ ...lesson, title })
        )
        stampLesson.run(lesson.key, lessonTrusted ? lessonNow : null, row.id)

        const cardRows = selectCards.all(row.id) as CardRow[]
        const claimedCards = new Set<number>()
        for (const card of lesson.cards) {
          const fronts = [card.front, card.key].filter((f): f is string => !!f)
          const cardRow = cardRows.find((r) => !claimedCards.has(r.id) && fronts.includes(r.front))
          const key = cardSeedKey(lesson.key, card)
          if (!cardRow) {
            tombstone.run(key)
            continue
          }
          claimedCards.add(cardRow.id)
          const cw = cardHash(card)
          stampCard.run(key, rowCardHash(cardRow) === cw ? cw : null, cardRow.id)
        }
      }
    }
    sqlite.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(SEED_KEYS_FLAG, '1')
  })
  tx()
}

// The backfill matches a pack's lessons only inside that pack's own course, so
// a lesson the seed later moved to another built-in course (ものの, n1a.01 → N2
// Grammar II) was left unkeyed where it sat and its key tombstoned. Restoring
// would then insert a second copy. This finishes the match: an unkeyed lesson
// in a built-in course whose kind and title (or a former title) match a
// backfill-tombstoned seed lesson that today's seed keeps in a DIFFERENT
// built-in course adopts that key, with a NULL hash, and the tombstone is
// lifted, so the sync's cross-course move takes it with its progress. Its
// cards are matched by front (or `key`) as the backfill does: a card equal to
// today's seed is trusted, any other gets a NULL hash, and seed cards with no
// row get a 'backfill' tombstone. Only a one-to-one match adopts; anything
// ambiguous stays unkeyed and keeps the banner. Runs on every seed run (it
// also serves libraries whose backfill ran before this existed); a no-op once
// nothing matches. Returns the number of lessons adopted.
export function adoptMovedLessons(sqlite: Database.Database, packs: SeedPack[]): number {
  const tombstoned = new Set(
    (
      sqlite.prepare("SELECT seed_key FROM jp_seed_tombstone WHERE source = 'backfill'").all() as {
        seed_key: string
      }[]
    ).map((r) => r.seed_key)
  )
  const seedLessons = packs.flatMap((pack) =>
    pack.course.lessons.filter((l) => tombstoned.has(l.key)).map((lesson) => ({ pack, lesson }))
  )
  if (!seedLessons.length) return 0
  const unkeyed = sqlite
    .prepare(
      `SELECT l.*, c.seed_key AS course_key FROM jp_lesson l JOIN jp_course c ON c.id = l.course_id
       WHERE c.seed_key IS NOT NULL AND l.seed_key IS NULL`
    )
    .all() as (LessonRow & { course_key: string })[]
  if (!unkeyed.length) return 0

  const matches = (row: LessonRow & { course_key: string }, s: (typeof seedLessons)[number]) =>
    row.course_key !== s.pack.key &&
    row.kind === s.lesson.kind &&
    [s.lesson.title, ...(s.lesson.formerTitles ?? [])].includes(row.title)
  const stampLesson = sqlite.prepare('UPDATE jp_lesson SET seed_key = ?, seed_hash = ? WHERE id = ?')
  const stampCard = sqlite.prepare('UPDATE jp_card SET seed_key = ?, seed_hash = ? WHERE id = ?')
  const lift = sqlite.prepare("DELETE FROM jp_seed_tombstone WHERE seed_key = ? AND source = 'backfill'")
  const tombstone = sqlite.prepare(
    "INSERT OR IGNORE INTO jp_seed_tombstone (seed_key, source) VALUES (?, 'backfill')"
  )
  const selectCards = sqlite.prepare(
    'SELECT * FROM jp_card WHERE lesson_id = ? AND seed_key IS NULL ORDER BY sort_order, id'
  )
  let adopted = 0
  sqlite.transaction(() => {
    for (const s of seedLessons) {
      const rows = unkeyed.filter((row) => matches(row, s))
      if (rows.length !== 1) continue
      const row = rows[0]
      // The row must not also fit another tombstoned seed lesson.
      if (seedLessons.filter((other) => matches(row, other)).length !== 1) continue
      const cardRows = selectCards.all(row.id) as CardRow[]
      // A title alone is not identity: the user's own lesson can share one with
      // a seed lesson they deleted elsewhere. Adopt only when the row holds at
      // least half of the seed lesson's cards, as the moved seed row does.
      const rowFronts = new Set(cardRows.map((r) => r.front))
      const shared = s.lesson.cards.filter((c) => rowFronts.has(c.front) || (!!c.key && rowFronts.has(c.key)))
      if (shared.length * 2 < s.lesson.cards.length) continue
      stampLesson.run(s.lesson.key, null, row.id)
      lift.run(s.lesson.key)
      const claimed = new Set<number>()
      for (const card of s.lesson.cards) {
        const fronts = [card.front, card.key].filter((f): f is string => !!f)
        const cardRow = cardRows.find((r) => !claimed.has(r.id) && fronts.includes(r.front))
        const key = cardSeedKey(s.lesson.key, card)
        if (!cardRow) {
          tombstone.run(key)
          continue
        }
        claimed.add(cardRow.id)
        const want = cardHash(card)
        stampCard.run(key, rowCardHash(cardRow) === want ? want : null, cardRow.id)
      }
      adopted++
    }
  })()
  return adopted
}

// ---- The sync ----

export interface SeedSyncReport {
  updated: number
  inserted: number
  removed: number
  // Courses whose lessons were put back in the seed's order.
  reordered: number
}

// A dropped seed row may be deleted only while nothing personal hangs off it:
// unedited, never reviewed (a reset card keeps its jp_review_log rows, which a
// delete would cascade away), and no mined audio/frame/source attached.
function cardDisposable(sqlite: Database.Database, c: CardRow): boolean {
  return (
    c.seed_key !== null &&
    c.seed_hash !== null &&
    rowCardHash(c) === c.seed_hash &&
    c.reps === 0 &&
    c.status === 'new' &&
    c.audio_path === null &&
    c.image_path === null &&
    c.source_media_id === null &&
    !sqlite.prepare('SELECT 1 FROM jp_review_log WHERE card_id = ? LIMIT 1').get(c.id)
  )
}

export function syncSeedContent(
  sqlite: Database.Database,
  packs: SeedPack[],
  version: string
): SeedSyncReport | null {
  const stamp = sqlite.prepare('SELECT value FROM settings WHERE key = ?').get(SEED_VERSION_KEY) as
    | { value: string }
    | undefined
  if (stamp?.value === version) return null

  const report: SeedSyncReport = { updated: 0, inserted: 0, removed: 0, reordered: 0 }
  const st = statements(sqlite)
  const tombstoned = new Set(
    (sqlite.prepare('SELECT seed_key FROM jp_seed_tombstone').all() as { seed_key: string }[]).map(
      (r) => r.seed_key
    )
  )
  const selectCourse = sqlite.prepare('SELECT * FROM jp_course WHERE seed_key = ? ORDER BY id LIMIT 1')
  const selectLessons = sqlite.prepare(
    'SELECT * FROM jp_lesson WHERE course_id = ? AND seed_key IS NOT NULL'
  )
  const selectSeedCards = sqlite.prepare(
    'SELECT * FROM jp_card WHERE lesson_id = ? AND seed_key IS NOT NULL'
  )
  const selectAllCards = sqlite.prepare('SELECT * FROM jp_card WHERE lesson_id = ?')
  // A lesson the seed moved to another built-in course is found by key in its
  // old course and moved with its cards and progress — never deleted there and
  // re-inserted here.
  const selectLessonAnywhere = sqlite.prepare(
    `SELECT l.* FROM jp_lesson l JOIN jp_course c ON c.id = l.course_id
     WHERE l.seed_key = ? AND c.seed_key IS NOT NULL ORDER BY l.id LIMIT 1`
  )
  const moveLesson = sqlite.prepare('UPDATE jp_lesson SET course_id = ?, sort_order = ? WHERE id = ?')
  const allSeedLessonKeys = new Set(packs.flatMap((p) => p.course.lessons.map((l) => l.key)))
  const deleteLesson = sqlite.prepare('DELETE FROM jp_lesson WHERE id = ?')
  const deleteCard = sqlite.prepare('DELETE FROM jp_card WHERE id = ?')
  const updateCourse = sqlite.prepare(
    `UPDATE jp_course SET title = ?, description = ?, level = ?, difficulty = ?, seed_hash = ?,
       updated_at = datetime('now') WHERE id = ?`
  )
  const updateLesson = sqlite.prepare(
    `UPDATE jp_lesson SET title = ?, body = ?, seed_hash = ?, updated_at = datetime('now') WHERE id = ?`
  )
  const updateCard = sqlite.prepare(
    `UPDATE jp_card SET front = ?, reading = ?, back = ?, pos = ?, notes = ?, onyomi = ?,
       kunyomi = ?, example_jp = ?, example_reading = ?, example_en = ?, seed_hash = ?,
       updated_at = datetime('now') WHERE id = ?`
  )
  const setHash = {
    course: sqlite.prepare('UPDATE jp_course SET seed_hash = ? WHERE id = ?'),
    lesson: sqlite.prepare('UPDATE jp_lesson SET seed_hash = ? WHERE id = ?'),
    card: sqlite.prepare('UPDATE jp_card SET seed_hash = ? WHERE id = ?')
  }
  const shiftLessons = sqlite.prepare(
    'UPDATE jp_lesson SET sort_order = sort_order + 1 WHERE course_id = ? AND sort_order > ?'
  )
  const shiftCards = sqlite.prepare(
    'UPDATE jp_card SET sort_order = sort_order + 1 WHERE lesson_id = ? AND sort_order > ?'
  )
  // Keeps an in-memory snapshot in step with a shift just applied in SQL, so a
  // later sibling reads its real position.
  const shiftSnapshot = (rows: { sort_order: number }[], after: number): void => {
    for (const r of rows) if (r.sort_order > after) r.sort_order += 1
  }

  // The three-way rule shared by every row: `current` is the row's content
  // hash, `stored` what the sync last wrote, `want` today's seed.
  //   current === want   → already right; adopt the hash (re-attaches a row
  //                        whose content converged with the seed)
  //   current === stored → unedited; rewrite it
  //   otherwise          → the user's edit; leave it
  type Verdict = 'same' | 'rewrite' | 'keep'
  const judge = (current: string, stored: string | null, want: string): Verdict =>
    current === want ? 'same' : stored !== null && current === stored ? 'rewrite' : 'keep'

  function syncCards(lessonId: number, lesson: SeedLesson): void {
    const cardRows = selectSeedCards.all(lessonId) as CardRow[]
    // Every row in the lesson moves on a shift, user cards included.
    const allRows = selectAllCards.all(lessonId) as CardRow[]
    const snapshot = new Map(allRows.map((r) => [r.id, r]))
    const cardByKey = new Map(cardRows.map((r) => [r.seed_key as string, snapshot.get(r.id) ?? r]))
    const seedKeys = new Set(lesson.cards.map((c) => cardSeedKey(lesson.key, c)))
    let prevOrder = -1
    for (const card of lesson.cards) {
      const key = cardSeedKey(lesson.key, card)
      const row = cardByKey.get(key)
      if (!row) {
        if (tombstoned.has(key)) continue
        shiftCards.run(lessonId, prevOrder)
        shiftSnapshot(allRows, prevOrder)
        st.insertCard.run(lessonId, prevOrder + 1, ...seedCardValues(card), key, cardHash(card))
        prevOrder += 1
        report.inserted++
        continue
      }
      prevOrder = row.sort_order
      const want = cardHash(card)
      const v = judge(rowCardHash(row), row.seed_hash, want)
      if (v === 'rewrite') {
        updateCard.run(...seedCardValues(card), want, row.id)
        report.updated++
      } else if (v === 'same' && row.seed_hash !== want) {
        setHash.card.run(want, row.id)
      }
    }
    for (const row of cardRows) {
      if (seedKeys.has(row.seed_key as string)) continue
      if (!cardDisposable(sqlite, row)) continue
      deleteCard.run(row.id)
      report.removed++
    }
  }

  // Puts a course's built-in lessons in the seed's order. Each lesson that is
  // not one of this course's seed lessons (the user's own, a dropped seed
  // lesson that was kept, one another course is about to take) travels with
  // the seed lesson it followed; any before the first seed lesson stay first.
  // Writes sort_order only, and only when the order changes, so it never
  // touches content, review state or `updated_at` (autoReattachVerdict reads
  // that as a hand write). Returns whether anything moved.
  const selectOrder = sqlite.prepare(
    'SELECT id, seed_key, sort_order FROM jp_lesson WHERE course_id = ? ORDER BY sort_order, id'
  )
  const setLessonOrder = sqlite.prepare('UPDATE jp_lesson SET sort_order = ? WHERE id = ?')
  function reorderLessons(courseId: number, course: SeedCourse): boolean {
    const rows = selectOrder.all(courseId) as { id: number; seed_key: string | null; sort_order: number }[]
    const seedIndex = new Map(course.lessons.map((l, i) => [l.key, i]))
    const leading: typeof rows = []
    const groups: { index: number; rows: typeof rows }[] = []
    const claimed = new Set<string>()
    for (const row of rows) {
      const index = row.seed_key === null ? undefined : seedIndex.get(row.seed_key)
      if (index !== undefined && !claimed.has(row.seed_key as string)) {
        claimed.add(row.seed_key as string)
        groups.push({ index, rows: [row] })
      } else if (groups.length) {
        groups[groups.length - 1].rows.push(row)
      } else {
        leading.push(row)
      }
    }
    // Stable: equal indexes cannot occur, since each seed key is claimed once.
    groups.sort((a, b) => a.index - b.index)
    const order = [...leading, ...groups.flatMap((g) => g.rows)]
    if (order.every((r, i) => r.id === rows[i].id)) return false
    order.forEach((r, i) => {
      if (r.sort_order !== i) setLessonOrder.run(i, r.id)
    })
    return true
  }

  const tx = sqlite.transaction(() => {
    for (const pack of packs) {
      if (!hasFlag(sqlite, pack.flag)) continue
      const courseRow = selectCourse.get(pack.key) as CourseRow | undefined
      if (!courseRow) continue // the user deleted the course

      const { course } = pack
      const cw = courseHash(course)
      const cv = judge(courseHash(courseRow), courseRow.seed_hash, cw)
      if (cv === 'rewrite') {
        updateCourse.run(course.title, course.description, course.level, course.difficulty, cw, courseRow.id)
        report.updated++
      } else if (cv === 'same' && courseRow.seed_hash !== cw) {
        setHash.course.run(cw, courseRow.id)
      }

      const allLessons = sqlite
        .prepare('SELECT * FROM jp_lesson WHERE course_id = ?')
        .all(courseRow.id) as LessonRow[]
      const lessonRows = (selectLessons.all(courseRow.id) as LessonRow[]).map(
        (r) => allLessons.find((a) => a.id === r.id) ?? r
      )
      const lessonByKey = new Map(lessonRows.map((r) => [r.seed_key as string, r]))
      const seedLessonKeys = new Set(course.lessons.map((l) => l.key))
      let prevLessonOrder = -1

      for (const lesson of course.lessons) {
        let row = lessonByKey.get(lesson.key)
        if (!row) {
          if (tombstoned.has(lesson.key)) continue
          shiftLessons.run(courseRow.id, prevLessonOrder)
          shiftSnapshot(allLessons, prevLessonOrder)
          const moved = selectLessonAnywhere.get(lesson.key) as LessonRow | undefined
          if (!moved) {
            insertLesson(st, courseRow.id, lesson, prevLessonOrder + 1)
            prevLessonOrder += 1
            report.inserted++
            continue
          }
          moveLesson.run(courseRow.id, prevLessonOrder + 1, moved.id)
          row = { ...moved, sort_order: prevLessonOrder + 1 }
          allLessons.push(row)
          report.updated++
        }
        prevLessonOrder = row.sort_order
        const lw = lessonHash(lesson)
        const lv = judge(lessonHash(row), row.seed_hash, lw)
        if (lv === 'rewrite') {
          updateLesson.run(lesson.title, lesson.body ?? null, lw, row.id)
          report.updated++
        } else if (lv === 'same' && row.seed_hash !== lw) {
          setHash.lesson.run(lw, row.id)
        }
        syncCards(row.id, lesson)
      }

      // Lessons the seed dropped: removed only while unedited, not marked
      // learned, and holding nothing but disposable built-in cards. A lesson
      // the seed moved to another course is not dropped: that course moves it.
      for (const row of lessonRows) {
        if (seedLessonKeys.has(row.seed_key as string)) continue
        if (allSeedLessonKeys.has(row.seed_key as string)) continue
        if (row.seed_hash === null || lessonHash(row) !== row.seed_hash || row.learned) continue
        const cards = selectAllCards.all(row.id) as CardRow[]
        if (!cards.every((c) => cardDisposable(sqlite, c))) continue
        deleteLesson.run(row.id)
        report.removed++
      }

      if (reorderLessons(courseRow.id, course)) report.reordered++
    }

    if (report.removed) {
      sqlite.prepare('DELETE FROM jp_ghost WHERE card_id NOT IN (SELECT id FROM jp_card)').run()
    }
    sqlite
      .prepare(
        `INSERT INTO settings (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value`
      )
      .run(SEED_VERSION_KEY, version)
  })
  tx()
  return report
}

// ---- Built-in rows the sync leaves alone, and restoring them ----

export interface SeedDrift {
  // Built-in rows the sync will not update: the user edited them, or the
  // library was seeded from an older text before keys existed (the backfill
  // cannot tell the two apart, so it leaves both alone).
  edited: number
  // Built-in lessons/cards the backfill found missing (deleted by the user, or
  // added to the pack after this library seeded it).
  missing: number
}

export function seedDrift(sqlite: Database.Database): SeedDrift {
  let edited = 0
  const drifted = (current: string, stored: string | null): boolean =>
    stored === null || current !== stored
  for (const r of sqlite.prepare('SELECT * FROM jp_course WHERE seed_key IS NOT NULL').all() as CourseRow[]) {
    if (drifted(courseHash(r), r.seed_hash)) edited++
  }
  for (const r of sqlite.prepare('SELECT * FROM jp_lesson WHERE seed_key IS NOT NULL').all() as LessonRow[]) {
    if (drifted(lessonHash(r), r.seed_hash)) edited++
  }
  for (const r of sqlite.prepare('SELECT * FROM jp_card WHERE seed_key IS NOT NULL').all() as CardRow[]) {
    if (drifted(rowCardHash(r), r.seed_hash)) edited++
  }
  const missing = (
    sqlite
      .prepare("SELECT COUNT(*) AS n FROM jp_seed_tombstone WHERE source = 'backfill'")
      .get() as { n: number }
  ).n
  return { edited, missing }
}

// What the one-time backfill held back, by plain counts and no hashing: its
// tombstones and the built-in rows it left without a hash. A row the user edits
// later keeps its hash, so it never counts here (the Today banner reads this;
// Settings shows the full seedDrift).
export function seedHeldBack(sqlite: Database.Database): { missing: number; older: number } {
  const missing = count(sqlite, "SELECT COUNT(*) AS n FROM jp_seed_tombstone WHERE source = 'backfill'")
  const older = SEED_TABLES.reduce(
    (sum, { table }) =>
      sum +
      count(sqlite, `SELECT COUNT(*) AS n FROM ${table} WHERE seed_key IS NOT NULL AND seed_hash IS NULL`),
    0
  )
  return { missing, older }
}

// Marks every built-in row as unedited (its current content becomes the last
// written seed), lifts the backfill's tombstones (never the user's own
// deletions) and clears the version stamp, so the next sync rewrites each row
// with the built-in text and inserts what was missing. Content columns only:
// review state and user-made lessons/cards are untouched. Reached from the
// confirmed restore (Settings, or the Today banner) and from startup's
// updateSeedContent when autoReattachVerdict proves the library safe.
export function reattachSeedRows(sqlite: Database.Database): void {
  const tx = sqlite.transaction(() => {
    const setCourse = sqlite.prepare('UPDATE jp_course SET seed_hash = ? WHERE id = ?')
    const setLesson = sqlite.prepare('UPDATE jp_lesson SET seed_hash = ? WHERE id = ?')
    const setCard = sqlite.prepare('UPDATE jp_card SET seed_hash = ? WHERE id = ?')
    for (const r of sqlite.prepare('SELECT * FROM jp_course WHERE seed_key IS NOT NULL').all() as CourseRow[]) {
      setCourse.run(courseHash(r), r.id)
    }
    for (const r of sqlite.prepare('SELECT * FROM jp_lesson WHERE seed_key IS NOT NULL').all() as LessonRow[]) {
      setLesson.run(lessonHash(r), r.id)
    }
    for (const r of sqlite.prepare('SELECT * FROM jp_card WHERE seed_key IS NOT NULL').all() as CardRow[]) {
      setCard.run(rowCardHash(r), r.id)
    }
    sqlite.prepare("DELETE FROM jp_seed_tombstone WHERE source = 'backfill'").run()
    sqlite.prepare('DELETE FROM settings WHERE key = ?').run(SEED_VERSION_KEY)
  })
  tx()
}

// ---- Applying held-back built-in content without asking ----

// The backfill holds content back for two reasons it cannot resolve: a row
// whose text differs from today's seed (an older seed text or a hand edit) and
// a seed lesson/card with no row (content added after the library was seeded,
// or a deletion). Restoring is safe without a confirm only when the library
// itself proves neither a hand edit nor a deletion:
//
// - Hand edits. Every app writer of a course, lesson or card row stamps
//   `updated_at` (updateCourse/updateLesson/updateCard, setLessonLearned,
//   resetCard, submitReview, the sync's own rewrites), while the legacy step
//   passes, the backfill stamp and hash-only writes do not, and both columns
//   default to the same datetime('now') on insert. A held-back row whose
//   `updated_at` still equals `created_at` has therefore only ever held seed
//   text. Any held-back row written since (an edit, a review, a learned mark:
//   they cannot be told apart) makes the library unsafe.
// - Deletions. A backfill tombstone has no row to inspect, so lifting it is
//   safe only when nothing was ever deleted from jp_lesson or jp_card: both are
//   AUTOINCREMENT, so sqlite_sequence equal to the row count proves it. Any
//   deletion (the user's, or the sync removing a dropped seed row) blocks.
// - Unkeyed rows inside built-in content. A lesson without a seed key in a
//   built-in course, or a card without one in a built-in lesson, is the user's
//   own row or one renamed before keys existed: the backfill could not match
//   it and tombstoned the seed key instead, so restoring would put a duplicate
//   beside the user's copy. Any such row blocks (the mining inbox and the
//   user's own courses carry no seed key and are not affected).
//
// The proof leans on every writer moving `updated_at`;
// tests/jpWriterContract.test.ts pins that. Residual risk, not provable either
// way: a card the user created before keys existed whose front equals a seed
// card added later is claimed by the backfill as that seed card, with equal
// timestamps, and is indistinguishable from it.
//
// Anything else leaves the decision to the user (the Today banner and
// Settings → Learning → "Built-in course updates").
export type AutoReattachVerdict =
  | 'apply'
  | 'nothing-held-back'
  | 'written-since-seeded'
  | 'rows-deleted'
  | 'unkeyed-rows-in-built-in'

const SEED_TABLES = [
  { table: 'jp_course', hash: (r: unknown) => courseHash(r as CourseRow) },
  { table: 'jp_lesson', hash: (r: unknown) => lessonHash(r as LessonRow) },
  { table: 'jp_card', hash: (r: unknown) => rowCardHash(r as CardRow) }
] as const

function count(sqlite: Database.Database, sql: string, ...args: unknown[]): number {
  return (sqlite.prepare(sql).get(...args) as { n: number }).n
}

export function autoReattachVerdict(sqlite: Database.Database): AutoReattachVerdict {
  // A hash that differs from the row's content is only ever produced by an app
  // write after the sync stamped it, so with no tombstone and no NULL hash
  // there is nothing the backfill held back.
  const { missing, older } = seedHeldBack(sqlite)
  if (missing === 0 && older === 0) return 'nothing-held-back'

  const unkeyed =
    count(
      sqlite,
      `SELECT COUNT(*) AS n FROM jp_lesson l JOIN jp_course c ON c.id = l.course_id
       WHERE c.seed_key IS NOT NULL AND l.seed_key IS NULL`
    ) +
    count(
      sqlite,
      `SELECT COUNT(*) AS n FROM jp_card k JOIN jp_lesson l ON l.id = k.lesson_id
       WHERE l.seed_key IS NOT NULL AND k.seed_key IS NULL`
    )
  if (unkeyed > 0) return 'unkeyed-rows-in-built-in'

  for (const { table, hash } of SEED_TABLES) {
    const written = sqlite
      .prepare(`SELECT * FROM ${table} WHERE seed_key IS NOT NULL AND updated_at <> created_at`)
      .all() as { seed_hash: string | null }[]
    if (written.some((r) => r.seed_hash === null || hash(r) !== r.seed_hash)) {
      return 'written-since-seeded'
    }
  }

  if (missing > 0) {
    for (const table of ['jp_lesson', 'jp_card']) {
      const seq =
        (
          sqlite.prepare('SELECT seq FROM sqlite_sequence WHERE name = ?').get(table) as
            | { seq: number }
            | undefined
        )?.seq ?? 0
      if (seq !== count(sqlite, `SELECT COUNT(*) AS n FROM ${table}`)) return 'rows-deleted'
    }
  }
  return 'apply'
}

// Re-attaches every built-in row and runs the sync in one transaction, so a
// failed sync leaves nothing half-restored (the drift stays as it was). Used by
// startup's auto-apply and by the confirmed restore.
export function reattachAndSync(
  sqlite: Database.Database,
  packs: SeedPack[],
  version: string
): SeedSyncReport | null {
  return sqlite.transaction(() => {
    reattachSeedRows(sqlite)
    return syncSeedContent(sqlite, packs, version)
  })()
}

export interface SeedUpdateReport {
  verdict: AutoReattachVerdict
  // What the auto-apply took in (zero unless the verdict was 'apply').
  restored: SeedDrift
  sync: SeedSyncReport | null
}

// Startup's whole update step: the one-time key backfill, then (when the
// library proves it safe) the held-back content, then the content sync. It
// runs only on launches where the seed runs at all (SEED_VERSION changed, or
// the stamp was cleared). The decision reads the library's state, not whether
// the backfill ran in this launch, so a library backfilled on an earlier
// launch is reached by the next version bump. The re-attach and its sync
// commit together.
export function updateSeedContent(
  sqlite: Database.Database,
  packs: SeedPack[],
  version: string
): SeedUpdateReport {
  backfillSeedKeys(sqlite, packs)
  adoptMovedLessons(sqlite, packs)
  const verdict = autoReattachVerdict(sqlite)
  if (verdict !== 'apply') {
    return { verdict, restored: { edited: 0, missing: 0 }, sync: syncSeedContent(sqlite, packs, version) }
  }
  const restored = seedDrift(sqlite)
  return { verdict, restored, sync: reattachAndSync(sqlite, packs, version) }
}
