import { definePlace } from '../../schema'

export default definePlace({
  id: 'delhi',
  names: [
    { text: 'Delhi', lang: 'en', role: 'primary' },
    { text: 'दिल्ली', lang: 'hi', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 28.6719,
    lon: 77.2281,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Delhi (ne_id 1159151405)' }
      }
    ]
  }
})
