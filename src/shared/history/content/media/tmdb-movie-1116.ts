import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '1116',
    title: 'The Wind That Shakes the Barley',
    year: 2006
  },
  links: [
    { target: 'event:anglo-irish-treaty', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
