import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '87683',
    title: 'Krakatoa: The Last Days',
    year: 2006
  },
  links: [
    { target: 'event:eruption-of-krakatoa', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
