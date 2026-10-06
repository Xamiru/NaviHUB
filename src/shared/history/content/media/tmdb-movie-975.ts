import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '975',
    title: 'Paths of Glory',
    year: 1957
  },
  links: [
    { target: 'event:first-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
