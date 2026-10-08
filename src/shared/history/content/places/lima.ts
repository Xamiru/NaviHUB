import { definePlace } from '../../schema'

export default definePlace({
  id: 'lima',
  names: [
    { text: 'Lima', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'PE',
  coords: {
    lat: -12.0461,
    lon: -77.052,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Lima (ne_id 1159151511)' } }
    ]
  }
})
