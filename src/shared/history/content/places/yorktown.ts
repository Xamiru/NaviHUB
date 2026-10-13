import { definePlace } from '../../schema'

export default definePlace({
  id: 'yorktown',
  names: [
    { text: 'Yorktown', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 40.1737,
    lon: -85.4941,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Yorktown (geonameid 4928492)' } }
    ]
  }
})
