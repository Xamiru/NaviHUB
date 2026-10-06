import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '1770',
    title: 'Michael Collins',
    year: 1996
  },
  links: [
    { target: 'event:easter-rising', kind: 'set-during' },
    { target: 'event:anglo-irish-treaty', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
