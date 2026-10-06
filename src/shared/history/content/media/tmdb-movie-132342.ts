import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '132342',
    title: 'The Liberator',
    year: 2013
  },
  links: [
    {
      target: 'person:simon-bolivar',
      kind: 'features-person',
      portrayals: [
        { person: 'person:simon-bolivar' }
      ]
    }
  ],
  researched: '2026-10-06'
})
