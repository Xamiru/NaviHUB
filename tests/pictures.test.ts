import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import {
  addFromFiles,
  addFromSearch,
  addFromUrl,
  forgetSlideshowForMedia,
  listImages,
  parseWallhaven,
  removeImage,
  searchTmdbBackdrops,
  searchWallhaven,
  setBackground,
  slideshowFileName,
  toggleSlideshow,
  tmdbBackdropResults,
  wallhavenSearchUrl
} from '../src/main/pictures'
import type { WallpaperSearchResult } from '../src/shared/types'

// Wallpapers/fan art against the real schema: Wallhaven URL/parse invariants
// (purity=100 stays SFW-only), download-then-insert with per-kind soft dedupe,
// picker copies, remove deleting the file, and the media_image FK cascade.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

const files = vi.hoisted(() => ({
  downloadImageTo: vi.fn(),
  copyImageInto: vi.fn(),
  pickImageFiles: vi.fn(),
  copyIntoSlideshow: vi.fn(),
  removeSlideshowCopy: vi.fn(),
  absoluteMediaPath: vi.fn((rel: string) => `/nonexistent-test-root/${rel}`),
  sanitizeFileBase: (s: string, fallback = 'theme'): string => {
    const clean = s
      .replace(/[/\\:*?"<>|]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 120)
    return clean || fallback
  }
}))
vi.mock('../src/main/files', () => files)

const http = vi.hoisted(() => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: vi.fn()
}))
vi.mock('../src/main/http', () => http)

const tmdb = vi.hoisted(() => ({ fetchBackdrops: vi.fn() }))
vi.mock('../src/main/tmdb', () => tmdb)

function seed(): void {
  db.exec(`
    INSERT INTO media_item (id, media_type, title, external_source, external_id)
      VALUES (1, 'anime', 'Berserk', 'anilist', '33');
    INSERT INTO media_item (id, media_type, title, external_source, external_id)
      VALUES (2, 'movie', 'Blade Runner', 'tmdb', '78');
    INSERT INTO media_item (id, media_type, title) VALUES (3, 'movie', 'Hand-added Film');
  `)
}

beforeEach(() => {
  db = createTestDb()
  seed()
  vi.clearAllMocks()
  files.downloadImageTo.mockImplementation(
    async (_url: string, subdir: string, base?: string | null) =>
      `pictures/${subdir}/${base ?? 'img'}.jpg`
  )
  // The real helper de-clashes against the folder; by default it writes the name
  // it was asked for.
  files.copyIntoSlideshow.mockImplementation((_src: string, name: string) => name)
})

const wallhavenFixture = {
  data: [
    {
      id: 'x8g2o3',
      path: 'https://w.wallhaven.cc/full/x8/wallhaven-x8g2o3.jpg',
      dimension_x: 1920,
      dimension_y: 1080,
      thumbs: { large: 'https://th.wallhaven.cc/lg/x8/x8g2o3.jpg' }
    },
    // no thumbs.large -> falls back to the full path; no dims -> nulls
    { id: 'zz11aa', path: 'https://w.wallhaven.cc/full/zz/wallhaven-zz11aa.png', thumbs: {} },
    // no path at all -> filtered out
    { id: 'broken' }
  ],
  meta: { current_page: 2, last_page: 7 }
}

describe('wallhavenSearchUrl', () => {
  it('always searches SFW-only (purity=100) with all categories', () => {
    const url = new URL(wallhavenSearchUrl('Berserk', 3))
    expect(url.origin + url.pathname).toBe('https://wallhaven.cc/api/v1/search')
    expect(url.searchParams.get('q')).toBe('Berserk')
    expect(url.searchParams.get('categories')).toBe('111')
    expect(url.searchParams.get('purity')).toBe('100')
    expect(url.searchParams.get('page')).toBe('3')
  })

  it('clamps the page to at least 1', () => {
    expect(new URL(wallhavenSearchUrl('x', 0)).searchParams.get('page')).toBe('1')
  })
})

describe('parseWallhaven', () => {
  it('maps results (thumb -> thumbs.large, full -> path, dims) and paging meta', () => {
    const page = parseWallhaven(wallhavenFixture)
    expect(page.page).toBe(2)
    expect(page.lastPage).toBe(7)
    expect(page.results).toHaveLength(2)
    expect(page.results[0]).toEqual({
      source: 'wallhaven',
      id: 'x8g2o3',
      thumbUrl: 'https://th.wallhaven.cc/lg/x8/x8g2o3.jpg',
      fullUrl: 'https://w.wallhaven.cc/full/x8/wallhaven-x8g2o3.jpg',
      width: 1920,
      height: 1080
    })
    expect(page.results[1].thumbUrl).toBe(page.results[1].fullUrl)
    expect(page.results[1].width).toBeNull()
  })

  it('returns an empty page for malformed payloads', () => {
    for (const bad of [null, {}, { data: 'nope' }, { meta: {} }]) {
      expect(parseWallhaven(bad)).toEqual({ results: [], page: 1, lastPage: 1 })
    }
  })
})

describe('tmdbBackdropResults', () => {
  it('builds w780 thumbs and original full URLs from file paths', () => {
    const [r] = tmdbBackdropResults([{ filePath: '/abc.jpg', width: 3840, height: 2160 }])
    expect(r).toEqual({
      source: 'tmdb',
      id: '/abc.jpg',
      thumbUrl: 'https://image.tmdb.org/t/p/w780/abc.jpg',
      fullUrl: 'https://image.tmdb.org/t/p/original/abc.jpg',
      width: 3840,
      height: 2160
    })
  })
})

describe('searchWallhaven', () => {
  it('fetches the SFW search URL and parses the response', async () => {
    http.fetchWithRetry.mockResolvedValue({ ok: true, json: async () => wallhavenFixture })
    const page = await searchWallhaven('Berserk', 2)
    const calledUrl = new URL(http.fetchWithRetry.mock.calls[0][0])
    expect(calledUrl.searchParams.get('purity')).toBe('100')
    expect(calledUrl.searchParams.get('q')).toBe('Berserk')
    expect(page.results).toHaveLength(2)
  })

  it('throws a readable error on a failed response', async () => {
    http.fetchWithRetry.mockResolvedValue({ ok: false, status: 429 })
    await expect(searchWallhaven('x')).rejects.toThrow('Wallhaven search failed (429)')
  })
})

describe('searchTmdbBackdrops', () => {
  it('rejects non-movie/tv media and titles without a TMDB id', async () => {
    await expect(searchTmdbBackdrops(1)).rejects.toThrow('only available for movies and TV')
    await expect(searchTmdbBackdrops(3)).rejects.toThrow('no TMDB id')
    expect(tmdb.fetchBackdrops).not.toHaveBeenCalled()
  })

  it('returns one page of mapped backdrops for a TMDB movie', async () => {
    tmdb.fetchBackdrops.mockResolvedValue([{ filePath: '/br.jpg', width: 1920, height: 1080 }])
    const page = await searchTmdbBackdrops(2)
    expect(tmdb.fetchBackdrops).toHaveBeenCalledWith('movie', '78')
    expect(page.lastPage).toBe(1)
    expect(page.results[0].fullUrl).toBe('https://image.tmdb.org/t/p/original/br.jpg')
  })
})

describe('addFromUrl', () => {
  const url = 'https://example.com/art/great-art.jpg'

  it('downloads into the per-title folder and inserts the row', async () => {
    const img = await addFromUrl(1, 'wallpaper', url)
    expect(files.downloadImageTo).toHaveBeenCalledWith(url, 'Berserk (anime)/wallpapers', 'great-art')
    expect(img).toMatchObject({
      mediaId: 1,
      kind: 'wallpaper',
      filePath: 'pictures/Berserk (anime)/wallpapers/great-art.jpg',
      sourceUrl: url,
      source: 'url'
    })
    expect(listImages(1, 'wallpaper')).toHaveLength(1)
  })

  it('re-adding the same URL returns the existing row without re-downloading', async () => {
    const first = await addFromUrl(1, 'wallpaper', url)
    const second = await addFromUrl(1, 'wallpaper', url)
    expect(second.id).toBe(first.id)
    expect(files.downloadImageTo).toHaveBeenCalledTimes(1)
    expect(listImages(1, 'wallpaper')).toHaveLength(1)
  })

  it('dedupe is per kind: the same URL can live in wallpapers AND fan art', async () => {
    await addFromUrl(1, 'wallpaper', url)
    await addFromUrl(1, 'fanart', url)
    expect(files.downloadImageTo).toHaveBeenCalledTimes(2)
    expect(files.downloadImageTo).toHaveBeenLastCalledWith(url, 'Berserk (anime)/fanart', 'great-art')
    expect(listImages(1, 'fanart')).toHaveLength(1)
  })

  it('rejects non-http(s) or garbage URLs without touching the network', async () => {
    await expect(addFromUrl(1, 'wallpaper', 'not a url')).rejects.toThrow('not a valid URL')
    await expect(addFromUrl(1, 'wallpaper', 'file:///etc/passwd')).rejects.toThrow('http(s)')
    expect(files.downloadImageTo).not.toHaveBeenCalled()
  })

  it('a failed download throws and leaves no row behind', async () => {
    files.downloadImageTo.mockResolvedValue(null)
    await expect(addFromUrl(1, 'wallpaper', url)).rejects.toThrow('download failed')
    expect(listImages(1, 'wallpaper')).toHaveLength(0)
  })
})

describe('addFromSearch', () => {
  it('names wallhaven picks by their id and records dimensions', async () => {
    const r: WallpaperSearchResult = {
      source: 'wallhaven',
      id: 'x8g2o3',
      thumbUrl: 'https://th.wallhaven.cc/lg/x8/x8g2o3.jpg',
      fullUrl: 'https://w.wallhaven.cc/full/x8/wallhaven-x8g2o3.jpg',
      width: 1920,
      height: 1080
    }
    const img = await addFromSearch(1, 'wallpaper', r)
    expect(files.downloadImageTo).toHaveBeenCalledWith(
      r.fullUrl,
      'Berserk (anime)/wallpapers',
      'wallhaven-x8g2o3'
    )
    expect(img).toMatchObject({ source: 'wallhaven', width: 1920, height: 1080 })
  })

  it('names tmdb picks by their backdrop file path', async () => {
    const r: WallpaperSearchResult = {
      source: 'tmdb',
      id: '/br2049.jpg',
      thumbUrl: 'https://image.tmdb.org/t/p/w780/br2049.jpg',
      fullUrl: 'https://image.tmdb.org/t/p/original/br2049.jpg',
      width: 3840,
      height: 2160
    }
    await addFromSearch(2, 'wallpaper', r)
    expect(files.downloadImageTo).toHaveBeenCalledWith(
      r.fullUrl,
      'Blade Runner (movie)/wallpapers',
      'tmdb-br2049'
    )
  })
})

describe('addFromFiles', () => {
  it('copies every picked file, skipping unreadable ones', async () => {
    files.pickImageFiles.mockResolvedValue(['/pics/a one.png', '/pics/broken.jpg', '/pics/b.jpg'])
    files.copyImageInto.mockImplementation((src: string, subdir: string) =>
      src.includes('broken') ? null : `pictures/${subdir}/${src.split('/').pop()}`
    )
    const added = await addFromFiles(1, 'fanart')
    expect(added).toHaveLength(2)
    expect(files.copyImageInto).toHaveBeenCalledWith('/pics/a one.png', 'Berserk (anime)/fanart')
    expect(added[0]).toMatchObject({ kind: 'fanart', source: 'file', sourceUrl: null })
    expect(listImages(1, 'fanart')).toHaveLength(2)
  })

  it('returns [] when the picker is cancelled', async () => {
    files.pickImageFiles.mockResolvedValue([])
    expect(await addFromFiles(1, 'fanart')).toEqual([])
    expect(files.copyImageInto).not.toHaveBeenCalled()
  })
})

describe('listImages', () => {
  it('separates kinds and keeps insertion order (sort_order, id)', async () => {
    await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    await addFromUrl(1, 'wallpaper', 'https://x.com/two.jpg')
    await addFromUrl(1, 'fanart', 'https://x.com/three.jpg')
    const walls = listImages(1, 'wallpaper')
    expect(walls.map((w) => w.filePath.split('/').pop())).toEqual(['one.jpg', 'two.jpg'])
    expect(listImages(1, 'fanart')).toHaveLength(1)
    expect(listImages(2, 'wallpaper')).toHaveLength(0)
  })
})

describe('removeImage', () => {
  it('deletes the row and its pictures/ file on disk', async () => {
    const img = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    files.absoluteMediaPath.mockClear()
    removeImage(img.id)
    expect(listImages(1, 'wallpaper')).toHaveLength(0)
    // file deletion resolved through the prefix mapper for the row's exact path
    expect(files.absoluteMediaPath).toHaveBeenCalledWith(img.filePath)
  })

  it('never resolves non-pictures paths for deletion and ignores unknown ids', () => {
    db.exec(`INSERT INTO media_image (id, media_id, kind, file_path)
             VALUES (99, 1, 'wallpaper', 'media/dl-shared-cover.jpg')`)
    removeImage(99)
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_image').get()).toEqual({ n: 0 })
    expect(files.absoluteMediaPath).not.toHaveBeenCalled()
    expect(() => removeImage(12345)).not.toThrow()
  })
})

describe('media delete', () => {
  it('cascades media_image rows via the real FK', async () => {
    await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    db.prepare('DELETE FROM media_item WHERE id=1').run()
    expect(db.prepare('SELECT COUNT(*) AS n FROM media_image').get()).toEqual({ n: 0 })
  })
})

describe('slideshowFileName', () => {
  it('prefixes the title so a flat folder of images from every title stays readable', () => {
    expect(slideshowFileName('Berserk', 'pictures/Berserk (anime)/wallpapers/wallhaven-x8g2o3.jpg'))
      .toBe('Berserk - wallhaven-x8g2o3.jpg')
  })

  it('sanitizes both halves and keeps the extension', () => {
    expect(slideshowFileName('Re:Zero', 'pictures/x/y/ep*1.png')).toBe('Re Zero - ep 1.png')
  })

  it('falls back for an empty title or basename, and assumes .jpg when there is no extension', () => {
    expect(slideshowFileName('', 'pictures/x/y/pic.webp')).toBe('untitled - pic.webp')
    expect(slideshowFileName('Berserk', 'pictures/x/y/noext')).toBe('Berserk - noext.jpg')
  })
})

describe('toggleSlideshow', () => {
  it('copies the file in, records the name it was actually written under, and toggles back off', async () => {
    const img = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    // the folder already holds a "Berserk - one.jpg", so the helper de-clashes
    files.copyIntoSlideshow.mockReturnValueOnce('Berserk - one (2).jpg')

    const on = toggleSlideshow(img.id)
    expect(on.inSlideshow).toBe(true)
    expect(files.copyIntoSlideshow).toHaveBeenCalledWith(
      `/nonexistent-test-root/${img.filePath}`,
      'Berserk - one.jpg'
    )
    expect(
      db.prepare('SELECT file_name FROM slideshow_item WHERE image_id=?').get(img.id)
    ).toEqual({ file_name: 'Berserk - one (2).jpg' })
    expect(listImages(1, 'wallpaper')[0].inSlideshow).toBe(true)

    const off = toggleSlideshow(img.id)
    expect(off.inSlideshow).toBe(false)
    // the stored name, not the one we asked for — the copy on disk is (2)
    expect(files.removeSlideshowCopy).toHaveBeenCalledWith('Berserk - one (2).jpg')
    expect(db.prepare('SELECT COUNT(*) AS n FROM slideshow_item').get()).toEqual({ n: 0 })
  })

  it('leaves no row when the copy fails', async () => {
    const img = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    files.copyIntoSlideshow.mockImplementationOnce(() => {
      throw new Error('The image file is missing on disk')
    })
    expect(() => toggleSlideshow(img.id)).toThrow(/missing on disk/)
    expect(db.prepare('SELECT COUNT(*) AS n FROM slideshow_item').get()).toEqual({ n: 0 })
    expect(listImages(1, 'wallpaper')[0].inSlideshow).toBe(false)
  })

  it('throws on an unknown image', () => {
    expect(() => toggleSlideshow(4242)).toThrow(/not found/i)
  })

  it('removeImage drops the membership row AND the copy on disk', async () => {
    const img = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    toggleSlideshow(img.id)
    removeImage(img.id)
    expect(files.removeSlideshowCopy).toHaveBeenCalledWith('Berserk - one.jpg')
    expect(db.prepare('SELECT COUNT(*) AS n FROM slideshow_item').get()).toEqual({ n: 0 })
  })

  it('forgetSlideshowForMedia clears every copy for one title only', async () => {
    const a = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    const b = await addFromUrl(1, 'fanart', 'https://x.com/two.jpg')
    const other = await addFromUrl(2, 'wallpaper', 'https://x.com/three.jpg')
    for (const i of [a, b, other]) toggleSlideshow(i.id)

    forgetSlideshowForMedia(1)
    expect(files.removeSlideshowCopy).toHaveBeenCalledWith('Berserk - one.jpg')
    expect(files.removeSlideshowCopy).toHaveBeenCalledWith('Berserk - two.jpg')
    expect(files.removeSlideshowCopy).not.toHaveBeenCalledWith('Blade Runner - three.jpg')
    expect(db.prepare('SELECT COUNT(*) AS n FROM slideshow_item').get()).toEqual({ n: 1 })
  })

  it('membership rows cascade when the media item is deleted', async () => {
    const img = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    toggleSlideshow(img.id)
    db.prepare('DELETE FROM media_item WHERE id=1').run()
    expect(db.prepare('SELECT COUNT(*) AS n FROM slideshow_item').get()).toEqual({ n: 0 })
  })
})

describe('setBackground', () => {
  it('flags one image and moves the flag across kinds, since a page has one backdrop', async () => {
    const wall = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    const fan = await addFromUrl(1, 'fanart', 'https://x.com/two.jpg')

    setBackground(1, wall.id)
    expect(listImages(1, 'wallpaper')[0].isBackground).toBe(true)

    setBackground(1, fan.id)
    expect(listImages(1, 'wallpaper')[0].isBackground).toBe(false)
    expect(listImages(1, 'fanart')[0].isBackground).toBe(true)
  })

  it('clears with a null id', async () => {
    const img = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    setBackground(1, img.id)
    setBackground(1, null)
    expect(listImages(1, 'wallpaper')[0].isBackground).toBe(false)
  })

  it('refuses an image belonging to another title, leaving the old flag alone', async () => {
    const mine = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    const theirs = await addFromUrl(2, 'wallpaper', 'https://x.com/two.jpg')
    setBackground(1, mine.id)
    expect(() => setBackground(1, theirs.id)).toThrow(/not found/i)
    expect(listImages(1, 'wallpaper')[0].isBackground).toBe(true)
    expect(listImages(2, 'wallpaper')[0].isBackground).toBe(false)
  })

  it('does not leak across titles', async () => {
    const a = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    const b = await addFromUrl(2, 'wallpaper', 'https://x.com/two.jpg')
    setBackground(1, a.id)
    setBackground(2, b.id)
    expect(listImages(1, 'wallpaper')[0].isBackground).toBe(true)
    expect(listImages(2, 'wallpaper')[0].isBackground).toBe(true)
  })
})
