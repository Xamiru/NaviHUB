import { definePlace } from '../../schema'

export default definePlace({
  id: 'cajamarca',
  names: [
    { text: 'Cajamarca', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'PE',
  coords: {
    lat: -7.15,
    lon: -78.53,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Cajamarca (ne_id 1159147919)' }
      }
    ]
  }
})
