import { definePlace } from '../../schema'

export default definePlace({
  id: 'verdun',
  names: [
    { text: 'Verdun', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  coords: {
    lat: 49.1596,
    lon: 5.3829,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Verdun (geonameid 2969958)' } }
    ]
  },
  modernCountry: 'FR'
})
