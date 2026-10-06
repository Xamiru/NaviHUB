import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '753342', title: 'Napoleon', year: 2023 },
  links: [
    { target: 'person:napoleon-bonaparte', kind: 'features-person' },
    {
      target: 'event:coronation-of-napoleon',
      kind: 'dramatisation-of',
      portrayals: [
        { person: 'person:napoleon-bonaparte' }
      ]
    }
  ],
  researched: '2026-10-06'
})
