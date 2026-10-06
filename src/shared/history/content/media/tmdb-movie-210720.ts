import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '210720',
    title: 'Rhodes of Africa',
    year: 1936
  },
  links: [
    {
      target: 'person:cecil-rhodes',
      kind: 'features-person',
      portrayals: [
        { person: 'person:cecil-rhodes' }
      ]
    }
  ],
  researched: '2026-10-06'
})
