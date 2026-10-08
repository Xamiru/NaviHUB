import { getSqlite } from './db/connection'
import { beginActivity, endActivity } from './progress'
import * as tasks from './tasks'
import { TaskCancelledError } from './tasks'
import { cooperativeGate, type PauseGate } from './taskControls'
import { runWithActivitySignal } from './activityContext'
import { claimLibraryJob } from './libraryJobLock'
import * as catalog from './launchboxCatalog'
import { enrichGame } from './gameCast'
import * as links from './repos/externalLinkRepo'
import { LAUNCHBOX_SOURCE, jsonList, platformLabel, titleKey, yearOf } from './launchboxCatalogCore'
import type {
  ExternalLinkMethod,
  GameUpgradePlan,
  GameUpgradeReview,
  GameUpgradeStatus,
  GameWorkSummary
} from '@shared/types'

// "Upgrade games": brings the games already in the library up to the games
// catalog v2 — real box art (Japanese first), platforms, Japanese titles, and
// for games Bangumi knows, the cast with voice actors shared with anime and
// VNs. Most of the library came from the RAWG pack, whose covers are
// screenshots.
//
// Rows keep their own key; each gains a 'launchbox' link to its work. The
// link comes from an id chain the catalog states (RAWG or Steam id) or a
// unique exact title within a year; anything less certain is listed for the
// user to pick (the review list) and never guessed.
//
// Resumable: a finished row is stamped metadata.catalogUpgraded = the catalog
// snapshot, so a stopped run continues where it stopped and a newer catalog
// upgrades everything again. It shares the library job slot with bulk import
// and Library Refresh (they write the same rows).

interface GameRow {
  id: number
  title: string
  release_date: string | null
  external_source: string | null
  external_id: string | null
  metadata: string | null
}

type Decision =
  | { kind: 'linked'; workId: number; method: ExternalLinkMethod }
  | { kind: 'auto'; workId: number; method: ExternalLinkMethod }
  | { kind: 'review'; workIds: number[] }
  | { kind: 'none' }

function summary(workId: number): GameWorkSummary | null {
  const w = catalog.getWork(workId)
  if (!w) return null
  return {
    workId: w.id,
    title: w.name,
    titleJa: w.name_ja,
    year: yearOf(w.released),
    platforms: jsonList(w.platforms).map(platformLabel),
    coverUrl: catalog.coverCandidates(w.id)[0]?.url ?? null
  }
}
export { summary as workSummary }

// Which work a library game belongs to, and how sure that is.
export function decide(row: GameRow): Decision {
  if (row.external_source === LAUNCHBOX_SOURCE && row.external_id) {
    return { kind: 'linked', workId: Number(row.external_id), method: 'xref' }
  }
  const link = links.get(row.id, 'launchbox')
  if (link) return link.externalId === '' ? { kind: 'none' } : { kind: 'linked', workId: Number(link.externalId), method: link.method }

  if ((row.external_source === 'rawg' || row.external_source === 'steam') && row.external_id) {
    const works = catalog.worksFor(row.external_source, row.external_id)
    const method: ExternalLinkMethod = row.external_source === 'steam' ? 'xref' : 'exact'
    if (works.length === 1) return { kind: 'auto', workId: works[0], method }
    if (works.length > 1) {
      // Several editions state the same Steam app: the one titled like the row.
      const key = titleKey(row.title)
      const titled = works.filter((id) => titleKey(catalog.getWork(id)?.name) === key)
      if (titled.length === 1) return { kind: 'auto', workId: titled[0], method }
      return { kind: 'review', workIds: works }
    }
  }
  const hits = catalog.findByTitle(row.title, yearOf(row.release_date))
  if (hits.length === 1) return { kind: 'auto', workId: hits[0].id, method: 'exact' }
  if (hits.length > 1) return { kind: 'review', workIds: hits.slice(0, 6).map((w) => w.id) }
  return { kind: 'none' }
}

function upgradedFor(row: GameRow): string | null {
  try {
    const meta = row.metadata ? JSON.parse(row.metadata) : null
    return typeof meta?.catalogUpgraded === 'string' ? meta.catalogUpgraded : null
  } catch {
    return null
  }
}

function gameRows(ids?: number[]): GameRow[] {
  const all = getSqlite()
    .prepare(
      `SELECT id, title, release_date, external_source, external_id, metadata
       FROM media_item WHERE media_type = 'game' ORDER BY id`
    )
    .all() as GameRow[]
  if (!ids) return all
  const wanted = new Set(ids)
  return all.filter((r) => wanted.has(r.id))
}

// Yield between chunks: the plan reads the whole games library, and a large
// one must not stall every IPC call and image while it does.
const CHUNK = 200
const yieldToLoop = (): Promise<void> => new Promise((resolve) => setImmediate(resolve))

interface Planned {
  plan: GameUpgradePlan
  work: { row: GameRow; workId: number; method: ExternalLinkMethod; own: boolean }[]
}

async function computePlan(): Promise<Planned> {
  if (!catalog.status().installed) throw new Error('Install the games catalog first (Games → Import → Catalog).')
  const snapshot = catalog.snapshot()
  const rows = gameRows()
  const plan: GameUpgradePlan = {
    snapshot,
    total: rows.length,
    linked: 0,
    autoLinks: 0,
    review: [],
    unmatched: 0,
    toUpgrade: 0
  }
  const work: Planned['work'] = []
  for (let i = 0; i < rows.length; i++) {
    if (i > 0 && i % CHUNK === 0) await yieldToLoop()
    const row = rows[i]
    const d = decide(row)
    if (d.kind === 'none') {
      plan.unmatched++
      continue
    }
    if (d.kind === 'review') {
      const candidates = d.workIds.map(summary).filter((s): s is GameWorkSummary => !!s)
      const entry: GameUpgradeReview = { mediaId: row.id, title: row.title, year: yearOf(row.release_date), candidates }
      plan.review.push(entry)
      continue
    }
    if (d.kind === 'linked') plan.linked++
    else plan.autoLinks++
    if (upgradedFor(row) === snapshot) continue
    plan.toUpgrade++
    work.push({ row, workId: d.workId, method: d.method, own: row.external_source === LAUNCHBOX_SOURCE })
  }
  return { plan, work }
}

export async function plan(): Promise<GameUpgradePlan> {
  return (await computePlan()).plan
}

function stamp(mediaId: number, snapshot: string | null): void {
  const db = getSqlite()
  const row = db.prepare('SELECT metadata FROM media_item WHERE id = ?').get(mediaId) as
    | { metadata: string | null }
    | undefined
  let meta: Record<string, unknown> = {}
  try {
    meta = row?.metadata ? JSON.parse(row.metadata) || {} : {}
  } catch {
    meta = {}
  }
  meta.catalogUpgraded = snapshot ?? 'unknown'
  db.prepare('UPDATE media_item SET metadata = ? WHERE id = ?').run(JSON.stringify(meta), mediaId)
}

function bangumiPending(mediaId: number): boolean {
  if (!links.linkedId(mediaId, 'bangumi')) return false
  const row = getSqlite().prepare('SELECT metadata FROM media_item WHERE id = ?').get(mediaId) as
    | { metadata: string | null }
    | undefined
  try {
    return !JSON.parse(row?.metadata ?? '{}')?.bangumiChecked
  } catch {
    return true
  }
}

// One game: catalog enrichment (cover, platforms, Japanese title, links),
// then its cast when it has a Bangumi link that was never read.
export async function upgradeOne(
  row: { id: number; external_source: string | null },
  workId: number,
  method: ExternalLinkMethod
): Promise<void> {
  const own = row.external_source === LAUNCHBOX_SOURCE
  await catalog.importWork(workId, own ? { skipHltb: true } : { mediaId: row.id, linkMethod: method, skipHltb: true })
  if (bangumiPending(row.id)) await enrichGame(row.id)
}

// ---------------------------------------------------------------- the run

let status: GameUpgradeStatus = {
  id: 0,
  state: 'idle',
  done: 0,
  total: 0,
  upgraded: 0,
  failed: 0,
  message: null,
  failures: []
}
let gate: PauseGate | null = null

export function getStatus(): GameUpgradeStatus {
  return { ...status, failures: [...status.failures] }
}

export function cancel(): void {
  if (status.state === 'running') gate?.controls.cancel?.()
}

// Fire-and-forget like Library Refresh; the renderer polls gameUpgrade:status.
// `deps.run` is the test seam for one game's work.
export async function start(
  deps: { run?: typeof upgradeOne; onlyIds?: number[] } = {}
): Promise<GameUpgradeStatus> {
  if (status.state === 'running') throw new Error('The games upgrade is already running.')
  const { work } = await computePlan()
  const queue = deps.onlyIds ? work.filter((w) => deps.onlyIds!.includes(w.row.id)) : work
  if (!queue.length) throw new Error('Every game the catalog can match is already up to date.')
  const releaseJob = claimLibraryJob('upgrade')
  const snapshot = catalog.snapshot()
  const run = deps.run ?? upgradeOne

  const id = status.id + 1
  status = { id, state: 'running', done: 0, total: queue.length, upgraded: 0, failed: 0, message: null, failures: [] }

  let handle: tasks.TaskHandle
  const runGate = cooperativeGate(
    () => handle.progress({ state: 'paused' }),
    () => handle.progress({ state: 'running' })
  )
  gate = runGate
  const task = tasks.create({
    kind: 'gamesUpgrade',
    label: 'Upgrade games from the catalog',
    route: '/bulk',
    controls: runGate.controls,
    project: () => (status.id === id ? { detail: status.message, done: status.done, total: status.total } : null)
  })
  handle = task

  void runWithActivitySignal(runGate.signal, async () => {
    const slot = beginActivity('Upgrade games from the catalog', { attachTo: task })
    try {
      for (let i = 0; i < queue.length; i++) {
        if (runGate.paused) await runGate.wait()
        if (status.id !== id) return
        if (runGate.cancelled) {
          status = { ...status, state: 'cancelled', message: null }
          return
        }
        const { row, workId, method } = queue[i]
        status = { ...status, done: i + 1, message: row.title }
        try {
          await run(row, workId, method)
          stamp(row.id, snapshot)
          if (status.id !== id) return
          status = { ...status, upgraded: status.upgraded + 1 }
        } catch (err) {
          if (status.id !== id) return
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
        }
      }
      if (status.id !== id) return
      status = { ...status, state: 'done', message: null }
    } finally {
      releaseJob()
      if (status.id === id) endActivity(undefined, slot)
      task.settle(
        status.id !== id
          ? { state: 'cancelled', error: 'superseded by a newer run' }
          : status.state === 'cancelled'
            ? { state: 'cancelled' }
            : { state: 'done' }
      )
    }
  })
  return getStatus()
}
