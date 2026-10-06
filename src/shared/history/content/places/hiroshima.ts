import { definePlace } from '../../schema'

export default definePlace({
  id: 'hiroshima',
  names: [
    { text: 'Hiroshima', lang: 'en', role: 'primary' },
    { text: '広島', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'JP',
  coords: {
    lat: 34.3898,
    lon: 132.441,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Hiroshima (ne_id 1159151389)' }
      }
    ]
  }
})
