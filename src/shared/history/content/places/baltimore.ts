import { definePlace } from '../../schema'

export default definePlace({
  id: 'baltimore',
  names: [
    { text: 'Baltimore', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 39.3019,
    lon: -76.6219,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Baltimore (ne_id 1159149299)' }
      }
    ]
  }
})
