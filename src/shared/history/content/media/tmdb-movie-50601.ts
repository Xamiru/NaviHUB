import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '50601',
    title: '5 Days of War',
    year: 2011
  },
  links: [
    { target: 'event:russo-georgian-war', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-12'
})
