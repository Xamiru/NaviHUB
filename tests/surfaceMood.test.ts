import { describe, expect, it } from 'vitest'
import { surfaceMoodForPath } from '../src/renderer/src/lib/surfaceMood'

describe('wired surface moods', () => {
  it.each([
    ['/', 'cinematic'],
    ['/anime', 'cinematic'],
    ['/games/achievements', 'cinematic'],
    ['/music/album/12', 'cinematic'],
    ['/japanese/roadmap', 'quiet'],
    ['/english/writing', 'quiet'],
    ['/programming/sql', 'quiet'],
    ['/settings', 'quiet'],
    ['/tasks/logs', 'quiet'],
    ['/quiz/song', 'standard'],
    ['/gacha/fgo', 'standard'],
    ['/search', 'standard'],
    ['/watch/file/12', 'immersive'],
    ['/manga/8/read/13', 'immersive'],
    ['/read/book/token', 'immersive']
  ] as const)('classifies %s as %s', (pathname, mood) => {
    expect(surfaceMoodForPath(pathname)).toBe(mood)
  })
})
