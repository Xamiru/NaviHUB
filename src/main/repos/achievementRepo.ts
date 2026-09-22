import { getSqlite } from '../db/connection'
import { rarityTier } from '../achievementsCore'
import type {
  AchievementGameProgress,
  AchievementListPayload,
  AchievementProvider,
  AchievementRow,
  AchievementSummary,
  AchievementTracking,
  AchievementUnlockEvent,
  AchievementUnlockSource,
  AchievementsOverview,
  InstalledGame,
  MediaType
} from '@shared/types'

// Achievement sets and their unlocks (achievements.ts fetches,
// achievementWatcher.ts writes during play). Two lifetime rules run through
// every query here:
//
//  - A re-fetch is AUTHORITATIVE for the set: canonical columns refresh and
//    achievements the provider dropped are pruned. Unlocks survive it, because
//    the upsert matches on (media_id, api_name) and so keeps achievement ids
//    stable for everything that still exists.
//  - Absence of an achievement_unlock row IS "locked". Nothing stores a locked
//    state, so a set can grow without backfilling anything.

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapAchievement(r: any): AchievementRow {
  return {
    id: r.id,
    apiName: r.api_name,
    name: r.name,
    description: r.description ?? null,
    hidden: !!r.hidden,
    iconPath: r.icon_path ?? null,
    iconGrayPath: r.icon_gray_path ?? null,
    points: r.points ?? null,
    globalPct: r.global_pct ?? null,
    rarity: rarityTier(r.global_pct),
    unlockedAt: r.unlocked_at ?? null,
    unlockSource: (r.unlock_source as AchievementUnlockSource | null) ?? null
  }
}

function mapEvent(r: any): AchievementUnlockEvent {
  return {
    seq: 0, // set by the watcher; the feed queries don't use it
    achievementId: r.id,
    mediaId: r.media_id,
    mediaTitle: r.media_title,
    mediaType: r.media_type as MediaType,
    name: r.name,
    description: r.description ?? null,
    iconPath: r.icon_path ?? null,
    rarity: rarityTier(r.global_pct),
    points: r.points ?? null,
    unlockedAt: r.unlocked_at
  }
}

export function getTracking(mediaId: number): AchievementTracking | null {
  const r = getSqlite()
    .prepare(
      'SELECT provider, provider_game_id, schema_fetched_at FROM achievement_game WHERE media_id = ?'
    )
    .get(mediaId) as
    | { provider: string; provider_game_id: string; schema_fetched_at: string | null }
    | undefined
  return r
    ? {
        provider: r.provider as AchievementProvider,
        providerGameId: r.provider_game_id,
        schemaFetchedAt: r.schema_fetched_at
      }
    : null
}

// Exe linked NOW, or a session proving it once was, or tracking already set up.
// exe_path is nulled outright by games:clearExe and keeps no history, so the
// other two clauses are what make "or ever" true.
export function isEligible(mediaId: number): boolean {
  const r = getSqlite()
    .prepare(
      `SELECT 1 AS ok FROM media_item m
        WHERE m.id = ?
          AND (m.exe_path IS NOT NULL
               OR EXISTS (SELECT 1 FROM game_session g WHERE g.media_id = m.id)
               OR EXISTS (SELECT 1 FROM achievement_game a WHERE a.media_id = m.id))`
    )
    .get(mediaId) as { ok: number } | undefined
  return !!r
}

export type AchievementInput = {
  apiName: string
  name: string
  description: string | null
  hidden: boolean
  iconPath: string | null
  iconGrayPath: string | null
  points: number | null
  globalPct: number | null
}

type SqliteDb = ReturnType<typeof getSqlite>

function upsertSchemaInDb(
  db: SqliteDb,
  mediaId: number,
  provider: AchievementProvider,
  providerGameId: string,
  rows: readonly AchievementInput[]
): void {
  if (!rows.length) throw new Error('Cannot replace an achievement set with an empty schema')
  const prior = db
    .prepare('SELECT provider, provider_game_id FROM achievement_game WHERE media_id = ?')
    .get(mediaId) as { provider: string; provider_game_id: string } | undefined

  // api_name is only stable inside one provider game. Reusing rows across a
  // provider or game-id switch can otherwise carry an unrelated unlock into
  // the replacement set when both happen to use the same identifier.
  if (prior && (prior.provider !== provider || prior.provider_game_id !== providerGameId)) {
    db.prepare('DELETE FROM achievement WHERE media_id = ?').run(mediaId)
  }

  db.prepare(
    `INSERT INTO achievement_game (media_id, provider, provider_game_id, schema_fetched_at)
     VALUES (?, ?, ?, datetime('now'))
     ON CONFLICT(media_id) DO UPDATE SET
       provider = excluded.provider,
       provider_game_id = excluded.provider_game_id,
       schema_fetched_at = excluded.schema_fetched_at`
  ).run(mediaId, provider, providerGameId)

  const upsert = db.prepare(
    `INSERT INTO achievement
       (media_id, api_name, name, description, hidden, icon_path, icon_gray_path,
        points, global_pct, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(media_id, api_name) DO UPDATE SET
       name = excluded.name,
       -- A source that lacks a description (Steam's public page blanks the
       -- hidden ones) must not wipe one an earlier source supplied.
       description = COALESCE(excluded.description, achievement.description),
       -- hidden stays authoritative from the source even when the text above
       -- is preserved: that pairing is deliberate, not a leak. The kept text
       -- is what the UI reveals once the achievement is unlocked, and until
       -- then hidden is exactly what should be concealing it.
       hidden = excluded.hidden,
       -- COALESCE so a refetch that couldn't re-download art keeps the art
       -- already on disk, the import-preserves-what-it-can rule.
       icon_path = COALESCE(excluded.icon_path, achievement.icon_path),
       icon_gray_path = COALESCE(excluded.icon_gray_path, achievement.icon_gray_path),
       points = excluded.points,
       global_pct = COALESCE(excluded.global_pct, achievement.global_pct),
       sort_order = excluded.sort_order`
  )
  rows.forEach((r, i) => {
    upsert.run(
      mediaId,
      r.apiName,
      r.name,
      r.description,
      r.hidden ? 1 : 0,
      r.iconPath,
      r.iconGrayPath,
      r.points,
      r.globalPct,
      i
    )
  })

  // Prune achievements the provider dropped. A set that came back EMPTY is
  // treated as a failed fetch by the caller, so this never runs with no rows.
  if (rows.length) {
    const keep = rows.map(() => '?').join(',')
    db.prepare(`DELETE FROM achievement WHERE media_id = ? AND api_name NOT IN (${keep})`).run(
      mediaId,
      ...rows.map((r) => r.apiName)
    )
  }
}

// The whole set in one transaction (the importer posture): upsert every row,
// then prune whatever the provider no longer lists. Unlocks ride along on the
// surviving ids while the provider identity is unchanged; a provider/game-id
// replacement clears the old set first.
export function upsertSchema(
  mediaId: number,
  provider: AchievementProvider,
  providerGameId: string,
  rows: readonly AchievementInput[]
): void {
  const db = getSqlite()
  db.transaction(() => upsertSchemaInDb(db, mediaId, provider, providerGameId, rows))()
}

// Initial association without a set — setup stores the first choice so it
// survives a failed fetch. Deliberately cannot replace an existing identity:
// replacements belong to the atomic schema+unlock transaction above.
export function setInitialAssociation(
  mediaId: number,
  provider: AchievementProvider,
  providerGameId: string
): void {
  getSqlite()
    .prepare(
      `INSERT INTO achievement_game (media_id, provider, provider_game_id)
       VALUES (?, ?, ?)
       ON CONFLICT(media_id) DO NOTHING`
    )
    .run(mediaId, provider, providerGameId)
}

export function listForMedia(mediaId: number): AchievementRow[] {
  return getSqlite()
    .prepare(
      `SELECT a.*, u.unlocked_at, u.source AS unlock_source
         FROM achievement a
         LEFT JOIN achievement_unlock u ON u.achievement_id = a.id
        WHERE a.media_id = ?
        -- Unlocked first, then the provider's own order: the earned ones are
        -- what the user came to look at.
        ORDER BY (u.achievement_id IS NULL), a.sort_order, a.id`
    )
    .all(mediaId)
    .map(mapAchievement)
}

// listForMedia in the PROVIDER's own order, with no unlocked-first bias. Split
// out because the Goldberg emitter writes a POSITIONAL array: ordering it by
// unlock state would map achievement indices differently from real Steam, and
// would reshuffle the generated file every time the user earned another one.
export function listInProviderOrder(mediaId: number): AchievementRow[] {
  return getSqlite()
    .prepare(
      `SELECT a.*, u.unlocked_at, u.source AS unlock_source
         FROM achievement a
         LEFT JOIN achievement_unlock u ON u.achievement_id = a.id
        WHERE a.media_id = ?
        ORDER BY a.sort_order, a.id`
    )
    .all(mediaId)
    .map(mapAchievement)
}

export function unlockedApiNames(mediaId: number): Set<string> {
  const rows = getSqlite()
    .prepare(
      `SELECT a.api_name FROM achievement a
         JOIN achievement_unlock u ON u.achievement_id = a.id
        WHERE a.media_id = ?`
    )
    .all(mediaId) as { api_name: string }[]
  return new Set(rows.map((r) => r.api_name))
}

export function summaryFor(mediaId: number): AchievementSummary {
  const r = getSqlite()
    .prepare(
      // has_points separates "this provider awards no points" (Steam — the
      // summary shows none) from "nothing earned yet" (RA at zero).
      `SELECT COUNT(*) AS total,
              COUNT(u.achievement_id) AS unlocked,
              MAX(a.points IS NOT NULL) AS has_points,
              COALESCE(SUM(CASE WHEN u.achievement_id IS NOT NULL THEN a.points ELSE 0 END), 0) AS pts
         FROM achievement a
         LEFT JOIN achievement_unlock u ON u.achievement_id = a.id
        WHERE a.media_id = ?`
    )
    .get(mediaId) as { total: number; unlocked: number; has_points: number | null; pts: number }
  return { unlocked: r.unlocked, total: r.total, points: r.has_points ? r.pts : null }
}

export function listPayload(mediaId: number): AchievementListPayload {
  return {
    eligible: isEligible(mediaId),
    tracking: getTracking(mediaId),
    summary: summaryFor(mediaId),
    achievements: listForMedia(mediaId)
  }
}

export type UnlockInput = { apiName: string; unlockedAtMs: number | null }

// Past this, datetime(?, 'unixepoch') returns NULL and the NOT NULL column
// rejects the row (see insertUnlocks).
const MAX_UNLOCK_MS = Date.UTC(2100, 0, 1)

function insertUnlocksInDb(
  db: SqliteDb,
  mediaId: number,
  unlocks: readonly UnlockInput[],
  source: AchievementUnlockSource,
  fallbackMs: number
): AchievementRow[] {
  if (!unlocks.length) return []
  const idOf = db.prepare('SELECT id FROM achievement WHERE media_id = ? AND api_name = ?')
  const insert = db.prepare(
    `INSERT INTO achievement_unlock (achievement_id, unlocked_at, source)
     VALUES (?, datetime(?, 'unixepoch'), ?)
     ON CONFLICT(achievement_id) DO UPDATE SET
       unlocked_at = MIN(achievement_unlock.unlocked_at, excluded.unlocked_at),
       source = CASE WHEN excluded.unlocked_at < achievement_unlock.unlocked_at
                     THEN excluded.source ELSE achievement_unlock.source END`
  )
  const fresh: number[] = []
  for (const u of unlocks) {
    // Belt and braces on top of achievementsCore.normalizeTime: SQLite's
    // datetime(?, 'unixepoch') yields NULL past year 9999, and unlocked_at is
    // NOT NULL — one out-of-range value would abort this transaction and
    // throw away every good unlock in the batch.
    const ms = u.unlockedAtMs
    const at = ms != null && ms > 0 && ms <= MAX_UNLOCK_MS ? ms : fallbackMs
    const seconds = Math.floor((at > 0 && at <= MAX_UNLOCK_MS ? at : Date.now()) / 1000)
    const row = idOf.get(mediaId, u.apiName) as { id: number } | undefined
    // An api name the set doesn't contain: a stale emulator file, or an
    // achievement added after our last fetch. Ignore it — a re-fetch picks
    // the achievement up, and the next sweep then records the unlock.
    if (!row) continue
    const existed = db
      .prepare('SELECT 1 FROM achievement_unlock WHERE achievement_id = ?')
      .get(row.id)
    insert.run(row.id, seconds, source)
    if (!existed) fresh.push(row.id)
  }
  if (!fresh.length) return []
  const placeholders = fresh.map(() => '?').join(',')
  return db
    .prepare(
      `SELECT a.*, u.unlocked_at, u.source AS unlock_source
         FROM achievement a
         JOIN achievement_unlock u ON u.achievement_id = a.id
        WHERE a.id IN (${placeholders})
        ORDER BY a.sort_order, a.id`
    )
    .all(...fresh)
    .map(mapAchievement)
}

// Earliest timestamp wins: an emulator file rewritten with today's date must
// not relabel an unlock from two years ago. Returns the achievements newly
// unlocked by this call (the watcher turns them into popups).
export function insertUnlocks(
  mediaId: number,
  unlocks: readonly UnlockInput[],
  source: AchievementUnlockSource,
  fallbackMs: number
): AchievementRow[] {
  if (!unlocks.length) return []
  const db = getSqlite()
  return db.transaction(() => insertUnlocksInDb(db, mediaId, unlocks, source, fallbackMs))()
}

// Initial syncs fetch the provider's canonical set and any unlock history as
// one logical snapshot. If either half fails, the prior tracked set remains
// intact instead of leaving a half-replaced game behind.
export function replaceSchemaWithUnlocks(
  mediaId: number,
  provider: AchievementProvider,
  providerGameId: string,
  rows: readonly AchievementInput[],
  unlocks: readonly UnlockInput[],
  source: AchievementUnlockSource,
  fallbackMs: number
): AchievementRow[] {
  const db = getSqlite()
  return db.transaction(() => {
    upsertSchemaInDb(db, mediaId, provider, providerGameId, rows)
    return insertUnlocksInDb(db, mediaId, unlocks, source, fallbackMs)
  })()
}

// The manual fallback, for games nothing can track automatically.
export function setManual(achievementId: number, unlocked: boolean): void {
  const db = getSqlite()
  if (unlocked) {
    db.prepare(
      `INSERT INTO achievement_unlock (achievement_id, unlocked_at, source)
       VALUES (?, datetime('now'), 'manual')
       ON CONFLICT(achievement_id) DO NOTHING`
    ).run(achievementId)
  } else {
    db.prepare('DELETE FROM achievement_unlock WHERE achievement_id = ?').run(achievementId)
  }
}

export function disable(mediaId: number): void {
  const db = getSqlite()
  db.transaction(() => {
    // achievement_unlock goes by CASCADE off achievement.
    db.prepare('DELETE FROM achievement WHERE media_id = ?').run(mediaId)
    db.prepare('DELETE FROM achievement_game WHERE media_id = ?').run(mediaId)
  })()
}

// media_id -> counts, for the list-page card chip. Tracked games only, and
// there are never many, so this is one scan rather than a per-card query.
export function cardSummaries(): Record<number, { unlocked: number; total: number }> {
  const rows = getSqlite()
    .prepare(
      `SELECT a.media_id, COUNT(*) AS total, COUNT(u.achievement_id) AS unlocked
         FROM achievement a
         LEFT JOIN achievement_unlock u ON u.achievement_id = a.id
        GROUP BY a.media_id`
    )
    .all() as { media_id: number; total: number; unlocked: number }[]
  const out: Record<number, { unlocked: number; total: number }> = {}
  for (const r of rows) out[r.media_id] = { unlocked: r.unlocked, total: r.total }
  return out
}

const FEED_SQL = `SELECT a.id, a.media_id, a.name, a.description, a.icon_path, a.global_pct,
                         a.points, u.unlocked_at, m.title AS media_title, m.media_type
                    FROM achievement_unlock u
                    JOIN achievement a ON a.id = u.achievement_id
                    JOIN media_item m ON m.id = a.media_id`

export function recentUnlocks(limit: number): AchievementUnlockEvent[] {
  return getSqlite()
    .prepare(`${FEED_SQL} ORDER BY u.unlocked_at DESC, a.id DESC LIMIT ?`)
    .all(limit)
    .map(mapEvent)
}

export function overview(): AchievementsOverview {
  const db = getSqlite()
  const recent = recentUnlocks(40)
  const rarest = db
    .prepare(
      // Unknown rarity sorts last rather than first — a NULL percentage means
      // "not fetched", not "nobody has it".
      `${FEED_SQL} WHERE a.global_pct IS NOT NULL
        ORDER BY a.global_pct ASC, u.unlocked_at DESC LIMIT 12`
    )
    .all()
    .map(mapEvent)
  const games = db
    .prepare(
      `SELECT m.id AS media_id, m.title, m.media_type, m.cover_path, g.provider,
              COUNT(a.id) AS total, COUNT(u.achievement_id) AS unlocked
         FROM achievement_game g
         JOIN media_item m ON m.id = g.media_id
         LEFT JOIN achievement a ON a.media_id = g.media_id
         LEFT JOIN achievement_unlock u ON u.achievement_id = a.id
        GROUP BY m.id
        ORDER BY (CASE WHEN COUNT(a.id) = 0 THEN 0
                       ELSE CAST(COUNT(u.achievement_id) AS REAL) / COUNT(a.id) END) DESC,
                 m.title COLLATE NOCASE`
    )
    .all()
    .map(
      (r: any): AchievementGameProgress => ({
        mediaId: r.media_id,
        title: r.title,
        mediaType: r.media_type as MediaType,
        coverPath: r.cover_path ?? null,
        provider: r.provider as AchievementProvider,
        unlocked: r.unlocked,
        total: r.total
      })
    )
  const totals = games.reduce(
    (acc, g) => ({
      unlocked: acc.unlocked + g.unlocked,
      total: acc.total + g.total,
      games: acc.games + 1
    }),
    { unlocked: 0, total: 0, games: 0 }
  )
  return { recent, games, rarest, totals }
}

// Games playable from the app right now — exe linked, whatever the media type
// (games and VNs both launch). Powers the Installed page.
export function installedGames(): InstalledGame[] {
  return getSqlite()
    .prepare(
      `SELECT m.id, m.title, m.media_type, m.cover_path, m.exe_path,
              COALESCE(SUM(s.duration), 0) AS total_seconds,
              MAX(s.started_at) AS last_played,
              (SELECT duration FROM game_session latest
                WHERE latest.media_id = m.id
                ORDER BY latest.started_at DESC, latest.id DESC LIMIT 1) AS last_session_seconds,
              (SELECT COUNT(*) FROM achievement a WHERE a.media_id = m.id) AS ach_total,
              (SELECT COUNT(*) FROM achievement a
                 JOIN achievement_unlock u ON u.achievement_id = a.id
                WHERE a.media_id = m.id) AS ach_unlocked
         FROM media_item m
         LEFT JOIN game_session s ON s.media_id = m.id
        WHERE m.exe_path IS NOT NULL
        GROUP BY m.id
        ORDER BY (MAX(s.started_at) IS NULL), MAX(s.started_at) DESC, m.title COLLATE NOCASE`
    )
    .all()
    .map(
      (r: any): InstalledGame => ({
        mediaId: r.id,
        title: r.title,
        mediaType: r.media_type as MediaType,
        coverPath: r.cover_path ?? null,
        exePath: r.exe_path,
        totalSeconds: r.total_seconds,
        lastPlayedAt: r.last_played ?? null,
        lastSessionSeconds: r.last_session_seconds ?? null,
        achievements: r.ach_total ? { unlocked: r.ach_unlocked, total: r.ach_total } : null
      })
    )
}
