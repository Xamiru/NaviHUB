import { definePlace } from '../../schema'

export default definePlace({
  id: 'carabobo',
  names: [
    { text: 'Carabobo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'battlefield',
  regions: ['latin-america'],
  coords: {
    lat: 10.0208,
    lon: -68.1498,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Campo de Carabobo (geonameid 3647206)' }
      }
    ]
  },
  modernCountry: 'VE'
})
