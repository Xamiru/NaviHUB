import { describe, expect, it } from 'vitest'
import { buildVaQuizQuestions } from '../src/shared/vaQuiz'
import { buildCastQuizQuestions } from '../src/shared/castQuiz'
import {
  buildChallengeQuestions,
  type ChallengeCharacterCandidate,
  type ChallengeMediaCandidate
} from '../src/shared/quizChallenges'
import { movieChainEndpointCounts, type MovieChainCandidate } from '../src/shared/movieChain'
import { seededRng } from '../src/shared/quizCore'
import type { QuizCastItem, QuizChallengeRequest, QuizVaItem } from '../src/shared/types'

// Deal builders run on the renderer thread (or once per availability read)
// over the whole library, so a builder that scans the pool once per item
// freezes the app as the library grows. Each case runs a seeded library a few
// times the size of the development laptop's and must finish inside a budget
// set well above today's time (2026-10-05 laptop: 13-460 ms) and well below
// the quadratic builders these replaced (6-245 s on the same data). A failure
// here means a builder's work grew faster than its pool; see
// docs/architecture/performance.md.

function screenLibrary(titles: number, people: number): ChallengeMediaCandidate[] {
  const rng = seededRng(1)
  // Squared draws make a few people prolific, as real cast lists are.
  const prolific = (n: number) => Math.floor(rng() ** 2 * n) + 1
  return Array.from({ length: titles }, (_, i) => ({
    id: i + 1,
    title: `Title ${i + 1}`,
    aliases: [],
    mediaType: i % 3 === 0 ? 'anime' : i % 3 === 1 ? 'movie' : 'tv',
    coverPath: `media/${i + 1}.jpg`,
    artPaths: [],
    releaseDate: `${1960 + (i % 60)}-01-01`,
    totalUnits: null,
    score: null,
    genres: [`Genre ${i % 12}`, `Genre ${(i * 7) % 12}`],
    relations: [`franchise-${Math.floor(i / 6)}`],
    people: Array.from({ length: 8 }, (_, k) => {
      const id = prolific(people)
      return { id, name: `Person ${id}`, role: k === 0 ? 'director' : 'actor', characterName: null, billingOrder: k }
    }),
    studios: [{ id: (i % 300) + 1, name: `Studio ${(i % 300) + 1}`, role: 'studio' }]
  }))
}

function animeCharacters(media: ChallengeMediaCandidate[], perTitle: number): ChallengeCharacterCandidate[] {
  return media
    .filter((item) => item.mediaType === 'anime')
    .flatMap((item, a) =>
      Array.from({ length: perTitle }, (_, k) => {
        const id = a * perTitle + k + 1
        return {
          id,
          name: `Character ${id}`,
          gender: k % 2 ? 'male' : 'female',
          imagePath: `characters/${id}.jpg`,
          media: [{ id: item.id, title: item.title }]
        }
      })
    )
}

function vaPool(roles: number, people: number): QuizVaItem[] {
  const rng = seededRng(2)
  return Array.from({ length: roles }, (_, i) => {
    const person = Math.floor(rng() ** 2 * people) + 1
    const mediaId = Math.floor(i / 15) + 1
    return {
      characterId: i + 1,
      characterName: `Character ${i + 1}`,
      characterImagePath: `characters/${i + 1}.jpg`,
      gender: i % 2 ? 'male' : 'female',
      mediaId,
      mediaTitle: `Anime ${mediaId}`,
      year: 1980 + (i % 40),
      importance: i % 3,
      personIds: [person],
      personNames: [`VA ${person}`]
    }
  })
}

function castPool(pairs: number, people: number, titles: number): QuizCastItem[] {
  const rng = seededRng(3)
  return Array.from({ length: pairs }, (_, i) => {
    const mediaId = Math.floor(rng() * titles) + 1
    const personId = Math.floor(rng() ** 2 * people) + 1
    return {
      personId,
      personName: `Actor ${personId}`,
      photoPath: `people/${personId}.jpg`,
      mediaId,
      mediaTitle: `Title ${mediaId}`,
      mediaType: i % 2 ? 'movie' : 'tv',
      coverPath: `media/${mediaId}.jpg`,
      year: 1970 + (i % 50),
      genres: ['Drama'],
      billingOrder: i % 10,
      validMediaIds: [mediaId]
    }
  })
}

function within<T>(budgetMs: number, build: () => T): T {
  const start = performance.now()
  const result = build()
  expect(Math.round(performance.now() - start)).toBeLessThan(budgetMs)
  return result
}

const media = screenLibrary(4500, 20000)
const challenge = (kind: QuizChallengeRequest['kind'], options?: QuizChallengeRequest['options']) =>
  ({ kind, seed: 1, length: 20, options }) as QuizChallengeRequest

describe('quiz deal builders at library scale', () => {
  it('deals a Voice Actor round from 50k character appearances', () => {
    expect(within(3000, () => buildVaQuizQuestions(vaPool(50000, 3000), 20, 1))).toHaveLength(20)
  })

  it('deals a Cast round from 20k actor-title pairs', () => {
    expect(within(2000, () => buildCastQuizQuestions(castPool(20000, 5000, 4000), 20, 1))).toHaveLength(20)
  })

  it('deals both Silhouette modes from 18k characters', () => {
    const characters = animeCharacters(media, 12)
    expect(within(1000, () => buildChallengeQuestions(challenge('silhouette'), media, characters))).toHaveLength(20)
    expect(
      within(1000, () =>
        buildChallengeQuestions(challenge('silhouette', { silhouetteMode: 'title' }), media, characters)
      )
    ).toHaveLength(20)
  })

  it('deals a Movie Chain and counts its endpoints over 3k screen titles', () => {
    expect(within(1500, () => buildChallengeQuestions(challenge('movieChain'), media))).toHaveLength(1)
    const chain: MovieChainCandidate[] = media
      .filter((item) => item.mediaType !== 'anime')
      .map((item) => ({
        key: String(item.id),
        label: item.title,
        aliases: [],
        imagePath: item.coverPath!,
        releaseYear: Number(item.releaseDate!.slice(0, 4)),
        mediaType: item.mediaType as 'movie' | 'tv',
        people: item.people
      }))
    const counts = within(2500, () => movieChainEndpointCounts(chain, 'both'))
    expect(counts.normal).toBeGreaterThan(0)
  })
})
