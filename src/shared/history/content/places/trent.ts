import { definePlace } from '../../schema'

export default definePlace({
  id: 'trent',
  names: [
    { text: 'Trent', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 46.0679,
    lon: 11.1211,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Trento (geonameid 3165243)' } }
    ]
  }
})
