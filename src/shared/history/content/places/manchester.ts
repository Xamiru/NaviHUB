import { definePlace } from '../../schema'

export default definePlace({
  id: 'manchester',
  names: [
    { text: 'Manchester', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GB',
  coords: {
    lat: 53.5024,
    lon: -2.2499,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Manchester (ne_id 1159149119)' }
      }
    ]
  }
})
