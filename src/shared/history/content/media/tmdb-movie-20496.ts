import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '20496',
    title: 'Mangal Pandey: The Rising',
    year: 2005
  },
  links: [
    { target: 'event:indian-rebellion-of-1857', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
