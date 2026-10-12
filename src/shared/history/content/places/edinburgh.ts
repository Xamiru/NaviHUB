import { definePlace } from '../../schema'

export default definePlace({
  id: 'edinburgh',
  names: [
    { text: 'Edinburgh', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-12',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GB',
  coords: {
    lat: 55.9483,
    lon: -3.2191,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Edinburgh (ne_id 1159146365)' }
      }
    ]
  }
})
