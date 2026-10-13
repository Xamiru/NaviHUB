import { definePlace } from '../../schema'

export default definePlace({
  id: 'sekigahara',
  names: [
    { text: 'Sekigahara', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'battlefield',
  regions: ['east-asia'],
  modernCountry: 'JP',
  coords: {
    lat: 35.3667,
    lon: 136.4667,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Sekigahara (geonameid 1852788)' } }
    ]
  }
})
