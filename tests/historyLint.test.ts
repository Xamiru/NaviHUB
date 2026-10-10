import { describe, expect, it } from 'vitest'
import { lintCatalog } from '../src/shared/history/lint'
import { buildCatalog } from '../src/shared/history/model'
import type { HistoryEntity, HistoryEvent, HistoryInterpretation, HistorySource } from '../src/shared/history/schema'
import { fixture, q } from './historyFixture'

function lint(edit: (entities: HistoryEntity[]) => void = () => {}): string[] {
  const entities = fixture().map((e) => structuredClone(e.entity))
  edit(entities)
  return lintCatalog(buildCatalog(entities), entities).map((i) => `${i.code}|${i.ref}|${i.path ?? ''}`)
}

const find = <T extends HistoryEntity>(entities: HistoryEntity[], kind: string, id: string): T =>
  entities.find((e) => e.kind === kind && e.id === id) as T

describe('History lint: government claims', () => {
  it('asks every government claim for an independent assessment', () => {
    expect(lint()).toContain('claim-unanswered|interpretation:sample-revolution-causes|positions[1]')
    const answered = lint((all) => {
      find<HistoryInterpretation>(all, 'interpretation', 'sample-revolution-causes').positions[1].reception = [q('r1')]
    })
    expect(answered.filter((k) => k.startsWith('claim-unanswered'))).toEqual([])
  })

  it('keeps a state outlet inside its own government claim', () => {
    const outlet = (all: HistoryEntity[]): void => {
      const page = find<HistorySource>(all, 'source', 'web-page')
      all.push({ ...page, id: 'outlet', url: 'https://english.khamenei.ir/news/1' })
      find<HistoryInterpretation>(all, 'interpretation', 'sample-revolution-causes').positions[1].statements.push(q('s8', 'outlet'))
    }
    // Quoted inside the government's own claim: allowed.
    expect(lint(outlet).filter((k) => k.startsWith('state-outlet'))).toEqual([])

    const asFact = lint((all) => {
      outlet(all)
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.sections[0].quotes.push(q('q90', 'outlet'))
    })
    expect(asFact).toContain('state-outlet|event:sample-revolution|outlet')

    const asReception = lint((all) => {
      outlet(all)
      find<HistoryInterpretation>(all, 'interpretation', 'sample-revolution-causes').positions[0].statements.push(q('s9', 'outlet'))
    })
    expect(asReception).toContain('state-outlet|interpretation:sample-revolution-causes|positions[0]')
  })
})

describe('History lint: section openers', () => {
  it('flags a section that opens mid-story', () => {
    const keys = lint((all) => {
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.sections.push({ kind: 'consequences', quotes: [{ ...q('q91'), text: 'A few days later, the cabinet fell.' }] })
    })
    expect(keys).toContain('section-opener|event:sample-revolution|q91')
  })

  it('flags a section that opens inside a sentence', () => {
    const keys = lint((all) => {
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.sections.push({ kind: 'consequences', quotes: [{ ...q('q93'), text: 'talks between the two courts began.' }] })
    })
    expect(keys).toContain('section-opener|event:sample-revolution|q93')
  })

  it('leaves a section that names its subject alone', () => {
    const keys = lint((all) => {
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.sections.push({ kind: 'consequences', quotes: [{ ...q('q92'), text: 'The revolution ended the monarchy.' }] })
    })
    expect(keys.filter((k) => k.startsWith('section-opener'))).toEqual([])
  })
})

describe('History lint: quotes cut badly', () => {
  it('flags a quote that starts inside a sentence, in an interpretation too', () => {
    const keys = lint((all) => {
      find<HistoryInterpretation>(all, 'interpretation', 'sample-revolution-causes').positions[0].statements.push({ ...q('s7'), text: 'and so the regime fell.' })
    })
    expect(keys).toContain('fragment|interpretation:sample-revolution-causes|s7')
  })

  it('accepts names that start lowercase', () => {
    const keys = lint((all) => {
      find<HistoryInterpretation>(all, 'interpretation', 'sample-revolution-causes').positions[0].statements.push({ ...q('s7'), text: 'al-Afghani argued for reform.' })
    })
    expect(keys.filter((k) => k.startsWith('fragment'))).toEqual([])
  })

  it('accepts quotes that open with an abbreviation', () => {
    const keys = lint((all) => {
      const s = find<HistoryInterpretation>(all, 'interpretation', 'sample-revolution-causes').positions[0].statements
      s.push({ ...q('s7'), text: 'c. 1990 the regime fell.' })
      s.push({ ...q('s8'), text: 'e.g. the army refused.' })
    })
    expect(keys.filter((k) => k.startsWith('fragment'))).toEqual([])
  })

  it('flags a paragraph locator that is not a paragraph number', () => {
    const keys = lint((all) => {
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.sections[0].quotes.push({ ...q('q94'), text: 'The crowd gathered.', cite: { source: 'book-a', loc: { para: '-1' } } })
    })
    expect(keys).toContain('bad-locator|event:sample-revolution|q94')
  })
})
