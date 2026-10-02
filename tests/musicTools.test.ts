import { describe, expect, it, vi } from 'vitest'
vi.mock('../src/main/repos/settingsRepo', () => ({ get: (key: string) => ({
  'spotdl.cookieFile': 'C:\\Users\\Name Here\\cookies.txt', 'music.downloadWorkers': '99'
} as Record<string, string>)[key] }))
import { musicFailure, musicToolOptions, musicYtDlpArgs, YOUTUBE_LIMIT } from '../src/main/musicTools'
describe('music tool policy', () => {
  it('bounds concurrency and gives preview/direct downloads explicit configuration', () => {
    expect(musicToolOptions().workers).toBe(4)
    expect(musicYtDlpArgs()).toContain('--ignore-config')
    expect(musicYtDlpArgs()).toContain('C:\\Users\\Name Here\\cookies.txt')
  })
  it('keeps the actual failure and tool visible without signed query values', () => {
    expect(musicFailure('Extraction', 'embedded yt-dlp', 'AudioProviderError: Requested format is not available')).toContain('requested audio format is unavailable')
    expect(musicFailure('Transfer', 'yt-dlp', 'https://a.googlevideo.com/videoplayback?sig=never-expose-this')).not.toContain('never-expose-this')
  })
  it('names the failures a different source or a later retry can fix', () => {
    const reason = (raw: string) => musicFailure('Transfer', 'yt-dlp', raw).split('. ')[0]
    expect(reason('ERROR: [youtube] abc: Sign in to confirm your age. This video may be inappropriate for some users.')).toContain('age-restricted')
    expect(reason("ERROR: [youtube] abc: Sign in to confirm you're not a bot")).toContain('bot verification')
    expect(reason('ERROR: [youtube] abc: Join this channel to get access to members-only content like this video')).toContain('members only')
    expect(reason('ERROR: unable to download video data: HTTP Error 403: Forbidden')).toContain('refused the download')
    expect(YOUTUBE_LIMIT.test(musicFailure('Transfer', 'yt-dlp', 'ERROR: unable to download video data: HTTP Error 403: Forbidden'))).toBe(false)
    expect(reason('ERROR: HTTP Error 429: Too Many Requests')).toContain('limiting requests')
    expect(reason("ERROR: [youtube] abc: Video unavailable. This content isn't available, try again later. The current session has been rate-limited by YouTube for up to an hour."))
      .toContain('limiting requests')
    expect(reason('ERROR: [youtube] abc: Video unavailable. This video has been removed by the uploader')).toContain('was removed')
    expect(reason('ERROR: [youtube] abc: Private video')).toContain('unavailable')
    expect(musicFailure('Extraction', 'standalone yt-dlp', 'Extraction: no compatible native audio is available'))
      .toBe('Extraction (standalone yt-dlp): The source has no compatible native audio; choose another source. no compatible native audio is available')
  })
})
