import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '318846',
    title: 'The Big Short',
    year: 2015
  },
  links: [
    { target: 'event:2008-financial-crisis', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-12'
})
