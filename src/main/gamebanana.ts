import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { createThrottle } from './requestThrottle'
import * as links from './repos/externalLinkRepo'
import { GB_API, GB_PAGE_SIZE, parseGames, parseModDetail, parseModPage, sortParam } from './gamebananaCore'
import type { GbGame, GbLink, GbModDetail, GbModPage, GbSort } from '@shared/types'

// GameBanana's public apiv11 (gamebananaCore.ts holds the parsers and the
// adult-content gate). Keyless and undocumented, so requests are spaced by one
// process-wide throttle and identify the app. Every call here starts from a
// user action in the Mods tab — nothing fetches on open.

export const gamebananaThrottle = createThrottle(1000)
export const GB_USER_AGENT = 'NaviHUB/1 (personal media library)'

async function getJson(path: string): Promise<unknown> {
  await gamebananaThrottle.take()
  const res = await fetchWithRetry(`${GB_API}${path}`, {
    headers: { 'User-Agent': GB_USER_AGENT, Accept: 'application/json' },
    timeoutMs: 20_000,
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (!res.ok) throw new Error(`GameBanana answered ${res.status}`)
  return res.json()
}

export async function searchGames(query: string): Promise<GbGame[]> {
  const q = query.trim().slice(0, 120)
  if (!q) return []
  return parseGames(await getJson(`/Util/Game/NameMatch?_sName=${encodeURIComponent(q)}`))
}

export async function mods(gameId: number, sort: GbSort, page: number): Promise<GbModPage> {
  if (!Number.isInteger(gameId) || gameId <= 0) throw new Error('Unknown GameBanana game')
  const p = Number.isInteger(page) && page > 0 ? Math.min(page, 500) : 1
  const json = await getJson(
    `/Mod/Index?_nPerpage=${GB_PAGE_SIZE}&_nPage=${p}&_aFilters%5BGeneric_Game%5D=${gameId}&_sSort=${sortParam(sort)}`
  )
  return parseModPage(json, p)
}

export async function modDetail(modId: number): Promise<GbModDetail | null> {
  if (!Number.isInteger(modId) || modId <= 0) throw new Error('Unknown mod')
  return parseModDetail(await getJson(`/Mod/${modId}/ProfilePage`))
}

// ---- the game a title's mods come from (media_external_link 'gamebanana') ----

export function getLink(mediaId: number): GbLink | null {
  const raw = links.linkedId(mediaId, 'gamebanana')
  const gameId = raw && /^\d+$/.test(raw) ? Number(raw) : null
  return gameId ? { gameId, profileUrl: `https://gamebanana.com/games/${gameId}` } : null
}

export function setLink(mediaId: number, gameId: number | null): GbLink | null {
  if (gameId == null) {
    links.reset(mediaId, 'gamebanana')
    return null
  }
  if (!Number.isInteger(gameId) || gameId <= 0) throw new Error('Unknown GameBanana game')
  links.set(mediaId, 'gamebanana', String(gameId), 'manual')
  return getLink(mediaId)
}
