import { definePlace } from '../../schema'

export default definePlace({
  id: 'tbilisi',
  names: [
    { text: 'Tbilisi', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-12',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'GE',
  coords: {
    lat: 41.727,
    lon: 44.7888,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Tbilisi (ne_id 1159150961)' }
      }
    ]
  }
})
