import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '53129',
    title: 'The Turkish Gambit',
    year: 2005
  },
  links: [
    { target: 'event:russo-turkish-war-1877-1878', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
