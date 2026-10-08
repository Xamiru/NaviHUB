import { definePlace } from '../../schema'

export default definePlace({
  id: 'tunis',
  names: [
    { text: 'Tunis', lang: 'en', role: 'primary' },
    { text: 'تونس', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'TN',
  coords: {
    lat: 36.8028,
    lon: 10.1797,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Tunis (ne_id 1159150537)' }
      }
    ]
  }
})
