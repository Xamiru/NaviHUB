import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '17382',
    title: 'They Died with Their Boots On',
    year: 1941
  },
  links: [
    { target: 'event:battle-of-the-little-bighorn', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
