import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const env = vi.hoisted(() => ({ root: '', fetch: vi.fn() }))

vi.mock('electron', () => ({
  app: { getPath: () => env.root },
  dialog: { showOpenDialog: vi.fn() },
  BrowserWindow: { getFocusedWindow: () => null }
}))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: () => null }))
vi.mock('../src/main/progress', () => ({ imageProgress: vi.fn() }))
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: (...args: unknown[]) => env.fetch(...args)
}))

import {
  downloadAudio,
  downloadImage,
  downloadImageTo,
  importImageFile
} from '../src/main/files'

function response(body: string, declared = Buffer.byteLength(body)): Response {
  return new Response(body, { headers: { 'content-length': String(declared) } })
}

function allNames(path: string): string[] {
  return readdirSync(path, { recursive: true }).map(String)
}

beforeEach(() => {
  env.root = mkdtempSync(join(tmpdir(), 'navihub-files-'))
  env.fetch.mockReset()
})

afterEach(() => {
  rmSync(env.root, { recursive: true, force: true })
})

describe('streamed media downloads', () => {
  it('publishes a content-addressed image and reuses it without another request', async () => {
    env.fetch.mockResolvedValue(response('image bytes'))
    const url = 'https://img.example/cover.jpg'
    const first = await downloadImage(url)
    const second = await downloadImage(url)

    expect(first).toMatch(/^media\/dl-[0-9a-f]{16}\.jpg$/)
    expect(second).toBe(first)
    expect(readFileSync(join(env.root, first!), 'utf8')).toBe('image bytes')
    expect(env.fetch).toHaveBeenCalledTimes(1)
    expect(allNames(env.root).some((name) => name.includes('.part-'))).toBe(false)
  })

  it('rejects an image whose declared length exceeds the media limit', async () => {
    env.fetch.mockResolvedValue(response('x', 40 * 1024 * 1024))

    expect(await downloadImage('https://img.example/huge.png')).toBeNull()
    expect(allNames(env.root).some((name) => name.includes('.part-'))).toBe(false)
  })

  it('atomically replaces readable theme audio only after the new body is complete', async () => {
    env.fetch.mockResolvedValueOnce(response('first')).mockResolvedValueOnce(response('second'))
    const url = 'https://audio.example/theme.ogg'

    expect(await downloadAudio(url, 'Series OP')).toBe('audio/Series OP.ogg')
    expect(await downloadAudio(url, 'Series OP')).toBe('audio/Series OP.ogg')
    expect(readFileSync(join(env.root, 'media', 'Series OP.ogg'), 'utf8')).toBe('second')
    expect(allNames(env.root).some((name) => name.includes('.part-'))).toBe(false)
  })

  it('keeps readable picture naming and de-clashes completed downloads', async () => {
    env.fetch.mockImplementation(async () => response('picture'))

    expect(await downloadImageTo('https://img.example/art.webp', 'Title/wallpapers', 'Key art')).toBe(
      'pictures/Title/wallpapers/Key art.webp'
    )
    expect(await downloadImageTo('https://img.example/art.webp', 'Title/wallpapers', 'Key art')).toBe(
      'pictures/Title/wallpapers/Key art (2).webp'
    )
    expect(readFileSync(join(env.root, 'pictures', 'Title', 'wallpapers', 'Key art.webp'), 'utf8')).toBe(
      'picture'
    )
  })

  it('hashes and copies a local image in bounded chunks without partial debris', () => {
    const sourceDir = join(env.root, 'source')
    mkdirSync(sourceDir)
    const source = join(sourceDir, 'achievement.png')
    writeFileSync(source, Buffer.alloc(700_000, 7))

    const first = importImageFile(source)
    const second = importImageFile(source)
    expect(first).toMatch(/^media\/lc-[0-9a-f]{16}\.png$/)
    expect(second).toBe(first)
    const copied = readFileSync(join(env.root, first!))
    expect(copied).toHaveLength(700_000)
    expect(copied[0]).toBe(7)
    expect(copied.at(-1)).toBe(7)
    expect(allNames(env.root).some((name) => name.includes('.part'))).toBe(false)
  })
})
