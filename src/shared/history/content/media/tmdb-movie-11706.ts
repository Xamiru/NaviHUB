import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '11706',
    title: 'War and Peace',
    year: 1956
  },
  links: [
    {
      target: 'event:french-invasion-of-russia',
      kind: 'set-during',
      portrayals: [
        { person: 'person:napoleon-bonaparte' },
        { person: 'person:mikhail-kutuzov' }
      ]
    }
  ],
  researched: '2026-10-06'
})
