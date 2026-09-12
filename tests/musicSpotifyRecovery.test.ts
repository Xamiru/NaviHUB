import { describe, expect, it, vi } from 'vitest'
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' }, dialog: {}, BrowserWindow: {} }))
vi.mock('../src/main/db/connection', () => ({ getSqlite: vi.fn() }))
vi.mock('../src/main/music', () => ({ indexMusicFiles: vi.fn() }))
import { parseAudioCandidates, youtubeSourceUrl } from '../src/main/musicSpotifyRecovery'

describe('manual audio sources', () => {
  it('accepts only individual HTTPS YouTube video links', () => {
    expect(youtubeSourceUrl('https://youtu.be/abcdefghijk?si=ignored')).toBe('https://www.youtube.com/watch?v=abcdefghijk')
    expect(youtubeSourceUrl('https://music.youtube.com/watch?v=abcdefghijk&list=ignored')).toBe('https://www.youtube.com/watch?v=abcdefghijk')
    for (const url of ['https://youtube.com/playlist?list=abc', 'https://youtube.com/@channel', 'https://other.com/watch?v=abcdefghijk', '--help']) {
      expect(() => youtubeSourceUrl(url)).toThrow()
    }
  })
  it('retains source title/channel/duration and ignores malformed search rows', () => {
    const rows = parseAudioCandidates([
      JSON.stringify({ id: 'abcdefghijk', title: 'Live version', channel: 'Artist official', duration: 220 }),
      'invalid', JSON.stringify({ url: 'https://other.com/audio', title: 'Wrong host' })
    ].join('\n'))
    expect(rows).toEqual([{ url: 'https://www.youtube.com/watch?v=abcdefghijk', title: 'Live version', channel: 'Artist official', duration: 220 }])
  })
})
