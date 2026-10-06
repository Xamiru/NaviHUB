import { definePlace } from '../../schema'

export default definePlace({
  id: 'beijing',
  names: [
    { text: 'Beijing', lang: 'en', role: 'primary' },
    { text: '北京', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN',
  coords: {
    lat: 39.9308,
    lon: 116.3863,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Beijing (ne_id 1159151595)' }
      }
    ]
  }
})
