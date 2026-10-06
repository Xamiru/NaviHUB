import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '113012',
    title: 'Distant Thunder',
    year: 1973
  },
  links: [
    { target: 'event:bengal-famine-of-1943', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
