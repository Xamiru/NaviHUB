import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '65034',
    title: 'Too Big to Fail',
    year: 2011
  },
  links: [
    { target: 'event:2008-financial-crisis', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-12'
})
