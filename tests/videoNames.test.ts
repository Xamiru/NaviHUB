import { describe, expect, it } from 'vitest'
import {
  cleanTitle,
  dropSharedNumber,
  episodeTitle,
  folderSeason,
  isVideoFile,
  looksLikeSample,
  parseEpisodeName
} from '../src/main/video/names'

const ep = (name: string): { season: number | null; number: number | null } => {
  const { season, number } = parseEpisodeName(name)
  return { season, number }
}

describe('isVideoFile', () => {
  it('accepts video containers and rejects everything else', () => {
    expect(isVideoFile('ep01.mkv')).toBe(true)
    expect(isVideoFile('ep01.MP4')).toBe(true)
    expect(isVideoFile('ep01.avi')).toBe(true)
    expect(isVideoFile('ep01.srt')).toBe(false)
    expect(isVideoFile('cover.jpg')).toBe(false)
    expect(isVideoFile('.hidden.mkv')).toBe(false)
  })
})

describe('parseEpisodeName — explicit markers', () => {
  it('reads SxxExx and its punctuated variants', () => {
    expect(ep('Show.S01E03.1080p.mkv')).toEqual({ season: 1, number: 3 })
    expect(ep('Show S02E11 [1080p].mkv')).toEqual({ season: 2, number: 11 })
    expect(ep('Show s1e5.mp4')).toEqual({ season: 1, number: 5 })
    expect(ep('Show.S01.E03.mkv')).toEqual({ season: 1, number: 3 })
  })

  it('reads the 1x03 form', () => {
    expect(ep('Show 1x03.mkv')).toEqual({ season: 1, number: 3 })
    expect(ep('Show - 2x11 - Title.mkv')).toEqual({ season: 2, number: 11 })
  })

  it('reads Japanese episode markers', () => {
    expect(ep('進撃の巨人 第03話.mkv')).toEqual({ season: null, number: 3 })
    expect(ep('Show 第12話 [1080p].mkv')).toEqual({ season: null, number: 12 })
  })

  it('reads Episode/Ep/E forms', () => {
    expect(ep('Show - Episode 5.mkv')).toEqual({ season: null, number: 5 })
    expect(ep('Show Ep.05.mkv')).toEqual({ season: null, number: 5 })
    expect(ep('Show E07.mkv')).toEqual({ season: null, number: 7 })
  })
})

describe('parseEpisodeName — fansub naming', () => {
  it('handles the dominant "<Title> - NN [tags]" convention', () => {
    expect(ep('[SubsPlease] Frieren - 03 (1080p) [A1B2C3D4].mkv')).toEqual({
      season: null,
      number: 3
    })
    expect(ep('[Erai-raws] Show - 12 [1080p][Multiple Subtitle][ABCD1234].mkv')).toEqual({
      season: null,
      number: 12
    })
    expect(ep('[Group] Show - 03v2 [BD 1920x1080 HEVC FLAC].mkv')).toEqual({
      season: null,
      number: 3
    })
  })

  it('finds a number kept inside brackets', () => {
    expect(ep('[DB]Show[01][x265][1080p].mkv')).toEqual({ season: null, number: 1 })
  })

  it('reads a decimal episode', () => {
    expect(ep('[Group] Show - 03.5 (1080p).mkv')).toEqual({ season: null, number: 3.5 })
  })

  it('picks the episode, not a number that is part of the title', () => {
    // These are the cases where "first number wins" gets it wrong.
    expect(ep('[Group] 86 - Eighty Six - 03 [1080p].mkv')).toEqual({ season: null, number: 3 })
    expect(ep('[Group] 5-toubun no Hanayome - 07 [1080p].mkv')).toEqual({ season: null, number: 7 })
    expect(ep('[Group] Re Zero kara Hajimeru - 04 [1080p].mkv')).toEqual({ season: null, number: 4 })
  })

  it('picks up a standalone season marker alongside a bare episode', () => {
    expect(ep('[Group] Show S2 - 03 [1080p].mkv')).toEqual({ season: 2, number: 3 })
  })
})

describe('parseEpisodeName — the negatives that matter', () => {
  it('never mistakes technical tags for an episode number', () => {
    // Each of these has exactly ONE plausible-looking number and it is noise.
    expect(ep('Movie [1080p].mkv').number).toBeNull()
    expect(ep('Movie [x265].mkv').number).toBeNull()
    expect(ep('Movie [10bit].mkv').number).toBeNull()
    expect(ep('Movie (2019).mkv').number).toBeNull()
    expect(ep('Movie [FLAC 5.1ch].mkv').number).toBeNull()
    expect(ep('Movie [A1B2C3D4].mkv').number).toBeNull()
    expect(ep('Movie [1920x1080].mkv').number).toBeNull()
    expect(ep('Movie [AAC 2.0].mkv').number).toBeNull()
    expect(ep('Movie [WEB-DL].mkv').number).toBeNull()
  })

  it('survives a name that is nothing but noise', () => {
    expect(ep('[Group] Some Film (2019) [BD 1920x1080 x264 FLAC 5.1] [DEADBEEF].mkv')).toEqual({
      season: null,
      number: null
    })
  })

  it('does not let a version marker become the episode', () => {
    expect(ep('[Group] Show - 08v2 [1080p].mkv')).toEqual({ season: null, number: 8 })
  })
})

describe('looksLikeSample', () => {
  it('flags samples but keeps creditless OP/ED, which are real content', () => {
    expect(looksLikeSample('Show-sample.mkv')).toBe(true)
    expect(looksLikeSample('sample.mkv')).toBe(true)
    expect(looksLikeSample('[Group] Show - NCOP [1080p].mkv')).toBe(false)
    expect(looksLikeSample('[Group] Show - 03 [1080p].mkv')).toBe(false)
  })
})

describe('cleanTitle / episodeTitle', () => {
  it('strips groups and tags down to something readable', () => {
    expect(cleanTitle('[SubsPlease] Frieren - 03 (1080p) [A1B2C3D4].mkv')).toBe('Frieren - 03')
    expect(cleanTitle('Some.Film.2019.1080p.BluRay.x264.mkv')).toBe('Some Film')
    expect(cleanTitle('Plain Name.mkv')).toBe('Plain Name')
  })

  it('never returns an empty label', () => {
    expect(cleanTitle('[1080p].mkv')).toBe('[1080p]')
  })

  it('labels numbered episodes uniformly and falls back to the filename', () => {
    expect(episodeTitle(parseEpisodeName('[SubsPlease] Frieren - 03 (1080p).mkv'))).toBe('Episode 03')
    expect(episodeTitle(parseEpisodeName('Show.S02E11.mkv'))).toBe('S2 · Episode 11')
    expect(episodeTitle(parseEpisodeName('[Group] Show - 03.5.mkv'))).toBe('Episode 3.5')
    expect(episodeTitle(parseEpisodeName('Some.Film.2019.1080p.mkv'))).toBe('Some Film')
  })
})

describe('parseEpisodeName — a bare resolution with no p', () => {
  it('loses to an earlier number in the same name', () => {
    expect(ep('[G] Show 03 [720][A1B2C3D4].mkv')).toEqual({ season: null, number: 3 })
    expect(ep('Show_03_720.mkv')).toEqual({ season: null, number: 3 })
    expect(ep('Show 12 (1080).mp4')).toEqual({ season: null, number: 12 })
  })

  it('is still the episode when nothing else is numbered (One Piece has an episode 720)', () => {
    expect(ep('One Piece - 720.mkv').number).toBe(720)
    expect(ep('One Piece 720 [1080p].mkv').number).toBe(720)
    expect(ep('Detective Conan - 1080 [720p].mkv').number).toBe(1080)
  })
})

describe('dropSharedNumber', () => {
  const read = (names: string[]): (number | null)[] =>
    dropSharedNumber(names, names.map((n) => parseEpisodeName(n))).map((p) => p.number)

  it('re-reads a folder whose every name carries the same tag number', () => {
    expect(read(['Show 01 [Disc 3].mkv', 'Show 02 [Disc 3].mkv', 'Show 03 [Disc 3].mkv'])).toEqual([1, 2, 3])
  })

  it('keeps the first reading when the re-read would not give each file its own number', () => {
    expect(read(['Show - 05.mkv', 'Show - 05v2.mkv'])).toEqual([5, 5])
  })

  it('leaves a folder of distinct numbers and a lone file alone', () => {
    expect(read(['One Piece - 719.mkv', 'One Piece - 720.mkv'])).toEqual([719, 720])
    expect(read(['One Piece - 720.mkv'])).toEqual([720])
  })
})

describe('folderSeason', () => {
  it('reads the common season folder names', () => {
    expect(folderSeason('Season 2')).toBe(2)
    expect(folderSeason('Season 02 (2015)')).toBe(2)
    expect(folderSeason('Series 3')).toBe(3)
    expect(folderSeason('S02')).toBe(2)
    expect(folderSeason('Show S2 [1080p]')).toBe(2)
  })

  it('maps specials and OVA folders to season 0', () => {
    expect(folderSeason('Specials')).toBe(0)
    expect(folderSeason('OVA')).toBe(0)
    expect(episodeTitle({ season: 0, number: 1, label: 'x' })).toBe('Special 01')
  })

  it('returns null for folders that name no season', () => {
    expect(folderSeason('Extras')).toBeNull()
    expect(folderSeason('Mob Psycho 100')).toBeNull()
    expect(folderSeason('1080p')).toBeNull()
  })
})
