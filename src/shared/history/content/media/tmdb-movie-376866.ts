import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '376866', title: 'Jackie', year: 2016 },
  links: [
    { target: 'event:assassination-of-john-f-kennedy', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
