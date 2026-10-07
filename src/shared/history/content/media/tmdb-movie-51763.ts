import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '51763',
    title: 'The Long Walk Home',
    year: 1990
  },
  links: [
    { target: 'event:montgomery-bus-boycott', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
