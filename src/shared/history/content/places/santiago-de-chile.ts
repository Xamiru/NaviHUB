import { definePlace } from '../../schema'

export default definePlace({
  id: 'santiago-de-chile',
  names: [
    { text: 'Santiago', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'CL',
  coords: {
    lat: -33.4481,
    lon: -70.669,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Santiago (ne_id 1159151615)' }
      }
    ]
  }
})
