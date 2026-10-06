import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '542921',
    title: 'While at War',
    year: 2019
  },
  links: [
    { target: 'event:spanish-civil-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
