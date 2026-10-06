import { definePlace } from '../../schema'

export default definePlace({
  id: 'la-paz',
  names: [
    { text: 'La Paz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'BO',
  coords: {
    lat: -16.496,
    lon: -68.1519,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'La Paz (ne_id 1159151133)' }
      }
    ]
  }
})
