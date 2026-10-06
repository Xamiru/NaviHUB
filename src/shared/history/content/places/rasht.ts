import { definePlace } from '../../schema'

export default definePlace({
  id: 'rasht',
  names: [
    { text: 'Rasht', lang: 'en', role: 'primary' },
    { text: 'رشت', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 37.3,
    lon: 49.63,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Rasht (ne_id 1159148683)' }
      }
    ]
  }
})
