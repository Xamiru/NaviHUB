import { getSqlite } from '../db/connection'
import { rarityTier } from '../achievementsCore'
import { MAX_RECENT_UNLOCKS } from '@shared/achievements'
import { isPlatformKey } from '@shared/emulation/platforms'
import type {
  AchievementGameProgress,
  AchievementListPayload,
  AchievementNameStatus,
  AchievementProvider,
  AchievementRow,
  AchievementSchemaSource,
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
    unlockSource: (r.unlock_source as AchievementUnlockSource | null) ?? null,
    nameStatus: (r.name_status as AchievementNameStatus | undefined) ?? 'ok',
    progress:
      r.unlocked_at == null && r.progress_current != null && r.progress_max != null
        ? { current: r.progress_current, max: r.progress_max }
        : null
  }
}

const ROW_SQL = `SELECT a.*, u.unlocked_at, u.source AS unlock_source,
                        p.current AS progress_current, p.max AS progress_max
                   FROM achievement a
                   LEFT JOIN achievement_unlock u ON u.achievement_id = a.id
                   LEFT JOIN achievement_progress p ON p.achievement_id = a.id`

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
    globalPct: r.global_pct ?? null,
    points: r.points ?? null,
    unlockedAt: r.unlocked_at
  }
}

export function getTracking(mediaId: number): AchievementTracking | null {
  const r = getSqlite()
    .prepare(
      `SELECT provider, provider_game_id, schema_fetched_at, schema_source
         FROM achievement_game WHERE media_id = ?`
    )
    .get(mediaId) as
    | {
        provider: string
        provider_game_id: string
        schema_fetched_at: string | null
        schema_source: string | null
      }
    | undefined
  return r
    ? {
        provider: r.provider as AchievementProvider,
        providerGameId: r.provider_game_id,
        schemaFetchedAt: r.schema_fetched_at,
        schemaSource: (r.schema_source as AchievementSchemaSource | null) ?? null
      }
    : null
}

// The linked executable, which every emulator path is anchored to.
export function exePathOf(mediaId: number): string | null {
  const row = getSqlite().prepare('SELECT exe_path FROM media_item WHERE id = ?').get(mediaId) as
    | { exe_path: string | null }
    | undefined
  return row?.exe_path ?? null
}

// Exe or game file linked NOW, or a session proving it once was, or tracking
// already set up. exe_path is nulled outright by games:clearExe and keeps no
// history, so the last two clauses are what make "or ever" true.
export function isEligible(mediaId: number): boolean {
  const r = getSqlite()
    .prepare(
      `SELECT 1 AS ok FROM media_item m
        WHERE m.id = ?
          AND (m.exe_path IS NOT NULL
               OR EXISTS (SELECT 1 FROM game_rom r WHERE r.media_id = m.id)
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

// A non-exact source pairs names by rank afresh, so it can hand a name the user
// swapped onto row X to some other row Y as well — two rows with one name, and
// Y's real name gone. Re-applying each swap to the incoming list as a trade
// (X takes its name back from Y, Y takes whatever X was offered) keeps every
// name on exactly one row.
function carryManualSwaps(
  db: SqliteDb,
  mediaId: number,
  rows: readonly AchievementInput[]
): AchievementInput[] {
  const manual = db
    .prepare(
      `SELECT api_name, name FROM achievement WHERE media_id = ? AND name_status = 'manual'`
    )
    .all(mediaId) as { api_name: string; name: string }[]
  const out = rows.map((r) => ({ ...r }))
  for (const m of manual) {
    const x = out.findIndex((r) => r.apiName === m.api_name)
    if (x < 0 || out[x].name === m.name) continue
    const y = out.findIndex((r, i) => i !== x && r.name === m.name)
    if (y < 0) continue
    const a = out[x]
    const b = out[y]
    out[x] = { ...a, ...displayOf(b) }
    out[y] = { ...b, ...displayOf(a) }
  }
  return out
}

function displayOf(r: AchievementInput): Partial<AchievementInput> {
  const { name, description, hidden, iconPath, iconGrayPath } = r
  return { name, description, hidden, iconPath, iconGrayPath }
}

// `exactNames`: the source names every achievement by its api name (the Steam
// Web API, RetroAchievements). Only such a source may overwrite a name the user
// confirmed or swapped by hand; the crack's own file and the public page cannot,
// because either may carry exactly the rank-pairing guess the user corrected.
function upsertSchemaInDb(
  db: SqliteDb,
  mediaId: number,
  provider: AchievementProvider,
  providerGameId: string,
  incoming: readonly AchievementInput[],
  exactNames: boolean,
  prune = true,
  schemaSource: AchievementSchemaSource | null = null
): void {
  let rows = incoming
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
    `INSERT INTO achievement_game
       (media_id, provider, provider_game_id, schema_fetched_at, schema_source)
     VALUES (?, ?, ?, datetime('now'), ?)
     ON CONFLICT(media_id) DO UPDATE SET
       provider = excluded.provider,
       provider_game_id = excluded.provider_game_id,
       schema_fetched_at = excluded.schema_fetched_at,
       schema_source = excluded.schema_source`
  ).run(mediaId, provider, providerGameId, schemaSource)

  if (!exactNames) rows = carryManualSwaps(db, mediaId, rows)

  // `keep` = the stored row is a hand-swapped name and this source is not
  // exact: name, text, hidden flag and art stay as the user set them (they
  // travel together, because the public page pairs them as one row).
  const keep = `(achievement.name_status = 'manual' AND @exact = 0)`
  const upsert = db.prepare(
    `INSERT INTO achievement
       (media_id, api_name, name, description, hidden, icon_path, icon_gray_path,
        points, global_pct, sort_order, name_status)
     VALUES (@mediaId, @apiName, @name, @description, @hidden, @iconPath, @iconGrayPath,
             @points, @globalPct, @sortOrder, @nameStatus)
     ON CONFLICT(media_id, api_name) DO UPDATE SET
       name = CASE WHEN ${keep} THEN achievement.name ELSE excluded.name END,
       -- A source that lacks a description (Steam's public page blanks the
       -- hidden ones) must not wipe one an earlier source supplied.
       description = CASE WHEN ${keep} THEN achievement.description
                          ELSE COALESCE(excluded.description, achievement.description) END,
       -- hidden comes from the source even when the text above is preserved
       -- (that pairing is deliberate, not a leak: the kept text is what the
       -- UI reveals once the achievement is unlocked). A hand-swapped row is
       -- the exception — it keeps its stored flag with the rest of its display.
       hidden = CASE WHEN ${keep} THEN achievement.hidden ELSE excluded.hidden END,
       -- COALESCE so a refetch that couldn't re-download art keeps the art
       -- already on disk, the import-preserves-what-it-can rule.
       icon_path = CASE WHEN ${keep} THEN achievement.icon_path
                        ELSE COALESCE(excluded.icon_path, achievement.icon_path) END,
       icon_gray_path = CASE WHEN ${keep} THEN achievement.icon_gray_path
                             ELSE COALESCE(excluded.icon_gray_path, achievement.icon_gray_path) END,
       points = excluded.points,
       global_pct = COALESCE(excluded.global_pct, achievement.global_pct),
       sort_order = excluded.sort_order,
       name_status = CASE WHEN ${keep} THEN 'manual' ELSE excluded.name_status END`
  )
  rows.forEach((r, i) => {
    upsert.run({
      mediaId,
      apiName: r.apiName,
      name: r.name,
      description: r.description,
      hidden: r.hidden ? 1 : 0,
      iconPath: r.iconPath,
      iconGrayPath: r.iconGrayPath,
      points: r.points,
      globalPct: r.globalPct,
      sortOrder: i,
      nameStatus: 'ok',
      exact: exactNames ? 1 : 0
    })
  })

  // Prune achievements the provider dropped. A set that came back EMPTY is
  // treated as a failed fetch by the caller, so this never runs with no rows.
  // A partial source (a crack's own list, which is often incomplete — the
  // very gap the launch check warns about) never prunes: dropping a row
  // deletes its unlock and progress with it.
  if (prune && rows.length) {
    const keep = rows.map(() => '?').join(',')
    db.prepare(`DELETE FROM achievement WHERE media_id = ? AND api_name NOT IN (${keep})`).run(
      mediaId,
      ...rows.map((r) => r.apiName)
    )
  } else if (rows.length) {
    // Rows the source did not list keep their relative order, after the
    // source's own. Left with their old numbers they would collide with the
    // renumbered ones, and listInProviderOrder — the order the positional
    // Goldberg file follows — would interleave them.
    const listed = new Set(rows.map((r) => r.apiName))
    const rest = (
      db
        .prepare('SELECT id, api_name FROM achievement WHERE media_id = ? ORDER BY sort_order, id')
        .all(mediaId) as { id: number; api_name: string }[]
    ).filter((r) => !listed.has(r.api_name))
    const renumber = db.prepare('UPDATE achievement SET sort_order = ? WHERE id = ?')
    rest.forEach((r, i) => renumber.run(rows.length + i, r.id))
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
  rows: readonly AchievementInput[],
  exactNames = true
): void {
  const db = getSqlite()
  db.transaction(() =>
    upsertSchemaInDb(db, mediaId, provider, providerGameId, rows, exactNames)
  )()
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
      `${ROW_SQL}
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
      `${ROW_SQL}
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
  fallbackMs: number,
  opts: {
    exactNames?: boolean
    prune?: boolean
    emu?: EmuState
    schemaSource?: AchievementSchemaSource
  } = {}
): AchievementRow[] {
  const db = getSqlite()
  return db.transaction(() => {
    upsertSchemaInDb(
      db,
      mediaId,
      provider,
      providerGameId,
      rows,
      opts.exactNames ?? true,
      opts.prune ?? true,
      opts.schemaSource ?? null
    )
    const priorEmu = emuUnlockNames(db, mediaId)
    const fresh = insertUnlocksInDb(db, mediaId, unlocks, source, fallbackMs)
    if (opts.emu) applyEmuStateInDb(db, mediaId, opts.emu, priorEmu)
    return fresh
  })()
}

// What a whole emulator-file read says beyond its earned list (emuScan).
export type EmuState = {
  locked: readonly string[]
  progress: readonly { apiName: string; current: number; max: number }[]
  // Every file parsed whole. Nothing below runs on a torn read.
  complete: boolean
  // What the files mark earned right now, with the time they give (null when
  // they give none).
  earned: readonly { apiName: string; unlockedAtMs: number | null }[]
}

// Two corrections an emulator file can make, both only on a complete read:
//
//  - Withdraw an EMULATOR unlock the files now explicitly mark not earned
//    (the emulator reported it, then the game re-locked it — a phantom).
//    Never a manual or RA unlock. And only while the files still agree with
//    most of what they told us before: a fresh or reset profile (reinstall,
//    new PC) marks EVERYTHING not earned, and acting on that would wipe a
//    game's history. So the withdrawals may not outnumber the EARLIER emulator
//    unlocks the files still confirm with the same timestamp — `priorEmu` is
//    read before this read's own inserts, and a re-earned achievement (new
//    time) does not count as agreement.
//  - Update the progress counters (upsert only, see below).
//
// Returns how many unlocks were withdrawn.
// The emulator unlocks recorded so far, with their stored time in epoch seconds.
function emuUnlockNames(db: SqliteDb, mediaId: number): Map<string, number> {
  const rows = db
    .prepare(
      `SELECT a.api_name, CAST(strftime('%s', u.unlocked_at) AS INTEGER) AS at
         FROM achievement_unlock u
         JOIN achievement a ON a.id = u.achievement_id
        WHERE a.media_id = ? AND u.source = 'emu'`
    )
    .all(mediaId) as { api_name: string; at: number }[]
  return new Map(rows.map((r) => [r.api_name, r.at]))
}

function applyEmuStateInDb(
  db: SqliteDb,
  mediaId: number,
  state: EmuState,
  priorEmu: ReadonlyMap<string, number>
): number {
  let removed = 0
  if (state.complete && state.locked.length) {
    // "Still confirmed" means the SAME unlock: the files give the time this
    // app stored for it. An achievement re-earned on a fresh or reinstalled
    // profile carries a new, later time, so it confirms nothing — otherwise a
    // user who re-earned 6 of 10 would lose the other 4 old unlocks.
    const confirmed = state.earned.filter((e) => {
      const stored = priorEmu.get(e.apiName)
      return (
        stored != null &&
        e.unlockedAtMs != null &&
        Math.abs(Math.floor(e.unlockedAtMs / 1000) - stored) <= 1
      )
    }).length
    const withdraw = state.locked.filter((n) => priorEmu.has(n))
    if (withdraw.length && confirmed > 0 && withdraw.length <= confirmed) {
      const del = db.prepare(
        `DELETE FROM achievement_unlock
          WHERE source = 'emu'
            AND achievement_id = (SELECT id FROM achievement WHERE media_id = ? AND api_name = ?)`
      )
      for (const name of withdraw) removed += del.run(mediaId, name).changes
    }
  }
  // Counters are only ever upserted, never cleared: an INI read mid-rewrite
  // looks complete but holds only the sections written so far, and clearing
  // first would wipe every counter it had not reached. A counter left behind
  // by an achievement that is now earned is hidden by the row mapper.
  const put = db.prepare(
    `INSERT INTO achievement_progress (achievement_id, current, max)
     SELECT id, ?, ? FROM achievement WHERE media_id = ? AND api_name = ?
     ON CONFLICT(achievement_id) DO UPDATE SET
       current = excluded.current, max = excluded.max, updated_at = datetime('now')`
  )
  for (const p of state.progress) put.run(p.current, p.max, mediaId, p.apiName)
  return removed
}

// One emulator read applied in one transaction: new unlocks in, phantoms out,
// counters replaced.
export function applyEmuScan(
  mediaId: number,
  unlocks: readonly UnlockInput[],
  state: EmuState,
  fallbackMs: number
): { fresh: AchievementRow[]; removed: number } {
  const db = getSqlite()
  return db.transaction(() => {
    const priorEmu = emuUnlockNames(db, mediaId)
    const fresh = insertUnlocksInDb(db, mediaId, unlocks, 'emu', fallbackMs)
    const removed = applyEmuStateInDb(db, mediaId, state, priorEmu)
    return { fresh, removed }
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

// Several earned at once, for achievements the emulator never recorded. One
// date for all of them (the user's best guess, or now). Like setManual it never
// overwrites a tracked unlock. Returns how many were newly marked.
export function setManualMany(achievementIds: readonly number[], atMs: number): number {
  const db = getSqlite()
  // Never in the future: a typed date past today would top the recent feed.
  const now = Date.now()
  const ms = Number.isFinite(atMs) && atMs > 0 ? Math.min(atMs, now) : now
  const seconds = Math.floor(ms / 1000)
  const insert = db.prepare(
    `INSERT INTO achievement_unlock (achievement_id, unlocked_at, source)
     VALUES (?, datetime(?, 'unixepoch'), 'manual')
     ON CONFLICT(achievement_id) DO NOTHING`
  )
  return db.transaction(() => {
    let n = 0
    for (const id of new Set(achievementIds)) n += insert.run(id, seconds).changes
    return n
  })()
}

// Trade the display half (name, text, hidden flag, art) of two achievements in
// the same set, keeping each api name, rarity and unlock where it is. Both end
// up 'manual', so only an exact source renames them again.
export function swapNames(firstId: number, secondId: number): void {
  if (firstId === secondId) throw new Error('Choose two different achievements to swap.')
  const db = getSqlite()
  db.transaction(() => {
    const get = db.prepare(
      'SELECT id, media_id, name, description, hidden, icon_path, icon_gray_path FROM achievement WHERE id = ?'
    )
    const a = get.get(firstId) as any
    const b = get.get(secondId) as any
    if (!a || !b) throw new Error('That achievement no longer exists.')
    if (a.media_id !== b.media_id) throw new Error('Both achievements must belong to the same game.')
    const set = db.prepare(
      `UPDATE achievement SET name = ?, description = ?, hidden = ?, icon_path = ?,
              icon_gray_path = ?, name_status = 'manual'
        WHERE id = ?`
    )
    set.run(b.name, b.description, b.hidden, b.icon_path, b.icon_gray_path, a.id)
    set.run(a.name, a.description, a.hidden, a.icon_path, a.icon_gray_path, b.id)
  })()
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

// The archive's full history asks for everything, so the limit is clamped
// rather than trusted: a renderer value is never a reason to read without end.
export function recentUnlocks(limit: number): AchievementUnlockEvent[] {
  const n = Number.isFinite(limit) ? Math.min(Math.max(1, Math.floor(limit)), MAX_RECENT_UNLOCKS) : 12
  return getSqlite()
    .prepare(`${FEED_SQL} ORDER BY u.unlocked_at DESC, a.id DESC LIMIT ?`)
    .all(n)
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
              COUNT(a.id) AS total, COUNT(u.achievement_id) AS unlocked,
              MAX(u.unlocked_at) AS last_unlocked_at
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
        total: r.total,
        lastUnlockedAt: r.last_unlocked_at ?? null
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
              (SELECT r.platform FROM game_rom r WHERE r.media_id = m.id
                ORDER BY r.preferred DESC, r.id LIMIT 1) AS rom_platform,
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
           OR EXISTS (SELECT 1 FROM game_rom r WHERE r.media_id = m.id)
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
        exePath: r.exe_path ?? null,
        platform: isPlatformKey(r.rom_platform) ? r.rom_platform : null,
        totalSeconds: r.total_seconds,
        lastPlayedAt: r.last_played ?? null,
        lastSessionSeconds: r.last_session_seconds ?? null,
        achievements: r.ach_total ? { unlocked: r.ach_unlocked, total: r.ach_total } : null
      })
    )
}
