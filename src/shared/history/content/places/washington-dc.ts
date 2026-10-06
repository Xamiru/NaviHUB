import { definePlace } from '../../schema'

export default definePlace({
  id: 'washington-dc',
  names: [
    { text: 'Washington, D.C.', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 38.9015,
    lon: -77.0114,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Washington,  D.C. (ne_id 1159151573)' }
      }
    ]
  }
})
