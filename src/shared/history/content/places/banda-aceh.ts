import { definePlace } from '../../schema'

export default definePlace({
  id: 'banda-aceh',
  names: [
    { text: 'Banda Aceh', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'ID',
  coords: {
    lat: 5.55,
    lon: 95.32,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Banda Aceh (ne_id 1159149763)' }
      }
    ]
  }
})
