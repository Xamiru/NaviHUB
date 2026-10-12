import { definePlace } from '../../schema'

export default definePlace({
  id: 'new-haven',
  names: [
    { text: 'New Haven', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-12',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 41.3304,
    lon: -72.9,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'New Haven (ne_id 1159133199)' }
      }
    ]
  }
})
