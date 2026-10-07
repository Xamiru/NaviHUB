import { definePlace } from '../../schema'

export default definePlace({
  id: 'memphis',
  names: [
    { text: 'Memphis', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 35.1219,
    lon: -90.0019,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Memphis (ne_id 1159150521)' }
      }
    ]
  }
})
