import { definePlace } from '../../schema'

export default definePlace({
  id: 'nice',
  names: [
    { text: 'Nice', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 43.717,
    lon: 7.2631,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Nice (ne_id 1159147221)' } }
    ]
  }
})
