import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '9093',
    title: 'The Four Feathers',
    year: 2002
  },
  links: [
    { target: 'period:mahdiyah', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
