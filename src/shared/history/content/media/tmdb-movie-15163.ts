import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '15163',
    title: 'Amazing Grace',
    year: 2006
  },
  links: [
    { target: 'event:slave-trade-act-1807', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
