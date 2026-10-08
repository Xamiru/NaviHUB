import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '43980',
    title: 'Bashu, the Little Stranger',
    year: 1989
  },
  links: [
    { target: 'event:iran-iraq-war', kind: 'set-during' }
  ],
  researched: '2026-10-08'
})
