import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '43884',
    title: 'The Charge of the Light Brigade',
    year: 1936
  },
  links: [
    { target: 'event:crimean-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
