import { getSqlite } from './db/connection'
import * as catalog from './launchboxCatalog'
import * as bangumi from './bangumi'
import { clearGameCast, enrichGame } from './gameCast'
import { workSummary } from './gamesUpgrade'
import { LAUNCHBOX_SOURCE } from './launchboxCatalogCore'
import * as links from './repos/externalLinkRepo'
import { currentActivitySignal } from './activityContext'
import { logWarn } from './logBus'
import type {
  BangumiCandidate,
  ExternalLinkSource,
  GameCastResult,
  GameLinksState,
  GameWorkSummary,
  ImportSummary
} from '@shared/types'

// The Links panel on a game's detail page: which catalog work and Bangumi
// subject a game is tied to, and the user's corrections. A choice made here is
// a 'manual' link (or a manual unlink) that no automatic pass overrides.

function gameRow(mediaId: number): { external_source: string | null; external_id: string | null } {
  const row = getSqlite()
    .prepare(`SELECT media_type, external_source, external_id FROM media_item WHERE id = ?`)
    .get(mediaId) as { media_type: string; external_source: string | null; external_id: string | null } | undefined
  if (row?.media_type !== 'game') throw new Error('Links are for games only.')
  return row
}

function workIdOf(mediaId: number): number | null {
  const row = gameRow(mediaId)
  if (row.external_source === LAUNCHBOX_SOURCE && row.external_id) return Number(row.external_id)
  const id = links.linkedId(mediaId, 'launchbox')
  return id ? Number(id) : null
}

export function get(mediaId: number): GameLinksState {
  const installed = catalog.status().installed
  const workId = workIdOf(mediaId)
  const unlinked = (['launchbox', 'bangumi'] as ExternalLinkSource[]).filter((s) => {
    const l = links.get(mediaId, s)
    return l?.method === 'manual' && l.externalId === ''
  })
  return {
    catalogInstalled: installed,
    links: links.list(mediaId),
    work: installed && workId != null ? workSummary(workId) : null,
    unlinked,
    covers: installed && workId != null ? catalog.coverCandidates(workId) : []
  }
}

export function searchWorks(query: string): GameWorkSummary[] {
  return catalog
    .search(query)
    .map((r) => workSummary(Number(r.id)))
    .filter((s): s is GameWorkSummary => !!s)
}

// A dialog or bulk import from the catalog. The cast is an extra: Bangumi
// being down must not turn an imported game into a failed import.
export async function importWithCast(workId: number, opts: { skipHltb?: boolean } = {}): Promise<ImportSummary> {
  const summary = await catalog.importWork(workId, opts)
  return { ...summary, ...(await castOrWarn(summary.mediaId, summary.title)) }
}

export async function castOrWarn(mediaId: number, title: string): Promise<{ cast?: number; staff?: number }> {
  if (!links.linkedId(mediaId, 'bangumi')) return {}
  try {
    const r = await enrichGame(mediaId)
    return { cast: r.cast, staff: r.staff }
  } catch (err) {
    if (currentActivitySignal()?.aborted) throw err
    logWarn('app', `Updated "${title}", but its cast could not be read from Bangumi: ${err instanceof Error ? err.message : String(err)}`)
    return {}
  }
}

// Ties the game to a work by hand, then brings it up to the catalog (cover,
// platforms, Japanese title, links) and reads its cast.
export async function setWork(mediaId: number, workId: number): Promise<ImportSummary> {
  const row = gameRow(mediaId)
  if (row.external_source === LAUNCHBOX_SOURCE) throw new Error('This game was imported from the catalog; its work is its own.')
  if (!catalog.getWork(workId)) throw new Error('That game is not in the catalog.')
  links.set(mediaId, 'launchbox', String(workId), 'manual')
  const summary = await catalog.importWork(workId, { mediaId, linkMethod: 'manual', skipHltb: true })
  return { ...summary, ...(await castOrWarn(mediaId, summary.title)) }
}

// "None of these": the work goes, and so do the automatic links its xrefs
// brought (and the Bangumi cast behind one), so later refreshes stop reading
// the wrong subject. Manual links stay. Cover, platforms and the Japanese
// title the work wrote are left for a re-import or a manual pick.
export function unlinkWork(mediaId: number): void {
  gameRow(mediaId)
  const workId = links.linkedId(mediaId, 'launchbox')
  const brought = workId ? workXrefsOrEmpty(Number(workId)) : []
  let castGone = false
  for (const x of brought) {
    const link = links.get(mediaId, x.source)
    if (!link || link.method === 'manual' || link.externalId !== x.externalId) continue
    links.reset(mediaId, x.source)
    if (x.source === 'bangumi') castGone = true
  }
  links.unlinkManually(mediaId, 'launchbox')
  if (castGone) clearGameCast(mediaId)
}

function workXrefsOrEmpty(workId: number): ReturnType<typeof catalog.xrefs> {
  try {
    return catalog.xrefs(workId)
  } catch {
    return [] // catalog not installed: nothing to compare against
  }
}

export async function searchBangumi(query: string): Promise<BangumiCandidate[]> {
  return bangumi.searchGames(query)
}

export async function setBangumi(mediaId: number, subjectId: number): Promise<GameCastResult> {
  gameRow(mediaId)
  if (!Number.isInteger(subjectId) || subjectId <= 0) throw new Error('Not a Bangumi subject id.')
  links.set(mediaId, 'bangumi', String(subjectId), 'manual')
  return enrichGame(mediaId)
}

// "This game has no Bangumi entry": the link goes, and so does the cast it brought.
export function unlinkBangumi(mediaId: number): void {
  gameRow(mediaId)
  links.unlinkManually(mediaId, 'bangumi')
  clearGameCast(mediaId)
}

// Hands a source back to the automatic passes.
export function reset(mediaId: number, source: ExternalLinkSource): void {
  gameRow(mediaId)
  links.reset(mediaId, source)
}

export async function refreshCast(mediaId: number): Promise<GameCastResult> {
  gameRow(mediaId)
  return enrichGame(mediaId)
}
