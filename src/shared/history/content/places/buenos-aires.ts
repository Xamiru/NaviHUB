import { definePlace } from '../../schema'

export default definePlace({
  id: 'buenos-aires',
  names: [
    { text: 'Buenos Aires', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'AR',
  coords: {
    lat: -34.6006,
    lon: -58.3995,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Buenos Aires (ne_id 1159151559)' }
      }
    ]
  }
})
