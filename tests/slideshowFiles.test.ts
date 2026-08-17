import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'

// The Windows desktop-slideshow folder helpers, against a real temp directory:
// the app COPIES Art-tab images into one flat folder and Windows rotates them,
// so the on-disk behaviour (folder created on demand, names de-clashed, removal
// tolerant of a file the user already deleted in Explorer) is the whole feature.

let root: string
const settings = { value: null as string | null }

vi.mock('electron', () => ({
  app: { getPath: () => root },
  dialog: { showOpenDialog: async () => ({ canceled: true, filePaths: [] }) }
}))
vi.mock('../src/main/repos/settingsRepo', () => ({
  get: (key: string) => (key === 'slideshow.dir' ? settings.value : null),
  set: () => undefined
}))
vi.mock('../src/main/progress', () => ({ imageProgress: () => undefined }))
vi.mock('../src/main/http', () => ({ fetchWithRetry: async () => new Response('') }))

import {
  copyIntoSlideshow,
  ensureSlideshowDir,
  picturesDir,
  removeSlideshowCopy,
  slideshowDir
} from '../src/main/files'

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'navihub-slideshow-'))
  settings.value = null
})
afterEach(() => rmSync(root, { recursive: true, force: true }))

function srcFile(name: string, body = 'image-bytes'): string {
  const dir = join(root, 'src')
  mkdirSync(dir, { recursive: true })
  const abs = join(dir, name)
  writeFileSync(abs, body)
  return abs
}

describe('slideshowDir', () => {
  it('defaults to a Slideshow folder inside the pictures root', () => {
    expect(slideshowDir()).toBe(join(picturesDir(), 'Slideshow'))
  })

  it('honours the slideshow.dir setting, trimmed', () => {
    settings.value = `  ${join(root, 'Wallpapers')}  `
    expect(slideshowDir()).toBe(join(root, 'Wallpapers'))
  })

  it('ignores a blank setting rather than resolving to nothing', () => {
    settings.value = '   '
    expect(slideshowDir()).toBe(join(picturesDir(), 'Slideshow'))
  })
})

describe('copyIntoSlideshow', () => {
  it('creates the folder on demand and copies the file in', () => {
    const src = srcFile('one.jpg', 'AAA')
    expect(existsSync(slideshowDir())).toBe(false)

    const name = copyIntoSlideshow(src, 'Berserk - one.jpg')

    expect(name).toBe('Berserk - one.jpg')
    expect(readFileSync(join(slideshowDir(), name), 'utf8')).toBe('AAA')
  })

  it('de-clashes instead of overwriting a same-named image from another title', () => {
    copyIntoSlideshow(srcFile('a.jpg', 'FIRST'), 'Cover - a.jpg')
    const second = copyIntoSlideshow(srcFile('b.jpg', 'SECOND'), 'Cover - a.jpg')

    expect(second).toBe('Cover - a (2).jpg')
    // the first copy is untouched — losing it would silently drop a wallpaper
    expect(readFileSync(join(slideshowDir(), 'Cover - a.jpg'), 'utf8')).toBe('FIRST')
    expect(readFileSync(join(slideshowDir(), second), 'utf8')).toBe('SECOND')
  })

  it('strips any directory part of the requested name', () => {
    const name = copyIntoSlideshow(srcFile('c.jpg'), '../../escape.jpg')
    expect(name).toBe('escape.jpg')
    expect(existsSync(join(slideshowDir(), 'escape.jpg'))).toBe(true)
  })

  it('throws when the source image is gone, so no row can claim a missing copy', () => {
    expect(() => copyIntoSlideshow(join(root, 'src', 'nope.jpg'), 'X - nope.jpg')).toThrow(
      /missing on disk/
    )
  })
})

describe('removeSlideshowCopy', () => {
  it('deletes the copy', () => {
    const name = copyIntoSlideshow(srcFile('one.jpg'), 'Berserk - one.jpg')
    removeSlideshowCopy(name)
    expect(existsSync(join(slideshowDir(), name))).toBe(false)
  })

  it('tolerates a copy the user already deleted by hand', () => {
    ensureSlideshowDir()
    expect(() => removeSlideshowCopy('not-there.jpg')).not.toThrow()
    // …and a missing folder entirely
    rmSync(slideshowDir(), { recursive: true, force: true })
    expect(() => removeSlideshowCopy('not-there.jpg')).not.toThrow()
  })
})

describe('ensureSlideshowDir', () => {
  it('is idempotent and returns the path', () => {
    expect(ensureSlideshowDir()).toBe(slideshowDir())
    expect(ensureSlideshowDir()).toBe(slideshowDir())
    expect(existsSync(slideshowDir())).toBe(true)
  })
})
