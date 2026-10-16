import { definePlace } from '../../schema'

export default definePlace({
  id: 'accra',
  names: [
    { text: 'Accra', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'GH',
  coords: {
    lat: 5.552,
    lon: -0.2187,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Accra (ne_id 1159151403)' }
      }
    ]
  }
})
