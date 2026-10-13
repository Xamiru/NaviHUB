import { describe, expect, it } from 'vitest'
import type { QuizSong } from '../src/shared/types'
import {
  animeFranchiseKey,
  pickSongDistractors,
  songRecordingIndex,
  songRecordingKey
} from '../src/shared/songQuiz'
import { seededRng } from '../src/shared/quizCore'

function song(themeId: number, mediaId: number, animeTitle: string, title: string, artist = 'Singer'): QuizSong {
  return {
    themeId,
    slug: 'OP1',
    type: 'OP',
    title,
    audioUrl: null,
    audioPath: `audio/${themeId}.ogg`,
    mediaId,
    animeTitle,
    coverPath: null,
    status: null,
    artists: [artist],
    year: 2015,
    genres: ['Action']
  }
}

describe('Song Quiz answer rules', () => {
  it('maps one recording to every anime that uses it, remasters included', () => {
    const pool = [
      song(1, 10, 'Show', 'Shared Song'),
      song(2, 11, 'Show Part 2', 'Shared Song (Remastered 2020)'),
      song(3, 12, 'Other', 'Different Song'),
      song(4, 13, 'Cover Show', 'Shared Song', 'Another Singer')
    ]
    const sameRecording = songRecordingIndex(pool)
    expect(sameRecording(pool[0]).sort()).toEqual([10, 11])
    expect(sameRecording(pool[2])).toEqual([12])
    // A different performer is a different recording.
    expect(sameRecording(pool[3])).toEqual([13])
    expect(songRecordingKey({ title: null, artists: ['X'] })).toBeNull()
  })

  it('reduces sequel titles to one franchise key without merging short prefixes', () => {
    const show = animeFranchiseKey('Attack on Titan')
    expect(animeFranchiseKey('Attack on Titan Season 2')).toBe(show)
    expect(animeFranchiseKey('Attack on Titan: The Final Season')).toBe(show)
    expect(animeFranchiseKey('Mob Psycho 100 II')).toBe(animeFranchiseKey('Mob Psycho 100'))
    expect(animeFranchiseKey('Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season')).toBe(
      animeFranchiseKey('Re:Zero kara Hajimeru Isekai Seikatsu')
    )
    expect(animeFranchiseKey('Re:Zero kara Hajimeru Isekai Seikatsu')).not.toBe(
      animeFranchiseKey('Re:Creators')
    )
    expect(animeFranchiseKey('86')).toBe('86')
  })

  it('never offers an anime using the same recording, and caps a franchise at two options', () => {
    const answer = song(1, 10, 'Show', 'Answer')
    const pool = [
      answer,
      song(2, 11, 'Show Season 2', 'S2 Song'),
      song(3, 12, 'Show Season 3', 'S3 Song'),
      song(4, 13, 'Show Season 4', 'S4 Song'),
      song(5, 14, 'Show Part 2', 'Answer'),
      song(6, 20, 'Elsewhere', 'E'),
      song(7, 21, 'Another', 'A'),
      song(8, 22, 'Third', 'T')
    ]
    const sameRecording = songRecordingIndex(pool)(answer)
    expect(sameRecording.sort()).toEqual([10, 14])
    const franchiseOf = (value: QuizSong) => animeFranchiseKey(value.animeTitle)
    for (let seed = 0; seed < 20; seed++) {
      const picked = pickSongDistractors(pool, answer, 3, sameRecording, franchiseOf, seededRng(seed))
      expect(picked).toHaveLength(3)
      expect(picked.some((value) => value.mediaId === 14)).toBe(false)
      expect(picked.filter((value) => franchiseOf(value) === franchiseOf(answer)).length).toBeLessThanOrEqual(1)
    }
  })

  it('fills from the capped franchise only when nothing else is left', () => {
    const answer = song(1, 10, 'Show', 'Answer')
    const pool = [
      answer,
      song(2, 11, 'Show Season 2', 'B'),
      song(3, 12, 'Show Season 3', 'C'),
      song(4, 13, 'Elsewhere', 'D')
    ]
    const franchiseOf = (value: QuizSong) => animeFranchiseKey(value.animeTitle)
    const picked = pickSongDistractors(pool, answer, 3, [10], franchiseOf, seededRng(1))
    expect(picked.map((value) => value.mediaId).sort()).toEqual([11, 12, 13])
  })
})
