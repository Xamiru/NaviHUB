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
  const link = (from: string, to: string): void => {
    const neighbours = map.get(from)
    if (neighbours) neighbours.push(to)
    else map.set(from, [to])
  }
  for (const edge of edges) {
    link(edge.leftKey, edge.rightKey)
    link(edge.rightKey, edge.leftKey)
  }
  return map
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
  for (let head = 0; head < queue.length; head++) {
    const current = queue[head]
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
  return movieChainEndpointCounts(candidates, mediaMode)[difficulty]
}

export function movieChainEndpointCounts(
  candidates: readonly MovieChainCandidate[],
  mediaMode: QuizScreenMediaMode
): Record<QuizMovieChainDifficulty, number> {
  const media = candidates.filter(
    (item) => item.imagePath.trim() && screenMediaMatches(mediaMode, item.mediaType)
  )
  const position = new Map(media.map((item, index) => [item.key, index]))
  const neighbours: number[][] = media.map(() => [])
  for (const edge of buildMovieChainEdges(media)) {
    const left = position.get(edge.leftKey)
    const right = position.get(edge.rightKey)
    if (left == null || right == null) continue
    neighbours[left].push(right)
    neighbours[right].push(left)
  }
  // Every title's within-k-hops set as a bitset row: hop k+1 ORs the hop-k
  // rows of the title and its neighbours. This runs on every availability
  // read, where a search from each title grew with titles times edges.
  const size = media.length
  const words = (size + 31) >>> 5
  let within = new Uint32Array(size * words)
  for (let i = 0; i < size; i++) {
    for (const j of [i, ...neighbours[i]]) within[i * words + (j >>> 5)] |= 1 << (j & 31)
  }
  const counts: Record<QuizMovieChainDifficulty, number> = { easy: 0, normal: 0, hard: 0 }
  const difficultyByDistance: Array<QuizMovieChainDifficulty | null> = [null, null, 'easy', 'normal', 'hard']
  for (let distance = 2; distance <= 4; distance++) {
    const next = new Uint32Array(size * words)
    let exact = 0
    for (let i = 0; i < size; i++) {
      const row = i * words
      for (const j of [i, ...neighbours[i]]) {
        const from = j * words
        for (let w = 0; w < words; w++) next[row + w] |= within[from + w]
      }
      for (let w = 0; w < words; w++) exact += bitCount(next[row + w] & ~within[row + w])
    }
    // Distances are symmetric, so each unordered pair was counted from both ends.
    counts[difficultyByDistance[distance]!] = exact / 2
    within = next
  }
  return counts
}

function bitCount(value: number): number {
  let v = value - ((value >>> 1) & 0x55555555)
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333)
  return (((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24
}

// A seeded random start, then a random endpoint at exactly the target distance
// from it. Listing every qualifying pair first meant a search from every title,
// which grew quadratically with the library.
function pickEndpoints<T extends { key: string }>(
  media: readonly T[],
  graph: ReadonlyMap<string, string[]>,
  targetDistance: number,
  rng: () => number
): [T, T] | null {
  const byKey = new Map(media.map((item) => [item.key, item]))
  for (const start of shuffle(media, rng)) {
    const distances = new Map<string, number>([[start.key, 0]])
    const queue = [start.key]
    const endpoints: string[] = []
    for (let head = 0; head < queue.length; head++) {
      const current = queue[head]
      const distance = distances.get(current)!
      if (distance >= targetDistance) continue
      for (const next of graph.get(current) ?? []) {
        if (distances.has(next)) continue
        distances.set(next, distance + 1)
        if (distance + 1 === targetDistance) endpoints.push(next)
        queue.push(next)
      }
    }
    const target = endpoints.length ? byKey.get(endpoints[Math.floor(rng() * endpoints.length)]) : null
    if (target) return [start, target]
  }
  return null
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
  const graph = adjacency(edges)
  const distance = MOVIE_CHAIN_DISTANCE[difficulty]
  const endpoints = pickEndpoints(media, graph, distance, rng)
  if (!endpoints) return null
  const [start, target] = endpoints
  const component = new Set<string>([start.key])
  const queue = [start.key]
  for (let head = 0; head < queue.length; head++) {
    for (const next of graph.get(queue[head]) ?? []) {
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
