import { definePlace } from '../../schema'

export default definePlace({
  id: 'wuchang',
  names: [
    { text: 'Wuchang', lang: 'en', role: 'primary' },
    { text: '武昌', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['east-asia'],
  coords: {
    lat: 30.5431,
    lon: 114.3007,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Wuchang (geonameid 1791351)' } }
    ]
  },
  modernCountry: 'CN'
})
