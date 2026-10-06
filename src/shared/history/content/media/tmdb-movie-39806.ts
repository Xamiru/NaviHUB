import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '39806',
    title: 'Princess Kaiulani',
    year: 2009
  },
  links: [
    { target: 'event:annexation-of-hawaii', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
