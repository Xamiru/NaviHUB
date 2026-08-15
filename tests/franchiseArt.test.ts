import { beforeEach, describe, expect, it, vi } from 'vitest'

// The franchise art cache: dlFileName pairing, the missing-only download set,
// the status object lifecycle, and the single-flight guard. files/electron are
// mocked per the house recipe; tasks.ts is electron-free and runs real.

const files = vi.hoisted(() => ({
  onDisk: new Set<string>(),
  downloaded: [] as string[],
  failFor: new Set<string>()
}))

vi.mock('electron', () => ({
  app: { getPath: () => '/tmp/navihub-franchise-test' },
  dialog: {}
}))
// importOriginal keeps dlFileName real (tested below) while the IO pair is
// replaced with the in-memory fake.
vi.mock('../src/main/files', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  cachedDownload: (url: string) => (files.onDisk.has(url) ? `media/dl-${url}` : null),
  downloadImage: async (url: string) => {
    files.downloaded.push(url)
    if (files.failFor.has(url)) return null
    files.onDisk.add(url)
    return `media/dl-${url}`
  }
}))

import { artMap, ensureArt, getArtStatus } from '../src/main/franchiseArt'
import { FRANCHISES, franchiseArtUrls } from '../src/shared/franchises'
import { dlFileName } from '../src/main/files'

const FRANCHISE = FRANCHISES[0]
const URLS = franchiseArtUrls(FRANCHISE)

async function settle(): Promise<void> {
  for (let i = 0; i < 20 && getArtStatus().running; i++)
    await new Promise((r) => setTimeout(r, 10))
}

beforeEach(() => {
  files.onDisk.clear()
  files.downloaded.length = 0
  files.failFor.clear()
})

describe('franchiseArt', () => {
  it('maps every curated URL, null until cached', async () => {
    const before = artMap(FRANCHISE.id)
    expect(Object.keys(before).sort()).toEqual([...URLS].sort())
    expect(Object.values(before).every((v) => v === null)).toBe(true)

    await ensureArt(FRANCHISE.id)
    await settle()
    const after = artMap(FRANCHISE.id)
    expect(Object.values(after).every((v) => typeof v === 'string')).toBe(true)
  })

  it('downloads only what is missing and reports progress', async () => {
    files.onDisk.add(URLS[0])
    const res = await ensureArt(FRANCHISE.id)
    expect(res.started).toBe(true)
    await settle()
    expect(files.downloaded).not.toContain(URLS[0])
    expect(new Set(files.downloaded).size).toBe(URLS.length - 1)
    const status = getArtStatus()
    expect(status.running).toBe(false)
    expect(status.done).toBe(URLS.length - 1)
    expect(status.total).toBe(URLS.length - 1)
  })

  it('no-ops when everything is cached or the franchise is unknown', async () => {
    for (const url of URLS) files.onDisk.add(url)
    expect((await ensureArt(FRANCHISE.id)).started).toBe(false)
    expect((await ensureArt('not-a-franchise')).started).toBe(false)
    expect(files.downloaded).toEqual([])
  })

  it('refuses a second run while one is in flight', async () => {
    expect((await ensureArt(FRANCHISE.id)).started).toBe(true)
    expect((await ensureArt(FRANCHISES[1].id)).started).toBe(false)
    await settle()
  })

  it('survives failed downloads and still finishes', async () => {
    files.failFor.add(URLS[0])
    await ensureArt(FRANCHISE.id)
    await settle()
    expect(getArtStatus().running).toBe(false)
    expect(artMap(FRANCHISE.id)[URLS[0]]).toBeNull()
  })
})

describe('dlFileName', () => {
  it('is deterministic and keeps a real image extension', () => {
    const url = 'https://example.test/dir/art.png'
    expect(dlFileName(url)).toBe(dlFileName(url))
    expect(dlFileName(url)).toMatch(/^dl-[0-9a-f]{16}\.png$/)
    expect(dlFileName('https://example.test/x?query=1')).toMatch(/^dl-[0-9a-f]{16}\.jpg$/)
  })
})
