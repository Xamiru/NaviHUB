import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '38646',
    title: 'Nicholas and Alexandra',
    year: 1971
  },
  links: [
    { target: 'event:russian-revolution-of-1917', kind: 'set-during' },
    {
      target: 'person:nicholas-ii',
      kind: 'features-person',
      portrayals: [
        { person: 'person:nicholas-ii' }
      ]
    }
  ],
  researched: '2026-10-06'
})
