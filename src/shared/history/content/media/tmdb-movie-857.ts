import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '857',
    title: 'Saving Private Ryan',
    year: 1998
  },
  links: [
    { target: 'event:second-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
