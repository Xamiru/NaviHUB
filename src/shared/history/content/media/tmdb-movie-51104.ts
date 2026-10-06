import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '51104',
    title: 'Krakatoa, East of Java',
    year: 1968
  },
  links: [
    { target: 'event:eruption-of-krakatoa', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
