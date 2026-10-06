import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '429662',
    title: 'Viceroy\'s House',
    year: 2017
  },
  links: [
    { target: 'event:partition-of-india', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
