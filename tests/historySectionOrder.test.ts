import { describe, expect, it } from 'vitest'
import { orderSections, splitAtCourse } from '../src/shared/history/sectionOrder'
import type { Section } from '../src/shared/history/schema'

// Content files store sections in whatever order research wrote them; the article
// reads overview, background, causes, the course, then what followed.
const s = (kind: Section['kind'], id = kind): Section => ({ kind, quotes: [{ id } as Section['quotes'][number]] })

describe('History section order', () => {
  it('reads in SECTION_KINDS order, keeping stored order within a kind', () => {
    const got = orderSections([s('consequences'), s('background', 'b1'), s('overview'), s('background', 'b2'), s('causes')])
    expect(got.map((x) => x.quotes[0].id)).toEqual(['overview', 'b1', 'b2', 'causes', 'consequences'])
  })

  it('splits around the dated course of events', () => {
    const { before, after } = splitAtCourse([s('legacy'), s('aftermath'), s('course'), s('background'), s('overview')])
    expect(before.map((x) => x.kind)).toEqual(['overview', 'background', 'course'])
    expect(after.map((x) => x.kind)).toEqual(['aftermath', 'legacy'])
  })
})
