import { definePlace } from '../../schema'

export default definePlace({
  id: 'srebrenica',
  names: [
    { text: 'Srebrenica', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'BA',
  coords: {
    lat: 44.1075,
    lon: 19.2967,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Srebrenica (geonameid 3190159)' } }
    ]
  }
})
