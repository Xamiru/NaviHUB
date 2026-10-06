import { definePlace } from '../../schema'

export default definePlace({
  id: 'sennar',
  names: [
    { text: 'Sennar', lang: 'en', role: 'primary' },
    { text: 'سنار', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'SD',
  coords: {
    lat: 13.55,
    lon: 33.6,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Sennar (ne_id 1159147983)' }
      }
    ]
  }
})
