import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '37305',
    title: 'Pork Chop Hill',
    year: 1959
  },
  links: [
    { target: 'event:korean-war', kind: 'set-during' }
  ],
  researched: '2026-10-07'
})
