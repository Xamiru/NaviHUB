import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '783', title: 'Gandhi', year: 1982 },
  links: [
    { target: 'event:amritsar-massacre', kind: 'set-during' },
    {
      target: 'person:mahatma-gandhi',
      kind: 'features-person',
      portrayals: [
        { person: 'person:mahatma-gandhi' }
      ]
    },
    { target: 'event:non-cooperation-movement', kind: 'set-during' },
    { target: 'event:salt-march', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
