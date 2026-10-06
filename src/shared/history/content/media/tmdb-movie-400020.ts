import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '400020',
    title: 'The Young Karl Marx',
    year: 2017
  },
  links: [
    {
      target: 'person:karl-marx',
      kind: 'features-person',
      portrayals: [
        { person: 'person:karl-marx' }
      ]
    },
    { target: 'event:communist-manifesto', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-06'
})
