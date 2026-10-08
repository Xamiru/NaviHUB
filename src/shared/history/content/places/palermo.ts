import { definePlace } from '../../schema'

export default definePlace({
  id: 'palermo',
  names: [
    { text: 'Palermo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 38.127,
    lon: 13.3481,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Palermo (ne_id 1159150805)' }
      }
    ]
  }
})
