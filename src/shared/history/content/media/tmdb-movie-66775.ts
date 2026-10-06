import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '66775',
    title: 'Young Winston',
    year: 1972
  },
  links: [
    { target: 'event:battle-of-omdurman', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
