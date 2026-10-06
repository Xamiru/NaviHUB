import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '336062',
    title: 'Papaflessas',
    year: 1971
  },
  links: [
    { target: 'event:greek-war-of-independence', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
