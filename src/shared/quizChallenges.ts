import type {
  QuizChallengeChoice,
  QuizChallengeQuestion,
  QuizChallengeRequest
} from './types'
import { balancedBuiltDeal, balancedDeal, drawUntil, seededRng } from './quizCore'
import { takeWithFranchiseCap, titleFranchiseKey } from './franchiseKey'
import { imageRevealFocus } from './imageRevealQuiz'
import { screenPeople } from './voiceRoles'
import { higherLowerCopy, higherLowerValue } from './higherLowerQuiz'
import type { MediaType } from './types'
import { buildLibraryGridQuestion, type LibraryGridCandidate } from './libraryGrid'
import { buildMovieChainQuestion, type MovieChainCandidate } from './movieChain'
import { buildLibraryleQuestion, type LibraryleCandidate } from './libraryle'
import { buildMysteryCareerQuestion, type MysteryCareerCandidate } from './mysteryCareer'
import { buildLinkWallQuestion, type LinkWallCandidate } from './linkWall'

export interface ChallengeMediaCandidate {
  id: number
  title: string
  aliases?: string[]
  mediaType: string
  coverPath: string | null
  artPaths: string[]
  releaseDate: string | null
  totalUnits: number | null
  score: number | null
  // The 0-100 community score (communityScoreSql), when a source provides one.
  communityScore?: number | null
  genres: string[]
  relations: string[]
  people: Array<{
    id: number
    name: string
    role: string
    characterName?: string | null
    billingOrder?: number | null
    photoPath?: string | null
  }>
  studios: Array<{ id: number; name: string; role: string }>
}

function shuffled<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function choice(m: ChallengeMediaCandidate): QuizChallengeChoice {
  return { key: String(m.id), label: m.title, imagePath: m.coverPath }
}

function imageOptionsFor(
  answer: ChallengeMediaCandidate,
  pool: ChallengeMediaCandidate[],
  rng: () => number,
  franchiseOf: (item: ChallengeMediaCandidate) => string
): QuizChallengeChoice[] {
  const sameType = pool.filter((candidate) => candidate.mediaType === answer.mediaType)
  const answerYear = answer.releaseDate ? Number(answer.releaseDate.slice(0, 4)) : null
  const answerGenres = new Set(answer.genres.map((genre) => genre.toLowerCase()))
  const scored = sameType
    .filter((candidate) => candidate.id !== answer.id)
    .map((candidate) => {
      const year = candidate.releaseDate ? Number(candidate.releaseDate.slice(0, 4)) : null
      const sameDecade = answerYear != null && year != null && Math.floor(answerYear / 10) === Math.floor(year / 10)
      const sharedGenres = candidate.genres.filter((genre) => answerGenres.has(genre.toLowerCase())).length
      return { candidate, score: (sameDecade ? 2 : 0) + Math.min(sharedGenres, 3), tie: rng() }
    })
    .sort((a, b) => b.score - a.score || a.tie - b.tie)
    .map((entry) => entry.candidate)
  // A sequel can still be an option, but no franchise fills more than two.
  const wrong = takeWithFranchiseCap(scored, 3, franchiseOf, franchiseOf(answer))
  return shuffled([answer, ...wrong].map(choice), rng)
}

function rankedMediaDistractors(
  answer: ChallengeMediaCandidate,
  pool: ChallengeMediaCandidate[],
  forbiddenIds: ReadonlySet<number>,
  rng: () => number
): ChallengeMediaCandidate[] {
  const answerYear = answer.releaseDate ? Number(answer.releaseDate.slice(0, 4)) : null
  const answerGenres = new Set(answer.genres.map((genre) => genre.toLowerCase()))
  return pool
    .filter((candidate) => candidate.mediaType === answer.mediaType && !forbiddenIds.has(candidate.id))
    .map((candidate) => {
      const year = candidate.releaseDate ? Number(candidate.releaseDate.slice(0, 4)) : null
      const sameDecade = answerYear != null && year != null && Math.floor(answerYear / 10) === Math.floor(year / 10)
      const sharedGenres = candidate.genres.filter((genre) => answerGenres.has(genre.toLowerCase())).length
      return { candidate, score: (sameDecade ? 2 : 0) + Math.min(sharedGenres, 3), tie: rng() }
    })
    .sort((a, b) => b.score - a.score || a.tie - b.tie)
    .map((entry) => entry.candidate)
}

/** Chronology's company fallback uses only this many of the largest studios. */
export const CHRONOLOGY_STUDIO_GROUPS = 12

export function buildChallengeQuestions(
  request: QuizChallengeRequest,
  media: ChallengeMediaCandidate[]
): QuizChallengeQuestion[] {
  const rng = seededRng(request.seed)
  const length = Math.max(1, Math.floor(request.length))
  switch (request.kind) {
    case 'libraryle': {
      const candidates: LibraryleCandidate[] = media.flatMap((item) =>
        item.coverPath && (item.mediaType === 'movie' || item.mediaType === 'tv')
          ? [{
              key: String(item.id),
              label: item.title,
              aliases: item.aliases ?? [],
              imagePath: item.coverPath,
              releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || null : null,
              mediaType: item.mediaType,
              rating: item.communityScore ?? null,
              genres: item.genres.map((label) => ({ key: label.toLocaleLowerCase(), label })),
              companies: item.studios.map((company) => ({ key: String(company.id), label: company.name })),
              directors: screenPeople(item)
                .filter((person) => person.role === 'director')
                .map((person) => ({ key: String(person.id), label: person.name })),
              cast: screenPeople(item)
                .filter(
                  (person) =>
                    person.role === 'actor' &&
                    person.billingOrder != null &&
                    person.billingOrder >= 0 &&
                    person.billingOrder < 10
                )
                .map((person) => ({ key: String(person.id), label: person.name }))
            }]
          : []
      )
      const question = buildLibraryleQuestion(
        candidates,
        request.seed,
        request.options?.screenMediaMode ?? 'both'
      )
      return question ? [question] : []
    }
    case 'mysteryCareer': {
      const candidates: MysteryCareerCandidate[] = media.flatMap((item) =>
        item.coverPath && (item.mediaType === 'movie' || item.mediaType === 'tv')
          ? [{
              key: String(item.id),
              label: item.title,
              aliases: item.aliases ?? [],
              imagePath: item.coverPath,
              releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || null : null,
              mediaType: item.mediaType,
              rating: item.communityScore ?? null,
              people: screenPeople(item)
            }]
          : []
      )
      const question = buildMysteryCareerQuestion(
        candidates,
        request.seed,
        request.options?.screenMediaMode ?? 'both'
      )
      return question ? [question] : []
    }
    case 'linkWall': {
      const relationLabels = new Map<string, string>()
      for (const item of [...media].sort((left, right) => left.id - right.id)) {
        for (const key of item.relations) {
          if (!relationLabels.has(key)) relationLabels.set(key, `${item.title} series`)
        }
      }
      const candidates: LinkWallCandidate[] = media.flatMap((item) =>
        item.coverPath && (item.mediaType === 'movie' || item.mediaType === 'tv')
          ? [{
              key: String(item.id),
              label: item.title,
              aliases: item.aliases ?? [],
              imagePath: item.coverPath,
              releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || null : null,
              mediaType: item.mediaType,
              genres: item.genres.map((label) => ({ key: label.toLocaleLowerCase(), label })),
              companies: item.studios.map((company) => ({ key: String(company.id), label: company.name })),
              relations: item.relations.map((key) => ({
                key,
                label: relationLabels.get(key) ?? 'Related titles'
              })),
              people: screenPeople(item)
            }]
          : []
      )
      const question = buildLinkWallQuestion(
        candidates,
        request.seed,
        request.options?.screenMediaMode ?? 'both'
      )
      return question ? [question] : []
    }
    case 'libraryGrid': {
      const candidates: LibraryGridCandidate[] = media.flatMap((item) =>
        item.coverPath && (item.mediaType === 'movie' || item.mediaType === 'tv')
          ? [{
              key: String(item.id),
              label: item.title,
              aliases: item.aliases ?? [],
              imagePath: item.coverPath,
              releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || null : null,
              mediaType: item.mediaType,
              genres: item.genres,
              people: screenPeople(item),
              companies: item.studios
            }]
          : []
      )
      const question = buildLibraryGridQuestion(
        candidates,
        request.seed,
        request.options?.screenMediaMode ?? 'both'
      )
      return question ? [question] : []
    }
    case 'movieChain': {
      const candidates: MovieChainCandidate[] = media.flatMap((item) =>
        item.coverPath && (item.mediaType === 'movie' || item.mediaType === 'tv')
          ? [{
              key: String(item.id),
              label: item.title,
              aliases: item.aliases ?? [],
              imagePath: item.coverPath,
              releaseYear: item.releaseDate ? Number(item.releaseDate.slice(0, 4)) || null : null,
              mediaType: item.mediaType,
              people: screenPeople(item)
            }]
          : []
      )
      const question = buildMovieChainQuestion(
        candidates,
        request.seed,
        request.options?.screenMediaMode ?? 'both',
        request.options?.movieChainDifficulty ?? 'normal'
      )
      return question ? [question] : []
    }
    case 'imageReveal': {
      const source = request.options?.imageSource ?? 'covers'
      const onlyType = request.options?.imageMediaType ?? null
      const typeCounts = new Map<string, number>()
      for (const item of media) typeCounts.set(item.mediaType, (typeCounts.get(item.mediaType) ?? 0) + 1)
      const franchises = new Map<number, string>()
      const franchiseOf = (item: ChallengeMediaCandidate): string => {
        let key = franchises.get(item.id)
        if (key == null) {
          key = `${item.mediaType}:${titleFranchiseKey(item.title)}`
          franchises.set(item.id, key)
        }
        return key
      }
      const candidates = media.filter((m) =>
        (onlyType == null || m.mediaType === onlyType) &&
        (source === 'covers' ? Boolean(m.coverPath) : m.artPaths.length > 0) &&
        (typeCounts.get(m.mediaType) ?? 0) >= 4
      )
      // Round-robin across franchises, so a round only repeats one once every
      // other franchise has had a question.
      return balancedDeal(candidates, length, franchiseOf, rng).map((m, i) => ({
        id: `image-${request.seed}-${i}`,
        kind: 'imageReveal' as const,
        prompt: 'Which title is this?',
        imagePath:
          source === 'covers'
            ? m.coverPath!
            : m.artPaths[Math.floor(rng() * m.artPaths.length)],
        mediaType: m.mediaType as MediaType,
        focus: imageRevealFocus(rng),
        choices: imageOptionsFor(m, media, rng, franchiseOf),
        validKeys: [String(m.id)]
      }))
    }
    case 'connections': {
      type Actor = { id: number; name: string }
      // `billing` is the person's best TMDB position on that title; directors are -1.
      type Appearance = { media: ChallengeMediaCandidate; roles: string[]; billing: number }
      type Connector = Actor & { appearances: Appearance[] }
      type Link = Actor & { leftRoles: string[]; rightRoles: string[]; prominence: number }
      type Pair = {
        a: ChallengeMediaCandidate
        b: ChallengeMediaCandidate
        valid: Link[]
        forbiddenIds: Set<number>
        answer: Link
      }

      // Connections mixes actors and directors so the option type cannot reveal
      // the answer. TMDB supplies stable billing order for movies and aggregate
      // TV credits; only actor appearances are limited to the first ten. Voice
      // roles (actors on animated titles) never link two titles, but they stay
      // in each title's full credit list, so a person who voiced one of the two
      // is never offered as a wrong answer.
      const screenMedia = media.filter(
        (item) => item.mediaType === 'movie' || item.mediaType === 'tv'
      )
      const connectors = new Map<number, Connector>()
      const allPeopleByMedia = new Map<number, Set<number>>()
      const eligibleByMedia = new Map<number, Actor[]>()
      for (const item of screenMedia) {
        const allPeople = new Set<number>()
        for (const person of item.people) {
          if (person.role === 'actor' || person.role === 'director') allPeople.add(person.id)
        }
        allPeopleByMedia.set(item.id, allPeople)
        const perTitle = new Map<number, { actor: Actor; roles: Set<string>; billing: number }>()
        for (const person of screenPeople(item)) {
          if (person.role !== 'actor' && person.role !== 'director') continue
          const isTopBilledActor =
            person.role === 'actor' &&
            person.billingOrder != null &&
            person.billingOrder >= 0 &&
            person.billingOrder < 10
          if (person.role !== 'director' && !isTopBilledActor) continue
          const found = perTitle.get(person.id) ?? {
            actor: { id: person.id, name: person.name },
            roles: new Set<string>(),
            billing: Number.POSITIVE_INFINITY
          }
          if (person.role === 'director') {
            found.roles.add('director')
            found.billing = -1
          } else {
            found.roles.add(person.characterName?.trim() || 'actor')
            found.billing = Math.min(found.billing, person.billingOrder ?? 9)
          }
          perTitle.set(person.id, found)
        }
        eligibleByMedia.set(item.id, [...perTitle.values()].map((entry) => entry.actor))
        for (const { actor, roles, billing } of perTitle.values()) {
          const connector = connectors.get(actor.id) ?? { ...actor, appearances: [] }
          connector.appearances.push({ media: item, roles: [...roles], billing })
          connectors.set(actor.id, connector)
        }
      }

      // Sequels and seasons share their whole cast, so a same-franchise pair
      // is a free question; only cross-franchise pairs are dealt.
      const franchise = new Map<number, string>()
      const franchiseOf = (item: ChallengeMediaCandidate): string => {
        let key = franchise.get(item.id)
        if (key == null) {
          key = titleFranchiseKey(item.title)
          franchise.set(item.id, key)
        }
        return key
      }

      // Build through actor groups instead of comparing every title with every
      // other title. A title pair is stored once even when several actors link it.
      const pairMap = new Map<string, Omit<Pair, 'answer'>>()
      for (const connector of connectors.values()) {
        for (let i = 0; i < connector.appearances.length; i++) {
          for (let j = i + 1; j < connector.appearances.length; j++) {
            const first = connector.appearances[i]
            const second = connector.appearances[j]
            if (franchiseOf(first.media) === franchiseOf(second.media)) continue
            const [left, right] = first.media.id < second.media.id
              ? [first, second]
              : [second, first]
            const key = `${left.media.id}:${right.media.id}`
            const pair = pairMap.get(key) ?? {
              a: left.media,
              b: right.media,
              valid: [],
              forbiddenIds: new Set(
                [...(allPeopleByMedia.get(left.media.id) ?? [])].filter((id) =>
                  allPeopleByMedia.get(right.media.id)?.has(id)
                )
              )
            }
            pair.valid.push({
              id: connector.id,
              name: connector.name,
              leftRoles: left.roles,
              rightRoles: right.roles,
              // Lower is more recognisable: a director, then the best-billed
              // actor across both titles.
              prominence: Math.max(left.billing, right.billing)
            })
            pairMap.set(key, pair)
          }
        }
      }

      const actorPool = [...connectors.values()].map(({ id, name }) => ({ id, name }))
      // Wrong options come from the people outside the pair's shared cast;
      // counted from the shared cast rather than re-filtering the whole pool.
      const forbiddenInPool = (pair: Omit<Pair, 'answer'>): number => {
        let n = 0
        for (const id of pair.forbiddenIds) if (connectors.has(id)) n++
        return n
      }
      const PROMINENT = 4 // a director, or top-five billing in both titles
      const candidates: Pair[] = shuffled([...pairMap.values()], rng).flatMap((pair) => {
        if (actorPool.length - forbiddenInPool(pair) < 3) return []
        // Show the most recognisable shared person; every shared person stays valid.
        const best = Math.min(...pair.valid.map((link) => link.prominence))
        const top = pair.valid.filter((link) => link.prominence === best)
        return [{ ...pair, answer: top[Math.floor(rng() * top.length)] }]
      })

      // Balance all three visible identities so a prolific actor or one popular
      // title cannot take over a round merely by producing more possible pairs.
      // Pairs linked by a prominent person are dealt before deep-cast ones.
      const remaining = [...candidates]
      const actorUses = new Map<number, number>()
      const titleUses = new Map<number, number>()
      const dealt: Pair[] = []
      while (dealt.length < length && remaining.length > 0) {
        let bestIndex = 0
        let bestScore: [number, number, number] | null = null
        for (let i = 0; i < remaining.length; i++) {
          const candidate = remaining[i]
          const counts = [
            actorUses.get(candidate.answer.id) ?? 0,
            titleUses.get(candidate.a.id) ?? 0,
            titleUses.get(candidate.b.id) ?? 0
          ]
          const score: [number, number, number] = [
            Math.max(...counts),
            candidate.answer.prominence <= PROMINENT ? 0 : 1,
            counts.reduce((a, b) => a + b, 0)
          ]
          if (
            bestScore == null ||
            score[0] < bestScore[0] ||
            (score[0] === bestScore[0] && score[1] < bestScore[1]) ||
            (score[0] === bestScore[0] && score[1] === bestScore[1] && score[2] < bestScore[2])
          ) {
            bestIndex = i
            bestScore = score
          }
        }
        const [picked] = remaining.splice(bestIndex, 1)
        dealt.push(picked)
        actorUses.set(picked.answer.id, (actorUses.get(picked.answer.id) ?? 0) + 1)
        titleUses.set(picked.a.id, (titleUses.get(picked.a.id) ?? 0) + 1)
        titleUses.set(picked.b.id, (titleUses.get(picked.b.id) ?? 0) + 1)
      }

      // Wrong options: someone only in the first title, someone only in the
      // second, then anyone else outside the shared cast. Knowing one cast is
      // no longer enough.
      const wrongOptions = (pair: Pair): Actor[] => {
        const used = new Set<number>([pair.answer.id])
        const out: Actor[] = []
        const take = (pool: Actor[], count: number) => {
          for (const actor of shuffled(pool, rng)) {
            if (out.length >= 3 || count <= 0) break
            if (used.has(actor.id) || pair.forbiddenIds.has(actor.id)) continue
            used.add(actor.id)
            out.push(actor)
            count--
          }
        }
        take(eligibleByMedia.get(pair.a.id) ?? [], 1)
        take(eligibleByMedia.get(pair.b.id) ?? [], 1)
        take([...(eligibleByMedia.get(pair.a.id) ?? []), ...(eligibleByMedia.get(pair.b.id) ?? [])], 3)
        if (out.length < 3) {
          // Partial Fisher-Yates over the whole pool, stopping at three.
          take(drawUntil([...actorPool], rng, (actor) => !used.has(actor.id) && !pair.forbiddenIds.has(actor.id), 3 - out.length), 3)
        }
        return out
      }

      const describeRoles = (roles: string[]) => roles.length > 0 ? roles.join(' / ') : 'cast member'
      return dealt.map((pair, i) => ({
        id: `connections-${request.seed}-${i}`,
        kind: 'connections' as const,
        prompt: `Which person connects ${pair.a.title} and ${pair.b.title}?`,
        titleA: choice(pair.a),
        titleB: choice(pair.b),
        choices: shuffled(
          [pair.answer, ...wrongOptions(pair)].map((actor) => ({ key: String(actor.id), label: actor.name })),
          rng
        ),
        validKeys: pair.valid.map((actor) => String(actor.id)),
        reveal: pair.valid.map((actor) =>
          `${actor.name} — ${pair.a.title}: ${describeRoles(actor.leftRoles)}; ${pair.b.title}: ${describeRoles(actor.rightRoles)}`
        ).join(' / ')
      }))
    }
    case 'chronology': {
      type Group = {
        key: string
        priority: 0 | 1 | 2
        label: string
        media: Map<number, ChallengeMediaCandidate>
      }
      type Candidate = {
        group: Group
        entries: ChallengeMediaCandidate[]
      }
      // Every title sits in dozens of person/company groups, so its year is
      // parsed once rather than on every group and dealing attempt.
      const yearById = new Map<number, number | null>()
      for (const item of media) {
        const match = item.releaseDate?.match(/^(\d{4})/)
        yearById.set(item.id, match ? Number(match[1]) : null)
      }
      const releaseYear = (item: ChallengeMediaCandidate): number | null => yearById.get(item.id) ?? null
      const groups = new Map<string, Group>()
      const add = (
        key: string,
        priority: Group['priority'],
        label: string,
        item: ChallengeMediaCandidate
      ) => {
        const found = groups.get(key) ?? { key, priority, label, media: new Map() }
        found.media.set(item.id, item)
        groups.set(key, found)
      }
      // Fallback connections must be recognisable: only the biggest studios
      // in the selection, and only directors and top-ten billed actors (voice
      // roles excluded), never composers, producers or minor companies.
      const studioCounts = new Map<number, number>()
      for (const item of media) {
        for (const id of new Set(item.studios.map((studio) => studio.id))) {
          studioCounts.set(id, (studioCounts.get(id) ?? 0) + 1)
        }
      }
      const bigStudios = new Set(
        [...studioCounts.entries()]
          .sort((a, b) => b[1] - a[1] || a[0] - b[0])
          .slice(0, CHRONOLOGY_STUDIO_GROUPS)
          .map(([id]) => id)
      )
      for (const item of media) {
        if (releaseYear(item) == null || !item.coverPath) continue
        for (const relation of new Set(item.relations)) {
          add(`r:${relation}`, 0, 'Same franchise', item)
        }
        for (const studio of new Map(item.studios.map((value) => [value.id, value])).values()) {
          if (!bigStudios.has(studio.id)) continue
          add(`s:${studio.id}`, 1, `Shared company: ${studio.name}`, item)
        }
        const known = screenPeople(item).filter(
          (person) =>
            person.role === 'director' ||
            (person.role === 'actor' &&
              person.billingOrder != null &&
              person.billingOrder >= 0 &&
              person.billingOrder < 10)
        )
        for (const person of new Map(known.map((value) => [value.id, value])).values()) {
          add(`p:${person.id}`, 2, person.role === 'director' ? `Directed by ${person.name}` : `Shared cast: ${person.name}`, item)
        }
      }

      const candidatesByPriority: Candidate[][] = [[], [], []]
      const seenSets = new Set<string>()
      let generated = 0
      let filledPriority: number | null = null
      for (const group of shuffled([...groups.values()], rng).sort((a, b) => a.priority - b.priority)) {
        // Dealing exhausts each tier before the next, so once the finished
        // tiers hold a full round the lower-priority groups are unreachable.
        if (filledPriority != null && group.priority > filledPriority) break
        const all = [...group.media.values()]
        if (new Set(all.map(releaseYear)).size < 4) continue
        const sameType = [...new Set(all.map((item) => item.mediaType))]
          .map((mediaType) => all.filter((item) => item.mediaType === mediaType))
          .filter((items) => new Set(items.map(releaseYear)).size >= 4)
        const pools = group.priority === 0 || sameType.length === 0 ? [all] : sameType
        const localSets = new Set<string>()
        const target = Math.max(length, 1)
        for (const pool of pools) {
          const attempts = Math.max(24, target * 8)
          // Each attempt draws in seeded random order only until it has four
          // distinct years; company groups can hold thousands of titles.
          const order = [...pool]
          for (let attempt = 0; attempt < attempts && localSets.size < target; attempt++) {
            const years = new Set<number>()
            const entries = drawUntil(order, rng, (item) => {
              const year = releaseYear(item)!
              if (years.has(year)) return false
              years.add(year)
              return true
            }, 4)
            if (entries.length < 4) continue
            const setKey = entries.map((item) => item.id).sort((a, b) => a - b).join(':')
            if (localSets.has(setKey) || seenSets.has(setKey)) continue
            localSets.add(setKey)
            seenSets.add(setKey)
            candidatesByPriority[group.priority].push({ group, entries })
            generated++
          }
        }
        if (filledPriority == null && generated >= Math.max(length, 1)) filledPriority = group.priority
      }

      const dealt: Candidate[] = []
      const groupUses = new Map<string, number>()
      const titleUses = new Map<number, number>()
      for (const tier of candidatesByPriority) {
        const remaining = shuffled(tier, rng)
        while (dealt.length < length && remaining.length > 0) {
          let bestIndex = 0
          let bestScore: [number, number] | null = null
          for (let i = 0; i < remaining.length; i++) {
            const candidate = remaining[i]
            const connectorCount = groupUses.get(candidate.group.key) ?? 0
            const titleCount = candidate.entries.reduce(
              (sum, item) => sum + (titleUses.get(item.id) ?? 0),
              0
            )
            const score: [number, number] = [connectorCount, titleCount]
            if (
              bestScore == null ||
              score[0] < bestScore[0] ||
              (score[0] === bestScore[0] && score[1] < bestScore[1])
            ) {
              bestIndex = i
              bestScore = score
            }
          }
          const [picked] = remaining.splice(bestIndex, 1)
          dealt.push(picked)
          groupUses.set(picked.group.key, (groupUses.get(picked.group.key) ?? 0) + 1)
          for (const item of picked.entries) {
            titleUses.set(item.id, (titleUses.get(item.id) ?? 0) + 1)
          }
        }
        if (dealt.length >= length) break
      }

      return dealt.map(({ group, entries }, index) => {
        const choices = shuffled(entries, rng)
        const ordered = [...entries].sort((a, b) => a.releaseDate!.localeCompare(b.releaseDate!))
        return {
          id: `chronology-${request.seed}-${index}`,
          kind: 'chronology' as const,
          prompt: 'Order these connected titles from oldest to newest.',
          choices: choices.map(choice),
          entries: choices.map((item) => ({ ...choice(item), releaseDate: item.releaseDate! })),
          validKeys: ordered.map((item) => String(item.id)),
          connectionLabel: group.label
        }
      })
    }
    case 'higherLower': {
      const metric = request.options?.higherLowerMetric ?? 'releaseDate'
      const requestedType = request.options?.higherLowerMediaType
      const byType = new Map<string, ChallengeMediaCandidate[]>()
      for (const item of media) {
        if (!item.coverPath || higherLowerValue(item, metric) == null) continue
        byType.set(item.mediaType, [...(byType.get(item.mediaType) ?? []), item])
      }
      const usableTypes = [...byType.entries()].filter(([, items]) =>
        new Set(items.map((item) => higherLowerValue(item, metric))).size >= 2
      )
      const selected = requestedType
        ? usableTypes.find(([mediaType]) => mediaType === requestedType)
        : shuffled(usableTypes, rng).sort((a, b) => b[1].length - a[1].length)[0]
      if (!selected) return []
      const mediaType = selected[0] as MediaType
      const usable = selected[1]
      const copy = higherLowerCopy(mediaType, metric)
      const requestedReference = request.options?.higherLowerReferenceId
      let reference = requestedReference == null
        ? shuffled(usable, rng)[0]
        : usable.find((item) => item.id === requestedReference)
      if (!reference) return []
      const excluded = new Set(request.options?.higherLowerExcludeIds ?? [])
      let deck = shuffled(usable.filter((item) => item.id !== reference!.id && !excluded.has(item.id)), rng)
      const out: QuizChallengeQuestion[] = []
      let guard = Math.max(length * usable.length * 2, 20)
      while (out.length < length && guard-- > 0) {
        if (deck.length === 0) {
          deck = shuffled(usable.filter((item) => item.id !== reference!.id), rng)
        }
        const challenger = deck.pop()
        if (
          !challenger ||
          challenger.id === reference.id ||
          higherLowerValue(challenger, metric) === higherLowerValue(reference, metric) ||
          // "Show Season 2 vs Show" is a free point on the release-year question.
          (metric === 'releaseDate' && titleFranchiseKey(challenger.title) === titleFranchiseKey(reference.title))
        ) continue
        const av = higherLowerValue(reference, metric)!
        const bv = higherLowerValue(challenger, metric)!
        out.push({
          id: `higher-${request.seed}-${out.length}`,
          kind: 'higherLower',
          prompt: copy.question(challenger.title, reference.title),
          reference: choice(reference),
          challenger: choice(challenger),
          metric,
          mediaType,
          referenceValue: av,
          challengerValue: bv,
          choices: [
            { key: 'higher', label: copy.higherLabel },
            { key: 'lower', label: copy.lowerLabel }
          ],
          validKeys: [bv > av ? 'higher' : 'lower']
        })
        if (request.options?.higherLowerIndependent) {
          const nextReferences = usable.filter((item) => item.id !== challenger.id)
          reference = nextReferences[Math.floor(rng() * nextReferences.length)] ?? reference
          deck = shuffled(usable.filter((item) => item.id !== reference!.id), rng)
        } else {
          reference = challenger
        }
      }
      return out
    }
    default:
      return []
  }
}
