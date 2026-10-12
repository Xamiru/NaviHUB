import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '12901',
    title: 'No End in Sight',
    year: 2007
  },
  links: [
    { target: 'event:iraq-war', kind: 'documentary-about' }
  ],
  researched: '2026-10-13'
})
