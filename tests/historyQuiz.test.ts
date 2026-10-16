import { describe, expect, it } from 'vitest'
import { seededRng } from '../src/shared/quizCore'
import { shapeContains, stateAtPoint } from '../src/shared/history/mapGeometry'
import {
  chronologyDeal,
  dateDeal,
  mapStateDeal,
  namesSpeaker,
  titleGivesYear,
  quoteDeal,
  yearStep,
  type QuizEventFact,
  type QuizQuoteFact,
  type QuizSpeakerFact
} from '../src/shared/history/quiz'
import type { HistoryBorders, HistoryMapUnit } from '../src/shared/types'

const events: QuizEventFact[] = Array.from({ length: 40 }, (_, i) => ({
  ref: `event:e${i}`,
  title: `Event ${i}`,
  s: 1500 + i * 3 + 0.25,
  year: 1500 + i * 3,
  uncertain: i % 10 === 9
}))

describe('History chronology deal', () => {
  it('deals boards of five events with different years, ordered by date, never reusing an event', () => {
    const boards = chronologyDeal(events, 5, seededRng(7))
    expect(boards).toHaveLength(5)
    const seen = new Set<string>()
    for (const b of boards) {
      if (b.kind !== 'historyChronology') throw new Error('kind')
      expect(b.validKeys).toHaveLength(5)
      const years = b.validKeys.map((k) => Number(b.years[k]))
      expect(years).toEqual([...years].sort((x, y) => x - y))
      expect(new Set(years).size).toBe(5)
      for (const k of b.validKeys) {
        expect(seen.has(k)).toBe(false)
        seen.add(k)
        // Disputed or approximate years never go on a board.
        expect(events.find((e) => e.ref === k)!.uncertain).toBe(false)
      }
      // A board stays within one era: no wider than the window around its anchor.
      expect(Math.max(...years) - Math.min(...years)).toBeLessThanOrEqual(24 * 3)
    }
  })

  it('deals the same round for the same seed', () => {
    expect(chronologyDeal(events, 3, seededRng(11))).toEqual(chronologyDeal(events, 3, seededRng(11)))
  })
})

describe('History quiz: titles that give the date away', () => {
  it('spots a year in a title', () => {
    expect(titleGivesYear('Siege of Vienna (1529)')).toBe(true)
    expect(titleGivesYear('Bengal famine of 1943')).toBe(true)
    expect(titleGivesYear('2000 Iranian legislative election')).toBe(true)
    expect(titleGivesYear('Battle of Chaldiran')).toBe(false)
    expect(titleGivesYear('Group of 77')).toBe(false)
  })

  it('leaves those events out of chronology boards and year questions', () => {
    const titled = events.map((e, i) => (i % 2 ? { ...e, title: `Treaty of ${e.year}` } : e))
    const used = [...chronologyDeal(titled, 3, seededRng(1)).flatMap((b) => b.validKeys), ...dateDeal(titled, 40, seededRng(1), 2026).map((q) => q.key)]
    expect(used.length).toBeGreaterThan(0)
    expect(used.every((ref) => !titled.find((e) => e.ref === ref)!.title.startsWith('Treaty'))).toBe(true)
  })
})

describe('History date deal', () => {
  it('offers the right year and three of its era, none in the future', () => {
    const recent: QuizEventFact[] = [{ ref: 'event:x', title: 'X', s: 2024.5, year: 2024, uncertain: false }]
    const [q] = dateDeal(recent, 1, seededRng(3), 2026)
    expect(q.validKeys).toEqual(['2024'])
    expect(q.choices).toHaveLength(4)
    expect(q.choices.every((c) => Number(c.key) <= 2026)).toBe(true)
    expect(new Set(q.choices.map((c) => c.key)).size).toBe(4)
  })

  it('spaces wrong years by era and skips uncertain dates', () => {
    expect([yearStep(1979), yearStep(1750), yearStep(1514), yearStep(800), yearStep(-480)]).toEqual([2, 5, 10, 25, 50])
    const deal = dateDeal(events, 40, seededRng(5), 2026)
    expect(deal.every((q) => !events.find((e) => e.ref === q.key)!.uncertain)).toBe(true)
    const bce = dateDeal([{ ref: 'event:t', title: 'T', s: -479, year: -479, uncertain: false }], 1, seededRng(1), 2026)[0]
    expect(bce.choices.find((c) => c.key === '-479')!.label).toBe('480 BCE')
  })
})

describe('History quote deal', () => {
  const speakers = new Map<string, QuizSpeakerFact>(
    ['Abbas I', 'Ismail I', 'Tahmasp I', 'Nader Shah', 'Karim Khan Zand'].map((name, i) => [
      `person:p${i}`,
      { ref: `person:p${i}`, title: name, born: 1500 + i * 40, names: [name] }
    ])
  )
  const quote = (key: string, speaker: string, text: string): QuizQuoteFact => ({
    key,
    page: speaker,
    speaker,
    text,
    lang: 'en',
    translation: null,
    source: 'A source'
  })

  it('skips passages that name their speaker', () => {
    expect(namesSpeaker('I, Abbas, decree it.', ['Abbas I'])).toBe(true)
    expect(namesSpeaker('The embassy came.', ['Abbas I'])).toBe(false)
    expect(namesSpeaker('Abbasid rule ended.', ['Abbas I'])).toBe(false)
    const deal = quoteDeal([quote('a', 'person:p0', 'I, Abbas, decree it.'), quote('b', 'person:p1', 'Let the order be kept.')], speakers, 5, seededRng(2))
    expect(deal.map((q) => q.key)).toEqual(['b'])
  })

  it('offers the speaker and three others nearest in birth year', () => {
    const [q] = quoteDeal([quote('b', 'person:p1', 'Let the order be kept.')], speakers, 1, seededRng(9))
    expect(q.validKeys).toEqual(['person:p1'])
    expect(q.choices).toHaveLength(4)
    expect(q.choices.map((c) => c.key)).toContain('person:p1')
  })
})

// A unit square around (0..10, 0..10) and another at (20..30, 0..10), in
// delta-encoded rings with a quantum of 1 degree.
const square = (x: number): number[] => [x, 0, 10, 0, 0, 10, -10, 0, 0, -10]
const unit = (name: string, shape: number, label: [number, number], set: HistoryMapUnit['set'] = 'world'): HistoryMapUnit => ({
  set,
  name,
  code: shape,
  from: 1886,
  to: 2020,
  shape,
  label,
  capital: null,
  capitalAt: null
})
const borders: HistoryBorders = {
  attribution: '',
  url: '',
  quantum: 1,
  worldFrom: 1886,
  shapes: [[square(0)], [square(20)], [square(40)], [square(60)]],
  units: [unit('West', 0, [5, 5]), unit('East', 1, [25, 5]), unit('Far', 2, [45, 5]), unit('Farther', 3, [65, 5])]
}

describe('History map deal', () => {
  it('finds the state over a point and its neighbours that year', () => {
    expect(shapeContains([square(0)], 1, 5, 5)).toBe(true)
    expect(shapeContains([square(0)], 1, 15, 5)).toBe(false)
    const hit = stateAtPoint(borders, 1950, 22, 3)!
    expect(hit.unit.name).toBe('East')
    expect(hit.others.map((u) => u.name)).toEqual(['West', 'Far', 'Farther'])
    expect(stateAtPoint(borders, 1950, 15, 5)).toBeNull()
    expect(stateAtPoint(borders, 1700, 5, 5)).toBeNull()
  })

  it('asks only about places that fall inside a state', () => {
    const lookup = (lon: number, lat: number, year: number) => {
      const hit = stateAtPoint(borders, year, lon, lat)
      return hit ? { answer: hit.unit.name, others: hit.others.map((u) => u.name), approximate: hit.approximate } : null
    }
    const places = [
      { key: 'a', event: 'event:a', eventTitle: 'A', place: 'Inland', lon: 5, lat: 5, year: 1950 },
      { key: 'b', event: 'event:b', eventTitle: 'B', place: 'At sea', lon: 15, lat: 5, year: 1950 }
    ]
    const deal = mapStateDeal(places, lookup, 2, seededRng(4))
    expect(deal).toHaveLength(1)
    expect(deal[0]).toMatchObject({ kind: 'historyMapState', place: 'Inland', validKeys: ['West'] })
    expect(deal[0].choices.map((c) => c.key).sort()).toEqual(['East', 'Far', 'Farther', 'West'])
  })
})
