import { definePlace } from '../../schema'

export default definePlace({
  id: 'krakatoa',
  names: [
    { text: 'Krakatoa', lang: 'en', role: 'primary' },
    { text: 'Krakatau', lang: 'id', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['southeast-asia'],
  coords: {
    lat: -6.1017,
    lon: 105.4233,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Krakatoa (geonameid 1639433)' }
      }
    ]
  },
  modernCountry: 'ID'
})
