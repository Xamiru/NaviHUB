import type { MediaType } from '@shared/types'

// Fixed per-type hues: color follows the entity, never rank. These are shared
// by Home and Stats without making either route import the other's page module.
export const MEDIA_TYPE_COLORS: Record<MediaType, string> = {
  anime: '#7c5cff',
  tv: '#3987e5',
  movie: '#e66767',
  game: '#199e70',
  manga: '#c98500',
  visual_novel: '#d55181',
  book: '#3aa6a6'
}
