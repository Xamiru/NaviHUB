import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '6415', title: 'Three Kings', year: 1999 },
  links: [
    { target: 'event:gulf-war', kind: 'set-during' },
    { target: 'event:1991-uprisings-in-iraq', kind: 'set-during' }
  ],
  researched: '2026-10-10'
})
