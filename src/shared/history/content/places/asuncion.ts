import { definePlace } from '../../schema'

export default definePlace({
  id: 'asuncion',
  names: [
    { text: 'Asunción', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'PY',
  coords: {
    lat: -25.2945,
    lon: -57.6435,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Asunción (ne_id 1159150621)' }
      }
    ]
  }
})
