import { describe, expect, it } from 'vitest'
import { assessMusicSource, rankMusicSources } from '../src/shared/musicSourceMatch'
const expected = { title: 'Hey Jude - Remaster 2005', artist: 'The Beatles', duration: 431 }
const source = { title: 'Hey Jude', artist: 'The Beatles', channel: 'The Beatles - Topic', duration: 431 }
describe('independent source evidence', () => {
  it('accepts original/remaster equivalence without accepting recording variants', () => {
    expect(assessMusicSource(expected, source).strong).toBe(true)
    for (const suffix of ['Live', 'Remix', 'Acoustic', 'Radio Edit', 'Instrumental']) {
      expect(assessMusicSource(expected, { ...source, title: `Hey Jude ${suffix}` }).strong).toBe(false)
    }
  })
  it('does not lose recording variants expressed only by the release', () => {
    expect(assessMusicSource({ ...expected, albumTitle: 'Live at the Arena' }, source).strong).toBe(false)
    expect(assessMusicSource(expected, { ...source, albumTitle: 'Live at the Arena' }).strong).toBe(false)
  })
  it('requires independent artist and duration evidence', () => {
    expect(assessMusicSource(expected, { ...source, artist: null, channel: 'Someone else' }).strong).toBe(false)
    expect(assessMusicSource(expected, { ...source, duration: null }).strong).toBe(false)
    expect(assessMusicSource(expected, { ...source, duration: 500 }).strong).toBe(false)
  })
  it('ranks compatible source metadata ahead of popularity-free mismatches', () => {
    const result = rankMusicSources(expected, [
      { url: 'live', title: 'Hey Jude Live', channel: 'The Beatles - Topic', duration: 431 },
      { url: 'studio', title: 'Hey Jude', channel: 'The Beatles - Topic', duration: 431 }
    ])
    expect(result[0].url).toBe('studio')
    expect(result[1].assessment.reasons).toContain('Title or recording version differs')
  })
})
