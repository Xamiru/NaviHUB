import type { MusicAlbumShelf, MusicSmartRules } from './types'

export const MUSIC_SHELVES: Record<MusicAlbumShelf, string> = {
  want: 'Want to hear',
  exploring: 'Exploring',
  revisit: 'Revisit'
}
export const DEFAULT_SMART_RULES: MusicSmartRules = {
  liked: 'any',
  playState: 'any',
  minPlays: null,
  maxPlays: null,
  notPlayedDays: null,
  tags: [],
  tagMode: 'all',
  artist: '',
  soundtrack: 'any',
  minAlbumRating: null,
  shelf: null,
  order: 'title',
  maxTracks: 200
}
// Same canonical spelling in editors and queries; tags are personal, never guessed.
export function normalizeMusicTags(tags: string[]): string[] {
  return [...new Set(tags.map((tag) => tag.normalize('NFKC').trim().toLowerCase()).filter(Boolean))]
}
export function parseMusicTags(text: string): string[] {
  return normalizeMusicTags(text.split(','))
}
