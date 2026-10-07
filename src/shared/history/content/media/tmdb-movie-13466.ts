import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '13466', title: 'October Sky', year: 1999 },
  links: [
    { target: 'event:launch-of-sputnik-1', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
