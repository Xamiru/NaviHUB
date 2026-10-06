import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '38884',
    title: 'Land and Freedom',
    year: 1995
  },
  links: [
    { target: 'event:spanish-civil-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
