import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '52632',
    title: 'Hidalgo: la historia jamás contada',
    year: 2010
  },
  links: [
    {
      target: 'person:miguel-hidalgo',
      kind: 'features-person',
      portrayals: [
        { person: 'person:miguel-hidalgo' },
        { person: 'person:jose-maria-morelos' }
      ]
    }
  ],
  researched: '2026-10-06'
})
