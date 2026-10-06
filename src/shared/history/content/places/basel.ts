import { definePlace } from '../../schema'

export default definePlace({
  id: 'basel',
  names: [
    { text: 'Basel', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'CH',
  coords: {
    lat: 47.5804,
    lon: 7.59,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Basel (ne_id 1159135709)' }
      }
    ]
  }
})
