import { definePlace } from '../../schema'

export default definePlace({
  id: 'london',
  names: [
    { text: 'London', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GB',
  coords: {
    lat: 51.5019,
    lon: -0.1187,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'London (ne_id 1159151577)' }
      }
    ]
  }
})
