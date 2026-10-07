import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '820', title: 'JFK', year: 1991 },
  links: [
    { target: 'event:assassination-of-john-f-kennedy', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-07'
})
