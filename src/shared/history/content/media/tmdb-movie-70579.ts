import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '70579', title: 'José Rizal', year: 1998 },
  links: [
    {
      target: 'person:jose-rizal',
      kind: 'features-person',
      portrayals: [
        { person: 'person:jose-rizal' }
      ]
    },
    { target: 'event:philippine-revolution', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
