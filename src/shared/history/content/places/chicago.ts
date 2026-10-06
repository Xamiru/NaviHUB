import { definePlace } from '../../schema'

export default definePlace({
  id: 'chicago',
  names: [
    { text: 'Chicago', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 41.8319,
    lon: -87.752,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Chicago (ne_id 1159151491)' }
      }
    ]
  }
})
