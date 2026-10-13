import { definePlace } from '../../schema'

export default definePlace({
  id: 'worms',
  names: [
    { text: 'Worms', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 49.6328,
    lon: 8.3592,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Worms (geonameid 2806142)' } }
    ]
  }
})
