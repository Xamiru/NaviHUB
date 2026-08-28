import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'
import { quizScorePolicy } from '../src/shared/quizCore'
import type { QuizKind } from '../src/shared/types'

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

describe('central quiz kinds and score policies stay synchronized', () => {
  const central: Array<[QuizKind, ReturnType<typeof quizScorePolicy>]> = [
    ['song', 'accuracy'],
    ['songArcade', 'points'],
    ['songReverse', 'accuracy'],
    ['guessTrackTheme', 'points'],
    ['guessTrackMusic', 'points'],
    ['character', 'accuracy'],
    ['cast', 'accuracy'],
    ['va', 'accuracy'],
    ['synopsis', 'accuracy'],
    ['mangaPanel', 'accuracy'],
    ['imageReveal', 'points'],
    ['silhouette', 'accuracy'],
    ['connections', 'accuracy'],
    ['chronology', 'accuracy'],
    ['higherLower', 'points'],
    ['libraryGrid', 'points'],
    ['movieChainEasy', 'points'],
    ['movieChainNormal', 'points'],
    ['movieChainHard', 'points'],
    ['songRelay', 'party'],
    ['tournament', 'tournament']
  ]

  it.each(central)('%s uses %s scoring', (kind, policy) => {
    expect(quizScorePolicy(kind)).toBe(policy)
  })

  it('keeps every consolidated challenge route registered in App', () => {
    const app = read('../src/renderer/src/App.tsx')
    for (const route of ['images', 'silhouette', 'connections', 'chronology', 'higher-lower']) {
      expect(app).toContain(`path="/quiz/${route}"`)
    }
  })

  it('keeps Guess the Track registered as a separate audio route', () => {
    const app = read('../src/renderer/src/App.tsx')
    const hub = read('../src/renderer/src/pages/QuizLandingPage.tsx')
    expect(app).toContain('path="/quiz/guess-track"')
    expect(hub).toContain("to: '/quiz/guess-track'")
  })

  it('keeps both screen puzzles registered and visible on the hub', () => {
    const app = read('../src/renderer/src/App.tsx')
    const hub = read('../src/renderer/src/pages/QuizLandingPage.tsx')
    for (const route of ['library-grid', 'movie-chain']) {
      expect(app).toContain(`path="/quiz/${route}"`)
      expect(hub).toContain(`to: '/quiz/${route}'`)
    }
  })
})
