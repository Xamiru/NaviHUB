import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '10568',
    title: 'The Four Feathers',
    year: 1939
  },
  links: [
    { target: 'period:mahdiyah', kind: 'set-during' },
    { target: 'event:battle-of-omdurman', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
