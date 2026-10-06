import { definePlace } from '../../schema'

export default definePlace({
  id: 'riyadh',
  names: [
    { text: 'Riyadh', lang: 'en', role: 'primary' },
    { text: 'الرياض', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'SA',
  coords: {
    lat: 24.6428,
    lon: 46.7708,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Riyadh (ne_id 1159151581)' }
      }
    ]
  }
})
