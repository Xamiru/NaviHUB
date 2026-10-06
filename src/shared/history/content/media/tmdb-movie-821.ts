import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '821',
    title: 'Judgment at Nuremberg',
    year: 1961
  },
  links: [
    { target: 'event:nuremberg-trials', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
