import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '63195',
    title: 'La Commune (Paris, 1871)',
    year: 2000
  },
  links: [
    { target: 'event:paris-commune', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
