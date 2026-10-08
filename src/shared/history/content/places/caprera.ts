import { definePlace } from '../../schema'

export default definePlace({
  id: 'caprera',
  names: [
    { text: 'Caprera', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['europe'],
  coords: {
    lat: 41.2084,
    lon: 9.4651,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Isola Caprera (geonameid 3180633)' }
      }
    ]
  },
  modernCountry: 'IT'
})
