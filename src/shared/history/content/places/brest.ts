import { definePlace } from '../../schema'

export default definePlace({
  id: 'brest',
  names: [
    { text: 'Brest', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 48.3904,
    lon: -4.495,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Brest (ne_id 1159141943)' }
      }
    ]
  }
})
