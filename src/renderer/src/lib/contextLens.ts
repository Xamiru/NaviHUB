import type { GlobalSearchResults, MediaItem } from '@shared/types'

export type ContextLensKind = 'media' | 'person' | 'company' | 'character'

export interface ContextLensSelection {
  kind: ContextLensKind
  id: number
}

export function orderedContextLensSelections(
  results: GlobalSearchResults | undefined
): ContextLensSelection[] {
  if (!results) return []
  return [
    ...results.media.map((item) => ({ kind: 'media' as const, id: item.id })),
    ...results.people.map((item) => ({ kind: 'person' as const, id: item.id })),
    ...results.companies.map((item) => ({ kind: 'company' as const, id: item.id })),
    ...results.characters.map((item) => ({ kind: 'character' as const, id: item.id }))
  ]
}

export function reconcileContextLensSelection(
  results: GlobalSearchResults | undefined,
  current: ContextLensSelection | null
): ContextLensSelection | null {
  const ordered = orderedContextLensSelections(results)
  if (ordered.length === 0) return null
  if (current && ordered.some((item) => item.kind === current.kind && item.id === current.id)) {
    return current
  }
  return ordered[0]
}

export function moveContextLensSelection(
  results: GlobalSearchResults | undefined,
  current: ContextLensSelection | null,
  delta: -1 | 1
): ContextLensSelection | null {
  const ordered = orderedContextLensSelections(results)
  if (ordered.length === 0) return null
  const index = current
    ? ordered.findIndex((item) => item.kind === current.kind && item.id === current.id)
    : -1
  const next = index < 0 ? 0 : Math.min(Math.max(0, index + delta), ordered.length - 1)
  return ordered[next]
}

export function contextLensRoute(selection: ContextLensSelection, media?: MediaItem): string {
  if (selection.kind === 'media') {
    if (!media) return '/search'
    const roots: Record<MediaItem['mediaType'], string> = {
      anime: '/anime',
      manga: '/manga',
      visual_novel: '/visual-novels',
      game: '/games',
      book: '/books',
      movie: '/movies',
      tv: '/tv'
    }
    return `${roots[media.mediaType]}/${media.id}`
  }
  if (selection.kind === 'person') return `/people/${selection.id}`
  if (selection.kind === 'company') return `/studios/${selection.id}`
  return `/characters/${selection.id}`
}
