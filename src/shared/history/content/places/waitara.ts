import { definePlace } from '../../schema'

export default definePlace({
  id: 'waitara',
  names: [
    { text: 'Waitara', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['oceania'],
  coords: {
    lat: -39.0016,
    lon: 174.2384,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Waitara (geonameid 2208091)' } }
    ]
  },
  modernCountry: 'NZ'
})
