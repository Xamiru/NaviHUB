import { definePlace } from '../../schema'

export default definePlace({
  id: 'bhopal',
  names: [
    { text: 'Bhopal', lang: 'en', role: 'primary' },
    { text: 'भोपाल', lang: 'hi', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 23.2519,
    lon: 77.408,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Bhopal (ne_id 1159150985)' }
      }
    ]
  }
})
