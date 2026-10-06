import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '760336',
    title: 'Munich: The Edge of War',
    year: 2021
  },
  links: [
    { target: 'event:munich-agreement', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
