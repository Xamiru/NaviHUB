import { definePlace } from '../../schema'

export default definePlace({
  id: 'taipei',
  names: [
    { text: 'Taipei', lang: 'en', role: 'primary' },
    { text: '臺北', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'TW',
  coords: {
    lat: 25.0358,
    lon: 121.5683,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Taipei (ne_id 1159151567)' }
      }
    ]
  }
})
