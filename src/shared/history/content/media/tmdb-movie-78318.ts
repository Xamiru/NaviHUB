import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '78318', title: 'Juarez', year: 1939 },
  links: [
    { target: 'event:french-intervention-in-mexico', kind: 'dramatisation-of' },
    {
      target: 'person:maximilian-i-of-mexico',
      kind: 'features-person',
      portrayals: [
        { person: 'person:maximilian-i-of-mexico' }
      ]
    },
    {
      target: 'person:benito-juarez',
      kind: 'features-person',
      portrayals: [
        { person: 'person:benito-juarez' }
      ]
    }
  ],
  researched: '2026-10-06'
})
