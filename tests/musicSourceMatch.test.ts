import { describe, expect, it } from 'vitest'
import { assessMusicSource, rankMusicSources, recordingVariantSignature, titleAliases } from '../src/shared/musicSourceMatch'
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
  it('accepts the primary artist as one member of a joined collaboration credit', () => {
    expect(assessMusicSource(expected, { ...source, artist: 'The Beatles, Billy Preston' }).strong).toBe(true)
    expect(assessMusicSource(expected, { ...source, artist: 'The Beatles Tribute Band' }).strong).toBe(false)
  })
  it('recognises official uploads from an artist channel without trusting fan re-uploads', () => {
    const song = { title: 'Mon fol amour', artist: 'Indila', duration: 247 }
    expect(assessMusicSource(song, { title: 'Indila - Mon Fol Amour (Clip Officiel)', artist: null, channel: 'IndilaMusic', duration: 253 }).strong).toBe(true)
    expect(assessMusicSource(song, { title: 'Indila - Mon fol amour', artist: null, channel: 'IndilaVEVO', duration: 247 }).strong).toBe(true)
    expect(assessMusicSource(song, { title: 'Indila- Mon fol amour', artist: null, channel: 'Kristina Rožman', duration: 253 }).reasons)
      .toEqual(['Artist identity needs checking'])
    expect(assessMusicSource(song, { title: 'Indila - Mon fol amour (Lyrics)', artist: null, channel: 'IndilaMusic', duration: 247 }).strong).toBe(false)
  })
  it('requires independent artist and duration evidence', () => {
    expect(assessMusicSource(expected, { ...source, artist: null, channel: 'Someone else' }).strong).toBe(false)
    expect(assessMusicSource(expected, { ...source, duration: null }).strong).toBe(false)
    expect(assessMusicSource(expected, { ...source, duration: 500 }).strong).toBe(false)
  })
  it('accepts either half of a native title paired with its romanization or translation', () => {
    const gurenge = { title: '紅蓮華', artist: 'LiSA', duration: 238 }
    const catalogue = { title: '紅蓮華 - Gurenge', artist: 'LiSA', channel: 'LiSA', duration: 238 }
    expect(assessMusicSource(gurenge, catalogue).strong).toBe(true)
    expect(assessMusicSource({ ...gurenge, title: 'Gurenge' }, catalogue).strong).toBe(true)
    expect(assessMusicSource({ title: 'Through the Night', artist: 'IU', duration: 254 },
      { title: 'Through the Night (밤편지)', artist: 'IU', channel: 'IU', duration: 254 }).strong).toBe(true)
    expect(assessMusicSource({ title: 'ピースサイン - Peace Sign', artist: 'Kenshi Yonezu', duration: 238 },
      { title: 'ピースサイン', artist: 'Kenshi Yonezu', channel: '', duration: 238 }).strong).toBe(true)
    // Version wording is never a translation.
    expect(titleAliases('紅蓮華 - TV Size')).toEqual(['紅蓮華 - TV Size'])
    expect(titleAliases('紅蓮華 (From THE FIRST TAKE)')).toEqual(['紅蓮華 (From THE FIRST TAKE)'])
    expect(titleAliases('Zenzenzense - movie ver.')).toEqual(['Zenzenzense - movie ver.'])
    expect(titleAliases('テレキャスター・ストライプ - 全知全能 ver.')).toEqual(['テレキャスター・ストライプ - 全知全能 ver.'])
    expect(assessMusicSource(gurenge, { ...catalogue, title: '紅蓮華 -Instrumental- - Gurenge (Instrumental)' }).strong).toBe(false)
  })
  it('compares artist credits across spelling conventions without accepting a different act', () => {
    const song = (artist: string) => ({ title: 'Song', artist, duration: 200 })
    const credit = (artist: string) => ({ title: 'Song', artist, channel: '', duration: 200 })
    expect(assessMusicSource(song('Simon & Garfunkel'), credit('Simon and Garfunkel')).strong).toBe(true)
    expect(assessMusicSource(song('Beyoncé'), credit('Beyonce')).strong).toBe(true)
    expect(assessMusicSource(song('The Beatles'), credit('Beatles')).strong).toBe(true)
    expect(assessMusicSource(song('PornoGraffitti'), credit('Porno Graffitti')).strong).toBe(true)
    expect(assessMusicSource(song('Sawano Hiroyuki'), credit('Hiroyuki Sawano')).strong).toBe(true)
    expect(assessMusicSource(song('バンド'), credit('ハンド')).strong).toBe(false)
    expect(assessMusicSource(song('Sawano Hiroyuki'), credit('Hiroyuki Sawano Tribute')).strong).toBe(false)
  })
  it('treats equivalent version wording as one recording', () => {
    expect(assessMusicSource({ title: "(I Can't Get No) Satisfaction - Mono Version", artist: 'The Rolling Stones', duration: 223 },
      { title: "(I Can't Get No) Satisfaction (Mono)", artist: 'The Rolling Stones', channel: '', duration: 223 }).strong).toBe(true)
    expect(assessMusicSource({ title: 'Strobe - Original Mix', artist: 'deadmau5', duration: 637 },
      { title: 'Strobe', artist: 'deadmau5', channel: '', duration: 637 }).strong).toBe(true)
  })
  it('marks every track of a release named live, since a live album cannot be told from its title', () => {
    expect(recordingVariantSignature('The Boys Are Back in Town', 'Live and Dangerous')).toBe('live')
    expect(recordingVariantSignature('Violet', 'Live Through This')).toBe('live')
    expect(recordingVariantSignature('Violet', 'Live at Reading')).toBe('live')
    expect(recordingVariantSignature('Violet', 'Live')).toBe('live')
    expect(recordingVariantSignature('Violet', 'Greatest Hits (Live)')).toBe('live')
    expect(recordingVariantSignature('Violet', 'MTV Unplugged')).toBe('acoustic')
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
