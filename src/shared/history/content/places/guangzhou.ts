import { definePlace } from '../../schema'

export default definePlace({
  id: 'guangzhou',
  names: [
    { text: 'Guangzhou', lang: 'en', role: 'primary' },
    { text: '广州', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN',
  coords: {
    lat: 23.1469,
    lon: 113.3231,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Guangzhou (ne_id 1159151331)' }
      }
    ]
  }
})
