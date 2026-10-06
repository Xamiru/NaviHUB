import { definePlace } from '../../schema'

export default definePlace({
  id: 'alexandria',
  names: [
    { text: 'Alexandria', lang: 'en', role: 'primary' },
    { text: 'الإسكندرية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'EG',
  coords: {
    lat: 31.202,
    lon: 29.948,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Alexandria (ne_id 1159151349)' }
      }
    ]
  }
})
