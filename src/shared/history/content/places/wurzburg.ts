import { definePlace } from '../../schema'

export default definePlace({
  id: 'wurzburg',
  names: [
    { text: 'Würzburg', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 49.8004,
    lon: 9.95,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Würzburg (ne_id 1159140635)' }
      }
    ]
  }
})
