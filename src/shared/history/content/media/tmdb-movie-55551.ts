import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '55551', title: 'Lumumba', year: 2000 },
  links: [
    {
      target: 'event:congo-crisis',
      kind: 'dramatisation-of',
      portrayals: [
        { person: 'person:patrice-lumumba' }
      ]
    },
    { target: 'person:patrice-lumumba', kind: 'features-person' }
  ],
  researched: '2026-10-07'
})
