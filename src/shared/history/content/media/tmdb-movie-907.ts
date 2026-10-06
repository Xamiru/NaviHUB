import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '907',
    title: 'Doctor Zhivago',
    year: 1965
  },
  links: [
    { target: 'event:russian-revolution-of-1917', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
