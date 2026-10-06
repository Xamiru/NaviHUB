import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '16351', title: 'Ararat', year: 2002 },
  links: [
    { target: 'event:armenian-genocide', kind: 'inspired-by' }
  ],
  researched: '2026-10-06'
})
