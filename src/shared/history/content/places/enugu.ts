import { definePlace } from '../../schema'

export default definePlace({
  id: 'enugu',
  names: [
    { text: 'Enugu', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'NG',
  coords: {
    lat: 6.45,
    lon: 7.5,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Enugu (ne_id 1159150771)' }
      }
    ]
  }
})
