import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '33157', title: 'Waterloo', year: 1970 },
  links: [
    {
      target: 'event:battle-of-waterloo',
      kind: 'dramatisation-of',
      portrayals: [
        { person: 'person:napoleon-bonaparte' }
      ]
    },
    { target: 'event:hundred-days', kind: 'set-during' }
  ],
  researched: '2026-10-06'
})
