import { definePlace } from '../../schema'

export default definePlace({
  id: 'samarra',
  names: [
    { text: 'Samarra', lang: 'en', role: 'primary' },
    { text: 'سامراء', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IQ',
  coords: {
    lat: 34.194,
    lon: 43.875,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Samarra (ne_id 1159122533)' }
      }
    ]
  }
})
