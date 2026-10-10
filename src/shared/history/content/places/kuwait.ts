import { definePlace } from '../../schema'

export default definePlace({
  id: 'kuwait',
  names: [
    { text: 'Kuwait', lang: 'en', role: 'primary' },
    { text: 'الكويت', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'country',
  regions: ['mena'],
  modernCountry: 'KW',
  coords: {
    lat: 29.3717,
    lon: 47.9764,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kuwait City (ne_id 1159151361)' }
      }
    ]
  }
})
