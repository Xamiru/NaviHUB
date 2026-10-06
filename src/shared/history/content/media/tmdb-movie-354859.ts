import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '354859',
    title: 'The Promise',
    year: 2016
  },
  links: [
    { target: 'event:armenian-genocide', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
