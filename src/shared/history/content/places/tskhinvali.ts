import { definePlace } from '../../schema'

export default definePlace({
  id: 'tskhinvali',
  names: [
    { text: 'Tskhinvali', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-12',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'GE',
  coords: {
    lat: 42.2325,
    lon: 43.975,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Tskhinvali (ne_id 1159130711)' }
      }
    ]
  }
})
