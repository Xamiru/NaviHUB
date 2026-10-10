import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '205', title: 'Hotel Rwanda', year: 2004 },
  links: [
    { target: 'event:rwandan-genocide', kind: 'set-during' }
  ],
  researched: '2026-10-10'
})
