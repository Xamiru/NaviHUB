import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '69848',
    title: 'One Man\'s Hero',
    year: 1999
  },
  links: [
    { target: 'event:mexican-american-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
