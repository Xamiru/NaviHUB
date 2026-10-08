import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '357286',
    title: 'Guts and Glory: The Rise and Fall of Oliver North',
    year: 1989
  },
  links: [
    { target: 'event:iran-contra-affair', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-08'
})
