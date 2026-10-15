// The 0-100 community score's sources, in precedence order: the first one a
// title has wins. The SQL reader (main/repos/communityScore.ts) and the
// renderer's franchise pages both derive from this list. A new importer's
// rating key is added here with the multiplier that puts it on 0-100.
export const COMMUNITY_SCORE_SOURCES: ReadonlyArray<{ key: string; scale: number }> = [
  { key: 'averageScore', scale: 1 }, // AniList
  { key: 'metacritic', scale: 1 }, // Steam
  { key: 'igdbRating', scale: 1 },
  { key: 'vndbRating', scale: 1 },
  { key: 'olRating', scale: 1 }, // Open Library, already rescaled from stars
  { key: 'hcRating', scale: 1 }, // Hardcover
  { key: 'imdbRating', scale: 10 }, // OMDb, 0-10
  { key: 'tmdbRating', scale: 1 } // TMDB vote average, rescaled at import (20+ votes)
]

/** The community score from a metadata object, or null when no source has one. */
export function communityScoreFromMeta(meta: Record<string, unknown> | null | undefined): number | null {
  if (!meta) return null
  for (const { key, scale } of COMMUNITY_SCORE_SOURCES) {
    const value = meta[key]
    if (typeof value === 'number' && value > 0) return Math.round(value * scale)
  }
  return null
}
