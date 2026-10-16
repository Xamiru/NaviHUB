import { definePlace } from '../../schema'

export default definePlace({
  id: 'southampton',
  names: [
    { text: 'Southampton', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GB',
  coords: {
    lat: 50.9,
    lon: -1.4,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Southampton (ne_id 1159127279)' }
      }
    ]
  }
})
