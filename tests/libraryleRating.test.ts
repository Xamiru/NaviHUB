import { describe, expect, it } from 'vitest'
import { libraryleFeedback, type LibraryleCandidate } from '../src/shared/libraryle'
import { COMMUNITY_SCORE_SOURCES, communityScoreFromMeta } from '../src/shared/communityScore'
import { communityScoreSql } from '../src/main/repos/communityScore'

function title(key: string, rating: number | null): LibraryleCandidate {
  return {
    key,
    label: `Title ${key}`,
    aliases: [],
    imagePath: `media/${key}.jpg`,
    releaseYear: 2000,
    mediaType: 'movie',
    rating,
    genres: [{ key: 'drama', label: 'Drama' }],
    companies: [],
    directors: [],
    cast: []
  }
}

describe('Libraryle rating clue', () => {
  it('is exact within 3 points, near within 10, and points higher or lower', () => {
    expect(libraryleFeedback(title('t', 80), title('g', 78)).rating).toEqual({ match: 'exact', direction: null })
    expect(libraryleFeedback(title('t', 80), title('g', 72)).rating).toEqual({ match: 'near', direction: 'higher' })
    expect(libraryleFeedback(title('t', 60), title('g', 85)).rating).toEqual({ match: 'none', direction: 'lower' })
  })

  it('reports unknown instead of a miss when either title has no rating', () => {
    expect(libraryleFeedback(title('t', null), title('g', 70)).rating.match).toBe('unknown')
    expect(libraryleFeedback(title('t', 70), title('g', null)).rating.match).toBe('unknown')
  })
})

describe('shared community score', () => {
  it('ranks IMDb (x10) above the TMDB vote average, and both behind the rest', () => {
    expect(communityScoreFromMeta({ tmdbRating: 74 })).toBe(74)
    expect(communityScoreFromMeta({ imdbRating: 8.1, tmdbRating: 74 })).toBe(81)
    expect(communityScoreFromMeta({ averageScore: 83, tmdbRating: 74 })).toBe(83)
    expect(communityScoreFromMeta({})).toBeNull()
  })

  it('builds the SQL from the same ordered sources', () => {
    const sql = communityScoreSql('mi')
    let last = -1
    for (const { key } of COMMUNITY_SCORE_SOURCES) {
      const at = sql.indexOf(`'$.${key}'`)
      expect(at).toBeGreaterThan(last)
      last = at
    }
    expect(sql).toContain("json_extract(mi.metadata, '$.imdbRating') * 10")
  })
})
