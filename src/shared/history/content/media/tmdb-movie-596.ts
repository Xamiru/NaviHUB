import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '596',
    title: 'The Grapes of Wrath',
    year: 1940
  },
  links: [
    { target: 'period:great-depression', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
