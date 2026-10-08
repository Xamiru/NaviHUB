import { definePlace } from '../../schema'

export default definePlace({
  id: 'chaozhou',
  names: [
    { text: 'Chaozhou', lang: 'en', role: 'primary' },
    { text: '潮州', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN',
  coords: {
    lat: 23.68,
    lon: 116.63,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Chaozhou (ne_id 1159129799)' }
      }
    ]
  }
})
