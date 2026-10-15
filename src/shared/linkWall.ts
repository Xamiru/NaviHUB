import type {
  QuizIdentityLabel,
  QuizLinkWallFamily,
  QuizLinkWallGroup,
  QuizLinkWallQuestion,
  QuizScreenMediaMode,
  QuizScreenTitle
} from './types'
import { seededRng } from './quizCore'
import { screenMediaMatches } from './libraryGrid'
import { shuffle } from './shuffle'

export interface LinkWallCandidate extends QuizScreenTitle {
  genres: QuizIdentityLabel[]
  companies: QuizIdentityLabel[]
  relations: QuizIdentityLabel[]
  people: Array<{
    id: number
    name: string
    role: string
    billingOrder?: number | null
  }>
}

// `seedMembers` builds groups (actors through their top-ten billing);
// `members` proves the wall has one solution, so a title where a group's actor
// is billed 14th counts as matching and such a wall is rejected.
interface Fact {
  key: string
  family: QuizLinkWallFamily
  label: string
  members: Set<string>
  seedMembers: Set<string>
}

interface Membership {
  key: string
  titleKeys: string[]
  facts: Fact[]
}

export interface LinkWallState {
  status: 'playing' | 'complete' | 'failed' | 'gaveUp'
  selectedKeys: string[]
  solvedGroupKeys: string[]
  mistakes: number
  // Wrong selections already guessed, so repeating one costs nothing.
  triedKeys?: string[]
}

export type LinkWallSubmitOutcome =
  | 'incomplete'
  | 'correct'
  | 'wrong'
  | 'complete'
  | 'failed'
  | 'repeated'

export const LINK_WALL_MAX_MISTAKES = 4
/** Company groups come only from the largest studios in the selection. */
export const LINK_WALL_COMPANY_FACTS = 12

function factIndex(candidates: readonly LinkWallCandidate[]): Fact[] {
  const facts = new Map<string, Fact>()
  const add = (
    key: string,
    family: QuizLinkWallFamily,
    label: string,
    titleKey: string,
    seeds = true
  ) => {
    const fact = facts.get(key) ?? {
      key,
      family,
      label,
      members: new Set<string>(),
      seedMembers: new Set<string>()
    }
    fact.members.add(titleKey)
    if (seeds) fact.seedMembers.add(titleKey)
    facts.set(key, fact)
  }
  for (const title of candidates) {
    for (const person of title.people) {
      const topActor =
        person.role === 'actor' &&
        person.billingOrder != null &&
        person.billingOrder >= 0 &&
        person.billingOrder < 10
      if (person.role === 'actor') {
        add(`actor:${person.id}`, 'actor', `Main cast: ${person.name}`, title.key, topActor)
      }
      if (person.role === 'director') {
        add(`director:${person.id}`, 'director', `Directed by ${person.name}`, title.key)
      }
    }
    for (const company of title.companies) {
      add(`company:${company.key}`, 'company', `Company: ${company.label}`, title.key)
    }
    for (const relation of title.relations) {
      add(`franchise:${relation.key}`, 'franchise', `Franchise: ${relation.label}`, title.key)
    }
    // Genre groups were dropped (2026-10-14): source genre tags are too
    // subjective for an exact four-title group.
    if (title.releaseYear != null) {
      const decade = Math.floor(title.releaseYear / 10) * 10
      add(`decade:${decade}`, 'decade', `Released in the ${decade}s`, title.key)
    }
  }
  // Companies: only the biggest studios are recognisable, and they are
  // sampled four titles at a time, so they take no size cap.
  const bigStudios = new Set(
    [...facts.values()]
      .filter((fact) => fact.family === 'company' && fact.seedMembers.size >= 4)
      .sort((a, b) => b.seedMembers.size - a.seedMembers.size || a.key.localeCompare(b.key))
      .slice(0, LINK_WALL_COMPANY_FACTS)
      .map((fact) => fact.key)
  )
  return [...facts.values()].filter((fact) => {
    if (fact.seedMembers.size < 4) return false
    if (fact.family === 'company') return bigStudios.has(fact.key)
    if (fact.family === 'decade') return fact.seedMembers.size <= 10
    return fact.seedMembers.size <= 20
  })
}

function membershipKey(keys: readonly string[]): string {
  return [...keys].sort().join(':')
}

function variants(facts: readonly Fact[], rng: () => number): Membership[] {
  const out = new Map<string, Membership>()
  for (const fact of facts) {
    const members = shuffle([...fact.seedMembers], rng)
    const attempts = fact.seedMembers.size === 4 ? 1 : Math.min(12, fact.seedMembers.size * 2)
    for (let attempt = 0; attempt < attempts; attempt++) {
      const rotated = members.map((_, index) => members[(index + attempt) % members.length])
      const titleKeys = rotated.slice(0, 4).sort()
      const key = `${fact.key}:${membershipKey(titleKeys)}`
      out.set(key, { key, titleKeys, facts: [fact] })
    }
  }
  return shuffle([...out.values()], rng)
}

function boardMemberships(facts: readonly Fact[], board: ReadonlySet<string>): Membership[] {
  const byMembers = new Map<string, Membership>()
  for (const fact of facts) {
    const titleKeys = [...fact.members].filter((key) => board.has(key)).sort()
    if (titleKeys.length !== 4) continue
    const key = membershipKey(titleKeys)
    const found = byMembers.get(key) ?? { key, titleKeys, facts: [] }
    found.facts.push(fact)
    byMembers.set(key, found)
  }
  return [...byMembers.values()]
}

export function linkWallPartitions(
  titleKeys: readonly string[],
  memberships: readonly Pick<Membership, 'key' | 'titleKeys'>[],
  limit = 2
): string[][] {
  const all = new Set(titleKeys)
  const results: string[][] = []
  const visit = (remaining: Set<string>, picked: string[]): void => {
    if (results.length >= limit) return
    if (remaining.size === 0) {
      results.push([...picked].sort())
      return
    }
    const first = [...remaining].sort()[0]
    for (const group of memberships) {
      if (!group.titleKeys.includes(first) || group.titleKeys.some((key) => !remaining.has(key))) {
        continue
      }
      const next = new Set(remaining)
      for (const key of group.titleKeys) next.delete(key)
      visit(next, [...picked, group.key])
    }
  }
  visit(new Set([...all]), [])
  return results
}

export function buildLinkWallQuestion(
  candidates: readonly LinkWallCandidate[],
  seed: string | number,
  mediaMode: QuizScreenMediaMode = 'both'
): QuizLinkWallQuestion | null {
  const media = candidates.filter(
    (item) => item.imagePath.trim() && screenMediaMatches(mediaMode, item.mediaType)
  )
  if (media.length < 16) return null
  const rng = seededRng(seed)
  const facts = factIndex(media)
  const choices = variants(facts, rng)
  let checked = 0
  const selected: Membership[] = []
  const used = new Set<string>()
  let result: { board: Set<string>; groups: Membership[] } | null = null
  const visit = (start: number): void => {
    if (result || checked >= 30000) return
    if (selected.length === 4) {
      checked++
      if (new Set(selected.map((group) => group.facts[0].family)).size < 3) return
      const board = new Set(selected.flatMap((group) => group.titleKeys))
      const validGroups = boardMemberships(facts, board)
      const partitions = linkWallPartitions([...board], validGroups)
      if (partitions.length !== 1) return
      const partitionKeys = new Set(partitions[0])
      const groups = validGroups.filter((group) => partitionKeys.has(group.key))
      if (groups.length === 4) result = { board, groups }
      return
    }
    for (let index = start; index < choices.length && !result && checked < 30000; index++) {
      const group = choices[index]
      if (group.titleKeys.some((key) => used.has(key))) continue
      for (const key of group.titleKeys) used.add(key)
      selected.push(group)
      visit(index + 1)
      selected.pop()
      for (const key of group.titleKeys) used.delete(key)
    }
  }
  visit(0)
  if (!result) return null
  // The successful result is assigned inside the recursive visitor. TypeScript does not
  // propagate that closure mutation through the null guard, so preserve the runtime proof.
  const found = result as { board: Set<string>; groups: Membership[] }
  const titles = shuffle(media.filter((item) => found.board.has(item.key)), rng)
  const groups: QuizLinkWallGroup[] = found.groups.map((group, index) => ({
    key: `group-${index}`,
    family: group.facts[0].family,
    labels: [...new Set(group.facts.map((fact) => fact.label))],
    titleKeys: group.titleKeys
  }))
  return {
    id: `link-wall-${seed}`,
    kind: 'linkWall',
    prompt: 'Sort the sixteen titles into four groups of four connected titles.',
    choices: titles.map((title) => ({ key: title.key, label: title.label, imagePath: title.imagePath })),
    validKeys: [],
    titles,
    groups,
    maxMistakes: LINK_WALL_MAX_MISTAKES
  }
}

export function initialLinkWallState(): LinkWallState {
  return { status: 'playing', selectedKeys: [], solvedGroupKeys: [], mistakes: 0, triedKeys: [] }
}

export function toggleLinkWallTitle(state: LinkWallState, key: string): LinkWallState {
  if (state.status !== 'playing') return state
  if (state.selectedKeys.includes(key)) {
    return { ...state, selectedKeys: state.selectedKeys.filter((value) => value !== key) }
  }
  if (state.selectedKeys.length >= 4) return state
  return { ...state, selectedKeys: [...state.selectedKeys, key] }
}

export function submitLinkWallGroup(
  question: Pick<QuizLinkWallQuestion, 'groups' | 'maxMistakes'>,
  state: LinkWallState
): {
  state: LinkWallState
  outcome: LinkWallSubmitOutcome
  group: QuizLinkWallGroup | null
  oneAway: boolean
} {
  if (state.status !== 'playing' || state.selectedKeys.length !== 4) {
    return { state, outcome: 'incomplete', group: null, oneAway: false }
  }
  const selected = membershipKey(state.selectedKeys)
  if (state.triedKeys?.includes(selected)) {
    return { state, outcome: 'repeated', group: null, oneAway: false }
  }
  const group = question.groups.find(
    (candidate) =>
      !state.solvedGroupKeys.includes(candidate.key) && membershipKey(candidate.titleKeys) === selected
  )
  if (group) {
    const solvedGroupKeys = [...state.solvedGroupKeys, group.key]
    const complete = solvedGroupKeys.length === question.groups.length
    return {
      state: {
        ...state,
        status: complete ? 'complete' : 'playing',
        selectedKeys: [],
        solvedGroupKeys
      },
      outcome: complete ? 'complete' : 'correct',
      group,
      oneAway: false
    }
  }
  const mistakes = state.mistakes + 1
  const failed = mistakes >= question.maxMistakes
  // "One away": three of the four belong to the same unsolved group.
  const picked = new Set(state.selectedKeys)
  const oneAway = question.groups.some(
    (candidate) =>
      !state.solvedGroupKeys.includes(candidate.key) &&
      candidate.titleKeys.filter((key) => picked.has(key)).length === 3
  )
  return {
    state: {
      ...state,
      status: failed ? 'failed' : 'playing',
      // A one-away guess keeps the selection so one title can be swapped.
      selectedKeys: oneAway && !failed ? state.selectedKeys : [],
      mistakes,
      triedKeys: [...(state.triedKeys ?? []), selected]
    },
    outcome: failed ? 'failed' : 'wrong',
    group: null,
    oneAway
  }
}

export function linkWallScore(state: LinkWallState): number {
  if (state.status === 'gaveUp') return 0
  return Math.max(0, state.solvedGroupKeys.length * 250 - state.mistakes * 25)
}
