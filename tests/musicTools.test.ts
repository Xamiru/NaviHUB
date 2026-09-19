import { describe, expect, it, vi } from 'vitest'
vi.mock('../src/main/repos/settingsRepo', () => ({ get: (key: string) => ({
  'spotdl.cookieFile': 'C:\\Users\\Name Here\\cookies.txt', 'music.downloadWorkers': '99'
} as Record<string, string>)[key] }))
import { musicFailure, musicToolOptions, musicYtDlpArgs, spotdlYtDlpOptions } from '../src/main/musicTools'
describe('music tool policy', () => {
  it('bounds concurrency and gives preview/direct downloads explicit configuration', () => {
    expect(musicToolOptions().workers).toBe(4)
    expect(musicYtDlpArgs()).toContain('--ignore-config')
    expect(musicYtDlpArgs()).toContain('C:\\Users\\Name Here\\cookies.txt')
    expect(spotdlYtDlpOptions()).toContain("'C:\\Users\\Name Here\\cookies.txt'")
    expect(spotdlYtDlpOptions()).not.toContain('--ignore-config')
  })
  it('keeps the actual failure and tool visible without signed query values', () => {
    expect(musicFailure('Extraction', 'embedded yt-dlp', 'AudioProviderError: Requested format is not available')).toContain('requested audio format is unavailable')
    expect(musicFailure('Transfer', 'yt-dlp', 'https://a.googlevideo.com/videoplayback?sig=never-expose-this')).not.toContain('never-expose-this')
  })
})
