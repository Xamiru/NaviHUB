import { definePlace } from '../../schema'

export default definePlace({
  id: 'agra',
  names: [
    { text: 'Agra', lang: 'en', role: 'primary' },
    { text: 'आगरा', lang: 'hi', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 27.1724,
    lon: 78.0131,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Agra (ne_id 1159149175)' } }
    ]
  }
})
