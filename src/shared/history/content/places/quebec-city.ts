import { definePlace } from '../../schema'

export default definePlace({
  id: 'quebec-city',
  names: [
    { text: 'Québec City', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  coords: {
    lat: 46.8123,
    lon: -71.2145,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Québec (geonameid 6325494)' } }
    ]
  },
  modernCountry: 'CA'
})
