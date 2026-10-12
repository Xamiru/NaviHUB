import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '45371',
    title: 'The Special Relationship',
    year: 2010
  },
  links: [
    {
      target: 'person:tony-blair',
      kind: 'features-person',
      portrayals: [
        { person: 'person:tony-blair' },
        { person: 'person:bill-clinton' }
      ]
    }
  ],
  researched: '2026-10-12'
})
