import { getSqlite } from './db/connection'
import * as anilist from './anilist'
import * as tmdb from './tmdb'
import * as vndb from './vndb'
import * as gamesCatalog from './gamesCatalog'
import { normTitle } from './steam'
import { sleep } from './http'
import { beginActivity, endActivity } from './progress'
import { bulkSourceCfg, type BulkSourceKey } from '@shared/bulkImport'
import type { BulkListParams, BulkPreviewItem, BulkRunStatus, BulkStartPayload } from '@shared/types'

// The /bulk page's engine: preview a top-N list from a source, then import the
// user's selection through the normal per-title importers. The run is the
// musicDownload/mokuroRun singleton — module-level status polled over
// `bulk:status`, a cancel flag, one run at a time, `status.id` stale guard.
// Deliberately NOT withActivity (a run needs cancel and a `done` state that
// stays readable after polling stops — the updater posture), but the loop DOES
// begin/endActivity around itself: that's what arms progress.ts's gate so each
// title's updateActivity/imageProgress calls reach the Topbar pill even when
// /bulk is unmounted.
//
// No before-quit hook: every title import is one transaction, so quitting
// between titles just ends the run early with everything imported so far kept —
// re-running skips them (skip-existing) and continues.

// Each media type's (external_source, media_type) identity in media_item.
// media_type matters because anime and manga share external_source 'anilist'
// (AniList ids are unique across both, but the skip-set must not let an
// imported anime block importing its manga… they have different ids, so this
// is belt-and-braces scoping, same as the games bulk used SOURCE alone).
const SOURCE_IDENT: Record<BulkSourceKey, { externalSource: string; mediaType: string }> = {
  anime: { externalSource: 'anilist', mediaType: 'anime' },
  manga: { externalSource: 'anilist', mediaType: 'manga' },
  game: { externalSource: 'rawg', mediaType: 'game' },
  visual_novel: { externalSource: 'vndb', mediaType: 'visual_novel' },
  movie: { externalSource: 'tmdb', mediaType: 'movie' },
  tv: { externalSource: 'tmdb', mediaType: 'tv' }
}

// Inter-title delay per source. AniList is the tight one: its degraded budget
// is ~30 req/min and a lite import is one GraphQL request, so 2.1s ≈ 28/min.
// Images ride CDNs and don't count. The catalog is local — no delay.
const SOURCE_DELAY_MS: Record<BulkSourceKey, number> = {
  anime: 2100,
  manga: 2100,
  game: 0,
  visual_novel: 600,
  movie: 300,
  tv: 300
}

// Ten failures in a row means the source (or the network) is down, not ten
// unlucky titles — bail with a resume hint (the steam backfill posture).
const MAX_CONSECUTIVE_FAILURES = 10

function existingIds(source: BulkSourceKey): Set<string> {
  const ident = SOURCE_IDENT[source]
  return new Set(
    (
      getSqlite()
        .prepare('SELECT external_id FROM media_item WHERE external_source = ? AND media_type = ?')
        .all(ident.externalSource, ident.mediaType) as { external_id: string }[]
    ).map((r) => String(r.external_id))
  )
}

// Games are the one type imported from SEVERAL sources with disjoint id spaces
// (rawg catalog / steam / igdb), so id equality can't see a Steam-owned title —
// the normalized name (steam.ts's exact-match normalizer) is the bridge. Only
// games get this; every other type has exactly one source.
function existingGameTitles(source: BulkSourceKey): Set<string> | null {
  if (source !== 'game') return null
  const rows = getSqlite()
    .prepare(`SELECT title FROM media_item WHERE media_type = 'game'`)
    .all() as { title: string }[]
  return new Set(rows.map((r) => normTitle(r.title)).filter(Boolean))
}

// One cheap point lookup for the run loop's per-title re-check (a manual
// import during the run must be skipped without rebuilding the whole Set).
function importedById(source: BulkSourceKey, sourceId: number): boolean {
  const ident = SOURCE_IDENT[source]
  return !!getSqlite()
    .prepare(
      'SELECT 1 FROM media_item WHERE external_source = ? AND media_type = ? AND external_id = ? LIMIT 1'
    )
    .get(ident.externalSource, ident.mediaType, String(sourceId))
}

// The predicate the source crawls run every fetched row through. Three rejections:
// already seen THIS crawl (volatile sorts — popularity, trending — shift under a
// multi-second paginated fetch and repeat items across page boundaries; the
// renderer keys rows and the selection Set by sourceId, so duplicates must never
// leave main), already in the library by id, and — games only — already in the
// library by normalized title (Steam/IGDB rows live in disjoint id spaces).
// Rejected rows don't count toward `count`: the crawl keeps paging, so a top-100
// preview is 100 titles the user does NOT have, not 100 minus their library.
export function makeKeep(
  have: Set<string>,
  haveTitles: Set<string> | null
): (item: BulkPreviewItem) => boolean {
  const seen = new Set<number>()
  return (item) => {
    if (seen.has(item.sourceId)) return false
    if (have.has(String(item.sourceId))) return false
    const t = haveTitles ? normTitle(item.title) : ''
    if (t !== '' && haveTitles?.has(t)) return false
    seen.add(item.sourceId)
    return true
  }
}

export async function preview(params: BulkListParams): Promise<BulkPreviewItem[]> {
  const cfg = bulkSourceCfg(params.source)
  const clamped: BulkListParams = {
    ...params,
    count: Math.max(1, Math.min(cfg.maxCount, Math.floor(Number(params.count) || 0)))
  }
  const keep = makeKeep(existingIds(clamped.source), existingGameTitles(clamped.source))
  switch (clamped.source) {
    case 'anime':
    case 'manga':
      return anilist.topList(clamped, undefined, keep)
    case 'game':
      return gamesCatalog.listTop(clamped, keep)
    case 'visual_novel':
      return vndb.topList(clamped, undefined, keep)
    case 'movie':
      return tmdb.discoverTop('movie', clamped, undefined, keep)
    case 'tv':
      return tmdb.discoverTop('tv', clamped, undefined, keep)
  }
}

let status: BulkRunStatus = {
  id: 0,
  state: 'idle',
  label: '',
  done: 0,
  total: 0,
  imported: 0,
  skipped: 0,
  failed: 0,
  message: null
}
let cancelRequested = false

export function getStatus(): BulkRunStatus {
  return { ...status }
}

export function cancel(): void {
  if (status.state === 'running') cancelRequested = true
}

async function importOne(source: BulkSourceKey, sourceId: number): Promise<void> {
  switch (source) {
    case 'anime':
      await anilist.importAnime(sourceId, { liteCharacters: true })
      return
    case 'manga':
      await anilist.importManga(sourceId, { liteCharacters: true })
      return
    case 'game':
      await gamesCatalog.importGame(sourceId, { skipHltb: true })
      return
    case 'visual_novel':
      await vndb.importVisualNovel(sourceId)
      return
    case 'movie':
      await tmdb.importMovie(sourceId, { skipOmdb: true })
      return
    case 'tv':
      await tmdb.importTv(sourceId, { skipOmdb: true })
      return
  }
}

// Starts the run and returns immediately (fire-and-forget, the download()
// posture) — the renderer follows along via bulk:status. `deps` is the test
// seam: the loop's IO (importer + delay) injected so tests need no network.
export function start(
  payload: BulkStartPayload,
  deps: {
    importOne?: (source: BulkSourceKey, sourceId: number) => Promise<void>
    delayMs?: number
  } = {}
): BulkRunStatus {
  if (status.state === 'running') throw new Error('A bulk import is already running.')
  const cfg = bulkSourceCfg(payload.source)
  const items = payload.items ?? []
  if (!items.length) throw new Error('Nothing selected to import.')

  const id = status.id + 1
  cancelRequested = false
  status = {
    id,
    state: 'running',
    label: cfg.label,
    done: 0,
    total: items.length,
    imported: 0,
    skipped: 0,
    failed: 0,
    message: null
  }

  const run = deps.importOne ?? importOne
  const delay = deps.delayMs ?? SOURCE_DELAY_MS[payload.source]

  void (async () => {
    // Arms progress.ts so every title's own updateActivity/imageProgress calls
    // reach the Topbar pill — the app's only always-mounted progress surface.
    beginActivity(`Bulk import: ${cfg.label}`)
    // Cross-source dupes (Steam-owned games) match by name; built once — a
    // title imported manually MID-run is caught by the importedById re-check.
    const titleSet = existingGameTitles(payload.source)
    try {
      let consecutiveFailures = 0
      for (let i = 0; i < items.length; i++) {
        if (status.id !== id) return // a newer run took over
        if (cancelRequested) {
          status = { ...status, state: 'cancelled', message: null }
          return
        }
        const item = items[i]
        status = { ...status, done: i + 1, message: item.title }
        // Re-check per title (a point lookup) so a manual import during the
        // run is skipped instead of duplicated.
        const t = titleSet ? normTitle(item.title) : ''
        if (importedById(payload.source, item.sourceId) || (t !== '' && !!titleSet?.has(t))) {
          status = { ...status, skipped: status.skipped + 1 }
          continue
        }
        try {
          await run(payload.source, item.sourceId)
          if (status.id !== id) return
          status = { ...status, imported: status.imported + 1 }
          consecutiveFailures = 0
        } catch {
          if (status.id !== id) return
          status = { ...status, failed: status.failed + 1 }
          consecutiveFailures++
          if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
            status = {
              ...status,
              state: 'error',
              message: `${MAX_CONSECUTIVE_FAILURES} titles failed in a row — the source looks unreachable. Everything imported so far is kept; run the same list again later to resume.`
            }
            return
          }
        }
        if (delay > 0 && i < items.length - 1) await sleep(delay)
      }
      if (status.id === id) status = { ...status, state: 'done', message: null }
    } finally {
      // Never clear a NEWER run's slot (it called beginActivity itself).
      if (status.id === id) endActivity()
    }
  })()

  return getStatus()
}
