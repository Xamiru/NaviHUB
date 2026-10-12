import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '80278',
    title: 'The Impossible',
    year: 2012
  },
  links: [
    { target: 'event:2004-indian-ocean-earthquake-and-tsunami', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-12'
})
