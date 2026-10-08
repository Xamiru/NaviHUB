import { getSqlite } from './db/connection'
import { sleep } from './http'
import { beginActivity, endActivity } from './progress'
import * as tasks from './tasks'
import { TaskCancelledError } from './tasks'
import { cooperativeGate, type PauseGate } from './taskControls'
import { runWithActivitySignal } from './activityContext'
import { claimLibraryJob } from './libraryJobLock'
import * as anilist from './anilist'
import * as tmdb from './tmdb'
import * as vndb from './vndb'
import * as steam from './steam'
import * as openlibrary from './openlibrary'
import * as themes from './themes'
import * as hltb from './hltb'
import * as gamesCatalog from './gamesCatalog'
import { getCatalogDb } from './gamesCatalogDb'
import * as launchboxCatalog from './launchboxCatalog'
import { getLaunchboxDb } from './launchboxCatalogDb'
import { LAUNCHBOX_SOURCE } from './launchboxCatalogCore'
import { castOrWarn } from './gameLinks'
import * as links from './repos/externalLinkRepo'
import { REFRESHABLE_SOURCES, aspectsForType, missingClause } from '@shared/refresh'
import type { RefreshAspect, RefreshRequest } from '@shared/refresh'
import type { ExternalLinkMethod, MediaType, RefreshPreview, RefreshRunStatus } from '@shared/types'

// Library Refresh — re-runs each title's own importer, writing ONLY the aspects
// you picked (see @shared/refresh.ts for the vocabulary and the invariant).
//
// The run is the bulkImport.ts singleton, for the same reasons: it needs cancel
// and a `done` state that stays readable after polling stops, so it is NOT
// withActivity — but the loop DOES begin/endActivity around itself, which is
// what arms progress.ts so each title's image downloads reach the Topbar pill.
//
// Pacing is keyed by SOURCE rather than media type (bulkImport keys by its own
// source list): the rate limit belongs to the API, and anime and manga share
// AniList's budget. Numbers taken from bulkImport.SOURCE_DELAY_MS and
// steam.backfillMetacritic.
const SOURCE_DELAY_MS: Record<string, number> = {
  anilist: 0, // anilist.gql's shared throttle spaces every request, full cast pages included
  tmdb: 300,
  vndb: 600,
  steam: 1600, // Steam documents ~200 requests / 5 min / IP
  openlibrary: 300,
  rawg: 800, // local catalog, but a 'length' or full pass asks HowLongToBeat
  launchbox: 300 // local catalog; cover downloads and Bangumi pace themselves
}

// Quick sources first: an AniList pass takes hours, and a mixed run should not
// hold minutes of TMDB or Steam work behind it.
const SOURCE_ORDER_SQL = `CASE m.external_source
    WHEN 'rawg' THEN 0 WHEN 'launchbox' THEN 0 WHEN 'openlibrary' THEN 1 WHEN 'steam' THEN 2 WHEN 'tmdb' THEN 3
    WHEN 'vndb' THEN 4 WHEN 'anilist' THEN 6 ELSE 5 END`

const SOURCE_NAMES: Record<string, string> = {
  anilist: 'AniList',
  tmdb: 'TMDB',
  vndb: 'VNDB',
  steam: 'Steam',
  openlibrary: 'Open Library',
  rawg: 'The RAWG catalog',
  launchbox: 'The games catalog'
}

// Ten in a row from one source means that source (or the network) is down, not
// ten unlucky titles (the bulkImport / steam-backfill posture). Counted per
// source: the rest of that source's titles are skipped while the others carry
// on. Individual failures never stop the run — they are listed at the end.
const MAX_CONSECUTIVE_FAILURES = 10

interface RefreshRow {
  id: number
  title: string
  media_type: MediaType
  external_source: string
  external_id: string
}

// The titles a request would touch. `onlyMissing` ORs the per-aspect tests: you
// asked for one or more things, so a title lacking any one of them is worth a request.
export function selectRows(req: RefreshRequest): RefreshRow[] {
  const db = getSqlite()
  if (!req.types.length || !req.aspects.length) return []
  const typePlaceholders = req.types.map(() => '?').join(', ')
  const sourceFilter = servedSourceSql(req.aspects)
  const themesOnly = req.aspects.includes('themes') && req.aspects.every((aspect) => aspect === 'themes')
  const themeSourceFilter = themesOnly ? ` AND m.external_source = 'anilist'` : ''
  const ids = (req.mediaIds ?? []).filter((n) => Number.isInteger(n))
  const idFilter = req.mediaIds ? ` AND m.id IN (${ids.map(() => '?').join(', ') || 'NULL'})` : ''
  const missing = req.onlyMissing && !req.mediaIds ? ` AND ${missingClause(req.aspects)}` : ''
  const order = `${SOURCE_ORDER_SQL}, m.external_source${req.aspects.includes('full') ? ', m.updated_at' : ''}, m.id`
  return db
    .prepare(
      `SELECT m.id, m.title, m.media_type, m.external_source, m.external_id
         FROM media_item m
        WHERE m.media_type IN (${typePlaceholders})
          AND m.external_id IS NOT NULL
          AND ${sourceFilter}${themeSourceFilter}${missing}${idFilter}
        ORDER BY ${order}`
    )
    .all(...req.types, ...ids) as RefreshRow[]
}

// The catalog sources are served only while a catalog is installed: 'launchbox'
// rows by the v2 pack, 'rawg' rows by either (the v2 pack through the row's
// link). HowLongToBeat lengths need no importer, so a 'length' request also
// takes games from any source (legacy IGDB rows included).
function servedSources(): string[] {
  const v2 = getLaunchboxDb() != null
  return REFRESHABLE_SOURCES.filter((src) =>
    src === 'launchbox' ? v2 : src === 'rawg' ? v2 || getCatalogDb() != null : true
  )
}

function servedSourceSql(aspects: RefreshAspect[]): string {
  const list = servedSources()
    .map((src) => `'${src}'`)
    .join(',')
  const anyGame = aspects.includes('length') ? ` OR m.media_type = 'game'` : ''
  return `(m.external_source IN (${list})${anyGame})`
}

function canServe(row: Pick<RefreshRow, 'external_source' | 'media_type'>, aspects: RefreshAspect[]): boolean {
  const only = aspectsForType(aspects, row.media_type)
  if (!only.length) return false
  if (only.includes('length') && row.media_type === 'game') return true
  return servedSources().includes(row.external_source)
}

// Rough seconds one title costs, from the pacing above and typical request
// counts: AniList at one request per 2.1 s (a full anime pages its cast, about
// four requests), a HowLongToBeat lookup about two seconds, the rest one
// round trip plus the source's delay.
export function estimateTitleSeconds(
  row: Pick<RefreshRow, 'external_source' | 'media_type'>,
  aspects: RefreshAspect[]
): number {
  const only = aspectsForType(aspects, row.media_type)
  const full = only.includes('full')
  let s = 0
  if (only.includes('themes')) s += 1.5
  if (only.includes('length') && !full) s += 2
  const rest = only.filter((a) => a !== 'themes' && a !== 'length')
  if (!rest.length) return s
  switch (row.external_source) {
    case 'anilist':
      return s + (full ? (row.media_type === 'anime' ? 8.4 : 6.3) : 2.1)
    case 'tmdb':
      return s + (row.media_type === 'tv' && (full || rest.includes('episodes')) ? 5 : 1) +
        (rest.includes('text') ? 0.5 : 0)
    case 'vndb':
      return s + 1.6
    case 'steam':
      return s + (full ? 4.5 : 2.6)
    case 'openlibrary':
      return s + 2
    case 'rawg':
      return s + (full ? 2.8 : 0.8)
    case 'launchbox':
      return s + (full ? 4 : 1)
    default:
      return s
  }
}

export function preview(req: RefreshRequest): RefreshPreview {
  const db = getSqlite()
  if (!req.types.length || !req.aspects.length) return { total: 0, unsupported: 0, estimateSeconds: 0 }
  const typePlaceholders = req.types.map(() => '?').join(', ')
  // Rows no importer can serve (legacy IGDB games, catalog games while the
  // catalog is not installed). Counted so the UI can say so instead of quietly
  // excluding them.
  const unsupported = (
    db
      .prepare(
        `SELECT COUNT(*) AS n FROM media_item m
          WHERE m.media_type IN (${typePlaceholders})
            AND m.external_id IS NOT NULL
            AND m.external_source IS NOT NULL
            AND NOT ${servedSourceSql(req.aspects)}`
      )
      .get(...req.types) as { n: number }
  ).n
  const rows = selectRows(req)
  const estimateSeconds = Math.round(
    rows.reduce((sum, row) => sum + estimateTitleSeconds(row, req.aspects), 0)
  )
  return { total: rows.length, unsupported, estimateSeconds }
}

// One title. Dispatches on the ROW's source, not its media type: a game may be
// a live 'steam' row or a legacy 'rawg' one, and only the row knows.
export async function refreshOne(row: RefreshRow, aspects: RefreshAspect[]): Promise<boolean> {
  // Hand each importer only the aspects its source can actually serve, so a
  // "episodes" tick on a movie is a no-op rather than an empty UPDATE.
  const only = aspectsForType(aspects, row.media_type)
  if (!only.length) return false
  let changed = false
  if (only.includes('themes')) {
    changed = await themes.refreshThemes(row.id)
  }
  // Source-free, and subsumed by a full re-import (the game importers look the
  // length up themselves).
  if (only.includes('length') && !only.includes('full')) {
    changed = (await hltb.fetchForMedia(row.id)) != null || changed
  }
  const metadataOnly = only.filter((aspect) => aspect !== 'themes' && aspect !== 'length')
  if (!metadataOnly.length || !servedSources().includes(row.external_source)) return changed
  if (row.media_type === 'game') {
    const work = catalogWork(row)
    if (work) {
      await refreshGameFromCatalog(row, work, metadataOnly)
      return true
    }
    // An unlinked RAWG-era row with only the v2 pack installed: nothing to ask.
    if (row.external_source === 'rawg' && getCatalogDb() == null) return changed
  }
  if (metadataOnly.includes('full')) {
    await fullImport(row, metadataOnly.includes('text'))
    return true
  }
  switch (row.external_source) {
    case 'anilist':
      if (row.media_type === 'manga') await anilist.importManga(Number(row.external_id), { only: metadataOnly })
      else await anilist.importAnime(Number(row.external_id), { only: metadataOnly })
      return true
    case 'tmdb':
      if (row.media_type === 'tv') await tmdb.importTv(Number(row.external_id), { only: metadataOnly })
      else await tmdb.importMovie(Number(row.external_id), { only: metadataOnly })
      return true
    case 'vndb':
      await vndb.importVisualNovel(Number(row.external_id), { only: metadataOnly })
      return true
    case 'steam':
      await steam.importGame(Number(row.external_id), { only: metadataOnly })
      return true
    case 'openlibrary':
      await openlibrary.importBook(row.external_id, { only: metadataOnly })
      return true
    case 'rawg':
      await gamesCatalog.importGame(Number(row.external_id), { only: metadataOnly })
      return true
    case 'launchbox':
      await launchboxCatalog.importWork(Number(row.external_id), { only: metadataOnly })
      return true
    default:
      throw new Error(`No importer for source "${row.external_source}"`)
  }
}

// The games catalog v2 work a game row belongs to, when the pack is installed:
// its own key, or the link the upgrade (or the user) recorded.
function catalogWork(row: RefreshRow): { id: number; method: ExternalLinkMethod } | null {
  if (getLaunchboxDb() == null) return null
  if (row.external_source === LAUNCHBOX_SOURCE) return { id: Number(row.external_id), method: 'xref' }
  const link = links.get(row.id, 'launchbox')
  return link && link.externalId ? { id: Number(link.externalId), method: link.method } : null
}

// A catalog-linked game. The catalog owns its cover (Japanese box first) and
// cast; a Steam row's own importer still refreshes its store text, so a
// Steam pass never puts the store capsule back over the box art.
async function refreshGameFromCatalog(
  row: RefreshRow,
  work: { id: number; method: ExternalLinkMethod },
  aspects: RefreshAspect[]
): Promise<void> {
  const full = aspects.includes('full')
  const own = row.external_source === LAUNCHBOX_SOURCE
  const asRow = own ? {} : { mediaId: row.id, linkMethod: work.method }
  if (row.external_source === 'steam') {
    const storeAspects = aspects.filter((a) => a !== 'cover')
    if (full) await steam.importGame(Number(row.external_id))
    else if (storeAspects.length) await steam.importGame(Number(row.external_id), { only: storeAspects })
    if (full) await launchboxCatalog.importWork(work.id, asRow)
    else if (aspects.includes('cover')) await launchboxCatalog.importWork(work.id, { ...asRow, only: ['cover'] })
  } else {
    await launchboxCatalog.importWork(work.id, full ? asRow : { ...asRow, only: aspects })
  }
  // The catalog part has landed; Bangumi being down only costs the cast.
  if (full) await castOrWarn(row.id, row.title)
}

// The import-dialog import, run for an existing row. AniList always pages the
// whole cast: the bulk path's liteCharacters keeps only the first 25, and its
// authoritative prune would then delete the rest. OMDb is skipped unless asked
// for, because a free key's 1,000 requests a day would not last one movie run.
async function fullImport(row: RefreshRow, withOmdb: boolean): Promise<void> {
  const id = Number(row.external_id)
  switch (row.external_source) {
    case 'anilist':
      if (row.media_type === 'manga') await anilist.importManga(id)
      else await anilist.importAnime(id)
      return
    case 'tmdb':
      if (row.media_type === 'tv') await tmdb.importTv(id, { skipOmdb: !withOmdb })
      else await tmdb.importMovie(id, { skipOmdb: !withOmdb })
      return
    case 'vndb':
      await vndb.importVisualNovel(id)
      return
    case 'steam':
      await steam.importGame(id)
      return
    case 'openlibrary':
      await openlibrary.importBook(row.external_id)
      return
    case 'rawg':
      await gamesCatalog.importGame(id)
      return
    case 'launchbox':
      await launchboxCatalog.importWork(id)
      return
    default:
      throw new Error(`No importer for source "${row.external_source}"`)
  }
}

let status: RefreshRunStatus = {
  id: 0,
  state: 'idle',
  label: '',
  done: 0,
  total: 0,
  refreshed: 0,
  skipped: 0,
  failed: 0,
  message: null,
  failures: []
}
let gate: PauseGate | null = null

export function getStatus(): RefreshRunStatus {
  return { ...status, failures: [...status.failures] }
}

export function cancel(): void {
  if (status.state === 'running') gate?.controls.cancel?.()
}

let lastRequest: RefreshRequest | null = null

// Runs the last run's failed titles again, with the same aspects.
export function retryFailed(deps: Parameters<typeof start>[1] = {}): RefreshRunStatus {
  if (status.state === 'running') throw new Error('A refresh is already running.')
  if (!lastRequest || !status.failures.length) throw new Error('No failed titles to retry.')
  return start({ ...lastRequest, mediaIds: status.failures.map((f) => f.id) }, deps)
}

function labelFor(req: RefreshRequest): string {
  return `${req.aspects.join(', ')} · ${req.types.length} type${req.types.length === 1 ? '' : 's'}`
}

// Fire-and-forget (the bulkImport posture) — the renderer follows via
// refresh:status. `deps` is the test seam: the loop's IO injected.
export function start(
  req: RefreshRequest,
  deps: {
    run?: (row: RefreshRow, aspects: RefreshAspect[]) => Promise<boolean | void>
    rows?: RefreshRow[]
    delayMs?: number
  } = {}
): RefreshRunStatus {
  if (status.state === 'running') throw new Error('A refresh is already running.')
  const rows = deps.rows ?? selectRows(req)
  if (!rows.length) throw new Error('Nothing to refresh — every matching title already has it.')
  const releaseJob = claimLibraryJob('refresh')
  lastRequest = req

  const id = status.id + 1
  status = {
    id,
    state: 'running',
    label: labelFor(req),
    done: 0,
    total: rows.length,
    refreshed: 0,
    skipped: 0,
    failed: 0,
    message: null,
    failures: []
  }

  const run = deps.run ?? refreshOne

  let handle: tasks.TaskHandle
  const runGate = cooperativeGate(
    () => handle.progress({ state: 'paused' }),
    () => handle.progress({ state: 'running' })
  )
  gate = runGate
  const task = tasks.create({
    kind: 'libraryRefresh',
    label: `Refresh library: ${status.label}`,
    route: '/bulk',
    controls: runGate.controls,
    project: () =>
      status.id === id
        ? { detail: status.message, done: status.done, total: status.total }
        : null
  })
  handle = task

  void runWithActivitySignal(runGate.signal, async () => {
    const slot = beginActivity(`Refresh library: ${status.label}`, { attachTo: task })
    try {
      const consecutive = new Map<string, number>()
      const abandoned = new Set<string>()
      for (let i = 0; i < rows.length; i++) {
        // Guarded, not unconditional: awaiting an already-resolved promise still
        // defers a microtask, shifting when a cancel is observed relative to the
        // title in flight.
        if (runGate.paused) await runGate.wait()
        if (status.id !== id) return
        if (runGate.cancelled) {
          status = { ...status, state: 'cancelled', message: null }
          return
        }
        const row = rows[i]
        status = { ...status, done: i + 1, message: row.title }
        // Nothing this source can serve, or the source was given up on — counted
        // as skipped, not failed.
        if (abandoned.has(row.external_source) || !canServe(row, req.aspects)) {
          status = { ...status, skipped: status.skipped + 1 }
          continue
        }
        try {
          const changed = (await run(row, req.aspects)) !== false
          if (status.id !== id) return
          status = changed
            ? { ...status, refreshed: status.refreshed + 1 }
            : { ...status, skipped: status.skipped + 1 }
          consecutive.set(row.external_source, 0)
        } catch (err) {
          if (status.id !== id) return
          // Stopping from the Tasks page trips progress.ts's checkpoint inside
          // the title in flight. That is the user's own action, not a failure:
          // counting it inflates the tally and could trip the bail-out.
          if (err instanceof TaskCancelledError || runGate.cancelled) {
            status = { ...status, state: 'cancelled', message: null }
            return
          }
          const message = err instanceof Error ? err.message : String(err)
          status = {
            ...status,
            failed: status.failed + 1,
            failures: [...status.failures, { id: row.id, title: row.title, error: message }]
          }
          const streak = (consecutive.get(row.external_source) ?? 0) + 1
          consecutive.set(row.external_source, streak)
          if (streak >= MAX_CONSECUTIVE_FAILURES) abandoned.add(row.external_source)
        }
        const delay = deps.delayMs ?? SOURCE_DELAY_MS[row.external_source] ?? 300
        if (delay > 0 && i < rows.length - 1) await sleep(delay)
      }
      if (status.id !== id) return
      status = abandoned.size
        ? {
            ...status,
            state: 'error',
            message: `${[...abandoned].map((src) => SOURCE_NAMES[src] ?? src).join(' and ')} failed ${MAX_CONSECUTIVE_FAILURES} titles in a row and looked unreachable, so ${abandoned.size === 1 ? 'its' : 'their'} remaining titles were skipped. Everything else finished; run it again later to pick up the rest.`
          }
        : { ...status, state: 'done', message: null }
    } finally {
      releaseJob()
      // Never clear a newer run's slot — neither a newer refresh (status.id) nor
      // a dialog import that took the shared slot mid-run (the handle argument).
      if (status.id === id) endActivity(undefined, slot)
      task.settle(
        status.id !== id
          ? { state: 'cancelled', error: 'superseded by a newer run' }
          : status.state === 'error'
            ? { state: 'error', error: status.message }
            : status.state === 'cancelled'
              ? { state: 'cancelled' }
              : { state: 'done' }
      )
    }
  })

  return getStatus()
}

// The single-title path (detail page → More → Refresh…). A plain await, no run
// or poll: it is one title, and the caller shows a toast.
export async function refreshMedia(mediaId: number, aspects: RefreshAspect[]): Promise<void> {
  const row = getSqlite()
    .prepare(
      `SELECT id, title, media_type, external_source, external_id FROM media_item WHERE id = ?`
    )
    .get(mediaId) as RefreshRow | undefined
  if (!row) throw new Error('Title not found.')
  if (!row.external_id || !canServe(row, aspects)) {
    throw new Error('That title has no importable source — nothing to refresh from.')
  }
  await refreshOne(row, aspects)
}
