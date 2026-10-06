import { definePlace } from '../../schema'

export default definePlace({
  id: 'shanghai',
  names: [
    { text: 'Shanghai', lang: 'en', role: 'primary' },
    { text: '上海', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN',
  coords: {
    lat: 31.2184,
    lon: 121.4346,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Shanghai (ne_id 1159151605)' }
      }
    ]
  }
})
