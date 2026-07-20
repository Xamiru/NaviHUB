import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as mediaRepo from '../src/main/repos/mediaRepo'
import * as tagRepo from '../src/main/repos/tagRepo'
import * as settingsRepo from '../src/main/repos/settingsRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

beforeEach(() => {
  db = createTestDb()
})

function addAnime(title: string, extra: Partial<Parameters<typeof mediaRepo.create>[0]> = {}) {
  return mediaRepo.create({ mediaType: 'anime', title, ...extra })
}

describe('mediaRepo.list', () => {
  it('filters by media type', () => {
    addAnime('Frieren')
    mediaRepo.create({ mediaType: 'movie', title: 'Inception' })
    const anime = mediaRepo.list({ mediaType: 'anime' })
    expect(anime.map((m) => m.title)).toEqual(['Frieren'])
  })

  it('filters by status, search and favorite together', () => {
    addAnime('Frieren', { status: 'Watching', favorite: true })
    addAnime('Frieren S2', { status: 'Plan to Watch' })
    addAnime('Monster', { status: 'Watching' })

    expect(
      mediaRepo.list({ mediaType: 'anime', status: 'Watching' }).map((m) => m.title)
    ).toEqual(expect.arrayContaining(['Frieren', 'Monster']))
    expect(mediaRepo.list({ mediaType: 'anime', search: 'frie' })).toHaveLength(2)
    expect(mediaRepo.list({ mediaType: 'anime', favorite: true }).map((m) => m.title)).toEqual([
      'Frieren'
    ])
  })

  it('matches the original title in search', () => {
    addAnime('Frieren', { titleOriginal: '葬送のフリーレン' })
    expect(mediaRepo.list({ mediaType: 'anime', search: 'フリーレン' })).toHaveLength(1)
  })

  it('sorts by score with NULLs last regardless of direction', () => {
    addAnime('Unscored')
    addAnime('Good', { score: 8 })
    addAnime('Great', { score: 9.5 })
    const desc = mediaRepo.list({ mediaType: 'anime', sort: 'score' })
    expect(desc.map((m) => m.title)).toEqual(['Great', 'Good', 'Unscored'])
    const asc = mediaRepo.list({ mediaType: 'anime', sort: 'score', sortDir: 'asc' })
    expect(asc.map((m) => m.title)).toEqual(['Good', 'Great', 'Unscored'])
  })

  it('filters by tag', () => {
    const tagId = tagRepo.upsert({ name: 'Fantasy' })
    addAnime('Frieren', { tagIds: [tagId] })
    addAnime('Monster')
    expect(mediaRepo.list({ mediaType: 'anime', tagId }).map((m) => m.title)).toEqual(['Frieren'])
  })
})

describe('mediaRepo.list advanced filters', () => {
  it('filters by multiple statuses', () => {
    addAnime('A', { status: 'Watching' })
    addAnime('B', { status: 'Completed' })
    addAnime('C', { status: 'Dropped' })
    const out = mediaRepo.list({ mediaType: 'anime', statuses: ['Watching', 'Dropped'] })
    expect(out.map((m) => m.title).sort()).toEqual(['A', 'C'])
  })

  it('filters by year range, falling back to seasonYear when no date', () => {
    addAnime('Old', { releaseDate: '1988-07-16' })
    addAnime('Mid', { releaseDate: '2005-04-01' })
    addAnime('New', { releaseDate: '2023-09-29' })
    addAnime('DatelessButSeasoned', { metadata: { seasonYear: 1985 } })

    expect(
      mediaRepo.list({ mediaType: 'anime', yearMax: 1990 }).map((m) => m.title).sort()
    ).toEqual(['DatelessButSeasoned', 'Old'].sort())
    expect(
      mediaRepo.list({ mediaType: 'anime', yearMin: 2000, yearMax: 2010 }).map((m) => m.title)
    ).toEqual(['Mid'])
  })

  it('filters by personal score range and by unrated', () => {
    addAnime('Unscored')
    addAnime('Good', { score: 7 })
    addAnime('Great', { score: 9.5 })

    expect(
      mediaRepo.list({ mediaType: 'anime', scoreMin: 8 }).map((m) => m.title)
    ).toEqual(['Great'])
    expect(mediaRepo.list({ mediaType: 'anime', unrated: true }).map((m) => m.title)).toEqual([
      'Unscored'
    ])
    // unrated wins over a score range — the two can't both hold.
    expect(
      mediaRepo.list({ mediaType: 'anime', unrated: true, scoreMin: 8 }).map((m) => m.title)
    ).toEqual(['Unscored'])
  })

  it('normalizes community scores across sources', () => {
    addAnime('AniList', { metadata: { averageScore: 90 } })
    mediaRepo.create({ mediaType: 'game', title: 'Metacritic', metadata: { metacritic: 70 } })
    mediaRepo.create({ mediaType: 'movie', title: 'IMDb', metadata: { imdbRating: 8.5 } })

    expect(mediaRepo.list({ mediaType: 'anime', communityMin: 85 })).toHaveLength(1)
    expect(mediaRepo.list({ mediaType: 'game', communityMin: 85 })).toHaveLength(0)
    // IMDb's 0-10 is rescaled to 0-100 before comparing.
    expect(mediaRepo.list({ mediaType: 'movie', communityMin: 80 })).toHaveLength(1)
  })

  it('filters by unit count (episodes/chapters/runtime)', () => {
    addAnime('Short', { totalUnits: 12 })
    addAnime('Long', { totalUnits: 500 })
    expect(
      mediaRepo.list({ mediaType: 'anime', unitsMax: 26 }).map((m) => m.title)
    ).toEqual(['Short'])
  })

  it('filters by season, preferring metadata over the release month', () => {
    // AniList files a late-December premiere as the NEXT winter.
    addAnime('DecemberWinter', { releaseDate: '2023-12-20', metadata: { season: 'WINTER' } })
    addAnime('SummerShow', { releaseDate: '2023-07-05' })

    expect(
      mediaRepo.list({ mediaType: 'anime', seasons: ['winter'] }).map((m) => m.title)
    ).toEqual(['DecemberWinter'])
    expect(
      mediaRepo.list({ mediaType: 'anime', seasons: ['summer', 'fall'] }).map((m) => m.title)
    ).toEqual(['SummerShow'])
  })

  it('matches any vs every tag', () => {
    const fantasy = tagRepo.upsert({ name: 'Fantasy' })
    const drama = tagRepo.upsert({ name: 'Drama' })
    addAnime('Both', { tagIds: [fantasy, drama] })
    addAnime('OnlyFantasy', { tagIds: [fantasy] })

    expect(
      mediaRepo.list({ mediaType: 'anime', tagIds: [fantasy, drama] }).map((m) => m.title).sort()
    ).toEqual(['Both', 'OnlyFantasy'])
    expect(
      mediaRepo
        .list({ mediaType: 'anime', tagIds: [fantasy, drama], tagMode: 'all' })
        .map((m) => m.title)
    ).toEqual(['Both'])
  })

  it('combines filters (the "anime before 1990 I rated highly" case)', () => {
    addAnime('Akira', { releaseDate: '1988-07-16', score: 9 })
    addAnime('OldButMeh', { releaseDate: '1985-01-01', score: 5 })
    addAnime('ModernFave', { releaseDate: '2020-01-01', score: 9 })
    expect(
      mediaRepo.list({ mediaType: 'anime', yearMax: 1989, scoreMin: 8 }).map((m) => m.title)
    ).toEqual(['Akira'])
  })
})

describe('mediaRepo.list sorting', () => {
  it('sorts by community score, length and times consumed', () => {
    addAnime('Low', { metadata: { averageScore: 60 }, totalUnits: 12, rewatchCount: 0 })
    addAnime('High', { metadata: { averageScore: 95 }, totalUnits: 4, rewatchCount: 3 })

    expect(mediaRepo.list({ mediaType: 'anime', sort: 'communityScore' })[0].title).toBe('High')
    expect(mediaRepo.list({ mediaType: 'anime', sort: 'units' })[0].title).toBe('Low')
    expect(mediaRepo.list({ mediaType: 'anime', sort: 'timesConsumed' })[0].title).toBe('High')
  })

  it('random sort is stable per seed and reshuffles on a new one', () => {
    for (const t of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) addAnime(t)
    const order = (seed: number) =>
      mediaRepo.list({ mediaType: 'anime', sort: 'random', seed }).map((m) => m.title)

    expect(order(1)).toHaveLength(8)
    // Same seed, same hand — a refetch must not reshuffle under the user.
    expect(order(1)).toEqual(order(1))
    expect(order(2)).not.toEqual(order(1))
  })

  it('falls back to updated_at for an unknown sort key', () => {
    addAnime('A')
    expect(
      mediaRepo.list({ mediaType: 'anime', sort: 'bogus' as never }).map((m) => m.title)
    ).toEqual(['A'])
  })
})

describe('mediaRepo.facets', () => {
  it('reports year and unit bounds for the type', () => {
    addAnime('Old', { releaseDate: '1988-07-16', totalUnits: 51 })
    addAnime('New', { releaseDate: '2023-01-01', totalUnits: 12 })
    mediaRepo.create({ mediaType: 'movie', title: 'Ignored', releaseDate: '1950-01-01' })

    expect(mediaRepo.facets('anime')).toEqual({
      yearMin: 1988,
      yearMax: 2023,
      unitsMax: 51,
      total: 2
    })
  })

  it('handles an empty library', () => {
    expect(mediaRepo.facets('manga')).toEqual({
      yearMin: null,
      yearMax: null,
      unitsMax: null,
      total: 0
    })
  })
})

describe('mediaRepo create/get/update', () => {
  it('round-trips a full item with tags and metadata', () => {
    const tagId = tagRepo.upsert({ name: 'Fantasy' })
    const id = addAnime('Frieren', {
      status: 'Watching',
      score: 9,
      progress: 12,
      totalUnits: 28,
      favorite: true,
      metadata: { averageScore: 91 },
      tagIds: [tagId]
    })
    const got = mediaRepo.get(id)
    expect(got).not.toBeNull()
    expect(got!.title).toBe('Frieren')
    expect(got!.favorite).toBe(true)
    expect(got!.metadata).toEqual({ averageScore: 91 })
    expect(got!.tags.map((t) => t.name)).toEqual(['Fantasy'])

    mediaRepo.update(id, { score: 10, tagIds: [] })
    const after = mediaRepo.get(id)
    expect(after!.score).toBe(10)
    expect(after!.tags).toEqual([])
  })

  it('statusCounts groups by status and skips NULL', () => {
    addAnime('A', { status: 'Watching' })
    addAnime('B', { status: 'Watching' })
    addAnime('C', { status: 'Completed' })
    addAnime('D')
    expect(mediaRepo.statusCounts('anime')).toEqual({ Watching: 2, Completed: 1 })
  })

  it('remove also drops the item from media lists', () => {
    const id = addAnime('Frieren')
    db.prepare(`INSERT INTO list (title, entity_kind) VALUES ('Faves', 'media')`).run()
    db.prepare(`INSERT INTO list_item (list_id, entity_id, sort_order) VALUES (1, ?, 0)`).run(id)
    mediaRepo.remove(id)
    expect(db.prepare('SELECT COUNT(*) AS n FROM list_item').get()).toEqual({ n: 0 })
  })
})

describe('mediaRepo.timeStats', () => {
  // Minutes for one type from a freshly-built stats snapshot.
  function minutesFor(type: Parameters<typeof mediaRepo.create>[0]['mediaType']): number {
    return mediaRepo.timeStats().byType.find((t) => t.mediaType === type)!.minutes
  }

  it('does NOT multiply games by rewatch_count (progress is hours, replays included)', () => {
    mediaRepo.create({ mediaType: 'game', title: 'Elden Ring', progress: 30, rewatchCount: 3 })
    expect(minutesFor('game')).toBe(1800) // 30h × 60, NOT × 3
  })

  it('does NOT multiply visual novels by rewatch_count (progress is minutes)', () => {
    mediaRepo.create({ mediaType: 'visual_novel', title: 'Steins;Gate', progress: 2400, rewatchCount: 2 })
    expect(minutesFor('visual_novel')).toBe(2400) // as-is, NOT × 2
  })

  it('DOES multiply movies by rewatch_count (runtime × times watched)', () => {
    mediaRepo.create({ mediaType: 'movie', title: 'Interstellar', totalUnits: 148, rewatchCount: 3 })
    expect(minutesFor('movie')).toBe(444) // 148 × 3
  })

  it('counts a movie consumed via status alone (rewatch 0 → 1 pass)', () => {
    const id = mediaRepo.create({ mediaType: 'movie', title: 'Solaris', totalUnits: 165 })
    mediaRepo.update(id, { status: 'Watched' })
    const s = mediaRepo.timeStats()
    expect(minutesFor('movie')).toBe(165)
    expect(s.byType.find((t) => t.mediaType === 'movie')!.itemCount).toBe(1)
  })

  it('excludes backlog and includes completed/consumed (case-insensitive)', () => {
    mediaRepo.create({ mediaType: 'anime', title: 'Backlog', status: 'Plan to Watch' })
    mediaRepo.create({
      mediaType: 'anime',
      title: 'Done',
      status: 'completed', // lowercase still counts
      totalUnits: 10,
      progress: 0,
      metadata: { epDuration: 20 }
    })
    const s = mediaRepo.timeStats()
    expect(s.consumedCount).toBe(1)
    expect(minutesFor('anime')).toBe(200) // 10 ep × 20, from totalUnits since completed
  })

  it('anime completed uses totalUnits, otherwise progress; per-title duration wins', () => {
    mediaRepo.create({
      mediaType: 'anime',
      title: 'Completed',
      status: 'Completed',
      totalUnits: 24,
      progress: 12,
      rewatchCount: 2,
      metadata: { epDuration: 20 }
    })
    expect(minutesFor('anime')).toBe(960) // 24 (total, completed) × 20 × 2 passes
  })

  it('anime falls back to the settings default when no per-title duration', () => {
    mediaRepo.create({ mediaType: 'anime', title: 'NoDur', status: 'Completed', totalUnits: 10 })
    expect(minutesFor('anime')).toBe(240) // 10 × 24 default
    settingsRepo.set('stats.animeEpMinutes', '20')
    expect(minutesFor('anime')).toBe(200) // 10 × 20
  })

  it('manga estimate uses chapters × default × rereads', () => {
    mediaRepo.create({
      mediaType: 'manga',
      title: 'Berserk',
      status: 'Completed',
      totalUnits: 100,
      rewatchCount: 2
    })
    expect(minutesFor('manga')).toBe(1000) // 100 ch × 5 × 2
  })

  it('completed game/VN with no logged progress falls back to average length', () => {
    mediaRepo.create({ mediaType: 'game', title: 'ShortGame', status: 'Completed', totalUnits: 8, progress: 0 })
    mediaRepo.create({ mediaType: 'visual_novel', title: 'ShortVN', status: 'Completed', totalUnits: 300, progress: 0 })
    expect(minutesFor('game')).toBe(480) // 8h × 60
    expect(minutesFor('visual_novel')).toBe(300) // minutes as-is
  })

  it('aggregates: total, six types, estimate flags, top sorting, longest & mostRevisited', () => {
    mediaRepo.create({ mediaType: 'game', title: 'G1', progress: 10 }) // 600
    mediaRepo.create({ mediaType: 'game', title: 'G2', progress: 5, rewatchCount: 4 }) // 300, revisited
    mediaRepo.create({ mediaType: 'movie', title: 'M1', totalUnits: 120, rewatchCount: 1 }) // 120
    const s = mediaRepo.timeStats()
    expect(s.byType).toHaveLength(6)
    expect(s.totalMinutes).toBe(1020)
    expect(s.byType.find((t) => t.mediaType === 'anime')!.estimated).toBe(true)
    expect(s.byType.find((t) => t.mediaType === 'game')!.estimated).toBe(false)
    // top items sorted by minutes desc within a type
    expect(s.byType.find((t) => t.mediaType === 'game')!.topItems.map((i) => i.title)).toEqual([
      'G1',
      'G2'
    ])
    expect(s.longest!.title).toBe('G1') // 600 is the single biggest sink
    expect(s.mostRevisited!.title).toBe('G2') // rewatch 4 ≥ 2
    expect(s.mostRevisited!.times).toBe(4)
  })

  it('mostRevisited is null when nothing was consumed twice', () => {
    mediaRepo.create({ mediaType: 'game', title: 'Once', progress: 10, rewatchCount: 1 })
    expect(mediaRepo.timeStats().mostRevisited).toBeNull()
  })
})
