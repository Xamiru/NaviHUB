import { definePlace } from '../../schema'

export default definePlace({
  id: 'tripoli',
  names: [
    { text: 'Tripoli', lang: 'en', role: 'primary' },
    { text: 'طرابلس', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'LY',
  coords: {
    lat: 32.8925,
    lon: 13.18,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Tripoli (ne_id 1159151415)' }
      }
    ]
  }
})
