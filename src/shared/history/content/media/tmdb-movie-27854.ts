import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '27854',
    title: 'For Whom the Bell Tolls',
    year: 1942
  },
  links: [
    { target: 'event:spanish-civil-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
