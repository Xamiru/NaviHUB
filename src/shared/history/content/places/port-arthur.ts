import { definePlace } from '../../schema'

export default definePlace({
  id: 'port-arthur',
  names: [
    { text: 'Port Arthur', lang: 'en', role: 'primary' },
    { text: '旅顺', lang: 'zh', role: 'native' },
    { text: 'Lüshun', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN',
  coords: {
    lat: 38.8,
    lon: 121.2667,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Lüshun (geonameid 1801722)' } }
    ]
  }
})
