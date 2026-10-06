import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '49046',
    title: 'All Quiet on the Western Front',
    year: 2022
  },
  links: [
    { target: 'event:first-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
