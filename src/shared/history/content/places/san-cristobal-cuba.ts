import { definePlace } from '../../schema'

export default definePlace({
  id: 'san-cristobal-cuba',
  names: [
    { text: 'San Cristóbal', lang: 'en', role: 'primary' },
    { text: 'San Cristóbal', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'CU',
  coords: {
    lat: 22.7166,
    lon: -83.0565,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'San Cristobal (geonameid 3540680)' } }
    ]
  }
})
