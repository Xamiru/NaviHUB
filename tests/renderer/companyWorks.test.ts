import { describe, expect, it } from 'vitest'
import type { MediaItem } from '../../src/shared/types'
import { pickTopWorks, sortWorks } from '../../src/renderer/src/lib/companyWorks'

const work = (id: number, releaseDate: string | null, score: number | null = null, status: string | null = null) =>
  ({ id, title: `T${id}`, releaseDate, score, status, mediaType: 'anime' }) as MediaItem

describe('company works', () => {
  const works = [work(1, '2010-01-01', 70), work(2, null, 90), work(3, '2020-01-01'), work(4, '2015-01-01', 70)]

  it('sorts by date with undated works last both ways', () => {
    expect(sortWorks(works, 'newest').map((m) => m.id)).toEqual([3, 4, 1, 2])
    expect(sortWorks(works, 'oldest').map((m) => m.id)).toEqual([1, 4, 3, 2])
  })

  it('sorts by the user score, unscored last, ties newest first', () => {
    expect(sortWorks(works, 'score').map((m) => m.id)).toEqual([2, 4, 1, 3])
  })

  it('picks scored works, then finished unscored ones, never the rest', () => {
    const pool = [work(1, '2010-01-01', 60), work(2, '2012-01-01', null, 'Completed'), work(3, '2020-01-01', null, 'Completed'), work(4, '2021-01-01')]
    expect(pickTopWorks(pool, (m) => m.status === 'Completed').map((m) => m.id)).toEqual([1, 3, 2])
  })
})
