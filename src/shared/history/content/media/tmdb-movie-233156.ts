import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '233156',
    title: 'Prisoner of Honor',
    year: 1991
  },
  links: [
    { target: 'event:dreyfus-affair', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
