import { definePlace } from '../../schema'

export default definePlace({
  id: 'houston',
  names: [
    { text: 'Houston', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 29.8219,
    lon: -95.3419,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Houston (ne_id 1159151485)' }
      }
    ]
  }
})
