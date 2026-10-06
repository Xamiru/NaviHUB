import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '48564', title: 'Villa Rides', year: 1968 },
  links: [
    { target: 'event:mexican-revolution', kind: 'set-during' },
    {
      target: 'person:pancho-villa',
      kind: 'features-person',
      portrayals: [
        { person: 'person:pancho-villa' }
      ]
    }
  ],
  researched: '2026-10-06'
})
