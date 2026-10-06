import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '27759',
    title: '55 Days at Peking',
    year: 1963
  },
  links: [
    {
      target: 'event:boxer-uprising',
      kind: 'dramatisation-of',
      portrayals: [
        { person: 'person:cixi' }
      ]
    }
  ],
  researched: '2026-10-06'
})
