import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'tv',
    source: 'tmdb',
    externalId: '40202',
    title: 'Mussolini: The Untold Story',
    year: 1985
  },
  links: [
    {
      target: 'person:benito-mussolini',
      kind: 'features-person',
      portrayals: [
        { person: 'person:benito-mussolini' }
      ]
    },
    { target: 'event:march-on-rome', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
