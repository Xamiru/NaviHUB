import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'

/**
 * Keyless YouTube Music search (the innertube endpoint ytmusicapi and spotDL use).
 * The "songs" filter returns official audio-track uploads with their own artist,
 * album and duration, which is the independent evidence source matching needs.
 */
export interface YtmSong {
  url: string
  videoId: string
  title: string
  artists: string[]
  album: string | null
  duration: number | null
}

const SEARCH_URL = 'https://music.youtube.com/youtubei/v1/search?prettyPrint=false'
const FILTERS = {
  songs: 'EgWKAQIIAWoKEAkQBRAKEAMQBA%3D%3D',
  videos: 'EgWKAQIQAWoKEAkQChAFEAMQBA%3D%3D'
} as const

/**
 * Catalogue languages. Under English, YouTube Music romanizes artists ("Keina Suda") and
 * pairs native titles with a translation ("紅蓮華 - Gurenge"); the native catalogue keeps
 * 須田景凪 and 紅蓮華.
 */
export type YtmLocale = 'en' | 'ja' | 'ko' | 'zh' | 'ru'
const LOCALES: Record<YtmLocale, { hl: string; gl: string }> = {
  en: { hl: 'en', gl: 'US' },
  ja: { hl: 'ja', gl: 'JP' },
  ko: { hl: 'ko', gl: 'KR' },
  zh: { hl: 'zh-TW', gl: 'TW' },
  ru: { hl: 'ru', gl: 'RU' }
}

const FALLBACK_CLIENT_VERSION = '1.20250101.01.00'
let clientVersion = FALLBACK_CLIENT_VERSION

type Json = Record<string, any>

function seconds(value: string): number | null {
  if (!/^\d+(?::\d{1,2}){1,2}$/.test(value)) return null
  return value.split(':').reduce((total, part) => total * 60 + Number(part), 0)
}

function searchSections(body: unknown): unknown[] | null {
  const sections = (body as Json)?.contents?.tabbedSearchResultsRenderer?.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents
  return Array.isArray(sections) ? sections : null
}

export function parseYtmSearch(body: unknown): YtmSong[] {
  const sections = searchSections(body)
  if (!sections) return []
  const results: YtmSong[] = []
  for (const section of sections) {
    for (const item of (section as Json)?.musicShelfRenderer?.contents ?? []) {
      const row = item?.musicResponsiveListItemRenderer
      const columns = (row?.flexColumns ?? []).map((column: Json) =>
        (column?.musicResponsiveListItemFlexColumnRenderer?.text?.runs ?? []) as Json[])
      const videoId = row?.playlistItemData?.videoId ??
        row?.overlay?.musicItemThumbnailOverlayRenderer?.content?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint?.videoId
      const title = (columns[0] ?? []).map((run: Json) => run.text).join('').trim()
      if (typeof videoId !== 'string' || !/^[\w-]{11}$/.test(videoId) || !title) continue
      // Second column: "Artist & Artist • Album • 3:55" (videos: "Artist • 1.2M views • 3:55").
      const groups: Json[][] = [[]]
      for (const run of columns[1] ?? []) {
        if (/^\s*•\s*$/.test(run.text)) groups.push([])
        else groups[groups.length - 1].push(run)
      }
      const pageType = (run: Json): string =>
        run?.navigationEndpoint?.browseEndpoint?.browseEndpointContextSupportedConfigs?.browseEndpointContextMusicConfig?.pageType ?? ''
      const artists = groups[0]
        .map((run) => String(run.text).trim())
        .filter((text) => text && !/^(?:&|,|、|，|・|and)$/i.test(text))
      const album = groups.flat().find((run) => pageType(run) === 'MUSIC_PAGE_TYPE_ALBUM')?.text ?? null
      const duration = groups.flat().map((run) => seconds(String(run.text).trim())).find((value) => value != null) ?? null
      results.push({ url: `https://www.youtube.com/watch?v=${videoId}`, videoId, title, artists, album, duration })
    }
  }
  return results
}

async function refreshClientVersion(): Promise<boolean> {
  const response = await fetchWithRetry('https://music.youtube.com/', { timeoutMs: 20_000, maxResponseBytes: MAX_API_RESPONSE_BYTES }, 1)
  const version = (await response.text()).match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1]
  if (!version || version === clientVersion) return false
  clientVersion = version
  return true
}

export async function searchYouTubeMusic(
  query: string,
  kind: keyof typeof FILTERS = 'songs',
  locale: YtmLocale = 'en'
): Promise<YtmSong[]> {
  const trimmed = query.trim().slice(0, 300)
  if (!trimmed) return []
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await fetchWithRetry(SEARCH_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://music.youtube.com', referer: 'https://music.youtube.com/' },
      body: JSON.stringify({
        context: { client: { clientName: 'WEB_REMIX', clientVersion, ...LOCALES[locale] } },
        query: trimmed,
        params: decodeURIComponent(FILTERS[kind])
      }),
      timeoutMs: 20_000,
      maxResponseBytes: MAX_API_RESPONSE_BYTES
    })
    if (response.ok) {
      const body = await response.json()
      // Even an empty search has this layout; without it a page change would read as "no match".
      if (!searchSections(body)) throw new Error('YouTube Music returned a search page NaviHUB cannot read')
      return parseYtmSearch(body)
    }
    // An outdated client version is rejected; adopt the live one once.
    if (attempt === 0 && response.status === 400 && await refreshClientVersion()) continue
    throw new Error(`YouTube Music search failed (HTTP ${response.status})`)
  }
  return []
}
