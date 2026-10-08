import { definePlace } from '../../schema'

export default definePlace({
  id: 'brasilia',
  names: [
    { text: 'Brasília', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'BR',
  coords: {
    lat: -15.7814,
    lon: -47.918,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Brasília (ne_id 1159151443)' }
      }
    ]
  }
})
