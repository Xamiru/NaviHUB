import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '1718',
    title: 'Santa Fe Trail',
    year: 1940
  },
  links: [
    {
      target: 'person:john-brown',
      kind: 'features-person',
      portrayals: [
        { person: 'person:john-brown' }
      ]
    }
  ],
  researched: '2026-10-06'
})
