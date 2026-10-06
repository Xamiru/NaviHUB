import { definePlace } from '../../schema'

export default definePlace({
  id: 'caracas',
  names: [
    { text: 'Caracas', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'VE',
  coords: {
    lat: 10.5029,
    lon: -66.919,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Caracas (ne_id 1159151493)' }
      }
    ]
  }
})
