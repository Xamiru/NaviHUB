// The in-memory catalog shape shared by the validator, the main-process index
// and tests. Building it is pure; loading the committed content files lives in
// catalog.ts so nothing else pulls the content bundle in by accident.

import {
  parseRef,
  type EntityKind,
  type HistoryEntity,
  type HistoryEvent,
  type HistoryInterpretation,
  type HistoryMedia,
  type HistoryPeriod,
  type HistoryPerson,
  type HistoryPlace,
  type HistorySource
} from './schema'

export interface CatalogEntry {
  /** Content-relative path, e.g. `events/1953-iranian-coup.ts`; absent for personal entities. */
  path?: string
  entity: HistoryEntity
}

export interface HistoryCatalog {
  events: Map<string, HistoryEvent>
  people: Map<string, HistoryPerson>
  periods: Map<string, HistoryPeriod>
  places: Map<string, HistoryPlace>
  sources: Map<string, HistorySource>
  interpretations: Map<string, HistoryInterpretation>
  media: Map<string, HistoryMedia>
}

export const KIND_DIRS: Record<EntityKind, keyof HistoryCatalog> = {
  event: 'events',
  person: 'people',
  period: 'periods',
  place: 'places',
  source: 'sources',
  interpretation: 'interpretations',
  media: 'media'
}

export function emptyCatalog(): HistoryCatalog {
  return {
    events: new Map(),
    people: new Map(),
    periods: new Map(),
    places: new Map(),
    sources: new Map(),
    interpretations: new Map(),
    media: new Map()
  }
}

/** Later entries win on a duplicate id; the validator reports duplicates separately. */
export function buildCatalog(entities: HistoryEntity[]): HistoryCatalog {
  const c = emptyCatalog()
  for (const e of entities) (c[KIND_DIRS[e.kind]] as Map<string, HistoryEntity>).set(e.id, e)
  return c
}

export function lookup(c: HistoryCatalog, ref: string): HistoryEntity | undefined {
  const p = parseRef(ref)
  if (!p) return undefined
  return (c[KIND_DIRS[p.kind]] as Map<string, HistoryEntity>).get(p.id)
}

export function allEntities(c: HistoryCatalog): HistoryEntity[] {
  return [
    ...c.events.values(),
    ...c.people.values(),
    ...c.periods.values(),
    ...c.places.values(),
    ...c.sources.values(),
    ...c.interpretations.values(),
    ...c.media.values()
  ]
}

export interface IdLock {
  /** Every ref ever committed, `kind:slug`. */
  ids: string[]
  /** Retired ref -> its replacement. No chains. */
  redirects: Record<string, string>
}
