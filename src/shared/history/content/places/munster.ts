import { definePlace } from '../../schema'

export default definePlace({
  id: 'munster',
  names: [
    { text: 'Münster', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 51.9704,
    lon: 7.62,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Münster (ne_id 1159140543)' }
      }
    ]
  }
})
