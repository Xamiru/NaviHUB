import { definePlace } from '../../schema'

export default definePlace({
  id: 'managua',
  names: [
    { text: 'Managua', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-09',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'NI',
  coords: {
    lat: 12.155,
    lon: -86.2704,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Managua (ne_id 1159150623)' }
      }
    ]
  }
})
