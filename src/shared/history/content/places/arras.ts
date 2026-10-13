import { definePlace } from '../../schema'

export default definePlace({
  id: 'arras',
  names: [
    { text: 'Arras', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 50.2833,
    lon: 2.7833,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Arras (ne_id 1159130525)' }
      }
    ]
  }
})
