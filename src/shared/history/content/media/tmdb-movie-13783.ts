import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '13783',
    title: 'Breaker Morant',
    year: 1980
  },
  links: [
    { target: 'event:south-african-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
