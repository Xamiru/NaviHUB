import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'tv', source: 'tmdb', externalId: '47093', title: 'Rough Riders', year: 1997 },
  links: [
    { target: 'event:spanish-american-war', kind: 'dramatisation-of' },
    {
      target: 'person:theodore-roosevelt',
      kind: 'features-person',
      portrayals: [
        { person: 'person:theodore-roosevelt' }
      ]
    }
  ],
  researched: '2026-10-06'
})
