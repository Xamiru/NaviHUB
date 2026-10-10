import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '25', title: 'Jarhead', year: 2005 },
  links: [
    { target: 'event:gulf-war', kind: 'set-during' }
  ],
  researched: '2026-10-10'
})
