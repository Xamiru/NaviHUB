import { describe, expect, it, vi } from 'vitest'
vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))
import {
  checkpointSpan,
  KANJI_CHECKPOINTS,
  nextDeckStep,
  trackTarget,
  WORD_CHECKPOINTS
} from '../src/shared/japanese/pathTracks'
import { SEED_PACKS } from '../src/main/db/japaneseSeed'

const order = new Map(SEED_PACKS.map((p, i) => [p.key, i]))

describe('path tracks', () => {
  for (const [name, list] of [
    ['words', WORD_CHECKPOINTS],
    ['kanji', KANJI_CHECKPOINTS]
  ] as const) {
    it(`${name}: checkpoints name real courses in path order with rising targets`, () => {
      for (const cp of list) expect(order.has(cp.seedKey), cp.seedKey).toBe(true)
      for (let i = 1; i < list.length; i++) {
        expect(order.get(list[i].seedKey)!).toBeGreaterThan(order.get(list[i - 1].seedKey)!)
        expect(list[i].target).toBeGreaterThan(list[i - 1].target)
      }
    })
  }

  it('reaches reading-level totals with the curated courses', () => {
    const curated = (kind: string) =>
      SEED_PACKS.flatMap((p) => p.course.lessons)
        .filter((l) => l.kind === kind)
        .reduce((n, l) => n + l.cards.length, 0)
    expect(WORD_CHECKPOINTS.at(-1)!.target + curated('vocab')).toBeGreaterThanOrEqual(10000)
    const kanjiCards = SEED_PACKS.filter((p) => /Kanji/.test(p.course.title) && !/Radicals/.test(p.course.title))
      .flatMap((p) => p.course.lessons)
      .reduce((n, l) => n + l.cards.length, 0)
    expect(KANJI_CHECKPOINTS.at(-1)!.target + kanjiCards).toBeGreaterThanOrEqual(2100)
  })

  it('targets follow cleared courses only', () => {
    const c = (seedKey: string, learned: number) => ({ seedKey, lessonCount: 5, learnedLessonCount: learned })
    expect(trackTarget('words', [c('kanji', 4)])).toBe(0)
    expect(trackTarget('words', [c('kanji', 5), c('n4vocab', 5)])).toBe(1000)
    expect(trackTarget('kanji', [c('n3', 5), c('n3b', 2)])).toBe(100)
    expect(checkpointSpan('words', 'n3')).toEqual({ from: 1000, to: 1500 })
    expect(checkpointSpan('words', 'n5')).toBeNull()
  })

  it('a built deck lesson comes before a new deck; kanji take every third day', () => {
    const none = { built: 0, target: 0, nextLesson: null }
    expect(nextDeckStep({ words: none, kanji: none }, 0)).toBeNull()
    const behind = { built: 500, target: 1000, nextLesson: null }
    expect(nextDeckStep({ words: behind, kanji: none }, 0)?.title).toBe('Build your next core word deck')
    const open = { built: 500, target: 500, nextLesson: { id: 7, title: 'Most frequent 1–25', courseTitle: 'Core frequency deck #1' } }
    expect(nextDeckStep({ words: open, kanji: none }, 0)?.route).toBe('/japanese/lessons/7')
    const kanjiBehind = { built: 0, target: 100, nextLesson: null }
    expect(nextDeckStep({ words: behind, kanji: kanjiBehind }, 1)?.track).toBe('words')
    expect(nextDeckStep({ words: behind, kanji: kanjiBehind }, 2)?.track).toBe('kanji')
  })
})
