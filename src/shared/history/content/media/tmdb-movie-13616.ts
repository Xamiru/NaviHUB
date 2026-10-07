import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '13616',
    title: 'Children of Glory',
    year: 2006
  },
  links: [
    { target: 'event:hungarian-revolution-of-1956', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
