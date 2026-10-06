import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '643',
    title: 'Battleship Potemkin',
    year: 1925
  },
  links: [
    { target: 'event:russian-revolution-of-1905', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
