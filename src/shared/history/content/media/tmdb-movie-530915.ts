import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '530915', title: '1917', year: 2019 },
  links: [
    { target: 'event:first-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
