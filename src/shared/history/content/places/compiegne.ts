import { definePlace } from '../../schema'

export default definePlace({
  id: 'compiegne',
  names: [
    { text: 'Compiègne', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  coords: {
    lat: 49.4179,
    lon: 2.8261,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Compiègne (geonameid 3024066)' } }
    ]
  },
  modernCountry: 'FR'
})
