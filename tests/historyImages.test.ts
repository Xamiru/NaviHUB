import { beforeEach, describe, expect, it, vi } from 'vitest'

// The History image cache: a failed download is not retried until its cooldown
// passes, so the refetch that follows every settled batch cannot start another
// one (pages ask for images on every load). files/electron are mocked; tasks.ts
// is electron-free and runs real.

const files = vi.hoisted(() => ({
  onDisk: new Set<string>(),
  downloaded: [] as string[],
  failFor: new Set<string>()
}))

vi.mock('electron', () => ({ app: { getPath: () => '/tmp/navihub-history-images-test' }, dialog: {} }))
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

import { RETRY_COOLDOWN_MS, ensureImages, imageStatus } from '../src/main/history/historyImages'

async function settle(): Promise<void> {
  for (let i = 0; i < 50 && imageStatus().running; i++) await new Promise((r) => setTimeout(r, 5))
}

beforeEach(() => {
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
  })
})
