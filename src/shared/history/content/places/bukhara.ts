import { definePlace } from '../../schema'

export default definePlace({
  id: 'bukhara',
  names: [
    { text: 'Bukhara', lang: 'en', role: 'primary' },
    { text: 'Buxoro', lang: 'uz', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'UZ',
  coords: {
    lat: 39.78,
    lon: 64.43,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Bukhara (ne_id 1159149337)' }
      }
    ]
  }
})
