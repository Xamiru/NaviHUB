import { describe, expect, it } from 'vitest'
import {
  buildLibraryGridQuestion,
  availableLibraryGridHint,
  libraryGridMatching,
  libraryGridScore,
  searchScreenTitles,
  type LibraryGridCandidate
} from '../src/shared/libraryGrid'

function gridCandidates(): LibraryGridCandidate[] {
  const out: LibraryGridCandidate[] = []
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      for (let copy = 0; copy < 2; copy++) {
        const id = row * 6 + column * 2 + copy + 1
        out.push({
          key: String(id),
          label: `Title ${id}`,
          aliases: id === 1 ? ['The First Alias'] : [],
          imagePath: `media/${id}.jpg`,
          releaseYear: column === 1 ? 2002 : 1992,
          mediaType: id % 2 ? 'movie' : 'tv',
          genres: [column === 0 ? 'Drama' : column === 2 ? 'Science Fiction' : 'Thriller'],
          people: row === 0
            ? [{ id: 10, name: 'Row Actor', role: 'actor', billingOrder: 0 }]
            : row === 1
              ? [{ id: 20, name: 'Row Director', role: 'director', billingOrder: null }]
              : [],
          companies: row === 2 ? [{ id: 30, name: 'Row Company' }] : []
        })
      }
    }
  }
  return out
}

describe('Library Grid', () => {
  it('builds deterministic, solvable boards with diverse clue families', () => {
    const first = buildLibraryGridQuestion(gridCandidates(), 44, 'both')
    const second = buildLibraryGridQuestion(gridCandidates(), 44, 'both')
    expect(first).toEqual(second)
    expect(first).not.toBeNull()
    expect(first!.cells).toHaveLength(9)
    expect(new Set([...first!.rows, ...first!.columns].map((clue) => clue.kind)).size).toBeGreaterThanOrEqual(3)
    expect(first!.cells.every((cell) => cell.validKeys.length >= 2)).toBe(true)
    expect(new Set(first!.cells.map((cell) => cell.revealKey)).size).toBe(9)
    expect(libraryGridMatching(first!.cells.map((cell) => cell.validKeys))).not.toBeNull()
  })

  it('gives every cell one valid and two invalid hint choices', () => {
    const question = buildLibraryGridQuestion(gridCandidates(), 99, 'both')!
    for (const cell of question.cells) {
      expect(cell.hintChoices).toHaveLength(3)
      expect(cell.hintChoices.filter((key) => cell.validKeys.includes(key))).toHaveLength(1)
    }
    const first = question.cells[0]
    const originalValid = first.hintChoices.find((key) => first.validKeys.includes(key))!
    const available = availableLibraryGridHint(first, question.titles.map((title) => title.key), [originalValid])
    expect(available).toHaveLength(3)
    expect(available.filter((key) => first.validKeys.includes(key))).toHaveLength(1)
    expect(available).not.toContain(originalValid)
  })

  it('searches aliases, ranks prefix matches, and excludes used titles', () => {
    const titles = gridCandidates()
    expect(searchScreenTitles(titles, 'first alias')[0].key).toBe('1')
    expect(searchScreenTitles(titles, 'Title 1', ['1']).some((title) => title.key === '1')).toBe(false)
  })

  it('scores unaided, hinted, and invalid submissions with a zero floor', () => {
    expect(libraryGridScore({ unaidedCells: 5, hintedCells: 4, invalidGuesses: 3 })).toBe(630)
    expect(libraryGridScore({ unaidedCells: 0, hintedCells: 0, invalidGuesses: 50 })).toBe(0)
  })
})
