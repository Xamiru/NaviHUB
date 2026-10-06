import { definePlace } from '../../schema'

export default definePlace({
  id: 'ankara',
  names: [
    { text: 'Ankara', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'TR',
  coords: {
    lat: 39.9292,
    lon: 32.8624,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Ankara (ne_id 1159151255)' }
      }
    ]
  }
})
