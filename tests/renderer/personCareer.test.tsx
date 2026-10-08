import { describe, expect, it } from 'vitest'
import type { PersonCredit } from '../../src/shared/types'
import {
  buildCareerTimeline,
  groupActingRoles,
  pickKnownFor
} from '../../src/renderer/src/lib/personCareer'

function credit({
  creditId,
  mediaId,
  title,
  releaseDate,
  role,
  character,
  roleNote
}: {
  creditId: number
  mediaId: number
  title: string
  releaseDate: string | null
  role: PersonCredit['role']
  character?: { id: number; name: string }
  roleNote?: string | null
}): PersonCredit {
  return {
    creditId,
    media: { id: mediaId, title, releaseDate } as PersonCredit['media'],
    character: character ? ({ ...character } as PersonCredit['character']) : null,
    role,
    language: null,
    roleNote: roleNote ?? null,
    castPosition: null,
    castSize: 0
  }
}

describe('person career timeline', () => {
  it('groups credits by title and combines distinct character and crew roles', () => {
    const timeline = buildCareerTimeline([
      credit({ creditId: 1, mediaId: 7, title: 'Shared title', releaseDate: '2012-04-01', role: 'voice_actor', character: { id: 1, name: 'Aki' } }),
      credit({ creditId: 2, mediaId: 7, title: 'Shared title', releaseDate: '2012-04-01', role: 'voice_actor', character: { id: 2, name: 'Ren' } }),
      credit({ creditId: 3, mediaId: 7, title: 'Shared title', releaseDate: '2012-04-01', role: 'director' }),
      credit({ creditId: 4, mediaId: 7, title: 'Shared title', releaseDate: '2012-04-01', role: 'director' })
    ])

    expect(timeline).toHaveLength(1)
    expect(timeline[0].roleLabels).toEqual([
      'Aki (voice actor)',
      'Ren (voice actor)',
      'director'
    ])
  })

  it('sorts oldest to newest and places undated titles last', () => {
    const timeline = buildCareerTimeline([
      credit({ creditId: 1, mediaId: 3, title: 'Unknown', releaseDate: null, role: 'actor' }),
      credit({ creditId: 2, mediaId: 2, title: 'Later', releaseDate: '2020-01-01', role: 'actor' }),
      credit({ creditId: 3, mediaId: 1, title: 'Earlier', releaseDate: '2001-01-01', role: 'actor' })
    ])

    expect(timeline.map((entry) => entry.media.title)).toEqual(['Earlier', 'Later', 'Unknown'])
  })
})

function voiced(
  id: number,
  mediaId: number,
  opts: { char: number; pos?: number | null; size?: number; date?: string | null; score?: number | null; type?: string }
): PersonCredit {
  return {
    creditId: id,
    media: {
      id: mediaId,
      title: `T${mediaId}`,
      releaseDate: opts.date ?? null,
      score: opts.score ?? null,
      mediaType: opts.type ?? 'anime'
    } as PersonCredit['media'],
    character: { id: opts.char, name: `C${opts.char}` } as PersonCredit['character'],
    role: 'voice_actor',
    language: 'Japanese',
    roleNote: null,
    castPosition: opts.pos ?? null,
    castSize: opts.size ?? 0
  }
}

describe('person role grid', () => {
  it('collapses a character across titles onto its most prominent credit and lists every title', () => {
    const [group] = groupActingRoles(
      [
        voiced(1, 10, { char: 1, pos: 8, size: 10 }),
        voiced(2, 11, { char: 1, pos: 0, size: 10 })
      ],
      ['anime'],
      'prominence'
    )
    expect(group.entries).toHaveLength(1)
    expect(group.entries[0].credit.creditId).toBe(2)
    expect(group.entries[0].titles).toEqual(['T10', 'T11'])
  })

  it('sorts by cast rank relative to cast size, unordered casts last', () => {
    const [group] = groupActingRoles(
      [
        voiced(1, 1, { char: 1 }),
        voiced(2, 2, { char: 2, pos: 5, size: 10 }),
        voiced(3, 3, { char: 3, pos: 5, size: 100 })
      ],
      ['anime'],
      'prominence'
    )
    expect(group.entries.map((e) => e.credit.creditId)).toEqual([3, 2, 1])
  })

  it('sorts by date with undated roles last in both directions, groups by type order', () => {
    const credits = [
      voiced(1, 1, { char: 1, date: null }),
      voiced(2, 2, { char: 2, date: '2010-01-01' }),
      voiced(3, 3, { char: 3, date: '2020-01-01' }),
      voiced(4, 4, { char: 4, date: '2015-01-01', type: 'visual_novel' })
    ]
    const newest = groupActingRoles(credits, ['visual_novel', 'anime'], 'newest')
    expect(newest.map((g) => g.type)).toEqual(['visual_novel', 'anime'])
    expect(newest[1].entries.map((e) => e.credit.creditId)).toEqual([3, 2, 1])
    const oldest = groupActingRoles(credits, ['visual_novel', 'anime'], 'oldest')
    expect(oldest[1].entries.map((e) => e.credit.creditId)).toEqual([2, 3, 1])
  })
})

describe('person known-for strip', () => {
  it('puts scored titles first, fills with the biggest unscored roles and skips minor ones', () => {
    const picked = pickKnownFor(
      [
        voiced(1, 1, { char: 1, pos: 0, size: 10 }),
        voiced(2, 2, { char: 2, pos: 3, size: 10, score: 70 }),
        voiced(3, 3, { char: 3, pos: 2, size: 10, score: 90 }),
        voiced(4, 4, { char: 4, pos: 40, size: 50 }),
        voiced(5, 5, { char: 1, pos: 0, size: 10 })
      ],
      6
    )
    // 4 is outside the top third of a 50-strong cast; 5 repeats character 1.
    expect(picked.map((c) => c.creditId)).toEqual([3, 2, 1])
  })
})
