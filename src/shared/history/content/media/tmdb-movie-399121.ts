import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '399121',
    title: 'An Officer and a Spy',
    year: 2019
  },
  links: [
    { target: 'event:dreyfus-affair', kind: 'dramatisation-of' },
    {
      target: 'person:alfred-dreyfus',
      kind: 'features-person',
      portrayals: [
        { person: 'person:alfred-dreyfus' }
      ]
    }
  ],
  researched: '2026-10-06'
})
