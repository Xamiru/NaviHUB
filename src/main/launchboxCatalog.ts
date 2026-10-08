import { getSqlite } from './db/connection'
import { closeLaunchboxDb, getLaunchboxDb, inspectLaunchboxCatalog, launchboxCatalogPath } from './launchboxCatalogDb'
import {
  COVER_MAX_EDGE,
  LAUNCHBOX_SOURCE,
  imageUrl,
  jsonList,
  platformLabel,
  titleKey,
  yearOf
} from './launchboxCatalogCore'
import { ftsQueryFor } from './ftsQuery'
import { downloadScaledImages } from './files'
import { updateActivity } from './progress'
import { installCatalogRelease } from './catalogRelease'
import { fetchPlaytimes, hltbLengthHours } from './hltb'
import * as links from './repos/externalLinkRepo'
import * as bangumi from './bangumi'
import type { RefreshAspect } from '@shared/refresh'
import type {
  BulkListParams,
  BulkPreviewItem,
  ExternalLinkMethod,
  ExternalLinkSource,
  GamesCatalogStatus,
  ImportSearchResult,
  ImportSummary
} from '@shared/types'
import type { BgmReading } from './bangumiCore'

// The games catalog v2: LaunchBox's games database collapsed into works (one
// game across platforms), joined with Bangumi links, Wikidata ids and the old
// RAWG pack — built by scripts/build-games-catalog2.cjs and attached to the
// `games-catalog-2` prerelease. It gives real box art (Japanese first), English
// overviews, platforms and the ids that reach a game's cast.
//
// Rows imported from here are keyed ('launchbox', work id). A RAWG-era or Steam
// row is never re-keyed: importWork() ENRICHES it (cover, platforms, Japanese
// title, links) and records the work in media_external_link.
const CATALOG_TAG = 'games-catalog-2'
const ASSET_NAME = 'games-catalog.db.gz'
const MAX_ARCHIVE_BYTES = 256 * 1024 * 1024
const MAX_DATABASE_BYTES = 1024 * 1024 * 1024

const NOT_INSTALLED = 'The games catalog is not installed yet — use its Install button in the import dialog.'

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface WorkRow {
  id: number
  name: string
  name_ja: string | null
  released: string | null
  overview: string | null
  developers: string | null
  publishers: string | null
  genres: string | null
  platforms: string | null
  metacritic: number | null
  popularity: number
  rating: number | null
  video_url: string | null
}

export interface WorkXref {
  source: ExternalLinkSource
  externalId: string
  method: ExternalLinkMethod
}

export interface CoverCandidate {
  url: string
  region: string | null
  platform: string | null
}

export function status(): GamesCatalogStatus {
  const db = getLaunchboxDb()
  if (!db) return { installed: false, gameCount: 0, snapshot: null }
  try {
    const count = (db.prepare('SELECT COUNT(*) AS n FROM lb_work').get() as { n: number }).n
    const snap = db.prepare(`SELECT value FROM lb_meta WHERE key = 'snapshot'`).get() as
      | { value: string }
      | undefined
    return { installed: true, gameCount: count, snapshot: snap?.value ?? null }
  } catch {
    return { installed: false, gameCount: 0, snapshot: null }
  }
}

// Same stage-validate-swap install as the RAWG pack (catalogRelease.ts).
export async function install(): Promise<GamesCatalogStatus> {
  await installCatalogRelease({
    tag: CATALOG_TAG,
    asset: ASSET_NAME,
    target: launchboxCatalogPath(),
    label: 'Games catalog archive',
    maxArchiveBytes: MAX_ARCHIVE_BYTES,
    maxDatabaseBytes: MAX_DATABASE_BYTES,
    timeoutMs: 900_000,
    inspect: (tmp) => {
      inspectLaunchboxCatalog(tmp)
    },
    close: closeLaunchboxDb
  })
  const after = status()
  if (!after.installed || after.gameCount === 0) {
    closeLaunchboxDb()
    throw new Error('Installed catalog could not be opened — try installing again.')
  }
  return after
}

function requireDb() {
  const db = getLaunchboxDb()
  if (!db) throw new Error(NOT_INSTALLED)
  return db
}

export function getWork(workId: number): WorkRow | null {
  return (requireDb().prepare('SELECT * FROM lb_work WHERE id = ?').get(workId) as WorkRow | undefined) ?? null
}

// Box art in preference order: Japanese boxes first for every game (the
// user's choice), then North America, World, Europe, unmarked — each in the
// order the work's platforms were released.
export function coverCandidates(workId: number): CoverCandidate[] {
  return (
    requireDb()
      .prepare(`SELECT file, region, platform FROM lb_image WHERE work_id = ? AND kind = 'box' ORDER BY rank`)
      .all(workId) as { file: string; region: string | null; platform: string | null }[]
  ).map((r) => ({ url: imageUrl(r.file), region: r.region, platform: r.platform }))
}

export function logoUrl(workId: number): string | null {
  const row = requireDb()
    .prepare(`SELECT file FROM lb_image WHERE work_id = ? AND kind = 'logo' LIMIT 1`)
    .get(workId) as { file: string } | undefined
  return row ? imageUrl(row.file) : null
}

export function xrefs(workId: number): WorkXref[] {
  return (
    requireDb()
      .prepare('SELECT source, external_id, method FROM lb_xref WHERE work_id = ? ORDER BY source')
      .all(workId) as { source: ExternalLinkSource; external_id: string; method: ExternalLinkMethod }[]
  ).map((r) => ({ source: r.source, externalId: r.external_id, method: r.method }))
}

// Works that state this id (a Steam app, a RAWG game, a Bangumi subject).
export function worksFor(source: ExternalLinkSource, externalId: string): number[] {
  return (
    requireDb()
      .prepare('SELECT work_id FROM lb_xref WHERE source = ? AND external_id = ?')
      .all(source, externalId) as { work_id: number }[]
  ).map((r) => r.work_id)
}

// A Bangumi voice actor's kana reading and romaji, baked into the pack.
// Baked lookups answer null rather than throw: a pack built before a table
// existed must not stop a game's cast from being read.
function bakedRow<T>(sql: string, id: number): T | null {
  const db = getLaunchboxDb()
  if (!db) return null
  try {
    return (db.prepare(sql).get(id) as T | undefined) ?? null
  } catch {
    return null
  }
}

export function bakedReading(personId: number): BgmReading | null {
  return bakedRow<BgmReading>('SELECT kana, romaji FROM bgm_person WHERE id = ?', personId)
}

// A game character's romanized / English name, baked into the pack.
export function bakedCharacterNames(characterId: number): { romaji: string | null; english: string | null } | null {
  return bakedRow('SELECT romaji, english FROM bgm_character WHERE id = ?', characterId)
}

// Works for a Bangumi subject, or [] when the pack is not installed.
export function worksForBangumi(subjectId: number): WorkRow[] {
  const db = getLaunchboxDb()
  if (!db) return []
  return db
    .prepare(
      `SELECT w.* FROM lb_xref x JOIN lb_work w ON w.id = x.work_id
       WHERE x.source = 'bangumi' AND x.external_id = ?`
    )
    .all(String(subjectId)) as WorkRow[]
}

// Works titled exactly this (English or Japanese title, by titleKey) and
// released within a year of `year` — the fallback for a library row the
// catalog has no id chain for. FTS narrows, the key decides.
export function findByTitle(title: string, year: number | null): WorkRow[] {
  const key = titleKey(title)
  const fts = ftsQueryFor(title.replace(/[^\p{L}\p{N}]+/gu, ' '))
  if (!key || !fts) return []
  const rows = requireDb()
    .prepare(
      `SELECT w.* FROM lb_fts f JOIN lb_work w ON w.id = f.rowid
       WHERE lb_fts MATCH ? ORDER BY w.popularity DESC LIMIT 60`
    )
    .all(fts) as WorkRow[]
  return rows.filter((w) => {
    if (titleKey(w.name) !== key && titleKey(w.name_ja) !== key) return false
    const y = yearOf(w.released)
    return year == null || y == null || Math.abs(y - year) <= 1
  })
}

export function snapshot(): string | null {
  return status().snapshot
}

function coverForSearch(workId: number): string | null {
  return coverCandidates(workId)[0]?.url ?? null
}

function platformsLine(json: string | null): string {
  const list = jsonList(json).map(platformLabel)
  return list.length ? list.slice(0, 4).join(' · ') : 'Game'
}

export function search(query: string): ImportSearchResult[] {
  const db = requireDb()
  const fts = ftsQueryFor(query)
  if (!fts) return []
  const rows = db
    .prepare(
      `SELECT w.* FROM lb_fts f JOIN lb_work w ON w.id = f.rowid
       WHERE lb_fts MATCH ? ORDER BY w.popularity DESC LIMIT 20`
    )
    .all(fts) as WorkRow[]
  return rows.map((w) => ({
    id: w.id,
    title: w.name,
    native: w.name_ja,
    year: yearOf(w.released),
    format: platformsLine(w.platforms),
    episodes: null,
    coverUrl: coverForSearch(w.id)
  }))
}

// ---------------------------------------------------------------- import

export interface ImportWorkOptions {
  // Bulk path: no HowLongToBeat lookups (see gamesCatalog.importGame).
  skipHltb?: boolean
  // Library Refresh: media_item columns only, nothing deleted.
  only?: RefreshAspect[]
  // Enrich this existing row instead of resolving one (re-link, upgrade).
  mediaId?: number
  // How the caller tied mediaId to the work (stored on the launchbox link).
  linkMethod?: ExternalLinkMethod
}

interface TargetRow {
  id: number
  external_source: string | null
  external_id: string | null
}

// The library row a work belongs to, if any: its own key, a recorded link, or
// a Steam/RAWG row the catalog names.
export function targetFor(workId: number): { row: TargetRow; method: ExternalLinkMethod } | null {
  const main = getSqlite()
  const byKey = main
    .prepare('SELECT id, external_source, external_id FROM media_item WHERE external_source = ? AND external_id = ?')
    .get(LAUNCHBOX_SOURCE, String(workId)) as TargetRow | undefined
  if (byKey) return { row: byKey, method: 'xref' }
  const linked = main
    .prepare(
      `SELECT m.id, m.external_source, m.external_id, l.method FROM media_external_link l
       JOIN media_item m ON m.id = l.media_id WHERE l.source = 'launchbox' AND l.external_id = ? LIMIT 1`
    )
    .get(String(workId)) as (TargetRow & { method: ExternalLinkMethod }) | undefined
  if (linked) return { row: linked, method: linked.method }
  for (const x of xrefs(workId)) {
    if (x.source !== 'steam' && x.source !== 'rawg') continue
    const row = main
      .prepare(
        `SELECT id, external_source, external_id FROM media_item
         WHERE media_type = 'game' AND external_source = ? AND external_id = ?`
      )
      .get(x.source, x.externalId) as TargetRow | undefined
    if (row) return { row, method: x.method }
  }
  return null
}

function steamCapsule(appId: string): string {
  return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900_2x.jpg`
}

// The first candidate that downloads wins. Japanese box → Bangumi cover (the
// caller supplies it; Bangumi's game covers are Japanese editions) → the other
// boxes → Steam's library capsule.
async function fetchCover(urls: string[]): Promise<string | null> {
  for (const url of urls) {
    const got = (await downloadScaledImages([url], COVER_MAX_EDGE)).get(url) ?? null
    if (got) return got
  }
  return null
}

export function coverOrder(
  boxes: CoverCandidate[],
  bangumiCover: string | null,
  steamAppId: string | null
): string[] {
  const japan = boxes.filter((b) => b.region === 'Japan').map((b) => b.url)
  const rest = boxes.filter((b) => b.region !== 'Japan').map((b) => b.url)
  return [...japan, ...(bangumiCover ? [bangumiCover] : []), ...rest, ...(steamAppId ? [steamCapsule(steamAppId)] : [])]
}

function upsertCompanyByName(db: any, name: string): number {
  const row = db.prepare('SELECT id FROM company WHERE LOWER(name) = LOWER(?)').get(name) as
    | { id: number }
    | undefined
  if (row) return row.id
  return Number(
    db
      .prepare('INSERT INTO company (name, type, external_source) VALUES (?, ?, ?)')
      .run(name, 'developer', LAUNCHBOX_SOURCE).lastInsertRowid
  )
}

function tagId(db: any, name: string, category: string): number {
  const row = db.prepare('SELECT id FROM tag WHERE name = ?').get(name) as { id: number } | undefined
  if (row) return row.id
  return Number(db.prepare('INSERT INTO tag (name, category) VALUES (?, ?)').run(name, category).lastInsertRowid)
}

// Replaces this title's links to tags of ONE category. Tags of other
// categories (a user's own, Steam's store categories) are untouched.
function replaceTags(db: any, mediaId: number, category: string, names: string[]): void {
  db.prepare(
    `DELETE FROM media_tag WHERE media_id = ? AND tag_id IN (SELECT id FROM tag WHERE category = ?)`
  ).run(mediaId, category)
  for (const name of names) {
    db.prepare('INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(
      mediaId,
      tagId(db, name, category)
    )
  }
}

function mergeMetadata(db: any, mediaId: number, patch: (meta: Record<string, unknown>) => void): void {
  const row = db.prepare('SELECT metadata FROM media_item WHERE id = ?').get(mediaId) as
    | { metadata: string | null }
    | undefined
  let meta: Record<string, unknown> = {}
  try {
    meta = row?.metadata ? JSON.parse(row.metadata) || {} : {}
  } catch {
    meta = {}
  }
  const before = JSON.stringify(meta)
  patch(meta)
  const after = JSON.stringify(meta)
  if (after !== before) db.prepare('UPDATE media_item SET metadata = ? WHERE id = ?').run(after, mediaId)
}

// Two-phase: cover (and HLTB for a new title) first, then one transaction.
//  - New title or a ('launchbox', id) row: authoritative — canonical fields,
//    companies, genres and platforms are replaced; personal tracking is kept.
//  - A RAWG-era or Steam row: enriched — cover, platforms, Japanese title, a
//    better overview for RAWG rows (Steam's own text stays), a missing
//    Metacritic, and the catalog's links. Its key, title and date stay.
// Bangumi cast enrichment is a separate step (gameCast.enrichGame).
// Cover order: coverOrder() below.
export async function importWork(workId: number, opts: ImportWorkOptions = {}): Promise<ImportSummary> {
  const partial = !!opts.only?.length
  const wants = (a: RefreshAspect): boolean => !partial || !!opts.only?.includes(a)
  const w = getWork(workId)
  if (!w) throw new Error('Game not found in the catalog')

  const main = getSqlite()
  let target: TargetRow | null = null
  let linkMethod: ExternalLinkMethod = opts.linkMethod ?? 'xref'
  if (opts.mediaId != null) {
    target = (main
      .prepare('SELECT id, external_source, external_id FROM media_item WHERE id = ?')
      .get(opts.mediaId) as TargetRow | undefined) ?? null
    if (!target) throw new Error('That title is not in the library.')
  } else {
    const found = targetFor(workId)
    if (found) {
      target = found.row
      linkMethod = found.method
    }
  }
  const own = !target || target.external_source === LAUNCHBOX_SOURCE
  if (!target && partial) throw new Error('That title is not in the library — import it first.')

  const workXrefs = xrefs(workId)
  const steamId =
    target?.external_source === 'steam'
      ? target.external_id
      : (workXrefs.find((x) => x.source === 'steam')?.externalId ?? null)

  let coverPath: string | null = null
  if (wants('cover')) {
    const boxes = coverCandidates(workId)
    // No Japanese box: Bangumi's cover (its game covers are Japanese editions)
    // comes next — one request, only when it can matter.
    const subject =
      (target ? links.linkedId(target.id, 'bangumi') : null) ??
      workXrefs.find((x) => x.source === 'bangumi')?.externalId ??
      null
    const bangumiCover =
      subject && !boxes.some((b) => b.region === 'Japan')
        ? await bangumi.subjectCover(Number(subject)).catch(() => null)
        : null
    coverPath = await fetchCover(coverOrder(boxes, bangumiCover, steamId))
  }

  const year = yearOf(w.released)
  const hltbTimes = own && !partial && !opts.skipHltb ? await fetchPlaytimes(w.name, year) : null
  const lengthHours = hltbTimes ? hltbLengthHours(hltbTimes) : null
  const platforms = jsonList(w.platforms).map(platformLabel)

  updateActivity({ phase: 'writing' })
  return main.transaction((): ImportSummary => {
    let mediaId: number
    const created = !target
    if (!target) {
      mediaId = Number(
        main
          .prepare(
            `INSERT INTO media_item
             (media_type, title, title_original, synopsis, cover_path, total_units, release_date,
              external_source, external_id)
             VALUES ('game', ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .run(w.name, w.name_ja, w.overview, coverPath, lengthHours, w.released, LAUNCHBOX_SOURCE, String(w.id))
          .lastInsertRowid
      )
    } else {
      mediaId = target.id
      const sets: string[] = []
      const args: unknown[] = []
      if (wants('text')) {
        if (own) {
          sets.push('title=?', 'title_original=?', 'synopsis=?', 'release_date=?')
          args.push(w.name, w.name_ja, w.overview, w.released)
        } else {
          sets.push('title_original=COALESCE(?, title_original)')
          args.push(w.name_ja)
          // RAWG's description gives way to the catalog's overview; Steam's
          // own store text is only filled when missing.
          if (target.external_source === 'steam') sets.push('synopsis=COALESCE(synopsis, ?)')
          else sets.push('synopsis=COALESCE(?, synopsis)')
          args.push(w.overview)
        }
      }
      if (wants('cover')) {
        sets.push('cover_path=COALESCE(?, cover_path)')
        args.push(coverPath)
      }
      if (own && !partial) {
        sets.push('total_units=COALESCE(?, total_units)')
        args.push(lengthHours)
      }
      if (sets.length) {
        sets.push("updated_at=datetime('now')")
        main.prepare(`UPDATE media_item SET ${sets.join(', ')} WHERE id=?`).run(...args, mediaId)
      }
    }

    if (wants('text')) {
      mergeMetadata(main, mediaId, (meta) => {
        if ((w.metacritic ?? 0) > 0 && (own || meta.metacritic == null)) meta.metacritic = w.metacritic
        if (hltbTimes) meta.hltb = hltbTimes
      })
    }

    // Child rows and links stop here on a partial refresh.
    if (partial) return { mediaId, title: w.name, studios: 0, cast: 0, staff: 0, created }

    let studios = 0
    if (own) {
      const roles: [string[], string][] = [
        [jsonList(w.developers), 'developer'],
        [jsonList(w.publishers), 'publisher']
      ]
      for (const [names, role] of roles) {
        if (!names.length) continue
        main.prepare('DELETE FROM media_company WHERE media_id=? AND role=?').run(mediaId, role)
        for (const name of names) {
          main
            .prepare('INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)')
            .run(mediaId, upsertCompanyByName(main, name), role)
          studios++
        }
      }
      const genres = jsonList(w.genres)
      if (genres.length) replaceTags(main, mediaId, 'genre', genres)
    }
    if (platforms.length) replaceTags(main, mediaId, 'platform', platforms)

    if (!own) links.set(mediaId, 'launchbox', String(w.id), linkMethod)
    for (const x of workXrefs) {
      if (x.source === target?.external_source) continue // the row's own key
      if (x.source === 'rawg' && own) continue // only a RAWG-era row cares
      links.set(mediaId, x.source, x.externalId, x.method)
    }
    return { mediaId, title: w.name, studios, cast: 0, staff: 0, created }
  })()
}

// ---------------------------------------------------------------- top lists

// The /bulk page. Same floors as the RAWG pack's lists so shovelware cannot
// top them: 'rating' needs real votes behind it (popularity), and 'newest'
// a popularity floor.
export function buildCatalogQuery(params: BulkListParams): { sql: string; args: unknown[] } {
  const where: string[] = []
  const args: unknown[] = []
  let order: string
  switch (params.sort) {
    case 'popular':
      order = 'popularity DESC, id'
      break
    case 'metacritic':
      where.push('metacritic IS NOT NULL')
      order = 'metacritic DESC, popularity DESC, id'
      break
    case 'rating':
      where.push('rating IS NOT NULL', 'popularity >= 50')
      order = 'rating DESC, popularity DESC, id'
      break
    case 'newest':
      where.push('released IS NOT NULL', 'popularity >= 5')
      order = 'released DESC, popularity DESC, id'
      break
    default:
      throw new Error(`Unknown catalog sort: ${params.sort}`)
  }
  if (params.yearFrom) {
    where.push('released >= ?')
    args.push(`${params.yearFrom}-01-01`)
  }
  if (params.yearTo) {
    where.push('released <= ?')
    args.push(`${params.yearTo}-12-31`)
  }
  if (params.genre) {
    where.push('genres LIKE ?')
    args.push(`%"${params.genre}"%`)
  }
  const sql = `SELECT * FROM lb_work${where.length ? ` WHERE ${where.join(' AND ')}` : ''} ORDER BY ${order} LIMIT ? OFFSET ?`
  return { sql, args }
}

export function listTop(
  params: BulkListParams,
  keep: (item: BulkPreviewItem) => boolean = () => true
): BulkPreviewItem[] {
  const db = requireDb()
  const { sql, args } = buildCatalogQuery(params)
  const stmt = db.prepare(sql)
  const CHUNK = 500
  const out: BulkPreviewItem[] = []
  for (let offset = 0; ; offset += CHUNK) {
    const rows = stmt.all(...args, CHUNK, offset) as WorkRow[]
    for (const w of rows) {
      const item: BulkPreviewItem = {
        sourceId: w.id,
        title: w.name,
        year: yearOf(w.released),
        coverUrl: coverForSearch(w.id),
        score: w.metacritic
      }
      if (!keep(item)) continue
      out.push(item)
      if (out.length >= params.count) return out
    }
    if (rows.length < CHUNK) return out
  }
}
