import { definePlace } from '../../schema'

export default definePlace({
  id: 'port-said',
  names: [
    { text: 'Port Said', lang: 'en', role: 'primary' },
    { text: 'بورسعيد', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'EG',
  coords: {
    lat: 31.26,
    lon: 32.29,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Bur Said (ne_id 1159149855)' }
      }
    ]
  }
})
