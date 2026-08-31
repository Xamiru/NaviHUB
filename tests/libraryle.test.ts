import { describe, expect, it } from 'vitest'
import {
  buildLibraryleQuestion,
  libraryleFeedback,
  libraryleScore,
  libraryleTargetCount,
  type LibraryleCandidate
} from '../src/shared/libraryle'

function candidates(): LibraryleCandidate[] {
  return Array.from({ length: 10 }, (_, index) => ({
    key: String(index + 1),
    label: `Title ${index + 1}`,
    aliases: [],
    imagePath: `media/${index + 1}.jpg`,
    releaseYear: 1990 + index,
    mediaType: index % 2 ? 'tv' : 'movie',
    genres: [{ key: index < 2 ? 'drama' : `genre-${index}`, label: index < 2 ? 'Drama' : `Genre ${index}` }],
    companies: [{ key: index < 2 ? 'company' : `company-${index}`, label: index < 2 ? 'Company' : `Company ${index}` }],
    directors: [{ key: index < 2 ? 'director' : `director-${index}`, label: index < 2 ? 'Director' : `Director ${index}` }],
    cast: [{ key: index < 2 ? 'actor' : `actor-${index}`, label: index < 2 ? 'Actor' : `Actor ${index}` }]
  }))
}

describe('Libraryle', () => {
  it('deals a deterministic covered target and respects media selection', () => {
    expect(buildLibraryleQuestion(candidates(), 42, 'both')).toEqual(
      buildLibraryleQuestion(candidates(), 42, 'both')
    )
    const movieOnly = buildLibraryleQuestion(candidates(), 42, 'movie')
    expect(movieOnly).toBeNull()
    expect(libraryleTargetCount(candidates(), 'both')).toBe(10)
  })

  it('reports exact, partial, near-year, and direction feedback', () => {
    const [target, guess] = candidates()
    const feedback = libraryleFeedback(target, guess)
    expect(feedback.year).toEqual({ match: 'near', direction: 'earlier' })
    expect(feedback.mediaType).toBe('none')
    expect(feedback.genres).toEqual({ match: 'exact', shared: ['Drama'] })
    expect(feedback.companies.match).toBe('exact')
    expect(feedback.directors.match).toBe('exact')
    expect(feedback.cast.match).toBe('exact')
  })

  it('scores the first through eighth guesses and failures', () => {
    expect(libraryleScore(true, 1)).toBe(1000)
    expect(libraryleScore(true, 8)).toBe(300)
    expect(libraryleScore(false, 1)).toBe(0)
  })
})
