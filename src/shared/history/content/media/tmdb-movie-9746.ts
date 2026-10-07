import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '9746', title: 'Kundun', year: 1997 },
  links: [
    { target: 'event:1959-tibetan-uprising', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
