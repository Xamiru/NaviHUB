import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '399404',
    title: 'Darkest Hour',
    year: 2017
  },
  links: [
    {
      target: 'person:winston-churchill',
      kind: 'features-person',
      portrayals: [
        { person: 'person:winston-churchill' }
      ]
    },
    { target: 'event:second-world-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
