import { definePlace } from '../../schema'

export default definePlace({
  id: 'valley-of-the-kings',
  names: [
    { text: 'Valley of the Kings', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['mena'],
  coords: {
    lat: 25.75,
    lon: 32.6167,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Wādī al Mulūk (geonameid 351915)' }
      }
    ]
  },
  modernCountry: 'EG'
})
