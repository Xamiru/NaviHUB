import { definePlace } from '../../schema'

export default definePlace({
  id: 'panipat',
  names: [
    { text: 'Panipat', lang: 'en', role: 'primary' },
    { text: 'पानीपत', lang: 'hi', role: 'native' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 29.4004,
    lon: 76.97,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Panipat (ne_id 1159141723)' }
      }
    ]
  }
})
