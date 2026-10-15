import { describe, expect, it } from 'vitest'
import {
  buildLibraryGridQuestion,
  availableLibraryGridHint,
  libraryGridKnownClueKeys,
  libraryGridMatching,
  libraryGridMissReason,
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

  it('accepts any acting credit as an answer although the board is built from top billing', () => {
    const candidates = gridCandidates()
    // Billed 13th: never builds the board, but truly matches "Cast: Row Actor".
    candidates.push({
      ...candidates[0],
      key: 'deep',
      label: 'Deep Cut',
      aliases: [],
      people: [{ id: 10, name: 'Row Actor', role: 'actor', billingOrder: 12 }]
    })
    const question = buildLibraryGridQuestion(candidates, 44, 'both')!
    const actorClue = [...question.rows, ...question.columns].find((clue) => clue.key === 'actor:10')
    expect(actorClue?.label).toBe('Cast: Row Actor')
    expect(actorClue?.matchKeys).toContain('deep')
    const rowIndex = question.rows.findIndex((clue) => clue.key === 'actor:10')
    const columnIndex = question.columns.findIndex((clue) => clue.key === 'actor:10')
    const cells = question.cells.filter((cell) => cell.row === rowIndex || cell.column === columnIndex)
    const genreCell = cells.find((cell) => {
      const other = cell.row === rowIndex ? question.columns[cell.column] : question.rows[cell.row]
      return other.matchKeys.includes('deep')
    })
    expect(genreCell?.validKeys).toContain('deep')
  })

  it('draws company clues only from the largest studios', () => {
    const candidates: LibraryGridCandidate[] = []
    let id = 0
    // Fourteen companies of 6..19 titles: only the twelve largest qualify.
    for (let company = 0; company < 14; company++) {
      for (let n = 0; n < 6 + company; n++) {
        id++
        candidates.push({
          key: String(id), label: `Studio Film ${id}`, aliases: [], imagePath: `media/${id}.jpg`,
          releaseYear: 2000, mediaType: 'movie', genres: [], people: [],
          companies: [{ id: 100 + company, name: `Company ${company}` }]
        })
      }
    }
    const keys = libraryGridKnownClueKeys(candidates).filter((key) => key.startsWith('company:'))
    expect(keys).toHaveLength(12)
    expect(keys).not.toContain('company:100')
    expect(keys).not.toContain('company:101')
  })

  it('names the fact a rejected title fails', () => {
    const row = { label: 'Cast: A', matchKeys: ['1', '2'] }
    const column = { label: 'Genre: Drama', matchKeys: ['2', '3'] }
    expect(libraryGridMissReason(row, column, '1')).toBe('Matches Cast: A, but not Genre: Drama')
    expect(libraryGridMissReason(row, column, '3')).toBe('Matches Genre: Drama, but not Cast: A')
    expect(libraryGridMissReason(row, column, '9')).toBe('Matches neither Cast: A nor Genre: Drama')
  })

  it('scores unaided, hinted, and invalid submissions with a zero floor', () => {
    expect(libraryGridScore({ unaidedCells: 5, hintedCells: 4, invalidGuesses: 3 })).toBe(630)
    expect(libraryGridScore({ unaidedCells: 0, hintedCells: 0, invalidGuesses: 50 })).toBe(0)
  })
})
