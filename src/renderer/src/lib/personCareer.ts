import type { MediaItem, PersonCredit } from '@shared/types'

export interface CareerTimelineEntry {
  media: MediaItem
  roleLabels: string[]
}

export function creditRoleLabel(credit: PersonCredit): string {
  const role = credit.role.replace(/_/g, ' ')
  return credit.character ? `${credit.character.name} (${role})` : role
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
