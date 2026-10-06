import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '11165',
    title: 'Tora! Tora! Tora!',
    year: 1970
  },
  links: [
    { target: 'event:second-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
