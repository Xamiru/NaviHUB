import { definePlace } from '../../schema'

export default definePlace({
  id: 'constance',
  names: [
    { text: 'Constance', lang: 'en', role: 'primary' },
    { text: 'Konstanz', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 47.6603,
    lon: 9.1758,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Konstanz (geonameid 2885679)' } }
    ]
  }
})
