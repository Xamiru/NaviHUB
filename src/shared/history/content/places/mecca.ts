import { definePlace } from '../../schema'

export default definePlace({
  id: 'mecca',
  names: [
    { text: 'Mecca', lang: 'en', role: 'primary' },
    { text: 'مكة', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['mena'],
  coords: {
    lat: 21.4266,
    lon: 39.8256,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Makkah (geonameid 104515)' } }
    ]
  },
  modernCountry: 'SA'
})
