import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '72976', title: 'Lincoln', year: 2012 },
  links: [
    {
      target: 'person:abraham-lincoln',
      kind: 'features-person',
      portrayals: [
        { person: 'person:abraham-lincoln' }
      ]
    },
    { target: 'event:american-civil-war', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
