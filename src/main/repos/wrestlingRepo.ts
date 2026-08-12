import { getSqlite } from '../db/connection'
import type {
  WrestlingEvent,
  WrestlingEventDetail,
  WrestlingEventFilter,
  WrestlingMatch,
  WrestlingFavoriteKind,
  WrestlingLinkTarget,
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
          duration_seconds, outcome, card_slot, card_label)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    const updMatch = db.prepare(
      `UPDATE wrestling_match
          SET sort_order = ?, result_text = ?, stipulation = ?, championship = ?,
              duration_seconds = ?, outcome = ?, card_slot = ?, card_label = ?,
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
        if (!reused.has(id)) db.prepare('DELETE FROM wrestling_match WHERE id = ?').run(id)
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
    eventId: r.event_id,
    sortOrder: r.sort_order,
    title: r.title,
    resultText: r.result_text ?? null,
    stipulation: r.stipulation ?? null,
    championship: r.championship ?? null,
    durationSeconds: r.duration_seconds ?? null,
    outcome: r.outcome,
    cardSlot: (r.card_slot ?? null) as WrestlingMatch['cardSlot'],
    cardLabel: (r.card_label ?? null) as string | null,
    rating: r.rating ?? null,
    favorite: !!r.favorite,
    videoId: r.video_id ?? null,
    participants: parts.get(r.id) ?? []
  }
}

function mapVideo(r: Row): WrestlingVideo {
  return {
    id: r.id,
    eventId: r.event_id,
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
      `SELECT m.*, e.name AS event_name, e.event_date AS event_date_
         FROM wrestling_match m
         JOIN wrestling_match_participant p ON p.match_id = m.id
         JOIN wrestling_event e ON e.id = m.event_id
        WHERE p.wrestler_id = ?
        ORDER BY e.event_date DESC, m.sort_order ASC
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

// Which event a match belongs to. A match has no page of its own — it lives on
// its event's card — so a list entry pointing at one has to be redirected there.
export function eventIdOfMatch(matchId: number): number | null {
  const row = getSqlite()
    .prepare('SELECT event_id FROM wrestling_match WHERE id = ?')
    .get(matchId) as Row | undefined
  return (row?.event_id as number) ?? null
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
      `SELECT m.*, e.name AS event_name, e.event_date AS event_date_
         FROM wrestling_match m
         JOIN wrestling_event e ON e.id = m.event_id
        WHERE m.rating IS NOT NULL
        ORDER BY m.rating DESC, e.event_date DESC
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
