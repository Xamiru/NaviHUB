import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '947',
    title: 'Lawrence of Arabia',
    year: 1962
  },
  links: [
    { target: 'event:arab-revolt', kind: 'dramatisation-of' },
    {
      target: 'person:t-e-lawrence',
      kind: 'features-person',
      portrayals: [
        { person: 'person:t-e-lawrence' }
      ]
    }
  ],
  researched: '2026-10-06'
})
