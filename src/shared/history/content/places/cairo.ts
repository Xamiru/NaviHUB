import { definePlace } from '../../schema'

export default definePlace({
  id: 'cairo',
  names: [
    { text: 'Cairo', lang: 'en', role: 'primary' },
    { text: 'القاهرة', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'EG',
  coords: {
    lat: 30.0519,
    lon: 31.248,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Cairo (ne_id 1159151603)' }
      }
    ]
  }
})
