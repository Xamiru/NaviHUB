import { describe, expect, it } from 'vitest'
import { datedNarration, isOlderScholarship } from '../src/shared/history/sourceAge'
import type { HistoryEntity, HistorySource } from '../src/shared/history/schema'
import { fixture, q } from './historyFixture'

const src = (id: string, type: HistorySource['type'], date: string): HistorySource =>
  ({ id, type, date, title: id, lang: 'en', contributors: [] }) as unknown as HistorySource

describe('History source age', () => {
  it('marks only scholarship published before 1950', () => {
    expect(isOlderScholarship(src('a', 'encyclopedia', '1911'))).toBe(true)
    expect(isOlderScholarship(src('b', 'book', '1987'))).toBe(false)
    // A primary text or a newspaper is as old as it is meant to be.
    expect(isOlderScholarship(src('c', 'primary', '1514'))).toBe(false)
    expect(isOlderScholarship(src('d', 'newspaper', '1905'))).toBe(false)
    expect(isOlderScholarship(src('e', 'web', 'n.d.'))).toBe(false)
  })

  it('measures how much of a page narrative rests on older scholarship', () => {
    const event = fixture().map((e) => structuredClone(e.entity)).find((e) => e.kind === 'event') as HistoryEntity & {
      sections: Array<{ kind: string; quotes: ReturnType<typeof q>[] }>
    }
    event.sections = [
      { kind: 'overview', quotes: [q('q1', 'eb1911'), q('q2', 'modern')] },
      { kind: 'course', quotes: [q('q3', 'eb1911')] },
      // The subject's own words never count as narration.
      { kind: 'in-their-words', quotes: [q('q4', 'eb1911')] }
    ]
    delete (event as { course?: unknown }).course
    const sources: Record<string, HistorySource> = { eb1911: src('eb1911', 'encyclopedia', '1911'), modern: src('modern', 'book', '2009') }
    expect(datedNarration(event, (id) => sources[id])).toEqual({ share: 2 / 3, oldest: 1911 })
    expect(datedNarration(event, (id) => (id === 'eb1911' ? src('x', 'book', '1999') : sources[id]))).toBeNull()
  })
})
