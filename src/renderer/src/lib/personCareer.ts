import type { MediaItem, MediaType, PersonCredit } from '@shared/types'

export interface CareerTimelineEntry {
  media: MediaItem
  roleLabels: string[]
}

// A crew credit reads as the source's own text ("Story & Art") when it was kept.
export function creditRoleLabel(credit: PersonCredit): string {
  const role = credit.role.replace(/_/g, ' ')
  return credit.character ? `${credit.character.name} (${role})` : (credit.roleNote ?? role)
}

export function buildCareerTimeline(credits: PersonCredit[]): CareerTimelineEntry[] {
  const byMedia = new Map<number, CareerTimelineEntry>()

  for (const credit of credits) {
    let entry = byMedia.get(credit.media.id)
    if (!entry) {
      entry = { media: credit.media, roleLabels: [] }
      byMedia.set(credit.media.id, entry)
    }

    const label = creditRoleLabel(credit)
    if (!entry.roleLabels.includes(label)) entry.roleLabels.push(label)
  }

  return [...byMedia.values()].sort((a, b) => {
    const aDate = a.media.releaseDate
    const bDate = b.media.releaseDate
    if (!aDate && !bDate) return a.media.title.localeCompare(b.media.title)
    if (!aDate) return 1
    if (!bDate) return -1
    return aDate.localeCompare(bDate) || a.media.title.localeCompare(b.media.title)
  })
}

// ---- person page projections ----

export type RoleSort = 'prominence' | 'newest' | 'oldest'

export interface RoleGroupEntry {
  credit: PersonCredit
  // Every title this character was voiced/played in, the shown credit's first.
  titles: string[]
}

// How far down its title's cast a role sits, 0 (lead) to 1; unordered casts
// sort after ordered ones.
export function castRank(c: PersonCredit): number {
  if (c.castPosition == null || c.castSize <= 0) return Number.POSITIVE_INFINITY
  return c.castPosition / c.castSize
}

// Known for skips minor roles: a voiced character counts only when it sits in
// the top third of its title's cast (top ten for a small cast). Crew credits
// and casts with no order always count. castPosition is 0-based.
export function prominentRole(c: PersonCredit): boolean {
  if (!c.character || c.castPosition == null) return true
  return c.castPosition < Math.max(10, Math.ceil(c.castSize / 3))
}

// Character-bearing credits grouped by medium, one entry per character (a role
// across several seasons collapses onto its most prominent credit). Groups
// follow `typeOrder`, unknown types last.
export function groupActingRoles(
  credits: PersonCredit[],
  typeOrder: MediaType[],
  sort: RoleSort
): { type: MediaType; entries: RoleGroupEntry[] }[] {
  const byType = new Map<MediaType, Map<number, RoleGroupEntry>>()
  for (const c of credits) {
    if (!c.character) continue
    let group = byType.get(c.media.mediaType)
    if (!group) byType.set(c.media.mediaType, (group = new Map()))
    const seen = group.get(c.character.id)
    if (!seen) group.set(c.character.id, { credit: c, titles: [c.media.title] })
    else {
      if (!seen.titles.includes(c.media.title)) seen.titles.push(c.media.title)
      if (castRank(c) < castRank(seen.credit)) seen.credit = c
    }
  }
  const date = (e: RoleGroupEntry): string => e.credit.media.releaseDate ?? ''
  const compare = (a: RoleGroupEntry, b: RoleGroupEntry): number => {
    if (sort === 'prominence') return castRank(a.credit) - castRank(b.credit) || 0
    // Undated titles go last in both directions.
    if (!date(a) !== !date(b)) return date(a) ? -1 : 1
    return sort === 'newest' ? date(b).localeCompare(date(a)) : date(a).localeCompare(date(b))
  }
  const types = [
    ...typeOrder.filter((t) => byType.has(t)),
    ...[...byType.keys()].filter((t) => !typeOrder.includes(t))
  ]
  // Array.prototype.sort is stable, so ties keep the import's importance order.
  return types.map((type) => ({ type, entries: [...byType.get(type)!.values()].sort(compare) }))
}

// Known for: the user's own highest-scored titles this person worked on, then
// (to fill the strip, or when nothing is scored yet) their most prominent roles.
// One card per title and per character.
export function pickKnownFor(credits: PersonCredit[], limit = 6): PersonCredit[] {
  const seenTitles = new Set<number>()
  const seenCharacters = new Set<number>()
  return credits
    .filter(prominentRole)
    .sort(
      (a, b) =>
        (b.media.score ?? -1) - (a.media.score ?? -1) ||
        castRank(a) - castRank(b) ||
        (b.media.releaseDate ?? '').localeCompare(a.media.releaseDate ?? '')
    )
    .filter((c) => {
      if (seenTitles.has(c.media.id) || (c.character && seenCharacters.has(c.character.id))) return false
      seenTitles.add(c.media.id)
      if (c.character) seenCharacters.add(c.character.id)
      return true
    })
    .slice(0, limit)
}
