import type { CastEntry, Person } from '@shared/types'

// The headline creators of a manga, grouped the way a cover credits them:
// "Story & Art" for one author, "Story" and "Art" when the work is split, and
// "Original work" for the author of the novel or game it adapts. Credits from
// before the source text was kept carry no note and read as plain "Mangaka"
// until the title is re-imported.
export type CreatorLabel = 'Story & Art' | 'Story' | 'Art' | 'Mangaka' | 'Original work'

export interface CreatorFact {
  label: CreatorLabel
  people: Person[]
}

const ORDER: CreatorLabel[] = ['Story & Art', 'Story', 'Art', 'Mangaka', 'Original work']

function labelFor(entry: CastEntry): CreatorLabel | null {
  if (entry.character) return null
  if (entry.role === 'writer') return 'Original work'
  if (entry.role !== 'mangaka') return null
  const note = entry.roleNote?.toLowerCase()
  if (!note) return 'Mangaka'
  const story = /story|creator|mangaka/.test(note)
  const art = /art|mangaka/.test(note)
  if (story && art) return 'Story & Art'
  if (story) return 'Story'
  if (art) return 'Art'
  return 'Mangaka'
}

export function mangaCreatorFacts(cast: CastEntry[]): CreatorFact[] {
  const groups = new Map<CreatorLabel, Person[]>()
  for (const entry of cast) {
    const label = labelFor(entry)
    if (!label) continue
    const people = groups.get(label) ?? []
    if (!people.some((p) => p.id === entry.person.id)) people.push(entry.person)
    groups.set(label, people)
  }
  return ORDER.filter((label) => groups.has(label)).map((label) => ({
    label,
    people: groups.get(label)!
  }))
}

// The label a crew row shows: the source's credit text when it was kept.
export function crewRoleLabel(entry: Pick<CastEntry, 'role' | 'roleNote'>): string {
  return entry.roleNote ?? entry.role.replace(/_/g, ' ')
}
