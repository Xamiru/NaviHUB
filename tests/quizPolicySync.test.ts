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
    ['character', 'accuracy'],
    ['va', 'accuracy'],
    ['synopsis', 'accuracy'],
    ['mangaPanel', 'accuracy'],
    ['imageReveal', 'points'],
    ['silhouette', 'accuracy'],
    ['connections', 'accuracy'],
    ['chronology', 'accuracy'],
    ['oddOneOut', 'accuracy'],
    ['higherLower', 'points'],
    ['songRelay', 'party'],
    ['tournament', 'tournament']
  ]

  it.each(central)('%s uses %s scoring', (kind, policy) => {
    expect(quizScorePolicy(kind)).toBe(policy)
  })

  it('keeps every consolidated challenge route registered in App', () => {
    const app = read('../src/renderer/src/App.tsx')
    for (const route of ['images', 'silhouette', 'connections', 'chronology', 'odd-one-out', 'higher-lower']) {
      expect(app).toContain(`path="/quiz/${route}"`)
    }
  })
})
