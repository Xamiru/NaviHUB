import { definePlace } from '../../schema'

export default definePlace({
  id: 'tianjin',
  names: [
    { text: 'Tianjin', lang: 'en', role: 'primary' },
    { text: '天津', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN',
  coords: {
    lat: 39.132,
    lon: 117.1981,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Tianjin (ne_id 1159151381)' }
      }
    ]
  }
})
