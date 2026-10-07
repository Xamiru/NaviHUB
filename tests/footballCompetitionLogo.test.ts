import { beforeEach, describe, expect, it, vi } from 'vitest'

// URL-keyed Wikipedia/Wikidata fixtures for the competition-logo path.
const fetchWithRetry = vi.fn(async (url: string) => {
  const params = new URL(url).searchParams
  if (params.get('action') === 'wbgetentities') {
    return json({
      entities: {
        Q19317: {
          claims: {
            P154: [
              { rank: 'normal', mainsnak: { datavalue: { value: 'Old World Cup logo.svg' } } },
              { rank: 'deprecated', mainsnak: { datavalue: { value: 'Wrong logo.svg' } } },
              { rank: 'preferred', mainsnak: { datavalue: { value: 'FIFA World Cup 2026 logo.svg' } } }
            ]
          }
        }
      }
    })
  }
  if (params.get('prop') === 'imageinfo') {
    const title = params.get('titles')!
    return json({
      query: {
        pages: [{
          title,
          imageinfo: [{ thumburl: `https://upload.wikimedia.org/thumb/${encodeURIComponent(title)}/330px.png?utm_source=en.wikipedia.org&utm_campaign=api` }]
        }]
      }
    })
  }
  return json({ query: { pages: [{ title: 'FIFA World Cup', pageprops: { wikibase_item: 'Q19317' } }] } })
})

function json(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200 })
}

const downloadImage = vi.fn(async (url: string) => `media/dl-${url.length}.png`)
const cachedDownload = vi.fn((_url: string): string | null => null)

vi.mock('../src/main/http', () => ({
  fetchWithRetry: (url: string) => fetchWithRetry(url),
  isWikimediaUrl: () => true,
  MAX_API_RESPONSE_BYTES: 1
}))
vi.mock('../src/main/files', () => ({
  downloadImage: (url: string) => downloadImage(url),
  cachedDownload: (url: string) => cachedDownload(url)
}))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => null }))

import { fetchCompetitionLogo } from '../src/main/football/enrichment'

beforeEach(() => {
  fetchWithRetry.mockClear()
  downloadImage.mockClear()
  cachedDownload.mockReset()
  cachedDownload.mockReturnValue(null)
})

describe('fetchCompetitionLogo', () => {
  it('falls back to the preferred Wikidata logo and stores it under a URL without the tracking query', async () => {
    const path = await fetchCompetitionLogo('world-cup', new AbortController().signal)
    expect(path).not.toBeNull()
    const [url] = downloadImage.mock.calls[0]
    expect(url).toContain(encodeURIComponent('File:FIFA_World_Cup_2026_logo.svg'))
    expect(url).not.toContain('?')
  })

  it('makes no download for a logo already on disk', async () => {
    cachedDownload.mockReturnValue('media/dl-cached.png')
    await expect(fetchCompetitionLogo('world-cup', new AbortController().signal)).resolves.toBe('media/dl-cached.png')
    expect(downloadImage).not.toHaveBeenCalled()
  })
})
