import { describe, expect, it } from 'vitest'
import { gradeOf, standParameters } from '../src/renderer/src/lib/standStats'

describe('JoJo Stand parameters', () => {
  it('grades on the anime scale, A best to E worst', () => {
    expect([0, 0.2, 0.5, 0.8, 1].map(gradeOf)).toEqual(['E', 'D', 'C', 'B', 'A'])
    expect(gradeOf(-1)).toBe('E')
    expect(gradeOf(4)).toBe('A')
  })

  it('reads every parameter from the title and spells out its value', () => {
    const params = standParameters({ score: 9, progress: 39, totalUnits: 39, rewatchCount: 1, favorite: true }, 10, 'episodes')
    expect(params.map((p) => p.label)).toEqual(['Power', 'Speed', 'Range', 'Durability', 'Precision', 'Potential'])
    expect(params.map((p) => p.grade)).toEqual(['A', 'A', 'D', 'D', 'A', 'E'])
    expect(params.map((p) => p.detail)).toEqual(['Score 9 / 10', '100% done', '39 episodes', '1 repeat pass', 'In favourites', '0 episodes left'])
  })

  it('keeps unknown lengths and missing scores readable instead of inventing values', () => {
    const params = standParameters({ score: null, progress: 12, totalUnits: null, rewatchCount: 0, favorite: false }, 100, 'chapters')
    expect(params.map((p) => p.detail)).toEqual(['Not scored', '12 chapters', 'Length unknown', '0 repeat passes', 'Not a favourite', 'Unknown'])
    expect(params[0].grade).toBe('E')
  })
})
