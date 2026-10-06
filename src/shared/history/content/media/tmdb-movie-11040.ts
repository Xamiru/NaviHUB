import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '11040',
    title: 'Little Big Man',
    year: 1970
  },
  links: [
    { target: 'event:battle-of-the-little-bighorn', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
