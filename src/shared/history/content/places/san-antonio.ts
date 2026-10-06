import { definePlace } from '../../schema'

export default definePlace({
  id: 'san-antonio',
  names: [
    { text: 'San Antonio', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 29.4893,
    lon: -98.5093,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'San Antonio (ne_id 1159150503)' }
      }
    ]
  }
})
