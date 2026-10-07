import { definePlace } from '../../schema'

export default definePlace({
  id: 'hanoi',
  names: [
    { text: 'Hanoi', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'VN',
  coords: {
    lat: 21.0353,
    lon: 105.8481,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Hanoi (ne_id 1159151251)' }
      }
    ]
  }
})
