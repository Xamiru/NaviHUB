import { definePlace } from '../../schema'

export default definePlace({
  id: 'new-orleans',
  names: [
    { text: 'New Orleans', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 29.9969,
    lon: -90.0419,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'New Orleans (ne_id 1159151233)' }
      }
    ]
  }
})
