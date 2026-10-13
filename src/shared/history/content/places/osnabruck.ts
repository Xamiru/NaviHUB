import { definePlace } from '../../schema'

export default definePlace({
  id: 'osnabruck',
  names: [
    { text: 'Osnabrück', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 52.2804,
    lon: 8.05,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Osnabrück (ne_id 1159140571)' }
      }
    ]
  }
})
