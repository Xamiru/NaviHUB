import { definePlace } from '../../schema'

export default definePlace({
  id: 'taif',
  names: [
    { text: 'Taif', lang: 'en', role: 'primary' },
    { text: 'الطائف', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'SA',
  coords: {
    lat: 21.2703,
    lon: 40.4158,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Ta’if (geonameid 107968)' } }
    ]
  }
})
