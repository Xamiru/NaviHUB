import { definePlace } from '../../schema'

export default definePlace({
  id: 'boston',
  names: [
    { text: 'Boston', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 42.3319,
    lon: -71.072,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Boston (ne_id 1159151239)' }
      }
    ]
  }
})
