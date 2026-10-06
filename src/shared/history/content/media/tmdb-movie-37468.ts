import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '37468',
    title: 'The Big Lift',
    year: 1950
  },
  links: [
    { target: 'event:berlin-blockade', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
