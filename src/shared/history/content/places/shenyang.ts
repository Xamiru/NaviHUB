import { definePlace } from '../../schema'

export default definePlace({
  id: 'shenyang',
  names: [
    { text: 'Shenyang', lang: 'en', role: 'primary' },
    { text: '沈阳', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN',
  coords: {
    lat: 41.8069,
    lon: 123.448,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Shenyeng (ne_id 1159151377)' }
      }
    ]
  }
})
