import { definePlace } from '../../schema'

export default definePlace({
  id: 'kagoshima',
  names: [
    { text: 'Kagoshima', lang: 'en', role: 'primary' },
    { text: '鹿児島', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'JP',
  coords: {
    lat: 31.586,
    lon: 130.5611,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kagoshima (ne_id 1159147123)' }
      }
    ]
  }
})
