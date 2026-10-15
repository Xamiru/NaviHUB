import type { MediaType, QuoteSpeakerKind, SavedQuote } from '@shared/types'
import { configFor } from './mediaConfig'

// Where a quote's speaker and source live in the app. Null when the link no
// longer resolves (the snapshot name is still shown, just not as a link).
export function speakerHref(kind: QuoteSpeakerKind | null, id: number | null): string | null {
  if (kind == null || id == null) return null
  if (kind === 'character') return `/characters/${id}`
  if (kind === 'person') return `/people/${id}`
  return `/wrestling/wrestler/${id}`
}

export function sourceHref(mediaType: MediaType | null, id: number | null): string | null {
  if (mediaType == null || id == null) return null
  return `${configFor(mediaType).basePath}/${id}`
}

export function quoteTypeLabel(q: SavedQuote): string {
  if (q.mediaType) return configFor(q.mediaType).singular
  if (q.speakerKind === 'wrestler') return 'Wrestling'
  return 'Other'
}

// The art behind a quote: the title's chosen background, its cover, then the
// speaker's portrait (a wrestler's promo has no title).
export function quoteArtPath(q: SavedQuote): string | null {
  return q.backgroundPath ?? q.coverPath ?? q.speakerImagePath
}
