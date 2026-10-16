import { definePlace } from '../../schema'

export default definePlace({
  id: 'hampi',
  names: [
    { text: 'Hampi', lang: 'en', role: 'primary' },
    { text: 'Vijayanagar', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-16',
  placeType: 'site',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 15.3352,
    lon: 76.4603,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Hampi (geonameid 1270448)' } }
    ]
  }
})
