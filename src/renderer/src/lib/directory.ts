import type { PersonDirectorySort } from '@shared/types'

// Sorting and search shared by the Mangaka and Studios directories, whose
// entries carry the same counts around a person or a company.

export interface DirectoryCounts {
  works: number
  readWorks: number
  meanScore: number | null
}

// `readLabel` is the type's verb: "Most read", "Most watched".
export function directorySorts(readLabel: string): { key: PersonDirectorySort; label: string }[] {
  return [
    { key: 'works', label: 'Most works' },
    { key: 'read', label: readLabel },
    { key: 'score', label: 'Your score' },
    { key: 'name', label: 'Name' }
  ]
}

export function directoryCompare<T extends DirectoryCounts>(
  sort: PersonDirectorySort,
  nameOf: (entry: T) => string
): (a: T, b: T) => number {
  const byName = (a: T, b: T): number => nameOf(a).localeCompare(nameOf(b))
  switch (sort) {
    case 'read':
      return (a, b) => b.readWorks - a.readWorks || b.works - a.works || byName(a, b)
    case 'score':
      return (a, b) =>
        (b.meanScore ?? -1) - (a.meanScore ?? -1) || b.readWorks - a.readWorks || byName(a, b)
    case 'name':
      return byName
    default:
      return (a, b) => b.works - a.works || byName(a, b)
  }
}

// `needle` is already trimmed and lowercased; an empty one matches everything.
export function directoryNameMatches(needle: string, ...names: (string | null)[]): boolean {
  return !needle || names.some((n) => (n ?? '').toLowerCase().includes(needle))
}
