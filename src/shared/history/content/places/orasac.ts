import { definePlace } from '../../schema'

export default definePlace({
  id: 'orasac',
  names: [
    { text: 'Orašac', lang: 'en', role: 'primary' },
    { text: 'Орашац', lang: 'sr', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['europe'],
  coords: {
    lat: 44.3306,
    lon: 20.5867,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Orašac (geonameid 787442)' }
      }
    ]
  },
  modernCountry: 'RS'
})
