import { definePlace } from '../../schema'

export default definePlace({
  id: 'colon-panama',
  names: [
    { text: 'Colón', lang: 'en', role: 'primary' },
    { text: 'Colón', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'PA',
  coords: {
    lat: 9.365,
    lon: -79.875,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Colón (ne_id 1159146487)' }
      }
    ]
  }
})
