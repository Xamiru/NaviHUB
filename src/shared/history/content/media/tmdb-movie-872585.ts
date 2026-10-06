import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '872585',
    title: 'Oppenheimer',
    year: 2023
  },
  links: [
    { target: 'event:atomic-bombings-of-hiroshima-and-nagasaki', kind: 'inspired-by' },
    {
      target: 'person:harry-s-truman',
      kind: 'features-person',
      portrayals: [
        { person: 'person:harry-s-truman' }
      ]
    }
  ],
  researched: '2026-10-06'
})
