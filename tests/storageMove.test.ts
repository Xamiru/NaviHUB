import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initialPicturesDir, isInside, moveTargetProblem } from '../src/main/storageCore'

vi.mock('electron', () => ({ app: { getPath: () => '/tmp' }, dialog: {} }))
vi.mock('../src/main/files', () => ({}))
vi.mock('../src/main/repos/settingsRepo', () => ({ get: () => null, set: () => {} }))

import { MoveCancelled, relocate, start } from '../src/main/storageMove'

// Moving the pictures/media roots. The order under test is the safety: the
// setting flips only after a complete, verified copy, and an original is
// deleted only once its copy verifies.

let base: string
let from: string
let to: string
const exdev = async (): Promise<void> => {
  throw Object.assign(new Error('cross-device'), { code: 'EXDEV' })
}
const files = (dir: string): string[] =>
  existsSync(dir) ? (readdirSync(dir, { recursive: true, withFileTypes: true }) as { isFile(): boolean; name: string; parentPath: string }[])
    .filter((e) => e.isFile())
    .map((e) => join(e.parentPath, e.name).slice(dir.length + 1))
    .sort() : []

beforeEach(() => {
  base = mkdtempSync(join(tmpdir(), 'navihub-move-'))
  from = join(base, 'old')
  to = join(base, 'new')
  mkdirSync(join(from, 'picked'), { recursive: true })
  mkdirSync(join(from, 'Berserk (anime)', 'wallpapers'), { recursive: true })
  writeFileSync(join(from, 'dl-a.jpg'), 'aaa')
  writeFileSync(join(from, 'picked', 'mine.png'), 'mine')
  writeFileSync(join(from, 'Berserk (anime)', 'wallpapers', 'w.jpg'), 'wall')
})
afterEach(() => rmSync(base, { recursive: true, force: true }))

describe('relocate', () => {
  it('renames on the same drive and then commits', async () => {
    const commit = vi.fn()
    const result = await relocate(from, to, { commit })
    expect(result).toMatchObject({ method: 'rename', files: 3, leftovers: 0 })
    expect(commit).toHaveBeenCalledOnce()
    expect(existsSync(from)).toBe(false)
    expect(readFileSync(join(to, 'picked', 'mine.png'), 'utf8')).toBe('mine')
  })

  it('copies across drives, commits only after the copy, then removes the originals', async () => {
    const seenAtCommit: string[][] = []
    const result = await relocate(from, to, {
      rename: exdev,
      commit: () => seenAtCommit.push(files(to)),
      freeBytes: async () => null
    })
    expect(result).toMatchObject({ method: 'copy', files: 3, leftovers: 0 })
    expect(seenAtCommit).toEqual([['Berserk (anime)/wallpapers/w.jpg', 'dl-a.jpg', 'picked/mine.png']])
    expect(existsSync(from)).toBe(false)
  })

  it('a cancelled copy leaves the old folder and setting untouched and removes the partial copy', async () => {
    const commit = vi.fn()
    let copies = 0
    await expect(
      relocate(from, to, {
        rename: exdev,
        commit,
        freeBytes: async () => null,
        progress: () => copies++,
        cancelled: () => copies >= 1
      })
    ).rejects.toBeInstanceOf(MoveCancelled)
    expect(commit).not.toHaveBeenCalled()
    expect(files(from)).toHaveLength(3)
    expect(existsSync(to)).toBe(false)
  })

  it('refuses before copying when the destination drive is too small', async () => {
    const commit = vi.fn()
    await expect(
      relocate(from, to, { rename: exdev, commit, freeBytes: async () => 5 })
    ).rejects.toThrow(/Not enough free space/)
    expect(commit).not.toHaveBeenCalled()
    expect(files(from)).toHaveLength(3)
  })

  it('carries over a file written into the old folder during the copy', async () => {
    let wroteLate = false
    const result = await relocate(from, to, {
      rename: exdev,
      freeBytes: async () => null,
      progress: (phase) => {
        if (phase === 'copying' && !wroteLate) {
          wroteLate = true
          writeFileSync(join(from, 'dl-late.jpg'), 'late')
        }
      },
      commit: () => {}
    })
    expect(readFileSync(join(to, 'dl-late.jpg'), 'utf8')).toBe('late')
    expect(result.leftovers).toBe(0)
  })

  it('keeps an original whose copy does not match', async () => {
    const result = await relocate(from, to, {
      rename: exdev,
      freeBytes: async () => null,
      commit: () => writeFileSync(join(to, 'dl-a.jpg'), 'tampered-longer')
    })
    expect(result.leftovers).toBe(1)
    expect(readFileSync(join(from, 'dl-a.jpg'), 'utf8')).toBe('aaa')
  })
})

describe('start', () => {
  // A relative path once slipped through: resolve() anchored it to the working
  // directory before the check, and a real move began.
  it('refuses a relative destination before touching anything', () => {
    expect(() => start('media', 'relative/dir')).toThrow(/full folder path/)
    expect(() => start('media', '')).toThrow(/full folder path/)
  })
})

describe('storage decisions', () => {
  it('pins an existing pictures folder and starts fresh libraries in the OS Pictures folder', () => {
    const legacyDir = '/data/navihub/pictures'
    expect(initialPicturesDir({ legacyDir, legacyHasFiles: true, osPictures: '/home/u/Pictures' })).toBe(legacyDir)
    expect(initialPicturesDir({ legacyDir, legacyHasFiles: false, osPictures: '/home/u/Pictures' })).toBe(
      join('/home/u/Pictures', 'NaviHUB')
    )
    expect(initialPicturesDir({ legacyDir, legacyHasFiles: false, osPictures: null })).toBeNull()
  })

  it('refuses destinations that overlap the current or another folder', () => {
    const base = { from: '/data/media', toExists: false, toEmpty: true, otherRoots: [{ label: 'music library', dir: '/music' }] }
    expect(moveTargetProblem({ ...base, to: 'relative/path' })).toMatch(/full folder path/)
    expect(moveTargetProblem({ ...base, to: '/data/media' })).toMatch(/already the current/)
    expect(moveTargetProblem({ ...base, to: '/data/media/sub' })).toMatch(/inside the current/)
    expect(moveTargetProblem({ ...base, to: '/data' })).toMatch(/inside the current/)
    expect(moveTargetProblem({ ...base, to: '/music/covers' })).toMatch(/music library/)
    expect(moveTargetProblem({ ...base, to: '/d/new', toExists: true, toEmpty: false })).toMatch(/empty folder/)
    expect(moveTargetProblem({ ...base, to: '/d/new' })).toBeNull()
  })

  it('compares Windows paths case-insensitively', () => {
    expect(isInside('C:\\Users\\Me\\Pictures', 'c:\\users\\me\\pictures\\NaviHUB', 'win32')).toBe(true)
    expect(isInside('C:\\Users\\Me\\Pictures', 'D:\\NaviHUB', 'win32')).toBe(false)
    expect(isInside('/a/b', '/a/bc', 'linux')).toBe(false)
    expect(isInside('/a/B', '/a/b/c', 'linux')).toBe(false)
  })
})

// The media root moves (media.dir), so every path into it must go through
// files.mediaRoot(). connection.ts repeats the one lookup on purpose (it cannot
// import files.ts) and is the only allowed exception.
describe('media root guard', () => {
  it('nothing else builds <userData>/media by hand', () => {
    const root = join(__dirname, '..', 'src', 'main')
    const offenders = (readdirSync(root, { recursive: true }) as string[])
      .filter((f) => f.endsWith('.ts') && f !== 'files.ts' && f !== join('db', 'connection.ts'))
      .filter((f) => /getPath\('userData'\),\s*'media'/.test(readFileSync(join(root, f), 'utf8')))
    expect(offenders).toEqual([])
  })
})
