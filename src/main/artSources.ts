import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import * as settingsRepo from './repos/settingsRepo'
import { gql } from './anilist'
import { appDetails, steamGet } from './steam'
import { vndbPost } from './vndb'
import { fetchTvdbId } from './tmdb'
import type { WallpaperSearchPage, WallpaperSearchResult } from '@shared/types'

// Art-tab Browse sources beyond Wallhaven and TMDB backdrops. Each one is
// SFW-only, the Wallhaven purity=100 invariant: the request asks for safe
// content where the provider can, and the parser re-checks every item's own
// rating so a provider-side change cannot leak through. Parsers are pure and
// exported for tests; fetchers are thin.

/* eslint-disable @typescript-eslint/no-explicit-any */

const UA = 'NaviHUB/1.0 (personal media hub)'
const DANBOORU = 'https://danbooru.donmai.us'
const DANBOORU_PAGE = 30
const FANART_TV = 'https://webservice.fanart.tv/v3'
const STEAMGRIDDB = 'https://www.steamgriddb.com/api/v2'
const STEAM_ASSETS = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps'

const num = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null)
const single = (results: WallpaperSearchResult[]): WallpaperSearchPage => ({
  results,
  page: 1,
  lastPage: 1
})

async function getJson(url: string, label: string, headers: Record<string, string> = {}): Promise<any> {
  const res = await fetchWithRetry(url, {
    headers: { Accept: 'application/json', 'User-Agent': UA, ...headers },
    timeoutMs: 20_000,
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`${label} request failed (${res.status})`)
  return res.json()
}

function requireKey(key: string, name: string): string {
  const value = settingsRepo.get(key)?.trim()
  if (!value) throw new Error(`Add your ${name} API key in Settings → Keys.`)
  return value
}

// ---------------- Danbooru (anime/manga/VN/game fan art) ----------------

// Autocomplete resolves typed text through Danbooru's aliases ("Welcome to the
// NHK" → nhk_ni_youkoso!). Only copyright (3) and character (4) tags make
// sense as an art search; general/artist/meta tags would return anything.
export function pickDanbooruTag(json: any): string | null {
  const hit = (Array.isArray(json) ? json : []).find(
    (t: any) => (t?.category === 3 || t?.category === 4) && typeof t?.value === 'string'
  )
  return hit?.value ?? null
}

// rating:g ("general") is the strictest of Danbooru's four ratings.
export function danbooruPostsUrl(tag: string, page: number): string {
  const url = new URL(`${DANBOORU}/posts.json`)
  url.searchParams.set('tags', `${tag} rating:g order:score`)
  url.searchParams.set('limit', String(DANBOORU_PAGE))
  url.searchParams.set('page', String(Math.max(1, Math.floor(page))))
  return url.toString()
}

export function parseDanbooru(json: any): WallpaperSearchResult[] {
  return (Array.isArray(json) ? json : [])
    .filter(
      (p: any) =>
        p?.rating === 'g' &&
        !p.is_banned &&
        typeof p.file_url === 'string' &&
        /^(jpe?g|png|webp)$/.test(String(p.file_ext ?? ''))
    )
    .map((p: any) => {
      const variants: any[] = p.media_asset?.variants ?? []
      const thumb = variants.find((v) => v?.type === '360x360')?.url
      return {
        source: 'danbooru' as const,
        id: String(p.id),
        thumbUrl: thumb ?? p.preview_file_url ?? p.large_file_url ?? p.file_url,
        fullUrl: p.file_url,
        width: num(p.image_width),
        height: num(p.image_height)
      }
    })
}

// cdn.donmai.us answers 403 to any request carrying Sec-Fetch-Site:
// cross-site, which Chromium sends for every remote <img>. The main process
// sends no such header, so thumbnails are fetched here and handed over as data
// URLs (the renderer CSP allows data: images). A failed thumb keeps its URL and
// shows as a broken tile; the full-size save goes through main anyway.
const THUMB_MAX_BYTES = 2 * 1024 * 1024

async function inlineThumbs(results: WallpaperSearchResult[]): Promise<WallpaperSearchResult[]> {
  const out = [...results]
  let next = 0
  const worker = async (): Promise<void> => {
    while (next < out.length) {
      const i = next++
      try {
        const res = await fetchWithRetry(out[i].thumbUrl, {
          headers: { 'User-Agent': UA },
          timeoutMs: 15_000,
          maxResponseBytes: THUMB_MAX_BYTES
        })
        if (!res.ok) continue
        const type = res.headers.get('content-type') ?? 'image/jpeg'
        if (!type.startsWith('image/')) continue
        const body = Buffer.from(await res.arrayBuffer()).toString('base64')
        out[i] = { ...out[i], thumbUrl: `data:${type};base64,${body}` }
      } catch {
        // keep the remote URL
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(6, out.length) }, worker))
  return out
}

export async function searchDanbooru(query: string, page: number): Promise<WallpaperSearchPage> {
  const text = query.trim()
  if (!text) return single([])
  const ac = new URL(`${DANBOORU}/autocomplete.json`)
  ac.searchParams.set('search[query]', text)
  ac.searchParams.set('search[type]', 'tag_query')
  ac.searchParams.set('limit', '10')
  const tag = pickDanbooruTag(await getJson(ac.toString(), 'Danbooru'))
  if (!tag) throw new Error(`No Danbooru tag matches “${text}”. Try a character name.`)
  const posts = await getJson(danbooruPostsUrl(tag, page), 'Danbooru')
  const raw = Array.isArray(posts) ? posts.length : 0
  return {
    results: await inlineThumbs(parseDanbooru(posts)),
    page,
    // Danbooru reports no total; a full page means there may be another.
    lastPage: raw >= DANBOORU_PAGE ? page + 1 : page,
    resolved: tag
  }
}

// ---------------- VNDB screenshots ----------------

// VNDB averages votes on each screenshot's sexual content, 0 (safe) to 2
// (explicit); below 0.5 is what VNDB itself labels Safe.
export function parseVndbScreenshots(json: any): WallpaperSearchResult[] {
  const shots: any[] = json?.results?.[0]?.screenshots ?? []
  return shots
    .filter((s) => typeof s?.url === 'string' && typeof s.sexual === 'number' && s.sexual < 0.5)
    .map((s) => ({
      source: 'vndb' as const,
      id: String(s.url.split('/').pop() ?? s.url).replace(/\.\w+$/, ''),
      thumbUrl: s.thumbnail ?? s.url,
      fullUrl: s.url,
      width: num(s.dims?.[0]),
      height: num(s.dims?.[1])
    }))
}

export async function vndbScreenshots(vnId: string): Promise<WallpaperSearchPage> {
  const id = vnId.startsWith('v') ? vnId : `v${vnId}`
  const json = await vndbPost('/vn', {
    filters: ['id', '=', id],
    fields: 'screenshots.url,screenshots.thumbnail,screenshots.dims,screenshots.sexual'
  })
  return single(parseVndbScreenshots(json))
}

// ---------------- AniList banner ----------------

export function anilistBannerResults(anilistId: string, media: any): WallpaperSearchResult[] {
  const url = media?.bannerImage
  if (typeof url !== 'string' || !url || media?.isAdult) return []
  return [
    { source: 'anilist', id: `banner-${anilistId}`, thumbUrl: url, fullUrl: url, width: null, height: null }
  ]
}

export async function anilistBanner(anilistId: string): Promise<WallpaperSearchPage> {
  const data = await gql('query ($id: Int) { Media(id: $id) { bannerImage isAdult } }', {
    id: Number(anilistId)
  })
  return single(anilistBannerResults(anilistId, data?.Media))
}

// ---------------- Steam store art ----------------

// Content descriptors 3 (adult-only sexual content) and 4 (frequent nudity or
// sexual content): such a game's store art is not SFW.
const STEAM_ADULT_DESCRIPTORS = new Set([3, 4])

export function steamArtResults(requestedId: number, payload: any): WallpaperSearchResult[] {
  const g = appDetails(payload, requestedId)
  if (!g) throw new Error('Game not found on Steam')
  const descriptors: unknown[] = g.content_descriptors?.ids ?? []
  if (descriptors.some((id) => STEAM_ADULT_DESCRIPTORS.has(Number(id)))) {
    throw new Error('Steam marks this game as adult content, so its art is not shown.')
  }
  const appid = Number(g.steam_appid) || requestedId
  const hero = `${STEAM_ASSETS}/${appid}/library_hero.jpg`
  const out: WallpaperSearchResult[] = [
    { source: 'steam', id: `${appid}-hero`, thumbUrl: hero, fullUrl: hero, width: 3840, height: 1240 }
  ]
  if (typeof g.background_raw === 'string') {
    out.push({
      source: 'steam',
      id: `${appid}-background`,
      thumbUrl: g.background_raw,
      fullUrl: g.background_raw,
      width: null,
      height: null
    })
  }
  for (const s of g.screenshots ?? []) {
    if (typeof s?.path_full !== 'string') continue
    const dims = /\.(\d+)x(\d+)\.\w+(\?|$)/.exec(s.path_full)
    out.push({
      source: 'steam',
      id: `${appid}-ss-${s.id ?? out.length}`,
      thumbUrl: s.path_thumbnail ?? s.path_full,
      fullUrl: s.path_full,
      width: dims ? Number(dims[1]) : null,
      height: dims ? Number(dims[2]) : null
    })
  }
  return out
}

async function steamAppIdFor(title: string): Promise<number> {
  const data = await steamGet('/storesearch/', { term: title.trim() })
  const hit = (data?.items ?? []).find((it: any) => it?.type === 'app' && it?.id)
  if (!hit) throw new Error(`No Steam game matches “${title.trim()}”.`)
  return Number(hit.id)
}

// appId when the title was imported from Steam; otherwise the typed title is
// searched and the first store match used.
export async function steamArt(appId: string | null, title: string): Promise<WallpaperSearchPage> {
  const id = appId ? Number(appId) : await steamAppIdFor(title)
  const payload = await steamGet('/appdetails', { appids: String(id) })
  return single(steamArtResults(id, payload))
}

// ---------------- fanart.tv (movies/TV, key) ----------------

// Backgrounds are 1920×1080 and thumbs 1000×562 by fanart.tv's upload rules;
// the /preview/ path serves a small copy of any asset.
const FANART_TV_KINDS = {
  movie: [
    ['moviebackground', 1920, 1080],
    ['moviethumb', 1000, 562]
  ],
  tv: [
    ['showbackground', 1920, 1080],
    ['tvthumb', 1000, 562]
  ]
} as const

export function parseFanartTv(json: any, mediaType: 'movie' | 'tv'): WallpaperSearchResult[] {
  const out: WallpaperSearchResult[] = []
  for (const [field, width, height] of FANART_TV_KINDS[mediaType]) {
    for (const a of Array.isArray(json?.[field]) ? json[field] : []) {
      if (typeof a?.url !== 'string') continue
      out.push({
        source: 'fanarttv',
        id: String(a.id ?? a.url),
        thumbUrl: a.url.replace('/fanart/', '/preview/'),
        fullUrl: a.url,
        width,
        height
      })
    }
  }
  return out
}

export async function fanartTv(mediaType: 'movie' | 'tv', tmdbId: string): Promise<WallpaperSearchPage> {
  const key = requireKey('fanarttv.api_key', 'fanart.tv')
  const id = mediaType === 'movie' ? tmdbId : await fetchTvdbId(tmdbId)
  if (!id) throw new Error('TMDB has no TheTVDB id for this show, which fanart.tv needs.')
  const url = new URL(`${FANART_TV}/${mediaType === 'movie' ? 'movies' : 'tv'}/${encodeURIComponent(id)}`)
  url.searchParams.set('api_key', key)
  return single(parseFanartTv(await getJson(url.toString(), 'fanart.tv'), mediaType))
}

// ---------------- SteamGridDB heroes (games, key) ----------------

export function parseSteamGridDb(json: any): WallpaperSearchResult[] {
  return (Array.isArray(json?.data) ? json.data : [])
    .filter((h: any) => typeof h?.url === 'string' && h.nsfw === false)
    .map((h: any) => ({
      source: 'steamgriddb' as const,
      id: String(h.id),
      thumbUrl: h.thumb ?? h.url,
      fullUrl: h.url,
      width: num(h.width),
      height: num(h.height)
    }))
}

// Heroes are the wide banner art (1920×620 / 3840×1240) — the wallpaper-shaped
// asset. nsfw=false asks for safe art; the parser drops anything still flagged.
export async function steamGridDbHeroes(appId: string | null, title: string): Promise<WallpaperSearchPage> {
  const headers = { Authorization: `Bearer ${requireKey('steamgriddb.api_key', 'SteamGridDB')}` }
  let path: string
  if (appId) {
    path = `/heroes/steam/${encodeURIComponent(appId)}`
  } else {
    const found = await getJson(
      `${STEAMGRIDDB}/search/autocomplete/${encodeURIComponent(title.trim())}`,
      'SteamGridDB',
      headers
    )
    const game = found?.data?.[0]
    if (!game?.id) throw new Error(`No SteamGridDB game matches “${title.trim()}”.`)
    path = `/heroes/game/${game.id}`
  }
  const json = await getJson(`${STEAMGRIDDB}${path}?nsfw=false`, 'SteamGridDB', headers)
  return single(parseSteamGridDb(json))
}
