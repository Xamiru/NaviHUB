import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '21345',
    title: 'City of Life and Death',
    year: 2009
  },
  links: [
    { target: 'event:nanjing-massacre', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
