import { getSqlite } from '../db/connection'
import { parseStatuses } from '@shared/mediaProgress'
import type {
  KindleApplySelection,
  KindleBookOrigin,
  KindleBookReading,
  KindleImportResult,
  KindleUndoResult
} from '@shared/types'
import {
  hashStored,
  isSafeRelative,
  storedForm,
  type PlanMangaInput,
  type SeriesFile,
  type PlanAnnotationState,
  type PlanBookInput,
  type PlanDayState,
  type PlanMedia,
  type PlannedBook,
  type KoSidecar,
  type ReadingDay
} from '../kindle/kindleCore'
import type { PlannedWord, VocabKind } from '../kindle/kindleVocabCore'
import * as checklistRepo from './checklistRepo'
import * as englishRepo from './englishRepo'
import * as japaneseRepo from './japaneseRepo'
import * as mediaRepo from './mediaRepo'
import * as quoteRepo from './quoteRepo'
import * as settingsRepo from './settingsRepo'

// The Kindle (KOReader) bridge's tables: kindle_book links device books to
// library books by KOReader's partial MD5, kindle_annotation remembers every
// imported highlight (a tombstone once its quote is deleted), and
// kindle_reading_day holds measured reading time. Imports are applied in one
// transaction with an undo record. Only books (media_type 'book') link.

const SESSION_TASK = 'book-session'

export interface KindleLink {
  md5: string
  mediaId: number
  mediaTitle: string
  origin: KindleBookOrigin
  devicePath: string | null
}

export function bookCandidates(): Array<{ id: number; title: string }> {
  return getSqlite()
    .prepare(`SELECT id, title FROM media_item WHERE media_type = 'book'`)
    .all() as Array<{ id: number; title: string }>
}

export function links(): Map<string, KindleLink> {
  const rows = getSqlite()
    .prepare(
      `SELECT k.partial_md5 AS md5, k.media_id AS mediaId, m.title AS mediaTitle, k.origin,
              k.device_path AS devicePath
       FROM kindle_book k JOIN media_item m ON m.id = k.media_id AND m.media_type = 'book'
       WHERE k.removed_at IS NULL`
    )
    .all() as KindleLink[]
  return new Map(rows.map((r) => [r.md5, r]))
}

function assertMd5(md5: string): void {
  if (!/^[0-9a-f]{32}$/.test(md5)) throw new Error('Not a KOReader book checksum')
}

// Links a device book to a library book by hand. A book Send to Kindle copied
// keeps its own link.
export function link(md5: string, mediaId: number, devicePath: string | null): void {
  assertMd5(md5)
  const db = getSqlite()
  const media = db.prepare(`SELECT media_type FROM media_item WHERE id = ?`).get(mediaId) as
    | { media_type: string }
    | undefined
  if (!media) throw new Error('That book is no longer in the library')
  if (media.media_type !== 'book') throw new Error('Only books can be linked to a Kindle book')
  const existing = db
    .prepare(`SELECT origin, media_id FROM kindle_book WHERE partial_md5 = ?`)
    .get(md5) as { origin: KindleBookOrigin; media_id: number | null } | undefined
  if (existing?.origin === 'sent' && existing.media_id != null) {
    throw new Error('This book was sent from NaviHUB and is already linked')
  }
  // A sent row whose library book was deleted is relinked but stays 'sent':
  // it still records a file NaviHUB wrote under documents/NaviHUB/.
  db.prepare(
    `INSERT INTO kindle_book (partial_md5, media_id, device_path, origin)
     VALUES (?, ?, ?, 'linked')
     ON CONFLICT(partial_md5) DO UPDATE SET media_id = excluded.media_id,
       device_path = COALESCE(kindle_book.device_path, excluded.device_path), removed_at = NULL`
  ).run(md5, mediaId, devicePath)
}

// A manual link is forgotten; a sent book only loses its library book, so
// the record of the file NaviHUB wrote survives.
export function unlink(md5: string): void {
  assertMd5(md5)
  const db = getSqlite()
  const row = db.prepare(`SELECT origin FROM kindle_book WHERE partial_md5 = ?`).get(md5) as
    | { origin: KindleBookOrigin }
    | undefined
  if (!row) throw new Error('That Kindle book is not linked')
  if (row.origin === 'linked') db.prepare(`DELETE FROM kindle_book WHERE partial_md5 = ?`).run(md5)
  else db.prepare(`UPDATE kindle_book SET media_id = NULL WHERE partial_md5 = ?`).run(md5)
}

// ---- manga series ----

export interface KindleSeriesLink {
  seriesKey: string
  mediaId: number
  mediaTitle: string
}

// Library manga to suggest for a series folder: by title, and by the local
// folder name, which is often the same name the Kindle mirror uses.
export function mangaCandidates(): Array<{ id: number; title: string; match?: string }> {
  const rows = getSqlite()
    .prepare(`SELECT id, title, local_dir FROM media_item WHERE media_type = 'manga'`)
    .all() as Array<{ id: number; title: string; local_dir: string | null }>
  const out: Array<{ id: number; title: string; match?: string }> = []
  for (const r of rows) {
    out.push({ id: r.id, title: r.title })
    const dir = r.local_dir?.trim()
    if (dir) out.push({ id: r.id, title: r.title, match: dir.slice(dir.lastIndexOf('/') + 1) })
  }
  return out
}

export function seriesLinks(): Map<string, KindleSeriesLink> {
  const rows = getSqlite()
    .prepare(
      `SELECT s.series_key AS seriesKey, s.media_id AS mediaId, m.title AS mediaTitle
       FROM kindle_series s JOIN media_item m ON m.id = s.media_id AND m.media_type = 'manga'`
    )
    .all() as KindleSeriesLink[]
  return new Map(rows.map((r) => [r.seriesKey, r]))
}

function assertSeriesKey(key: string): void {
  if (typeof key !== 'string' || !key || key.length > 1000 || !isSafeRelative(`documents/${key}`)) {
    throw new Error('Not a Kindle series folder')
  }
}

export function linkSeries(seriesKey: string, mediaId: number): void {
  assertSeriesKey(seriesKey)
  const db = getSqlite()
  const media = db.prepare(`SELECT media_type FROM media_item WHERE id = ?`).get(mediaId) as
    | { media_type: string }
    | undefined
  if (!media) throw new Error('That manga is no longer in the library')
  if (media.media_type !== 'manga') throw new Error('Only manga can be linked to a Kindle series')
  db.prepare(
    `INSERT INTO kindle_series (series_key, media_id) VALUES (?, ?)
     ON CONFLICT(series_key) DO UPDATE SET media_id = excluded.media_id`
  ).run(seriesKey, mediaId)
}

export function unlinkSeries(seriesKey: string): void {
  assertSeriesKey(seriesKey)
  const res = getSqlite().prepare(`DELETE FROM kindle_series WHERE series_key = ?`).run(seriesKey)
  if (res.changes === 0) throw new Error('That Kindle series is not linked')
}

export function mangaPlanInput(mediaId: number, files: SeriesFile[], days: ReadingDay[]): PlanMangaInput | null {
  const db = getSqlite()
  const m = db
    .prepare(
      `SELECT id, title, status, progress, total_units FROM media_item
       WHERE id = ? AND media_type = 'manga'`
    )
    .get(mediaId) as
    | { id: number; title: string; status: string | null; progress: number | null; total_units: number | null }
    | undefined
  if (!m) return null
  const media: PlanMedia = {
    id: m.id,
    title: m.title,
    status: m.status,
    progress: m.progress ?? 0,
    totalUnits: m.total_units,
    statuses: parseStatuses(settingsRepo.get('manga.statuses'), 'manga')
  }
  return { media, files, days, storedDays: storedDaysFor(mediaId) }
}

function storedDaysFor(mediaId: number): Map<string, PlanDayState> {
  const storedDays = new Map<string, PlanDayState>()
  for (const r of getSqlite()
    .prepare(`SELECT day, seconds, checklist_log_id FROM kindle_reading_day WHERE media_id = ?`)
    .all(mediaId) as Array<{ day: string; seconds: number; checklist_log_id: number | null }>) {
    storedDays.set(r.day, { seconds: r.seconds, credited: r.checklist_log_id != null })
  }
  return storedDays
}

// The days, of those given, a reading day may credit the checklist's daily
// book-session item: the item was on the board and due that day, judged by
// its rule history like every past day on the checklist.
export function creditableDays(days: string[], today: string): Set<string> {
  return checklistRepo.dailyItemDueDays(SESSION_TASK, days, today)
}

function statusesFor(): string[] {
  return parseStatuses(settingsRepo.get('book.statuses'), 'book')
}

// Any book's session that day: the daily item is one checkbox, so a day
// already ticked (by hand or for another book) is not credited again. One
// read per preview, not per linked book.
export function loggedSessionDays(): Set<string> {
  return new Set(
    (
      getSqlite()
        .prepare(`SELECT DISTINCT period_key FROM checklist_log WHERE task_key = ? AND cadence = 'daily'`)
        .all(SESSION_TASK) as Array<{ period_key: string }>
    ).map((r) => r.period_key)
  )
}

export function planInput(
  mediaId: number,
  sidecar: KoSidecar | null,
  days: ReadingDay[],
  loggedDays: Set<string> = loggedSessionDays()
): PlanBookInput | null {
  const db = getSqlite()
  const m = db
    .prepare(
      `SELECT id, title, status, progress, total_units FROM media_item
       WHERE id = ? AND media_type = 'book'`
    )
    .get(mediaId) as
    | { id: number; title: string; status: string | null; progress: number | null; total_units: number | null }
    | undefined
  if (!m) return null
  const media: PlanMedia = {
    id: m.id,
    title: m.title,
    status: m.status,
    progress: m.progress ?? 0,
    totalUnits: m.total_units,
    statuses: statusesFor()
  }

  const annotations = new Map<string, PlanAnnotationState>()
  const annRows = db
    .prepare(
      `SELECT a.fingerprint, a.quote_id, a.text_hash, a.note_hash, q.id AS live_id, q.text, q.note
       FROM kindle_annotation a LEFT JOIN quote q ON q.id = a.quote_id
       WHERE a.media_id = ?`
    )
    .all(mediaId) as Array<{
    fingerprint: string
    quote_id: number | null
    text_hash: string
    note_hash: string
    live_id: number | null
    text: string | null
    note: string | null
  }>
  for (const r of annRows) {
    annotations.set(r.fingerprint, {
      quoteId: r.quote_id,
      quote: r.live_id != null && r.text != null ? { text: r.text, note: r.note } : null,
      importedTextHash: r.text_hash,
      importedNoteHash: r.note_hash
    })
  }

  const storedDays = storedDaysFor(mediaId)

  return { media, sidecar, days, annotations, storedDays, loggedDays }
}

// ---- apply and undo ----

interface Tracking {
  status: string | null
  progress: number
}

interface UndoData {
  media: Array<{ id: number; prior: Tracking; after: Tracking }>
  quotesAdded: Array<{
    id: number
    mediaId: number
    fingerprint: string
    text: string
    note: string | null
    locator: string | null
  }>
  quotesUpdated: Array<{
    id: number
    mediaId: number
    fingerprint: string
    prior: { text: string; furigana: string | null; note: string | null; textHash: string; noteHash: string }
    after: { text: string; furigana: string | null; note: string | null }
  }>
  days: Array<{
    mediaId: number
    day: string
    prior: { seconds: number; pages: number; logId: number | null } | null
    logId: number | null
  }>
  // Words the import added (created: a new deck row, not one already there).
  // `wrote`: the fields as the import wrote them, so Undo removes only a row
  // still holding exactly that.
  words?: Array<{
    key: string
    kind: VocabKind
    targetId: number
    created: boolean
    wrote?: { front: string; back: string; extra: string | null }
  }>
}

function tracking(mediaId: number): Tracking | null {
  const r = getSqlite()
    .prepare(`SELECT status, progress FROM media_item WHERE id = ?`)
    .get(mediaId) as { status: string | null; progress: number | null } | undefined
  return r ? { status: r.status, progress: r.progress ?? 0 } : null
}

export function apply(
  planned: PlannedBook[],
  selection: KindleApplySelection,
  today: string,
  words: PlannedWord[] = []
): KindleImportResult {
  const db = getSqlite()
  const want = {
    progress: new Set(selection.progress),
    status: new Set(selection.status),
    quotes: new Set(selection.quotes),
    reading: new Set(selection.reading),
    words: new Set(selection.words ?? [])
  }
  return db.transaction(() => {
    const undo: UndoData = { media: [], quotesAdded: [], quotesUpdated: [], days: [], words: [] }
    const result: Omit<KindleImportResult, 'importId'> = {
      progressUpdated: 0,
      statusUpdated: 0,
      quotesAdded: 0,
      quotesUpdated: 0,
      readingDays: 0,
      checklistCredits: 0,
      wordsAdded: 0
    }

    for (const b of planned) {
      const prior = tracking(b.mediaId)
      if (!prior) continue

      const patch: Partial<Tracking> = {}
      if (b.progress && want.progress.has(b.mediaId)) patch.progress = b.progress.to
      if (b.status && want.status.has(b.mediaId)) patch.status = b.status.to
      if (Object.keys(patch).length) {
        mediaRepo.update(b.mediaId, patch)
        undo.media.push({ id: b.mediaId, prior, after: { ...prior, ...patch } })
        if (patch.progress !== undefined) result.progressUpdated++
        if (patch.status !== undefined) result.statusUpdated++
      }

      for (const q of b.quotes) {
        if (!want.quotes.has(q.key)) continue
        if (q.kind === 'new') {
          const id = quoteRepo.save({
            text: q.text,
            note: q.note,
            locator: q.locator,
            mediaId: b.mediaId,
            origin: 'book'
          })
          db.prepare(
            `INSERT INTO kindle_annotation (media_id, fingerprint, quote_id, text_hash, note_hash)
             VALUES (?, ?, ?, ?, ?)`
          ).run(b.mediaId, q.fingerprint, id, hashStored(q.text), hashStored(q.note))
          undo.quotesAdded.push({
            id,
            mediaId: b.mediaId,
            fingerprint: q.fingerprint,
            text: q.text,
            note: q.note,
            locator: q.locator
          })
          result.quotesAdded++
        } else if (q.quoteId != null) {
          const cur = db
            .prepare(`SELECT text, furigana, note FROM quote WHERE id = ?`)
            .get(q.quoteId) as { text: string; furigana: string | null; note: string | null } | undefined
          const ann = db
            .prepare(`SELECT text_hash, note_hash FROM kindle_annotation WHERE media_id = ? AND fingerprint = ?`)
            .get(b.mediaId, q.fingerprint) as { text_hash: string; note_hash: string } | undefined
          if (!cur || !ann) continue
          quoteRepo.setTextAndNote(q.quoteId, {
            ...(q.setText ? { text: q.text } : {}),
            ...(q.setNote ? { note: q.note } : {})
          })
          db.prepare(
            `UPDATE kindle_annotation SET text_hash = ?, note_hash = ?, imported_at = datetime('now')
             WHERE media_id = ? AND fingerprint = ?`
          ).run(
            q.setText ? hashStored(q.text) : ann.text_hash,
            q.setNote ? hashStored(q.note) : ann.note_hash,
            b.mediaId,
            q.fingerprint
          )
          const after = db.prepare(`SELECT text, furigana, note FROM quote WHERE id = ?`).get(q.quoteId) as {
            text: string
            furigana: string | null
            note: string | null
          }
          undo.quotesUpdated.push({
            id: q.quoteId,
            mediaId: b.mediaId,
            fingerprint: q.fingerprint,
            prior: { ...cur, textHash: ann.text_hash, noteHash: ann.note_hash },
            after
          })
          result.quotesUpdated++
        }
      }

      if (want.reading.has(b.mediaId)) {
        for (const d of b.days) {
          const stored = db
            .prepare(
              `SELECT seconds, pages, checklist_log_id FROM kindle_reading_day WHERE media_id = ? AND day = ?`
            )
            .get(b.mediaId, d.day) as { seconds: number; pages: number; checklist_log_id: number | null } | undefined
          let logId: number | null = stored?.checklist_log_id ?? null
          let newLog: number | null = null
          if (d.credit && logId == null) {
            newLog = checklistRepo.logSession(SESSION_TASK, 'daily', b.mediaId, today, d.day, {
              keepStatus: true
            }).logId
            logId = newLog
            result.checklistCredits++
          }
          db.prepare(
            `INSERT INTO kindle_reading_day (media_id, day, seconds, pages, checklist_log_id)
             VALUES (?, ?, ?, ?, ?)
             ON CONFLICT(media_id, day) DO UPDATE SET
               seconds = MAX(kindle_reading_day.seconds, excluded.seconds),
               pages = MAX(kindle_reading_day.pages, excluded.pages),
               checklist_log_id = COALESCE(kindle_reading_day.checklist_log_id, excluded.checklist_log_id)`
          ).run(b.mediaId, d.day, d.seconds, d.pages, logId)
          undo.days.push({
            mediaId: b.mediaId,
            day: d.day,
            prior: stored ? { seconds: stored.seconds, pages: stored.pages, logId: stored.checklist_log_id } : null,
            logId: newLog
          })
          result.readingDays++
        }
      }
    }

    // Words: each lands once, in its deck, with the sentence and the book.
    const imported = importedVocabKeys()
    let inbox: number | null = null
    for (const w of words) {
      if (!want.words.has(w.key) || !w.importable || !w.meaning || imported.has(w.key)) continue
      let targetId: number
      let created: boolean
      if (w.kind === 'en') {
        const before = db
          .prepare('SELECT id FROM en_word WHERE word = ? AND meaning = ?')
          .get(w.word, w.meaning) as { id: number } | undefined
        targetId = englishRepo.saveWord({ word: w.word, meaning: w.meaning, pos: w.pos, example: w.context })
        created = !before
      } else {
        if (inbox == null) inbox = japaneseRepo.ensureMiningInbox().lessonId
        targetId = japaneseRepo.createCard(inbox, {
          front: w.word,
          reading: w.reading,
          back: w.meaning,
          exampleJp: w.context,
          notes: w.book ? `Looked up on the Kindle in ${w.book}` : 'Looked up on the Kindle'
        })
        created = true
      }
      db.prepare(`INSERT INTO kindle_vocab (word_key, kind, target_id) VALUES (?, ?, ?)`).run(w.key, w.kind, targetId)
      undo.words!.push({
        key: w.key,
        kind: w.kind,
        targetId,
        created,
        wrote: { front: w.word, back: w.meaning, extra: w.context }
      })
      result.wordsAdded++
    }

    const importId = Number(
      db
        .prepare(`INSERT INTO kindle_import (summary_json, undo_json) VALUES (?, ?)`)
        .run(JSON.stringify(result), JSON.stringify(undo)).lastInsertRowid
    )
    return { importId, ...result }
  })()
}

export function lastImport(): { id: number; importedAt: string; undone: boolean } | null {
  const r = getSqlite()
    .prepare(`SELECT id, imported_at, undone_at FROM kindle_import ORDER BY id DESC LIMIT 1`)
    .get() as { id: number; imported_at: string; undone_at: string | null } | undefined
  return r ? { id: r.id, importedAt: r.imported_at, undone: r.undone_at != null } : null
}

// Puts back what the newest import changed, item by item, and only where the
// item still holds what the import wrote: anything the user has changed since
// is kept and counted.
export function undoLast(): KindleUndoResult {
  const db = getSqlite()
  return db.transaction(() => {
    // Only the newest import, and only once.
    const row = db
      .prepare(`SELECT id, undo_json, undone_at FROM kindle_import ORDER BY id DESC LIMIT 1`)
      .get() as { id: number; undo_json: string; undone_at: string | null } | undefined
    if (!row || row.undone_at != null) throw new Error('There is no Kindle import to undo')
    const undo = JSON.parse(row.undo_json) as UndoData
    let restored = 0
    let kept = 0

    for (const d of [...undo.days].reverse()) {
      if (d.logId != null) {
        // The user already took this credit back by hand: keep the day's row,
        // whose credited mark stops a later import crediting it again.
        if (!db.prepare('SELECT 1 FROM checklist_log WHERE id = ?').get(d.logId)) {
          kept++
          continue
        }
        checklistRepo.undoLog(d.logId)
      }
      if (d.prior) {
        db.prepare(
          `UPDATE kindle_reading_day SET seconds = ?, pages = ?, checklist_log_id = ? WHERE media_id = ? AND day = ?`
        ).run(d.prior.seconds, d.prior.pages, d.prior.logId, d.mediaId, d.day)
      } else {
        db.prepare(`DELETE FROM kindle_reading_day WHERE media_id = ? AND day = ?`).run(d.mediaId, d.day)
      }
      restored++
    }

    for (const q of [...undo.quotesUpdated].reverse()) {
      const cur = db.prepare(`SELECT text, furigana, note FROM quote WHERE id = ?`).get(q.id) as
        | { text: string; furigana: string | null; note: string | null }
        | undefined
      if (!cur || cur.text !== q.after.text || cur.furigana !== q.after.furigana || cur.note !== q.after.note) {
        kept++
        continue
      }
      // Text and its readings go back only when the import changed the text.
      const textChanged = q.prior.text !== q.after.text
      quoteRepo.setTextAndNote(q.id, {
        ...(textChanged ? { text: q.prior.text, furigana: q.prior.furigana } : {}),
        note: q.prior.note
      })
      db.prepare(
        `UPDATE kindle_annotation SET text_hash = ?, note_hash = ? WHERE media_id = ? AND fingerprint = ?`
      ).run(q.prior.textHash, q.prior.noteHash, q.mediaId, q.fingerprint)
      restored++
    }

    for (const q of [...undo.quotesAdded].reverse()) {
      const cur = db
        .prepare(
          `SELECT q.text, q.note, q.locator, q.favorite, q.furigana, q.translation, q.media_id,
                  q.character_id, q.person_id, q.wrestler_id, q.speaker_name,
                  (SELECT COUNT(*) FROM quote_theme t WHERE t.quote_id = q.id) AS themes
           FROM quote q WHERE q.id = ?`
        )
        .get(q.id) as
        | {
            text: string
            note: string | null
            locator: string | null
            favorite: number
            furigana: string | null
            translation: string | null
            media_id: number | null
            character_id: number | null
            person_id: number | null
            wrestler_id: number | null
            speaker_name: string | null
            themes: number
          }
        | undefined
      // Already deleted by the user: the annotation row is now its tombstone
      // and stays, so the highlight is never offered again.
      if (!cur) {
        kept++
        continue
      }
      const untouched =
        storedForm(cur.text) === storedForm(q.text) &&
        storedForm(cur.note) === storedForm(q.note) &&
        (cur.locator ?? null) === (q.locator ?? null) &&
        cur.favorite === 0 &&
        cur.themes === 0 &&
        cur.furigana == null &&
        cur.translation == null &&
        cur.media_id === q.mediaId &&
        cur.character_id == null &&
        cur.person_id == null &&
        cur.wrestler_id == null &&
        cur.speaker_name == null
      if (!untouched) {
        kept++
        continue
      }
      // Forget the highlight so a later import offers it again, as if this
      // import had not happened.
      quoteRepo.remove(q.id)
      db.prepare(`DELETE FROM kindle_annotation WHERE media_id = ? AND fingerprint = ? AND quote_id = ?`).run(
        q.mediaId,
        q.fingerprint,
        q.id
      )
      restored++
    }

    // A word leaves its deck only if it is still unreviewed; its kindle_vocab
    // row goes with it, so a later import offers it again. A studied word is
    // kept, and so is its row.
    for (const w of [...(undo.words ?? [])].reverse()) {
      if (!w.created) {
        db.prepare('DELETE FROM kindle_vocab WHERE word_key = ?').run(w.key)
        restored++
        continue
      }
      // Still exactly as imported and never reviewed, in any direction.
      const row = (
        w.kind === 'en'
          ? db
              .prepare(`SELECT word AS front, meaning AS back, example AS extra, reps FROM en_word WHERE id = ?`)
              .get(w.targetId)
          : db
              .prepare(
                `SELECT front, back, example_jp AS extra,
                        reps + COALESCE((SELECT SUM(r.reps) FROM jp_card_review r WHERE r.card_id = jp_card.id), 0) AS reps
                 FROM jp_card WHERE id = ?`
              )
              .get(w.targetId)
      ) as { front: string; back: string; extra: string | null; reps: number } | undefined
      const changed =
        !!row &&
        !!w.wrote &&
        (row.front !== w.wrote.front || row.back !== w.wrote.back || (row.extra ?? null) !== (w.wrote.extra ?? null))
      if (row && (row.reps > 0 || changed)) {
        kept++
        continue
      }
      if (row) {
        if (w.kind === 'en') englishRepo.removeWord(w.targetId)
        else japaneseRepo.removeCard(w.targetId)
      }
      db.prepare('DELETE FROM kindle_vocab WHERE word_key = ?').run(w.key)
      restored++
    }

    for (const m of [...undo.media].reverse()) {
      const cur = tracking(m.id)
      if (!cur || cur.status !== m.after.status || cur.progress !== m.after.progress) {
        kept++
        continue
      }
      mediaRepo.update(m.id, { status: m.prior.status, progress: m.prior.progress })
      restored++
    }

    db.prepare(`UPDATE kindle_import SET undone_at = datetime('now') WHERE id = ?`).run(row.id)
    return { restored, kept }
  })()
}

export function bookReading(mediaId: number): KindleBookReading {
  const db = getSqlite()
  const sum = db
    .prepare(
      `SELECT COALESCE(SUM(seconds), 0) AS seconds, COUNT(*) AS days, MAX(day) AS lastDay
       FROM kindle_reading_day WHERE media_id = ?`
    )
    .get(mediaId) as { seconds: number; days: number; lastDay: string | null }
  const book = db
    .prepare(
      `SELECT device_path FROM kindle_book WHERE media_id = ? AND removed_at IS NULL
       ORDER BY id DESC LIMIT 1`
    )
    .get(mediaId) as { device_path: string | null } | undefined
  return {
    onDevice: !!book,
    devicePath: book?.device_path ?? null,
    seconds: sum.seconds,
    days: sum.days,
    lastDay: sum.lastDay
  }
}

// ---- Send to Kindle's ledger (kindle_send) ----

export interface SendRow {
  id: number
  mediaId: number | null
  title: string
  devicePath: string
  device: string | null
  bytes: number
  sha256: string
  partialMd5: string
  status: 'pending' | 'sent' | 'failed' | 'incomplete' | 'removed'
  error: string | null
  createdAt: string
}

const SEND_COLUMNS = `id, media_id AS mediaId, title, device_path AS devicePath, device, bytes, sha256,
  partial_md5 AS partialMd5, status, error, created_at AS createdAt`

// Written before the first byte goes out.
export function recordPendingSend(input: {
  mediaId: number | null
  title: string
  devicePath: string
  device: string | null
  bytes: number
  sha256: string
  partialMd5: string
}): number {
  return Number(
    getSqlite()
      .prepare(
        `INSERT INTO kindle_send (media_id, title, device_path, device, bytes, sha256, partial_md5, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`
      )
      .run(input.mediaId, input.title, input.devicePath, input.device, input.bytes, input.sha256, input.partialMd5)
      .lastInsertRowid
  )
}

// A verified upload: the ledger row settles, and a library book gets its
// 'sent' link, so the next check ties the device file to it with no
// suggestion step. A link the user already made for the same file is kept.
export function markSent(id: number): void {
  const db = getSqlite()
  db.transaction(() => {
    const row = db.prepare(`SELECT ${SEND_COLUMNS} FROM kindle_send WHERE id = ?`).get(id) as SendRow | undefined
    if (!row) return
    db.prepare(`UPDATE kindle_send SET status = 'sent', error = NULL, finished_at = datetime('now') WHERE id = ?`).run(id)
    const media =
      row.mediaId != null
        ? (db.prepare(`SELECT media_type FROM media_item WHERE id = ?`).get(row.mediaId) as
            | { media_type: string }
            | undefined)
        : undefined
    if (media?.media_type !== 'book') return
    db.prepare(
      `INSERT INTO kindle_book (partial_md5, media_id, device_path, size, origin)
       VALUES (?, ?, ?, ?, 'sent')
       ON CONFLICT(partial_md5) DO UPDATE SET
         media_id = COALESCE(kindle_book.media_id, excluded.media_id),
         device_path = excluded.device_path, size = excluded.size, removed_at = NULL`
    ).run(row.partialMd5, row.mediaId, row.devicePath, row.bytes)
  })()
}

// failed: nothing of it is on the device; incomplete: the cleanup failed and a
// partial copy may be there.
export function markSendFailed(id: number, status: 'failed' | 'incomplete', error: string): void {
  getSqlite()
    .prepare(`UPDATE kindle_send SET status = ?, error = ?, finished_at = datetime('now') WHERE id = ?`)
    .run(status, error.slice(0, 500), id)
}

export function markSendRemoved(id: number): void {
  getSqlite()
    .prepare(`UPDATE kindle_send SET status = 'removed', finished_at = datetime('now') WHERE id = ?`)
    .run(id)
}

// Uploads that may have left a partial file: settled 'incomplete', or still
// 'pending' (the app died mid-send). Never called while a send runs.
export function unfinishedSends(): SendRow[] {
  return getSqlite()
    .prepare(`SELECT ${SEND_COLUMNS} FROM kindle_send WHERE status IN ('pending', 'incomplete') ORDER BY id`)
    .all() as SendRow[]
}

export function sendRow(id: number): SendRow | null {
  return (
    (getSqlite().prepare(`SELECT ${SEND_COLUMNS} FROM kindle_send WHERE id = ?`).get(id) as SendRow | undefined) ??
    null
  )
}

export function recentSends(limit = 20): SendRow[] {
  return getSqlite()
    .prepare(`SELECT ${SEND_COLUMNS} FROM kindle_send ORDER BY id DESC LIMIT ?`)
    .all(limit) as SendRow[]
}

// A send after `id` to the same device path that may own the file there now:
// verified, or itself unfinished (its markSent may have failed). That file is
// the later send's, never an earlier unfinished one's.
export function laterSentTo(devicePath: string, id: number): boolean {
  return !!getSqlite()
    .prepare(
      `SELECT 1 FROM kindle_send WHERE device_path = ? AND id > ?
         AND status IN ('sent', 'pending', 'incomplete') LIMIT 1`
    )
    .get(devicePath, id)
}

// ---- vocabulary (kindle_vocab) ----

export function importedVocabKeys(): Set<string> {
  return new Set(
    (getSqlite().prepare('SELECT word_key FROM kindle_vocab').all() as Array<{ word_key: string }>).map(
      (r) => r.word_key
    )
  )
}

// Whether to leave a word out of a preview: imported before, or already in a
// deck under the same word (any meaning). The English deck is the user's own
// list and read whole once; Japanese fronts are sought one by one on their
// index, since the built-in decks make jp_card large. The caller stops asking
// once it has enough words.
export function vocabSkipper(): (c: { key: string; kind: VocabKind; word: string }) => boolean {
  const db = getSqlite()
  const imported = importedVocabKeys()
  const en = new Set(
    (db.prepare('SELECT DISTINCT lower(word) AS w FROM en_word').all() as Array<{ w: string }>).map((r) => r.w)
  )
  const jp = db.prepare('SELECT 1 FROM jp_card WHERE front = ? LIMIT 1')
  return (c) => imported.has(c.key) || (c.kind === 'en' ? en.has(c.word.toLowerCase()) : !!jp.get(c.word))
}

export function vocabSkipKeys(candidates: Array<{ key: string; kind: VocabKind; word: string }>): Set<string> {
  const skip = vocabSkipper()
  const out = importedVocabKeys()
  for (const c of candidates) if (skip(c)) out.add(c.key)
  return out
}

// After a whole check: a linked book whose file and fingerprint are both gone
// from the device is marked removed (the book page stops saying "On the
// Kindle"); one seen again is restored. Links are never deleted here.
export function reconcileOnDevice(seenMd5: Set<string>, seenPaths: Set<string>): void {
  const db = getSqlite()
  const rows = db.prepare(`SELECT partial_md5 AS md5, device_path AS path, removed_at FROM kindle_book`).all() as Array<{
    md5: string
    path: string | null
    removed_at: string | null
  }>
  const gone = db.prepare(`UPDATE kindle_book SET removed_at = datetime('now') WHERE partial_md5 = ?`)
  const back = db.prepare(`UPDATE kindle_book SET removed_at = NULL WHERE partial_md5 = ?`)
  db.transaction(() => {
    for (const r of rows) {
      const present = seenMd5.has(r.md5) || (r.path != null && seenPaths.has(r.path))
      if (!present && r.removed_at == null) gone.run(r.md5)
      else if (present && r.removed_at != null) back.run(r.md5)
    }
  })()
}
