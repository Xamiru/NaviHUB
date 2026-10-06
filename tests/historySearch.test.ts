import { describe, expect, it } from 'vitest'
import { normalizeForSearch, prepareDocs, searchDocs } from '../src/shared/history/search'

describe('History search normaliser', () => {
  it('folds case, punctuation and diacritics', () => {
    expect(normalizeForSearch('Jeanne d’Arc')).toBe('jeanne d arc')
    expect(normalizeForSearch('Ёлкин')).toBe('елкин')
    expect(normalizeForSearch('Mossadegh-Era')).toBe('mossadegh era')
  })

  it('unifies Arabic and Persian letter forms, joiners and digits', () => {
    expect(normalizeForSearch('علي')).toBe(normalizeForSearch('علی'))
    expect(normalizeForSearch('كرمان')).toBe(normalizeForSearch('کرمان'))
    expect(normalizeForSearch('آبادان')).toBe(normalizeForSearch('ابادان'))
    expect(normalizeForSearch('روح‌الله')).toBe('روحالله')
    expect(normalizeForSearch('انقلاب ۱۳۵۷')).toBe('انقلاب 1357')
  })
})

describe('History search ranking', () => {
  const docs = prepareDocs([
    { ref: 'event:iranian-revolution', kind: 'event', title: 'Iranian Revolution', names: ['Iranian Revolution', 'انقلاب ۱۳۵۷'] },
    { ref: 'event:revolution-of-1905', kind: 'event', title: '1905 Russian Revolution', names: ['1905 Russian Revolution'] },
    { ref: 'person:ruhollah-khomeini', kind: 'person', title: 'Ruhollah Khomeini', names: ['Ruhollah Khomeini', 'روح‌الله خمینی'] },
    { ref: 'event:revolution', kind: 'event', title: 'Revolution', names: ['Revolution'], text: ['a quoted passage about oil'] }
  ])

  it('orders exact, prefix, word and substring matches', () => {
    // Exact first; equal word matches fall back to title order.
    expect(searchDocs(docs, 'revolution').map((h) => [h.ref, h.score])).toEqual([
      ['event:revolution', 100],
      ['event:revolution-of-1905', 60],
      ['event:iranian-revolution', 60]
    ])
    expect(searchDocs(docs, 'iran')[0]).toMatchObject({ ref: 'event:iranian-revolution', score: 80 })
    expect(searchDocs(docs, 'olution').every((h) => h.score === 40)).toBe(true)
  })

  it('finds Persian names however the compound is written', () => {
    expect(searchDocs(docs, 'روح الله')[0].ref).toBe('person:ruhollah-khomeini')
    expect(searchDocs(docs, 'روحالله')[0].ref).toBe('person:ruhollah-khomeini')
    expect(searchDocs(docs, '1357')[0].ref).toBe('event:iranian-revolution')
  })

  it('falls back to quote text only for queries of three characters or more', () => {
    expect(searchDocs(docs, 'oil')).toEqual([expect.objectContaining({ ref: 'event:revolution', score: 10 })])
    expect(searchDocs(docs, 'oi')).toEqual([])
    expect(searchDocs(docs, '   ')).toEqual([])
  })
})
