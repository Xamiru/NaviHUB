import { definePlace } from '../../schema'

export default definePlace({
  id: 'quito',
  names: [
    { text: 'Quito', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'EC',
  coords: {
    lat: -0.213,
    lon: -78.502,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Quito (ne_id 1159150847)' }
      }
    ]
  }
})
