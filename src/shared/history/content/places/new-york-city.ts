import { definePlace } from '../../schema'

export default definePlace({
  id: 'new-york-city',
  names: [
    { text: 'New York City', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  coords: {
    lat: 40.7143,
    lon: -74.006,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'New York City (geonameid 5128581)' } }
    ]
  },
  modernCountry: 'US'
})
