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

describe('History lint: apparatus inside quotes', () => {
  it('flags figure references and numbered recitals', () => {
    const keys = lint((all) => {
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.sections[0].quotes.push({ ...q('q95'), text: 'The quake destroyed most of the city (FIGURE 1).' })
      e.sections[0].quotes.push({ ...q('q96'), text: 'C. whereas the enclave fell in July.' })
    })
    expect(keys).toContain('ocr|event:sample-revolution|q95')
    expect(keys).toContain('ocr|event:sample-revolution|q96')
  })
})

describe('History lint: titles in other languages', () => {
  it('asks an event title in another language for a source', () => {
    const keys = lint((all) => {
      find<HistoryEvent>(all, 'event', 'sample-revolution').names.push({ text: 'Révolution', lang: 'fr', role: 'alternative' })
    })
    expect(keys.some((k) => k.startsWith('uncited-title|event:sample-revolution|names['))).toBe(true)
  })

  it('accepts a cited title and leaves personal names alone', () => {
    const keys = lint((all) => {
      find<HistoryEvent>(all, 'event', 'sample-revolution').names.push({ text: 'Révolution', lang: 'fr', role: 'alternative', cites: [{ source: 'book-a', loc: { page: '2' } }] })
    })
    expect(keys.filter((k) => k.startsWith('uncited-title|event:'))).toEqual(lint().filter((k) => k.startsWith('uncited-title|event:')))
    expect(keys.filter((k) => k.startsWith('uncited-title|person:'))).toEqual([])
  })
})

describe('History lint: dates and invisible characters', () => {
  it('flags a day paired with a coarser form of itself as a false dispute', () => {
    const keys = lint((all) => {
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.start = { alts: [{ value: { d: '1978-01-07' }, cites: [{ source: 'book-a', loc: { page: '1' } }] }, { value: { d: '1978' }, cites: [{ source: 'book-a', loc: { page: '2' } }] }] }
    })
    expect(keys).toContain('false-dispute|event:sample-revolution|start')
  })

  it('leaves two different days alone', () => {
    const keys = lint((all) => {
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.start = { alts: [{ value: { d: '1978-01-07' }, cites: [{ source: 'book-a', loc: { page: '1' } }] }, { value: { d: '1978-01-09' }, cites: [{ source: 'book-a', loc: { page: '2' } }] }] }
    })
    expect(keys.filter((k) => k.startsWith('false-dispute'))).toEqual([])
  })

  it('flags invisible characters copied into a quote', () => {
    const keys = lint((all) => {
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.sections[0].quotes.push({ ...q('q97'), text: 'The crowd ga­thered.' })
    })
    expect(keys).toContain('ocr|event:sample-revolution|q97')
  })
})

describe('History lint: pins, narrators and openers', () => {
  it('asks a leading event for a located place', () => {
    // The fixture's prominence-1 event names no place with coordinates.
    expect(lint()).toContain('unpinned|event:sample-revolution|')
  })

  it('flags a primary source narrating an event, but not in its own words', () => {
    const chronicle = (all: HistoryEntity[]): void => {
      const book = find<HistorySource>(all, 'source', 'book-a')
      all.push({ ...book, id: 'chronicle', type: 'primary' })
    }
    const narrated = lint((all) => {
      chronicle(all)
      find<HistoryEvent>(all, 'event', 'sample-revolution').sections[0].quotes.push({ ...q('q98', 'chronicle'), text: 'The shah won a great victory.' })
    })
    expect(narrated).toContain('primary-narration|event:sample-revolution|q98')
    const ownWords = lint((all) => {
      chronicle(all)
      find<HistoryEvent>(all, 'event', 'sample-revolution').sections.push({ kind: 'in-their-words', quotes: [{ ...q('q99', 'chronicle'), text: 'The shah won a great victory.' }] })
    })
    expect(ownWords.filter((k) => k.startsWith('primary-narration'))).toEqual([])
  })

  it('flags a leading page that opens on a pre-1950 work', () => {
    const keys = lint((all) => {
      const book = find<HistorySource>(all, 'source', 'book-a')
      book.date = '1911'
      const e = find<HistoryEvent>(all, 'event', 'sample-revolution')
      e.sections[0].quotes.unshift({ ...q('q100'), text: 'The revolution overthrew the monarchy.' })
    })
    expect(keys).toContain('dated-opener|event:sample-revolution|q100')
  })
})
