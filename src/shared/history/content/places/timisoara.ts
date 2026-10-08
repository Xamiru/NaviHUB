import { definePlace } from '../../schema'

export default definePlace({
  id: 'timisoara',
  names: [
    { text: 'Timișoara', lang: 'ro', role: 'native' },
    { text: 'Timisoara', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'RO',
  coords: {
    lat: 45.7588,
    lon: 21.2234,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Timișoara (ne_id 1159135835)' }
      }
    ]
  }
})
