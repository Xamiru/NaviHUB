import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import {
  addFromFiles,
  addFromSearch,
  addFromUrl,
  forgetSlideshowForMedia,
  listImages,
  listSources,
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
import {
  addToAlbum,
  backfillDims,
  createAlbum,
  deleteAlbum,
  homePick,
  listAlbums,
  listGallery,
  listTags,
  moveImages,
  removeFromAlbum,
  renameTag,
  reorderAlbum,
  setFavorite,
  setSlideshowSource,
  tagImages,
  untagImages
} from '../src/main/pictureLibrary'
import * as settingsRepo from '../src/main/repos/settingsRepo'
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
  moveImageInto: vi.fn(),
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
  files.moveImageInto.mockImplementation(
    (rel: string, subdir: string) => `pictures/${subdir}/${rel.split('/').pop()}`
  )
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

describe('browse sources', () => {
  const sources = (id: number, kind: 'wallpaper' | 'fanart') =>
    listSources(id, kind).map((s) => `${s.source}${s.query === null ? '' : `:${s.query}`}${s.needsKey ? '!' : ''}`)

  it('opens anime fan art on Danbooru and offers the AniList banner', () => {
    expect(sources(1, 'fanart')).toEqual(['danbooru:Berserk', 'wallhaven:Berserk', 'anilist'])
    expect(sources(1, 'wallpaper')).toEqual(['wallhaven:Berserk', 'danbooru:Berserk', 'anilist'])
  })

  it('offers TMDB and fanart.tv only for TMDB imports, flagging the missing key', () => {
    expect(sources(2, 'wallpaper')).toEqual(['wallhaven:Blade Runner', 'tmdb', 'fanarttv!'])
    expect(sources(3, 'wallpaper')).toEqual(['wallhaven:Hand-added Film'])
  })

  it('binds game sources to the Steam id when there is one', () => {
    db.exec(`INSERT INTO media_item (id, media_type, title, external_source, external_id)
               VALUES (4, 'game', 'Elden Ring', 'steam', '1245620'),
                      (5, 'game', 'Old Game', 'rawg', '99'),
                      (6, 'visual_novel', 'Ever17', 'vndb', '17')`)
    expect(sources(4, 'wallpaper')).toEqual(['wallhaven:Elden Ring', 'danbooru:Elden Ring', 'steam', 'steamgriddb!'])
    expect(sources(5, 'wallpaper')).toContain('steam:Old Game')
    expect(sources(6, 'wallpaper')).toContain('vndb')
  })

  it('names the saved file after its source', async () => {
    await addFromSearch(1, 'fanart', {
      source: 'danbooru',
      id: '12253500',
      thumbUrl: 'https://cdn.donmai.us/360x360/a.jpg',
      fullUrl: 'https://cdn.donmai.us/original/a.jpg',
      width: 1479,
      height: 1892
    })
    expect(files.downloadImageTo).toHaveBeenCalledWith(
      'https://cdn.donmai.us/original/a.jpg',
      'Berserk (anime)/fanart',
      'danbooru-12253500'
    )
  })
})

// ---- Pictures gallery (pictureLibrary.ts) ------------------------------------

function setDims(id: number, width: number, height: number): void {
  db.prepare('UPDATE media_image SET width=?, height=? WHERE id=?').run(width, height, id)
}

describe('Unsorted pictures', () => {
  it('stores title-less images under Unsorted and names their slideshow copy after it', async () => {
    const img = await addFromUrl(null, 'fanart', 'https://x.com/crossover.png')
    expect(img).toMatchObject({ mediaId: null, mediaTitle: null, mediaType: null })
    expect(files.downloadImageTo).toHaveBeenCalledWith(
      'https://x.com/crossover.png',
      'Unsorted/fanart',
      'crossover'
    )
    expect(await addFromUrl(null, 'fanart', 'https://x.com/crossover.png')).toEqual(img)
    toggleSlideshow(img.id)
    expect(files.copyIntoSlideshow).toHaveBeenLastCalledWith(
      expect.any(String),
      'Unsorted - crossover.jpg'
    )
  })

  it('offers only the free-text sources', () => {
    expect(listSources(null, 'fanart').map((s) => s.source)).toEqual(['danbooru', 'wallhaven'])
    expect(listSources(null, 'wallpaper').map((s) => s.source)).toEqual(['wallhaven', 'danbooru'])
  })

  it('reads the header for dimensions on insert, recording 0 when unreadable', async () => {
    const img = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    expect(img.width).toBeNull()
    expect(db.prepare('SELECT width, height FROM media_image WHERE id=?').get(img.id)).toEqual({
      width: 0,
      height: 0
    })
    // A file that is not there (an unmounted drive) stays unprobed for later.
    db.prepare('UPDATE media_image SET width=NULL, height=NULL WHERE id=?').run(img.id)
    expect(backfillDims()).toBe(0)
    expect(db.prepare('SELECT width FROM media_image WHERE id=?').get(img.id)).toEqual({ width: null })

    // Missing files cannot hold back a readable one behind them.
    const readable = await addFromUrl(1, 'wallpaper', 'https://x.com/two.jpg')
    db.prepare('UPDATE media_image SET width=NULL, height=NULL WHERE id=?').run(readable.id)
    const { file_path } = db.prepare('SELECT file_path FROM media_image WHERE id=?').get(readable.id) as { file_path: string }
    files.absoluteMediaPath.mockImplementation((rel: string) => rel === file_path ? __filename : `/nonexistent-test-root/${rel}`)
    try {
      expect(backfillDims(1)).toBe(0)
      expect(backfillDims(1)).toBe(1)
    } finally {
      files.absoluteMediaPath.mockImplementation((rel: string) => `/nonexistent-test-root/${rel}`)
    }
  })
})

describe('listGallery', () => {
  it('narrows by title, Unsorted, type, kind, favorites, tags, orientation and slideshow', async () => {
    const wide = await addFromUrl(1, 'wallpaper', 'https://x.com/wide.jpg')
    const tall = await addFromUrl(1, 'fanart', 'https://x.com/tall.jpg')
    const film = await addFromUrl(2, 'wallpaper', 'https://x.com/film.jpg')
    const loose = await addFromUrl(null, 'fanart', 'https://x.com/loose.jpg')
    setDims(wide.id, 1920, 1080)
    setDims(tall.id, 800, 1200)
    setDims(film.id, 1000, 1000)
    await setFavorite([wide.id, loose.id], true)
    tagImages([wide.id, tall.id], 'Night')
    tagImages([wide.id], 'City')
    toggleSlideshow(film.id)
    const ids = (f: Parameters<typeof listGallery>[0]): number[] =>
      listGallery(f).map((i) => i.id).sort((a, b) => a - b)

    expect(ids({})).toEqual([wide.id, tall.id, film.id, loose.id])
    expect(ids({ mediaId: 1 })).toEqual([wide.id, tall.id])
    expect(ids({ unsorted: true })).toEqual([loose.id])
    expect(ids({ mediaType: 'movie' })).toEqual([film.id])
    expect(ids({ kind: 'fanart' })).toEqual([tall.id, loose.id])
    expect(ids({ favorites: true })).toEqual([wide.id, loose.id])
    const night = listTags().find((t) => t.name === 'Night')!.id
    const city = listTags().find((t) => t.name === 'City')!.id
    expect(ids({ tagIds: [night] })).toEqual([wide.id, tall.id])
    expect(ids({ tagIds: [night, city] })).toEqual([wide.id])
    expect(ids({ orientation: 'landscape' })).toEqual([wide.id])
    expect(ids({ orientation: 'portrait' })).toEqual([tall.id])
    // Unknown dimensions (loose) match no orientation.
    expect(ids({ orientation: 'square' })).toEqual([film.id])
    expect(ids({ inSlideshow: true })).toEqual([film.id])
  })

  it('sorts by title with Unsorted last, and by the album order inside an album', async () => {
    const loose = await addFromUrl(null, 'wallpaper', 'https://x.com/a.jpg')
    const film = await addFromUrl(2, 'wallpaper', 'https://x.com/b.jpg')
    const anime = await addFromUrl(1, 'wallpaper', 'https://x.com/c.jpg')
    expect(listGallery({ sort: 'title' }).map((i) => i.id)).toEqual([anime.id, film.id, loose.id])

    const album = await createAlbum('  Mixed   bag ', [film.id, loose.id, anime.id])
    expect(album).toMatchObject({ name: 'Mixed bag', count: 3, coverPath: film.filePath })
    reorderAlbum(album.id, [anime.id, film.id, loose.id])
    expect(listGallery({ albumId: album.id }).map((i) => i.id)).toEqual([anime.id, film.id, loose.id])
    expect(listAlbums()[0].coverPath).toBe(anime.filePath)
  })
})

describe('moveImages', () => {
  it('moves the file before the row, and drops the background only when the title changes', async () => {
    const img = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    setBackground(1, img.id)

    const [asFanart] = moveImages([img.id], 1, 'fanart')
    expect(asFanart).toMatchObject({ kind: 'fanart', isBackground: true })
    expect(files.moveImageInto).toHaveBeenLastCalledWith(img.filePath, 'Berserk (anime)/fanart')

    const [loose] = moveImages([img.id], null, null)
    expect(loose).toMatchObject({
      mediaId: null,
      kind: 'fanart',
      isBackground: false,
      filePath: 'pictures/Unsorted/fanart/one.jpg'
    })
  })

  it('leaves the row untouched when the file cannot move', async () => {
    const img = await addFromUrl(1, 'wallpaper', 'https://x.com/one.jpg')
    files.moveImageInto.mockImplementationOnce(() => {
      throw new Error('The image file is missing on disk')
    })
    expect(() => moveImages([img.id], 2, null)).toThrow(/missing/)
    expect(listImages(1, 'wallpaper').map((i) => i.id)).toEqual([img.id])
  })
})

describe('picture tags', () => {
  it('reuses a tag case-insensitively, deletes it with its last image, and merges on rename', async () => {
    const a = await addFromUrl(1, 'wallpaper', 'https://x.com/a.jpg')
    const b = await addFromUrl(1, 'wallpaper', 'https://x.com/b.jpg')
    const night = tagImages([a.id], 'Night')
    expect(tagImages([b.id], 'night')).toEqual({ id: night.id, name: 'Night', count: 2 })

    const dusk = tagImages([a.id], 'Dusk')
    renameTag(dusk.id, 'NIGHT')
    expect(listTags()).toEqual([{ id: night.id, name: 'Night', count: 2 }])

    untagImages([a.id, b.id], night.id)
    expect(listTags()).toEqual([])
  })
})

describe('slideshow mirror', () => {
  it('keeps the folder equal to the favorites, and refuses hand toggles meanwhile', async () => {
    const fav = await addFromUrl(1, 'wallpaper', 'https://x.com/fav.jpg')
    const manual = await addFromUrl(1, 'wallpaper', 'https://x.com/manual.jpg')
    toggleSlideshow(manual.id)
    await setFavorite([fav.id], true)

    expect(await setSlideshowSource('favorites')).toEqual({ added: 1, removed: 1, failed: 0 })
    expect(files.removeSlideshowCopy).toHaveBeenCalledWith('Berserk - manual.jpg')
    expect(listGallery({ inSlideshow: true }).map((i) => i.id)).toEqual([fav.id])
    expect(() => toggleSlideshow(manual.id)).toThrow(/Manual/)

    await setFavorite([fav.id], false)
    expect(listGallery({ inSlideshow: true })).toEqual([])
    expect(homePick()).toBeNull()
  })

  it('counts a failed copy and carries on', async () => {
    const a = await addFromUrl(1, 'wallpaper', 'https://x.com/a.jpg')
    const b = await addFromUrl(1, 'wallpaper', 'https://x.com/b.jpg')
    const album = await createAlbum('Desk', [a.id, b.id])
    files.copyIntoSlideshow.mockImplementationOnce(() => {
      throw new Error('The image file is missing on disk')
    })
    expect(await setSlideshowSource(`album:${album.id}`)).toEqual({ added: 1, removed: 0, failed: 1 })

    await removeFromAlbum(album.id, [a.id, b.id])
    expect(listGallery({ inSlideshow: true })).toEqual([])
    await addToAlbum(album.id, [b.id])
    expect(listGallery({ inSlideshow: true }).map((i) => i.id)).toEqual([b.id])
  })

  it('falls back to Manual, keeping the copies, when the mirrored album is deleted', async () => {
    const a = await addFromUrl(1, 'wallpaper', 'https://x.com/a.jpg')
    const album = await createAlbum('Desk', [a.id])
    await setSlideshowSource(`album:${album.id}`)
    deleteAlbum(album.id)
    expect(settingsRepo.get('pictures.slideshowSource')).toBe('manual')
    expect(listGallery({ inSlideshow: true }).map((i) => i.id)).toEqual([a.id])
    expect(() => toggleSlideshow(a.id)).not.toThrow()
  })

  it('rejects an unknown source or a missing album', async () => {
    expect(() => setSlideshowSource('album:99')).toThrow(/Album not found/)
    expect(() => setSlideshowSource('everything' as never)).toThrow(/Unknown/)
  })
})
