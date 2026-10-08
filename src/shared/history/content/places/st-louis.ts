import { definePlace } from '../../schema'

export default definePlace({
  id: 'st-louis',
  names: [
    { text: 'St. Louis', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 38.637,
    lon: -90.2419,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'St. Louis (ne_id 1159151231)' }
      }
    ]
  }
})
