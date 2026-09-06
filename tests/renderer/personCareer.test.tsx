import { describe, expect, it } from 'vitest'
import type { PersonCredit } from '../../src/shared/types'
import { buildCareerTimeline } from '../../src/renderer/src/lib/personCareer'

function credit({
  creditId,
  mediaId,
  title,
  releaseDate,
  role,
  character
}: {
  creditId: number
  mediaId: number
  title: string
  releaseDate: string | null
  role: PersonCredit['role']
  character?: { id: number; name: string }
}): PersonCredit {
  return {
    creditId,
    media: { id: mediaId, title, releaseDate } as PersonCredit['media'],
    character: character ? ({ ...character } as PersonCredit['character']) : null,
    role,
    language: null
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
