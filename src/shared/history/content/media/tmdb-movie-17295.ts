import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '17295',
    title: 'The Battle of Algiers',
    year: 1966
  },
  links: [
    { target: 'event:algerian-war', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-07'
})
