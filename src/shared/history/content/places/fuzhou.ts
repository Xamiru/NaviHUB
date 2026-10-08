import { definePlace } from '../../schema'

export default definePlace({
  id: 'fuzhou',
  names: [
    { text: 'Fuzhou', lang: 'en', role: 'primary' },
    { text: '福州', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN',
  coords: {
    lat: 26.0819,
    lon: 119.2981,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Fuzhou (ne_id 1159151329)' }
      }
    ]
  }
})
