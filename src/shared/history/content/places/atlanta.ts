import { definePlace } from '../../schema'

export default definePlace({
  id: 'atlanta',
  names: [
    { text: 'Atlanta', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 33.832,
    lon: -84.4019,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Atlanta (ne_id 1159151489)' }
      }
    ]
  }
})
