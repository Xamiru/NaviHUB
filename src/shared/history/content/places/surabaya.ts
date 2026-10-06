import { definePlace } from '../../schema'

export default definePlace({
  id: 'surabaya',
  names: [
    { text: 'Surabaya', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'ID',
  coords: {
    lat: -7.2473,
    lon: 112.7489,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Surabaya (ne_id 1159151339)' }
      }
    ]
  }
})
