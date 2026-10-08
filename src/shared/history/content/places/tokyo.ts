import { definePlace } from '../../schema'

export default definePlace({
  id: 'tokyo',
  names: [
    { text: 'Tokyo', lang: 'en', role: 'primary' },
    { text: '東京', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'JP',
  coords: {
    lat: 35.687,
    lon: 139.7495,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Tokyo (ne_id 1159151609)' }
      }
    ]
  }
})
