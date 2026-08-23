import { mkdtempSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// thumbs.ts decodes with electron's nativeImage and resolves sources through
// files.absoluteMediaPath — both replaced so the module runs under plain Node
// against temp dirs. The fake nativeImage records what it was asked to do so
// tests can assert caching/resize behavior without a real decoder.

interface FakeImg {
  isEmpty(): boolean
  getSize(): { width: number; height: number }
  resize(opts: { width: number }): FakeImg
  toJPEG(q: number): Buffer
}

let userDataDir: string
let mediaRoot: string
let decodeCalls: string[]
let resizeCalls: number[]
let jpegBodies: Map<string, Buffer>
let emptyImages: Set<string>
let sourceSizes: Map<string, { width: number; height: number }>

vi.mock('electron', () => ({
  app: { getPath: () => userDataDir },
  nativeImage: {
    createFromPath(abs: string): FakeImg {
      decodeCalls.push(abs)
      const size = sourceSizes.get(abs) ?? { width: 1200, height: 1800 }
      let resized = false
      return {
        isEmpty: () => emptyImages.has(abs),
        getSize: () => size,
        resize(opts) {
          resizeCalls.push(opts.width)
          resized = true
          return this
        },
        toJPEG(_q: number) {
          const body = Buffer.from(`jpeg:${abs}:${resized ? 'scaled' : 'native'}`)
          jpegBodies.set(abs, body)
          return body
        }
      }
    }
  }
}))
vi.mock('../src/main/files', () => ({
  absoluteMediaPath: (rel: string) => join(mediaRoot, rel.slice('media/'.length))
}))

import * as thumbs from '../src/main/thumbs'

beforeEach(() => {
  userDataDir = mkdtempSync(join(os.tmpdir(), 'navihub-thumbs-user-'))
  mediaRoot = mkdtempSync(join(os.tmpdir(), 'navihub-thumbs-media-'))
  decodeCalls = []
  resizeCalls = []
  jpegBodies = new Map()
  emptyImages = new Set()
  sourceSizes = new Map()
})

afterEach(() => {
  rmSync(userDataDir, { recursive: true, force: true })
  rmSync(mediaRoot, { recursive: true, force: true })
})

function makeSource(rel: string, size = { width: 1200, height: 1800 }): string {
  const abs = join(mediaRoot, rel.slice('media/'.length))
  // The fake decoder never reads bytes, but ensureThumb stats for existence.
  writeFileSync(abs, 'fake image bytes')
  sourceSizes.set(abs, size)
  return abs
}

describe('parseThumbRequest', () => {
  it('parses a valid request', () => {
    expect(thumbs.parseThumbRequest('thumb/320/media/dl-abc.jpg')).toEqual({
      width: 320,
      sourceRel: 'media/dl-abc.jpg'
    })
  })

  it('accepts every advertised width and nothing else', () => {
    for (const w of thumbs.THUMB_WIDTHS) {
      expect(thumbs.parseThumbRequest(`thumb/${w}/media/x.jpg`)).not.toBeNull()
    }
    expect(thumbs.parseThumbRequest('thumb/100/media/x.jpg')).toBeNull()
    expect(thumbs.parseThumbRequest('thumb/9999/media/x.jpg')).toBeNull()
    expect(thumbs.parseThumbRequest('thumb/0/media/x.jpg')).toBeNull()
    expect(thumbs.parseThumbRequest('thumb/abc/media/x.jpg')).toBeNull()
  })

  it('rejects non-thumb paths', () => {
    expect(thumbs.parseThumbRequest('media/dl-abc.jpg')).toBeNull()
    expect(thumbs.parseThumbRequest('thumb/media/dl-abc.jpg')).toBeNull()
    expect(thumbs.parseThumbRequest('')).toBeNull()
  })

  it('only serves the content-addressed media store', () => {
    expect(thumbs.parseThumbRequest('thumb/320/audio/theme.ogg')).toBeNull()
    expect(thumbs.parseThumbRequest('thumb/320/video/movie.mkv')).toBeNull()
    expect(thumbs.parseThumbRequest('thumb/320/open/token.mkv')).toBeNull()
  })

  it('rejects traversal before absoluteMediaPath ever sees it', () => {
    expect(thumbs.parseThumbRequest('thumb/320/media/../audio/theme.ogg')).toBeNull()
  })
})

describe('thumbCacheName', () => {
  it('is deterministic per width+path and differs by width', () => {
    const a = thumbs.thumbCacheName('media/dl-abc.jpg', 320)
    expect(a).toBe(thumbs.thumbCacheName('media/dl-abc.jpg', 320))
    expect(a).not.toBe(thumbs.thumbCacheName('media/dl-abc.jpg', 160))
    expect(a).not.toBe(thumbs.thumbCacheName('media/dl-other.jpg', 320))
    expect(a.endsWith('.jpg')).toBe(true)
    expect(a).not.toContain('/') // flat cache dir
  })
})

describe('ensureThumb', () => {
  it('generates, resizes down and caches on disk', async () => {
    makeSource('media/dl-big.jpg')
    const out = await thumbs.ensureThumb(320, 'media/dl-big.jpg')
    expect(out).not.toBeNull()
    expect(existsSync(out as string)).toBe(true)
    expect(join(out as string, '')).toContain(join(userDataDir, 'thumbs'))
    expect(resizeCalls).toEqual([320])
    expect(readFileSync(out as string).toString()).toBe(`jpeg:${mediaRoot}/dl-big.jpg:scaled`)
  })

  it('never upscales a smaller source', async () => {
    makeSource('media/dl-small.jpg', { width: 200, height: 300 })
    await thumbs.ensureThumb(320, 'media/dl-small.jpg')
    expect(resizeCalls).toEqual([])
  })

  it('serves a warm cache without re-decoding', async () => {
    makeSource('media/dl-warm.jpg')
    const first = await thumbs.ensureThumb(160, 'media/dl-warm.jpg')
    const decodeCount = decodeCalls.length
    const second = await thumbs.ensureThumb(160, 'media/dl-warm.jpg')
    expect(second).toBe(first)
    expect(decodeCalls.length).toBe(decodeCount)
  })

  it('dedupes concurrent requests for the same thumb', async () => {
    makeSource('media/dl-race.jpg')
    const [a, b] = await Promise.all([
      thumbs.ensureThumb(320, 'media/dl-race.jpg'),
      thumbs.ensureThumb(320, 'media/dl-race.jpg')
    ])
    expect(a).toBe(b)
    expect(decodeCalls.length).toBe(1)
    // And the in-flight entry is released afterwards — a later call still works.
    await thumbs.ensureThumb(320, 'media/dl-race.jpg')
    expect(decodeCalls.length).toBe(1)
  })

  it('caches per width independently', async () => {
    makeSource('media/dl-two.jpg')
    const w160 = await thumbs.ensureThumb(160, 'media/dl-two.jpg')
    const w480 = await thumbs.ensureThumb(480, 'media/dl-two.jpg')
    expect(w160).not.toBe(w480)
    expect(decodeCalls.length).toBe(2)
  })

  it('returns null for a missing source without writing a cache entry', async () => {
    const out = await thumbs.ensureThumb(320, 'media/dl-missing.jpg')
    expect(out).toBeNull()
    expect(existsSync(join(userDataDir, 'thumbs'))).toBe(false)
  })

  it('returns null for an undecodable image', async () => {
    makeSource('media/dl-corrupt.webp')
    emptyImages.add(`${mediaRoot}/dl-corrupt.webp`)
    const out = await thumbs.ensureThumb(320, 'media/dl-corrupt.webp')
    expect(out).toBeNull()
  })
})
