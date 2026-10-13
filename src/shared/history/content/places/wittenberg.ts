import { definePlace } from '../../schema'

export default definePlace({
  id: 'wittenberg',
  names: [
    { text: 'Wittenberg', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 51.8661,
    lon: 12.6497,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Wittenberg (geonameid 7303020)' } }
    ]
  }
})
