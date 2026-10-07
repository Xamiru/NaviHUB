import { definePlace } from '../../schema'

export default definePlace({
  id: 'santiago-de-cuba',
  names: [
    { text: 'Santiago de Cuba', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'CU',
  coords: {
    lat: 20.025,
    lon: -75.8213,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Santiago de Cuba (ne_id 1159149835)' }
      }
    ]
  }
})
