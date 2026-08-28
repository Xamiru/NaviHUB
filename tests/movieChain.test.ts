import { describe, expect, it } from 'vitest'
import {
  buildMovieChainEdges,
  buildMovieChainQuestion,
  hintMovieChain,
  initialMovieChainState,
  movieChainConnectors,
  movieChainEndpointCounts,
  movieChainScore,
  shortestMovieChainPath,
  submitMovieChainTitle,
  undoMovieChain,
  type MovieChainCandidate
} from '../src/shared/movieChain'

function chainCandidates(): MovieChainCandidate[] {
  const titles = ['A', 'B', 'C', 'D', 'E']
  return titles.map((label, index) => {
    const people: MovieChainCandidate['people'] = []
    if (index > 0) {
      people.push({
        id: 100 + index,
        name: `Connector ${index}`,
        role: index % 2 === 0 ? 'director' : 'actor',
        characterName: index % 2 === 0 ? null : `Role ${index}`,
        billingOrder: index % 2 === 0 ? 99 : 0
      })
    }
    if (index < titles.length - 1) {
      people.push({
        id: 101 + index,
        name: `Connector ${index + 1}`,
        role: (index + 1) % 2 === 0 ? 'director' : 'actor',
        characterName: (index + 1) % 2 === 0 ? null : `Role ${index + 1}`,
        billingOrder: (index + 1) % 2 === 0 ? 99 : 0
      })
    }
    if (label === 'A' || label === 'E') {
      people.push({ id: 999, name: 'Background Extra', role: 'actor', billingOrder: 10 })
    }
    return {
      key: String(index + 1),
      label,
      aliases: [],
      imagePath: `media/${label}.jpg`,
      releaseYear: 2000 + index,
      mediaType: index % 2 ? 'tv' : 'movie',
      people
    }
  })
}

describe('Movie Chain', () => {
  it('uses top-ten actors, retains directors, and proves exact graph distance', () => {
    const candidates = chainCandidates()
    const edges = buildMovieChainEdges(candidates)
    expect(shortestMovieChainPath(edges, '1', '5')).toEqual(['1', '2', '3', '4', '5'])
    expect(edges.some((edge) =>
      edge.connectors.some((connector) => connector.name === 'Background Extra')
    )).toBe(false)
    expect(movieChainConnectors({ edges }, '2', '3')[0].name).toBe('Connector 2')
    expect(movieChainEndpointCounts(candidates, 'both')).toEqual({ easy: 3, normal: 2, hard: 1 })
  })

  it('selects deterministic endpoints at the requested difficulty', () => {
    const first = buildMovieChainQuestion(chainCandidates(), 7, 'both', 'hard')
    const second = buildMovieChainQuestion(chainCandidates(), 7, 'both', 'hard')
    expect(first).toEqual(second)
    expect(first?.optimalDistance).toBe(4)
    expect(first?.maxMoves).toBe(6)
  })

  it('handles invalid guesses, repeats, undo accounting, hints, and completion', () => {
    const question = buildMovieChainQuestion(chainCandidates(), 7, 'both', 'hard')!
    const shortest = shortestMovieChainPath(question.edges, question.start.key, question.target.key)!
    let state = initialMovieChainState(question)
    const disconnected = question.titles.find((title) =>
      title.key !== question.start.key &&
      movieChainConnectors(question, question.start.key, title.key).length === 0
    )!
    const bad = submitMovieChainTitle(question, state, disconnected.key)
    expect(bad.outcome).toBe('invalid')
    state = bad.state
    const repeated = submitMovieChainTitle(question, state, question.start.key)
    expect(repeated.outcome).toBe('repeated')
    state = repeated.state
    const hint = hintMovieChain(question, state)
    expect(hint.outcome).toBe('hint')
    expect(hint.key).toBe(shortest[1])
    expect(hintMovieChain(question, hint.state).state.hintsUsed).toBe(1)
    state = hint.state
    state = submitMovieChainTitle(question, state, shortest[1]).state
    const acceptedBeforeUndo = state.acceptedMoves
    state = undoMovieChain(state)
    expect(state.acceptedMoves).toBe(acceptedBeforeUndo)
    for (const key of shortest.slice(1)) state = submitMovieChainTitle(question, state, key).state
    expect(state.status).toBe('complete')
    expect(movieChainScore(state, question.optimalDistance)).toBe(700)
  })
})
