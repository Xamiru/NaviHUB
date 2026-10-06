import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '921',
    title: 'Cinderella Man',
    year: 2005
  },
  links: [
    { target: 'period:great-depression', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
