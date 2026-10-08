import { definePlace } from '../../schema'

export default definePlace({
  id: 'nairobi',
  names: [
    { text: 'Nairobi', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'KE',
  coords: {
    lat: -1.2814,
    lon: 36.8147,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Nairobi (ne_id 1159151597)' }
      }
    ]
  }
})
