import { definePlace } from '../../schema'

export default definePlace({
  id: 'bursa',
  names: [
    { text: 'Bursa', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['mena', 'europe'],
  modernCountry: 'TR',
  coords: {
    lat: 40.2019,
    lon: 29.0681,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Bursa (ne_id 1159149373)' }
      }
    ]
  }
})
