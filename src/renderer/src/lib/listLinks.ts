import type { ListKind, MediaType } from '@shared/types'
import { configFor } from './mediaConfig'

// Detail-page route for a list entry, by the list's kind. Media uses the
// per-type base path; the other kinds have a single shared detail route.
export function pathForEntity(
  kind: ListKind,
  entityId: number,
  mediaType?: MediaType | null
): string {
  switch (kind) {
    case 'media':
      return `${configFor(mediaType ?? 'anime').basePath}/${entityId}`
    case 'person':
      return `/people/${entityId}`
    case 'character':
      return `/characters/${entityId}`
    case 'company':
      return `/studios/${entityId}`
    case 'wrestlingEvent':
      return `/wrestling/event/${entityId}`
    // A match has no page of its own; this route resolves it to its event's
    // card and highlights it there.
    case 'wrestlingMatch':
      return `/wrestling/match/${entityId}`
    case 'wrestlingWrestler':
      return `/wrestling/wrestler/${entityId}`
    case 'footballCompetition':
      return `/football/competition/${entityId}`
    case 'footballTeam':
      return `/football/team/${entityId}`
    case 'footballPerson':
      return `/football/person/${entityId}`
    case 'footballMatch':
      return `/football/match/${entityId}`
  }
}

export const KIND_LABEL: Record<ListKind, string> = {
  media: 'Media',
  person: 'People',
  character: 'Characters',
  company: 'Studios',
  wrestlingEvent: 'Wrestling events',
  wrestlingMatch: 'Wrestling matches',
  wrestlingWrestler: 'Wrestlers',
  footballCompetition: 'Football competitions',
  footballTeam: 'Football teams',
  footballPerson: 'Football people',
  footballMatch: 'Football matches'
}

// Singular noun for "Add {singular}…" prompts and empty states.
export const KIND_NOUN: Record<ListKind, string> = {
  media: 'title',
  person: 'person',
  character: 'character',
  company: 'studio',
  wrestlingEvent: 'event',
  wrestlingMatch: 'match',
  wrestlingWrestler: 'wrestler',
  footballCompetition: 'competition',
  footballTeam: 'team',
  footballPerson: 'person',
  footballMatch: 'match'
}
