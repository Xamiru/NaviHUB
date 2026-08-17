import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as tvRepo from '../src/main/repos/tvRepo'
import * as mediaRepo from '../src/main/repos/mediaRepo'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

const TODAY = '2026-08-15'

let showId: number
beforeEach(() => {
  db = createTestDb()
  showId = mediaRepo.create({ mediaType: 'tv', title: 'Twin Peaks', totalUnits: 30 })
})

function seed(episodes: Partial<tvRepo.ImportedEpisode>[]): void {
  const full = episodes.map((e, i) => ({
    season: e.season ?? 1,
    number: e.number ?? i + 1,
    absolute: e.absolute ?? i + 1,
    title: e.title ?? null,
    overview: e.overview ?? null,
    airDate: e.airDate ?? '1990-04-08',
    runtime: e.runtime ?? 47
  }))
  tvRepo.replaceEpisodes(showId, {
    episodes: full,
    seasons: [...new Set(full.map((e) => e.season))]
  })
}

const idOf = (season: number, number: number): number =>
  (
    db
      .prepare('SELECT id FROM tv_episode WHERE media_id=? AND season=? AND number=?')
      .get(showId, season, number) as { id: number }
  ).id

describe('tvRepo.listSeasons', () => {
  it('groups by season, in order, counting watched and unaired', () => {
    seed([
      { season: 1, number: 1 },
      { season: 1, number: 2 },
      { season: 2, number: 1 },
      { season: 2, number: 2, airDate: '2099-01-01' }
    ])
    tvRepo.setWatched(idOf(1, 1), true)

    const seasons = tvRepo.listSeasons(showId, TODAY)
    expect(seasons.map((s) => s.season)).toEqual([1, 2])
    expect(seasons[0].episodes.map((e) => e.number)).toEqual([1, 2])
    expect(seasons[0].watched).toBe(1)
    expect(seasons[0].unaired).toBe(0)
    expect(seasons[1].unaired).toBe(1)
  })

  it('treats a missing air date as aired rather than greying it out', () => {
    seed([{ season: 1, number: 1, airDate: null }])
    expect(tvRepo.listSeasons(showId, TODAY)[0].unaired).toBe(0)
  })

  it('matches a local file by season and number', () => {
    seed([
      { season: 1, number: 1 },
      { season: 1, number: 2 }
    ])
    db.prepare(
      `INSERT INTO video_file (media_id, file_path, title, number, season)
       VALUES (?, 'tp/s01e02.mkv', 'S01E02', 2, 1)`
    ).run(showId)

    const eps = tvRepo.listSeasons(showId, TODAY)[0].episodes
    expect(eps[0].fileId).toBeNull()
    expect(eps[1].fileId).not.toBeNull()
  })
})

describe('tvRepo.setWatched', () => {
  it('reports firstTime once and keeps the original date when re-ticked', () => {
    seed([{ season: 1, number: 1 }])
    const id = idOf(1, 1)

    expect(tvRepo.setWatched(id, true)).toEqual({ mediaId: showId, firstTime: true })
    const first = db.prepare('SELECT watched_at FROM tv_episode WHERE id=?').get(id) as {
      watched_at: string
    }
    expect(tvRepo.setWatched(id, true)).toEqual({ mediaId: showId, firstTime: false })
    expect(db.prepare('SELECT watched_at FROM tv_episode WHERE id=?').get(id)).toEqual(first)
  })

  it('clears the mark and reports no firstTime on unwatch', () => {
    seed([{ season: 1, number: 1 }])
    const id = idOf(1, 1)
    tvRepo.setWatched(id, true)
    expect(tvRepo.setWatched(id, false)).toEqual({ mediaId: showId, firstTime: false })
    expect(tvRepo.listSeasons(showId, TODAY)[0].episodes[0].watchedAt).toBeNull()
  })

  it('never touches media_item.progress — that is logProgress’s job', () => {
    seed([{ season: 1, number: 1 }])
    tvRepo.setWatched(idOf(1, 1), true)
    expect(mediaRepo.get(showId)!.progress).toBe(0)
  })

  it('returns null for an episode that does not exist', () => {
    expect(tvRepo.setWatched(999, true)).toBeNull()
  })
})

describe('tvRepo.setSeasonWatched', () => {
  it('skips unaired episodes and counts only newly-watched ones', () => {
    seed([
      { season: 1, number: 1 },
      { season: 1, number: 2 },
      { season: 1, number: 3, airDate: '2099-01-01' }
    ])
    tvRepo.setWatched(idOf(1, 1), true) // already watched: must not be counted again

    expect(tvRepo.setSeasonWatched(showId, 1, true, TODAY)).toEqual({ firstTime: 1 })
    const s = tvRepo.listSeasons(showId, TODAY)[0]
    expect(s.watched).toBe(2)
    expect(s.episodes[2].watchedAt).toBeNull() // unaired stayed untouched
  })

  it('unmarks everything including unaired, so it is a reliable undo', () => {
    seed([
      { season: 1, number: 1 },
      { season: 1, number: 2, airDate: '2099-01-01' }
    ])
    tvRepo.setWatched(idOf(1, 1), true)
    tvRepo.setWatched(idOf(1, 2), true) // hand-ticked an unaired episode

    tvRepo.setSeasonWatched(showId, 1, false, TODAY)
    expect(tvRepo.listSeasons(showId, TODAY)[0].watched).toBe(0)
  })

  it('leaves other seasons alone', () => {
    seed([
      { season: 1, number: 1 },
      { season: 2, number: 1 }
    ])
    tvRepo.setSeasonWatched(showId, 1, true, TODAY)
    expect(tvRepo.listSeasons(showId, TODAY)[1].watched).toBe(0)
  })
})

describe('tvRepo.replaceEpisodes', () => {
  it('refreshes canonical fields without disturbing watched_at', () => {
    seed([{ season: 1, number: 1, title: 'Pilot' }])
    tvRepo.setWatched(idOf(1, 1), true)

    tvRepo.replaceEpisodes(showId, {
      episodes: [
        {
          season: 1,
          number: 1,
          absolute: 1,
          title: 'Northwest Passage',
          overview: 'A body washes up.',
          airDate: '1990-04-08',
          runtime: 94
        }
      ],
      seasons: [1]
    })

    const ep = tvRepo.listSeasons(showId, TODAY)[0].episodes[0]
    expect(ep.title).toBe('Northwest Passage')
    expect(ep.runtime).toBe(94)
    expect(ep.watchedAt).not.toBeNull()
  })

  it('prunes episodes the source no longer lists', () => {
    seed([
      { season: 1, number: 1 },
      { season: 1, number: 2 },
      { season: 2, number: 1 }
    ])
    // Both seasons came back, so season 2 really is gone from the source.
    tvRepo.replaceEpisodes(showId, {
      episodes: [
        { season: 1, number: 1, absolute: 1, title: null, overview: null, airDate: null, runtime: null }
      ],
      seasons: [1, 2]
    })
    const seasons = tvRepo.listSeasons(showId, TODAY)
    expect(seasons).toHaveLength(1)
    expect(seasons[0].episodes.map((e) => e.number)).toEqual([1])
  })

  it('leaves the catalogue untouched when handed nothing', () => {
    seed([{ season: 1, number: 1 }])
    tvRepo.replaceEpisodes(showId, { episodes: [], seasons: [] })
    expect(tvRepo.listSeasons(showId, TODAY)[0].episodes).toHaveLength(1)
  })

  // The regression that cost watched_at: a season whose TMDB request failed is
  // absent from `episodes`, and a show-wide prune would delete every one of its
  // rows — marks included — with no way back.
  it('never prunes a season that was not fetched, keeping its watched marks', () => {
    seed([
      { season: 1, number: 1 },
      { season: 1, number: 2 },
      { season: 2, number: 1 }
    ])
    tvRepo.setWatched(idOf(1, 1), true)
    tvRepo.setWatched(idOf(1, 2), true)

    // Season 1 failed to fetch; only season 2 came back.
    tvRepo.replaceEpisodes(showId, {
      episodes: [
        { season: 2, number: 1, absolute: null, title: 'S2E1', overview: null, airDate: null, runtime: null }
      ],
      seasons: [2]
    })

    const seasons = tvRepo.listSeasons(showId, TODAY)
    expect(seasons.map((s) => s.season)).toEqual([1, 2])
    const s1 = seasons[0]
    expect(s1.episodes.map((e) => e.number)).toEqual([1, 2])
    expect(s1.episodes.every((e) => e.watchedAt)).toBe(true)
    // The season that DID come back still refreshes.
    expect(seasons[1].episodes[0].title).toBe('S2E1')
  })

  // A partial run publishes absolute: null rather than numbers it knows are
  // short, and those nulls must not overwrite a good earlier numbering.
  it('keeps existing absolute numbers when a partial run sends none', () => {
    seed([
      { season: 1, number: 1, absolute: 1 },
      { season: 2, number: 1, absolute: 2 }
    ])
    tvRepo.replaceEpisodes(showId, {
      episodes: [
        { season: 2, number: 1, absolute: null, title: null, overview: null, airDate: null, runtime: null }
      ],
      seasons: [2]
    })
    const seasons = tvRepo.listSeasons(showId, TODAY)
    expect(seasons[1].episodes[0].absolute).toBe(2)
  })

  it('dies with the show', () => {
    seed([{ season: 1, number: 1 }])
    mediaRepo.remove(showId)
    expect(db.prepare('SELECT COUNT(*) AS n FROM tv_episode').get()).toEqual({ n: 0 })
  })
})
