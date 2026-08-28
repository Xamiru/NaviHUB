import type {
  QuizMovieChainConnector,
  QuizMovieChainDifficulty,
  QuizMovieChainEdge,
  QuizMovieChainQuestion,
  QuizScreenMediaMode,
  QuizScreenTitle
} from './types'
import { seededRng } from './quizCore'
import { screenMediaMatches } from './libraryGrid'
import { shuffle } from './shuffle'

export interface MovieChainCandidate extends QuizScreenTitle {
  people: Array<{
    id: number
    name: string
    role: string
    characterName?: string | null
    billingOrder?: number | null
  }>
}

export interface MovieChainState {
  status: 'playing' | 'complete' | 'gaveUp'
  pathKeys: string[]
  acceptedMoves: number
  invalidGuesses: number
  hintsUsed: number
  hintedKey: string | null
}

export type MovieChainSubmitOutcome =
  | 'accepted'
  | 'complete'
  | 'invalid'
  | 'repeated'
  | 'moveLimit'

export const MOVIE_CHAIN_DISTANCE: Record<QuizMovieChainDifficulty, number> = {
  easy: 2,
  normal: 3,
  hard: 4
}

function eligibleRoles(item: MovieChainCandidate) {
  const people = new Map<number, { id: number; name: string; roles: Set<string> }>()
  for (const person of item.people) {
    const topActor =
      person.role === 'actor' &&
      person.billingOrder != null &&
      person.billingOrder >= 0 &&
      person.billingOrder < 10
    if (!topActor && person.role !== 'director') continue
    const found = people.get(person.id) ?? { id: person.id, name: person.name, roles: new Set() }
    if (person.role === 'director') found.roles.add('director')
    else if (person.characterName?.trim()) found.roles.add(person.characterName.trim())
    else found.roles.add('actor')
    people.set(person.id, found)
  }
  return people
}

export function buildMovieChainEdges(media: readonly MovieChainCandidate[]): QuizMovieChainEdge[] {
  const appearances = new Map<
    number,
    { name: string; titles: Array<{ key: string; roles: string[] }> }
  >()
  for (const item of media) {
    for (const person of eligibleRoles(item).values()) {
      const found = appearances.get(person.id) ?? { name: person.name, titles: [] }
      found.titles.push({ key: item.key, roles: [...person.roles] })
      appearances.set(person.id, found)
    }
  }
  const edges = new Map<string, QuizMovieChainEdge>()
  for (const [personId, appearance] of appearances) {
    for (let i = 0; i < appearance.titles.length; i++) {
      for (let j = i + 1; j < appearance.titles.length; j++) {
        const a = appearance.titles[i]
        const b = appearance.titles[j]
        const [left, right] = a.key.localeCompare(b.key) <= 0 ? [a, b] : [b, a]
        const key = `${left.key}:${right.key}`
        const edge = edges.get(key) ?? { leftKey: left.key, rightKey: right.key, connectors: [] }
        edge.connectors.push({
          personId,
          name: appearance.name,
          leftRoles: left.roles,
          rightRoles: right.roles
        })
        edges.set(key, edge)
      }
    }
  }
  return [...edges.values()].sort((a, b) =>
    a.leftKey.localeCompare(b.leftKey) || a.rightKey.localeCompare(b.rightKey)
  )
}

function adjacency(edges: readonly QuizMovieChainEdge[]): Map<string, string[]> {
  const map = new Map<string, string[]>()
  for (const edge of edges) {
    map.set(edge.leftKey, [...(map.get(edge.leftKey) ?? []), edge.rightKey])
    map.set(edge.rightKey, [...(map.get(edge.rightKey) ?? []), edge.leftKey])
  }
  return map
}

function endpointPairsAtDistance<T extends { key: string }>(
  media: readonly T[],
  edges: readonly QuizMovieChainEdge[],
  targetDistance: number
): Array<[T, T]> {
  const graph = adjacency(edges)
  const pairs: Array<[T, T]> = []
  for (let i = 0; i < media.length; i++) {
    const distances = new Map<string, number>([[media[i].key, 0]])
    const queue = [media[i].key]
    while (queue.length > 0) {
      const current = queue.shift()!
      const distance = distances.get(current)!
      if (distance >= targetDistance) continue
      for (const next of graph.get(current) ?? []) {
        if (distances.has(next)) continue
        distances.set(next, distance + 1)
        queue.push(next)
      }
    }
    for (let j = i + 1; j < media.length; j++) {
      if (distances.get(media[j].key) === targetDistance) pairs.push([media[i], media[j]])
    }
  }
  return pairs
}

export function shortestMovieChainPath(
  edges: readonly QuizMovieChainEdge[],
  startKey: string,
  targetKey: string,
  excludedKeys: readonly string[] = []
): string[] | null {
  if (startKey === targetKey) return [startKey]
  const blocked = new Set(excludedKeys)
  blocked.delete(startKey)
  blocked.delete(targetKey)
  const graph = adjacency(edges)
  const queue = [startKey]
  const previous = new Map<string, string | null>([[startKey, null]])
  while (queue.length > 0) {
    const current = queue.shift()!
    for (const next of graph.get(current) ?? []) {
      if (blocked.has(next) || previous.has(next)) continue
      previous.set(next, current)
      if (next === targetKey) {
        const path = [targetKey]
        let cursor: string | null = current
        while (cursor != null) {
          path.push(cursor)
          cursor = previous.get(cursor) ?? null
        }
        return path.reverse()
      }
      queue.push(next)
    }
  }
  return null
}

export function movieChainEndpointCount(
  candidates: readonly MovieChainCandidate[],
  mediaMode: QuizScreenMediaMode,
  difficulty: QuizMovieChainDifficulty
): number {
  const media = candidates.filter(
    (item) => item.imagePath.trim() && screenMediaMatches(mediaMode, item.mediaType)
  )
  const edges = buildMovieChainEdges(media)
  const distance = MOVIE_CHAIN_DISTANCE[difficulty]
  return endpointPairsAtDistance(media, edges, distance).length
}

export function movieChainEndpointCounts(
  candidates: readonly MovieChainCandidate[],
  mediaMode: QuizScreenMediaMode
): Record<QuizMovieChainDifficulty, number> {
  const media = candidates.filter(
    (item) => item.imagePath.trim() && screenMediaMatches(mediaMode, item.mediaType)
  )
  const graph = adjacency(buildMovieChainEdges(media))
  const counts: Record<QuizMovieChainDifficulty, number> = { easy: 0, normal: 0, hard: 0 }
  const difficultyByDistance = new Map<number, QuizMovieChainDifficulty>([
    [2, 'easy'],
    [3, 'normal'],
    [4, 'hard']
  ])
  for (let i = 0; i < media.length; i++) {
    const start = media[i].key
    const distances = new Map<string, number>([[start, 0]])
    const queue = [start]
    while (queue.length > 0) {
      const current = queue.shift()!
      const distance = distances.get(current)!
      if (distance >= 4) continue
      for (const next of graph.get(current) ?? []) {
        if (distances.has(next)) continue
        distances.set(next, distance + 1)
        queue.push(next)
      }
    }
    for (let j = i + 1; j < media.length; j++) {
      const difficulty = difficultyByDistance.get(distances.get(media[j].key) ?? -1)
      if (difficulty) counts[difficulty]++
    }
  }
  return counts
}

export function buildMovieChainQuestion(
  candidates: readonly MovieChainCandidate[],
  seed: string | number,
  mediaMode: QuizScreenMediaMode = 'both',
  difficulty: QuizMovieChainDifficulty = 'normal'
): QuizMovieChainQuestion | null {
  const rng = seededRng(seed)
  const media = candidates.filter(
    (item) => item.imagePath.trim() && screenMediaMatches(mediaMode, item.mediaType)
  )
  const edges = buildMovieChainEdges(media)
  const distance = MOVIE_CHAIN_DISTANCE[difficulty]
  const pairs = endpointPairsAtDistance(media, edges, distance)
  if (pairs.length === 0) return null
  const picked = shuffle(pairs, rng)[0]
  const [start, target] = rng() < 0.5 ? picked : [picked[1], picked[0]]
  const graph = adjacency(edges)
  const component = new Set<string>([start.key])
  const queue = [start.key]
  while (queue.length > 0) {
    for (const next of graph.get(queue.shift()!) ?? []) {
      if (component.has(next)) continue
      component.add(next)
      queue.push(next)
    }
  }
  const titles = media.filter((item) => component.has(item.key))
  const componentEdges = edges.filter(
    (edge) => component.has(edge.leftKey) && component.has(edge.rightKey)
  )
  return {
    id: `movie-chain-${difficulty}-${seed}`,
    kind: 'movieChain',
    prompt: `Connect ${start.label} to ${target.label}.`,
    choices: [],
    validKeys: [],
    start,
    target,
    titles,
    edges: componentEdges,
    difficulty,
    optimalDistance: distance,
    maxMoves: distance + 2
  }
}

export function movieChainConnectors(
  question: Pick<QuizMovieChainQuestion, 'edges'>,
  leftKey: string,
  rightKey: string
): QuizMovieChainConnector[] {
  const edge = question.edges.find(
    (candidate) =>
      (candidate.leftKey === leftKey && candidate.rightKey === rightKey) ||
      (candidate.leftKey === rightKey && candidate.rightKey === leftKey)
  )
  if (!edge) return []
  if (edge.leftKey === leftKey) return edge.connectors
  return edge.connectors.map((connector) => ({
    ...connector,
    leftRoles: connector.rightRoles,
    rightRoles: connector.leftRoles
  }))
}

export function initialMovieChainState(question: QuizMovieChainQuestion): MovieChainState {
  return {
    status: 'playing',
    pathKeys: [question.start.key],
    acceptedMoves: 0,
    invalidGuesses: 0,
    hintsUsed: 0,
    hintedKey: null
  }
}

export function movieChainScore(
  state: MovieChainState,
  optimalDistance: number
): number {
  if (state.status === 'gaveUp') return 0
  return Math.max(
    0,
    1000 -
      Math.max(0, state.acceptedMoves - optimalDistance) * 100 -
      state.invalidGuesses * 25 -
      state.hintsUsed * 150
  )
}

export function submitMovieChainTitle(
  question: QuizMovieChainQuestion,
  state: MovieChainState,
  key: string
): { state: MovieChainState; outcome: MovieChainSubmitOutcome } {
  if (state.status !== 'playing') return { state, outcome: 'invalid' }
  if (state.pathKeys.includes(key)) {
    return {
      state: { ...state, invalidGuesses: state.invalidGuesses + 1 },
      outcome: 'repeated'
    }
  }
  if (state.pathKeys.length - 1 >= question.maxMoves) {
    return { state, outcome: 'moveLimit' }
  }
  const current = state.pathKeys[state.pathKeys.length - 1]
  if (movieChainConnectors(question, current, key).length === 0) {
    return {
      state: { ...state, invalidGuesses: state.invalidGuesses + 1 },
      outcome: 'invalid'
    }
  }
  const complete = key === question.target.key
  return {
    state: {
      ...state,
      status: complete ? 'complete' : 'playing',
      pathKeys: [...state.pathKeys, key],
      acceptedMoves: state.acceptedMoves + 1,
      hintedKey: null
    },
    outcome: complete ? 'complete' : 'accepted'
  }
}

export function undoMovieChain(state: MovieChainState): MovieChainState {
  if (state.status !== 'playing' || state.pathKeys.length <= 1) return state
  return { ...state, pathKeys: state.pathKeys.slice(0, -1), hintedKey: null }
}

export function hintMovieChain(
  question: QuizMovieChainQuestion,
  state: MovieChainState
): { state: MovieChainState; key: string | null; outcome: 'hint' | 'undoRequired' } {
  if (state.hintedKey) return { state, key: state.hintedKey, outcome: 'hint' }
  const current = state.pathKeys[state.pathKeys.length - 1]
  const path = shortestMovieChainPath(
    question.edges,
    current,
    question.target.key,
    state.pathKeys.slice(0, -1)
  )
  const remaining = question.maxMoves - (state.pathKeys.length - 1)
  if (!path || path.length - 1 > remaining) return { state, key: null, outcome: 'undoRequired' }
  const key = path[1] ?? question.target.key
  return {
    state: { ...state, hintsUsed: state.hintsUsed + 1, hintedKey: key },
    key,
    outcome: 'hint'
  }
}
