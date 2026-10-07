import { definePlace } from '../../schema'

export default definePlace({
  id: 'lhasa',
  names: [
    { text: 'Lhasa', lang: 'en', role: 'primary' },
    { text: '拉萨', lang: 'zh', role: 'alternative' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN',
  coords: {
    lat: 29.645,
    lon: 91.1,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Lhasa (ne_id 1159150879)' }
      }
    ]
  }
})
