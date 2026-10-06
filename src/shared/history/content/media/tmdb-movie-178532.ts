import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '178532',
    title: 'Train to Pakistan',
    year: 1998
  },
  links: [
    { target: 'event:partition-of-india', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
