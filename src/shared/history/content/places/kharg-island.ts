import { definePlace } from '../../schema'

export default definePlace({
  id: 'kharg-island',
  names: [
    { text: 'Kharg Island', lang: 'en', role: 'primary' },
    { text: 'جزیره خارک', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['iran'],
  coords: {
    lat: 29.2458,
    lon: 50.3158,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Kharg Island (geonameid 127757)' }
      }
    ]
  },
  modernCountry: 'IR'
})
