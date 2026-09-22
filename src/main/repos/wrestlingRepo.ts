import { getSqlite } from '../db/connection'
import { removeEntityFromLists } from './listRepo'
import { removeEntityFromTierLists } from './tierListRepo'
import type {
  WrestlingEvent,
  WrestlingHonourGroup,
  WrestlingRecord,
  WrestlingWrestlerDetail,
  WrestlingEventDetail,
  WrestlingEventFilter,
  WrestlingFavorites,
  WrestlingMatch,
  WrestlingFavoriteKind,
  WrestlingLinkTarget,
  WrestlingLooseMatchInput,
  WrestlingMatchWithEvent,
  WrestlingOutcome,
  WrestlingOverview,
  WrestlingParticipant,
  WrestlingPromotionId,
  WrestlingVideo,
  WrestlingWrestler
} from '@shared/types'

// SQL for the wrestling section. Raw prepared statements via getSqlite() (the
// house style — repos never use the Drizzle query builder). No fs, no network:
// the importer next door does IO and hands finished rows in here.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>

// ---------------------------------------------------------------------------
// Import-side writes
// ---------------------------------------------------------------------------

export interface SaveParticipant {
  wikiTitle: string | null // canonical article title, or null for an unlinked name
  name: string
  side: number
  won: boolean
  isChampion: boolean
  teamName: string | null
}

export interface SaveMatch {
  sortOrder: number
  title: string
  resultText: string | null
  stipulation: string | null
  championship: string | null
  durationSeconds: number | null
  outcome: WrestlingOutcome
  method: string | null
  cardSlot: 'pre' | 'dark' | null
  cardLabel: string | null
  participants: SaveParticipant[]
}

export interface SaveEvent {
  promotion: WrestlingPromotionId
  name: string
  wikiTitle: string
  series?: string | null
  eventDate?: string | null
  venue?: string | null
  city?: string | null
  attendance?: number | null
  buyrate?: string | null
  tagline?: string | null
  posterPath?: string | null
  lead?: string | null
  matches: SaveMatch[]
}

// Finds (or creates) the wrestler row for a canonical article title, recording
// the alias that led here. Aliases are why this can't just be a lookup on
// wiki_title: a card may link [[Steve Austin]] while the article is
// [[Stone Cold Steve Austin]], and both must land on one row.
function resolveWrestler(wikiTitle: string, name: string): number {
  const db = getSqlite()
  // An alias hop first: the importer resolves redirects ahead of the write, so
  // by here the canonical title is usually already known locally.
  const canonical = canonicalTitle(wikiTitle)
  const existing = db
    .prepare('SELECT id FROM wrestling_wrestler WHERE wiki_title = ?')
    .get(canonical) as Row | undefined
  if (existing) return existing.id as number

  const info = db
    .prepare('INSERT INTO wrestling_wrestler (name, wiki_title) VALUES (?, ?)')
    .run(name, canonical)
  return Number(info.lastInsertRowid)
}

// Records requested-title -> canonical-title for events AND wrestlers alike, so
// later imports resolve locally instead of re-asking the API.
export function recordAliases(aliases: Map<string, string>): void {
  const db = getSqlite()
  const ins = db.prepare(
    'INSERT OR REPLACE INTO wrestling_alias (alias_title, canonical_title) VALUES (?, ?)'
  )
  db.transaction(() => {
    for (const [from, to] of aliases) {
      if (from === to || !from || !to) continue
      ins.run(from, to)
    }
  })()
}

export function canonicalTitle(title: string): string {
  const row = getSqlite()
    .prepare('SELECT canonical_title FROM wrestling_alias WHERE alias_title = ?')
    .get(title) as Row | undefined
  return (row?.canonical_title as string) ?? title
}

// Which of these titles we already know a canonical form for — lets the
// importer ask the API only about genuinely new ones.
export function knownAliases(titles: string[]): Map<string, string> {
  const out = new Map<string, string>()
  if (!titles.length) return out
  const db = getSqlite()
  for (let i = 0; i < titles.length; i += 400) {
    const slice = titles.slice(i, i + 400)
    const holes = slice.map(() => '?').join(', ')
    // A title we already stored as a wrestler IS its own canonical form.
    for (const r of db
      .prepare(
        `SELECT alias_title AS a, canonical_title AS c FROM wrestling_alias
          WHERE alias_title IN (${holes})
         UNION ALL
         SELECT wiki_title AS a, wiki_title AS c FROM wrestling_wrestler
          WHERE wiki_title IN (${holes})`
      )
      .all(...slice, ...slice) as Row[]) {
      if (!out.has(r.a as string)) out.set(r.a as string, r.c as string)
    }
  }
  return out
}

// Writes one event and its whole card in a single transaction. Re-import is
// AUTHORITATIVE for canonical fields and preserves everything personal:
// favorite/local_dir on the event, and — via a snapshot taken before the card
// is replaced — the star ratings and hearts on individual matches (the
// themes.ts favorites-survive-a-refresh precedent).
//
// Matches are keyed for that restore by their denormalized title, not by
// sort_order: an editor inserting a forgotten dark match at position 1 would
// otherwise shift every rating on the card by one.
export function saveEvent(input: SaveEvent): number {
  const db = getSqlite()
  return db.transaction((): number => {
    const existing = db
      .prepare('SELECT id FROM wrestling_event WHERE wiki_title = ?')
      .get(input.wikiTitle) as Row | undefined

    let eventId: number
    if (existing) {
      eventId = existing.id as number
      db.prepare(
        `UPDATE wrestling_event
            SET promotion = ?, name = ?, series = COALESCE(?, series),
                event_date = COALESCE(?, event_date), venue = COALESCE(?, venue),
                city = COALESCE(?, city), attendance = COALESCE(?, attendance),
                buyrate = COALESCE(?, buyrate), tagline = COALESCE(?, tagline),
                poster_path = COALESCE(?, poster_path), lead = COALESCE(?, lead),
                updated_at = datetime('now')
          WHERE id = ?`
      ).run(
        input.promotion,
        input.name,
        input.series ?? null,
        input.eventDate ?? null,
        input.venue ?? null,
        input.city ?? null,
        input.attendance ?? null,
        input.buyrate ?? null,
        input.tagline ?? null,
        input.posterPath ?? null,
        input.lead ?? null,
        eventId
      )
    } else {
      const info = db
        .prepare(
          `INSERT INTO wrestling_event
             (promotion, name, wiki_title, series, event_date, venue, city,
              attendance, buyrate, tagline, poster_path, lead)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          input.promotion,
          input.name,
          input.wikiTitle,
          input.series ?? null,
          input.eventDate ?? null,
          input.venue ?? null,
          input.city ?? null,
          input.attendance ?? null,
          input.buyrate ?? null,
          input.tagline ?? null,
          input.posterPath ?? null,
          input.lead ?? null
        )
      eventId = Number(info.lastInsertRowid)
    }

    // Existing rows are REUSED rather than replaced. A delete-and-reinsert
    // would hand every match a fresh AUTOINCREMENT id, and list_item holds
    // those ids with no FK — so a re-import would silently empty every
    // "Top 25 matches" list while leaving its item count behind. Keeping the
    // id also keeps ratings, hearts and the attached-video link without any
    // restore step.
    //
    // Old rows are matched to new ones by title, held in a QUEUE per title so a
    // card with two identically-titled matches (a rematch, or two cells that
    // fell back to the same prose) consumes one each instead of cloning one
    // row's rating onto both. Title rather than sort_order because an editor
    // inserting a forgotten dark match at position 1 would otherwise shift
    // every rating on the card by one.
    const pool = new Map<string, number[]>()
    for (const r of db
      .prepare(
        'SELECT id, title FROM wrestling_match WHERE event_id = ? ORDER BY sort_order, id'
      )
      .all(eventId) as Row[]) {
      const arr = pool.get(r.title as string) ?? []
      arr.push(r.id as number)
      pool.set(r.title as string, arr)
    }
    const reused = new Set<number>()

    const insMatch = db.prepare(
      `INSERT INTO wrestling_match
         (event_id, sort_order, title, result_text, stipulation, championship,
          duration_seconds, outcome, method, card_slot, card_label)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    const updMatch = db.prepare(
      `UPDATE wrestling_match
          SET sort_order = ?, result_text = ?, stipulation = ?, championship = ?,
              duration_seconds = ?, outcome = ?, method = ?, card_slot = ?, card_label = ?,
              updated_at = datetime('now')
        WHERE id = ?`
    )
    const insPart = db.prepare(
      `INSERT INTO wrestling_match_participant
         (match_id, wrestler_id, side, won, is_champion, team_name, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )

    for (const m of input.matches) {
      const queue = pool.get(m.title)
      const existingId = queue?.shift() ?? null
      let matchId: number
      if (existingId != null) {
        updMatch.run(
          m.sortOrder,
          m.resultText,
          m.stipulation,
          m.championship,
          m.durationSeconds,
          m.outcome,
          m.method,
          m.cardSlot,
          m.cardLabel ?? null,
          existingId
        )
        matchId = existingId
        reused.add(existingId)
        db.prepare('DELETE FROM wrestling_match_participant WHERE match_id = ?').run(matchId)
      } else {
        matchId = Number(
          insMatch.run(
            eventId,
            m.sortOrder,
            m.title,
            m.resultText,
            m.stipulation,
            m.championship,
            m.durationSeconds,
            m.outcome,
            m.method,
            m.cardSlot,
            m.cardLabel ?? null
          ).lastInsertRowid
        )
      }
      let order = 0
      for (const p of m.participants) {
        // A participant with no article has no row to link to; the name is
        // already carried by the match title, so the card still reads right.
        if (!p.wikiTitle) continue
        const wrestlerId = resolveWrestler(p.wikiTitle, p.name)
        insPart.run(
          matchId,
          wrestlerId,
          p.side,
          p.won ? 1 : 0,
          p.isChampion ? 1 : 0,
          p.teamName,
          order++
        )
      }
    }

    // Anything the card no longer has goes, personal layer and all — the match
    // is genuinely gone from the article.
    for (const ids of pool.values()) {
      for (const id of ids) {
        if (!reused.has(id)) {
          removeMatchFromCollections(id)
          db.prepare('DELETE FROM wrestling_match WHERE id = ?').run(id)
        }
      }
    }
    return eventId
  })()
}

// Resolves through the alias memo first: category members are frequently
// redirects, and events are stored under their POST-redirect canonical title —
// so a raw comparison would re-fetch every redirect-titled event on every run.
export function eventExists(wikiTitle: string): boolean {
  return !!getSqlite()
    .prepare('SELECT 1 FROM wrestling_event WHERE wiki_title = ?')
    .get(canonicalTitle(wikiTitle))
}

// Wrestlers created from a card link but never fetched (detail_fetched_at is
// NULL). The import's second pass drains these — without it every wrestler page
// renders an empty photo and no bio.
export function stubWrestlers(limit = 500): { id: number; wikiTitle: string }[] {
  return (
    getSqlite()
      .prepare(
        `SELECT id, wiki_title FROM wrestling_wrestler
          WHERE detail_fetched_at IS NULL AND wiki_title IS NOT NULL
          ORDER BY id LIMIT ?`
      )
      .all(limit) as Row[]
  ).map((r) => ({ id: r.id as number, wikiTitle: r.wiki_title as string }))
}

export interface SaveWrestlerDetail {
  wikiTitle: string
  realName?: string | null
  birthDate?: string | null
  debutYear?: number | null
  billedFrom?: string | null
  height?: string | null
  photoPath?: string | null
  bio?: string | null
}

export interface SaveWrestlerDetailWithHonours extends SaveWrestlerDetail {
  honours: WrestlingHonourGroup[]
}

// Canonical fields only — `favorite` is never touched, and COALESCE keeps what
// we already had when a re-fetch comes back thinner.
export function saveWrestlerDetails(rows: SaveWrestlerDetail[]): number {
  const db = getSqlite()
  const upd = db.prepare(
    `UPDATE wrestling_wrestler
        SET real_name = COALESCE(?, real_name), birth_date = COALESCE(?, birth_date),
            debut_year = COALESCE(?, debut_year), billed_from = COALESCE(?, billed_from),
            height = COALESCE(?, height), photo_path = COALESCE(?, photo_path),
            bio = COALESCE(?, bio),
            detail_fetched_at = datetime('now'), updated_at = datetime('now')
      WHERE wiki_title = ?`
  )
  return db.transaction(() => {
    let n = 0
    for (const r of rows) {
      n += upd.run(
        r.realName ?? null,
        r.birthDate ?? null,
        r.debutYear ?? null,
        r.billedFrom ?? null,
        r.height ?? null,
        r.photoPath ?? null,
        r.bio ?? null,
        r.wikiTitle
      ).changes
    }
    return n
  })()
}

// Marks a stub as looked-at even though the article yielded nothing, so a
// red-linked or article-less wrestler isn't retried on every single run.
// Replaced wholesale per wrestler — canonical wiki data with nothing personal
// attached, so there is nothing to preserve.
export function saveHonours(wrestlerId: number, groups: { org: string; items: string[] }[]): void {
  const db = getSqlite()
  const ins = db.prepare(
    'INSERT INTO wrestling_honour (wrestler_id, org, title, sort_order) VALUES (?, ?, ?, ?)'
  )
  db.transaction(() => {
    db.prepare('DELETE FROM wrestling_honour WHERE wrestler_id = ?').run(wrestlerId)
    let order = 0
    for (const g of groups) for (const t of g.items) ins.run(wrestlerId, g.org, t, order++)
  })()
}

export function markWrestlersChecked(wikiTitles: string[]): void {
  if (!wikiTitles.length) return
  const db = getSqlite()
  const upd = db.prepare(
    `UPDATE wrestling_wrestler SET detail_fetched_at = datetime('now')
      WHERE wiki_title = ? AND detail_fetched_at IS NULL`
  )
  db.transaction(() => {
    for (const t of wikiTitles) upd.run(t)
  })()
}

// One fetched Wikipedia batch is one fact: profile fields, honours, and the
// "checked" watermark either all land or none do. That keeps a mid-write
// failure retriable instead of leaving a permanently half-filled wrestler.
export function saveWrestlerDetailBatch(
  rows: SaveWrestlerDetailWithHonours[],
  checkedWikiTitles: string[]
): number {
  if (!checkedWikiTitles.length) return 0
  const db = getSqlite()
  const upd = db.prepare(
    `UPDATE wrestling_wrestler
        SET real_name = COALESCE(?, real_name), birth_date = COALESCE(?, birth_date),
            debut_year = COALESCE(?, debut_year), billed_from = COALESCE(?, billed_from),
            height = COALESCE(?, height), photo_path = COALESCE(?, photo_path),
            bio = COALESCE(?, bio), updated_at = datetime('now')
      WHERE wiki_title = ?`
  )
  const wrestlerId = db.prepare('SELECT id FROM wrestling_wrestler WHERE wiki_title = ?')
  const clearHonours = db.prepare('DELETE FROM wrestling_honour WHERE wrestler_id = ?')
  const insertHonour = db.prepare(
    'INSERT INTO wrestling_honour (wrestler_id, org, title, sort_order) VALUES (?, ?, ?, ?)'
  )
  const markChecked = db.prepare(
    `UPDATE wrestling_wrestler SET detail_fetched_at = datetime('now')
      WHERE wiki_title = ?`
  )

  return db.transaction(() => {
    let saved = 0
    for (const row of rows) {
      saved += upd.run(
        row.realName ?? null,
        row.birthDate ?? null,
        row.debutYear ?? null,
        row.billedFrom ?? null,
        row.height ?? null,
        row.photoPath ?? null,
        row.bio ?? null,
        row.wikiTitle
      ).changes
      const found = wrestlerId.get(row.wikiTitle) as Row | undefined
      if (!found) continue
      clearHonours.run(found.id)
      let order = 0
      for (const group of row.honours) {
        for (const title of group.items) insertHonour.run(found.id, group.org, title, order++)
      }
    }
    for (const title of checkedWikiTitles) markChecked.run(title)
    return saved
  })()
}

// A refresh re-opens only wrestlers referenced by the selected promotions.
// If the run stops, remaining NULL markers make the next run resume safely.
export function resetWrestlerDetails(promotions: WrestlingPromotionId[]): number {
  if (!promotions.length) return 0
  const placeholders = promotions.map(() => '?').join(', ')
  return getSqlite()
    .prepare(
      `UPDATE wrestling_wrestler SET detail_fetched_at = NULL
        WHERE id IN (
          SELECT DISTINCT p.wrestler_id
            FROM wrestling_match_participant p
            JOIN wrestling_match m ON m.id = p.match_id
            JOIN wrestling_event e ON e.id = m.event_id
           WHERE e.promotion IN (${placeholders})
        )`
    )
    .run(...promotions).changes
}

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

function mapEvent(r: Row): WrestlingEvent {
  return {
    id: r.id,
    promotion: r.promotion,
    name: r.name,
    wikiTitle: r.wiki_title ?? null,
    series: r.series ?? null,
    eventDate: r.event_date ?? null,
    venue: r.venue ?? null,
    city: r.city ?? null,
    attendance: r.attendance ?? null,
    buyrate: r.buyrate ?? null,
    tagline: r.tagline ?? null,
    posterPath: r.poster_path ?? null,
    lead: r.lead ?? null,
    localDir: r.local_dir ?? null,
    favorite: !!r.favorite,
    matchCount: r.match_count ?? 0,
    videoCount: r.video_count ?? 0
  }
}

// List views never need the multi-KB `lead` prose — only the detail page does,
// and shipping it per row turned a 40-result picker query into megabytes over
// IPC. getEvent selects e.* separately.
const EVENT_SELECT = `
  SELECT e.id, e.promotion, e.name, e.wiki_title, e.series, e.event_date, e.venue,
         e.city, e.attendance, e.buyrate, e.tagline, e.poster_path, e.local_dir,
         e.favorite, NULL AS lead,
         (SELECT COUNT(*) FROM wrestling_match m WHERE m.event_id = e.id)  AS match_count,
         (SELECT COUNT(*) FROM wrestling_video v WHERE v.event_id = e.id)  AS video_count
    FROM wrestling_event e`

const SORT_SQL: Record<NonNullable<WrestlingEventFilter['sort']>, string> = {
  date: 'e.event_date DESC, e.id DESC',
  dateAsc: 'e.event_date ASC, e.id ASC',
  name: 'e.name COLLATE NOCASE ASC',
  // Highest personally-rated card first; unrated events sink.
  rating: '(SELECT AVG(m.rating) FROM wrestling_match m WHERE m.event_id = e.id) DESC NULLS LAST'
}

export function listEvents(filter: WrestlingEventFilter = {}): WrestlingEvent[] {
  const where: string[] = []
  const params: unknown[] = []
  if (filter.promotion) {
    where.push('e.promotion = ?')
    params.push(filter.promotion)
  }
  if (filter.search?.trim()) {
    where.push('e.name LIKE ?')
    params.push(`%${filter.search.trim()}%`)
  }
  if (filter.yearFrom != null) {
    where.push("CAST(substr(e.event_date, 1, 4) AS INTEGER) >= ?")
    params.push(filter.yearFrom)
  }
  if (filter.yearTo != null) {
    where.push("CAST(substr(e.event_date, 1, 4) AS INTEGER) <= ?")
    params.push(filter.yearTo)
  }
  if (filter.favoriteOnly) where.push('e.favorite = 1')
  if (filter.ownedOnly) {
    where.push('EXISTS (SELECT 1 FROM wrestling_video v WHERE v.event_id = e.id)')
  }
  // Always bounded: WWE alone runs to ~1,000 events and the pickers only ever
  // show a page of them.
  const limit = Math.max(1, Math.min(filter.limit ?? 2000, 5000))
  const sql = `${EVENT_SELECT}
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY ${SORT_SQL[filter.sort ?? 'date']}
    LIMIT ? OFFSET ?`
  return (
    getSqlite()
      .prepare(sql)
      .all(...params, limit, Math.max(0, filter.offset ?? 0)) as Row[]
  ).map(mapEvent)
}

function participantsFor(matchIds: number[]): Map<number, WrestlingParticipant[]> {
  const out = new Map<number, WrestlingParticipant[]>()
  if (!matchIds.length) return out
  const holes = matchIds.map(() => '?').join(', ')
  const rows = getSqlite()
    .prepare(
      `SELECT p.*, w.name AS wrestler_name
         FROM wrestling_match_participant p
         JOIN wrestling_wrestler w ON w.id = p.wrestler_id
        WHERE p.match_id IN (${holes})
        ORDER BY p.side ASC, p.sort_order ASC`
    )
    .all(...matchIds) as Row[]
  for (const r of rows) {
    const arr = out.get(r.match_id) ?? []
    arr.push({
      wrestlerId: r.wrestler_id,
      name: r.wrestler_name,
      side: r.side,
      won: !!r.won,
      isChampion: !!r.is_champion,
      teamName: r.team_name ?? null,
      sortOrder: r.sort_order
    })
    out.set(r.match_id, arr)
  }
  return out
}

function mapMatch(r: Row, parts: Map<number, WrestlingParticipant[]>): WrestlingMatch {
  return {
    id: r.id,
    eventId: (r.event_id ?? null) as number | null,
    sortOrder: r.sort_order,
    title: r.title,
    resultText: r.result_text ?? null,
    stipulation: r.stipulation ?? null,
    championship: r.championship ?? null,
    durationSeconds: r.duration_seconds ?? null,
    outcome: r.outcome,
    method: (r.method ?? null) as string | null,
    cardSlot: (r.card_slot ?? null) as WrestlingMatch['cardSlot'],
    cardLabel: (r.card_label ?? null) as string | null,
    showLabel: (r.show_label ?? null) as string | null,
    matchDate: (r.match_date ?? null) as string | null,
    rating: r.rating ?? null,
    favorite: !!r.favorite,
    videoId: r.video_id ?? null,
    participants: parts.get(r.id) ?? []
  }
}

function mapVideo(r: Row): WrestlingVideo {
  return {
    id: r.id,
    eventId: (r.event_id ?? null) as number | null,
    filePath: r.file_path,
    title: r.title,
    number: r.number ?? null,
    sortOrder: r.sort_order,
    duration: r.duration ?? null,
    width: r.width ?? null,
    height: r.height ?? null,
    videoCodec: r.video_codec ?? null,
    audioCodec: r.audio_codec ?? null,
    container: r.container ?? null,
    playability: r.playability ?? null,
    resumeSeconds: r.resume_seconds ?? null,
    watchedAt: r.watched_at ?? null
  }
}

export function getEvent(id: number): WrestlingEventDetail | null {
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT e.*,
              (SELECT COUNT(*) FROM wrestling_match m WHERE m.event_id = e.id) AS match_count,
              (SELECT COUNT(*) FROM wrestling_video v WHERE v.event_id = e.id) AS video_count
         FROM wrestling_event e WHERE e.id = ?`
    )
    .get(id) as Row | undefined
  if (!row) return null
  const matchRows = db
    .prepare('SELECT * FROM wrestling_match WHERE event_id = ? ORDER BY sort_order ASC, id ASC')
    .all(id) as Row[]
  const parts = participantsFor(matchRows.map((m) => m.id as number))
  const videos = db
    .prepare('SELECT * FROM wrestling_video WHERE event_id = ? ORDER BY sort_order ASC, id ASC')
    .all(id) as Row[]
  return {
    ...mapEvent(row),
    matches: matchRows.map((m) => mapMatch(m, parts)),
    videos: videos.map(mapVideo)
  }
}

function mapWrestler(r: Row): WrestlingWrestler {
  return {
    id: r.id,
    name: r.name,
    wikiTitle: r.wiki_title ?? null,
    realName: r.real_name ?? null,
    birthDate: r.birth_date ?? null,
    debutYear: r.debut_year ?? null,
    billedFrom: r.billed_from ?? null,
    height: r.height ?? null,
    photoPath: r.photo_path ?? null,
    bio: r.bio ?? null,
    detailFetchedAt: r.detail_fetched_at ?? null,
    favorite: !!r.favorite,
    matchCount: r.match_count ?? 0
  }
}

export function honoursFor(wrestlerId: number): WrestlingHonourGroup[] {
  const rows = getSqlite()
    .prepare(
      'SELECT org, title FROM wrestling_honour WHERE wrestler_id = ? ORDER BY sort_order, id'
    )
    .all(wrestlerId) as Row[]
  const out: WrestlingHonourGroup[] = []
  for (const r of rows) {
    const last = out[out.length - 1]
    if (last && last.org === r.org) last.items.push(r.title as string)
    else out.push({ org: r.org as string, items: [r.title as string] })
  }
  return out
}

// Career record over the matches we hold. `won` is only meaningful on a decided
// match, so draws and no-contests are counted apart rather than as losses.
export function recordFor(wrestlerId: number): WrestlingRecord {
  const r = getSqlite()
    .prepare(
      `SELECT
         SUM(CASE WHEN m.outcome = 'decision' AND p.won = 1 THEN 1 ELSE 0 END) AS wins,
         SUM(CASE WHEN m.outcome = 'decision' AND p.won = 0 THEN 1 ELSE 0 END) AS losses,
         SUM(CASE WHEN m.outcome <> 'decision' THEN 1 ELSE 0 END)              AS draws,
         COUNT(*) AS total
       FROM wrestling_match_participant p
       JOIN wrestling_match m ON m.id = p.match_id
      WHERE p.wrestler_id = ?`
    )
    .get(wrestlerId) as Row
  return {
    wins: (r?.wins ?? 0) as number,
    losses: (r?.losses ?? 0) as number,
    draws: (r?.draws ?? 0) as number,
    total: (r?.total ?? 0) as number
  }
}

// Titles they were in a winning match for. A rough signal (the card says what
// was at stake, not who left with it), so the UI labels it as such.
export function championshipsFor(wrestlerId: number): string[] {
  return (
    getSqlite()
      .prepare(
        `SELECT DISTINCT m.championship AS c
           FROM wrestling_match_participant p
           JOIN wrestling_match m ON m.id = p.match_id
          WHERE p.wrestler_id = ? AND p.won = 1 AND m.championship IS NOT NULL
          ORDER BY c`
      )
      .all(wrestlerId) as Row[]
  ).map((r) => r.c as string)
}

export function getWrestlerDetail(id: number): WrestlingWrestlerDetail | null {
  const base = getWrestler(id)
  if (!base) return null
  return {
    ...base,
    honours: honoursFor(id),
    record: recordFor(id),
    championships: championshipsFor(id)
  }
}

export function getWrestler(id: number): WrestlingWrestler | null {
  const row = getSqlite()
    .prepare(
      `SELECT w.*,
              (SELECT COUNT(*) FROM wrestling_match_participant p WHERE p.wrestler_id = w.id)
                AS match_count
         FROM wrestling_wrestler w WHERE w.id = ?`
    )
    .get(id) as Row | undefined
  return row ? mapWrestler(row) : null
}

// A career's worth of matches for one wrestler. ALWAYS paginated — a Ric Flair
// runs to thousands of rows and an unbounded query would land straight in the
// renderer.
export function wrestlerMatches(
  id: number,
  opts: { limit?: number; offset?: number } = {}
): WrestlingMatchWithEvent[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      // LEFT JOIN, or every LOOSE match (event_id NULL) would vanish from the
      // wrestler's page. A loose match names its own show and date.
      `SELECT m.*,
              COALESCE(e.name, m.show_label, 'Loose match')  AS event_name,
              COALESCE(e.event_date, m.match_date)           AS event_date_
         FROM wrestling_match m
         JOIN wrestling_match_participant p ON p.match_id = m.id
         LEFT JOIN wrestling_event e ON e.id = m.event_id
        WHERE p.wrestler_id = ?
        ORDER BY event_date_ DESC, m.sort_order ASC
        LIMIT ? OFFSET ?`
    )
    .all(id, opts.limit ?? 100, opts.offset ?? 0) as Row[]
  const parts = participantsFor(rows.map((r) => r.id as number))
  return rows.map((r) => ({
    ...mapMatch(r, parts),
    eventName: r.event_name as string,
    eventDate: (r.event_date_ ?? null) as string | null
  }))
}

export function searchWrestlers(query: string, limit = 40): WrestlingWrestler[] {
  const q = query.trim()
  if (!q) return []
  return (
    getSqlite()
      .prepare(
        `SELECT w.*,
                (SELECT COUNT(*) FROM wrestling_match_participant p WHERE p.wrestler_id = w.id)
                  AS match_count
           FROM wrestling_wrestler w
          WHERE w.name LIKE ?
          ORDER BY match_count DESC, w.name COLLATE NOCASE ASC
          LIMIT ?`
      )
      .all(`%${q}%`, limit) as Row[]
  ).map(mapWrestler)
}

// Wrestler rows nothing references any more. The tail-parsing bug created rows
// for things like "pinfall" (a wikilink, so it looked exactly like a name);
// once a re-import stops referencing them they are swept from here rather than
// left haunting /people-style browse counts.
export function pruneOrphanWrestlers(): number {
  return getSqlite()
    .prepare(
      `DELETE FROM wrestling_wrestler
        WHERE favorite = 0
          AND NOT EXISTS (
          SELECT 1 FROM wrestling_match_participant p WHERE p.wrestler_id = wrestling_wrestler.id
        )
          AND NOT EXISTS (
            SELECT 1 FROM list_item li
            JOIN list l ON l.id = li.list_id
            WHERE l.entity_kind = 'wrestlingWrestler' AND li.entity_id = wrestling_wrestler.id
          )
          AND NOT EXISTS (
            SELECT 1 FROM tier_item ti
            JOIN tier_list tl ON tl.id = ti.list_id
            WHERE tl.entity_kind = 'wrestlingWrestler' AND ti.entity_id = wrestling_wrestler.id
          )`
    )
    .run().changes
}

// Where a match lives. Imported matches resolve to their event; loose matches
// resolve to the collection row that owns their edit/play affordances.
export function matchLocation(matchId: number): { kind: 'event'; eventId: number } | { kind: 'loose' } | null {
  const row = getSqlite()
    .prepare('SELECT event_id FROM wrestling_match WHERE id = ?')
    .get(matchId) as Row | undefined
  if (!row) return null
  return row.event_id == null
    ? { kind: 'loose' }
    : { kind: 'event', eventId: row.event_id as number }
}

// ---------------------------------------------------------------------------
// The personal layer
// ---------------------------------------------------------------------------

// stars is 0-5 in half steps; null clears the rating.
export function rateMatch(matchId: number, stars: number | null): void {
  const value =
    stars == null ? null : Math.max(0, Math.min(5, Math.round(stars * 2) / 2))
  getSqlite()
    .prepare("UPDATE wrestling_match SET rating = ?, updated_at = datetime('now') WHERE id = ?")
    .run(value, matchId)
}

const FAVORITE_TABLE = {
  event: 'wrestling_event',
  match: 'wrestling_match',
  wrestler: 'wrestling_wrestler',
  stable: 'wrestling_stable'
} as const

// Table name comes from the fixed map above, never from the caller, so
// interpolating it is safe (the listRepo.KIND precedent).
export function setFavorite(
  kind: WrestlingFavoriteKind,
  id: number,
  favorite: boolean
): void {
  const table = FAVORITE_TABLE[kind]
  if (!table) throw new Error(`Unknown wrestling entity: ${kind}`)
  getSqlite()
    .prepare(`UPDATE ${table} SET favorite = ? WHERE id = ?`)
    .run(favorite ? 1 : 0, id)
}

export function overview(): WrestlingOverview {
  const db = getSqlite()
  const promotions = (
    db
      .prepare(
        `SELECT e.promotion,
                COUNT(*) AS event_count,
                MIN(CAST(substr(e.event_date, 1, 4) AS INTEGER)) AS first_year,
                MAX(CAST(substr(e.event_date, 1, 4) AS INTEGER)) AS last_year,
                SUM(CASE WHEN EXISTS (SELECT 1 FROM wrestling_video v WHERE v.event_id = e.id)
                         THEN 1 ELSE 0 END) AS owned_count
           FROM wrestling_event e
          GROUP BY e.promotion`
      )
      .all() as Row[]
  ).map((r) => ({
    promotion: r.promotion as WrestlingPromotionId,
    eventCount: r.event_count as number,
    firstYear: (r.first_year ?? null) as number | null,
    lastYear: (r.last_year ?? null) as number | null,
    ownedCount: (r.owned_count ?? 0) as number
  }))
  const totals = db
    .prepare(
      `SELECT (SELECT COUNT(*) FROM wrestling_event)                        AS events,
              (SELECT COUNT(*) FROM wrestling_match)                        AS matches,
              (SELECT COUNT(*) FROM wrestling_wrestler)                     AS wrestlers,
              (SELECT COUNT(*) FROM wrestling_match WHERE rating IS NOT NULL) AS rated`
    )
    .get() as Row
  return {
    promotions,
    totals: {
      events: totals.events,
      matches: totals.matches,
      wrestlers: totals.wrestlers,
      rated: totals.rated
    }
  }
}

// Cross-event browse: the user's own highest-rated matches.
export function topRatedMatches(limit = 50): WrestlingMatchWithEvent[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT m.*,
              COALESCE(e.name, m.show_label, 'Loose match') AS event_name,
              COALESCE(e.event_date, m.match_date)          AS event_date_
         FROM wrestling_match m
         LEFT JOIN wrestling_event e ON e.id = m.event_id
        WHERE m.rating IS NOT NULL
        ORDER BY m.rating DESC, event_date_ DESC
        LIMIT ?`
    )
    .all(limit) as Row[]
  const parts = participantsFor(rows.map((r) => r.id as number))
  return rows.map((r) => ({
    ...mapMatch(r, parts),
    eventName: r.event_name as string,
    eventDate: (r.event_date_ ?? null) as string | null
  }))
}

// Bounded home projection for the two favorite kinds that otherwise have no
// browse surface. Event favorites already have a promotion-page filter.
export function favorites(limit = 20): WrestlingFavorites {
  const db = getSqlite()
  const matchRows = db
    .prepare(
      `SELECT m.*,
              COALESCE(e.name, m.show_label, 'Loose match') AS event_name,
              COALESCE(e.event_date, m.match_date)          AS event_date_
         FROM wrestling_match m
         LEFT JOIN wrestling_event e ON e.id = m.event_id
        WHERE m.favorite = 1
        ORDER BY event_date_ DESC, m.id DESC
        LIMIT ?`
    )
    .all(limit) as Row[]
  const participants = participantsFor(matchRows.map((row) => row.id as number))
  const wrestlers = db
    .prepare(
      `SELECT w.*,
              (SELECT COUNT(*) FROM wrestling_match_participant p WHERE p.wrestler_id = w.id)
                AS match_count
         FROM wrestling_wrestler w
        WHERE w.favorite = 1
        ORDER BY w.name COLLATE NOCASE ASC
        LIMIT ?`
    )
    .all(limit) as Row[]
  return {
    matches: matchRows.map((row) => ({
      ...mapMatch(row, participants),
      eventName: row.event_name as string,
      eventDate: (row.event_date_ ?? null) as string | null
    })),
    wrestlers: wrestlers.map(mapWrestler)
  }
}

// Resolves wiki: link targets to the entities we hold. Titles arrive
// underscored (the form embedded in lead prose); wrestlers also match through
// the redirect alias map, so prose linking [[Steve Austin]] resolves to the
// Stone Cold Steve Austin row.
export function resolveLinks(titles: string[]): WrestlingLinkTarget[] {
  const db = getSqlite()
  const findEvent = db.prepare('SELECT id FROM wrestling_event WHERE wiki_title = ?')
  const findWrestler = db.prepare('SELECT id FROM wrestling_wrestler WHERE wiki_title = ?')
  return [...new Set(titles)].map((title) => {
    // Prose links whatever the editor typed, so hop through the redirect memo
    // before looking anything up.
    const plain = canonicalTitle(title.replace(/_/g, ' ').trim())
    const ev = findEvent.get(plain) as Row | undefined
    if (ev) return { title, kind: 'event' as const, id: ev.id as number }
    const w = findWrestler.get(plain) as Row | undefined
    if (w) return { title, kind: 'wrestler' as const, id: w.id as number }
    return { title, kind: null, id: null }
  })
}

// Local files attached to an event. Rows are written by the shared scanner
// (video/scan.ts under the wrestling scope), never here.
export function videosFor(eventId: number): WrestlingVideo[] {
  return (
    getSqlite()
      .prepare('SELECT * FROM wrestling_video WHERE event_id = ? ORDER BY sort_order, id')
      .all(eventId) as Row[]
  ).map(mapVideo)
}

// The two chronologies a Wikipedia event article offers, both derived from the
// library rather than from the article's own lastevent/nextevent links — so a
// neighbour is never a dead link to something that was never imported.
//
//   promotion: the promotion's calendar  (No Way Out -> WrestleMania -> Backlash)
//   series:    the same show year over year (WrestleMania 2000 -> X-Seven -> X8)
export interface WrestlingNeighbour {
  id: number
  name: string
  eventDate: string | null
}

export interface WrestlingChronology {
  prev: WrestlingNeighbour | null
  next: WrestlingNeighbour | null
  seriesName: string | null
  seriesPrev: WrestlingNeighbour | null
  seriesNext: WrestlingNeighbour | null
}

export function chronology(eventId: number): WrestlingChronology {
  const db = getSqlite()
  const row = db
    .prepare('SELECT promotion, series, event_date FROM wrestling_event WHERE id = ?')
    .get(eventId) as Row | undefined
  if (!row) {
    return { prev: null, next: null, seriesName: null, seriesPrev: null, seriesNext: null }
  }

  // Undated events can't take part in a chronology; ordering also falls back to
  // id so two shows on one day stay stable.
  const step = (where: string, dir: 'ASC' | 'DESC', ...params: unknown[]): WrestlingNeighbour | null => {
    const r = db
      .prepare(
        `SELECT id, name, event_date FROM wrestling_event
          WHERE ${where} AND event_date IS NOT NULL
            AND (event_date, id) ${dir === 'ASC' ? '>' : '<'} (?, ?)
          ORDER BY event_date ${dir}, id ${dir} LIMIT 1`
      )
      .get(...params, row.event_date, eventId) as Row | undefined
    return r ? { id: r.id, name: r.name, eventDate: r.event_date ?? null } : null
  }

  if (!row.event_date) {
    return { prev: null, next: null, seriesName: row.series ?? null, seriesPrev: null, seriesNext: null }
  }

  return {
    prev: step('promotion = ?', 'DESC', row.promotion),
    next: step('promotion = ?', 'ASC', row.promotion),
    seriesName: row.series ?? null,
    seriesPrev: row.series ? step('series = ? AND promotion = ?', 'DESC', row.series, row.promotion) : null,
    seriesNext: row.series ? step('series = ? AND promotion = ?', 'ASC', row.series, row.promotion) : null
  }
}

// Event counts per year for a promotion — drives the year rail.
export function yearCounts(promotion: string): { year: number; count: number }[] {
  return (
    getSqlite()
      .prepare(
        `SELECT CAST(substr(event_date, 1, 4) AS INTEGER) AS year, COUNT(*) AS count
           FROM wrestling_event
          WHERE promotion = ? AND event_date IS NOT NULL
          GROUP BY year ORDER BY year DESC`
      )
      .all(promotion) as Row[]
  ).map((r) => ({ year: r.year as number, count: r.count as number }))
}

// Every year the library covers, across ALL promotions — the year page's rail
// and its prev/next steps. Distinct from yearCounts(promotion), which scopes to
// one promotion's own rail.
export function allYears(): { year: number; count: number }[] {
  return (
    getSqlite()
      .prepare(
        `SELECT CAST(substr(event_date, 1, 4) AS INTEGER) AS year, COUNT(*) AS count
           FROM wrestling_event
          WHERE event_date IS NOT NULL
          GROUP BY year ORDER BY year DESC`
      )
      .all() as Row[]
  ).map((r) => ({ year: r.year as number, count: r.count as number }))
}

export function wrestlerIdByTitle(wikiTitle: string): number | null {
  const row = getSqlite()
    .prepare('SELECT id FROM wrestling_wrestler WHERE wiki_title = ?')
    .get(wikiTitle) as Row | undefined
  return (row?.id as number) ?? null
}

// ---------------------------------------------------------------------------
// Loose matches — a rip you own with no PPV behind it (a Raw main event, a
// one-off). Modelled as a match with event_id NULL rather than as its own
// entity, so participants, ratings, hearts, lists, the wrestler pages and the
// career record all apply to it with no extra code.
// ---------------------------------------------------------------------------

export function createLooseMatch(input: WrestlingLooseMatchInput, videoId: number | null): number {
  const db = getSqlite()
  return db.transaction((): number => {
    validateLooseMatchInput(input)
    if (videoId != null) {
      const video = db
        .prepare(
          `SELECT 1 FROM wrestling_video v
            WHERE v.id = ? AND v.event_id IS NULL
              AND NOT EXISTS (SELECT 1 FROM wrestling_match m WHERE m.video_id = v.id)`
        )
        .get(videoId)
      if (!video) throw new Error('Loose match video does not exist or is already attached.')
    }
    const id = Number(
      db
        .prepare(
          `INSERT INTO wrestling_match
             (event_id, show_label, match_date, sort_order, title, stipulation,
              outcome, video_id)
           VALUES (NULL, ?, ?, 0, ?, ?, ?, ?)`
        )
        .run(
          input.showLabel ?? null,
          input.matchDate ?? null,
          input.title.trim() || 'Untitled match',
          input.stipulation ?? null,
          input.winnerIds?.length ? 'decision' : 'unknown',
          videoId
        ).lastInsertRowid
    )
    setLooseParticipants(id, input)
    return id
  })()
}

export function updateLooseMatch(matchId: number, input: WrestlingLooseMatchInput): void {
  const db = getSqlite()
  db.transaction(() => {
    validateLooseMatchInput(input)
    const changed = db.prepare(
      `UPDATE wrestling_match
          SET show_label = ?, match_date = ?, title = ?, stipulation = ?,
              outcome = ?, updated_at = datetime('now')
        WHERE id = ? AND event_id IS NULL`
    ).run(
      input.showLabel ?? null,
      input.matchDate ?? null,
      input.title.trim() || 'Untitled match',
      input.stipulation ?? null,
      input.winnerIds?.length ? 'decision' : 'unknown',
      matchId
    ).changes
    if (changed === 0) throw new Error('Loose match not found.')
    setLooseParticipants(matchId, input)
  })()
}

function validateLooseMatchInput(input: WrestlingLooseMatchInput): void {
  const wrestlerIds = [...new Set(input.wrestlerIds ?? [])]
  const winners = [...new Set(input.winnerIds ?? [])]
  const selected = new Set(wrestlerIds)
  if (winners.some((id) => !selected.has(id))) {
    throw new Error('Every winner must be one of the selected wrestlers.')
  }
  if (!wrestlerIds.length) return
  const placeholders = wrestlerIds.map(() => '?').join(', ')
  const found = getSqlite()
    .prepare(`SELECT COUNT(*) AS n FROM wrestling_wrestler WHERE id IN (${placeholders})`)
    .get(...wrestlerIds) as Row
  if (found.n !== wrestlerIds.length) throw new Error('One or more selected wrestlers do not exist.')
}

// Side 0 is the winners when any were named, so the row reads "A def. B" like
// every imported match does.
function setLooseParticipants(matchId: number, input: WrestlingLooseMatchInput): void {
  const db = getSqlite()
  db.prepare('DELETE FROM wrestling_match_participant WHERE match_id = ?').run(matchId)
  const winners = new Set(input.winnerIds ?? [])
  const ins = db.prepare(
    `INSERT INTO wrestling_match_participant
       (match_id, wrestler_id, side, won, is_champion, team_name, sort_order)
     VALUES (?, ?, ?, ?, 0, NULL, ?)`
  )
  let order = 0
  // Winners first so side 0 is the winning side.
  const ids = [...new Set(input.wrestlerIds ?? [])].sort(
    (a, b) => Number(winners.has(b)) - Number(winners.has(a))
  )
  for (const wid of ids) {
    const won = winners.has(wid)
    ins.run(matchId, wid, winners.size === 0 ? 0 : won ? 0 : 1, won ? 1 : 0, order++)
  }
}

// Removes the match and, when it has one, the video row that only existed for
// it. The FILE on disk is never touched.
export function removeLooseMatch(matchId: number): void {
  const db = getSqlite()
  db.transaction(() => {
    const row = db
      .prepare('SELECT video_id FROM wrestling_match WHERE id = ? AND event_id IS NULL')
      .get(matchId) as Row | undefined
    if (!row) return
    removeMatchFromCollections(matchId)
    db.prepare('DELETE FROM wrestling_match WHERE id = ?').run(matchId)
    if (row.video_id != null) {
      db.prepare(
        `DELETE FROM wrestling_video
          WHERE id = ? AND event_id IS NULL
            AND NOT EXISTS (SELECT 1 FROM wrestling_match WHERE video_id = ?)`
      ).run(row.video_id, row.video_id)
    }
  })()
}

function removeMatchFromCollections(matchId: number): void {
  removeEntityFromLists('wrestlingMatch', matchId)
  removeEntityFromTierLists('wrestlingMatch', matchId)
}

// Registers a picked file as a loose video row (event_id NULL) so it plays
// through the shared pipeline with resume, and returns its id.
export function addLooseVideo(relPath: string, title: string): number {
  const db = getSqlite()
  const existing = db
    .prepare('SELECT id FROM wrestling_video WHERE event_id IS NULL AND file_path = ?')
    .get(relPath) as Row | undefined
  if (existing) return existing.id as number
  return Number(
    db
      .prepare(
        `INSERT INTO wrestling_video (event_id, file_path, title, sort_order)
         VALUES (NULL, ?, ?, 0)`
      )
      .run(relPath, title).lastInsertRowid
  )
}

export function looseMatches(limit = 500): WrestlingMatchWithEvent[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT m.*, COALESCE(m.show_label, 'Loose match') AS event_name,
              m.match_date AS event_date_
         FROM wrestling_match m
        WHERE m.event_id IS NULL
        ORDER BY COALESCE(m.match_date, '') DESC, m.id DESC
        LIMIT ?`
    )
    .all(limit) as Row[]
  const parts = participantsFor(rows.map((r) => r.id as number))
  return rows.map((r) => ({
    ...mapMatch(r, parts),
    eventName: r.event_name as string,
    eventDate: (r.event_date_ ?? null) as string | null
  }))
}

// The hub's "recently added" strip: newest owned events and loose matches.
export function recentlyAdded(limit = 8): {
  events: WrestlingEvent[]
  loose: WrestlingMatchWithEvent[]
} {
  const events = (
    getSqlite()
      .prepare(
        `${EVENT_SELECT}
          WHERE EXISTS (SELECT 1 FROM wrestling_video v WHERE v.event_id = e.id)
          ORDER BY e.updated_at DESC, e.id DESC LIMIT ?`
      )
      .all(limit) as Row[]
  ).map(mapEvent)
  return { events, loose: looseMatches(limit) }
}
