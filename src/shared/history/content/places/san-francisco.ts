import { definePlace } from '../../schema'

export default definePlace({
  id: 'san-francisco',
  names: [
    { text: 'San Francisco', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 37.7692,
    lon: -122.4172,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'San Francisco (ne_id 1159151479)' }
      }
    ]
  }
})
