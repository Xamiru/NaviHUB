import { definePlace } from '../../schema'

export default definePlace({
  id: 'ho-chi-minh-city',
  names: [
    { text: 'Ho Chi Minh City', lang: 'en', role: 'primary' },
    { text: 'Saigon', lang: 'en', role: 'former' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'VN',
  coords: {
    lat: 10.782,
    lon: 106.6931,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Ho Chi Minh City (ne_id 1159151253)' }
      }
    ]
  }
})
