import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '369972', title: 'First Man', year: 2018 },
  links: [
    {
      target: 'event:apollo-11',
      kind: 'dramatisation-of',
      portrayals: [
        { person: 'person:neil-armstrong' }
      ]
    },
    {
      target: 'person:neil-armstrong',
      kind: 'features-person',
      portrayals: [
        { person: 'person:neil-armstrong' }
      ]
    }
  ],
  researched: '2026-10-07'
})
