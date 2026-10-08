import { definePlace } from '../../schema'

export default definePlace({
  id: 'cordoba-veracruz',
  names: [
    { text: 'Córdoba', lang: 'en', role: 'primary' },
    { text: 'Córdoba', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'MX',
  coords: {
    lat: 18.9204,
    lon: -96.92,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Córdoba (ne_id 1159138599)' }
      }
    ]
  }
})
