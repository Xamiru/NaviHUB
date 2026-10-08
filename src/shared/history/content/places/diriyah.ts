import { definePlace } from '../../schema'

export default definePlace({
  id: 'diriyah',
  names: [
    { text: 'Diriyah', lang: 'en', role: 'primary' },
    { text: 'الدرعية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['mena'],
  coords: {
    lat: 24.7519,
    lon: 46.5387,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Ad Dir‘īyah (geonameid 110312)' } }
    ]
  },
  modernCountry: 'SA'
})
