import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '11973',
    title: 'Thirteen Days',
    year: 2000
  },
  links: [
    {
      target: 'event:cuban-missile-crisis',
      kind: 'dramatisation-of',
      portrayals: [
        { person: 'person:john-f-kennedy' }
      ]
    }
  ],
  researched: '2026-10-07'
})
