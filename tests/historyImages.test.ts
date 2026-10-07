import { beforeEach, describe, expect, it, vi } from 'vitest'

// The History image cache: a failed download is not retried until its cooldown
// passes, so the refetch that follows every settled batch cannot start another
// one (pages ask for images on every load). files/electron are mocked; tasks.ts
// is electron-free and runs real.

const files = vi.hoisted(() => ({
  onDisk: new Set<string>(),
  downloaded: [] as string[],
  failFor: new Set<string>(),
  active: 0,
  maxActive: 0
}))

vi.mock('electron', () => ({ app: { getPath: () => '/tmp/navihub-history-images-test' }, dialog: {} }))
vi.mock('../src/main/files', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  cachedDownload: (url: string) => (files.onDisk.has(url) ? `media/dl-${url}` : null),
  downloadImage: async (url: string) => {
    files.active += 1
    files.maxActive = Math.max(files.maxActive, files.active)
    files.downloaded.push(url)
    await new Promise((r) => setTimeout(r, 2))
    files.active -= 1
    if (files.failFor.has(url)) return null
    files.onDisk.add(url)
    return `media/dl-${url}`
  }
}))

import {
  MAX_RETRY_COOLDOWN_MS,
  RETRY_COOLDOWN_MS,
  ensureImages,
  imageStatus,
  retryCooldown,
  setDownloadGapForTests
} from '../src/main/history/historyImages'

async function settle(): Promise<void> {
  for (let i = 0; i < 400 && imageStatus().running; i++) await new Promise((r) => setTimeout(r, 5))
}

beforeEach(() => {
  setDownloadGapForTests(1)
  files.active = 0
  files.maxActive = 0
  files.onDisk.clear()
  files.downloaded.length = 0
  files.failFor.clear()
})

describe('History image cache', () => {
  it('does not restart a batch for URLs that just failed', async () => {
    const dead = 'https://upload.wikimedia.org/dead.jpg'
    const good = 'https://upload.wikimedia.org/good.jpg'
    files.failFor.add(dead)
    expect(ensureImages([dead, good], 'test')).toEqual({ started: true })
    await settle()
    expect(files.downloaded.sort()).toEqual([dead, good].sort())

    // The page refetches when the batch settles and asks again.
    expect(ensureImages([dead, good], 'test')).toEqual({ started: false })
    expect(files.downloaded).toHaveLength(2)

    // After the cooldown the dead URL is tried once more.
    expect(ensureImages([dead, good], 'test', Date.now() + RETRY_COOLDOWN_MS + 1)).toEqual({ started: true })
    await settle()
    expect(files.downloaded.filter((u) => u === dead)).toHaveLength(2)

    // A second failure doubles the wait before the next try.
    const later = Date.now() + RETRY_COOLDOWN_MS + 1
    expect(ensureImages([dead], 'test', later)).toEqual({ started: false })
    expect(ensureImages([dead], 'test', Date.now() + 2 * RETRY_COOLDOWN_MS + 1)).toEqual({ started: true })
    await settle()
    expect(files.downloaded.filter((u) => u === dead)).toHaveLength(3)
  })

  it('backs off a repeatedly failing URL up to a cap', () => {
    expect([1, 2, 3].map(retryCooldown)).toEqual([RETRY_COOLDOWN_MS, 2 * RETRY_COOLDOWN_MS, 4 * RETRY_COOLDOWN_MS])
    expect(retryCooldown(50)).toBe(MAX_RETRY_COOLDOWN_MS)
  })

  it('downloads one image at a time, never in parallel', async () => {
    const urls = Array.from({ length: 6 }, (_, i) => `https://upload.wikimedia.org/p${i}.jpg`)
    ensureImages(urls, 'test')
    await settle()
    expect(files.downloaded.sort()).toEqual([...urls].sort())
    expect(files.maxActive).toBe(1)
  })

  it('puts the latest page first and lets it join a running queue', async () => {
    const first = Array.from({ length: 4 }, (_, i) => `https://upload.wikimedia.org/a${i}.jpg`)
    const second = ['https://upload.wikimedia.org/b0.jpg', 'https://upload.wikimedia.org/b1.jpg']
    ensureImages(first, 'decade')
    expect(ensureImages(second, 'article')).toEqual({ started: true })
    expect(imageStatus()).toMatchObject({ running: true, total: 6 })
    await settle()
    // a0 was already in flight; the article's images come straight after it.
    expect(files.downloaded.slice(0, 3)).toEqual([first[0], ...second])
    expect(new Set(files.downloaded)).toEqual(new Set([...first, ...second]))
    expect(imageStatus()).toMatchObject({ running: false, done: 6, total: 6 })
  })
})
