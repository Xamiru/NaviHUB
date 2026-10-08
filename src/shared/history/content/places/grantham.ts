import { definePlace } from '../../schema'

export default definePlace({
  id: 'grantham',
  names: [
    { text: 'Grantham', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GB',
  coords: {
    lat: 52.9115,
    lon: -0.6418,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Grantham (geonameid 2648208)' } }
    ]
  }
})
