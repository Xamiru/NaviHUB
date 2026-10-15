import { getSqlite } from '../db/connection'
import type { MediaType, SavedQuote, QuoteFilter, QuoteInput, QuoteSpeakerKind } from '@shared/types'

// The quote book (/quotes). Link ids are FK-less (see init.sql), so every read
// LEFT JOINs and falls back to the name snapshot taken at save time. VN notebook
// entries filed under 'quote' are unioned in read-only.

interface QuoteRow {
  id: number
  text: string
  furigana: string | null
  translation: string | null
  media_id: number | null
  character_id: number | null
  person_id: number | null
  wrestler_id: number | null
  speaker_name: string | null
  source_title: string | null
  locator: string | null
  note: string | null
  favorite: number
  origin: 'manual' | 'book' | 'video'
  created_at: string
  live_media_id: number | null
  media_type: MediaType | null
  media_title: string | null
  cover_path: string | null
  background_path: string | null
  live_speaker_id: number | null
  live_speaker_name: string | null
  speaker_image: string | null
}

interface NotebookRow {
  id: number
  body: string
  entry_date: string
  media_id: number
  media_type: MediaType
  media_title: string
  cover_path: string | null
  background_path: string | null
  node_title: string | null
}

const BACKGROUND_SQL = `(SELECT i.file_path FROM media_image i
  WHERE i.media_id = m.id AND i.is_background = 1 LIMIT 1)`

const SELECT_QUOTES = `
  SELECT q.*, m.id AS live_media_id, m.media_type, m.title AS media_title,
         m.cover_path, ${BACKGROUND_SQL} AS background_path,
         COALESCE(c.id, p.id, w.id) AS live_speaker_id,
         COALESCE(c.name, p.name, w.name) AS live_speaker_name,
         COALESCE(c.image_path, p.photo_path, w.photo_path) AS speaker_image
  FROM quote q
  LEFT JOIN media_item m ON m.id = q.media_id
  LEFT JOIN character c ON c.id = q.character_id
  LEFT JOIN person p ON p.id = q.person_id
  LEFT JOIN wrestling_wrestler w ON w.id = q.wrestler_id`

function speakerKindOf(r: QuoteRow): QuoteSpeakerKind | null {
  if (r.character_id != null) return 'character'
  if (r.person_id != null) return 'person'
  if (r.wrestler_id != null) return 'wrestler'
  return null
}

function themesByQuote(ids: number[]): Map<number, string[]> {
  const out = new Map<number, string[]>()
  if (!ids.length) return out
  const wanted = new Set(ids)
  // The theme table is small and personal; reading it whole avoids an IN list.
  const rows = getSqlite()
    .prepare('SELECT quote_id, name FROM quote_theme ORDER BY name COLLATE NOCASE')
    .all() as { quote_id: number; name: string }[]
  for (const r of rows) {
    if (!wanted.has(r.quote_id)) continue
    const list = out.get(r.quote_id) ?? []
    list.push(r.name)
    out.set(r.quote_id, list)
  }
  return out
}

function toQuote(r: QuoteRow, themes: string[]): SavedQuote {
  const speakerKind = speakerKindOf(r)
  return {
    key: `q-${r.id}`,
    id: r.id,
    origin: r.origin,
    text: r.text,
    furigana: r.furigana,
    translation: r.translation,
    locator: r.locator,
    note: r.note,
    favorite: r.favorite === 1,
    themes,
    mediaId: r.live_media_id,
    mediaType: r.media_type,
    sourceTitle: r.media_title ?? r.source_title,
    coverPath: r.cover_path,
    backgroundPath: r.background_path,
    speakerKind,
    speakerId: r.live_speaker_id,
    speakerName: r.live_speaker_name ?? r.speaker_name,
    speakerImagePath: r.speaker_image,
    createdAt: r.created_at
  }
}

function notebookQuote(r: NotebookRow): SavedQuote {
  return {
    key: `vn-${r.id}`,
    id: null,
    origin: 'vnNotebook',
    text: r.body,
    furigana: null,
    translation: null,
    locator: r.node_title,
    note: null,
    favorite: false,
    themes: [],
    mediaId: r.media_id,
    mediaType: r.media_type,
    sourceTitle: r.media_title,
    coverPath: r.cover_path,
    backgroundPath: r.background_path,
    speakerKind: null,
    speakerId: null,
    speakerName: null,
    speakerImagePath: null,
    createdAt: r.entry_date
  }
}

// Newest first. A speaker filter excludes notebook entries, which have none.
export function list(filter: QuoteFilter = {}): SavedQuote[] {
  const db = getSqlite()
  const where: string[] = []
  const args: number[] = []
  if (filter.mediaId != null) {
    where.push('q.media_id = ?')
    args.push(filter.mediaId)
  }
  if (filter.characterId != null) {
    where.push('q.character_id = ?')
    args.push(filter.characterId)
  }
  if (filter.personId != null) {
    where.push('q.person_id = ?')
    args.push(filter.personId)
  }
  if (filter.wrestlerId != null) {
    where.push('q.wrestler_id = ?')
    args.push(filter.wrestlerId)
  }
  const rows = db
    .prepare(
      `${SELECT_QUOTES} ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
       ORDER BY q.created_at DESC, q.id DESC`
    )
    .all(...args) as QuoteRow[]
  const themes = themesByQuote(rows.map((r) => r.id))
  const quotes = rows.map((r) => toQuote(r, themes.get(r.id) ?? []))

  const speakerFilter =
    filter.characterId != null || filter.personId != null || filter.wrestlerId != null
  if (!speakerFilter) {
    const notebook = db
      .prepare(
        `SELECT n.id, n.body, n.entry_date, m.id AS media_id, m.media_type,
                m.title AS media_title, m.cover_path, ${BACKGROUND_SQL} AS background_path,
                r.title AS node_title
         FROM vn_notebook n
         JOIN media_item m ON m.id = n.media_id
         LEFT JOIN vn_reading_node r ON r.id = n.node_id
         WHERE n.category = 'quote' ${filter.mediaId != null ? 'AND n.media_id = ?' : ''}`
      )
      .all(...(filter.mediaId != null ? [filter.mediaId] : [])) as NotebookRow[]
    quotes.push(...notebook.map(notebookQuote))
    // A notebook entry has a date only ('YYYY-MM-DD'), a saved quote a time
    // too. Compared as plain strings the date would sort below every quote of
    // its own day, so it counts as the end of that day instead.
    const at = (q: SavedQuote) => (q.createdAt.length <= 10 ? `${q.createdAt} ~` : q.createdAt)
    quotes.sort((a, b) => (at(a) < at(b) ? 1 : at(a) > at(b) ? -1 : 0))
  }
  return quotes
}

export function get(id: number): SavedQuote | null {
  const row = getSqlite().prepare(`${SELECT_QUOTES} WHERE q.id = ?`).get(id) as
    | QuoteRow
    | undefined
  if (!row) return null
  return toQuote(row, themesByQuote([id]).get(id) ?? [])
}

function clean(value: string | null | undefined, max: number): string | null {
  const v = (value ?? '').trim()
  return v ? v.slice(0, max) : null
}

// Theme names: trimmed, case-insensitively unique, empty names dropped.
export function normalizeThemes(names: string[] | undefined): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of names ?? []) {
    const name = raw.trim().replace(/\s+/g, ' ').slice(0, 60)
    const key = name.toLowerCase()
    if (!name || seen.has(key)) continue
    seen.add(key)
    out.push(name)
  }
  return out
}

const SPEAKER_TABLE: Record<QuoteSpeakerKind, string> = {
  character: 'character',
  person: 'person',
  wrestler: 'wrestling_wrestler'
}

// Creates (no id) or replaces a quote. Linked names are snapshotted from the
// live rows so the quote keeps them if the title or speaker later disappears.
export function save(input: QuoteInput, id?: number | null): number {
  const db = getSqlite()
  const text = clean(input.text, 4000)
  if (!text) throw new Error('A quote needs some text')

  let mediaId = input.mediaId ?? null
  let sourceTitle = clean(input.sourceTitle, 300)
  if (mediaId != null) {
    const m = db.prepare('SELECT title FROM media_item WHERE id = ?').get(mediaId) as
      | { title: string }
      | undefined
    if (m) sourceTitle = m.title
    else mediaId = null
  }

  const kind = input.speakerKind ?? null
  if (kind && !Object.prototype.hasOwnProperty.call(SPEAKER_TABLE, kind)) {
    throw new Error(`Unknown quote speaker kind: ${String(kind)}`)
  }
  let speakerId = kind ? (input.speakerId ?? null) : null
  let speakerName = clean(input.speakerName, 300)
  if (kind && speakerId != null) {
    const s = db.prepare(`SELECT name FROM ${SPEAKER_TABLE[kind]} WHERE id = ?`).get(speakerId) as
      | { name: string }
      | undefined
    if (s) speakerName = s.name
    else speakerId = null
  }

  const values = {
    text,
    furigana: clean(input.furigana, 12000),
    translation: clean(input.translation, 4000),
    media_id: mediaId,
    character_id: kind === 'character' ? speakerId : null,
    person_id: kind === 'person' ? speakerId : null,
    wrestler_id: kind === 'wrestler' ? speakerId : null,
    speaker_name: speakerName,
    source_title: sourceTitle,
    locator: clean(input.locator, 300),
    note: clean(input.note, 4000),
    favorite: input.favorite ? 1 : 0,
    origin: input.origin ?? 'manual'
  }
  const themes = normalizeThemes(input.themes)

  return db.transaction(() => {
    let quoteId: number
    if (id != null) {
      const existing = db.prepare('SELECT origin FROM quote WHERE id = ?').get(id) as
        | { origin: QuoteRow['origin'] }
        | undefined
      if (!existing) throw new Error('That quote no longer exists')
      db.prepare(
        `UPDATE quote SET text=@text, furigana=@furigana, translation=@translation,
           media_id=@media_id, character_id=@character_id, person_id=@person_id,
           wrestler_id=@wrestler_id, speaker_name=@speaker_name, source_title=@source_title,
           locator=@locator, note=@note, favorite=@favorite, updated_at=datetime('now')
         WHERE id=@id`
      ).run({ ...values, id })
      quoteId = id
    } else {
      quoteId = Number(
        db
          .prepare(
            `INSERT INTO quote (text, furigana, translation, media_id, character_id, person_id,
               wrestler_id, speaker_name, source_title, locator, note, favorite, origin)
             VALUES (@text, @furigana, @translation, @media_id, @character_id, @person_id,
               @wrestler_id, @speaker_name, @source_title, @locator, @note, @favorite, @origin)`
          )
          .run(values).lastInsertRowid
      )
    }
    db.prepare('DELETE FROM quote_theme WHERE quote_id = ?').run(quoteId)
    const insertTheme = db.prepare('INSERT INTO quote_theme (quote_id, name) VALUES (?, ?)')
    for (const name of themes) insertTheme.run(quoteId, name)
    return quoteId
  })()
}

export function setFavorite(id: number, favorite: boolean): void {
  getSqlite()
    .prepare(`UPDATE quote SET favorite = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(favorite ? 1 : 0, id)
}

export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM quote WHERE id = ?').run(id)
}
