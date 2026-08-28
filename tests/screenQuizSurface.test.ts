import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (relative: string): string =>
  readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8')

describe('Library Grid and Movie Chain renderer contracts', () => {
  const grid = read('../src/renderer/src/pages/LibraryGridPage.tsx')
  const chain = read('../src/renderer/src/pages/MovieChainPage.tsx')
  const autocomplete = read('../src/renderer/src/components/quiz/QuizTitleAutocomplete.tsx')
  const party = read('../src/renderer/src/pages/PartyQuizPage.tsx')
  const hub = read('../src/renderer/src/pages/QuizLandingPage.tsx')

  it('persists setup scope and media selection and carries the spoiler warning', () => {
    for (const source of [grid, chain]) {
      expect(source).toContain('usePersistedState<QuizConsumptionScope>')
      expect(source).toContain('usePersistedState<QuizScreenMediaMode>')
      expect(source).toContain('Includes in-progress or unseen titles and may contain spoilers.')
    }
  })

  it('keeps title selection keyboard-accessible', () => {
    expect(autocomplete).toContain('role="combobox"')
    expect(autocomplete).toContain("event.key === 'ArrowDown'")
    expect(autocomplete).toContain("event.key === 'ArrowUp'")
    expect(autocomplete).toContain("event.key === 'Enter'")
    expect(autocomplete).toContain("event.key === 'Escape'")
  })

  it('keeps the games solo-only and uses honest result save states', () => {
    expect(party).toContain("Exclude<QuizChallengeKind, 'libraryGrid' | 'movieChain'>")
    for (const source of [grid, chain]) {
      expect(source).toContain("playMode: 'solo' as const")
      expect(source).toContain('Result not saved')
      expect(source).toContain('Retry save')
    }
  })

  it('only offers Random Challenge when the fixed Both defaults are buildable', () => {
    expect(hub).toContain("game.to === '/quiz/library-grid'")
    expect(hub).toContain("game.to === '/quiz/movie-chain'")
    expect(hub).toContain('?.movieChain.normal')
  })
})
