import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '161382',
    title: 'The Opium War',
    year: 1997
  },
  links: [
    { target: 'event:first-opium-war', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
