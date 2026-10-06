import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '1941', title: 'Exodus', year: 1960 },
  links: [
    { target: 'event:1948-arab-israeli-war', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
