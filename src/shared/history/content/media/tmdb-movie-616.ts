import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '616',
    title: 'The Last Samurai',
    year: 2003
  },
  links: [
    { target: 'event:satsuma-rebellion', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
