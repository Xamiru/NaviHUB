import { definePlace } from '../../schema'

export default definePlace({
  id: 'ballarat',
  names: [
    { text: 'Ballarat', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['oceania'],
  modernCountry: 'AU',
  coords: {
    lat: -37.5596,
    lon: 143.84,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Ballarat (ne_id 1159145645)' }
      }
    ]
  }
})
