import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '481705',
    title: 'Sattar Khan',
    year: 1972
  },
  links: [
    {
      target: 'event:siege-of-tabriz',
      kind: 'dramatisation-of',
      portrayals: [
        { person: 'person:sattar-khan' },
        { person: 'person:baqer-khan' }
      ]
    }
  ],
  researched: '2026-10-06'
})
