import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '10655', title: 'Gettysburg', year: 1993 },
  links: [
    { target: 'event:american-civil-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
