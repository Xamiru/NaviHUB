import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '143',
    title: 'All Quiet on the Western Front',
    year: 1930
  },
  links: [
    { target: 'event:first-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
