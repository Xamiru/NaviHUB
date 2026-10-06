import { definePlace } from '../../schema'

export default definePlace({
  id: 'mandalay',
  names: [
    { text: 'Mandalay', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'MM',
  coords: {
    lat: 21.9719,
    lon: 96.0831,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Mandalay (ne_id 1159150423)' }
      }
    ]
  }
})
