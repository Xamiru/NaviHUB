import { describe, expect, it } from 'vitest'
import { MEDIA_GUIDES, matchGuide } from '../src/shared/guides'
import type { MediaItem } from '../src/shared/types'
describe('cross-media guide matching', () => {
  it('matches identically named novels and anime only within their media type', () => {
    const entries = MEDIA_GUIDES[0].entries
    const items = [
      { id: 1, title: 'STEINS;GATE', mediaType: 'visual_novel' },
      { id: 2, title: 'Steins;Gate', mediaType: 'anime' },
      { id: 3, title: 'Chaos;Child Extra', mediaType: 'visual_novel' }
    ] as MediaItem[]
    const matches = matchGuide(entries, items)
    expect(matches.get('sa-sg-vn')?.id).toBe(1)
    expect(matches.get('sa-sg-anime')?.id).toBe(2)
    expect(matches.has('sa-cc-vn')).toBe(false)
  })
  it('keeps stable unique keys and sources, with adaptations outside core completion', () => {
    const all = MEDIA_GUIDES.flatMap((g) => g.entries)
    expect(new Set(all.map((e) => e.id)).size).toBe(all.length)
    expect(all.every((e) => new URL(e.source).protocol === 'https:')).toBe(true)
    expect(all.filter((e) => e.mediaType === 'anime').every((e) => e.optional)).toBe(true)
  })
})
