import { definePlace } from '../../schema'

export default definePlace({
  id: 'santo-domingo',
  names: [
    { text: 'Santo Domingo', lang: 'en', role: 'primary' },
    { text: 'Santo Domingo', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'DO',
  coords: {
    lat: 18.472,
    lon: -69.902,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Santo Domingo (ne_id 1159151401)' }
      }
    ]
  }
})
