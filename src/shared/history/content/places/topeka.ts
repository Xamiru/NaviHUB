import { definePlace } from '../../schema'

export default definePlace({
  id: 'topeka',
  names: [
    { text: 'Topeka', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 39.05,
    lon: -95.67,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Topeka (ne_id 1159149243)' }
      }
    ]
  }
})
