import { beforeEach, describe, expect, it } from 'vitest'
import type { VideoAudioTrack } from '../../src/shared/types'
import {
  applyAudio,
  audioOptions,
  initialAudio,
  loadAudioChoice,
  mediaAudioTracks,
  saveAudioChoice,
  type MediaAudioTrack
} from '../../src/renderer/src/lib/videoAudio'

const media = (...langs: string[]): MediaAudioTrack[] =>
  langs.map((language, i) => ({ enabled: i === 0, label: '', language }))

const probe = (
  lang: string,
  over: Partial<VideoAudioTrack> = {}
): VideoAudioTrack => ({
  index: 1,
  label: `${lang.toUpperCase()} (aac)`,
  lang,
  codec: 'aac',
  channels: 2,
  isDefault: false,
  playable: true,
  ...over
})

describe('audio track options', () => {
  beforeEach(() => localStorage.clear())

  it('reads no list when Chromium does not expose audioTracks', () => {
    expect(mediaAudioTracks({} as HTMLVideoElement)).toBeNull()
    expect(mediaAudioTracks(null)).toBeNull()
    const el = { audioTracks: { length: 2, 0: media('en')[0], 1: media('x', 'ja')[1] } }
    expect(mediaAudioTracks(el as unknown as HTMLVideoElement)?.map((t) => t.language)).toEqual(['en', 'ja'])
  })

  it('pairs element tracks with the probe by position and labels channels', () => {
    const opts = audioOptions(media('en', 'ja'), [
      probe('eng', { label: 'English 5.1', channels: 6, playable: false }),
      probe('jpn', { isDefault: true })
    ])
    expect(opts).toEqual([
      { label: 'English 5.1 · 5.1', lang: 'eng', playable: false, judged: false },
      { label: 'JPN (aac) · 2.0', lang: 'jpn', playable: true, judged: true }
    ])
  })

  it('falls back to the element labels when the counts disagree', () => {
    const opts = audioOptions(media('en', 'ja'), [probe('jpn')])
    expect(opts.map((o) => [o.label, o.playable])).toEqual([
      ['EN', true],
      ['JA', true]
    ])
  })

  it('starts on the saved choice, then the judged track, never an unplayable one', () => {
    const opts = audioOptions(media('en', 'ja', 'en'), [
      probe('eng', { label: 'English' }),
      probe('jpn', { isDefault: true }),
      probe('eng', { label: 'Commentary' })
    ])
    expect(initialAudio(opts, null, 0)).toBe(1)
    expect(initialAudio(opts, { lang: 'eng', label: 'Commentary · 2.0' }, 0)).toBe(2)
    // A renamed track still matches by language.
    expect(initialAudio(opts, { lang: 'eng', label: 'Gone' }, 1)).toBe(0)

    const dts = audioOptions(media('en', 'ja'), [
      probe('eng', { playable: false }),
      probe('jpn', { playable: true })
    ])
    expect(initialAudio(dts, { lang: 'eng', label: 'ENG (aac) · 2.0' }, 0)).toBe(1)
  })

  it('enables exactly one track', () => {
    const tracks = media('en', 'ja', 'de')
    applyAudio(tracks, 2)
    expect(tracks.map((t) => t.enabled)).toEqual([false, false, true])
  })

  it('remembers a choice per show and ignores corrupt storage', () => {
    saveAudioChoice('media:12', { lang: 'jpn', label: 'Japanese' })
    expect(loadAudioChoice('media:12')).toEqual({ lang: 'jpn', label: 'Japanese' })
    expect(loadAudioChoice('media:13')).toBeNull()
    localStorage.setItem('video.audioChoices', '{broken')
    expect(loadAudioChoice('media:12')).toBeNull()
  })
})
