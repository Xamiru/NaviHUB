import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '42193',
    title: 'The Charge of the Light Brigade',
    year: 1968
  },
  links: [
    { target: 'event:crimean-war', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
