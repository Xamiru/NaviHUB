import { definePlace } from '../../schema'

export default definePlace({
  id: 'kirkuk',
  names: [
    { text: 'Kirkuk', lang: 'en', role: 'primary' },
    { text: 'كركوك', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IQ',
  coords: {
    lat: 35.4722,
    lon: 44.3923,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kirkuk (ne_id 1159150085)' }
      }
    ]
  }
})
