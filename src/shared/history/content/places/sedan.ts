import { definePlace } from '../../schema'

export default definePlace({
  id: 'sedan',
  names: [
    { text: 'Sedan', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  coords: {
    lat: 49.7019,
    lon: 4.9403,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Sedan (geonameid 2975349)' } }
    ]
  },
  modernCountry: 'FR'
})
