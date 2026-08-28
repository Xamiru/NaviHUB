import type {
  QuizLibraryGridCell,
  QuizLibraryGridClue,
  QuizLibraryGridClueKind,
  QuizLibraryGridQuestion,
  QuizScreenMediaMode,
  QuizScreenTitle
} from './types'
import { seededRng } from './quizCore'
import { shuffle } from './shuffle'

export interface LibraryGridCandidate extends QuizScreenTitle {
  genres: string[]
  people: Array<{
    id: number
    name: string
    role: string
    billingOrder?: number | null
  }>
  companies: Array<{ id: number; name: string }>
}

interface IndexedClue extends QuizLibraryGridClue {
  mediaIds: Set<string>
}

export interface LibraryGridScoreInput {
  unaidedCells: number
  hintedCells: number
  invalidGuesses: number
}

export function libraryGridScore(input: LibraryGridScoreInput): number {
  return Math.max(0, input.unaidedCells * 100 + input.hintedCells * 40 - input.invalidGuesses * 10)
}

export function normalizeLibraryTitle(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

export function searchScreenTitles(
  titles: readonly QuizScreenTitle[],
  query: string,
  excludedKeys: readonly string[] = [],
  limit = 8
): QuizScreenTitle[] {
  const needle = normalizeLibraryTitle(query)
  const excluded = new Set(excludedKeys)
  return titles
    .filter((title) => !excluded.has(title.key))
    .map((title) => {
      const values = [title.label, ...title.aliases].map(normalizeLibraryTitle).filter(Boolean)
      let rank = needle ? Number.POSITIVE_INFINITY : 10
      for (const value of values) {
        if (value === needle) rank = Math.min(rank, 0)
        else if (value.startsWith(needle)) rank = Math.min(rank, 1)
        else if (value.split(' ').some((part) => part.startsWith(needle))) rank = Math.min(rank, 2)
        else if (value.includes(needle)) rank = Math.min(rank, 3)
      }
      return { title, rank }
    })
    .filter((entry) => Number.isFinite(entry.rank))
    .sort(
      (a, b) =>
        a.rank - b.rank ||
        a.title.label.localeCompare(b.title.label, undefined, { sensitivity: 'base' })
    )
    .slice(0, Math.max(0, limit))
    .map((entry) => entry.title)
}

export function screenMediaMatches(mode: QuizScreenMediaMode, mediaType: string): boolean {
  return mode === 'both' ? mediaType === 'movie' || mediaType === 'tv' : mediaType === mode
}

function indexClues(media: readonly LibraryGridCandidate[]): IndexedClue[] {
  const clues = new Map<string, IndexedClue>()
  const add = (key: string, kind: QuizLibraryGridClueKind, label: string, mediaKey: string) => {
    const found = clues.get(key) ?? { key, kind, label, mediaIds: new Set<string>() }
    found.mediaIds.add(mediaKey)
    clues.set(key, found)
  }
  for (const item of media) {
    for (const person of item.people) {
      const topActor =
        person.role === 'actor' &&
        person.billingOrder != null &&
        person.billingOrder >= 0 &&
        person.billingOrder < 10
      if (topActor) add(`actor:${person.id}`, 'actor', `Main cast: ${person.name}`, item.key)
      if (person.role === 'director') {
        add(`director:${person.id}`, 'director', `Directed by ${person.name}`, item.key)
      }
    }
    for (const genre of new Set(item.genres.map((value) => value.trim()).filter(Boolean))) {
      add(`genre:${normalizeLibraryTitle(genre)}`, 'genre', `Genre: ${genre}`, item.key)
    }
    for (const company of new Map(item.companies.map((value) => [value.id, value])).values()) {
      add(`company:${company.id}`, 'company', `Company: ${company.name}`, item.key)
    }
    if (item.releaseYear != null) {
      const decade = Math.floor(item.releaseYear / 10) * 10
      add(`decade:${decade}`, 'decade', `Released in the ${decade}s`, item.key)
    }
  }
  return [...clues.values()].filter((clue) => clue.mediaIds.size >= 6)
}

function intersect(a: ReadonlySet<string>, b: ReadonlySet<string>): string[] {
  const [small, large] = a.size <= b.size ? [a, b] : [b, a]
  return [...small].filter((key) => large.has(key))
}

export function libraryGridMatching(cells: readonly (readonly string[])[]): string[] | null {
  const order = cells
    .map((keys, index) => ({ index, keys: [...new Set(keys)] }))
    .sort((a, b) => a.keys.length - b.keys.length || a.index - b.index)
  const used = new Set<string>()
  const answer = new Array<string>(cells.length)
  const visit = (position: number): boolean => {
    if (position === order.length) return true
    const cell = order[position]
    for (const key of cell.keys) {
      if (used.has(key)) continue
      used.add(key)
      answer[cell.index] = key
      if (visit(position + 1)) return true
      used.delete(key)
    }
    return false
  }
  return visit(0) ? answer : null
}

export function availableLibraryGridHint(
  cell: Pick<QuizLibraryGridCell, 'validKeys' | 'hintChoices'>,
  allKeys: readonly string[],
  usedKeys: readonly string[]
): string[] {
  const used = new Set(usedKeys)
  const valid = [
    ...cell.hintChoices.filter((key) => cell.validKeys.includes(key)),
    ...cell.validKeys
  ].find((key) => !used.has(key))
  if (!valid) return []
  const invalid = [
    ...cell.hintChoices.filter((key) => !cell.validKeys.includes(key)),
    ...allKeys.filter((key) => !cell.validKeys.includes(key))
  ].filter((key, index, values) => !used.has(key) && values.indexOf(key) === index).slice(0, 2)
  return invalid.length === 2 ? [valid, ...invalid] : []
}

function chooseClues(
  clues: readonly IndexedClue[],
  rng: () => number
): { rows: IndexedClue[]; columns: IndexedClue[]; answers: string[][]; reveal: string[] } | null {
  // Keep prolific clue families from crowding out genres/decades while keeping
  // the constraint search bounded for large personal libraries.
  const byKind = new Map<QuizLibraryGridClueKind, IndexedClue[]>()
  for (const clue of clues) byKind.set(clue.kind, [...(byKind.get(clue.kind) ?? []), clue])
  const pool = [...byKind.values()]
    .flatMap((values) =>
      [...values]
        .sort((a, b) => a.mediaIds.size - b.mediaIds.size || a.key.localeCompare(b.key))
        .slice(0, 24)
    )
    .sort((a, b) => a.key.localeCompare(b.key))
  const compatible = new Map<string, IndexedClue[]>()
  for (const clue of pool) {
    compatible.set(
      clue.key,
      pool.filter(
        (other) =>
          other.key !== clue.key &&
          intersect(clue.mediaIds, other.mediaIds).length >= 2
      )
    )
  }
  const viable: Array<{
    rows: IndexedClue[]
    columns: IndexedClue[]
    answers: string[][]
    reveal: string[]
  }> = []
  let checked = 0
  for (let a = 0; a < pool.length - 2 && checked < 50000 && viable.length < 64; a++) {
    for (let b = a + 1; b < pool.length - 1 && checked < 50000 && viable.length < 64; b++) {
      for (let c = b + 1; c < pool.length && checked < 50000 && viable.length < 64; c++) {
        const rows = [pool[a], pool[b], pool[c]]
        const common = (compatible.get(rows[0].key) ?? []).filter(
          (clue) =>
            (compatible.get(rows[1].key) ?? []).some((value) => value.key === clue.key) &&
            (compatible.get(rows[2].key) ?? []).some((value) => value.key === clue.key) &&
            !rows.some((row) => row.key === clue.key)
        )
        for (let x = 0; x < common.length - 2 && checked < 50000 && viable.length < 64; x++) {
          for (let y = x + 1; y < common.length - 1 && checked < 50000 && viable.length < 64; y++) {
            for (let z = y + 1; z < common.length && checked < 50000 && viable.length < 64; z++) {
              checked++
              const columns = [common[x], common[y], common[z]]
              if (new Set([...rows, ...columns].map((clue) => clue.kind)).size < 3) continue
              const answers = rows.flatMap((row) =>
                columns.map((column) => intersect(row.mediaIds, column.mediaIds))
              )
              if (answers.some((values) => values.length < 2)) continue
              const reveal = libraryGridMatching(answers)
              if (reveal) viable.push({ rows, columns, answers, reveal })
            }
          }
        }
      }
    }
  }
  return viable.length > 0 ? viable[Math.floor(rng() * viable.length)] : null
}

export function buildLibraryGridQuestion(
  candidates: readonly LibraryGridCandidate[],
  seed: string | number,
  mediaMode: QuizScreenMediaMode = 'both'
): QuizLibraryGridQuestion | null {
  const rng = seededRng(seed)
  const media = candidates.filter(
    (item) => item.imagePath.trim() && screenMediaMatches(mediaMode, item.mediaType)
  )
  const selected = chooseClues(indexClues(media), rng)
  if (!selected) return null
  const allKeys = media.map((item) => item.key)
  const cells: QuizLibraryGridCell[] = selected.answers.map((validKeys, index) => {
    const rowIds = selected.rows[Math.floor(index / 3)].mediaIds
    const columnIds = selected.columns[index % 3].mediaIds
    const nearMisses = allKeys.filter(
      (key) => rowIds.has(key) !== columnIds.has(key)
    )
    const fallback = allKeys.filter(
      (key) => !validKeys.includes(key) && !nearMisses.includes(key)
    )
    const invalid = [...shuffle(nearMisses, rng), ...shuffle(fallback, rng)].slice(0, 2)
    if (invalid.length < 2) return null
    return {
      key: `cell-${index}`,
      row: Math.floor(index / 3),
      column: index % 3,
      validKeys,
      revealKey: selected.reveal[index],
      hintChoices: shuffle([validKeys[Math.floor(rng() * validKeys.length)], ...invalid], rng)
    }
  }).filter((cell): cell is QuizLibraryGridCell => cell != null)
  if (cells.length !== 9) return null
  const strip = ({ mediaIds: _mediaIds, ...clue }: IndexedClue): QuizLibraryGridClue => clue
  return {
    id: `library-grid-${seed}`,
    kind: 'libraryGrid',
    prompt: 'Fill every intersection with a different matching title.',
    choices: [],
    validKeys: [],
    rows: selected.rows.map(strip),
    columns: selected.columns.map(strip),
    cells,
    titles: media.map(({ genres: _genres, people: _people, companies: _companies, ...title }) => title)
  }
}
