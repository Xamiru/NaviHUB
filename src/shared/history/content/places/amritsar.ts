import { definePlace } from '../../schema'

export default definePlace({
  id: 'amritsar',
  names: [
    { text: 'Amritsar', lang: 'en', role: 'primary' },
    { text: 'ਅੰਮ੍ਰਿਤਸਰ', lang: 'pa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 31.6419,
    lon: 74.868,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Amritsar (ne_id 1159150975)' }
      }
    ]
  }
})
