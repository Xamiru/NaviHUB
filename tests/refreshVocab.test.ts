import { describe, expect, it } from 'vitest'
import {
  MISSING_SQL,
  REFRESHABLE_SOURCES,
  REFRESH_ASPECTS,
  aspectsForType,
  aspectsForTypes,
  isRefreshableSource,
  missingClause
} from '../src/shared/refresh'
import type { MediaType } from '../src/shared/types'

// The Library Refresh vocabulary. Aspect keys are FROZEN — they ride IPC
// payloads and the remembered selection — and the type matrix is what stops the
// UI offering a tick the run could never honour (a banner on a VNDB row).

describe('the aspect catalogue', () => {
  it('has unique keys, a label and at least one type each', () => {
    const keys = REFRESH_ASPECTS.map((a) => a.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const a of REFRESH_ASPECTS) {
      expect(a.label.length).toBeGreaterThan(0)
      expect(a.hint.length).toBeGreaterThan(0)
      expect(a.types.length).toBeGreaterThan(0)
    }
  })

  it('keeps banner to the sources that have one, and episodes to TV', () => {
    const banner = REFRESH_ASPECTS.find((a) => a.key === 'banner')!
    // VNDB, Steam and Open Library write no banner_path at all.
    expect(banner.types).toEqual(['anime', 'manga', 'movie', 'tv'])
    expect(banner.types).not.toContain('visual_novel')
    expect(banner.types).not.toContain('game')
    expect(banner.types).not.toContain('book')

    expect(REFRESH_ASPECTS.find((a) => a.key === 'episodes')!.types).toEqual(['tv'])
  })

  it('offers cover and text everywhere', () => {
    const all: MediaType[] = ['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv', 'book']
    for (const key of ['cover', 'text'] as const) {
      expect(REFRESH_ASPECTS.find((a) => a.key === key)!.types.sort()).toEqual([...all].sort())
    }
  })
})

describe('aspectsForTypes', () => {
  it('offers an aspect when ANY selected type can serve it', () => {
    expect(aspectsForTypes(['tv'])).toContain('episodes')
    expect(aspectsForTypes(['tv', 'game'])).toContain('episodes')
  })

  it('drops aspects no selected type can serve', () => {
    expect(aspectsForTypes(['game'])).not.toContain('episodes')
    expect(aspectsForTypes(['game'])).not.toContain('banner')
    expect(aspectsForTypes(['book'])).toEqual(['cover', 'text'])
  })

  it('offers nothing for an empty selection', () => {
    expect(aspectsForTypes([])).toEqual([])
  })
})

describe('aspectsForType', () => {
  // The runner narrows the request per title, so asking for a banner on a VN is
  // a no-op rather than an UPDATE with no columns.
  it('narrows a request to what one type can serve', () => {
    expect(aspectsForType(['cover', 'banner', 'episodes', 'text'], 'visual_novel')).toEqual([
      'cover',
      'text'
    ])
    expect(aspectsForType(['cover', 'banner', 'episodes'], 'tv')).toEqual([
      'cover',
      'banner',
      'episodes'
    ])
    expect(aspectsForType(['banner'], 'book')).toEqual([])
  })

  it('preserves the caller order', () => {
    expect(aspectsForType(['text', 'cover'], 'anime')).toEqual(['text', 'cover'])
  })
})

describe('isRefreshableSource', () => {
  it('accepts the five live importers', () => {
    for (const s of REFRESHABLE_SOURCES) expect(isRefreshableSource(s)).toBe(true)
  })

  it('rejects dead and absent sources', () => {
    // RAWG's API is gone; those rows can never be refreshed, and the preview
    // counts them as unsupported rather than pretending.
    for (const s of ['rawg', 'igdb', '', null, undefined]) {
      expect(isRefreshableSource(s)).toBe(false)
    }
  })
})

describe('missingClause', () => {
  it('ORs the chosen aspects — one gap is worth the request', () => {
    const sql = missingClause(['cover', 'banner'])
    expect(sql).toBe(`(${MISSING_SQL.cover} OR ${MISSING_SQL.banner})`)
  })

  it('is a no-op filter when nothing is chosen', () => {
    expect(missingClause([])).toBe('1=1')
  })

  it('tests episodes by absence of any catalogue row', () => {
    expect(MISSING_SQL.episodes).toContain('tv_episode')
    expect(MISSING_SQL.episodes).toContain('NOT EXISTS')
  })
})
