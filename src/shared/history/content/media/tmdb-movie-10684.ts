import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '10684',
    title: 'Courage Under Fire',
    year: 1996
  },
  links: [
    { target: 'event:gulf-war', kind: 'set-during' }
  ],
  researched: '2026-10-10'
})
