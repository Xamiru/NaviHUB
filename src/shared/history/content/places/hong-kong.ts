import { definePlace } from '../../schema'

export default definePlace({
  id: 'hong-kong',
  names: [
    { text: 'Hong Kong', lang: 'en', role: 'primary' },
    { text: '香港', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'region',
  regions: ['east-asia'],
  modernCountry: 'HK',
  coords: {
    lat: 22.3069,
    lon: 114.1831,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Hong Kong (ne_id 1159151629)' }
      }
    ]
  }
})
