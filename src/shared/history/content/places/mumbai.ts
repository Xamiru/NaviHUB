import { definePlace } from '../../schema'

export default definePlace({
  id: 'mumbai',
  names: [
    { text: 'Mumbai', lang: 'en', role: 'primary' },
    { text: 'Bombay', lang: 'en', role: 'former' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 19.0189,
    lon: 72.855,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Mumbai (ne_id 1159151611)' }
      }
    ]
  }
})
