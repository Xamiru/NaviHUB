import { defineMedia } from '../../schema'

export default defineMedia({
  title: {
    mediaType: 'movie',
    source: 'tmdb',
    externalId: '243466',
    title: 'Toussaint Louverture',
    year: 2012
  },
  links: [
    {
      target: 'event:haitian-independence',
      kind: 'set-during',
      portrayals: [
        { person: 'person:toussaint-louverture' }
      ]
    }
  ],
  researched: '2026-10-06'
})
