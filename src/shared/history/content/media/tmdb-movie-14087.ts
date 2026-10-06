import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '14087',
    title: 'Barefoot Gen',
    year: 1983
  },
  links: [
    { target: 'event:atomic-bombings-of-hiroshima-and-nagasaki', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
