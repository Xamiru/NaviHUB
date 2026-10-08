import { definePlace } from '../../schema'

export default definePlace({
  id: 'nashville',
  names: [
    { text: 'Nashville', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 36.1719,
    lon: -86.7819,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Nashville (ne_id 1159150519)' }
      }
    ]
  }
})
