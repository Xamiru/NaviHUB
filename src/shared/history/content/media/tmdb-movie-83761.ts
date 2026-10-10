import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '83761',
    title: 'Life, and Nothing More...',
    year: 1992
  },
  links: [
    { target: 'event:manjil-rudbar-earthquake', kind: 'set-during' }
  ],
  researched: '2026-10-10'
})
