import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '43278',
    title: 'The Life of Emile Zola',
    year: 1937
  },
  links: [
    { target: 'event:dreyfus-affair', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
