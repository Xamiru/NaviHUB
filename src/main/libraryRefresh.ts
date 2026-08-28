import { getSqlite } from './db/connection'
import { sleep } from './http'
import { beginActivity, endActivity } from './progress'
import * as tasks from './tasks'
import { TaskCancelledError } from './tasks'
import { cooperativeGate, type PauseGate } from './taskControls'
import { runWithActivitySignal } from './activityContext'
import * as anilist from './anilist'
import * as tmdb from './tmdb'
import * as vndb from './vndb'
import * as steam from './steam'
import * as openlibrary from './openlibrary'
import { aspectsForType, isRefreshableSource, missingClause } from '@shared/refresh'
import type { RefreshAspect, RefreshRequest } from '@shared/refresh'
import type { MediaType, RefreshPreview, RefreshRunStatus } from '@shared/types'

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
  anilist: 2100, // ~28 req/min against a degraded ~30 budget
  tmdb: 300,
  vndb: 600,
  steam: 1600, // Steam documents ~200 requests / 5 min / IP
  openlibrary: 300
}

// Ten in a row means the source or the network is down, not ten unlucky titles
// (the bulkImport / steam-backfill posture). Individual failures never stop the
// run — they are collected and listed at the end.
const MAX_CONSECUTIVE_FAILURES = 10

interface RefreshRow {
  id: number
  title: string
  media_type: MediaType
  external_source: string
  external_id: string
}

// The titles a request would touch. `onlyMissing` ORs the per-aspect tests: you
// asked for four things, so a title lacking any one of them is worth a request.
export function selectRows(req: RefreshRequest): RefreshRow[] {
  const db = getSqlite()
  if (!req.types.length || !req.aspects.length) return []
  const typePlaceholders = req.types.map(() => '?').join(', ')
  const sourceFilter = `m.external_source IN ('anilist','tmdb','vndb','steam','openlibrary')`
  const missing = req.onlyMissing ? ` AND ${missingClause(req.aspects)}` : ''
  return db
    .prepare(
      `SELECT m.id, m.title, m.media_type, m.external_source, m.external_id
         FROM media_item m
        WHERE m.media_type IN (${typePlaceholders})
          AND m.external_id IS NOT NULL
          AND ${sourceFilter}${missing}
        ORDER BY m.external_source, m.id`
    )
    .all(...req.types) as RefreshRow[]
}

export function preview(req: RefreshRequest): RefreshPreview {
  const db = getSqlite()
  if (!req.types.length || !req.aspects.length) return { total: 0, unsupported: 0 }
  const typePlaceholders = req.types.map(() => '?').join(', ')
  // Legacy RAWG/IGDB games: no importer serves them any more, so they can never
  // be refreshed. Counted so the UI can say so instead of quietly excluding them.
  const unsupported = (
    db
      .prepare(
        `SELECT COUNT(*) AS n FROM media_item m
          WHERE m.media_type IN (${typePlaceholders})
            AND m.external_id IS NOT NULL
            AND m.external_source IS NOT NULL
            AND m.external_source NOT IN ('anilist','tmdb','vndb','steam','openlibrary')`
      )
      .get(...req.types) as { n: number }
  ).n
  return { total: selectRows(req).length, unsupported }
}

// One title. Dispatches on the ROW's source, not its media type: a game may be
// a live 'steam' row or a legacy 'rawg' one, and only the row knows.
export async function refreshOne(row: RefreshRow, aspects: RefreshAspect[]): Promise<void> {
  // Hand each importer only the aspects its source can actually serve, so a
  // "banner" tick on a VN is a no-op rather than an empty UPDATE.
  const only = aspectsForType(aspects, row.media_type)
  if (!only.length) return
  switch (row.external_source) {
    case 'anilist':
      if (row.media_type === 'manga') await anilist.importManga(Number(row.external_id), { only })
      else await anilist.importAnime(Number(row.external_id), { only })
      return
    case 'tmdb':
      if (row.media_type === 'tv') await tmdb.importTv(Number(row.external_id), { only })
      else await tmdb.importMovie(Number(row.external_id), { only })
      return
    case 'vndb':
      await vndb.importVisualNovel(Number(row.external_id), { only })
      return
    case 'steam':
      await steam.importGame(Number(row.external_id), { only })
      return
    case 'openlibrary':
      await openlibrary.importBook(row.external_id, { only })
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

function labelFor(req: RefreshRequest): string {
  return `${req.aspects.join(', ')} · ${req.types.length} type${req.types.length === 1 ? '' : 's'}`
}

// Fire-and-forget (the bulkImport posture) — the renderer follows via
// refresh:status. `deps` is the test seam: the loop's IO injected.
export function start(
  req: RefreshRequest,
  deps: {
    run?: (row: RefreshRow, aspects: RefreshAspect[]) => Promise<void>
    rows?: RefreshRow[]
    delayMs?: number
  } = {}
): RefreshRunStatus {
  if (status.state === 'running') throw new Error('A refresh is already running.')
  const rows = deps.rows ?? selectRows(req)
  if (!rows.length) throw new Error('Nothing to refresh — every matching title already has it.')

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
      let consecutiveFailures = 0
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
        // Nothing this source can serve — counted as skipped, not failed.
        if (!isRefreshableSource(row.external_source) || !aspectsForType(req.aspects, row.media_type).length) {
          status = { ...status, skipped: status.skipped + 1 }
          continue
        }
        try {
          await run(row, req.aspects)
          if (status.id !== id) return
          status = { ...status, refreshed: status.refreshed + 1 }
          consecutiveFailures = 0
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
          consecutiveFailures++
          if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
            status = {
              ...status,
              state: 'error',
              message: `${MAX_CONSECUTIVE_FAILURES} titles failed in a row — the source looks unreachable. Everything refreshed so far is kept; run it again later to pick up the rest.`
            }
            return
          }
        }
        const delay = deps.delayMs ?? SOURCE_DELAY_MS[row.external_source] ?? 300
        if (delay > 0 && i < rows.length - 1) await sleep(delay)
      }
      if (status.id === id) status = { ...status, state: 'done', message: null }
    } finally {
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
  if (!row.external_id || !isRefreshableSource(row.external_source)) {
    throw new Error('That title has no importable source — nothing to refresh from.')
  }
  await refreshOne(row, aspects)
}
