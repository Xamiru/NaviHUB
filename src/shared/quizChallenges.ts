import type {
  QuizChallengeChoice,
  QuizChallengeQuestion,
  QuizChallengeRequest
} from './types'
import { seededRng } from './quizCore'

export interface ChallengeMediaCandidate {
  id: number
  title: string
  mediaType: string
  coverPath: string | null
  artPaths: string[]
  releaseDate: string | null
  totalUnits: number | null
  score: number | null
  genres: string[]
  relations: string[]
  people: Array<{ id: number; name: string; role: string }>
  studios: Array<{ id: number; name: string; role: string }>
}

export interface ChallengeCharacterCandidate {
  id: number
  name: string
  imagePath: string
  media: Array<{ id: number; title: string }>
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

function optionsFor(
  answer: ChallengeMediaCandidate,
  pool: ChallengeMediaCandidate[],
  rng: () => number
): QuizChallengeChoice[] {
  return shuffled(
    [answer, ...shuffled(pool.filter((m) => m.id !== answer.id), rng).slice(0, 3)].map(choice),
    rng
  )
}

export function buildChallengeQuestions(
  request: QuizChallengeRequest,
  media: ChallengeMediaCandidate[],
  characters: ChallengeCharacterCandidate[] = []
): QuizChallengeQuestion[] {
  const rng = seededRng(request.seed)
  const length = Math.max(1, Math.floor(request.length))
  switch (request.kind) {
    case 'imageReveal': {
      const source = request.options?.imageSource ?? 'covers'
      const candidates = media.filter((m) =>
        source === 'covers' ? Boolean(m.coverPath) : m.artPaths.length > 0
      )
      return shuffled(candidates, rng)
        .slice(0, length)
        .map((m, i) => ({
          id: `image-${request.seed}-${i}`,
          kind: 'imageReveal' as const,
          prompt: 'Which title is this?',
          imagePath:
            source === 'covers'
              ? m.coverPath!
              : m.artPaths[Math.floor(rng() * m.artPaths.length)],
          choices: optionsFor(m, media, rng),
          validKeys: [String(m.id)]
        }))
    }
    case 'silhouette': {
      const mode = request.options?.silhouetteMode ?? 'character'
      const pool = characters.filter((c) => c.media.length > 0)
      return shuffled(pool, rng)
        .slice(0, length)
        .map((c, i) => {
          if (mode === 'title') {
            const answer = c.media[Math.floor(rng() * c.media.length)]
            const valid = new Set(c.media.map((m) => String(m.id)))
            const wrong = shuffled(media.filter((m) => !valid.has(String(m.id))), rng).slice(0, 3)
            return {
              id: `silhouette-${request.seed}-${i}`,
              kind: 'silhouette' as const,
              prompt: 'Which title features this character?',
              imagePath: c.imagePath,
              choices: shuffled(
                [{ key: String(answer.id), label: answer.title }, ...wrong.map(choice)],
                rng
              ),
              validKeys: [...valid]
            }
          }
          const wrong = shuffled(pool.filter((x) => x.id !== c.id), rng).slice(0, 3)
          return {
            id: `silhouette-${request.seed}-${i}`,
            kind: 'silhouette' as const,
            prompt: 'Who is this character?',
            imagePath: c.imagePath,
            choices: shuffled(
              [{ key: String(c.id), label: c.name }, ...wrong.map((x) => ({ key: String(x.id), label: x.name }))],
              rng
            ),
            validKeys: [String(c.id)]
          }
        })
    }
    case 'connections': {
      const mode = request.options?.connectionMode ?? 'person'
      const pairs: Array<{ a: ChallengeMediaCandidate; b: ChallengeMediaCandidate; valid: Array<{ id: number; name: string; role: string }> }> = []
      for (let i = 0; i < media.length; i++) {
        const left = mode === 'person' ? media[i].people : media[i].studios
        for (let j = i + 1; j < media.length; j++) {
          const rightIds = new Set((mode === 'person' ? media[j].people : media[j].studios).map((x) => x.id))
          const valid = left.filter((x) => rightIds.has(x.id))
          if (valid.length) pairs.push({ a: media[i], b: media[j], valid })
        }
      }
      const allConnectors = media.flatMap((m) => (mode === 'person' ? m.people : m.studios))
      return shuffled(pairs, rng)
        .slice(0, length)
        .map((pair, i) => {
          const validIds = new Set(pair.valid.map((x) => x.id))
          const answer = pair.valid[Math.floor(rng() * pair.valid.length)]
          const seen = new Set<number>()
          const wrong = shuffled(allConnectors, rng).filter((x) => {
            if (validIds.has(x.id) || seen.has(x.id)) return false
            seen.add(x.id)
            return true
          }).slice(0, 3)
          return {
            id: `connections-${request.seed}-${i}`,
            kind: 'connections' as const,
            prompt: `What connects ${pair.a.title} and ${pair.b.title}?`,
            titleA: choice(pair.a),
            titleB: choice(pair.b),
            choices: shuffled([answer, ...wrong].map((x) => ({ key: String(x.id), label: x.name })), rng),
            validKeys: pair.valid.map((x) => String(x.id)),
            reveal: pair.valid.map((x) => `${x.name}: ${x.role}`).join(' / ')
          }
        })
    }
    case 'chronology': {
      const dated = media.filter((m) => m.releaseDate)
      const groups = new Map<string, ChallengeMediaCandidate[]>()
      for (const m of dated) {
        const keys = [
          ...m.relations.map((x) => `r:${x}`),
          ...m.studios.map((x) => `s:${x.id}`),
          ...m.people.map((x) => `p:${x.id}`)
        ]
        for (const key of keys) groups.set(key, [...(groups.get(key) ?? []), m])
      }
      return shuffled([...groups.values()].filter((g) => new Set(g.map((m) => m.releaseDate)).size >= 4), rng)
        .slice(0, length)
        .map((g, i) => {
          const entries = shuffled(g, rng).filter((m, index, all) => all.findIndex((x) => x.releaseDate === m.releaseDate) === index).slice(0, 4)
          const ordered = [...entries].sort((a, b) => a.releaseDate!.localeCompare(b.releaseDate!))
          return {
            id: `chronology-${request.seed}-${i}`,
            kind: 'chronology' as const,
            prompt: 'Order these titles from oldest to newest.',
            choices: entries.map(choice),
            entries: entries.map((m) => ({ ...choice(m), releaseDate: m.releaseDate! })),
            validKeys: ordered.map((m) => String(m.id))
          }
        })
    }
    case 'oddOneOut': {
      type Relation = { type: 'studio' | 'credited person' | 'genre'; key: string; label: string }
      const relations: Relation[] = []
      for (const m of media) {
        relations.push(...m.studios.map((x) => ({ type: 'studio' as const, key: `s:${x.id}`, label: x.name })))
        relations.push(...m.people.map((x) => ({ type: 'credited person' as const, key: `p:${x.id}`, label: x.name })))
        relations.push(...m.genres.map((x) => ({ type: 'genre' as const, key: `g:${x}`, label: x })))
      }
      const unique = [...new Map(relations.map((r) => [r.key, r])).values()]
      const has = (m: ChallengeMediaCandidate, r: Relation) =>
        r.type === 'studio' ? m.studios.some((x) => `s:${x.id}` === r.key) :
        r.type === 'credited person' ? m.people.some((x) => `p:${x.id}` === r.key) : m.genres.includes(r.label)
      const viable = unique.map((r) => ({ r, matching: media.filter((m) => has(m, r)) })).filter((x) => x.matching.length >= 3)
      return shuffled(viable, rng).flatMap(({ r, matching }, i) => {
        const trio = shuffled(matching, rng).slice(0, 3)
        const anchor = trio[0]
        const anchorYear = anchor.releaseDate ? Number(anchor.releaseDate.slice(0, 4)) : null
        const outsider = shuffled(media.filter((m) => {
          if (m.mediaType !== anchor.mediaType || has(m, r)) return false
          if (anchorYear == null || !m.releaseDate) return true
          return Math.abs(Number(m.releaseDate.slice(0, 4)) - anchorYear) <= 10
        }), rng)[0]
        if (!outsider) return []
        return [{
          id: `odd-${request.seed}-${i}`,
          kind: 'oddOneOut' as const,
          prompt: `Which title does not share the ${r.type} “${r.label}”?`,
          relation: r.type,
          explanation: `${trio.map((m) => m.title).join(', ')} share ${r.label}.`,
          choices: shuffled([...trio, outsider].map(choice), rng),
          validKeys: [String(outsider.id)]
        }]
      }).slice(0, length)
    }
    case 'higherLower': {
      const metric = request.options?.higherLowerMetric ?? 'releaseDate'
      const value = (m: ChallengeMediaCandidate): number | null => {
        if (metric === 'releaseDate') return m.releaseDate ? Date.parse(m.releaseDate) : null
        if (metric === 'totalUnits') return m.totalUnits
        return m.score
      }
      let usable = media.filter((m) => value(m) != null)
      if (metric === 'totalUnits') {
        const byType = new Map<string, ChallengeMediaCandidate[]>()
        for (const item of usable) byType.set(item.mediaType, [...(byType.get(item.mediaType) ?? []), item])
        usable = shuffled([...byType.values()].filter((group) => group.length >= 2), rng).sort((a, b) => b.length - a.length)[0] ?? []
      }
      if (new Set(usable.map((item) => value(item))).size < 2) return []
      let deck = shuffled(usable, rng)
      let reference = deck.pop()!
      const out: QuizChallengeQuestion[] = []
      let guard = Math.max(length * usable.length * 2, 20)
      while (out.length < length && guard-- > 0) {
        if (deck.length === 0) deck = shuffled(usable.filter((item) => item.id !== reference.id), rng)
        const challenger = deck.pop()
        if (!challenger || challenger.id === reference.id || value(challenger) === value(reference)) continue
        const av = value(reference)!
        const bv = value(challenger)!
        out.push({
          id: `higher-${request.seed}-${out.length}`,
          kind: 'higherLower',
          prompt: `Is ${challenger.title} higher or lower than ${reference.title}?`,
          reference: choice(reference),
          challenger: choice(challenger),
          metric,
          referenceValue: av,
          challengerValue: bv,
          choices: [{ key: 'higher', label: 'Higher' }, { key: 'lower', label: 'Lower' }],
          validKeys: [bv > av ? 'higher' : 'lower']
        })
        reference = challenger
      }
      return out
    }
  }
}
