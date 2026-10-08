import { definePlace } from '../../schema'

export default definePlace({
  id: 'bucharest',
  names: [
    { text: 'Bucharest', lang: 'en', role: 'primary' },
    { text: 'București', lang: 'ro', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'RO',
  coords: {
    lat: 44.4353,
    lon: 26.098,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Bucharest (ne_id 1159151263)' }
      }
    ]
  }
})
