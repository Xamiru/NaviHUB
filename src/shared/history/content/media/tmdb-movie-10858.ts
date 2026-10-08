import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '10858', title: 'Nixon', year: 1995 },
  links: [
    {
      target: 'person:richard-nixon',
      kind: 'features-person',
      portrayals: [
        { person: 'person:richard-nixon' },
        { person: 'person:henry-kissinger' }
      ]
    },
    { target: 'event:watergate-scandal', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-09'
})
