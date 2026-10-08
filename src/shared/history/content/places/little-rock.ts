import { definePlace } from '../../schema'

export default definePlace({
  id: 'little-rock',
  names: [
    { text: 'Little Rock', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 34.7361,
    lon: -92.3311,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Little Rock (ne_id 1159146223)' }
      }
    ]
  }
})
