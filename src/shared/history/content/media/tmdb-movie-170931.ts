import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '170931',
    title: 'The Opium Wars',
    year: 1959
  },
  links: [
    {
      target: 'person:lin-zexu',
      kind: 'features-person',
      portrayals: [
        { person: 'person:lin-zexu' }
      ]
    },
    { target: 'event:first-opium-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
