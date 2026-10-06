import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '183654', title: 'Garm Hava', year: 1973 },
  links: [
    { target: 'event:partition-of-india', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
