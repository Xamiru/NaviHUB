import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '293703',
    title: 'The Lady with the Lamp',
    year: 1951
  },
  links: [
    { target: 'event:crimean-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
