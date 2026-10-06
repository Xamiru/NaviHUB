import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '424',
    title: 'Schindler\'s List',
    year: 1993
  },
  links: [
    { target: 'event:the-holocaust', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
