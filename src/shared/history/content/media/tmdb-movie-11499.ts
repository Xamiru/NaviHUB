import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '11499', title: 'Frost/Nixon', year: 2008 },
  links: [
    {
      target: 'person:richard-nixon',
      kind: 'features-person',
      portrayals: [
        { person: 'person:richard-nixon' }
      ]
    }
  ],
  researched: '2026-10-09'
})
