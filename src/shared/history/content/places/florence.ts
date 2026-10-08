import { definePlace } from '../../schema'

export default definePlace({
  id: 'florence',
  names: [
    { text: 'Florence', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 43.78,
    lon: 11.25,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Florence (ne_id 1159149751)' }
      }
    ]
  }
})
