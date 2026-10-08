import { definePlace } from '../../schema'

export default definePlace({
  id: 'da-nang',
  names: [
    { text: 'Da Nang', lang: 'en', role: 'primary' },
    { text: 'Đà Nẵng', lang: 'vi', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'VN',
  coords: {
    lat: 16.06,
    lon: 108.25,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Da Nang (ne_id 1159149351)' }
      }
    ]
  }
})
