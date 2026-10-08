import { definePlace } from '../../schema'

export default definePlace({
  id: 'magenta',
  names: [
    { text: 'Magenta', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 45.4646,
    lon: 8.8845,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Magenta (geonameid 3174295)' } }
    ]
  }
})
