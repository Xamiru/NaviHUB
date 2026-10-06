import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '7504', title: 'Earth', year: 1998 },
  links: [
    { target: 'event:partition-of-india', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
