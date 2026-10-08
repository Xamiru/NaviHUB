import { definePlace } from '../../schema'

export default definePlace({
  id: 'seneca-falls',
  names: [
    { text: 'Seneca Falls', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  coords: {
    lat: 42.9106,
    lon: -76.7966,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Seneca Falls (geonameid 5137622)' } }
    ]
  },
  modernCountry: 'US'
})
