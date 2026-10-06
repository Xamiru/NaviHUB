import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '49007',
    title: 'Iron Jawed Angels',
    year: 2004
  },
  links: [
    { target: 'event:nineteenth-amendment', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
