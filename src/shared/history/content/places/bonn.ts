import { definePlace } from '../../schema'

export default definePlace({
  id: 'bonn',
  names: [
    { text: 'Bonn', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 50.7205,
    lon: 7.08,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Bonn (ne_id 1159140541)' } }
    ]
  }
})
