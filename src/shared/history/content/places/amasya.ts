import { definePlace } from '../../schema'

export default definePlace({
  id: 'amasya',
  names: [
    { text: 'Amasya', lang: 'en', role: 'primary' },
    { text: 'Amasya', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'TR',
  coords: {
    lat: 40.6537,
    lon: 35.833,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Amasya (ne_id 1159135197)' }
      }
    ]
  }
})
