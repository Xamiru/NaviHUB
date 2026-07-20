import { getSqlite } from './db/connection'
import * as mediaRepo from './repos/mediaRepo'
import * as listRepo from './repos/listRepo'
import type {
  ListKind,
  MediaItemInput,
  QuizKind,
  SyncOp,
  SyncOpsRequest,
  SyncOpsResult,
  SyncSkippedOp
} from '@shared/types'

// Replays a phone's personal-state oplog against the PC library (the write half
// of the sync protocol — src/main/sync.ts owns the HTTP surface). Invariants:
//
// - The phone's DB is derived from a PC snapshot, so op row ids are PC row ids.
//   AUTOINCREMENT never reuses ids, so a stale id points at nothing (skip), not
//   at a different row; the per-op check field (title/dir_path/file_path/front)
//   is defense-in-depth for a restored-backup PC whose ids rolled back.
// - Ops carry the phone's action time (`ts`, UTC 'YYYY-MM-DD HH:MM:SS'): due
//   dates, review logs and play history must honor when it happened, not when
//   it synced — which is why several handlers mirror repo SQL with an explicit
//   timestamp instead of calling repo functions that stamp datetime('now').
//   Keep them in step with their repo/manga.ts originals (noted per handler).
// - A skipped op never aborts the batch: apply what's consistent, report the
//   rest back to the phone in SyncOpsResult.skipped.

const DATETIME_RE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
const QUIZ_KINDS: QuizKind[] = ['song', 'japanese', 'kana', 'kanji', 'conjugation', 'jlpt']
const SRS_STATUSES = ['new', 'learning', 'review']
const SRS_GRADES = ['again', 'hard', 'good', 'easy']

const isDatetime = (v: unknown): v is string => typeof v === 'string' && DATETIME_RE.test(v)
const isId = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v) && v > 0
const isCount = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v) && v >= 0
const isStr = (v: unknown): v is string => typeof v === 'string'
const optNullStr = (v: unknown): boolean => v === undefined || v === null || typeof v === 'string'

// ---------------------------------------------------------------------------
// Validation — the trust boundary. The server hands this raw client JSON; every
// field an op handler touches is shape-checked here first.
// ---------------------------------------------------------------------------

function opError(i: number, msg: string): Error {
  return new Error(`ops[${i}]: ${msg}`)
}

function validateOp(op: Record<string, unknown>, i: number): void {
  if (!isDatetime(op.ts)) throw opError(i, 'ts must be a UTC "YYYY-MM-DD HH:MM:SS" string')
  switch (op.kind) {
    case 'media.update': {
      if (!isId(op.mediaId) || !isStr(op.title)) throw opError(i, 'bad media target')
      const f = op.fields
      if (!f || typeof f !== 'object' || Array.isArray(f)) throw opError(i, 'bad fields')
      const fields = f as Record<string, unknown>
      if (fields.status !== undefined && !optNullStr(fields.status)) throw opError(i, 'bad status')
      if (
        fields.score !== undefined &&
        fields.score !== null &&
        !(typeof fields.score === 'number' && Number.isFinite(fields.score))
      ) {
        throw opError(i, 'bad score')
      }
      if (fields.progress !== undefined && !isCount(fields.progress)) throw opError(i, 'bad progress')
      if (fields.rewatchCount !== undefined && !isCount(fields.rewatchCount)) {
        throw opError(i, 'bad rewatchCount')
      }
      if (fields.favorite !== undefined && typeof fields.favorite !== 'boolean') {
        throw opError(i, 'bad favorite')
      }
      if (fields.notes !== undefined && !optNullStr(fields.notes)) throw opError(i, 'bad notes')
      return
    }
    case 'manga.progress':
      if (!isId(op.chapterId) || !isStr(op.dirPath) || !isCount(op.lastReadPage)) {
        throw opError(i, 'bad manga.progress payload')
      }
      return
    case 'manga.setRead':
      if (!isId(op.chapterId) || !isStr(op.dirPath) || typeof op.read !== 'boolean') {
        throw opError(i, 'bad manga.setRead payload')
      }
      return
    case 'jp.review': {
      if (!isId(op.cardId) || !isStr(op.front)) throw opError(i, 'bad card target')
      if (!SRS_GRADES.includes(op.grade as string)) throw opError(i, 'bad grade')
      const s = op.state as Record<string, unknown> | undefined
      if (!s || typeof s !== 'object') throw opError(i, 'bad state')
      if (!SRS_STATUSES.includes(s.status as string)) throw opError(i, 'bad state.status')
      for (const k of ['learningStep', 'intervalDays', 'reps', 'lapses']) {
        if (!isCount(s[k])) throw opError(i, `bad state.${k}`)
      }
      if (!(typeof s.ease === 'number' && Number.isFinite(s.ease))) throw opError(i, 'bad state.ease')
      if (!isDatetime(s.dueAt)) throw opError(i, 'bad state.dueAt')
      return
    }
    case 'jp.lessonLearned':
      if (!isId(op.lessonId) || typeof op.learned !== 'boolean') {
        throw opError(i, 'bad jp.lessonLearned payload')
      }
      return
    case 'music.setLiked':
      if (!isId(op.trackId) || !isStr(op.filePath) || typeof op.liked !== 'boolean') {
        throw opError(i, 'bad music.setLiked payload')
      }
      return
    case 'music.logPlay':
      if (!isId(op.trackId) || !isStr(op.filePath)) throw opError(i, 'bad music.logPlay payload')
      return
    case 'list.addItem':
      if (!isId(op.listId) || !isId(op.entityId) || !optNullStr(op.note)) {
        throw opError(i, 'bad list.addItem payload')
      }
      return
    case 'list.removeItem':
      if (!isId(op.listId) || !isId(op.entityId)) throw opError(i, 'bad list.removeItem payload')
      return
    case 'quiz.session': {
      const s = op.session as Record<string, unknown> | undefined
      if (!s || typeof s !== 'object') throw opError(i, 'bad session')
      if (!QUIZ_KINDS.includes(s.kind as QuizKind)) throw opError(i, 'bad session.kind')
      if (!isCount(s.score) || !isCount(s.total) || !isCount(s.bestStreak)) {
        throw opError(i, 'bad session counts')
      }
      if (
        s.settings !== undefined &&
        s.settings !== null &&
        (typeof s.settings !== 'object' || Array.isArray(s.settings))
      ) {
        throw opError(i, 'bad session.settings')
      }
      return
    }
    default:
      throw opError(i, `unknown op kind "${String(op.kind)}"`)
  }
}

// Throws with a precise message on any malformed shape; returns the request
// typed for replay. Caps guard against a runaway/hostile client.
export function validateOpsRequest(body: unknown): SyncOpsRequest {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('body must be an object')
  const b = body as Record<string, unknown>
  if (!isStr(b.batchId) || b.batchId.length < 8 || b.batchId.length > 64) {
    throw new Error('batchId must be an 8-64 char string')
  }
  if (!isStr(b.device) || !b.device.trim() || b.device.length > 64) {
    throw new Error('device must be a non-empty string (max 64 chars)')
  }
  if (!Array.isArray(b.ops)) throw new Error('ops must be an array')
  if (b.ops.length > 20_000) throw new Error('ops batch too large (max 20000)')
  b.ops.forEach((op, i) => {
    if (!op || typeof op !== 'object' || Array.isArray(op)) throw opError(i, 'must be an object')
    validateOp(op as Record<string, unknown>, i)
  })
  return { batchId: b.batchId, device: b.device.trim(), ops: b.ops as SyncOp[] }
}

// ---------------------------------------------------------------------------
// Per-op replay. Each handler returns null when applied, or a human-readable
// skip reason (surfaced in the phone's sync summary).
// ---------------------------------------------------------------------------

type Sqlite = ReturnType<typeof getSqlite>

function applyMediaUpdate(db: Sqlite, op: Extract<SyncOp, { kind: 'media.update' }>): string | null {
  const row = db
    .prepare('SELECT title, updated_at FROM media_item WHERE id = ?')
    .get(op.mediaId) as { title: string; updated_at: string } | undefined
  if (!row) return 'media item no longer exists'
  if (row.title.toLowerCase() !== op.title.toLowerCase()) {
    return `media item is now "${row.title}" (expected "${op.title}")`
  }
  // Last-writer-wins per row: a PC edit made after the phone's edit stays.
  if (row.updated_at > op.ts) return 'PC copy is newer'
  // Explicit whitelist copy — op.fields is client JSON and must never reach the
  // repo's column map wholesale (it would accept canonical columns too).
  const patch: Partial<MediaItemInput> = {}
  if (op.fields.status !== undefined) patch.status = op.fields.status
  if (op.fields.score !== undefined) patch.score = op.fields.score
  if (op.fields.progress !== undefined) patch.progress = op.fields.progress
  if (op.fields.rewatchCount !== undefined) patch.rewatchCount = op.fields.rewatchCount
  if (op.fields.favorite !== undefined) patch.favorite = op.fields.favorite
  if (op.fields.notes !== undefined) patch.notes = op.fields.notes
  if (Object.keys(patch).length === 0) return 'no syncable fields in op'
  mediaRepo.update(op.mediaId, patch)
  return null
}

// Chapter rows survive rescans (matched by dir_path) but not detach+reattach;
// after a reattach the id changed, so fall back to resolving by dir_path.
function resolveChapter(
  db: Sqlite,
  chapterId: number,
  dirPath: string
): { id: number; media_id: number; page_count: number; read_at: string | null } | null {
  const byId = db
    .prepare('SELECT id, media_id, page_count, read_at, dir_path FROM manga_chapter WHERE id = ?')
    .get(chapterId) as
    | { id: number; media_id: number; page_count: number; read_at: string | null; dir_path: string }
    | undefined
  if (byId && byId.dir_path === dirPath) return byId
  const byPath = db
    .prepare('SELECT id, media_id, page_count, read_at FROM manga_chapter WHERE dir_path = ?')
    .all(dirPath) as { id: number; media_id: number; page_count: number; read_at: string | null }[]
  return byPath.length === 1 ? byPath[0] : null
}

// Same statement as manga.ts:syncMediaProgress (keep in step): raises
// media_item.progress to the local read state, never lowers it.
function raiseMediaProgress(db: Sqlite, mediaId: number): void {
  const agg = db
    .prepare(
      `SELECT COUNT(*) AS readCount, MAX(number) AS maxNumber
       FROM manga_chapter WHERE media_id = ? AND read_at IS NOT NULL`
    )
    .get(mediaId) as { readCount: number; maxNumber: number | null }
  const candidate = agg.maxNumber != null ? Math.floor(agg.maxNumber) : agg.readCount
  db.prepare(
    `UPDATE media_item SET progress = ?, updated_at = datetime('now')
     WHERE id = ? AND progress < ?`
  ).run(candidate, mediaId, candidate)
}

// Mirrors manga.ts:markProgress with the phone's read time for read_at.
function applyMangaProgress(db: Sqlite, op: Extract<SyncOp, { kind: 'manga.progress' }>): string | null {
  const ch = resolveChapter(db, op.chapterId, op.dirPath)
  if (!ch) return 'chapter no longer exists'
  const finished = ch.page_count > 0 && op.lastReadPage >= ch.page_count - 1
  db.prepare(
    `UPDATE manga_chapter SET last_read_page = ?,
       read_at = CASE WHEN ? THEN COALESCE(read_at, ?) ELSE read_at END,
       updated_at = datetime('now')
     WHERE id = ?`
  ).run(op.lastReadPage, finished ? 1 : 0, op.ts, ch.id)
  if (finished && !ch.read_at) raiseMediaProgress(db, ch.media_id)
  return null
}

// Mirrors manga.ts:markChapterRead with the phone's read time for read_at.
function applyMangaSetRead(db: Sqlite, op: Extract<SyncOp, { kind: 'manga.setRead' }>): string | null {
  const ch = resolveChapter(db, op.chapterId, op.dirPath)
  if (!ch) return 'chapter no longer exists'
  if (op.read) {
    db.prepare(
      `UPDATE manga_chapter SET read_at = COALESCE(read_at, ?),
         updated_at = datetime('now') WHERE id = ?`
    ).run(op.ts, ch.id)
  } else {
    db.prepare(
      `UPDATE manga_chapter SET read_at = NULL, last_read_page = NULL,
         updated_at = datetime('now') WHERE id = ?`
    ).run(ch.id)
  }
  raiseMediaProgress(db, ch.media_id)
  return null
}

// Applies the phone-computed SRS result (same shared/srs.ts gradeCard) with the
// review's real timestamps; mirrors japaneseRepo.submitReview's statements. The
// review-log row is a union-merged history record and is inserted even when the
// PC's card state is newer (a PC review after the phone's wins the state).
function applyJpReview(db: Sqlite, op: Extract<SyncOp, { kind: 'jp.review' }>): string | null {
  const row = db
    .prepare('SELECT front, last_reviewed_at FROM jp_card WHERE id = ?')
    .get(op.cardId) as { front: string; last_reviewed_at: string | null } | undefined
  if (!row) return 'card no longer exists'
  if (row.front !== op.front) return `card front is now "${row.front}" (expected "${op.front}")`
  const pcIsNewer = row.last_reviewed_at != null && row.last_reviewed_at > op.ts
  if (!pcIsNewer) {
    db.prepare(
      `UPDATE jp_card
       SET status = ?, learning_step = ?, interval_days = ?, ease = ?, reps = ?, lapses = ?,
           due_at = ?, last_reviewed_at = ?, updated_at = datetime('now')
       WHERE id = ?`
    ).run(
      op.state.status,
      op.state.learningStep,
      op.state.intervalDays,
      op.state.ease,
      op.state.reps,
      op.state.lapses,
      op.state.dueAt,
      op.ts,
      op.cardId
    )
  }
  db.prepare(
    `INSERT INTO jp_review_log (card_id, grade, interval_days, ease, reviewed_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(op.cardId, op.grade, op.state.intervalDays, op.state.ease, op.ts)
  return null
}

// Mirrors japaneseRepo.setLessonLearned with the phone's time for learned_at.
function applyJpLessonLearned(
  db: Sqlite,
  op: Extract<SyncOp, { kind: 'jp.lessonLearned' }>
): string | null {
  const res = db
    .prepare(
      `UPDATE jp_lesson
       SET learned = ?, learned_at = CASE WHEN ? THEN ? ELSE learned_at END,
           updated_at = datetime('now')
       WHERE id = ?`
    )
    .run(op.learned ? 1 : 0, op.learned ? 1 : 0, op.ts, op.lessonId)
  return res.changes === 0 ? 'lesson no longer exists' : null
}

// Track rows are dropped + recreated by rescans, so the durable identity is
// file_path; the id is just the fast path.
function resolveTrackId(db: Sqlite, trackId: number, filePath: string): number | null {
  const byId = db.prepare('SELECT id, file_path FROM music_track WHERE id = ?').get(trackId) as
    | { id: number; file_path: string }
    | undefined
  if (byId && byId.file_path === filePath) return byId.id
  const byPath = db.prepare('SELECT id FROM music_track WHERE file_path = ?').get(filePath) as
    | { id: number }
    | undefined
  return byPath?.id ?? null
}

// Mirrors musicRepo.setLiked with the phone's time for liked_at.
function applyMusicSetLiked(db: Sqlite, op: Extract<SyncOp, { kind: 'music.setLiked' }>): string | null {
  const id = resolveTrackId(db, op.trackId, op.filePath)
  if (id == null) return 'track no longer exists'
  db.prepare(
    `UPDATE music_track SET liked_at = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(op.liked ? op.ts : null, id)
  return null
}

// Mirrors musicRepo.logPlay with the phone's time; last_played_at only moves
// forward (a PC play after the phone's play must stay the most recent).
function applyMusicLogPlay(db: Sqlite, op: Extract<SyncOp, { kind: 'music.logPlay' }>): string | null {
  const id = resolveTrackId(db, op.trackId, op.filePath)
  if (id == null) return 'track no longer exists'
  db.prepare(
    `UPDATE music_track SET play_count = play_count + 1,
       last_played_at = MAX(COALESCE(last_played_at, ''), ?) WHERE id = ?`
  ).run(op.ts, id)
  db.prepare(
    `INSERT INTO music_play_log (track_id, duration, played_at)
     SELECT id, duration, ? FROM music_track WHERE id = ?`
  ).run(op.ts, id)
  return null
}

// list_item.entity_id is polymorphic with no FK — verify the entity is alive in
// the list's kind table before inserting, or a dead row would appear.
const ENTITY_TABLE: Record<ListKind, string> = {
  media: 'media_item',
  person: 'person',
  character: 'character',
  company: 'company'
}

function listKind(db: Sqlite, listId: number): ListKind | null {
  const row = db.prepare('SELECT entity_kind FROM list WHERE id = ?').get(listId) as
    | { entity_kind: ListKind }
    | undefined
  return row?.entity_kind ?? null
}

function applyListAddItem(db: Sqlite, op: Extract<SyncOp, { kind: 'list.addItem' }>): string | null {
  const kind = listKind(db, op.listId)
  if (!kind) return 'list no longer exists'
  const alive = db
    .prepare(`SELECT 1 FROM ${ENTITY_TABLE[kind]} WHERE id = ?`)
    .get(op.entityId)
  if (!alive) return `${kind} entry no longer exists`
  listRepo.addItem(op.listId, op.entityId, op.note ?? null)
  return null
}

function applyListRemoveItem(
  db: Sqlite,
  op: Extract<SyncOp, { kind: 'list.removeItem' }>
): string | null {
  if (!listKind(db, op.listId)) return 'list no longer exists'
  listRepo.removeItemByEntity(op.listId, op.entityId)
  return null
}

// Mirrors quizRepo.logSession with the phone's time for played_at.
function applyQuizSession(db: Sqlite, op: Extract<SyncOp, { kind: 'quiz.session' }>): string | null {
  db.prepare(
    `INSERT INTO quiz_session (kind, score, total, best_streak, settings, played_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    op.session.kind,
    op.session.score,
    op.session.total,
    op.session.bestStreak,
    op.session.settings ? JSON.stringify(op.session.settings) : null,
    op.ts
  )
  return null
}

function applyOp(db: Sqlite, op: SyncOp): string | null {
  switch (op.kind) {
    case 'media.update':
      return applyMediaUpdate(db, op)
    case 'manga.progress':
      return applyMangaProgress(db, op)
    case 'manga.setRead':
      return applyMangaSetRead(db, op)
    case 'jp.review':
      return applyJpReview(db, op)
    case 'jp.lessonLearned':
      return applyJpLessonLearned(db, op)
    case 'music.setLiked':
      return applyMusicSetLiked(db, op)
    case 'music.logPlay':
      return applyMusicLogPlay(db, op)
    case 'list.addItem':
      return applyListAddItem(db, op)
    case 'list.removeItem':
      return applyListRemoveItem(db, op)
    case 'quiz.session':
      return applyQuizSession(db, op)
  }
}

// ---------------------------------------------------------------------------
// Batch replay — one transaction, idempotent by batchId.
// ---------------------------------------------------------------------------

export function applyOpsBatch(req: SyncOpsRequest): SyncOpsResult {
  const db = getSqlite()
  const tx = db.transaction((): SyncOpsResult => {
    const prior = db
      .prepare('SELECT applied, skipped_json FROM sync_batch WHERE batch_id = ?')
      .get(req.batchId) as { applied: number; skipped_json: string } | undefined
    if (prior) {
      // The phone re-POSTed after losing the response — hand back the stored
      // outcome without touching anything.
      let skipped: SyncSkippedOp[] = []
      try {
        skipped = JSON.parse(prior.skipped_json)
      } catch {
        skipped = []
      }
      return { applied: prior.applied, skipped, alreadyApplied: true }
    }

    const skipped: SyncSkippedOp[] = []
    let applied = 0
    req.ops.forEach((op, index) => {
      try {
        const reason = applyOp(db, op)
        if (reason == null) applied += 1
        else skipped.push({ index, kind: op.kind, reason })
      } catch (e) {
        // A bad op must not sink the batch — record and move on.
        skipped.push({ index, kind: op.kind, reason: e instanceof Error ? e.message : String(e) })
      }
    })
    db.prepare(
      `INSERT INTO sync_batch (batch_id, device, applied, skipped, skipped_json)
       VALUES (?, ?, ?, ?, ?)`
    ).run(req.batchId, req.device, applied, skipped.length, JSON.stringify(skipped))
    return { applied, skipped, alreadyApplied: false }
  })
  return tx()
}
