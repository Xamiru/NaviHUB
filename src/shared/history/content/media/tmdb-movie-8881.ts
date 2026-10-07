import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '8881',
    title: 'Che: The Argentine',
    year: 2008
  },
  links: [
    { target: 'event:cuban-revolution', kind: 'dramatisation-of' },
    { target: 'person:fidel-castro', kind: 'features-person' }
  ],
  researched: '2026-10-07'
})
