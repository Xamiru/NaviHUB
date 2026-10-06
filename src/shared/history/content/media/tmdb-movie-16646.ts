import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '16646', title: 'Russian Ark', year: 2002 },
  links: [
    {
      target: 'event:khosrow-mirza-mission-to-saint-petersburg',
      kind: 'dramatisation-of',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-06'
})
