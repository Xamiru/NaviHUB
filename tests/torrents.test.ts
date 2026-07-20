import { describe, expect, it } from 'vitest'
import { formatBytes, torznabCategoriesFor, TORRENT_CATEGORY_OPTIONS } from '../src/shared/torrents'
import type { MediaType } from '../src/shared/types'

// Shared torrent vocabulary: media-type -> Torznab category mapping and the
// byte formatter used by the results table.

describe('torznabCategoriesFor', () => {
  const ALL: MediaType[] = ['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv']

  it('returns a non-empty category list for every media type', () => {
    for (const t of ALL) expect(torznabCategoriesFor(t).length).toBeGreaterThan(0)
  })

  it('maps types to standard Torznab numbers', () => {
    expect(torznabCategoriesFor('anime')).toEqual([5070])
    expect(torznabCategoriesFor('manga')).toContain(7030)
    expect(torznabCategoriesFor('manga')).toContain(5070)
    expect(torznabCategoriesFor('movie')).toEqual([2000])
    expect(torznabCategoriesFor('tv')).toEqual([5000])
    expect(torznabCategoriesFor('game')).toEqual([4050])
    expect(torznabCategoriesFor('visual_novel')).toEqual([4050])
  })
})

describe('TORRENT_CATEGORY_OPTIONS', () => {
  it('leads with an "everything" option (empty cats = omit the param)', () => {
    expect(TORRENT_CATEGORY_OPTIONS[0].cats).toEqual([])
  })
})

describe('formatBytes', () => {
  it('renders an em dash for missing/nonsense sizes', () => {
    expect(formatBytes(null)).toBe('—')
    expect(formatBytes(0)).toBe('—')
    expect(formatBytes(-5)).toBe('—')
    expect(formatBytes(NaN)).toBe('—')
  })

  it('picks binary units with one decimal', () => {
    expect(formatBytes(512)).toBe('512 B')
    expect(formatBytes(1024)).toBe('1.0 KiB')
    expect(formatBytes(1536)).toBe('1.5 KiB')
    expect(formatBytes(123456789)).toBe('117.7 MiB')
    expect(formatBytes(4 * 1024 ** 3)).toBe('4.0 GiB')
    expect(formatBytes(2.5 * 1024 ** 4)).toBe('2.5 TiB')
  })
})
