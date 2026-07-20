import type { MediaType } from './types'

// Torrent-domain vocabulary shared by main (Jackett queries) and renderer
// (category preselect/picker, size formatting). Standard Torznab numbering:
// 2000 Movies, 3000 Audio, 4050 PC/Games, 5000 TV, 5070 TV/Anime,
// 7000 Books, 7030 Books/Comics, 8000 Other.

// Default categories per media type. Manga searches both Books/Comics and
// TV/Anime — anime trackers file manga/LN under literature categories that
// Jackett maps into either inconsistently. Every UI offers an
// "All categories" ([]) escape hatch because indexer mappings are lossy.
export function torznabCategoriesFor(mediaType: MediaType): number[] {
  switch (mediaType) {
    case 'anime':
      return [5070]
    case 'manga':
      return [7030, 5070]
    case 'visual_novel':
    case 'game':
      return [4050]
    case 'movie':
      return [2000]
    case 'tv':
      return [5000]
  }
}

// Picker options for the standalone /torrents page. [] = omit the category
// param entirely (search everything).
export const TORRENT_CATEGORY_OPTIONS: { label: string; cats: number[] }[] = [
  { label: 'All categories', cats: [] },
  { label: 'Anime', cats: [5070] },
  { label: 'Movies', cats: [2000] },
  { label: 'TV', cats: [5000] },
  { label: 'Games / VNs', cats: [4050] },
  { label: 'Books / Manga', cats: [7000, 7030] },
  { label: 'Audio', cats: [3000] },
  { label: 'Other', cats: [8000] }
]

// 123456789 -> "117.7 MiB". Jackett sizes are bytes; null/non-positive -> em dash.
export function formatBytes(bytes: number | null): string {
  if (bytes == null || !Number.isFinite(bytes) || bytes <= 0) return '—'
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB']
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit++
  }
  return unit === 0 ? `${value} B` : `${value.toFixed(1)} ${units[unit]}`
}
