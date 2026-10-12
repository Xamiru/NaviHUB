import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '67', title: 'Paradise Now', year: 2005 },
  links: [
    { target: 'event:second-intifada', kind: 'set-during' }
  ],
  researched: '2026-10-13'
})
