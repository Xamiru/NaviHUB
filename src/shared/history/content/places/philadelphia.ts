import { definePlace } from '../../schema'

export default definePlace({
  id: 'philadelphia',
  names: [
    { text: 'Philadelphia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 40.0019,
    lon: -75.1719,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Philadelphia (ne_id 1159151243)' }
      }
    ]
  }
})
