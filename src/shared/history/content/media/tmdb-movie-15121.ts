import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '15121',
    title: 'The Sound of Music',
    year: 1965
  },
  links: [
    { target: 'event:anschluss', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
