import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '416144',
    title: 'Hotel Mumbai',
    year: 2018
  },
  links: [
    { target: 'event:2008-mumbai-attacks', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-12'
})
