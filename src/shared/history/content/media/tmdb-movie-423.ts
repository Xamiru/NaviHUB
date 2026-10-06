import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '423', title: 'The Pianist', year: 2002 },
  links: [
    { target: 'event:the-holocaust', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
