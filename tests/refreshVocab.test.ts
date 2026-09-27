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
import type { RefreshAspect } from '../src/shared/refresh'
import type { MediaType } from '../src/shared/types'

// The Library Refresh vocabulary. Aspect keys are FROZEN — they ride IPC
// payloads and the remembered selection — and the type matrix is what stops the
// UI offering a tick the run could never honour (episodes on a VNDB row).

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

  it('keeps episodes to TV and theme songs to anime', () => {
    expect(REFRESH_ASPECTS.find((a) => a.key === 'episodes')!.types).toEqual(['tv'])
    expect(REFRESH_ASPECTS.find((a) => a.key === 'themes')!.types).toEqual(['anime'])
  })

  it('offers cover, text and full re-import everywhere', () => {
    const all: MediaType[] = ['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv', 'book']
    for (const key of ['cover', 'text', 'full'] as const) {
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
    expect(aspectsForTypes(['book'])).toEqual(['cover', 'text', 'full'])
  })

  it('offers nothing for an empty selection', () => {
    expect(aspectsForTypes([])).toEqual([])
  })
})

describe('aspectsForType', () => {
  // The runner narrows the request per title, so asking for episodes on a VN is
  // a no-op rather than an UPDATE with no columns.
  it('narrows a request to what one type can serve', () => {
    expect(aspectsForType(['cover', 'themes', 'episodes', 'text'], 'visual_novel')).toEqual([
      'cover',
      'text'
    ])
    expect(aspectsForType(['cover', 'themes', 'episodes'], 'tv')).toEqual(['cover', 'episodes'])
    expect(aspectsForType(['episodes'], 'book')).toEqual([])
  })

  it('preserves the caller order', () => {
    expect(aspectsForType(['text', 'cover'], 'anime')).toEqual(['text', 'cover'])
  })
})

describe('isRefreshableSource', () => {
  it('accepts the five live importers and the offline catalog', () => {
    for (const s of REFRESHABLE_SOURCES) expect(isRefreshableSource(s)).toBe(true)
    // RAWG's API is gone, but 'rawg' rows refresh from the local catalog.
    expect(isRefreshableSource('rawg')).toBe(true)
  })

  it('rejects dead and absent sources', () => {
    // IGDB is unusable for this user; the preview counts those rows as
    // unsupported rather than pretending.
    for (const s of ['igdb', '', null, undefined]) {
      expect(isRefreshableSource(s)).toBe(false)
    }
  })
})

describe('missingClause', () => {
  it('ORs the chosen aspects — one gap is worth the request', () => {
    const sql = missingClause(['cover', 'text'])
    expect(sql).toBe(`(${MISSING_SQL.cover} OR ${MISSING_SQL.text})`)
  })

  it('ignores the retired banner key a stale renderer can still send', () => {
    expect(missingClause(['cover', 'banner' as RefreshAspect])).toBe(`(${MISSING_SQL.cover})`)
  })

  it('is a no-op filter when nothing is chosen', () => {
    expect(missingClause([])).toBe('1=1')
  })

  it('tests episodes by absence of any catalogue row', () => {
    expect(MISSING_SQL.episodes).toContain('tv_episode')
    expect(MISSING_SQL.episodes).toContain('NOT EXISTS')
  })

  it('tests anime themes by absence of any local song row', () => {
    expect(MISSING_SQL.themes).toContain('theme_song')
    expect(MISSING_SQL.themes).toContain('NOT EXISTS')
  })
})
