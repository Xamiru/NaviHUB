import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '373867', title: 'Cerro Cora', year: 1978 },
  links: [
    { target: 'event:paraguayan-war', kind: 'dramatisation-of' },
    {
      target: 'person:francisco-solano-lopez',
      kind: 'features-person',
      portrayals: [
        { person: 'person:francisco-solano-lopez' }
      ]
    }
  ],
  researched: '2026-10-06'
})
