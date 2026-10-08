import { definePlace } from '../../schema'

export default definePlace({
  id: 'ruijin',
  names: [
    { text: 'Ruijin', lang: 'en', role: 'primary' },
    { text: '瑞金', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['east-asia'],
  coords: {
    lat: 25.8832,
    lon: 116.0272,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Ruijin (geonameid 10378131)' }
      }
    ]
  },
  modernCountry: 'CN'
})
