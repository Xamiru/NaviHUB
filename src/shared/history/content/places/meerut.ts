import { definePlace } from '../../schema'

export default definePlace({
  id: 'meerut',
  names: [
    { text: 'Meerut', lang: 'en', role: 'primary' },
    { text: 'मेरठ', lang: 'hi', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 29.0024,
    lon: 77.6981,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Meerut (ne_id 1159149181)' }
      }
    ]
  }
})
