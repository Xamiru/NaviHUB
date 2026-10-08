import { definePlace } from '../../schema'

export default definePlace({
  id: 'solferino',
  names: [
    { text: 'Solferino', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'battlefield',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 45.3724,
    lon: 10.5665,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Solferino (geonameid 3166427)' } }
    ]
  }
})
