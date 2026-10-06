import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '76758',
    title: 'The Flowers of War',
    year: 2011
  },
  links: [
    { target: 'event:nanjing-massacre', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
