import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '262249',
    title: 'Sutter\'s Gold',
    year: 1936
  },
  links: [
    { target: 'event:california-gold-rush', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
