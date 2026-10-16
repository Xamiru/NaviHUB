import { definePlace } from '../../schema'

export default definePlace({
  id: 'rouen',
  names: [
    { text: 'Rouen', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 49.4304,
    lon: 1.08,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Rouen (ne_id 1159142025)' }
      }
    ]
  }
})
