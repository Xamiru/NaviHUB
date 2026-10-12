import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '8847',
    title: 'Standard Operating Procedure',
    year: 2008
  },
  links: [
    { target: 'event:iraq-war', kind: 'documentary-about' }
  ],
  researched: '2026-10-13'
})
