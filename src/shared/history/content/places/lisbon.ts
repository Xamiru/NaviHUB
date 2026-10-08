import { definePlace } from '../../schema'

export default definePlace({
  id: 'lisbon',
  names: [
    { text: 'Lisbon', lang: 'en', role: 'primary' },
    { text: 'Lisboa', lang: 'pt', role: 'native' }
  ],
  researched: '2026-10-09',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'PT',
  coords: {
    lat: 38.7247,
    lon: -9.1468,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Lisbon (ne_id 1159151273)' }
      }
    ]
  }
})
